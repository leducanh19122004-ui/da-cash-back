'use client';
import { useState } from 'react';
import { exchanges } from '../data/exchanges';
import ExchangeCard from './ExchangeCard';
import { useLang } from '../contexts/LanguageContext';

export default function ExchangesSection() {
  const [filter, setFilter] = useState<'all' | 'crypto' | 'forex'>('all');
  const { t } = useLang();
  const ex = t.exchanges;

  const filtered = filter === 'all' ? exchanges : exchanges.filter(e => e.type === filter);

  // Duplicate enough times to always fill the viewport even for small sets
  const minReps  = Math.ceil(20 / filtered.length) + 1; // at least 20 cards visible
  const cards    = Array.from({ length: minReps * 2 }, (_, i) => filtered[i % filtered.length]);
  const CARD_W   = 290 + 16; // card width + gap
  const halfW    = filtered.length * minReps * CARD_W; // px for one full set
  const duration = Math.max(filtered.length * 4, 18);  // 4s per card — faster, still smooth

  return (
    <section id="exchanges" style={{ padding: '5rem 0', background: 'transparent' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            {ex.badge}
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '1rem' }}>
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
        className="exchanges-carousel-wrapper"
        style={{ position: 'relative', overflow: 'hidden', padding: '0.5rem 0 1.5rem' }}
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

        {/* Scrolling track — key=filter forces CSS animation restart on filter change */}
        <div
          key={filter}
          className="exchanges-track"
          style={{
            display: 'flex', gap: '1rem',
            padding: '0.5rem 1rem',
            width: 'max-content',
            animationName: 'exchanges-marquee',
            animationDuration: `${duration}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationPlayState: 'running',
            willChange: 'transform',
          }}
        >
          {cards.map((exchange, idx) => (
            <ExchangeCard key={`${exchange.id}-${idx}`} exchange={exchange} />
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{
          marginTop: '1rem', padding: '0.875rem 1.25rem', borderRadius: '0.75rem',
          background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.12)',
          display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
        }}>
          <span style={{ fontSize: '0.85rem', flexShrink: 0 }}>⚠️</span>
          <p style={{ fontSize: '0.78rem', color: '#666', lineHeight: 1.6 }}>{ex.disclaimer}</p>
        </div>
      </div>

      {/* Keyframe + pause-on-hover */}
      <style>{`
        @keyframes exchanges-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .exchanges-carousel-wrapper:hover .exchanges-track {
          animation-play-state: paused;
        }
        .exchange-card { user-select: none; }
        @media (prefers-reduced-motion: reduce) {
          .exchanges-track { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
