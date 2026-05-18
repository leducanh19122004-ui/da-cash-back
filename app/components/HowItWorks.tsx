'use client';

const steps = [
  {
    step: '01',
    icon: '🏦',
    title: 'Chọn sàn giao dịch',
    desc: 'Chọn sàn crypto hoặc forex bạn muốn đăng ký từ danh sách đối tác của DA CASH BACK. Mỗi sàn có tỷ lệ hoàn phí khác nhau.',
  },
  {
    step: '02',
    icon: '🔗',
    title: 'Đăng ký bằng link/ref code',
    desc: 'Đăng ký tài khoản mới trên sàn qua link hoặc mã giới thiệu được cung cấp bởi DA CASH BACK để kết nối cashback.',
  },
  {
    step: '03',
    icon: '🔍',
    title: 'Gửi UID để xác minh',
    desc: 'Sau khi tạo tài khoản thành công, gửi UID tài khoản sàn cho DA CASH BACK để hệ thống kiểm tra liên kết cashback.',
  },
  {
    step: '04',
    icon: '💰',
    title: 'Nhận cashback định kỳ',
    desc: 'Giao dịch như bình thường trên sàn. Cashback sẽ được hoàn lại theo chu kỳ thanh toán của từng sàn (ngày/tuần/tháng).',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '6rem 1.5rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Đơn giản & Minh bạch
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '1rem' }}>
            Cách hoạt động
          </h2>
          <p style={{ color: '#888', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Quy trình 4 bước đơn giản để bắt đầu nhận hoàn phí giao dịch
          </p>
        </div>

        {/* Steps grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem', position: 'relative' }} className="steps-grid">
          {/* Connector line - desktop only */}
          <div style={{
            position: 'absolute', top: '3.25rem', left: '12%', right: '12%', height: '1px',
            background: 'linear-gradient(90deg, rgba(212,175,55,0.4), rgba(212,175,55,0.1), rgba(212,175,55,0.4))',
          }} className="steps-connector" />

          {steps.map((step, idx) => (
            <div
              key={step.step}
              style={{
                background: '#111111', border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '1.25rem', padding: '1.75rem 1.25rem', textAlign: 'center',
                position: 'relative',
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
              {/* Step badge */}
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%', margin: '0 auto 1rem',
                background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 900, color: '#050505',
                boxShadow: '0 0 16px rgba(212,175,55,0.3)',
              }}>
                {step.step}
              </div>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{step.icon}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#F8F5E9', marginBottom: '0.75rem' }}>{step.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#777', lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            href="#exchanges"
            style={{
              display: 'inline-block', padding: '0.875rem 2.5rem', fontWeight: 700, fontSize: '1rem',
              background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
              color: '#050505', borderRadius: '0.75rem', textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(212,175,55,0.3)',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
          >
            Bắt đầu ngay →
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .steps-grid { grid-template-columns: 1fr 1fr !important; } .steps-connector { display: none !important; } }
        @media (max-width: 600px) { .steps-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
