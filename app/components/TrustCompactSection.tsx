'use client';
import { useLang } from '../contexts/LanguageContext';
import { trustCompactTranslations } from '../translations';

export default function TrustCompactSection() {
  const { lang } = useLang();
  const tr = trustCompactTranslations[lang as keyof typeof trustCompactTranslations]
    ?? trustCompactTranslations.vi;

  const rows = [
    { label: tr.row1label, text: tr.row1text, border: 'rgba(76,175,80,0.25)',  bg: 'rgba(76,175,80,0.06)'  },
    { label: tr.row2label, text: tr.row2text, border: 'rgba(239,68,68,0.22)', bg: 'rgba(239,68,68,0.05)' },
    { label: tr.row3label, text: tr.row3text, border: 'rgba(212,175,55,0.25)', bg: 'rgba(212,175,55,0.05)' },
  ];

  return (
    <section
      id="trust-compact"
      style={{ padding: '3rem 1.5rem', background: 'transparent' }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Header — deliberately understated vs flagship */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{
            display: 'inline-block', padding: '0.25rem 0.8rem', borderRadius: '999px',
            background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.28)',
            fontSize: '0.68rem', fontWeight: 700, color: 'rgba(212,175,55,0.8)',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.85rem',
          }}>
            {tr.badge}
          </span>
          <h2 style={{
            fontSize: 'clamp(1.2rem,2.2vw,1.6rem)', fontWeight: 800,
            color: '#E8E0D0', marginBottom: '0.6rem', lineHeight: 1.25,
          }}>
            {tr.title}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#777', maxWidth: '560px', margin: '0 auto', lineHeight: 1.65 }}>
            {tr.subtitle}
          </p>
        </div>

        {/* Compact card — 3-col desktop, 1-col mobile */}
        <div style={{
          background: 'rgba(8,7,4,0.78)',
          border: '1px solid rgba(212,175,55,0.16)',
          borderRadius: '1rem', padding: '1.25rem 1.5rem',
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '0',
          }} className="trust-compact-grid">
            {rows.map((row, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.9rem 1rem',
                  borderRight: idx < 2 ? '1px solid rgba(212,175,55,0.1)' : 'none',
                  borderBottom: 'none',
                }}
                className={`trust-row trust-row-${idx}`}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                  {/* Colored dot strip */}
                  <div style={{
                    width: '3px', minHeight: '100%', borderRadius: '2px',
                    background: row.border.replace('0.25', '0.6').replace('0.22', '0.6'),
                    flexShrink: 0, marginTop: '0.1rem', alignSelf: 'stretch',
                  }} />
                  <div>
                    <p style={{
                      fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem',
                      color: '#D4AF37', letterSpacing: '0.02em',
                    }}>
                      {row.label}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: '#999', lineHeight: 1.6 }}>
                      {row.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media(max-width:720px){
          .trust-compact-grid{ grid-template-columns:1fr !important; }
          .trust-row{ border-right:none !important; border-bottom:1px solid rgba(212,175,55,0.1) !important; }
          .trust-row-2{ border-bottom:none !important; }
        }
      `}</style>
    </section>
  );
}

