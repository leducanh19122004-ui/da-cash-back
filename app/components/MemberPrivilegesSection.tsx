'use client';
import { useLang } from '../contexts/LanguageContext';
import { signalTeaserTranslations } from '../translations';

const DASHBOARD_URL = 'https://da-signal-tracking.vercel.app/';

function trackDashboardClick() {
  try {
    if (typeof window === 'undefined') return;
    const params = { source_site: 'dacashback', target_url: DASHBOARD_URL, section: 'signal_teaser' };
    if ((window as any).gtag) (window as any).gtag('event', 'dashboard_cta_click', params);
    if ((window as any).fbq) (window as any).fbq('trackCustom', 'dashboard_cta_click', params);
    if ((window as any).plausible) (window as any).plausible('dashboard_cta_click', { props: params });
  } catch {}
}

export default function MemberPrivilegesSection() {
  const { lang } = useLang();
  const s = signalTeaserTranslations[lang as keyof typeof signalTeaserTranslations]
    ?? signalTeaserTranslations.vi;

  return (
    <section id="member-privileges" style={{ position: 'relative', padding: '7rem 1.5rem', overflow: 'hidden' }}>

      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 70% 55% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 65%),
          radial-gradient(ellipse 40% 30% at 15% 60%, rgba(212,175,55,0.05) 0%, transparent 55%),
          radial-gradient(ellipse 40% 30% at 85% 40%, rgba(212,175,55,0.05) 0%, transparent 55%)
        `,
      }} />
      {/* Top/bottom rule lines */}
      {[0, 1].map(i => (
        <div key={i} style={{
          position: 'absolute', [i === 0 ? 'top' : 'bottom']: 0,
          left: '8%', right: '8%', height: '1px', zIndex: 1,
          background: `linear-gradient(90deg,transparent,rgba(212,175,55,${i === 0 ? 0.45 : 0.25}) 30%,rgba(212,175,55,${i === 0 ? 0.65 : 0.4}) 50%,rgba(212,175,55,${i === 0 ? 0.45 : 0.25}) 70%,transparent)`,
        }} />
      ))}

      <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
          padding: '0.35rem 0.9rem', borderRadius: '999px', marginBottom: '1.75rem',
          background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.35)',
          fontSize: '0.72rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.06em',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 6px #4ade80' }} />
          {s.badge.replace('● ', '')}
        </div>

        {/* Headline */}
        <h2 style={{
          fontSize: 'clamp(1.65rem,3.5vw,2.6rem)', fontWeight: 900,
          lineHeight: 1.2, letterSpacing: '-0.02em',
          color: '#F8F5E9', marginBottom: '1.1rem',
        }}>
          {s.headline}
        </h2>

        {/* Description */}
        <p style={{
          fontSize: '1.05rem', color: '#888', lineHeight: 1.75,
          maxWidth: '560px', margin: '0 auto 2.5rem',
        }}>
          {s.desc}
        </p>

        {/* CTA Button */}
        <a
          href={DASHBOARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackDashboardClick}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '1rem 2.5rem', fontWeight: 800, fontSize: '1rem',
            background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
            color: '#050505', borderRadius: '0.875rem', textDecoration: 'none',
            boxShadow: '0 6px 28px rgba(212,175,55,0.4)',
            transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
            letterSpacing: '0.01em',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 38px rgba(212,175,55,0.55)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 6px 28px rgba(212,175,55,0.4)';
          }}
        >
          {s.cta}
        </a>

        {/* Disclaimer */}
        <p style={{
          marginTop: '1.5rem',
          fontSize: '0.72rem', color: '#444', lineHeight: 1.6, fontStyle: 'italic',
        }}>
          {s.disclaimer}
        </p>
      </div>
    </section>
  );
}
