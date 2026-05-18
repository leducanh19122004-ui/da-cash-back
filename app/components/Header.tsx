'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '#hero', label: 'Trang chủ' },
  { href: '#exchanges', label: 'Sàn hỗ trợ' },
  { href: '#how-it-works', label: 'Cách hoạt động' },
  { href: '#cashback-lookup', label: 'Lịch sử hoàn phí' },
  { href: '#faq', label: 'Câu hỏi thường gặp' },
  { href: '#contact', label: 'Liên hệ' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.3s ease, border-color 0.3s ease',
        background: scrolled ? 'rgba(11,11,11,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,175,55,0.15)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.5rem' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontSize: '1.35rem',
              fontWeight: 900,
              letterSpacing: '0.04em',
              background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Inter, sans-serif',
            }}>
              DA CASH BACK
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: '#B8B8B8',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={e => (e.currentTarget.style.color = '#B8B8B8')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="hidden-mobile">
            <a
              href="#cashback-lookup"
              style={{
                padding: '0.5rem 1.1rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                border: '1.5px solid #D4AF37',
                color: '#D4AF37',
                borderRadius: '0.625rem',
                textDecoration: 'none',
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.1)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none'; }}
            >
              Tra cứu cashback
            </a>
            <a
              href="#exchanges"
              style={{
                padding: '0.5rem 1.2rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
                color: '#050505',
                borderRadius: '0.625rem',
                textDecoration: 'none',
                transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Tham gia ngay
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Mở menu"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
            className="show-mobile"
          >
            <div style={{ width: '24px', height: '2px', background: '#D4AF37', margin: '5px 0', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <div style={{ width: '24px', height: '2px', background: '#D4AF37', margin: '5px 0', opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
            <div style={{ width: '24px', height: '2px', background: '#D4AF37', margin: '5px 0', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            padding: '1rem 0 1.5rem',
            borderTop: '1px solid rgba(212,175,55,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ color: '#B8B8B8', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              <a href="#cashback-lookup" onClick={() => setMenuOpen(false)} style={{ padding: '0.6rem 1.2rem', border: '1.5px solid #D4AF37', color: '#D4AF37', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                Tra cứu cashback
              </a>
              <a href="#exchanges" onClick={() => setMenuOpen(false)} style={{ padding: '0.6rem 1.2rem', background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', color: '#050505', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>
                Tham gia ngay
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) { .hidden-mobile { display: none !important; } .show-mobile { display: block !important; } }
        @media (min-width: 901px) { .show-mobile { display: none !important; } }
      `}</style>
    </header>
  );
}
