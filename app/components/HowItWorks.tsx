'use client';
import { useLang } from '../contexts/LanguageContext';
export default function HowItWorks() {
  const { t } = useLang();
  const h = t.how;
  const steps = [
    { step: '01', icon: '🏦', title: h.s1t, desc: h.s1d },
    { step: '02', icon: '🔗', title: h.s2t, desc: h.s2d },
    { step: '03', icon: '🔍', title: h.s3t, desc: h.s3d },
    { step: '04', icon: '💰', title: h.s4t, desc: h.s4d },
  ];
  return (
    <section id="how-it-works" style={{ padding: '6rem 1.5rem', background: 'rgba(5,5,5,0)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{h.badge}</p>
          <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '1rem' }}>{h.title}</h2>
          <p style={{ color: '#888', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>{h.desc}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem', position: 'relative' }} className="steps-grid">
          <div style={{ position: 'absolute', top: '3.25rem', left: '12%', right: '12%', height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.4), rgba(212,175,55,0.1), rgba(212,175,55,0.4))' }} className="steps-connector" />
          {steps.map(step => (
            <div key={step.step} style={{ background: 'rgba(8,7,5,0.62)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '1.25rem', padding: '1.75rem 1.25rem', textAlign: 'center', position: 'relative', transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-4px)'; el.style.borderColor = 'rgba(212,175,55,0.55)'; el.style.boxShadow = '0 8px 32px rgba(212,175,55,0.12)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'none'; el.style.borderColor = 'rgba(212,175,55,0.2)'; el.style.boxShadow = 'none'; }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', margin: '0 auto 1rem', background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, color: '#050505', boxShadow: '0 0 16px rgba(212,175,55,0.3)' }}>{step.step}</div>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{step.icon}</div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8F5E9', marginBottom: '0.75rem' }}>{step.title}</h3>
              <p style={{ fontSize: '0.82rem', color: '#777', lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="#exchanges" style={{ display: 'inline-block', padding: '0.875rem 2.5rem', fontWeight: 700, fontSize: '1rem', background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', color: '#050505', borderRadius: '0.75rem', textDecoration: 'none', boxShadow: '0 4px 24px rgba(212,175,55,0.3)', transition: 'opacity 0.2s, transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}>
            {h.cta}
          </a>
        </div>
      </div>
      <style>{`@media(max-width:1024px){.steps-grid{grid-template-columns:1fr 1fr!important}.steps-connector{display:none!important}}@media(max-width:600px){.steps-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
