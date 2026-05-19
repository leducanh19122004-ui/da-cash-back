'use client';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import HeroCashbackCard from './HeroCashbackCard';

// ─── Floating particles ────────────────────────────────────────────
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 2,
  duration: 8 + Math.random() * 14,
  delay: Math.random() * 8,
  opacity: 0.08 + Math.random() * 0.16,
}));

function FloatingGlowBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* Orb 1 — gold, behind headline */}
      <div style={{
        position: 'absolute', top: '15%', left: '5%',
        width: '520px', height: '520px',
        background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 68%)',
        borderRadius: '50%', animation: 'orb-drift-1 22s ease-in-out infinite',
        willChange: 'transform',
      }} />
      {/* Orb 2 — subtle, behind card */}
      <div style={{
        position: 'absolute', top: '30%', right: '2%',
        width: '380px', height: '380px',
        background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)',
        borderRadius: '50%', animation: 'orb-drift-2 28s ease-in-out infinite',
        willChange: 'transform',
      }} />
      {/* Subtle bottom light beam */}
      <div style={{
        position: 'absolute', bottom: '-60px', left: '50%',
        transform: 'translateX(-50%)',
        width: '1px', height: '200px',
        background: 'linear-gradient(to top, transparent, rgba(212,175,55,0.12))',
      }} />
      {/* Noise/grid overlay — very faint */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(212,175,55,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        opacity: 0.4,
      }} />
      {/* Floating particles */}
      {PARTICLES.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`, top: `${p.y}%`,
          width: `${p.size}px`, height: `${p.size}px`,
          borderRadius: '50%',
          background: '#D4AF37',
          opacity: p.opacity,
          animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          willChange: 'transform',
        }} />
      ))}
    </div>
  );
}

// ─── Trust badge ───────────────────────────────────────────────────
function TrustBadge({ icon, text, delay }: { icon: string; text: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
        padding: '0.35rem 0.85rem', borderRadius: '999px',
        background: hov ? 'rgba(212,175,55,0.1)' : 'rgba(212,175,55,0.06)',
        border: `1px solid ${hov ? 'rgba(212,175,55,0.45)' : 'rgba(212,175,55,0.2)'}`,
        fontSize: '0.75rem', fontWeight: 500, color: '#B8B8B8',
        cursor: 'default',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(8px) scale(0.96)',
        transition: 'opacity 0.5s ease, transform 0.5s ease, background 0.2s, border-color 0.2s, box-shadow 0.2s',
        boxShadow: hov ? '0 0 12px rgba(212,175,55,0.12)' : 'none',
      }}
    >
      <span style={{ fontSize: '0.88rem' }}>{icon}</span>
      {text}
    </div>
  );
}

// ─── Animated headline word ────────────────────────────────────────
function AnimLine({ children, delay, gold = false }: { children: React.ReactNode; delay: number; gold?: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <span style={{
      display: 'inline',
      opacity: visible ? 1 : 0,
      filter: visible ? 'blur(0)' : 'blur(5px)',
      transform: visible ? 'none' : 'translateY(12px)',
      transition: 'opacity 0.65s ease, filter 0.65s ease, transform 0.65s ease',
      ...(gold ? {
        background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      } : { color: '#F8F5E9' }),
    }}>
      {children}
    </span>
  );
}

// ─── Shine CTA button ─────────────────────────────────────────────
function ShineButton({ href, primary, children, delay = 0 }: {
  href: string; primary: boolean; children: React.ReactNode; delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <a
      href={href}
      className={primary ? 'btn-shine' : ''}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        padding: primary ? '0.875rem 2rem' : '0.875rem 1.75rem',
        fontWeight: 700, fontSize: '0.95rem', borderRadius: '0.75rem',
        textDecoration: 'none', cursor: 'pointer',
        ...(primary ? {
          background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
          color: '#050505',
          boxShadow: hov ? '0 6px 28px rgba(212,175,55,0.45)' : '0 4px 20px rgba(212,175,55,0.28)',
        } : {
          background: hov ? 'rgba(212,175,55,0.1)' : 'transparent',
          border: `1.5px solid ${hov ? '#D4AF37' : 'rgba(212,175,55,0.55)'}`,
          color: '#D4AF37',
        }),
        opacity: visible ? 1 : 0,
        transform: visible
          ? (pressed ? 'translateY(1px) scale(0.985)' : hov ? 'translateY(-2px)' : 'none')
          : 'translateY(12px)',
        transition: 'opacity 0.55s ease, transform 0.18s ease, box-shadow 0.25s ease, background 0.2s, border-color 0.2s',
      }}
    >
      {children}
    </a>
  );
}

// ─── Main HeroSection ─────────────────────────────────────────────
export default function HeroSection() {
  const { t } = useLang();

  // Scroll reveal for bottom badge row
  const badgeRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '5rem',
        background: 'rgba(5,5,5,0)',
      }}
    >
      <FloatingGlowBackground />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }} className="hero-grid">

          {/* ── LEFT — Text content ──────────────────────── */}
          <div>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1rem', borderRadius: '999px', marginBottom: '1.5rem',
              border: '1px solid rgba(212,175,55,0.35)',
              background: 'rgba(212,175,55,0.07)',
              fontSize: '0.78rem', fontWeight: 600, color: '#D4AF37',
              animation: 'fade-up-blur 0.7s ease 0.1s both',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37',
                display: 'inline-block', animation: 'live-dot 2.5s ease-in-out infinite',
              }} />
              {t.hero.badge}
            </div>

            {/* Headline — staggered */}
            <h1 style={{
              fontSize: 'clamp(2rem,4vw,3.25rem)',
              fontWeight: 900, lineHeight: 1.12,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}>
              <AnimLine delay={150}>{t.hero.title1}{' '}</AnimLine>
              <AnimLine delay={280} gold>{t.hero.titleHighlight1}</AnimLine>
              <br />
              <AnimLine delay={400}>{t.hero.title2}{' '}</AnimLine>
              <AnimLine delay={520} gold>{t.hero.titleHighlight2}</AnimLine>
            </h1>

            {/* Subtext */}
            <p style={{
              fontSize: '1rem', lineHeight: 1.75, color: '#999',
              marginBottom: '2.25rem', maxWidth: '500px',
              animation: 'fade-up-blur 0.7s ease 0.6s both',
            }}>
              {t.hero.desc}
            </p>

            {/* CTA buttons */}
            <div style={{
              display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginBottom: '2rem',
            }}>
              <ShineButton href="#exchanges" primary delay={750}>{t.hero.cta1}</ShineButton>
              <ShineButton href="#exchanges" primary={false} delay={850}>{t.hero.cta2}</ShineButton>
            </div>

            {/* Trust badges */}
            <div ref={badgeRef} style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <TrustBadge icon="🔒" text={t.hero.badge1} delay={950} />
              <TrustBadge icon="🛡️" text={t.hero.badge2} delay={1050} />
              <TrustBadge icon="✅" text={t.hero.badge3} delay={1150} />
            </div>
          </div>

          {/* ── RIGHT — Live Cashback Card ───────────────── */}
          <HeroCashbackCard />
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .hero-grid{grid-template-columns:1fr!important;gap:3rem!important}
          .hero-dashboard{order:-1}
        }
      `}</style>
    </section>
  );
}
