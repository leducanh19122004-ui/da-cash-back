'use client';

const NEED_ITEMS = [
  'UID tài khoản sàn giao dịch',
  'Email hoặc Telegram để liên hệ hỗ trợ',
  'Tên sàn bạn đã đăng ký',
  'Xác nhận đã đăng ký qua link đối tác DA CASH BACK',
];
const NEVER_ITEMS = [
  'Mật khẩu tài khoản sàn',
  'Mã OTP / 2FA xác thực',
  'Seed phrase hoặc private key',
  'API key có quyền rút tiền',
  'Chuyển tiền vào ví hoặc tài khoản cá nhân',
  'Nạp tiền để "mở khóa" hoặc "kích hoạt" cashback',
];

export default function SafetySection() {
  return (
    <section id="safety" style={{ padding: '6rem 1.5rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Bảo mật tài khoản</p>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.25rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '0.75rem' }}>
            An toàn tài khoản là ưu tiên số 1
          </h2>
          <p style={{ color: '#888', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.9rem' }}>
            DA CASH BACK hoạt động dựa trên chương trình đối tác chính thức. Chúng tôi không cần và không bao giờ yêu cầu quyền kiểm soát tài khoản của bạn.
          </p>
        </div>

        {/* Two-column table */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }} className="safety-grid">

          {/* CAN ASK */}
          <div style={{ background: '#111', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '1.25rem', padding: '1.75rem', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
              <span style={{ fontSize: '1.25rem' }}>✅</span>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#D4AF37' }}>DA CASH BACK có thể cần</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {NEED_ITEMS.map(item => (
                <div key={item} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <span style={{ color: '#4CAF50', fontSize: '0.85rem', flexShrink: 0, marginTop: '0.1rem' }}>→</span>
                  <p style={{ fontSize: '0.875rem', color: '#B8B8B8', lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* NEVER ASK */}
          <div style={{ background: '#1A0A0A', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '1.25rem', padding: '1.75rem', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(239,68,68,0.15)' }}>
              <span style={{ fontSize: '1.25rem' }}>⛔</span>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ef4444' }}>DA CASH BACK KHÔNG BAO GIỜ yêu cầu</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {NEVER_ITEMS.map(item => (
                <div key={item} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <span style={{ color: '#ef4444', fontSize: '0.85rem', flexShrink: 0, marginTop: '0.1rem' }}>✕</span>
                  <p style={{ fontSize: '0.875rem', color: '#B8B8B8', lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Warning box */}
        <div style={{ background: '#1A0A0A', border: '2px solid rgba(239,68,68,0.4)', borderRadius: '1rem', padding: '1.5rem 2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>🚨</span>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ef4444', marginBottom: '0.5rem' }}>Cảnh báo mạo danh</h4>
            <p style={{ fontSize: '0.875rem', color: '#B8B8B8', lineHeight: 1.7 }}>
              Nếu có bất kỳ ai mạo danh DA CASH BACK yêu cầu <strong style={{ color: '#F8F5E9' }}>mật khẩu, OTP, private key hoặc chuyển tiền riêng</strong>, hãy dừng lại ngay và liên hệ kênh hỗ trợ chính thức qua{' '}
              <a href="https://t.me/jacksondz" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: 600 }}>Telegram @jacksondz</a>.
            </p>
          </div>
        </div>

      </div>
      <style>{`@media(max-width:768px){.safety-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
