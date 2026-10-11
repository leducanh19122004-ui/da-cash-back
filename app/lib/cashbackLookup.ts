/**
 * Cashback status lookup adapter.
 *
 * TODAY: not connected. `lookupCashbackStatus` always resolves to
 * `{ status: 'unavailable' }` WITHOUT any network request — the exchange and
 * UID the visitor typed never leave the browser. The UI then tells them to
 * send their exchange and UID to the DA team on Telegram.
 *
 * ── Required design before enabling a real backend ─────────────────────────
 * A UID is not a secret (traders share it, exchanges show it in screenshots),
 * so a UID alone must NEVER reveal another customer's data. Before replacing
 * the stub below:
 *   1. Ownership proof: issue a one-time verification code delivered to the
 *      trader's registered Telegram (bot) or email, and only return data after
 *      the code is entered. Codes expire quickly and are single-use.
 *   2. Rate limiting: per IP and per UID (e.g. a few attempts / 15 min), with
 *      uniform responses so the endpoint cannot be used to enumerate UIDs.
 *   3. Minimal output: return only that trader's cashback aggregates for a
 *      stated period, with accrued / approved / paid kept separate — never
 *      trade history, balances, emails or other traders' records.
 *   4. Server-side only: the partner-data source and credentials stay on the
 *      server (no NEXT_PUBLIC_* secrets); log access without storing the UID
 *      in plain text; document retention in the privacy policy (legal review).
 *   5. Numbers shown must come from reconciled partner data for a stated
 *      period — never estimated or demo values.
 * ───────────────────────────────────────────────────────────────────────────
 */

interface Amount {
  amount: number;
  currency: string;
}

export interface CashbackStatus {
  status: 'ok';
  /** Whether the account is confirmed as registered through a DA partner link. */
  accountLinked: boolean;
  period: string;
  /** Kept separate — never summed (V3.1 §3). */
  accrued: Amount | null;
  approved: Amount | null;
  paid: Amount | null;
}

export type CashbackLookupResult = { status: 'unavailable' } | CashbackStatus;

/** Whether a real lookup backend is connected. Keep false until the design above is implemented. */
export const CASHBACK_LOOKUP_CONNECTED = false;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function lookupCashbackStatus(exchangeId: string, uid: string): Promise<CashbackLookupResult> {
  // Intentionally no fetch(): nothing is sent anywhere while not connected.
  return { status: 'unavailable' };
}
