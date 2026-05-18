// ─── CONFIG ───────────────────────────────────────────────────────────────────
// Khi USE_MOCK = true: dùng dữ liệu mô phỏng, hiện nhãn "Dữ liệu minh họa"
// Khi USE_MOCK = false: gọi fetchCashbackStats() / fetchRecentTransactions()
export const USE_MOCK_CASHBACK_DATA = true;

// ─── TYPES ────────────────────────────────────────────────────────────────────
export type ExchangeType = 'crypto' | 'forex';

export interface CashbackTransaction {
  id: string;
  exchange: string;
  type: ExchangeType;
  maskedAccount: string;
  amount: number;          // USDT
  timestampMs: number;     // unix ms khi xảy ra
}

export interface CashbackStats {
  totalCashback: number;   // USDT
  monthCashback: number;
  verifiedAccounts: number;
}

// ─── EXCHANGE POOLS ───────────────────────────────────────────────────────────
export const CRYPTO_EXCHANGES = ['Binance','Bybit','OKX','Bitget','MEXC','MEXC','Gate.io','BingX','Ourbit'];
export const FOREX_EXCHANGES  = ['Exness','XM','Vantage','IC Markets'];

// ─── HELPER: FORMAT ───────────────────────────────────────────────────────────
export function formatCurrency(amount: number, symbol = 'USDT'): string {
  return `${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${symbol}`;
}

export function formatUSD(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ─── HELPER: MASK ─────────────────────────────────────────────────────────────
export function maskUid(uid: string): string {
  if (uid.length <= 4) return '****';
  return `****${uid.slice(-4)}`;
}

export function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  if (!domain || name.length === 0) return '****';
  const visible = name.length > 3 ? name.slice(-2) : '';
  return `${name[0]}***${visible}@${domain}`;
}

// ─── HELPER: WEIGHTED RANDOM ─────────────────────────────────────────────────
function weightedRandom(weights: number[]): number {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) return i;
  }
  return weights.length - 1;
}

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// ─── HELPER: CASHBACK AMOUNT ─────────────────────────────────────────────────
// 60% khoảng nhỏ (0.12–3.85), 30% vừa (4–18), 10% lớn (20–75)
export function getRandomCashbackAmount(): number {
  const tier = weightedRandom([60, 30, 10]);
  let amount: number;
  if (tier === 0) amount = rand(0.12, 3.85);
  else if (tier === 1) amount = rand(4.0, 18.0);
  else amount = rand(20.0, 75.0);
  return parseFloat(amount.toFixed(2));
}

// ─── HELPER: DELAY ────────────────────────────────────────────────────────────
// 50% → 2-5s, 35% → 8-15s, 15% → 20-30s
export function getRandomDelay(): number {
  const tier = weightedRandom([50, 35, 15]);
  if (tier === 0) return rand(2000, 5000);
  if (tier === 1) return rand(8000, 15000);
  return rand(20000, 30000);
}

// ─── HELPER: GENERATE EVENT ───────────────────────────────────────────────────
const MOCK_UIDS = ['7821','4398','9204','2156','8873','5511','3367','6649'];
const MOCK_EMAILS = [
  'n***@gmail.com','t***88@outlook.com','m***trade@gmail.com',
  'a***nguyen@gmail.com','h***pro@gmail.com','k***fx@hotmail.com',
];

export function generateMockCashbackEvent(): CashbackTransaction {
  const isCrypto = Math.random() > 0.3;
  const exchange = isCrypto
    ? CRYPTO_EXCHANGES[Math.floor(Math.random() * CRYPTO_EXCHANGES.length)]
    : FOREX_EXCHANGES[Math.floor(Math.random() * FOREX_EXCHANGES.length)];

  const useEmail = Math.random() > 0.5;
  const maskedAccount = useEmail
    ? MOCK_EMAILS[Math.floor(Math.random() * MOCK_EMAILS.length)]
    : `****${MOCK_UIDS[Math.floor(Math.random() * MOCK_UIDS.length)]}`;

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    exchange,
    type: isCrypto ? 'crypto' : 'forex',
    maskedAccount,
    amount: getRandomCashbackAmount(),
    timestampMs: Date.now(),
  };
}

// ─── HELPER: RELATIVE TIME ────────────────────────────────────────────────────
export function getRelativeTime(timestampMs: number): string {
  const diffMs = Date.now() - timestampMs;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr  = Math.floor(diffMin / 60);
  if (diffSec < 30) return 'vừa xong';
  if (diffSec < 60) return `${diffSec} giây trước`;
  if (diffMin < 60) return `${diffMin} phút trước`;
  if (diffHr < 24) return `${diffHr} giờ trước`;
  return `${Math.floor(diffHr / 24)} ngày trước`;
}

// ─── MOCK INITIAL STATS ───────────────────────────────────────────────────────
// Base values — dùng localStorage để không reset khi refresh
const LS_KEY = 'dcb_mock_stats';
const DEFAULT_STATS: CashbackStats = {
  totalCashback: 148_724.50,
  monthCashback: 18_432.75,
  verifiedAccounts: 2_847,
};

export function loadOrInitStats(): CashbackStats {
  if (typeof window === 'undefined') return { ...DEFAULT_STATS };
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CashbackStats;
      // Sanity check — nếu quá nhỏ hoặc NaN thì reset
      if (parsed.totalCashback > 10000 && parsed.monthCashback > 0) return parsed;
    }
  } catch {/* ignore */}
  return { ...DEFAULT_STATS };
}

export function saveStats(stats: CashbackStats): void {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(LS_KEY, JSON.stringify(stats)); } catch {/* ignore */}
}

// ─── MOCK INITIAL TRANSACTIONS ────────────────────────────────────────────────
export function getInitialTransactions(count = 7): CashbackTransaction[] {
  const result: CashbackTransaction[] = [];
  let baseTime = Date.now();
  for (let i = 0; i < count; i++) {
    baseTime -= Math.floor(rand(3 * 60_000, 45 * 60_000)); // 3–45 phút trước
    const ev = generateMockCashbackEvent();
    result.push({ ...ev, timestampMs: baseTime });
  }
  return result.sort((a, b) => b.timestampMs - a.timestampMs);
}

// ─── API STUBS (for future real data) ────────────────────────────────────────
export async function fetchCashbackStats(): Promise<CashbackStats> {
  // TODO: replace with real API
  // const res = await fetch('/api/cashback/stats');
  // return res.json();
  throw new Error('Not implemented — set USE_MOCK_CASHBACK_DATA=true');
}

export async function fetchRecentTransactions(): Promise<CashbackTransaction[]> {
  // TODO: replace with real API
  throw new Error('Not implemented — set USE_MOCK_CASHBACK_DATA=true');
}
