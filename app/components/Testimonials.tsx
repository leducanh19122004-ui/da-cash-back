'use client';
import { USE_MOCK_CASHBACK_DATA } from '../lib/cashback';

// Dữ liệu testimonials — khi có backend thật, thay bằng fetch từ API
// realTestimonials = await fetch('/api/testimonials').then(r => r.json());
const MOCK_TESTIMONIALS = [
  {
    id: 1,
    initials: 'N',
    displayName: 'N*** H.',
    maskedEmail: 'n***@gmail.com',
    exchange: 'Binance',
    exchangeType: 'crypto' as const,
    verified: true,
    cashbackConfirmed: true,
    review: 'Quy trình xác minh UID khá nhanh. Mình thích nhất là không cần cung cấp mật khẩu hay API rút tiền — đây là điều mình quan tâm nhất khi tìm dịch vụ cashback.',
    rating: 5,
  },
  {
    id: 2,
    initials: 'T',
    displayName: 'T*** K.',
    maskedEmail: 't***88@outlook.com',
    exchange: 'Bybit',
    exchangeType: 'crypto' as const,
    verified: true,
    cashbackConfirmed: true,
    review: 'Cashback được ghi nhận rõ ràng, dễ theo dõi theo từng kỳ. Phù hợp với người giao dịch thường xuyên vì khoản hoàn phí tích lũy theo thời gian khá đáng kể.',
    rating: 5,
  },
  {
    id: 3,
    initials: 'M',
    displayName: 'M*** L.',
    maskedEmail: 'm***trade@gmail.com',
    exchange: 'Exness',
    exchangeType: 'forex' as const,
    verified: true,
    cashbackConfirmed: false,
    review: 'Giao diện đơn giản, thông tin đủ rõ. Cần thêm lịch sử đối soát chi tiết hơn trong tương lai — nhưng về tổng thể, quy trình hoàn phí minh bạch hơn mình kỳ vọng.',
    rating: 4,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: '0.85rem', color: i <= count ? '#D4AF37' : '#333' }}>★</span>
      ))}
    </div>
  );
}

function Badge({ label, type }: { label: string; type: 'gold' | 'green' | 'gray' }) {
  const colors = {
    gold:  { bg: 'rgba(212,175,55,0.12)', border: 'rgba(212,175,55,0.3)', text: '#D4AF37' },
    green: { bg: 'rgba(76,175,80,0.1)',   border: 'rgba(76,175,80,0.3)',  text: '#4CAF50' },
    gray:  { bg: 'rgba(184,184,184,0.08)',border: 'rgba(184,184,184,0.2)',text: '#888' },
  };
  const c = colors[type];
  return (
    <span style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 600, background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
      {label}
    </span>
  );
}

export default function Testimonials() {
  const isMock = USE_MOCK_CASHBACK_DATA;
  return (
    <section style={{ padding: '6rem 1.5rem', background: '#0B0B0B' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Phản hồi</p>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.25rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '0.75rem' }}>
            Phản hồi từ người dùng đã xác minh
          </h2>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.85rem', color: '#777', lineHeight: 1.7, fontStyle: 'italic' }}>
              {isMock
                ? 'Các phản hồi bên dưới là ví dụ giao diện. Đánh giá thực tế sẽ được cập nhật sau khi hoàn tất các kỳ cashback đầu tiên.'
                : 'Phản hồi từ người dùng thực tế đã hoàn tất ít nhất một kỳ cashback. Email/UID được ẩn để bảo vệ quyền riêng tư.'}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem', marginBottom: '1.5rem' }} className="testimonials-grid">
          {MOCK_TESTIMONIALS.map(item => (
            <div key={item.id} style={{
              background: '#111', border: '1px solid rgba(212,175,55,0.18)', borderRadius: '1.25rem',
              padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem',
              transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
            }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-3px)'; el.style.borderColor = 'rgba(212,175,55,0.45)'; el.style.boxShadow = '0 6px 28px rgba(212,175,55,0.1)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'none'; el.style.borderColor = 'rgba(212,175,55,0.18)'; el.style.boxShadow = 'none'; }}>

              {/* Top: avatar + identity */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg,#FFD700,#D4AF37)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, color: '#050505', flexShrink: 0 }}>
                  {item.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8F5E9', marginBottom: '0.1rem' }}>{item.displayName}</p>
                  <p style={{ fontSize: '0.72rem', color: '#666', marginBottom: '0.35rem' }}>{item.maskedEmail}</p>
                  <StarRating count={item.rating} />
                </div>
              </div>

              {/* Review text */}
              <p style={{ fontSize: '0.875rem', color: '#B8B8B8', lineHeight: 1.7, flex: 1, fontStyle: 'italic' }}>
                &ldquo;{item.review}&rdquo;
              </p>

              {/* Footer: exchange + badges */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '0.72rem', color: '#888' }}>Sàn sử dụng:</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: item.exchangeType === 'crypto' ? '#63B3ED' : '#48C78E' }}>{item.exchange}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {item.verified && <Badge label="Đã xác minh UID" type="gold" />}
                  {item.cashbackConfirmed && <Badge label="Cashback đã ghi nhận" type="green" />}
                  <Badge label="Tài khoản được ẩn danh" type="gray" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
          <p style={{ fontSize: '0.72rem', color: '#555', fontStyle: 'italic' }}>
            Email/UID được ẩn để bảo vệ quyền riêng tư người dùng.
          </p>
          {isMock && (
            <p style={{ fontSize: '0.72rem', color: '#444', fontStyle: 'italic' }}>
              Đánh giá minh họa giao diện — sẽ được thay thế bằng phản hồi thực sau kỳ cashback đầu tiên.
            </p>
          )}
        </div>
      </div>
      <style>{`
        @media(max-width:900px){.testimonials-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:550px){.testimonials-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
