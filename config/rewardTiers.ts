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
 * DEMO ONLY — static fixtures to preview the milestone ladder locally.
 * Rendered only when NODE_ENV !== 'production' AND the URL has ?demo=1, and
 * always with a visible "DEMO ONLY — not real milestones" tag. These numbers
 * are NOT real milestones and must never be published.
 */
export const DEMO_TIERS: readonly RewardTier[] = [
  ['bingx', 'd1', 50_000, 5],
  ['bingx', 'd2', 250_000, 30],
  ['bingx', 'd3', 1_000_000, 150],
  ['bingx', 'd4', 5_000_000, 900],
  ['bitunix', 'd1', 100_000, 10],
  ['bitunix', 'd2', 500_000, 60],
  ['bitunix', 'd3', 2_000_000, 280],
].map(([exchangeId, tierId, volumeThreshold, rewardAmount]) => ({
  exchangeId: exchangeId as string,
  tierId: tierId as string,
  volumeThreshold: volumeThreshold as number,
  volumeCurrency: 'USD' as const,
  rewardAmount: rewardAmount as number,
  rewardCurrency: 'USDT' as const,
  volumePeriod: 'monthly' as const,
  eligibleProductTypes: ['futures'] as ProductType[],
  calculationBasis: 'Demo fixture',
  payoutMethod: 'Demo fixture',
  payoutWindow: { days: 7 },
  effectiveFrom: '2026-01-01',
  effectiveTo: null,
  verificationStatus: 'NOT_AVAILABLE' as const,
}));
