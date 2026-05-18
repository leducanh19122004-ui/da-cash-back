'use client';
import { useState } from 'react';
import { exchanges } from '../data/exchanges';
import ExchangeCard from './ExchangeCard';

export default function ExchangesSection() {
  const [filter, setFilter] = useState<'all' | 'crypto' | 'forex'>('all');
  const filtered = filter === 'all' ? exchanges : exchanges.filter(e => e.type === filter);

  return (
    <section id="exchanges" style={{ padding: '6rem 1.5rem', background: '#0B0B0B' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Đối tác chính thức
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '1rem' }}>
            Sàn giao dịch được hỗ trợ
          </h2>
          <p style={{ color: '#888', maxWidth: '560px', margin: '0 auto 1.5rem', lineHeight: 1.7, fontSize: '1rem' }}>
            Đăng ký tài khoản qua link của DA CASH BACK để kích hoạt cashback. Tỷ lệ hoàn phí tùy từng sàn và chương trình đối tác.
          </p>

          {/* Filter tabs */}
          <div style={{ display: 'inline-flex', background: '#111', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '0.875rem', padding: '0.25rem' }}>
            {(['all', 'crypto', 'forex'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                style={{
                  padding: '0.5rem 1.25rem', borderRadius: '0.625rem', border: 'none', cursor: 'pointer',
                  fontWeight: 600, fontSize: '0.875rem', transition: 'background 0.2s, color 0.2s',
                  background: filter === tab ? 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)' : 'transparent',
                  color: filter === tab ? '#050505' : '#888',
                }}
              >
                {tab === 'all' ? 'Tất cả' : tab === 'crypto' ? '🔷 Crypto' : '📈 Forex'}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }} className="exchanges-grid">
          {filtered.map(exchange => (
            <ExchangeCard key={exchange.id} exchange={exchange} />
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{
          marginTop: '2rem', padding: '1rem 1.5rem', borderRadius: '0.875rem',
          background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)',
          display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
        }}>
          <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>⚠️</span>
          <p style={{ fontSize: '0.82rem', color: '#777', lineHeight: 1.6 }}>
            <strong style={{ color: '#B8B8B8' }}>Lưu ý:</strong> Tỷ lệ hoàn phí có thể thay đổi theo chính sách từng sàn và chương trình đối tác tại từng thời điểm. DA CASH BACK không cam kết lợi nhuận giao dịch. Giao dịch crypto và forex có rủi ro cao.
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .exchanges-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .exchanges-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
