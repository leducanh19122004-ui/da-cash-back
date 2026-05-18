'use client';

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '5rem',
        background: '#0B0B0B',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 65% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', top: '10%', left: '-10%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
          {/* Left - Text */}
          <div>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1rem', borderRadius: '999px', marginBottom: '1.5rem',
              border: '1px solid rgba(212,175,55,0.35)',
              background: 'rgba(212,175,55,0.07)',
              fontSize: '0.8rem', fontWeight: 600, color: '#D4AF37',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              Nền tảng hoàn phí giao dịch #1 Việt Nam
            </div>

            <h1 style={{ fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '1.5rem', color: '#F8F5E9' }}>
              Nhận{' '}
              <span style={{ background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                hoàn phí giao dịch
              </span>{' '}
              Crypto &amp; Forex cùng{' '}
              <span style={{ background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                DA CASH BACK
              </span>
            </h1>

            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#B8B8B8', marginBottom: '2.5rem', maxWidth: '520px' }}>
              Đăng ký tài khoản sàn qua link đối tác của DA CASH BACK, giao dịch như bình thường và nhận lại một phần phí giao dịch định kỳ. Minh bạch — An toàn — Không yêu cầu mật khẩu.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <a
                href="#exchanges"
                style={{
                  padding: '0.875rem 2rem', fontWeight: 700, fontSize: '1rem',
                  background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
                  color: '#050505', borderRadius: '0.75rem', textDecoration: 'none',
                  boxShadow: '0 4px 24px rgba(212,175,55,0.3)',
                  transition: 'opacity 0.2s, transform 0.2s',
                  display: 'inline-block',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
              >
                Bắt đầu nhận cashback
              </a>
              <a
                href="#exchanges"
                style={{
                  padding: '0.875rem 2rem', fontWeight: 600, fontSize: '1rem',
                  border: '1.5px solid #D4AF37', color: '#D4AF37',
                  borderRadius: '0.75rem', textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.2s',
                  display: 'inline-block',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none'; }}
              >
                Xem sàn hỗ trợ
              </a>
            </div>

            {/* Security badges */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[
                '🔒 Không yêu cầu mật khẩu',
                '🛡️ Không giữ tiền của khách hàng',
                '✅ Chỉ cần UID tài khoản sàn',
              ].map((badge) => (
                <span
                  key={badge}
                  style={{
                    padding: '0.35rem 0.85rem', borderRadius: '999px',
                    background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)',
                    fontSize: '0.78rem', fontWeight: 500, color: '#B8B8B8',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Dashboard Mockup */}
          <div style={{ display: 'flex', justifyContent: 'center' }} className="hero-dashboard">
            <div style={{
              background: '#111111', border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '1.5rem', padding: '1.75rem',
              width: '100%', maxWidth: '380px',
              boxShadow: '0 0 60px rgba(212,175,55,0.1), 0 20px 60px rgba(0,0,0,0.5)',
            }}>
              {/* Dashboard header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#888888', marginBottom: '0.25rem' }}>Tổng cashback đã hoàn</p>
                  <p style={{
                    fontSize: '2rem', fontWeight: 900,
                    background: 'linear-gradient(135deg,#FFD700,#D4AF37)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>$1,248.50</p>
                </div>
                <div style={{
                  padding: '0.35rem 0.75rem', borderRadius: '999px',
                  background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.35)',
                  fontSize: '0.72rem', fontWeight: 700, color: '#D4AF37',
                }}>
                  ✓ Đã xác minh UID
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {[
                  { label: 'Cashback tháng này', value: '$182.30', positive: true },
                  { label: 'Số sàn hỗ trợ', value: '9 sàn', positive: false },
                ].map((item) => (
                  <div key={item.label} style={{
                    background: '#1A1A1A', borderRadius: '0.875rem', padding: '0.875rem',
                    border: '1px solid rgba(212,175,55,0.12)',
                  }}>
                    <p style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.35rem' }}>{item.label}</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 700, color: item.positive ? '#D4AF37' : '#F8F5E9' }}>{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Exchange list mockup */}
              <div style={{ background: '#1A1A1A', borderRadius: '0.875rem', padding: '0.875rem', border: '1px solid rgba(212,175,55,0.12)' }}>
                <p style={{ fontSize: '0.72rem', color: '#888', marginBottom: '0.75rem', fontWeight: 600 }}>Hoàn phí gần đây</p>
                {[
                  { exchange: 'Binance', amount: '+$42.10', time: '2h trước' },
                  { exchange: 'Bybit', amount: '+$28.50', time: '1 ngày trước' },
                  { exchange: 'OKX', amount: '+$19.80', time: '2 ngày trước' },
                ].map((tx) => (
                  <div key={tx.exchange} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: 'rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.65rem', fontWeight: 700, color: '#D4AF37',
                      }}>
                        {tx.exchange.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F8F5E9' }}>{tx.exchange}</p>
                        <p style={{ fontSize: '0.68rem', color: '#666' }}>{tx.time}</p>
                      </div>
                    </div>
                    <span style={{ color: '#4CAF50', fontWeight: 700, fontSize: '0.875rem' }}>{tx.amount}</span>
                  </div>
                ))}
              </div>

              {/* Bottom bar */}
              <div style={{
                marginTop: '1rem', padding: '0.75rem', borderRadius: '0.75rem',
                background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <span style={{ color: '#D4AF37', fontSize: '1rem' }}>💰</span>
                <p style={{ fontSize: '0.75rem', color: '#B8B8B8' }}>Kỳ thanh toán tiếp theo: <strong style={{ color: '#D4AF37' }}>T6, 23/05</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .hero-dashboard { margin-top: 0; }
        }
      `}</style>
    </section>
  );
}
