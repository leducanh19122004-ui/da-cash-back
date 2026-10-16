/**
 * Exchange registry for DA Cashback.
 * Mirrors DA-ECOSYSTEM-V3.1-SHARED-SPEC.md §2 — update there first.
 *
 * Two independent fields:
 *   partnershipStatus  — the business relationship with the exchange.
 *   referralLinkStatus — whether a DA registration link can be shown today.
 *
 * A Register CTA renders ONLY when referralLinkStatus === 'available' AND
 * referralUrl starts with https:// (see `canRegister`). Referral links must
 * stay byte-identical.
 *
 * To change a link: edit `referralUrl` + `referralCode` only (links updated 2026-10-16:
 * BingX QQ4KIN, OKX, PrimeXBT, Vantage).
 */

export type PartnershipStatus = 'active' | 'new_deal_pending' | 'paused';
export type ReferralLinkStatus = 'available' | 'awaiting_update' | 'awaiting_link' | 'none';
export type ExchangeMarket = 'crypto' | 'forex';

export interface Exchange {
  id: string;
  name: string;
  /** null = not confirmed yet (rendered as "To be confirmed"). Never guess. */
  market: ExchangeMarket | null;
  partnershipStatus: PartnershipStatus;
  referralLinkStatus: ReferralLinkStatus;
  /** DA partner registration link — byte-identical to what the owner supplied. */
  referralUrl: string | null;
  /** Partner / invite code exactly as the owner supplied it (some links carry it in the path). */
  referralCode: string | null;
  /** Initials shown in the monogram mark. */
  initials: string;
  /**
   * Widely known brand colour, used ONLY as a small accent (a dot on the
   * monogram). null = no colour we are sure of → neutral mark. Never a logo.
   */
  brandColor: string | null;
  /**
   * Path to an official logo file the owner supplies (e.g. '/exchanges/bitunix.svg').
   * null = monogram mark. Never download logos from the internet.
   */
  logoSrc: string | null;
}

export const exchanges: readonly Exchange[] = [
  { id: 'bingx', name: 'BingX', market: 'crypto', partnershipStatus: 'active', referralLinkStatus: 'available', referralUrl: 'https://bingxdao.com/invite/QQ4KIN/', referralCode: 'QQ4KIN', initials: 'BX', brandColor: '#2A5BF6', logoSrc: null },
  { id: 'bitunix', name: 'Bitunix', market: 'crypto', partnershipStatus: 'active', referralLinkStatus: 'available', referralUrl: 'https://www.bitunix.com/register?vipCode=Gw77', referralCode: 'Gw77', initials: 'BU', brandColor: null, logoSrc: null },
  { id: 'ourbit', name: 'Ourbit', market: 'crypto', partnershipStatus: 'active', referralLinkStatus: 'available', referralUrl: 'https://www.ourbit.com/register?inviteCode=SY7QT9', referralCode: 'SY7QT9', initials: 'OB', brandColor: null, logoSrc: null },
  { id: 'okx', name: 'OKX', market: 'crypto', partnershipStatus: 'active', referralLinkStatus: 'available', referralUrl: 'https://okx.com/join/HE63PH2H', referralCode: 'HE63PH2H', initials: 'OK', brandColor: null, logoSrc: null },
  { id: 'primexbt', name: 'PrimeXBT', market: null, partnershipStatus: 'active', referralLinkStatus: 'available', referralUrl: 'https://go.primexbt.direct/visit/?bta=56672&brand=primexbt', referralCode: '56672', initials: 'PX', brandColor: null, logoSrc: null },
  // Owner supplied the Vantage registration link on 2026-10-16 → open for registration.
  { id: 'vantage', name: 'Vantage', market: 'forex', partnershipStatus: 'active', referralLinkStatus: 'available', referralUrl: 'https://vigco.co/la-com-inv/vi/sDT0SDFC', referralCode: 'sDT0SDFC', initials: 'VT', brandColor: null, logoSrc: null },
  { id: 'binance', name: 'Binance', market: 'crypto', partnershipStatus: 'paused', referralLinkStatus: 'none', referralUrl: null, referralCode: null, initials: 'BN', brandColor: '#F0B90B', logoSrc: null },
  { id: 'bybit', name: 'Bybit', market: 'crypto', partnershipStatus: 'paused', referralLinkStatus: 'none', referralUrl: null, referralCode: null, initials: 'BB', brandColor: '#F7A600', logoSrc: null },
  { id: 'mexc', name: 'MEXC', market: 'crypto', partnershipStatus: 'paused', referralLinkStatus: 'none', referralUrl: null, referralCode: null, initials: 'MX', brandColor: null, logoSrc: null },
  { id: 'bitget', name: 'Bitget', market: 'crypto', partnershipStatus: 'paused', referralLinkStatus: 'none', referralUrl: null, referralCode: null, initials: 'BG', brandColor: '#00C8D7', logoSrc: null },
  { id: 'gate', name: 'Gate.io', market: 'crypto', partnershipStatus: 'paused', referralLinkStatus: 'none', referralUrl: null, referralCode: null, initials: 'GT', brandColor: null, logoSrc: null },
  { id: 'kucoin', name: 'KuCoin', market: 'crypto', partnershipStatus: 'paused', referralLinkStatus: 'none', referralUrl: null, referralCode: null, initials: 'KC', brandColor: '#23AF91', logoSrc: null },
  { id: 'exness', name: 'Exness', market: 'forex', partnershipStatus: 'paused', referralLinkStatus: 'none', referralUrl: null, referralCode: null, initials: 'EX', brandColor: '#FFCF01', logoSrc: null },
  { id: 'xm', name: 'XM', market: 'forex', partnershipStatus: 'paused', referralLinkStatus: 'none', referralUrl: null, referralCode: null, initials: 'XM', brandColor: null, logoSrc: null },
];

/** The only condition under which a Register CTA (or the status lookup) is offered. */
export const canRegister = (e: Exchange): e is Exchange & { referralUrl: string } =>
  e.referralLinkStatus === 'available' && typeof e.referralUrl === 'string' && e.referralUrl.startsWith('https://');

export const exchangeById = (id: string) => exchanges.find((e) => e.id === id);

/** Open for registration today (Register CTA + lookup). */
export const registrableExchanges = exchanges.filter(canRegister);

/** Groups by partnership status, data order kept (BingX stays first among partners). */
export const partnerExchanges = exchanges.filter((e) => e.partnershipStatus === 'active');
export const newPartnerExchanges = exchanges.filter((e) => e.partnershipStatus === 'new_deal_pending');
export const pausedExchanges = exchanges.filter((e) => e.partnershipStatus === 'paused');

/**
 * Partner / invite code, read from the referral URL query (real data — it is
 * part of the DA link). Bitunix → vipCode, Ourbit → inviteCode. null when the
 * exchange has no available link.
 */
const CODE_PARAMS = ['vipCode', 'inviteCode', 'ref', 'referralCode', 'code'] as const;
export function partnerCode(e: Exchange): string | null {
  if (!canRegister(e)) return null;
  if (e.referralCode) return e.referralCode;
  try {
    const q = new URL(e.referralUrl).searchParams;
    for (const k of CODE_PARAMS) {
      const v = q.get(k);
      if (v) return v;
    }
  } catch {
    /* malformed URL → no code */
  }
  return null;
}

/** Derived counts — never hardcode them in copy. */
export const exchangeCounts = {
  open: registrableExchanges.length,
  linkUpdating: exchanges.filter((e) => !canRegister(e) && e.referralLinkStatus === 'awaiting_update').length,
  newPartners: newPartnerExchanges.length,
  paused: pausedExchanges.length,
};
