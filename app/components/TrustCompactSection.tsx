'use client';
import { useLang } from '../contexts/LanguageContext';
import { safetyTranslations } from '../translations';

export default function TrustCompactSection() {
  const { lang } = useLang();
  const tr = safetyTranslations[lang as keyof typeof safetyTranslations]
    ?? safetyTranslations.vi;

  return (
    <section
      id="trust-compact"
      style={{ padding: '4rem 1.5rem', background: 'transparent' }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{
            display: 'inline-block', padding: '0.3rem 0.9rem', borderRadius: '999px',
            background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.28)',
            fontSize: '0.7rem', fontWeight: 700, color: 'rgba(212,175,55,0.85)',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            {tr.badge}
          </span>
          <h2 style={{
            fontSize: 'clamp(1.3rem,2.5vw,1.75rem)', fontWeight: 800,
            color: '#E8E0D0', marginBottom: '0.6rem', lineHeight: 1.2,
          }}>
            {tr.title}
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#777', maxWidth: '580px', margin: '0 auto', lineHeight: 1.65 }}>
            {tr.desc}
          </p>
        </div>

        {/* 2-column card */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
          marginBottom: '1rem',
        }} className="trust-two-col">

          {/* Left — can need (green) */}
          <div style={{
            background: 'rgba(8,7,4,0.82)', backdropFilter: 'blur(14px)',
            border: '1px solid rgba(76,175,80,0.25)', borderRadius: '1.25rem',
            padding: '1.5rem 1.75rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '1.1rem' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                background: 'rgba(76,175,80,0.12)', border: '1px solid rgba(76,175,80,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem',
              }}>✅</div>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#4CAF50' }}>
                {tr.canNeedTitle}
              </h3>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.62rem' }}>
              {tr.canNeed.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#4CAF50', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0, marginTop: '0.18rem' }}>✓</span>
                  <span style={{ fontSize: '0.875rem', color: '#C0C0C0', lineHeight: 1.55 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — never ask (red) */}
          <div style={{
            background: 'rgba(8,7,4,0.82)', backdropFilter: 'blur(14px)',
            border: '1px solid rgba(239,68,68,0.22)', borderRadius: '1.25rem',
            padding: '1.5rem 1.75rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '1.1rem' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem',
              }}>🚫</div>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#EF4444' }}>
                {tr.neverAskTitle}
              </h3>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.62rem' }}>
              {tr.neverAsk.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#EF4444', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0, marginTop: '0.18rem' }}>⛔</span>
                  <span style={{ fontSize: '0.875rem', color: '#C0C0C0', lineHeight: 1.55 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Warning banner */}
        <div style={{
          background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: '0.875rem', padding: '1rem 1.25rem',
          display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '1rem', flexShrink: 0 }}>⚠️</span>
          <p style={{ fontSize: '0.82rem', color: '#B0B0B0', lineHeight: 1.65 }}>
            <strong style={{ color: '#EF4444', fontWeight: 700 }}>{tr.warningTitle}:</strong>{' '}
            {tr.warningText}
            {tr.warningLink && (
              <a href={tr.warningLink} target="_blank" rel="noopener noreferrer"
                style={{ color: '#D4AF37', textDecoration: 'underline', marginLeft: '0.25rem' }}>
                Telegram
              </a>
            )}
          </p>
        </div>

      </div>

      <style>{`
        @media(max-width:700px){
          .trust-two-col{ grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  );
}
