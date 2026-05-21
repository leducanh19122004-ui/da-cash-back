// ─── CONFIG ───────────────────────────────────────────────────────
export const USE_MOCK_CASHBACK_DATA = true;

// ─── TYPES ────────────────────────────────────────────────────────
export type ExchangeType = 'crypto' | 'forex';
export type SupportedLang = 'vi' | 'en' | 'ko' | 'th' | 'id';

export interface CashbackTransaction {
  id: string;
  exchange: string;
  type: ExchangeType;
  maskedAccount: string;
  amount: number;
  timestampMs: number;
}

export interface CashbackStats {
  totalCashback: number;
  monthCashback: number;
  verifiedAccounts: number;
}

// ─── EXCHANGE POOLS ───────────────────────────────────────────────
export const CRYPTO_EXCHANGES = ['Binance','Bybit','OKX','Bitget','MEXC','Gate.io','BingX','Ourbit'];
export const FOREX_EXCHANGES  = ['Exness','XM','Vantage','IC Markets'];

// ─── FORMAT ───────────────────────────────────────────────────────
export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})} USDT`;
}
export function formatUSD(amount: number): string {
  return `$${amount.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
}

// ─── MASK ─────────────────────────────────────────────────────────
export function maskUid(uid: string): string {
  return uid.length <= 4 ? '****' : `****${uid.slice(-4)}`;
}
export function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  if (!domain || !name) return '****';
  const suffix = name.length > 3 ? name.slice(-2) : '';
  return `${name[0]}***${suffix}@${domain}`;
}

// ─── RELATIVE TIME — locale-aware ────────────────────────────────
const relativeTimeStrings: Record<SupportedLang, {
  justNow: string;
  seconds: (n: number) => string;
  minutes: (n: number) => string;
  hours: (n: number) => string;
  days: (n: number) => string;
}> = {
  vi: {
    justNow: 'vừa xong',
    seconds: (n) => `${n} giây trước`,
    minutes: (n) => `${n} phút trước`,
    hours:   (n) => `${n} giờ trước`,
    days:    (n) => `${n} ngày trước`,
  },
  en: {
    justNow: 'just now',
    seconds: (n) => `${n}s ago`,
    minutes: (n) => n === 1 ? '1 minute ago' : `${n} minutes ago`,
    hours:   (n) => n === 1 ? '1 hour ago'   : `${n} hours ago`,
    days:    (n) => n === 1 ? '1 day ago'    : `${n} days ago`,
  },
  ko: {
    justNow: '방금 전',
    seconds: (n) => `${n}초 전`,
    minutes: (n) => `${n}분 전`,
    hours:   (n) => `${n}시간 전`,
    days:    (n) => `${n}일 전`,
  },
  th: {
    justNow: 'เมื่อกี้',
    seconds: (n) => `${n} วินาทีที่แล้ว`,
    minutes: (n) => `${n} นาทีที่แล้ว`,
    hours:   (n) => `${n} ชั่วโมงที่แล้ว`,
    days:    (n) => `${n} วันที่แล้ว`,
  },
  id: {
    justNow: 'baru saja',
    seconds: (n) => `${n} detik lalu`,
    minutes: (n) => `${n} menit lalu`,
    hours:   (n) => `${n} jam lalu`,
    days:    (n) => `${n} hari lalu`,
  },
};

