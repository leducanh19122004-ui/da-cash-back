'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { exchanges } from '../data/exchanges';
import ExchangeCard from './ExchangeCard';
import { useLang } from '../contexts/LanguageContext';
import { IconChevronLeft, IconChevronRight, IconAlertTriangle } from './Icons';

const CARD_W = 292;
const GAP = 16;
const STEP = CARD_W + GAP;

function NavBtn({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={dir === 'prev' ? 'Previous' : 'Next'}
      style={{
        position: 'absolute',
        top: '50%',
        ...(dir === 'prev' ? { left: '12px' } : { right: '12px' }),
        transform: 'translateY(-50%)',
        zIndex: 10,
        width: '44px', height: '44px', borderRadius: '50%',
        background: hov ? 'rgba(212,175,55,0.22)' : 'rgba(10,9,6,0.88)',
        border: `1.5px solid ${hov ? '#D4AF37' : 'rgba(212,175,55,0.42)'}`,
        color: '#D4AF37', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s',
        backdropFilter: 'blur(10px)',
        boxShadow: hov ? '0 0 18px rgba(212,175,55,0.28)' : '0 4px 14px rgba(0,0,0,0.45)',
      }}
    >
      {dir === 'prev' ? <IconChevronLeft size={20} /> : <IconChevronRight size={20} />}
    </button>
  );
}

export default function ExchangesSection() {
  const [filter, setFilter] = useState<'all' | 'crypto' | 'forex'>('all');
  const { t } = useLang();
  const ex = t.exchanges;

  const filtered = filter === 'all' ? exchanges : exchanges.filter(e => e.type === filter);
  const len = filtered.length;

  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(len);
  const pausedRef = useRef(false);

  const applyTranslate = useCallback((offset: number, animated: boolean) => {
    if (!trackRef.current) return;
    trackRef.current.style.transition = animated
      ? 'transform 0.42s cubic-bezier(0.4,0,0.2,1)'
      : 'none';
    trackRef.current.style.transform = `translateX(${-offset * STEP}px)`;
  }, []);

  const goNext = useCallback(() => {
    offsetRef.current += 1;
    applyTranslate(offsetRef.current, true);
  }, [applyTranslate]);

  const goPrev = useCallback(() => {
    offsetRef.current -= 1;
    applyTranslate(offsetRef.current, true);
  }, [applyTranslate]);

  const handleTransitionEnd = useCallback(() => {
    const o = offsetRef.current;
    if (o >= len * 2) {
      offsetRef.current = o - len;
      applyTranslate(offsetRef.current, false);
    } else if (o < len) {
      offsetRef.current = o + len;
      applyTranslate(offsetRef.current, false);
    }
  }, [len, applyTranslate]);

  // Reset carousel position on filter change
  useEffect(() => {
    offsetRef.current = filtered.length;
    applyTranslate(filtered.length, false);
  }, [filter, filtered.length, applyTranslate]);

  // Auto-advance
  useEffect(() => {
    const iv = setInterval(() => {
      if (!pausedRef.current) goNext();
    }, 3500);
    return () => clearInterval(iv);
  }, [goNext]);

  const allItems = [...filtered, ...filtered, ...filtered];

  return (
    <section id="exchanges" style={{ padding: '3.5rem 0', background: 'transparent' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            {ex.badge}
          </p>
          <h2 style={{ fontSize: 'clamp(1.35rem,2.5vw,1.75rem)', fontWeight: 800, color: '#F8F5E9', marginBottom: '0.6rem' }}>
            {ex.title}
          </h2>
          <p style={{ color: '#777', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.7, fontSize: '0.9rem' }}>
            {ex.desc}
          </p>

          {/* Filter tabs */}
          <div style={{
            display: 'inline-flex',
            background: 'rgba(8,7,5,0.8)', border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: '0.875rem', padding: '0.25rem', gap: '0.25rem',
          }}>
            {(['all', 'crypto', 'forex'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                style={{
                  padding: '0.45rem 1.25rem', borderRadius: '0.625rem',
                  border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem',
                  transition: 'background 0.2s, color 0.2s',
                  background: filter === tab ? 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)' : 'transparent',
                  color: filter === tab ? '#050505' : '#888',
                }}
              >
                {tab === 'all' ? ex.all : tab === 'crypto' ? ex.crypto : ex.forex}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Carousel ─────────────────────────────────────────── */}
      <div
        style={{ position: 'relative', padding: '0.5rem 0 1.5rem' }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {/* Fade masks */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '120px', zIndex: 2,
          background: 'linear-gradient(to right, #040404 0%, rgba(4,4,4,0.8) 40%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: '120px', zIndex: 2,
          background: 'linear-gradient(to left, #040404 0%, rgba(4,4,4,0.8) 40%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Nav buttons */}
        <NavBtn dir="prev" onClick={goPrev} />
        <NavBtn dir="next" onClick={goNext} />

        {/* Track */}
        <div style={{ overflow: 'hidden', padding: '0.25rem 0' }}>
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            style={{ display: 'flex', gap: `${GAP}px`, padding: '0.25rem 1rem', willChange: 'transform' }}
          >
            {allItems.map((exchange, idx) => (
              <ExchangeCard key={`${exchange.id}-${idx}`} exchange={exchange} />
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{
          marginTop: '1rem', padding: '0.875rem 1.25rem', borderRadius: '0.75rem',
          background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.12)',
          display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
        }}>
          <span style={{ color: '#D4AF37', display: 'flex', flexShrink: 0, marginTop: '1px' }}><IconAlertTriangle size={16} /></span>
          <p style={{ fontSize: '0.78rem', color: '#666', lineHeight: 1.6 }}>{ex.disclaimer.replace(/^⚠️\s*/, '')}</p>
        </div>
      </div>

      <style>{`
        .exchange-card { user-select: none; }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
