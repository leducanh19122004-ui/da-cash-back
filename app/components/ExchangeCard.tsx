'use client';
import { Exchange } from '../data/exchanges';
import { useLang } from '../contexts/LanguageContext';
import { IconExternalLink } from './Icons';

interface Props { exchange: Exchange; }
const DEALS_BASE = 'https://danetwork.asia/deals.html';

export default function ExchangeCard({ exchange }: Props) {
  const { t } = useLang();
  const isCrypto = exchange.type === 'crypto';
  const dealsUrl = `${DEALS_BASE}?exchange=${exchange.id}`;
  const hasRef   = exchange.refLink !== '#';

  return (
    <div
      className="exchange-card"
      style={{
        width: '292px', flexShrink: 0,
        background: 'rgba(8,7,5,0.85)',
        border: '1px solid rgba(212,175,55,0.22)',
        borderRadius: '1.25rem', padding: '1.35rem',
        display: 'flex', flexDirection: 'column',
        backdropFilter: 'blur(10px)',
        transition: 'transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease',
        cursor: 'default', position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.transform = 'translateY(-5px)';
        el.style.borderColor = 'rgba(212,175,55,0.65)';
        el.style.boxShadow = '0 14px 40px rgba(212,175,55,0.18)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.transform = 'none';
        el.style.borderColor = 'rgba(212,175,55,0.22)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* "Cashback Deal" badge — top right corner */}
      <div style={{
        position: 'absolute', top: '0.75rem', right: '0.75rem',
        padding: '0.18rem 0.55rem', borderRadius: '999px',
        background: 'rgba(212,175,55,0.12)',
        border: '1px solid rgba(212,175,55,0.35)',
        fontSize: '0.6rem', fontWeight: 700,
        color: '#D4AF37', letterSpacing: '0.05em',
      }}>
        ✦ CASHBACK DEAL
      </div>

      {/* Header: logo + name + type */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem', paddingRight: '5rem' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '0.7rem', flexShrink: 0,
          background: `${exchange.color}1a`, border: `1.5px solid ${exchange.color}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.78rem', fontWeight: 800, color: exchange.color,
        }}>
          {exchange.initials}
        </div>
        <div>
          <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#F8F5E9', marginBottom: '0.1rem', lineHeight: 1.2 }}>
            {exchange.name}
          </h3>
          <span style={{
            fontSize: '0.62rem', fontWeight: 600, padding: '0.12rem 0.45rem', borderRadius: '999px',
            background: isCrypto ? 'rgba(99,179,237,0.12)' : 'rgba(72,199,142,0.12)',
            color: isCrypto ? '#63B3ED' : '#48C78E',
            border: `1px solid ${isCrypto ? 'rgba(99,179,237,0.25)' : 'rgba(72,199,142,0.25)'}`,
          }}>
            {isCrypto ? t.exchanges.crypto : t.exchanges.forex}
          </span>
        </div>
      </div>

      {/* Cashback rate — most prominent */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.05))',
        border: '1px solid rgba(212,175,55,0.28)',
        borderRadius: '0.75rem', padding: '0.7rem', marginBottom: '0.8rem', textAlign: 'center',
        boxShadow: '0 0 16px rgba(212,175,55,0.06) inset',
      }}>
        <p style={{ fontSize: '0.58rem', color: '#888', marginBottom: '0.2rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {t.exchanges.rate}
        </p>
        <p style={{
          fontSize: '1.5rem', fontWeight: 900, lineHeight: 1,
          background: 'linear-gradient(135deg,#FFD700,#D4AF37)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          {exchange.cashbackRate}
        </p>
      </div>

      {/* Description */}
      <p style={{
        fontSize: '0.78rem', color: '#888', lineHeight: 1.55, marginBottom: '0.95rem', flexGrow: 1,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {(t.exchangeDesc as Record<string,string>)[exchange.id] || exchange.description}
      </p>

      {/* Primary: Đăng ký cashback / Coming Soon */}
      <a
        href={hasRef ? exchange.refLink : undefined}
        target={hasRef ? '_blank' : undefined}
        rel="noopener noreferrer"
        style={{
          display: 'flex', width: '100%', padding: '0.6rem',
          alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
          textAlign: 'center', textDecoration: 'none',
          fontWeight: 700, fontSize: '0.83rem', marginBottom: '0.45rem',
          borderRadius: '0.65rem',
          ...(hasRef ? {
            background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
            color: '#050505',
            cursor: 'pointer',
            opacity: 1,
          } : {
            background: 'rgba(255,255,255,0.04)',
            border: '1px dashed rgba(212,175,55,0.3)',
            color: 'rgba(212,175,55,0.55)',
            cursor: 'default',
            opacity: 1,
          }),
          transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          if (!hasRef) return;
          e.currentTarget.style.opacity = '0.88';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,175,55,0.35)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {hasRef ? t.exchanges.register : (
          <><span style={{ fontSize: '0.75rem' }}>🕐</span>{t.exchanges.comingSoon}</>
        )}
      </a>

      {/* Secondary row: Hướng dẫn + Xem chi tiết */}
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        <a
          href={exchange.guideLink !== '#' ? exchange.guideLink : undefined}
          target={exchange.guideLink !== '#' ? '_blank' : undefined}
          rel="noopener noreferrer"
          style={{
            flex: 1, padding: '0.48rem', textAlign: 'center', textDecoration: 'none',
            fontWeight: 600, fontSize: '0.75rem',
            border: '1px solid rgba(212,175,55,0.4)', color: '#D4AF37',
            borderRadius: '0.55rem', transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {t.exchanges.guide}
        </a>
        <a
          href={dealsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1, padding: '0.48rem', textAlign: 'center', textDecoration: 'none',
            fontWeight: 500, fontSize: '0.75rem',
            border: '1px solid rgba(212,175,55,0.22)', color: 'rgba(212,175,55,0.7)',
            borderRadius: '0.55rem', letterSpacing: '0.01em',
            transition: 'border-color 0.2s, color 0.2s, background 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget;
            el.style.borderColor = 'rgba(212,175,55,0.6)';
            el.style.color = '#D4AF37';
            el.style.background = 'rgba(212,175,55,0.07)';
            el.style.boxShadow = '0 0 10px rgba(212,175,55,0.1)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget;
            el.style.borderColor = 'rgba(212,175,55,0.22)';
            el.style.color = 'rgba(212,175,55,0.7)';
            el.style.background = 'transparent';
            el.style.boxShadow = 'none';
          }}
        >
          <span style={{ display:'inline-flex', alignItems:'center', gap:'0.3rem' }}><IconExternalLink size={13} />{t.exchanges.viewDetails}</span>
        </a>
      </div>
    </div>
  );
}
