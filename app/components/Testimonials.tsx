'use client';
import { useLang } from '../contexts/LanguageContext';
export default function Testimonials() {
  const { t } = useLang();
  const ts = t.test;
  return (
    <section style={{ padding: '6rem 1.5rem', background: '#0B0B0B' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{ts.badge}</p>
          <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '0.5rem' }}>{ts.title}</h2>
          <p style={{ fontSize: '0.8rem', color: '#555', fontStyle: 'italic' }}>{ts.note}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }} className="testimonials-grid">
          {ts.items.map((item, idx) => (
            <div key={idx} style={{ background: '#111111', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '1.25rem', padding: '1.75rem', transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-4px)'; el.style.borderColor = 'rgba(212,175,55,0.5)'; el.style.boxShadow = '0 8px 32px rgba(212,175,55,0.1)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'none'; el.style.borderColor = 'rgba(212,175,55,0.2)'; el.style.boxShadow = 'none'; }}>
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                {Array.from({ length: 5 }).map((_, i) => <span key={i} style={{ color: '#D4AF37', fontSize: '1rem' }}>★</span>)}
              </div>
              <p style={{ fontSize: '0.9rem', color: '#B8B8B8', lineHeight: 1.7, marginBottom: '1.25rem', fontStyle: 'italic' }}>&ldquo;{item.text}&rdquo;</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg,#FFD700,#D4AF37)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700, color: '#050505' }}>{item.name[0]}</div>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#F8F5E9' }}>{item.name}</p>
                  <p style={{ fontSize: '0.75rem', color: '#666' }}>{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.testimonials-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:550px){.testimonials-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
