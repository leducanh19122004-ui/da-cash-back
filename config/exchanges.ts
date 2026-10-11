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
 * BingX: when the owner sends the new link, set `referralUrl` and change
 * `referralLinkStatus` to 'available'. That is the only change needed.
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
  /** DA partner registration link. */
  referralUrl: string | null;
  /** Monochrome initials mark (brand colours are left to the exchanges). */
  initials: string;
}

export const exchanges: readonly Exchange[] = [
  { id: 'bingx', name: 'BingX', market: 'crypto', partnershipStatus: 'active', referralLinkStatus: 'awaiting_update', referralUrl: null, initials: 'BX' },
  { id: 'bitunix', name: 'Bitunix', market: 'crypto', partnershipStatus: 'active', referralLinkStatus: 'available', referralUrl: 'https://www.bitunix.com/register?vipCode=Gw77', initials: 'BU' },
  { id: 'ourbit', name: 'Ourbit', market: 'crypto', partnershipStatus: 'active', referralLinkStatus: 'available', referralUrl: 'https://www.ourbit.com/register?inviteCode=SY7QT9', initials: 'OB' },
  { id: 'okx', name: 'OKX', market: 'crypto', partnershipStatus: 'new_deal_pending', referralLinkStatus: 'awaiting_link', referralUrl: null, initials: 'OK' },
  { id: 'primexbt', name: 'PrimeXBT', market: null, partnershipStatus: 'new_deal_pending', referralLinkStatus: 'awaiting_link', referralUrl: null, initials: 'PX' },
  // A deal with Vantage does NOT activate Forex anywhere on this site.
  { id: 'vantage', name: 'Vantage', market: 'forex', partnershipStatus: 'new_deal_pending', referralLinkStatus: 'awaiting_link', referralUrl: null, initials: 'VT' },
  { id: 'binance', name: 'Binance', market: 'crypto', partnershipStatus: 'paused', referralLinkStatus: 'none', referralUrl: null, initials: 'BN' },
  { id: 'bybit', name: 'Bybit', market: 'crypto', partnershipStatus: 'paused', referralLinkStatus: 'none', referralUrl: null, initials: 'BB' },
  { id: 'mexc', name: 'MEXC', market: 'crypto', partnershipStatus: 'paused', referralLinkStatus: 'none', referralUrl: null, initials: 'MX' },
  { id: 'bitget', name: 'Bitget', market: 'crypto', partnershipStatus: 'paused', referralLinkStatus: 'none', referralUrl: null, initials: 'BG' },
  { id: 'gate', name: 'Gate.io', market: 'crypto', partnershipStatus: 'paused', referralLinkStatus: 'none', referralUrl: null, initials: 'GT' },
  { id: 'kucoin', name: 'KuCoin', market: 'crypto', partnershipStatus: 'paused', referralLinkStatus: 'none', referralUrl: null, initials: 'KC' },
  { id: 'exness', name: 'Exness', market: 'forex', partnershipStatus: 'paused', referralLinkStatus: 'none', referralUrl: null, initials: 'EX' },
  { id: 'xm', name: 'XM', market: 'forex', partnershipStatus: 'paused', referralLinkStatus: 'none', referralUrl: null, initials: 'XM' },
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

/** Derived counts — never hardcode them in copy. */
export const exchangeCounts = {
  open: registrableExchanges.length,
  linkUpdating: exchanges.filter((e) => !canRegister(e) && e.referralLinkStatus === 'awaiting_update').length,
  newPartners: newPartnerExchanges.length,
  paused: pausedExchanges.length,
};
