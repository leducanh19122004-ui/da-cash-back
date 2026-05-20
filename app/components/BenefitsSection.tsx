'use client';
import { useLang } from '../contexts/LanguageContext';

const BENEFIT_ICONS = ['⚡', '💎', '🔁', '📊', '🌐', '🛡️'];

export default function BenefitsSection() {
  const { t } = useLang();
  const b = t.benefits;

  const items = [
    { icon: BENEFIT_ICONS[0], title: b.b1t, desc: b.b1d },
    { icon: BENEFIT_ICONS[1], title: b.b2t, desc: b.b2d },
    { icon: BENEFIT_ICONS[2], title: b.b3t, desc: b.b3d },
    { icon: BENEFIT_ICONS[3], title: b.b4t, desc: b.b4d },
    { icon: BENEFIT_ICONS[4], title: b.b5t, desc: b.b5d },
    { icon: BENEFIT_ICONS[5], title: b.b6t, desc: b.b6d },
  ];

  return (
    <section
      id="benefits"
      style={{
        position: 'relative',
        padding: '9rem 1.5rem',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      {/* ── Flagship background layer ────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 65%),
          radial-gradient(ellipse 50% 40% at 10% 80%, rgba(212,175,55,0.05) 0%, transparent 55%),
          radial-gradient(ellipse 50% 40% at 90% 20%, rgba(212,175,55,0.04) 0%, transparent 55%)
        `,
      }} />
      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(212,175,55,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.055) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 80%)',
      }} />
      {/* Top gold accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4) 30%, rgba(212,175,55,0.7) 50%, rgba(212,175,55,0.4) 70%, transparent)',
        zIndex: 1,
      }} />
      {/* Bottom gold accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3) 30%, rgba(212,175,55,0.5) 50%, rgba(212,175,55,0.3) 70%, transparent)',
        zIndex: 1,
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* ── Header ─────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1.1rem', borderRadius: '999px', marginBottom: '1.25rem',
            background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.4)',
            fontSize: '0.78rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            <span style={{ fontSize: '0.9rem' }}>✦</span>
            {b.badge}
            <span style={{ fontSize: '0.9rem' }}>✦</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem,4.5vw,3.5rem)',
            fontWeight: 900, lineHeight: 1.1,
            color: '#F8F5E9', marginBottom: '1.25rem',
            letterSpacing: '-0.02em',
          }}>
            Đặc quyền khi cashback<br />
            <span style={{
              background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              dưới DA CASH BACK
            </span>
          </h2>

          <p style={{
            color: '#999', maxWidth: '560px', margin: '0 auto',
            lineHeight: 1.75, fontSize: '1rem',
          }}>
            {b.desc}
          </p>
        </div>

        {/* ── Benefits grid ───────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '1.5rem',
          marginBottom: '3.5rem',
        }} className="benefits-flagship-grid">
          {items.map((item, idx) => (
            <div
              key={item.title}
              style={{
                background: 'rgba(10,9,6,0.75)',
                border: '1px solid rgba(212,175,55,0.22)',
                borderRadius: '1.5rem',
                padding: '2rem',
                display: 'flex', flexDirection: 'column', gap: '1rem',
                backdropFilter: 'blur(12px)',
                transition: 'transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease',
                cursor: 'default',
                animationDelay: `${idx * 0.08}s`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-6px)';
                el.style.borderColor = 'rgba(212,175,55,0.65)';
                el.style.boxShadow = '0 16px 48px rgba(212,175,55,0.18), 0 0 0 1px rgba(212,175,55,0.1)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = 'none';
                el.style.borderColor = 'rgba(212,175,55,0.22)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Icon with glow */}
              <div style={{
                width: '56px', height: '56px', borderRadius: '1rem',
                background: 'linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.06))',
                border: '1.5px solid rgba(212,175,55,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem',
                boxShadow: '0 0 18px rgba(212,175,55,0.2)',
              }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.05rem', fontWeight: 700, color: '#F8F5E9',
                  marginBottom: '0.5rem', lineHeight: 1.3,
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#888', lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Flagship CTA ────────────────────────────────── */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="#exchanges"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '1rem 2.75rem',
              fontWeight: 800, fontSize: '1.05rem',
              background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
              color: '#050505', borderRadius: '0.875rem',
              textDecoration: 'none',
              boxShadow: '0 6px 32px rgba(212,175,55,0.45)',
              transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.opacity = '0.9';
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 10px 40px rgba(212,175,55,0.55)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.opacity = '1';
              el.style.transform = 'none';
              el.style.boxShadow = '0 6px 32px rgba(212,175,55,0.45)';
            }}
          >
            <span>⚡</span>
            Tham gia DA CASH BACK ngay
            <span>→</span>
          </a>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#555' }}>
            Miễn phí hoàn toàn · Không yêu cầu mật khẩu · Không giữ tiền
          </p>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .benefits-flagship-grid{ grid-template-columns:1fr 1fr !important; }}
        @media(max-width:560px){ .benefits-flagship-grid{ grid-template-columns:1fr !important; }}
      `}</style>
    </section>
  );
}
