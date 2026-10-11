import { NextRequest, NextResponse } from 'next/server';
import { CONTACT_LIMITS } from '../../lib/contactLimits';

/**
 * Contact form → Google Apps Script webhook (CONTACT_WEBHOOK_URL, server-only;
 * never expose it as NEXT_PUBLIC_*).
 *
 * Hardening: JSON + size check, server-side validation and length caps,
 * honeypot, best-effort per-instance rate limit, spreadsheet formula
 * escaping, upstream `res.ok` AND `{ success: true }` required before
 * reporting success, and generic errors (no upstream / exception text).
 */

const WEBHOOK_URL = process.env.CONTACT_WEBHOOK_URL ?? '';
const LANGS = new Set(['vi', 'en', 'ko', 'th', 'id']);
const MAX_BODY_BYTES = 8_000;

// Best-effort only: serverless instances do not share memory.
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

/** Prevent spreadsheet formula injection: cells starting with = + - @ (or tab/CR) are prefixed with '. */
function cell(v: string) {
  return /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
}

function clean(v: unknown, max: number) {
  if (typeof v !== 'string') return null;
  // Drop control characters except newline/tab, trim, collapse long blank runs.
  const s = v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
  if (!s || s.length > max) return null;
  return s;
}

const fail = (status: number) => NextResponse.json({ success: false }, { status });

export async function POST(req: NextRequest) {
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return fail(413);

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw);
    } catch {
      return fail(400);
    }
    if (!body || typeof body !== 'object') return fail(400);

    // Honeypot filled → pretend success, store nothing.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ success: true });
    }

    const name = clean(body.name, CONTACT_LIMITS.name);
    const contact = clean(body.contact, CONTACT_LIMITS.contact);
    const message = clean(body.message, CONTACT_LIMITS.message);
    const lang = typeof body.lang === 'string' && LANGS.has(body.lang) ? body.lang : 'en';
    if (!name || !contact || !message) return fail(400);

    const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
    if (rateLimited(ip)) return fail(429);

    if (!WEBHOOK_URL) return fail(503);

    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: cell(name), contact: cell(contact), message: cell(message), lang }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return fail(502);

    const upstream = (await res.json().catch(() => null)) as { success?: unknown } | null;
    if (!upstream || upstream.success !== true) return fail(502);

    return NextResponse.json({ success: true });
  } catch {
    return fail(500);
  }
}