export function formatRelativeTime(timestampMs: number, lang: SupportedLang = 'vi'): string {
  const s = relativeTimeStrings[lang] || relativeTimeStrings.vi;
  const diffSec = Math.floor((Date.now() - timestampMs) / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr  = Math.floor(diffMin / 60);
  if (diffSec < 30) return s.justNow;
  if (diffSec < 60) return s.seconds(diffSec);
  if (diffMin < 60) return s.minutes(diffMin);
  if (diffHr  < 24) return s.hours(diffHr);
  return s.days(Math.floor(diffHr / 24));
}

// ─── WEIGHTED RANDOM ─────────────────────────────────────────────
function weightedRandom(weights: number[]): number {
  const total = weights.reduce((a,b) => a+b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) { r -= weights[i]; if (r <= 0) return i; }
  return weights.length - 1;
}
function rand(min: number, max: number) { return Math.random() * (max - min) + min; }

// ─── CASHBACK AMOUNT (realistic for hero) ────────────────────────
// 65% small (+0.25–4.80), 28% medium (+5–18), 7% large (+20–55)
export function getRandomCashbackAmount(): number {
  const tier = weightedRandom([65, 28, 7]);
  let v: number;
  if (tier === 0) v = rand(0.25, 4.80);
  else if (tier === 1) v = rand(5, 18);
  else v = rand(20, 55);
  return parseFloat(v.toFixed(2));
}

// ─── DELAY (natural, non-periodic) ───────────────────────────────
export function getRandomDelay(): number {
  const tier = weightedRandom([50, 35, 15]);
  if (tier === 0) return rand(2000, 5000);
  if (tier === 1) return rand(8000, 15000);
  return rand(20000, 30000);
}

// ─── MOCK EVENT ───────────────────────────────────────────────────
const MOCK_UIDS   = ['7821','4398','9204','2156','8873','5511','3367','6649'];
const MOCK_EMAILS = ['n***@gmail.com','t***88@outlook.com','m***trade@gmail.com',
                     'a***nguyen@gmail.com','h***pro@gmail.com','k***fx@hotmail.com',
                     'p***88@gmail.com','j***@naver.com'];

export function generateMockCashbackEvent(): CashbackTransaction {
  const isCrypto = Math.random() > 0.28;
  const exchange = isCrypto
    ? CRYPTO_EXCHANGES[Math.floor(Math.random() * CRYPTO_EXCHANGES.length)]
    : FOREX_EXCHANGES[Math.floor(Math.random() * FOREX_EXCHANGES.length)];
  const useEmail = Math.random() > 0.45;
  const maskedAccount = useEmail
    ? MOCK_EMAILS[Math.floor(Math.random() * MOCK_EMAILS.length)]
    : `****${MOCK_UIDS[Math.floor(Math.random() * MOCK_UIDS.length)]}`;
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
    exchange, type: isCrypto ? 'crypto' : 'forex',
    maskedAccount, amount: getRandomCashbackAmount(),
    timestampMs: Date.now(),
  };
}

// ─── INITIAL TRANSACTIONS ────────────────────────────────────────
export function getInitialTransactions(count = 5): CashbackTransaction[] {
  const result: CashbackTransaction[] = [];
  let base = Date.now();
  for (let i = 0; i < count; i++) {
    base -= Math.floor(rand(4*60_000, 55*60_000));
    result.push({ ...generateMockCashbackEvent(), timestampMs: base });
  }
  return result.sort((a,b) => b.timestampMs - a.timestampMs);
}

// ─── STATS PERSISTENCE ───────────────────────────────────────────
const LS_KEY = 'dcb_mock_v2';

// Base: ~85,732 USDT (realistic starting point)
export const DEFAULT_STATS: CashbackStats = {
  totalCashback:   85_732.40,
  monthCashback:    5_842.75,
  verifiedAccounts:   648,
};

export function loadOrInitStats(): CashbackStats {
  if (typeof window === 'undefined') return { ...DEFAULT_STATS };
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const p = JSON.parse(raw) as CashbackStats;
      // Validate reasonable range
      if (p.totalCashback >= 80_000 && p.totalCashback <= 500_000) return p;
    }
  } catch { /* ignore */ }
  // First visit: randomise slightly around base
  return {
    totalCashback:   DEFAULT_STATS.totalCashback + parseFloat(rand(0, 60).toFixed(2)),
    monthCashback:   DEFAULT_STATS.monthCashback  + parseFloat(rand(0, 80).toFixed(2)),
    verifiedAccounts: DEFAULT_STATS.verifiedAccounts + Math.floor(rand(0, 15)),
  };
}

export function saveStats(stats: CashbackStats): void {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(LS_KEY, JSON.stringify(stats)); } catch { /* */ }
}

// ─── API STUBS ────────────────────────────────────────────────────
export async function fetchCashbackStats(): Promise<CashbackStats> {
  throw new Error('Set USE_MOCK_CASHBACK_DATA=false and implement real API');
}
export async function fetchRecentTransactions(): Promise<CashbackTransaction[]> {
  throw new Error('Set USE_MOCK_CASHBACK_DATA=false and implement real API');
}
