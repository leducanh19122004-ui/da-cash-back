'use client';
import { useState } from 'react';

const faqs = [
  {
    q: 'Cashback là gì?',
    a: 'Cashback là khoản hoàn lại một phần phí giao dịch mà người dùng đã phát sinh trên sàn, được chia lại từ chương trình đối tác (IB/affiliate) giữa DA CASH BACK và sàn giao dịch.',
  },
  {
    q: 'Tôi có cần nạp tiền vào DA CASH BACK không?',
    a: 'Không. Người dùng giao dịch trực tiếp trên sàn chính thức. DA CASH BACK không nhận tiền nạp giao dịch của khách hàng và không phải là sàn giao dịch.',
  },
  {
    q: 'Tôi cần cung cấp thông tin gì?',
    a: 'Thông thường chỉ cần UID tài khoản sàn để kiểm tra liên kết cashback. Tuyệt đối không cung cấp mật khẩu, mã 2FA, private key hoặc seed phrase cho bất kỳ ai.',
  },
  {
    q: 'Cashback được trả khi nào?',
    a: 'Tùy theo chu kỳ đối soát của từng sàn. Một số sàn có thể trả theo ngày, tuần hoặc tháng. DA CASH BACK sẽ thông báo kỳ thanh toán cụ thể cho từng sàn.',
  },
  {
    q: 'Nếu tôi đã có tài khoản sàn rồi thì có nhận cashback được không?',
    a: 'Tùy chính sách từng sàn. Một số sàn yêu cầu tài khoản mới đăng ký qua link đối tác mới đủ điều kiện cashback. Liên hệ hỗ trợ để được tư vấn chi tiết.',
  },
  {
    q: 'DA CASH BACK có cam kết lợi nhuận không?',
    a: 'Không. DA CASH BACK chỉ là nền tảng hỗ trợ hoàn phí giao dịch, không cam kết lợi nhuận và không chịu trách nhiệm cho kết quả giao dịch của người dùng.',
  },
  {
    q: 'Cashback được thanh toán bằng gì?',
    a: 'Tùy từng sàn và thỏa thuận. Thông thường cashback được thanh toán bằng USDT, hoặc coin gốc của sàn. DA CASH BACK sẽ thông báo phương thức cụ thể.',
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" style={{ padding: '6rem 1.5rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Giải đáp thắc mắc
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '1rem' }}>
            Câu hỏi thường gặp
          </h2>
          <p style={{ color: '#888', lineHeight: 1.7 }}>
            Các câu hỏi phổ biến về dịch vụ hoàn phí giao dịch của DA CASH BACK
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: '#111111', border: `1px solid ${openIdx === idx ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.2)'}`,
                borderRadius: '0.875rem', overflow: 'hidden',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                boxShadow: openIdx === idx ? '0 4px 20px rgba(212,175,55,0.08)' : 'none',
              }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '1.25rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F8F5E9', flex: 1 }}>{faq.q}</span>
                <span style={{
                  marginLeft: '1rem', flexShrink: 0, width: '24px', height: '24px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', background: 'rgba(212,175,55,0.15)',
                  color: '#D4AF37', fontWeight: 700, fontSize: '1rem',
                  transition: 'transform 0.25s ease',
                  transform: openIdx === idx ? 'rotate(45deg)' : 'none',
                }}>+</span>
              </button>
              {openIdx === idx && (
                <div style={{ padding: '0 1.5rem 1.25rem' }}>
                  <div style={{ height: '1px', background: 'rgba(212,175,55,0.15)', marginBottom: '1rem' }} />
                  <p style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.75 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '1rem' }}>Không tìm thấy câu trả lời?</p>
          <a
            href="#contact"
            style={{
              display: 'inline-block', padding: '0.75rem 2rem', fontWeight: 600, fontSize: '0.9rem',
              border: '1.5px solid #D4AF37', color: '#D4AF37', borderRadius: '0.75rem', textDecoration: 'none',
              transition: 'background 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.1)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none'; }}
          >
            Liên hệ hỗ trợ
          </a>
        </div>
      </div>
    </section>
  );
}
