'use client';

const trustPoints = [
  { icon: '🚫', text: 'DA CASH BACK không yêu cầu mật khẩu tài khoản sàn của bạn.' },
  { icon: '🚫', text: 'DA CASH BACK không giữ tiền giao dịch của khách hàng.' },
  { icon: '✅', text: 'Người dùng tự quản lý tài khoản trực tiếp trên sàn chính thức.' },
  { icon: '🔍', text: 'Chúng tôi chỉ dùng UID để kiểm tra điều kiện hoàn phí từ chương trình đối tác.' },
  { icon: '⛔', text: 'Không chia sẻ seed phrase, private key, mã 2FA hoặc API key có quyền rút tiền cho bất kỳ ai.' },
];

export default function TrustSafety() {
  return (
    <section id="trust" style={{ padding: '6rem 1.5rem', background: '#0B0B0B' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Cam kết
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '1rem' }}>
            An toàn và minh bạch là ưu tiên hàng đầu
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="trust-grid">
          {/* Trust points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {trustPoints.map((point, idx) => (
              <div key={idx} style={{
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                background: '#111111', border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '0.875rem', padding: '1rem 1.25rem',
              }}>
                <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{point.icon}</span>
                <p style={{ fontSize: '0.9rem', color: '#B8B8B8', lineHeight: 1.6 }}>{point.text}</p>
              </div>
            ))}
          </div>

          {/* Right panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Secure badge */}
            <div style={{
              background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '1.25rem', padding: '2rem', textAlign: 'center',
            }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🛡️</div>
              <h3 style={{
                fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem',
                background: 'linear-gradient(135deg,#FFD700,#D4AF37)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Nền tảng Đáng tin cậy
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#777', lineHeight: 1.6 }}>
                DA CASH BACK hoạt động dựa trên chương trình đối tác chính thức với các sàn. Không có quyền truy cập vào tài sản của người dùng.
              </p>
            </div>

            {/* Warning box */}
            <div style={{
              background: '#1A1408', border: '1px solid rgba(212,175,55,0.4)',
              borderRadius: '1.25rem', padding: '1.5rem',
            }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>⚠️</span>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#D4AF37', marginBottom: '0.5rem' }}>
                    Cảnh báo quan trọng
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#999', lineHeight: 1.7 }}>
                    DA CASH BACK không cung cấp lời khuyên đầu tư và không cam kết lợi nhuận. Giao dịch crypto và forex có rủi ro cao, người dùng cần tự chịu trách nhiệm với quyết định giao dịch của mình.
                  </p>
                </div>
              </div>
            </div>

            {/* What we only need */}
            <div style={{
              background: '#111111', border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '1.25rem', padding: '1.5rem',
            }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8F5E9', marginBottom: '1rem' }}>
                DA CASH BACK chỉ cần:
              </h4>
              {['✅ UID tài khoản sàn của bạn', '✅ Xác nhận đăng ký qua link đối tác'].map(item => (
                <div key={item} style={{ padding: '0.5rem 0', fontSize: '0.875rem', color: '#B8B8B8', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {item}
                </div>
              ))}
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8F5E9', margin: '1rem 0 0.75rem' }}>
                DA CASH BACK KHÔNG bao giờ yêu cầu:
              </h4>
              {['⛔ Mật khẩu tài khoản', '⛔ Mã 2FA / OTP', '⛔ Private key / Seed phrase', '⛔ API key rút tiền'].map(item => (
                <div key={item} style={{ padding: '0.5rem 0', fontSize: '0.875rem', color: '#777', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .trust-grid { grid-template-columns: 1fr !important; gap: 2rem !important; } }
      `}</style>
    </section>
  );
}
