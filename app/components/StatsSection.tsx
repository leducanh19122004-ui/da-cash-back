'use client';
import { useLang } from '../contexts/LanguageContext';
export default function StatsSection() {
  const { t } = useLang();
  const s = t.stats;
  const items = [
    { icon: '🏦', v: s.s1v, l: s.s1l, sub: s.s1s },
    { icon: '💰', v: s.s2v, l: s.s2l, sub: s.s2s },
    { icon: '🔄', v: s.s3v, l: s.s3l, sub: s.s3s },
    { icon: '📊', v: s.s4v, l: s.s4l, sub: s.s4s },
  ];
  return (
    <section style={{ padding: '2.5rem 1.5rem', background: 'rgba(5,5,5,0)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem' }} className="stats-grid">
          {items.map(item => (
            <div key={item.l} style={{ background: 'rgba(8,7,5,0.62)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '1.25rem', padding: '1.75rem 1.25rem', textAlign: 'center', transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease', cursor: 'default' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-4px)'; el.style.borderColor = 'rgba(212,175,55,0.5)'; el.style.boxShadow = '0 8px 32px rgba(212,175,55,0.12)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'none'; el.style.borderColor = 'rgba(212,175,55,0.2)'; el.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.25rem', background: 'linear-gradient(135deg,#FFD700,#D4AF37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{item.v}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8F5E9', marginBottom: '0.25rem' }}>{item.l}</div>
              <div style={{ fontSize: '0.72rem', color: '#666', fontStyle: 'italic' }}>{item.sub}</div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.78rem', color: '#555', fontStyle: 'italic' }}>{s.note}</p>
      </div>
      <style>{`@media(max-width:900px){.stats-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:480px){.stats-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
