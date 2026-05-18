'use client';
import { useLang } from '../contexts/LanguageContext';

export default function HeroSection() {
  const { t } = useLang();
  const h = t.hero;
  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '5rem', background: '#0B0B0B' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 60% at 65% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '999px', marginBottom: '1.5rem', border: '1px solid rgba(212,175,55,0.35)', background: 'rgba(212,175,55,0.07)', fontSize: '0.8rem', fontWeight: 600, color: '#D4AF37' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', display: 'inline-block' }} />
              {h.badge}
            </div>
            <h1 style={{ fontSize: 'clamp(1.85rem,3.5vw,3rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '1.5rem', color: '#F8F5E9' }}>
              {h.title1}{' '}
              <span style={{ background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{h.titleHighlight1}</span>{' '}
              {h.title2}{' '}
              <span style={{ background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{h.titleHighlight2}</span>
            </h1>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#B8B8B8', marginBottom: '2.5rem', maxWidth: '520px' }}>{h.desc}</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <a href="#exchanges" style={{ padding: '0.875rem 2rem', fontWeight: 700, fontSize: '0.95rem', background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', color: '#050505', borderRadius: '0.75rem', textDecoration: 'none', boxShadow: '0 4px 24px rgba(212,175,55,0.3)', transition: 'opacity 0.2s, transform 0.2s', display: 'inline-block' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}>
                {h.cta1}
              </a>
              <a href="#exchanges" style={{ padding: '0.875rem 2rem', fontWeight: 600, fontSize: '0.95rem', border: '1.5px solid #D4AF37', color: '#D4AF37', borderRadius: '0.75rem', textDecoration: 'none', transition: 'background 0.2s, transform 0.2s', display: 'inline-block' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none'; }}>
                {h.cta2}
              </a>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {[h.badge1, h.badge2, h.badge3].map(b => (
                <span key={b} style={{ padding: '0.35rem 0.75rem', borderRadius: '999px', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', fontSize: '0.75rem', fontWeight: 500, color: '#B8B8B8' }}>{b}</span>
              ))}
            </div>
          </div>
          {/* Dashboard Mockup */}
          <div style={{ display: 'flex', justifyContent: 'center' }} className="hero-dashboard">
            <div style={{ background: '#111111', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '1.5rem', padding: '1.75rem', width: '100%', maxWidth: '380px', boxShadow: '0 0 60px rgba(212,175,55,0.1), 0 20px 60px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div>
                  <p style={{ fontSize: '0.72rem', color: '#666', marginBottom: '0.2rem' }}>{h.dashTotal}</p>
                  <p style={{ fontSize: '2rem', fontWeight: 900, background: 'linear-gradient(135deg,#FFD700,#D4AF37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>$1,248.50</p>
                </div>
                <div style={{ padding: '0.3rem 0.7rem', borderRadius: '999px', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.35)', fontSize: '0.7rem', fontWeight: 700, color: '#D4AF37' }}>{h.dashVerified}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1rem' }}>
                {[{ l: h.dashMonth, v: '$182.30', g: true }, { l: h.dashExchanges, v: '9', g: false }].map(item => (
                  <div key={item.l} style={{ background: '#1A1A1A', borderRadius: '0.75rem', padding: '0.75rem', border: '1px solid rgba(212,175,55,0.12)' }}>
                    <p style={{ fontSize: '0.65rem', color: '#666', marginBottom: '0.2rem' }}>{item.l}</p>
                    <p style={{ fontSize: '1.05rem', fontWeight: 700, color: item.g ? '#D4AF37' : '#F8F5E9' }}>{item.v}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: '#1A1A1A', borderRadius: '0.75rem', padding: '0.875rem', border: '1px solid rgba(212,175,55,0.12)' }}>
                <p style={{ fontSize: '0.68rem', color: '#666', marginBottom: '0.6rem', fontWeight: 600 }}>{h.dashRecent}</p>
                {[{ ex: 'Binance', init: 'BN', amt: '+$42.10', time: '2h' }, { ex: 'Bybit', init: 'BB', amt: '+$28.50', time: '1d' }, { ex: 'OKX', init: 'OK', amt: '+$19.80', time: '2d' }].map(tx => (
                  <div key={tx.ex} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', fontWeight: 700, color: '#D4AF37' }}>{tx.init}</div>
                      <div><p style={{ fontSize: '0.78rem', fontWeight: 600 }}>{tx.ex}</p><p style={{ fontSize: '0.65rem', color: '#555' }}>{tx.time}</p></div>
                    </div>
                    <span style={{ color: '#4CAF50', fontWeight: 700, fontSize: '0.8rem' }}>{tx.amt}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '0.875rem', padding: '0.65rem', borderRadius: '0.75rem', background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#D4AF37' }}>💰</span>
                <p style={{ fontSize: '0.72rem', color: '#B8B8B8' }}>{h.dashNext} <strong style={{ color: '#D4AF37' }}>T6, 23/05</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.hero-grid{grid-template-columns:1fr!important;gap:2.5rem!important}.hero-dashboard{margin-top:0}}`}</style>
    </section>
  );
}
