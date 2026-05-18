'use client';
import Link from 'next/link';

const footerLinks = [
  { label: 'Điều khoản dịch vụ', href: '/terms' },
  { label: 'Chính sách bảo mật', href: '/privacy' },
  { label: 'Cảnh báo rủi ro', href: '/risk-disclaimer' },
  { label: 'Liên hệ', href: '#contact' },
];

export default function Footer() {
  return (
    <footer style={{
      background: '#050505', borderTop: '1px solid rgba(212,175,55,0.15)',
      padding: '3.5rem 1.5rem 2rem',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }} className="footer-grid">
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
              <span style={{
                fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.04em',
                background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                DA CASH BACK
              </span>
            </Link>
            <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.7, maxWidth: '320px', marginBottom: '1.25rem' }}>
              Nền tảng hoàn phí giao dịch Crypto & Forex. Minh bạch — An toàn — Không yêu cầu mật khẩu.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: '📱', label: 'Telegram', href: 'https://t.me/jacksondz' },
                { icon: '📧', label: 'Email', href: 'mailto:support@dacashback.com' },
                { icon: '👥', label: 'Facebook', href: '#' },
              ].map(social => (
                <a key={social.label} href={social.href} aria-label={social.label}
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem', textDecoration: 'none',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.2)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.1)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)'; }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#D4AF37', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Điều hướng
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { label: 'Sàn hỗ trợ', href: '#exchanges' },
                { label: 'Cách hoạt động', href: '#how-it-works' },
                { label: 'Tra cứu cashback', href: '#cashback-lookup' },
                { label: 'Câu hỏi thường gặp', href: '#faq' },
              ].map(link => (
                <a key={link.label} href={link.href}
                  style={{ color: '#666', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
                  onMouseLeave={e => e.currentTarget.style.color = '#666'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#D4AF37', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Pháp lý
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {footerLinks.map(link => (
                <Link key={link.label} href={link.href}
                  style={{ color: '#666', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#D4AF37'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#666'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          padding: '1.5rem', background: '#0D0D0D', borderRadius: '0.875rem',
          border: '1px solid rgba(212,175,55,0.1)', marginBottom: '2rem',
        }}>
          <p style={{ fontSize: '0.78rem', color: '#555', lineHeight: 1.75, textAlign: 'center' }}>
            <strong style={{ color: '#666' }}>Tuyên bố miễn trừ trách nhiệm:</strong> DA CASH BACK không phải là sàn giao dịch, không giữ tiền của khách hàng và không cung cấp lời khuyên đầu tư. Crypto và Forex là các thị trường rủi ro cao — giá trị tài sản có thể tăng hoặc giảm đáng kể. Người dùng cần tự nghiên cứu kỹ lưỡng trước khi tham gia giao dịch và tự chịu trách nhiệm với mọi quyết định của mình.
          </p>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)',
          flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <p style={{ fontSize: '0.8rem', color: '#444' }}>
            © {new Date().getFullYear()} DA CASH BACK. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: '#444' }}>
            🇻🇳 Việt Nam
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; } }
        @media (max-width: 550px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
