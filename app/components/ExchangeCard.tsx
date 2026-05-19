'use client';
import { Exchange } from '../data/exchanges';
import { useLang } from '../contexts/LanguageContext';
interface Props { exchange: Exchange; }
export default function ExchangeCard({ exchange }: Props) {
  const { t } = useLang();
  const isCrypto = exchange.type === 'crypto';
  return (
    <div style={{ background: 'rgba(8,7,5,0.62)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease', cursor: 'default' }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-4px)'; el.style.borderColor = 'rgba(212,175,55,0.55)'; el.style.boxShadow = '0 8px 32px rgba(212,175,55,0.14)'; }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'none'; el.style.borderColor = 'rgba(212,175,55,0.2)'; el.style.boxShadow = 'none'; }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '0.875rem', background: `${exchange.color}22`, border: `1.5px solid ${exchange.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 800, color: exchange.color, letterSpacing: '0.02em' }}>{exchange.initials}</div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#F8F5E9', marginBottom: '0.2rem' }}>{exchange.name}</h3>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '999px', background: isCrypto ? 'rgba(99,179,237,0.12)' : 'rgba(72,199,142,0.12)', color: isCrypto ? '#63B3ED' : '#48C78E', border: `1px solid ${isCrypto ? 'rgba(99,179,237,0.3)' : 'rgba(72,199,142,0.3)'}` }}>
              {isCrypto ? t.exchanges.crypto : t.exchanges.forex}
            </span>
          </div>
        </div>
      </div>
      <div style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.2rem' }}>{t.exchanges.rate}</p>
        <p style={{ fontSize: '1.1rem', fontWeight: 800, background: 'linear-gradient(135deg,#FFD700,#D4AF37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{exchange.cashbackRate}</p>
      </div>
      <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
        {(t.exchangeDesc as Record<string, string>)[exchange.id] || exchange.description}
      </p>
      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <a href={exchange.refLink} style={{ flex: 1, padding: '0.6rem', textAlign: 'center', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem', background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', color: '#050505', borderRadius: '0.625rem', transition: 'opacity 0.2s, transform 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}>
          {t.exchanges.register}
        </a>
        <a href={exchange.guideLink} style={{ flex: 1, padding: '0.6rem', textAlign: 'center', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', border: '1.5px solid #D4AF37', color: '#D4AF37', borderRadius: '0.625rem', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          {t.exchanges.guide}
        </a>
      </div>
    </div>
  );
}
