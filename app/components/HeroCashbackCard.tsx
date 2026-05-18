'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import {
  USE_MOCK_CASHBACK_DATA,
  CashbackTransaction,
  loadOrInitStats,
  saveStats,
  getInitialTransactions,
  generateMockCashbackEvent,
  getRandomDelay,
  getRelativeTime,
  formatCurrency,
} from '../lib/cashback';

// ─── Animated counter ─────────────────────────────────────────────
function AnimatedCounter({
  target, duration = 900, flash = false,
}: { target: number; duration?: number; flash?: boolean }) {
  const [display, setDisplay] = useState(target);
  const [flashing, setFlashing] = useState(false);
  const prevRef = useRef(target);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const start = prevRef.current;
    const diff = target - start;
    if (Math.abs(diff) < 0.005) { setDisplay(target); return; }
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(parseFloat((start + diff * ease).toFixed(2)));
      if (t < 1) { frameRef.current = requestAnimationFrame(tick); }
      else { setDisplay(target); prevRef.current = target; }
    };
    frameRef.current = requestAnimationFrame(tick);
    if (flash) { setFlashing(true); setTimeout(() => setFlashing(false), 900); }
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, flash]);

  return (
    <span style={{
      display: 'inline-block',
      transition: 'color 0.4s ease',
      animation: flashing ? 'num-flash 0.9s ease forwards' : 'none',
    }}>
      ${display.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  );
}

