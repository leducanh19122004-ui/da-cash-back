'use client';
import { useLang } from '../contexts/LanguageContext';
export default function TrustSafety() {
  const { t } = useLang();
  const tr = t.trust;
  const points = [
    { icon: '🚫', text: tr.p1 }, { icon: '🚫', text: tr.p2 },
    { icon: '✅', text: tr.p3 }, { icon: '🔍', text: tr.p4 }, { icon: '⛔', text: tr.p5 },
  ];
  return (
    <section id="trust" style={{ padding: '6rem 1.5rem', background: 'transparent' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{tr.badge}</p>
          <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '1rem' }}>{tr.title}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="trust-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {points.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: '#111111', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '0.875rem', padding: '1rem 1.25rem' }}>
                <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{p.icon}</span>
                <p style={{ fontSize: '0.9rem', color: '#B8B8B8', lineHeight: 1.6 }}>{p.text}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '1.25rem', padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🛡️</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(135deg,#FFD700,#D4AF37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{tr.badge2}</h3>
              <p style={{ fontSize: '0.875rem', color: '#777', lineHeight: 1.6 }}>{tr.desc2}</p>
            </div>
            <div style={{ background: '#1A1408', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '1.25rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>⚠️</span>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#D4AF37', marginBottom: '0.5rem' }}>{tr.warning}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#999', lineHeight: 1.7 }}>{tr.warningDesc}</p>
                </div>
              </div>
            </div>
            <div style={{ background: '#111111', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '1.25rem', padding: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8F5E9', marginBottom: '1rem' }}>{tr.onlyNeed}</h4>
              {[tr.need1, tr.need2].map(item => (
                <div key={item} style={{ padding: '0.5rem 0', fontSize: '0.875rem', color: '#B8B8B8', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{item}</div>
              ))}
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8F5E9', margin: '1rem 0 0.75rem' }}>{tr.neverAsk}</h4>
              {[tr.never1, tr.never2, tr.never3, tr.never4].map(item => (
                <div key={item} style={{ padding: '0.5rem 0', fontSize: '0.875rem', color: '#777', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.trust-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </section>
  );
}
