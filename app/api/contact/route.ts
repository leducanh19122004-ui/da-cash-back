import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = process.env.CONTACT_WEBHOOK_URL ?? '';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!WEBHOOK_URL) {
      return NextResponse.json({ success: false, error: 'Webhook not configured' }, { status: 500 });
    }

    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    return NextResponse.json({ success: true, upstream: text });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
