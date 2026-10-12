/**
 * Trading-fee rebate terms, per exchange.
 *
 * The owner has NOT provided rebate rates, eligible products or payout
 * timing for any exchange, so every field is null. Do not fill a field from
 * an estimate or an old % rate. Terms render only when `isPublishedTerms`
 * passes; otherwise the site shows "Rebate terms are published per exchange
 * once confirmed."
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
  calculationBasis: null,
  rebateDescription: null,
  eligibleProducts: null,
  payoutTiming: null,
  payoutMethod: null,
  existingAccounts: null,
  effectiveFrom: null,
  verificationStatus: 'NOT_AVAILABLE',
});

/** One entry per partner exchange (partnershipStatus 'active'). */
export const rebateTerms: readonly RebateTerms[] = [unconfirmed('bingx'), unconfirmed('bitunix'), unconfirmed('ourbit')];

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
export const publishedTerms = () => rebateTerms.filter((t) => isPublishedTerms(t));
