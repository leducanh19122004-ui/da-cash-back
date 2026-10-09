/**
 * Milestone-progress lookup adapter.
 *
 * TODAY: not connected. `lookupMilestoneProgress` always resolves to
 * `{ status: 'unavailable' }` WITHOUT any network request — the exchange and
 * UID the visitor typed never leave the browser. The UI then tells them to
 * send their exchange and UID to the DA team on Telegram.
 *
 * ── Required design before enabling a real backend ─────────────────────────
 * A UID is not a secret (members share it, exchanges show it in screenshots),
 * so a UID alone must NEVER reveal another customer's data. Before replacing
 * the stub below:
 *   1. Ownership proof: issue a one-time verification code delivered to the
 *      member's registered Telegram (bot) or email, and only return data after
 *      the code is entered. Codes expire quickly and are single-use.
 *   2. Rate limiting: per IP and per UID (e.g. a few attempts / 15 min), with
 *      uniform responses so the endpoint cannot be used to enumerate UIDs.
 *   3. Minimal output: return only aggregates for that member (eligible
 *      volume for the period, current tier, next milestone, rewards sent) —
 *      never trade history, balances, emails or other members' records.
 *   4. Server-side only: the partner-data source and credentials stay on the
 *      server (no NEXT_PUBLIC_* secrets); log access without storing the UID
 *      in plain text; document retention in the privacy policy (legal review).
 *   5. Numbers shown must come from reconciled partner data for a stated
 *      period — never estimated or demo values.
 * ───────────────────────────────────────────────────────────────────────────
 */

export interface MilestoneProgress {
  status: 'ok';
  /** Eligible volume counted so far in the current period. */
  eligibleVolume: { amount: number; currency: string; period: string };
  currentTier: { tierId: string; volumeThreshold: number } | null;
  nextMilestone: { tierId: string; volumeThreshold: number; rewardAmount: number; rewardCurrency: string } | null;
  rewardHistory: { date: string; amount: number; currency: string; tierId: string }[];
}

export type MilestoneLookupResult = { status: 'unavailable' } | MilestoneProgress;

/** Whether a real lookup backend is connected. Keep false until the design above is implemented. */
export const MILESTONE_LOOKUP_CONNECTED = false;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function lookupMilestoneProgress(exchangeId: string, uid: string): Promise<MilestoneLookupResult> {
  // Intentionally no fetch(): nothing is sent anywhere while not connected.
  return { status: 'unavailable' };
}
