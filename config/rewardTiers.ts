/**
 * Volume-milestone reward tiers, per exchange.
 *
 * EMPTY until each milestone is confirmed with the exchange's partner
 * programme. Never add a tier from an estimate: a tier is rendered only when
 * every required field is set and `verificationStatus` is RECONCILED or
 * VERIFIED (see `isPublishedTier`). Unconfigured tiers stay hidden and the
 * site shows a neutral information state instead.
 */
import type { VerificationStatus } from './ecosystem';
import { isAvailable, exchangeById } from './exchanges';

export type ProductType = 'spot' | 'futures' | 'tokenized-stocks';

export interface RewardTier {
  exchangeId: string;
  /** Stable id within the exchange, e.g. 'm1'. */
  tierId: string;
  /** Volume needed to reach this milestone, in `volumeCurrency`. */
  volumeThreshold: number | null;
  volumeCurrency: 'USD' | 'USDT' | null;
  /** Reward sent when the milestone is reached, in `rewardCurrency`. */
  rewardAmount: number | null;
  rewardCurrency: 'USDT' | 'USD' | null;
  /** Period the volume is counted over. */
  volumePeriod: 'monthly' | 'weekly' | null;
  eligibleProductTypes: ProductType[] | null;
  /** How volume is counted, e.g. "The exchange's own partner data". */
  calculationBasis: string | null;
  /** e.g. "Sent by DA to your exchange account by UID". */
  payoutMethod: string | null;
  /** Days after confirmation that the reward is sent. */
  payoutWindow: { days: number } | null;
  effectiveFrom: string | null; // ISO date
  effectiveTo: string | null; // ISO date, null = open-ended
  verificationStatus: VerificationStatus;
}

export const rewardTiers: readonly RewardTier[] = [];

/**
 * What happens below the first milestone (owner decision: nothing, or a base
 * rebate). The bullet is hidden while null.
 */
export const belowFirstMilestonePolicy: string | null = null;

const PUBLISHABLE: VerificationStatus[] = ['RECONCILED', 'VERIFIED'];

export function isPublishedTier(t: RewardTier, today = new Date().toISOString().slice(0, 10)): boolean {
  const ex = exchangeById(t.exchangeId);
  return (
    !!ex &&
    isAvailable(ex) &&
    PUBLISHABLE.includes(t.verificationStatus) &&
    t.volumeThreshold !== null &&
    t.volumeCurrency !== null &&
    t.rewardAmount !== null &&
    t.rewardCurrency !== null &&
    t.effectiveFrom !== null &&
    t.effectiveFrom <= today &&
    (t.effectiveTo === null || t.effectiveTo >= today)
  );
}

export function publishedTiersFor(exchangeId: string): RewardTier[] {
  return rewardTiers
    .filter((t) => t.exchangeId === exchangeId && isPublishedTier(t))
    .sort((a, b) => (a.volumeThreshold ?? 0) - (b.volumeThreshold ?? 0));
}

/** Exchange ids that have at least one published tier. */
export function exchangesWithTiers(): string[] {
  return Array.from(new Set(rewardTiers.filter((t) => isPublishedTier(t)).map((t) => t.exchangeId)));
}

/**
 * Programme facts shared by every tier passed in. A field is returned only
 * when all tiers agree on a non-null value, so the UI never generalises a
 * value that differs between exchanges.
 */
export function tierFacts(tiers: readonly RewardTier[]) {
  const same = <T>(pick: (t: RewardTier) => T | null): T | null => {
    if (tiers.length === 0) return null;
    const first = pick(tiers[0]);
    const key = JSON.stringify(first);
    return first !== null && tiers.every((t) => JSON.stringify(pick(t)) === key) ? first : null;
  };
  return {
    volumePeriod: same((t) => t.volumePeriod),
    eligibleProductTypes: same((t) => t.eligibleProductTypes),
    calculationBasis: same((t) => t.calculationBasis),
    payoutMethod: same((t) => t.payoutMethod),
    payoutDays: same((t) => t.payoutWindow?.days ?? null),
    volumeCurrency: same((t) => t.volumeCurrency),
    tokenizedCounts: tiers.some((t) => t.eligibleProductTypes?.includes('tokenized-stocks')),
  };
}

/** All published tiers across exchanges. */
export const allPublishedTiers = () => rewardTiers.filter((t) => isPublishedTier(t));
