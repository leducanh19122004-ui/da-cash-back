'use client';

const benefits = [
  { icon: '🔄', title: 'Không thay đổi cách giao dịch', desc: 'Tiếp tục giao dịch như bình thường trên sàn. Không cần làm gì thêm sau khi đã đăng ký.' },
  { icon: '🆓', title: 'Không mất thêm phí', desc: 'DA CASH BACK hoàn toàn miễn phí tham gia. Bạn không phải trả bất kỳ chi phí nào.' },
  { icon: '💸', title: 'Nhận lại một phần phí giao dịch', desc: 'Một phần phí bạn đã trả cho sàn được hoàn lại định kỳ thông qua chương trình đối tác.' },
  { icon: '📈', title: 'Theo dõi lịch sử rõ ràng', desc: 'Tra cứu cashback bất kỳ lúc nào, xem lịch sử hoàn phí chi tiết theo sàn và kỳ thanh toán.' },
  { icon: '🌐', title: 'Hỗ trợ nhiều sàn', desc: 'Nhận cashback từ nhiều sàn crypto và forex cùng lúc, tối đa hóa lợi ích của bạn.' },
  { icon: '🔒', title: 'Không yêu cầu quyền truy cập', desc: 'DA CASH BACK không yêu cầu mật khẩu, API key rút tiền, mã 2FA hay seed phrase của bạn.' },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" style={{ padding: '6rem 1.5rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Lợi ích
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '1rem' }}>
            Tại sao chọn DA CASH BACK?
          </h2>
          <p style={{ color: '#888', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Tối ưu chi phí giao dịch mà không cần thay đổi bất kỳ thói quen nào
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }} className="benefits-grid">
          {benefits.map(b => (
            <div
              key={b.title}
              style={{
                background: '#111111', border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '1.25rem', padding: '1.75rem',
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-4px)';
                el.style.borderColor = 'rgba(212,175,55,0.55)';
                el.style.boxShadow = '0 8px 32px rgba(212,175,55,0.12)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = 'none';
                el.style.borderColor = 'rgba(212,175,55,0.2)';
                el.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '2rem' }}>{b.icon}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#F8F5E9' }}>{b.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#777', lineHeight: 1.65 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .benefits-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .benefits-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
