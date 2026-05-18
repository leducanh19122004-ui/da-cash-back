'use client';
import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
export default function FAQ() {
  const { t } = useLang();
  const faq = t.faq;
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section id="faq" style={{ padding: '6rem 1.5rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{faq.badge}</p>
          <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '1rem' }}>{faq.title}</h2>
          <p style={{ color: '#888', lineHeight: 1.7 }}>{faq.desc}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faq.items.map((item, idx) => (
            <div key={idx} style={{ background: '#111111', border: `1px solid ${openIdx === idx ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.2)'}`, borderRadius: '0.875rem', overflow: 'hidden', transition: 'border-color 0.25s ease, box-shadow 0.25s ease', boxShadow: openIdx === idx ? '0 4px 20px rgba(212,175,55,0.08)' : 'none' }}>
              <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)} aria-expanded={openIdx === idx}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F8F5E9', flex: 1 }}>{item.q}</span>
                <span style={{ marginLeft: '1rem', flexShrink: 0, width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'rgba(212,175,55,0.15)', color: '#D4AF37', fontWeight: 700, fontSize: '1rem', transition: 'transform 0.25s ease', transform: openIdx === idx ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              {openIdx === idx && (
                <div style={{ padding: '0 1.5rem 1.25rem' }}>
                  <div style={{ height: '1px', background: 'rgba(212,175,55,0.15)', marginBottom: '1rem' }} />
                  <p style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.75 }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '1rem' }}>{faq.noAnswer}</p>
          <a href="#contact" style={{ display: 'inline-block', padding: '0.75rem 2rem', fontWeight: 600, fontSize: '0.9rem', border: '1.5px solid #D4AF37', color: '#D4AF37', borderRadius: '0.75rem', textDecoration: 'none', transition: 'background 0.2s, transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.1)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none'; }}>
            {faq.contactSupport}
          </a>
        </div>
      </div>
    </section>
  );
}
