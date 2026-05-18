'use client';

const testimonials = [
  {
    initial: 'T',
    name: 'Trader A.',
    role: 'Crypto Trader',
    text: 'Giao diện dễ tra cứu, quy trình đăng ký rõ ràng. Tôi theo dõi được cashback từ 3 sàn khác nhau trên cùng một nền tảng.',
    rating: 5,
  },
  {
    initial: 'N',
    name: 'Trader B.',
    role: 'Forex Trader',
    text: 'Tôi thích việc không cần cung cấp mật khẩu tài khoản. Chỉ cần UID là đủ, rất an tâm về bảo mật.',
    rating: 5,
  },
  {
    initial: 'H',
    name: 'Trader C.',
    role: 'Day Trader',
    text: 'Cashback giúp tôi tối ưu chi phí giao dịch hơn. Mỗi tháng tiết kiệm được một khoản phí đáng kể.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section style={{ padding: '6rem 1.5rem', background: '#0B0B0B' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Cộng đồng
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '0.5rem' }}>
            Đánh giá từ người dùng
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#555', fontStyle: 'italic', marginBottom: '0.5rem' }}>
            * Đây là đánh giá minh họa
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }} className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              style={{
                background: '#111111', border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '1.25rem', padding: '1.75rem',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-4px)';
                el.style.borderColor = 'rgba(212,175,55,0.5)';
                el.style.boxShadow = '0 8px 32px rgba(212,175,55,0.1)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = 'none';
                el.style.borderColor = 'rgba(212,175,55,0.2)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} style={{ color: '#D4AF37', fontSize: '1rem' }}>★</span>
                ))}
              </div>
              {/* Quote */}
              <p style={{ fontSize: '0.9rem', color: '#B8B8B8', lineHeight: 1.7, marginBottom: '1.25rem', fontStyle: 'italic' }}>
                &ldquo;{t.text}&rdquo;
              </p>
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'linear-gradient(135deg,#FFD700,#D4AF37)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', fontWeight: 700, color: '#050505',
                }}>
                  {t.initial}
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#F8F5E9' }}>{t.name}</p>
                  <p style={{ fontSize: '0.75rem', color: '#666' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .testimonials-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 600px) and (max-width: 900px) { .testimonials-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
