/**
 * Trading-fee rebate terms, per exchange.
 *
 * The owner has NOT provided rebate rates, eligible products or payout
 * timing for any exchange, so every field is null. Do not fill a field from
 * an estimate or an old % rate. Terms render only when `isPublishedTerms`
 * passes; otherwise each exchange card shows "Rate pending confirmation" and
 * the calculator shows estimated fees only (no rebate estimate).
 */
import { PUBLISHABLE_STATUSES, type VerificationStatus } from './ecosystem';
import { exchangeById } from './exchanges';

export type ProductType = 'spot' | 'futures' | 'tokenized-stocks';

export interface RebateTerms {
  exchangeId: string;
  /**
   * Rebate rate exactly as confirmed with the exchange's partner programme,
   * e.g. "X% of eligible trading fees". Rendered ONLY when the terms pass
   * `isPublishedTerms`. Never fill from an estimate or the old % model.
   */
  rebateRate: string | null;
  /**
   * The same confirmed rate as a number: percent of eligible trading fees
   * returned (e.g. 30 → "30% of eligible fees" and "≈ $30 back per $100 in
   * fees"). Drives the card headline and the calculator. null = not confirmed.
   */
  rebatePct: number | null;
  /** How the rebate is calculated, e.g. "On trading fees paid, net of exchange discounts". */
  calculationBasis: string | null;
  /** Plain-language rebate description as confirmed with the exchange, e.g. "A share of the trading fees you pay". */
  rebateDescription: string | null;
  eligibleProducts: ProductType[] | null;
  /** e.g. "Monthly, after the exchange's partner report is reconciled". */
  payoutTiming: string | null;
  /** e.g. "Sent to your exchange account by UID". */
  payoutMethod: string | null;
  /** Whether accounts registered before joining can take part (exchange rule). */
  existingAccounts: string | null;
  effectiveFrom: string | null; // ISO date
  verificationStatus: VerificationStatus;
}

const unconfirmed = (exchangeId: string): RebateTerms => ({
  exchangeId,
  rebateRate: null,
  rebatePct: null,
  calculationBasis: null,
  rebateDescription: null,
  eligibleProducts: null,
  payoutTiming: null,
  payoutMethod: null,
  existingAccounts: null,
  effectiveFrom: null,
  verificationStatus: 'NOT_AVAILABLE',
});

/** One entry per exchange open for registration. Nothing is confirmed yet. */
export const rebateTerms: readonly RebateTerms[] = [
  unconfirmed('bingx'),
  unconfirmed('bitunix'),
  unconfirmed('ourbit'),
  unconfirmed('okx'),
  unconfirmed('primexbt'),
  unconfirmed('vantage'),
];

export function isPublishedTerms(t: RebateTerms, today = new Date().toISOString().slice(0, 10)): boolean {
  const ex = exchangeById(t.exchangeId);
  return (
    !!ex &&
    ex.partnershipStatus === 'active' &&
    PUBLISHABLE_STATUSES.includes(t.verificationStatus) &&
    t.rebateDescription !== null &&
    t.effectiveFrom !== null &&
    t.effectiveFrom <= today
  );
}

export const termsFor = (exchangeId: string) => rebateTerms.find((t) => t.exchangeId === exchangeId) ?? null;

/** Published terms for an exchange, or null while pending. */
export function confirmedTerms(exchangeId: string): RebateTerms | null {
  const t = termsFor(exchangeId);
  return t && isPublishedTerms(t) ? t : null;
}

/** Confirmed numeric rate (percent of eligible fees), or null. Never estimated. */
export function confirmedRebatePct(exchangeId: string): number | null {
  const pct = confirmedTerms(exchangeId)?.rebatePct;
  return typeof pct === 'number' && Number.isFinite(pct) && pct > 0 ? pct : null;
}
export const publishedTerms = () => rebateTerms.filter((t) => isPublishedTerms(t));
