'use client';
import { useLang } from '../contexts/LanguageContext';
import { safetyTranslations } from '../translations';

export default function SafetySection() {
  const { lang } = useLang();
  const s = safetyTranslations[lang as keyof typeof safetyTranslations] ?? safetyTranslations.vi;

  return (
    <section id="safety" style={{ padding: '6rem 1.5rem', background: 'rgba(5,5,5,0)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            {s.badge}
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.25rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '0.75rem' }}>
            {s.title}
          </h2>
          <p style={{ color: '#888', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.9rem' }}>
            {s.desc}
          </p>
        </div>

        {/* Two-column table */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }} className="safety-grid">

          {/* CAN NEED */}
          <div style={{ background: 'rgba(8,7,5,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '1.25rem', padding: '1.75rem', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
              <span style={{ fontSize: '1.25rem' }}>✅</span>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#D4AF37' }}>{s.canNeedTitle}</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {s.canNeed.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <span style={{ color: '#4CAF50', fontSize: '0.85rem', flexShrink: 0, marginTop: '0.1rem' }}>→</span>
                  <p style={{ fontSize: '0.875rem', color: '#B8B8B8', lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* NEVER ASK */}
          <div style={{ background: 'rgba(26,10,10,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '1.25rem', padding: '1.75rem', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(239,68,68,0.15)' }}>
              <span style={{ fontSize: '1.25rem' }}>⛔</span>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ef4444' }}>{s.neverAskTitle}</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {s.neverAsk.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <span style={{ color: '#ef4444', fontSize: '0.85rem', flexShrink: 0, marginTop: '0.1rem' }}>✕</span>
                  <p style={{ fontSize: '0.875rem', color: '#B8B8B8', lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Warning box */}
        <div style={{ background: 'rgba(26,10,10,0.9)', backdropFilter: 'blur(12px)', border: '2px solid rgba(239,68,68,0.4)', borderRadius: '1rem', padding: '1.5rem 2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>🚨</span>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ef4444', marginBottom: '0.5rem' }}>
              {s.warningTitle}
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#B8B8B8', lineHeight: 1.7 }}>
              {s.warningText.replace('{highlight}', '')}{' '}
              <strong style={{ color: '#F8F5E9' }}>{s.warningLink}</strong>
              {s.warningText.includes('{highlight}')
                ? s.warningText.split('{highlight}')[1]
                : ''}{' '}
              <a href="https://t.me/jacksondz" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: 600 }}>
                Telegram @jacksondz
              </a>.
            </p>
          </div>
        </div>

      </div>
      <style>{`@media(max-width:768px){.safety-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
