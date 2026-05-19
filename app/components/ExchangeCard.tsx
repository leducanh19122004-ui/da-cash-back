'use client';
import { Exchange } from '../data/exchanges';
import { useLang } from '../contexts/LanguageContext';

interface Props { exchange: Exchange; }

export default function ExchangeCard({ exchange }: Props) {
  const { t } = useLang();
  const isCrypto = exchange.type === 'crypto';

  return (
    <div
      className="exchange-card"
      style={{
        width: '290px',
        flexShrink: 0,
        background: 'rgba(8,7,5,0.78)',
        border: '1px solid rgba(212,175,55,0.22)',
        borderRadius: '1.25rem',
        padding: '1.4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        backdropFilter: 'blur(8px)',
        transition: 'transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.transform = 'translateY(-5px) scale(1.01)';
        el.style.borderColor = 'rgba(212,175,55,0.6)';
        el.style.boxShadow = '0 12px 36px rgba(212,175,55,0.18), 0 0 0 1px rgba(212,175,55,0.08)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.transform = 'none';
        el.style.borderColor = 'rgba(212,175,55,0.22)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.9rem' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '0.75rem', flexShrink: 0,
          background: `${exchange.color}1a`, border: `1.5px solid ${exchange.color}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.8rem', fontWeight: 800, color: exchange.color,
        }}>
          {exchange.initials}
        </div>
        <div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8F5E9', marginBottom: '0.15rem', lineHeight: 1.2 }}>
            {exchange.name}
          </h3>
          <span style={{
            fontSize: '0.65rem', fontWeight: 600,
            padding: '0.15rem 0.5rem', borderRadius: '999px',
            background: isCrypto ? 'rgba(99,179,237,0.12)' : 'rgba(72,199,142,0.12)',
            color: isCrypto ? '#63B3ED' : '#48C78E',
            border: `1px solid ${isCrypto ? 'rgba(99,179,237,0.28)' : 'rgba(72,199,142,0.28)'}`,
          }}>
            {isCrypto ? t.exchanges.crypto : t.exchanges.forex}
          </span>
        </div>
      </div>

      {/* Rate badge */}
      <div style={{
        background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.2)',
        borderRadius: '0.625rem', padding: '0.55rem 0.8rem', marginBottom: '0.85rem', textAlign: 'center',
      }}>
        <p style={{ fontSize: '0.62rem', color: '#777', marginBottom: '0.15rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {t.exchanges.rate}
        </p>
        <p style={{
          fontSize: '1.05rem', fontWeight: 900, lineHeight: 1,
          background: 'linear-gradient(135deg,#FFD700,#D4AF37)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          {exchange.cashbackRate}
        </p>
      </div>

      {/* Description */}
      <p style={{
        fontSize: '0.8rem', color: '#888', lineHeight: 1.55,
        marginBottom: '1rem', flexGrow: 1,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {(t.exchangeDesc as Record<string, string>)[exchange.id] || exchange.description}
      </p>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <a
          href={exchange.refLink}
          style={{
            flex: 1, padding: '0.55rem', textAlign: 'center', textDecoration: 'none',
            fontWeight: 700, fontSize: '0.82rem',
            background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
            color: '#050505', borderRadius: '0.6rem',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity='0.85'; e.currentTarget.style.transform='translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='none'; }}
        >
          {t.exchanges.register}
        </a>
        <a
          href={exchange.guideLink}
          style={{
            flex: 1, padding: '0.55rem', textAlign: 'center', textDecoration: 'none',
            fontWeight: 600, fontSize: '0.82rem',
            border: '1.5px solid rgba(212,175,55,0.7)', color: '#D4AF37',
            borderRadius: '0.6rem', transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background='rgba(212,175,55,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background='transparent'}
        >
          {t.exchanges.guide}
        </a>
      </div>
    </div>
  );
}
