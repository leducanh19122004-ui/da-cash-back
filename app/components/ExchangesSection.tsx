'use client';
import { useState } from 'react';
import { exchanges } from '../data/exchanges';
import ExchangeCard from './ExchangeCard';
import { useLang } from '../contexts/LanguageContext';
export default function ExchangesSection() {
  const [filter, setFilter] = useState<'all' | 'crypto' | 'forex'>('all');
  const { t } = useLang();
  const ex = t.exchanges;
  const filtered = filter === 'all' ? exchanges : exchanges.filter(e => e.type === filter);
  return (
    <section id="exchanges" style={{ padding: '6rem 1.5rem', background: '#0B0B0B' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{ex.badge}</p>
          <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '1rem' }}>{ex.title}</h2>
          <p style={{ color: '#888', maxWidth: '560px', margin: '0 auto 1.5rem', lineHeight: 1.7, fontSize: '1rem' }}>{ex.desc}</p>
          <div style={{ display: 'inline-flex', background: '#111', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '0.875rem', padding: '0.25rem' }}>
            {(['all', 'crypto', 'forex'] as const).map(tab => (
              <button key={tab} onClick={() => setFilter(tab)} style={{ padding: '0.5rem 1.25rem', borderRadius: '0.625rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', transition: 'background 0.2s, color 0.2s', background: filter === tab ? 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)' : 'transparent', color: filter === tab ? '#050505' : '#888' }}>
                {tab === 'all' ? ex.all : tab === 'crypto' ? ex.crypto : ex.forex}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }} className="exchanges-grid">
          {filtered.map(exchange => <ExchangeCard key={exchange.id} exchange={exchange} />)}
        </div>
        <div style={{ marginTop: '2rem', padding: '1rem 1.5rem', borderRadius: '0.875rem', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <p style={{ fontSize: '0.82rem', color: '#777', lineHeight: 1.6 }}>{ex.disclaimer}</p>
        </div>
      </div>
      <style>{`@media(max-width:1024px){.exchanges-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:600px){.exchanges-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