// ─── Single transaction row ────────────────────────────────────────
function TxRow({ tx, isNew }: { tx: CashbackTransaction; isNew: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 30); return () => clearTimeout(t); }, []);
  const isCrypto = tx.type === 'crypto';
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.045)',
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'none' : 'translateY(-8px)',
      transition: 'opacity 0.35s ease, transform 0.35s ease',
      background: isNew && mounted ? 'rgba(212,175,55,0.04)' : 'transparent',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', minWidth: 0 }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
          background: isCrypto ? 'rgba(99,179,237,0.12)' : 'rgba(72,199,142,0.12)',
          border: `1px solid ${isCrypto ? 'rgba(99,179,237,0.25)' : 'rgba(72,199,142,0.25)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.58rem', fontWeight: 800,
          color: isCrypto ? '#63B3ED' : '#48C78E',
        }}>
          {tx.exchange.slice(0, 2).toUpperCase()}
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F8F5E9', lineHeight: 1 }}>{tx.exchange}</p>
          <p style={{ fontSize: '0.64rem', color: '#555', marginTop: '0.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '110px' }}>
            {tx.maskedAccount}
          </p>
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '0.5rem' }}>
        <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#4CAF50', whiteSpace: 'nowrap' }}>
          +{formatCurrency(tx.amount)}
        </p>
        <p style={{ fontSize: '0.62rem', color: '#555', marginTop: '0.12rem' }}>{getRelativeTime(tx.timestampMs)}</p>
      </div>
    </div>
  );
}

// ─── Live Cashback Card ────────────────────────────────────────────
export default function HeroCashbackCard() {
  const [stats, setStats] = useState(() => loadOrInitStats());
  const [txList, setTxList] = useState<CashbackTransaction[]>(() => getInitialTransactions(5));
  const [newTxId, setNewTxId] = useState<string | null>(null);
  const [flashTotal, setFlashTotal] = useState(false);
  const [, setTick] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount animation
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  // Timestamp refresh
  useEffect(() => {
    const iv = setInterval(() => setTick(t => t + 1), 25_000);
    return () => clearInterval(iv);
  }, []);

  // Live feed
  const scheduleNext = useCallback(() => {
    timerRef.current = setTimeout(() => {
      const ev = generateMockCashbackEvent();
      setTxList(prev => [ev, ...prev].slice(0, 6));
      setNewTxId(ev.id);
      setTimeout(() => setNewTxId(null), 2500);
      setStats(prev => {
        const next = { ...prev, totalCashback: prev.totalCashback + ev.amount, monthCashback: prev.monthCashback + ev.amount };
        saveStats(next);
        return next;
      });
      setFlashTotal(true);
      setTimeout(() => setFlashTotal(false), 1000);
      scheduleNext();
    }, getRandomDelay());
  }, []);

  useEffect(() => {
    const init = setTimeout(() => scheduleNext(), 4500);
    return () => { clearTimeout(init); clearTimeout(timerRef.current); };
  }, [scheduleNext]);

  // Hover tilt — very subtle
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -3, y: dx * 3 }); // max 3deg
  };
  const handleMouseLeave = () => { setTilt({ x: 0, y: 0 }); setIsHovered(false); };
  const handleMouseEnter = () => setIsHovered(true);

  const isMock = USE_MOCK_CASHBACK_DATA;

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }} className="hero-dashboard">
      {/* Glow behind card */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '420px', height: '420px',
        background: 'radial-gradient(circle, rgba(212,175,55,0.16) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'glow-pulse 4s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: '380px',
          background: 'rgba(13,13,13,0.92)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${isHovered ? 'rgba(212,175,55,0.55)' : 'rgba(212,175,55,0.28)'}`,
          borderRadius: '1.5rem',
          padding: '1.6rem',
          boxShadow: isHovered
            ? '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.12)'
            : '0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.06)',
          transform: `
            ${mounted ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)'}
            perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)
          `,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.6s ease, transform 0.45s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease, box-shadow 0.3s ease',
          animation: mounted ? 'float 6s ease-in-out infinite' : 'none',
          willChange: 'transform',
        }}
      >
        {/* ── Card Header ─────────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.1rem' }}>
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#B8B8B8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
              Hoạt động cashback
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="live-dot-anim" style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#4ade80', flexShrink: 0, display: 'inline-block',
              }} />
              <span style={{ fontSize: '0.68rem', color: '#4ade80', fontWeight: 600 }}>Live Activity</span>
            </div>
          </div>
          <div style={{
            padding: '0.3rem 0.7rem', borderRadius: '999px',
            background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.35)',
            fontSize: '0.65rem', fontWeight: 700, color: '#D4AF37',
          }}>
            ✓ Đã xác minh UID
          </div>
        </div>

        {/* ── Main stat ───────────────────────────────────── */}
        <div style={{
          marginBottom: '0.9rem', paddingBottom: '0.9rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <p style={{ fontSize: '0.68rem', color: '#666', marginBottom: '0.3rem', fontWeight: 500 }}>
            Tổng cashback đã ghi nhận
          </p>
          <p style={{
            fontSize: '1.85rem', fontWeight: 900, lineHeight: 1,
            background: 'linear-gradient(135deg,#FFD700,#D4AF37)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            <AnimatedCounter target={stats.totalCashback} duration={900} flash={flashTotal} />
          </p>
          {isMock && (
            <p style={{ fontSize: '0.6rem', color: '#444', marginTop: '0.25rem', fontStyle: 'italic' }}>
              Dữ liệu minh họa
            </p>
          )}
        </div>

        {/* ── Secondary stats ─────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1rem' }}>
          {[
            { label: 'Cashback tháng này', value: `$${stats.monthCashback.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`, gold: true },
            { label: 'Sàn hỗ trợ', value: '13 sàn', gold: false },
          ].map(item => (
            <div key={item.label} style={{
              background: 'rgba(255,255,255,0.025)', borderRadius: '0.75rem',
              padding: '0.7rem 0.8rem', border: '1px solid rgba(212,175,55,0.1)',
            }}>
              <p style={{ fontSize: '0.62rem', color: '#666', marginBottom: '0.2rem', fontWeight: 500 }}>{item.label}</p>
              <p style={{ fontSize: '1rem', fontWeight: 800, color: item.gold ? '#D4AF37' : '#F8F5E9' }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* ── Recent transactions ─────────────────────────── */}
        <div>
          <p style={{ fontSize: '0.65rem', color: '#555', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.55rem' }}>
            Hoàn phí gần đây
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {txList.slice(0, 5).map(tx => (
              <TxRow key={tx.id} tx={tx} isNew={tx.id === newTxId} />
            ))}
          </div>
        </div>

        {/* ── Footer note ─────────────────────────────────── */}
        <div style={{
          marginTop: '0.875rem', paddingTop: '0.75rem',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
        }}>
          <p style={{ fontSize: '0.6rem', color: '#444', lineHeight: 1.5 }}>
            Thông tin tài khoản được ẩn để bảo vệ quyền riêng tư.
          </p>
          <span style={{
            fontSize: '0.58rem', color: '#333', whiteSpace: 'nowrap',
            padding: '0.15rem 0.4rem', borderRadius: '4px',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            Cập nhật định kỳ
          </span>
        </div>
      </div>
    </div>
  );
}
