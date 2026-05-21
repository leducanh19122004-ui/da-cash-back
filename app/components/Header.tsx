'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '../contexts/LanguageContext';
import { Lang, langNames } from '../translations';
import { IconGlobe } from './Icons';

const LANGS: Lang[] = ['vi', 'en', 'ko', 'th', 'id'];

export default function Header() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { href: '#hero', label: t.nav.home },
    { href: '#exchanges', label: t.nav.exchanges },
    { href: '#how-it-works', label: t.nav.howItWorks },
    { href: '#cashback-lookup', label: t.nav.cashbackLookup },
    { href: '#faq', label: t.nav.faq },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, transition: 'background 0.3s ease, border-color 0.3s ease', background: scrolled ? 'rgba(11,11,11,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid rgba(212,175,55,0.15)' : '1px solid transparent' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.5rem' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '0.04em', background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              DA CASH BACK
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="hidden-mobile">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} style={{ color: '#B8B8B8', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 500, transition: 'color 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={e => (e.currentTarget.style.color = '#B8B8B8')}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side — CTA + Language */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }} className="hidden-mobile">
            <a href="#cashback-lookup" style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem', fontWeight: 600, border: '1.5px solid #D4AF37', color: '#D4AF37', borderRadius: '0.625rem', textDecoration: 'none', transition: 'background 0.2s, transform 0.2s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.1)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none'; }}>
              {t.nav.lookupCashback}
            </a>
            <a href="#exchanges" style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem', fontWeight: 700, background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', color: '#050505', borderRadius: '0.625rem', textDecoration: 'none', transition: 'opacity 0.2s, transform 0.2s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}>
              {t.nav.joinNow}
            </a>

            {/* Language Switcher */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setLangOpen(!langOpen)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.75rem', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '0.625rem', cursor: 'pointer', fontSize: '0.8rem', color: '#D4AF37', fontWeight: 600, whiteSpace: 'nowrap', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(212,175,55,0.08)'}>
                {langNames[lang].split(' ')[0]} {langNames[lang].split(' ').slice(1).join(' ')}
                <span style={{ fontSize: '0.65rem', opacity: 0.7, marginLeft: '2px' }}>▼</span>
              </button>
              {langOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: '#111', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '0.75rem', padding: '0.4rem', zIndex: 100, minWidth: '170px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
                  {LANGS.map(l => (
                    <button key={l} onClick={() => { setLang(l); setLangOpen(false); }}
                      style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', background: lang === l ? 'rgba(212,175,55,0.15)' : 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.82rem', color: lang === l ? '#D4AF37' : '#B8B8B8', borderRadius: '0.5rem', fontWeight: lang === l ? 700 : 400, transition: 'background 0.15s, color 0.15s' }}
                      onMouseEnter={e => { if (lang !== l) { e.currentTarget.style.background = 'rgba(212,175,55,0.08)'; e.currentTarget.style.color = '#D4AF37'; } }}
                      onMouseLeave={e => { if (lang !== l) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#B8B8B8'; } }}>
                      {langNames[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }} className="show-mobile">
            <div style={{ width: '24px', height: '2px', background: '#D4AF37', margin: '5px 0', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <div style={{ width: '24px', height: '2px', background: '#D4AF37', margin: '5px 0', opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
            <div style={{ width: '24px', height: '2px', background: '#D4AF37', margin: '5px 0', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{ padding: '1rem 0 1.5rem', borderTop: '1px solid rgba(212,175,55,0.15)', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{ color: '#B8B8B8', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>
                {link.label}
              </a>
            ))}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              <a href="#cashback-lookup" onClick={() => setMenuOpen(false)} style={{ padding: '0.6rem 1rem', border: '1.5px solid #D4AF37', color: '#D4AF37', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}>
                {t.nav.lookupCashback}
              </a>
              <a href="#exchanges" onClick={() => setMenuOpen(false)} style={{ padding: '0.6rem 1rem', background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', color: '#050505', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem' }}>
                {t.nav.joinNow}
              </a>
            </div>
            {/* Mobile Language Switcher */}
            <div>
              <p style={{ display:'flex', alignItems:'center', gap:'0.35rem', fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem', fontWeight: 600 }}><IconGlobe size={14} /> Language / Ngôn ngữ</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {LANGS.map(l => (
                  <button key={l} onClick={() => { setLang(l); setMenuOpen(false); }}
                    style={{ padding: '0.4rem 0.75rem', border: `1px solid ${lang === l ? '#D4AF37' : 'rgba(212,175,55,0.2)'}`, background: lang === l ? 'rgba(212,175,55,0.15)' : 'transparent', color: lang === l ? '#D4AF37' : '#888', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.78rem', fontWeight: lang === l ? 700 : 400 }}>
                    {langNames[l]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 1024px) { .hidden-mobile { display: none !important; } .show-mobile { display: block !important; } }
        @media (min-width: 1025px) { .show-mobile { display: none !important; } }
      `}</style>
    </header>
  );
}
