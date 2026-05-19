'use client';
import { useLang } from '../contexts/LanguageContext';
export default function BenefitsSection() {
  const { t } = useLang();
  const b = t.benefits;
  const items = [
    { icon: '🔄', title: b.b1t, desc: b.b1d },
    { icon: '🆓', title: b.b2t, desc: b.b2d },
    { icon: '💸', title: b.b3t, desc: b.b3d },
    { icon: '📈', title: b.b4t, desc: b.b4d },
    { icon: '🌐', title: b.b5t, desc: b.b5d },
    { icon: '🔒', title: b.b6t, desc: b.b6d },
  ];
  return (
    <section id="benefits" style={{ padding: '6rem 1.5rem', background: 'rgba(5,5,5,0)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{b.badge}</p>
          <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '1rem' }}>{b.title}</h2>
          <p style={{ color: '#888', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>{b.desc}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }} className="benefits-grid">
          {items.map(item => (
            <div key={item.title} style={{ background: 'rgba(8,7,5,0.62)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-4px)'; el.style.borderColor = 'rgba(212,175,55,0.55)'; el.style.boxShadow = '0 8px 32px rgba(212,175,55,0.12)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'none'; el.style.borderColor = 'rgba(212,175,55,0.2)'; el.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: '2rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#F8F5E9' }}>{item.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#777', lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:1024px){.benefits-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:600px){.benefits-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
