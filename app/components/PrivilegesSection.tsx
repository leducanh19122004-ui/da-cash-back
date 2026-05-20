'use client';
import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { privilegesTranslations } from '../translations';

export default function PrivilegesSection() {
  const { lang } = useLang();
  const p = privilegesTranslations[lang as keyof typeof privilegesTranslations]
    ?? privilegesTranslations.vi;

  const cards = [p.p1, p.p2, p.p3];

  const titleLines = p.title.split('\\n');

  return (
    <section
      id="privileges"
      style={{ position: 'relative', padding: '8rem 1.5rem', overflow: 'hidden' }}
    >
      {/* ── Background layer ──────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 85% 65% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 65%),
          radial-gradient(ellipse 55% 45% at 5%  50%, rgba(212,175,55,0.055) 0%, transparent 55%),
          radial-gradient(ellipse 55% 45% at 95% 50%, rgba(212,175,55,0.05)  0%, transparent 55%)
        `,
      }} />
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(212,175,55,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.05) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 90% 75% at 50% 50%, black 25%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 75% at 50% 50%, black 25%, transparent 75%)',
      }} />
      {/* Top + bottom accent lines */}
      {[0, 1].map(i => (
        <div key={i} style={{
          position: 'absolute', [i === 0 ? 'top' : 'bottom']: 0,
          left: '8%', right: '8%', height: '1px',
          background: `linear-gradient(90deg, transparent, rgba(212,175,55,${i===0?0.45:0.3}) 30%, rgba(212,175,55,${i===0?0.7:0.5}) 50%, rgba(212,175,55,${i===0?0.45:0.3}) 70%, transparent)`,
          zIndex: 1,
        }} />
      ))}

      <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* ── Header ─────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.38rem 1rem', borderRadius: '999px', marginBottom: '1.25rem',
            background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.4)',
            fontSize: '0.75rem', fontWeight: 700, color: '#D4AF37',
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            ✦ {p.badge} ✦
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 900,
            lineHeight: 1.12, letterSpacing: '-0.02em',
            color: '#F8F5E9', marginBottom: '1.1rem',
          }}>
            {titleLines[0]}{titleLines[1] && <><br />
              <span style={{
                background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {titleLines[1]}
              </span>
            </>}
          </h2>
          <p style={{ color: '#999', maxWidth: '580px', margin: '0 auto', lineHeight: 1.75, fontSize: '0.975rem' }}>
            {p.subtitle}
          </p>
        </div>

        {/* ── 3 Cards ─────────────────────────────────────── */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', marginBottom: '3rem' }}
          className="privileges-grid"
        >
          {cards.map((card, idx) => (
            <PrivilegeCard key={idx} card={card} idx={idx} disclaimer={idx === 0 ? p.disclaimer : ''} />
          ))}
        </div>

        {/* ── CTA ─────────────────────────────────────────── */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="https://t.me/jacksondz"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.65rem',
              padding: '1rem 2.75rem', fontWeight: 800, fontSize: '1.05rem',
              background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
              color: '#050505', borderRadius: '0.875rem',
              textDecoration: 'none',
              boxShadow: '0 6px 32px rgba(212,175,55,0.45)',
              transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(212,175,55,0.55)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 6px 32px rgba(212,175,55,0.45)';
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>⚡</span>
            {p.ctaText}
            <span>→</span>
          </a>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .privileges-grid{ grid-template-columns:1fr !important; }}
        @media(min-width:561px) and (max-width:900px){ .privileges-grid{ grid-template-columns:1fr 1fr !important; }}
      `}</style>
    </section>
  );
}

// ── Card sub-component ────────────────────────────────────
interface CardData {
  icon: string; title: string; sub: string; points: string[];
}
function PrivilegeCard({ card, idx, disclaimer }: { card: CardData; idx: number; disclaimer: string }) {
  const [hov, setHov] = useState(false);

  const accentColors = [
    'rgba(212,175,55,', // gold
    'rgba(99,179,237,', // blue
    'rgba(167,139,250,', // purple
  ];
  const ac = accentColors[idx] || accentColors[0];

  return (
    <div
      style={{
        background: 'rgba(10,9,6,0.8)',
        border: `1px solid ${hov ? `${ac}0.6)` : `${ac}0.25)`}`,
        borderRadius: '1.5rem', padding: '2rem',
        display: 'flex', flexDirection: 'column', gap: '1.25rem',
        backdropFilter: 'blur(14px)',
        boxShadow: hov ? `0 18px 50px ${ac}0.18), 0 0 0 1px ${ac}0.1)` : 'none',
        transform: hov ? 'translateY(-7px)' : 'none',
        transition: 'transform 0.3s ease, border-color 0.3s, box-shadow 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Icon */}
      <div style={{
        width: '62px', height: '62px', borderRadius: '1.1rem', flexShrink: 0,
        background: `linear-gradient(135deg, ${ac}0.18), ${ac}0.06))`,
        border: `1.5px solid ${ac}0.4)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.75rem',
        boxShadow: hov ? `0 0 24px ${ac}0.3)` : `0 0 12px ${ac}0.12)`,
        transition: 'box-shadow 0.3s',
      }}>
        {card.icon}
      </div>

      {/* Title */}
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F8F5E9', marginBottom: '0.35rem', lineHeight: 1.25 }}>
          {card.title}
        </h3>
        <p style={{ fontSize: '0.8rem', color: '#D4AF37', fontWeight: 600, letterSpacing: '0.03em' }}>
          {card.sub}
        </p>
      </div>

      {/* Points */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem', flexGrow: 1 }}>
        {card.points.map((pt, i) => (
          <li key={i} style={{ display: 'flex', gap: '0.55rem', alignItems: 'flex-start' }}>
            <span style={{ color: '#D4AF37', fontSize: '0.75rem', flexShrink: 0, marginTop: '0.2rem', fontWeight: 700 }}>✦</span>
            <span style={{ fontSize: '0.855rem', color: '#B0B0B0', lineHeight: 1.6 }}>{pt}</span>
          </li>
        ))}
      </ul>

      {/* Disclaimer (signal card only) */}
      {disclaimer && (
        <p style={{
          fontSize: '0.68rem', color: '#555', lineHeight: 1.55,
          borderTop: '1px solid rgba(212,175,55,0.1)', paddingTop: '0.875rem',
          fontStyle: 'italic',
        }}>
          ⚠️ {disclaimer}
        </p>
      )}
    </div>
  );
}
