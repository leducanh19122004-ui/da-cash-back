'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import {
  USE_MOCK_CASHBACK_DATA,
  CashbackStats, CashbackTransaction,
  loadOrInitStats, saveStats,
  getInitialTransactions, generateMockCashbackEvent,
  getRandomCashbackAmount, getRandomDelay,
  getRelativeTime, formatCurrency, formatUSD,
} from '../lib/cashback';

// ─── Animated counter ──────────────────────────────────────────────────────
function useAnimatedNumber(target: number, duration = 800) {
  const [display, setDisplay] = useState(target);
  const prev = useRef(target);
  const frame = useRef<number>(0);
  useEffect(() => {
    const start = prev.current;
    const diff  = target - start;
    if (Math.abs(diff) < 0.01) { setDisplay(target); return; }
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplay(parseFloat((start + diff * ease).toFixed(2)));
      if (t < 1) frame.current = requestAnimationFrame(tick);
      else { setDisplay(target); prev.current = target; }
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, duration]);
  return display;
}

// ─── Stat card ─────────────────────────────────────────────────────────────
function StatCard({ label, value, format, updated }: {
  label: string; value: number; format: 'usd' | 'usdt' | 'int'; updated: boolean;
}) {
  const animated = useAnimatedNumber(value, 900);
  let display = '';
  if (format === 'usd')  display = formatUSD(animated);
  if (format === 'usdt') display = formatCurrency(animated);
  if (format === 'int')  display = Math.round(animated).toLocaleString('en-US');
  return (
    <div style={{
      background: '#111', border: `1px solid ${updated ? 'rgba(212,175,55,0.55)' : 'rgba(212,175,55,0.18)'}`,
      borderRadius: '1rem', padding: '1.25rem 1.5rem',
      transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
      boxShadow: updated ? '0 0 18px rgba(212,175,55,0.15)' : 'none',
    }}>
      <p style={{ fontSize: '0.72rem', color: '#888', marginBottom: '0.4rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</p>
      <p style={{
        fontSize: 'clamp(1.25rem,2.5vw,1.6rem)', fontWeight: 900, fontVariantNumeric: 'tabular-nums',
        background: updated ? 'linear-gradient(135deg,#FFD700,#D4AF37)' : 'linear-gradient(135deg,#F8F5E9,#B8B8B8)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        transition: 'background 0.5s ease',
      }}>{display}</p>
    </div>
  );
}

// ─── Transaction row ──────────────────────────────────────────────────────
function TxRow({ tx, isNew }: { tx: CashbackTransaction; isNew: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 30); return () => clearTimeout(t); }, []);
  const isCrypto = tx.type === 'crypto';
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0.65rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
      opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(-8px)',
      transition: 'opacity 0.35s ease, transform 0.35s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
          background: isCrypto ? 'rgba(99,179,237,0.12)' : 'rgba(72,199,142,0.12)',
          border: `1px solid ${isCrypto ? 'rgba(99,179,237,0.3)' : 'rgba(72,199,142,0.3)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.65rem', fontWeight: 800,
          color: isCrypto ? '#63B3ED' : '#48C78E',
        }}>
          {tx.exchange.slice(0, 2).toUpperCase()}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F8F5E9', whiteSpace: 'nowrap' }}>{tx.exchange}</span>
            <span style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem', borderRadius: '999px', background: isCrypto ? 'rgba(99,179,237,0.1)' : 'rgba(72,199,142,0.1)', color: isCrypto ? '#63B3ED' : '#48C78E' }}>
              {isCrypto ? 'Crypto' : 'Forex'}
            </span>
          </div>
          <p style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tx.maskedAccount}</p>
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '0.75rem' }}>
        <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#4CAF50', whiteSpace: 'nowrap' }}>
          +{formatCurrency(tx.amount)}
        </p>
        <p style={{ fontSize: '0.68rem', color: '#555', marginTop: '0.1rem' }}>{getRelativeTime(tx.timestampMs)}</p>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function CashbackActivity() {
  const [stats, setStats]       = useState<CashbackStats>(() => loadOrInitStats());
  const [txList, setTxList]     = useState<CashbackTransaction[]>(() => getInitialTransactions(7));
  const [newTxId, setNewTxId]   = useState<string | null>(null);
  const [updatedStat, setUpdatedStat] = useState<keyof CashbackStats | null>(null);
  const [, setTick] = useState(0); // force re-render for relative times
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Re-render timestamps every 30s
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 30_000);
    return () => clearInterval(interval);
  }, []);

  // Schedule next cashback event
  const scheduleNext = useCallback(() => {
    const delay = getRandomDelay();
    timerRef.current = setTimeout(() => {
      const ev = generateMockCashbackEvent();
      setTxList(prev => [ev, ...prev].slice(0, 8));
      setNewTxId(ev.id);
      setTimeout(() => setNewTxId(null), 2000);

      // Update stats
      const addAmount = ev.amount;
      const statKey = Math.random() < 0.7
        ? (Math.random() < 0.5 ? 'totalCashback' : 'monthCashback')
        : 'verifiedAccounts';

      setStats(prev => {
        const next = { ...prev };
        if (statKey === 'verifiedAccounts') {
          if (Math.random() < 0.15) next.verifiedAccounts += 1; // rarely
        } else {
          next.totalCashback  += addAmount;
          next.monthCashback  += addAmount * (Math.random() > 0.2 ? 1 : 0);
        }
        saveStats(next);
        return next;
      });

      setUpdatedStat(statKey as keyof CashbackStats);
      setTimeout(() => setUpdatedStat(null), 1500);

      scheduleNext();
    }, delay);
  }, []);

  useEffect(() => {
    // Small delay before first auto-update (don't fire immediately on mount)
    const init = setTimeout(() => scheduleNext(), 4000);
    return () => { clearTimeout(init); clearTimeout(timerRef.current); };
  }, [scheduleNext]);

  const isMock = USE_MOCK_CASHBACK_DATA;

  return (
    <section id="cashback-activity" style={{ padding: '6rem 1.5rem', background: '#0B0B0B' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            Minh bạch & Thời gian thực
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.25rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '0.75rem' }}>
            Hoạt động cashback gần đây
          </h2>
          {isMock && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.875rem', borderRadius: '999px', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)', fontSize: '0.72rem', color: '#B8B8B8' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', display: 'inline-block' }} />
              Dữ liệu minh họa — cập nhật ngẫu nhiên để minh họa hoạt động
            </div>
          )}
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2rem' }} className="activity-stats-grid">
          <StatCard label="Tổng cashback đã ghi nhận" value={stats.totalCashback} format="usdt" updated={updatedStat === 'totalCashback'} />
          <StatCard label="Cashback trong tháng" value={stats.monthCashback} format="usdt" updated={updatedStat === 'monthCashback'} />
          <StatCard label="Tài khoản đã xác minh" value={stats.verifiedAccounts} format="int" updated={updatedStat === 'verifiedAccounts'} />
        </div>

        {/* Live transaction feed */}
        <div style={{ background: '#111', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '1.25rem', padding: '1.5rem 1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4CAF50', display: 'inline-block', boxShadow: '0 0 6px rgba(76,175,80,0.6)' }} />
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F8F5E9' }}>Giao dịch cashback gần đây</p>
            </div>
            {isMock && (
              <span style={{ fontSize: '0.68rem', color: '#555', fontStyle: 'italic' }}>Thông tin tài khoản đã được ẩn để bảo vệ quyền riêng tư</span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {txList.map(tx => (
              <TxRow key={tx.id} tx={tx} isNew={tx.id === newTxId} />
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: '1.25rem', padding: '0.875rem 1.25rem', borderRadius: '0.75rem', background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.12)', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '0.9rem', flexShrink: 0, marginTop: '0.05rem' }}>ℹ️</span>
          <p style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.65 }}>
            {isMock
              ? 'Dữ liệu hiển thị mang tính minh họa. Cashback thực tế phụ thuộc vào tài khoản đã xác minh và chính sách từng sàn.'
              : 'Số liệu được cập nhật định kỳ từ hệ thống đối soát. Cashback phụ thuộc vào chính sách từng sàn và trạng thái xác minh tài khoản.'}
          </p>
        </div>

      </div>
      <style>{`
        @media(max-width:700px){.activity-stats-grid{grid-template-columns:1fr!important}}
        @media(min-width:701px) and (max-width:900px){.activity-stats-grid{grid-template-columns:1fr 1fr!important}}
      `}</style>
    </section>
  );
}
