/**
 * Conversion events. There is NO analytics on DA Cashback (the privacy policy
 * says so): this helper only pushes to `window.dataLayer` when a tag manager
 * has already created it. It adds no script, sets no cookie and stores nothing.
 * Enabling a tag manager needs a privacy-policy update first.
 *
 * Registration, KYC and eligibility can't be measured here — they come from
 * the exchanges' partner dashboards (UID reconciliation), server-side.
 *
 * The matching `data-track` attributes on elements let a tag manager use
 * click triggers instead of this helper.
 */
import { telegramContact } from '@/config/contact';
import type { Exchange } from '@/config/exchanges';

export type TrackEvent =
  | 'partner_link_click'
  | 'partner_code_copy'
  | 'terms_open'
  | 'existing_account_open'
  | 'calculator_used'
  | 'telegram_support_click';

export type TrackProps = { exchange?: string; placement?: string };

export function track(event: TrackEvent, props: TrackProps = {}) {
  if (typeof window === 'undefined') return;
  const dl = (window as unknown as { dataLayer?: unknown }).dataLayer;
  if (Array.isArray(dl)) dl.push({ event, ...props });
}

/** Props for a Telegram support link (href, new tab, tracking). */
export function telegramLinkProps(placement: string) {
  return {
    href: telegramContact.url,
    target: '_blank',
    rel: 'noopener noreferrer',
    ...trackAttrs('telegram_support_click', { placement }),
    onClick: () => track('telegram_support_click', { placement }),
  } as const;
}

/** Props for a DA partner registration link — the URL comes byte-identical from the registry. */
export function partnerLinkProps(e: Exchange & { referralUrl: string }, placement: string) {
  return {
    href: e.referralUrl,
    target: '_blank',
    rel: 'noopener noreferrer',
    ...trackAttrs('partner_link_click', { exchange: e.id, placement }),
    onClick: () => track('partner_link_click', { exchange: e.id, placement }),
  } as const;
}

/** Spread onto an element: `data-track`, `data-exchange`, `data-placement`. */
export function trackAttrs(event: TrackEvent, props: TrackProps = {}) {
  return {
    'data-track': event,
    ...(props.exchange ? { 'data-exchange': props.exchange } : {}),
    ...(props.placement ? { 'data-placement': props.placement } : {}),
  };
}
