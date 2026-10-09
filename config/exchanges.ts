/**
 * Partner exchanges for DA Cashback.
 * Mirrors DA-ECOSYSTEM-V3-SHARED-SPEC.md §4 — update there first.
 *
 * Only `available` exchanges get onboarding CTAs and appear in the progress
 * lookup. Referral links must stay byte-identical (spec §0).
 */

export type ExchangeStatus = 'available' | 'paused';
export type ExchangeMarket = 'crypto' | 'forex';

export interface Exchange {
  id: string;
  name: string;
  market: ExchangeMarket;
  status: ExchangeStatus;
  /** DA partner registration link — only for available exchanges. */
  refLink: string | null;
  /** Monochrome initials mark (brand colours are left to the exchanges). */
  initials: string;
}

export const exchanges: readonly Exchange[] = [
  { id: 'bingx', name: 'BingX', market: 'crypto', status: 'available', refLink: 'https://bingxdao.com/invite/JXQSZO/', initials: 'BX' },
  { id: 'bitunix', name: 'Bitunix', market: 'crypto', status: 'available', refLink: 'https://www.bitunix.com/register?vipCode=Gw77', initials: 'BU' },
  { id: 'ourbit', name: 'Ourbit', market: 'crypto', status: 'available', refLink: 'https://www.ourbit.com/register?inviteCode=SY7QT9', initials: 'OB' },
  { id: 'binance', name: 'Binance', market: 'crypto', status: 'paused', refLink: null, initials: 'BN' },
  { id: 'okx', name: 'OKX', market: 'crypto', status: 'paused', refLink: null, initials: 'OK' },
  { id: 'bybit', name: 'Bybit', market: 'crypto', status: 'paused', refLink: null, initials: 'BB' },
  { id: 'mexc', name: 'MEXC', market: 'crypto', status: 'paused', refLink: null, initials: 'MX' },
  { id: 'bitget', name: 'Bitget', market: 'crypto', status: 'paused', refLink: null, initials: 'BG' },
  { id: 'gate', name: 'Gate.io', market: 'crypto', status: 'paused', refLink: null, initials: 'GT' },
  { id: 'kucoin', name: 'KuCoin', market: 'crypto', status: 'paused', refLink: null, initials: 'KC' },
  { id: 'exness', name: 'Exness', market: 'forex', status: 'paused', refLink: null, initials: 'EX' },
  { id: 'vantage', name: 'Vantage', market: 'forex', status: 'paused', refLink: null, initials: 'VT' },
  { id: 'xm', name: 'XM', market: 'forex', status: 'paused', refLink: null, initials: 'XM' },
];

export const isAvailable = (e: Exchange) => e.status === 'available' && !!e.refLink;
export const availableExchanges = exchanges.filter(isAvailable);
export const pausedExchanges = exchanges.filter((e) => !isAvailable(e));
export const exchangeById = (id: string) => exchanges.find((e) => e.id === id);

/** Available first, data order kept within each group. */
export const exchangesByStatus = [...availableExchanges, ...pausedExchanges];
