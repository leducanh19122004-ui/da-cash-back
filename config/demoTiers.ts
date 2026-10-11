/**
 * DEMO ONLY — static fixtures to preview the milestone ladder locally.
 *
 * Rendered only when NODE_ENV !== 'production' AND the URL has ?demo=1, and
 * always with a visible "DEMO ONLY — not real milestones" tag. Imported only
 * behind a NODE_ENV check so production builds can drop it. These numbers
 * are NOT real milestones and must never be published.
 */
import type { RewardTier } from './rewardTiers';

const DEMO_COMMON: Omit<RewardTier, 'exchangeId' | 'tierId' | 'volumeThreshold' | 'volumeCurrency' | 'rewardAmount' | 'rewardCurrency'> = {
  volumePeriod: 'monthly',
  eligibleProductTypes: ['futures'],
  calculationBasis: 'Demo fixture',
  payoutMethod: 'Demo fixture',
  payoutWindow: { days: 7 },
  effectiveFrom: '2026-01-01',
  effectiveTo: null,
  verificationStatus: 'NOT_AVAILABLE',
};

export const DEMO_TIERS: readonly RewardTier[] = [
  { exchangeId: 'bingx', tierId: 'd1', volumeThreshold: 50_000, volumeCurrency: 'USD', rewardAmount: 5, rewardCurrency: 'USDT', ...DEMO_COMMON },
  { exchangeId: 'bingx', tierId: 'd2', volumeThreshold: 250_000, volumeCurrency: 'USD', rewardAmount: 30, rewardCurrency: 'USDT', ...DEMO_COMMON },
  { exchangeId: 'bingx', tierId: 'd3', volumeThreshold: 1_000_000, volumeCurrency: 'USD', rewardAmount: 150, rewardCurrency: 'USDT', ...DEMO_COMMON },
  { exchangeId: 'bingx', tierId: 'd4', volumeThreshold: 5_000_000, volumeCurrency: 'USD', rewardAmount: 900, rewardCurrency: 'USDT', ...DEMO_COMMON },
  { exchangeId: 'bitunix', tierId: 'd1', volumeThreshold: 100_000, volumeCurrency: 'USD', rewardAmount: 10, rewardCurrency: 'USDT', ...DEMO_COMMON },
  { exchangeId: 'bitunix', tierId: 'd2', volumeThreshold: 500_000, volumeCurrency: 'USD', rewardAmount: 60, rewardCurrency: 'USDT', ...DEMO_COMMON },
  { exchangeId: 'bitunix', tierId: 'd3', volumeThreshold: 2_000_000, volumeCurrency: 'USD', rewardAmount: 280, rewardCurrency: 'USDT', ...DEMO_COMMON },
];
