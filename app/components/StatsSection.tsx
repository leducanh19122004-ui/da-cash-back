'use client';

const stats = [
  { icon: '🏦', value: '10+', label: 'Sàn hỗ trợ', sub: 'Crypto & Forex' },
  { icon: '💰', value: 'Đến 70%', label: 'Tỷ lệ hoàn phí', sub: 'tùy từng sàn & chương trình đối tác' },
  { icon: '🔄', value: 'Định kỳ', label: 'Thanh toán', sub: 'Ngày / Tuần / Tháng' },
  { icon: '📊', value: 'Minh bạch', label: 'Theo dõi', sub: 'Lịch sử rõ ràng, dễ tra cứu' },
];

export default function StatsSection() {
  return (
    <section style={{ padding: '4rem 1.5rem', background: '#0B0B0B', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem' }} className="stats-grid">
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: '#111111', border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '1.25rem', padding: '1.75rem 1.25rem', textAlign: 'center',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-4px)';
                el.style.borderColor = 'rgba(212,175,55,0.5)';
                el.style.boxShadow = '0 8px 32px rgba(212,175,55,0.12)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = 'none';
                el.style.borderColor = 'rgba(212,175,55,0.2)';
                el.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{stat.icon}</div>
              <div style={{
                fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.25rem',
                background: 'linear-gradient(135deg,#FFD700,#D4AF37)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#F8F5E9', marginBottom: '0.25rem' }}>{stat.label}</div>
              <div style={{ fontSize: '0.75rem', color: '#666666', fontStyle: 'italic' }}>{stat.sub}</div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.78rem', color: '#555', fontStyle: 'italic' }}>
          * Tỷ lệ hoàn phí có thể thay đổi theo chính sách từng sàn và chương trình đối tác tại từng thời điểm.
        </p>
      </div>
      <style>{`
        @media (max-width: 900px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
