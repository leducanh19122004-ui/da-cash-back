/**
 * Cashback record metrics. Mirrors DA-ECOSYSTEM-V3-SHARED-SPEC.md §3 and
 * DA-ECOSYSTEM-V3.1-SHARED-SPEC.md §3 (money terms) — update there first.
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
  /**
   * Payment state for money metrics (V3.1 §3): accrued → approved → paid.
   * States are never mixed or summed; only 'paid' totals are rendered as
   * "Cashback paid". null for non-money metrics (e.g. account counts).
   */
  paymentState: PaymentState | null;
}

export type PaymentState = 'accrued' | 'approved' | 'paid';

export const isPublicMetric = (m: Metric) =>
  m.kind === 'real' && m.value !== null && m.publish && PUBLISHABLE_STATUSES.includes(m.verificationStatus);

const pending = (id: string, label: string, unit: string | null, paymentState: PaymentState | null): Metric => ({
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
  paymentState,
});

/** The three figures in the "Cashback record" section. */
export const cashbackRecord: readonly Metric[] = [
  pending('cashback-paid-total', 'Cashback paid (total)', 'USDT', 'paid'),
  pending('cashback-paid-month', 'Cashback paid this month', 'USDT', 'paid'),
  pending('verified-accounts', 'Verified accounts', 'accounts', null),
];

/**
 * Accrued and approved cashback are tracked separately from paid cashback
 * and are NOT rendered. Never add them to a "paid" figure.
 */
export const cashbackPipeline: readonly Metric[] = [
  pending('cashback-accrued', 'Cashback accrued (not yet approved)', 'USDT', 'accrued'),
  pending('cashback-approved', 'Cashback approved (not yet paid)', 'USDT', 'approved'),
];

/**
 * Legacy figures from the old percentage-rebate programme. NOT rendered.
 *
 * Note: These exact values are also the seed constants of the old random demo
 * generator (`DEFAULT_STATS` in the old lib/cashback.ts). Do not publish
 * without reconciliation evidence. Owner decides whether to keep them as a
 * cumulative figure or recount under the current rebate terms.
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
      // Unknown whether this was accrued, approved or paid — do not assume.
      paymentState: null,
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
      paymentState: null,
    },
  ] satisfies Metric[],
} as const;
