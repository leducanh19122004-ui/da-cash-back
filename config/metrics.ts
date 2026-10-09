/**
 * Reward record metrics. Mirrors DA-ECOSYSTEM-V3-SHARED-SPEC.md §3 — update there first.
 *
 * Render rule: a value is public only if `value !== null && publish &&
 * verificationStatus ∈ {RECONCILED, VERIFIED}`. Otherwise the UI shows
 * "Published after reconciliation". Never show 0 for missing data.
 */
import { PUBLISHABLE_STATUSES, type VerificationStatus } from './ecosystem';

export interface Metric {
  id: string;
  label: string;
  value: number | string | null;
  unit: string | null;
  verificationStatus: VerificationStatus;
  /** e.g. '2026-09' or 'All time to 2026-09-30'. */
  reportingPeriod: string | null;
  source: string | null;
  lastUpdated: string | null; // ISO date
  publish: boolean;
  kind: 'real' | 'demo';
}

export const isPublicMetric = (m: Metric) =>
  m.kind === 'real' && m.value !== null && m.publish && PUBLISHABLE_STATUSES.includes(m.verificationStatus);

const pending = (id: string, label: string, unit: string | null): Metric => ({
  id,
  label,
  value: null,
  unit,
  verificationStatus: 'NOT_AVAILABLE',
  reportingPeriod: null,
  source: null,
  lastUpdated: null,
  publish: false,
  kind: 'real',
});

/** The three figures in the "Reward record" section (milestone model). */
export const rewardRecord: readonly Metric[] = [
  pending('total-rewards-sent', 'Total rewards sent', 'USDT'),
  pending('verified-members', 'Verified members', 'members'),
  pending('milestones-this-month', 'Milestones reached this month', 'milestones'),
];

/**
 * Legacy figures from the old percentage-rebate programme. NOT rendered.
 *
 * Note: These exact values are also the seed constants of the old random demo
 * generator (`DEFAULT_STATS` in the old lib/cashback.ts). Do not publish
 * without reconciliation evidence. Owner decides whether to keep them as a
 * cumulative figure or recount under the milestone model.
 */
export const legacyProgram = {
  model: 'percentage-rebate (pre-V3)',
  note: 'These exact values are also the seed constants of the old random demo generator (`DEFAULT_STATS` in the old lib/cashback.ts). Do not publish without reconciliation evidence.',
  metrics: [
    {
      id: 'legacy-total-cashback',
      label: 'Total cashback (old % model)',
      value: 85732.4,
      unit: 'USDT',
      verificationStatus: 'OWNER_REPORTED',
      reportingPeriod: null,
      source: 'Owner report (old site)',
      lastUpdated: null,
      publish: false,
      kind: 'real',
    },
    {
      id: 'legacy-accounts',
      label: 'Accounts (old % model)',
      value: 648,
      unit: 'accounts',
      verificationStatus: 'OWNER_REPORTED',
      reportingPeriod: null,
      source: 'Owner report (old site)',
      lastUpdated: null,
      publish: false,
      kind: 'real',
    },
  ] satisfies Metric[],
} as const;
