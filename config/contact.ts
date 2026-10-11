/**
 * Contact & operations. Mirrors DA-ECOSYSTEM-V3-SHARED-SPEC.md §10 — update there first.
 * `null` = not shown anywhere on the site.
 */
import { URLS } from './ecosystem';

export const telegramContact = { handle: '@jacksondz', url: URLS.telegramContact } as const;

/** support@dacashback.com does NOT resolve (NXDOMAIN) — owner to confirm a working mailbox. */
export const supportEmail: string | null = null;

/** e.g. "within 1–2 hours" — unconfirmed (doc said 1–2 hours, old site said 24h). */
export const supportResponseTime: string | null = null;

/** e.g. "Mon–Fri, 09:00–18:00 (GMT+7)". */
export const supportHours: string | null = null;

/**
 * How traders submit their UID. Interim: manually to the DA team on Telegram
 * (@jacksondz), not yet confirmed as the permanent channel.
 */
export const uidSubmission: {
  method: 'form' | 'telegram-bot' | 'admin';
  url: string;
  confirmed: boolean;
} = { method: 'admin', url: URLS.telegramContact, confirmed: false };

/**
 * Social profiles. Telegram/X/Threads/Facebook are intended to be active but
 * their URLs are unknown → hidden until set. YouTube/TikTok disabled.
 */
export const socials = {
  telegram: { enabled: true, url: null as string | null },
  x: { enabled: true, url: null as string | null },
  threads: { enabled: true, url: null as string | null },
  facebook: { enabled: true, url: null as string | null },
  youtube: { enabled: false, url: null as string | null },
  tiktok: { enabled: false, url: null as string | null },
};

/**
 * The on-site contact form posts to /api/contact (validated, honeypot,
 * formula-escaped, rate-limited per instance) → CONTACT_WEBHOOK_URL.
 * Set to false to hide the form and keep Telegram only.
 */
export const contactForm = { enabled: true } as const;
