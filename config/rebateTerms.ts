/**
 * Trading-fee rebate terms, per exchange.
 *
 * Rebate rates confirmed by the owner on 2026-10-19 (BingX, Bitunix, Ourbit,
 * OKX; PrimeXBT and Vantage 100% ≈ $18/lot). Eligible products and payout timing are still not provided, so those
 * fields stay null. Do not fill a field from an estimate. Terms render only
 * when `isPublishedTerms` passes; otherwise the card shows "Rate pending
 * confirmation" and the calculator shows estimated fees only.
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
  /**
   * Fixed rebate per standard lot traded, in USD (forex/CFD-style deals,
   * e.g. 18 → "≈ $18 back per lot"). null = not a per-lot deal / not confirmed.
   */
  rebatePerLotUsd: number | null;
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
  rebatePerLotUsd: null,
  calculationBasis: null,
  rebateDescription: null,
  eligibleProducts: null,
  payoutTiming: null,
  payoutMethod: null,
  existingAccounts: null,
  effectiveFrom: null,
  verificationStatus: 'NOT_AVAILABLE',
});

/** A rate the owner confirmed for an exchange's partner programme (rate only). */
const ownerConfirmedRate = (
  exchangeId: string,
  pct: number,
  effectiveFrom: string,
  perLotUsd: number | null = null,
): RebateTerms => ({
  ...unconfirmed(exchangeId),
  rebateRate: `${pct}% of trading fees`,
  rebatePct: pct,
  rebatePerLotUsd: perLotUsd,
  rebateDescription:
    perLotUsd !== null
      ? `${pct}% of the trading fees you pay (≈ $${perLotUsd} per lot)`
      : `${pct}% of the trading fees you pay`,
  effectiveFrom,
  verificationStatus: 'VERIFIED',
});

/** One entry per exchange open for registration. */
export const rebateTerms: readonly RebateTerms[] = [
  // Rates confirmed by the owner on 2026-10-19.
  ownerConfirmedRate('bingx', 50, '2026-10-19'),
  ownerConfirmedRate('bitunix', 60, '2026-10-19'),
  ownerConfirmedRate('ourbit', 60, '2026-10-19'),
  ownerConfirmedRate('okx', 50, '2026-10-19'),
  ownerConfirmedRate('primexbt', 100, '2026-10-19', 18),
  ownerConfirmedRate('vantage', 100, '2026-10-19', 18),
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
