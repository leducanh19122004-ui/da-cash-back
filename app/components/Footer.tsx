'use client';
import Link from 'next/link';
import { useLang } from '../contexts/LanguageContext';
export default function Footer() {
  const { t } = useLang();
  const ft = t.footer;
  const navLinks = [
    { href: '#exchanges', label: t.nav.exchanges },
    { href: '#how-it-works', label: t.nav.howItWorks },
    { href: '#cashback-lookup', label: t.nav.cashbackLookup },
    { href: '#faq', label: t.nav.faq },
  ];
  const legalLinks = [
    { href: '/terms', label: ft.terms },
    { href: '/privacy', label: ft.privacy },
    { href: '/risk-disclaimer', label: ft.risk },
  ];
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(212,175,55,0.15)', padding: '3.5rem 1.5rem 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }} className="footer-grid">
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.04em', background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>DA CASH BACK</span>
            </Link>
            <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.7, maxWidth: '320px', marginBottom: '1.25rem' }}>{ft.desc}</p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[{ icon: '📱', label: 'Telegram', href: 'https://t.me/jacksondz' }, { icon: '📧', label: 'Email', href: 'mailto:support@dacashback.com' }, { icon: '👥', label: 'Facebook', href: '#' }].map(s => (
                <a key={s.label} href={s.href} aria-label={s.label} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', textDecoration: 'none', transition: 'background 0.2s, border-color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.2)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.1)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)'; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#D4AF37', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{ft.nav}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {navLinks.map(link => (
                <a key={link.href} href={link.href} style={{ color: '#666', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
                  onMouseLeave={e => e.currentTarget.style.color = '#666'}>{link.label}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#D4AF37', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{ft.legal}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {legalLinks.map(link => (
                <Link key={link.href} href={link.href} style={{ color: '#666', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#D4AF37'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#666'}>{link.label}</Link>
              ))}
            </div>
          </div>
        </div>
        <div style={{ padding: '1.5rem', background: 'rgba(5,4,3,0.58)', borderRadius: '0.875rem', border: '1px solid rgba(212,175,55,0.1)', marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.78rem', color: '#555', lineHeight: 1.75, textAlign: 'center' }}>
            <strong style={{ color: '#666' }}>Disclaimer: </strong>{ft.disclaimer}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#444' }}>{ft.copyright.replace('{year}', new Date().getFullYear().toString())}</p>
          <p style={{ fontSize: '0.8rem', color: '#444' }}>🇻🇳 Vietnam</p>
        </div>
      </div>
      <style>{`@media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important;gap:2rem!important}}@media(max-width:550px){.footer-grid{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}
