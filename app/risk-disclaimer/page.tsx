import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Cảnh báo rủi ro — DA CASH BACK',
  description: 'Thông tin cảnh báo rủi ro khi giao dịch Crypto và Forex từ DA CASH BACK.',
};

export default function RiskDisclaimerPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', paddingTop: '5rem', background: '#0B0B0B' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <div style={{ marginBottom: '3rem' }}>
            <Link href="/" style={{ color: '#D4AF37', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>← Quay về trang chủ</Link>
            <h1 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginTop: '1.25rem', marginBottom: '0.5rem' }}>
              Cảnh báo rủi ro
            </h1>
            <p style={{ color: '#666', fontSize: '0.875rem' }}>Cập nhật lần cuối: 01/05/2025</p>
          </div>

          {/* Main warning banner */}
          <div style={{
            background: '#1A1408', border: '2px solid rgba(212,175,55,0.5)',
            borderRadius: '1rem', padding: '1.75rem', marginBottom: '2rem',
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '2rem', flexShrink: 0 }}>⚠️</span>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#D4AF37', marginBottom: '0.75rem' }}>
                CẢNH BÁO QUAN TRỌNG
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#B8B8B8', lineHeight: 1.8 }}>
                Giao dịch Crypto và Forex có rủi ro thua lỗ rất cao. Bạn có thể mất toàn bộ số tiền đầu tư. Chỉ giao dịch với số vốn bạn có thể chấp nhận mất hoàn toàn.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              {
                title: '1. Rủi ro giao dịch Crypto',
                content: `Thị trường tiền điện tử (cryptocurrency) có đặc điểm biến động giá cực kỳ cao và khó lường. Trong một thời gian ngắn, giá trị tài sản có thể giảm từ 50% đến 90% hoặc hơn. Các rủi ro cụ thể bao gồm:
• Biến động giá mạnh và khó dự đoán
• Rủi ro thanh khoản (khó bán tài sản khi cần)
• Rủi ro hack, tấn công mạng vào sàn giao dịch
• Rủi ro pháp lý và thay đổi quy định
• Rủi ro dự án (project risk) đối với altcoin
• Thị trường hoạt động 24/7, không có giới hạn biên độ`,
              },
              {
                title: '2. Rủi ro giao dịch Forex',
                content: `Giao dịch ngoại hối (Forex) với đòn bẩy cao có thể dẫn đến thua lỗ vượt quá số vốn ban đầu. Các rủi ro cụ thể bao gồm:
• Đòn bẩy khuếch đại cả lợi nhuận lẫn thua lỗ
• Biến động do sự kiện kinh tế, chính trị bất ngờ
• Spread, phí qua đêm (swap) ảnh hưởng đến lợi nhuận
• Rủi ro đối tác broker
• Rủi ro margin call khi thị trường biến động mạnh`,
              },
              {
                title: '3. Cashback không làm giảm rủi ro',
                content: `Khoản hoàn phí (cashback) mà DA CASH BACK cung cấp là một phần nhỏ trong tổng phí giao dịch. Cashback KHÔNG:
• Bù đắp được tổn thất giao dịch
• Đảm bảo lợi nhuận
• Làm giảm rủi ro thị trường

Cashback chỉ giúp tối ưu chi phí giao dịch ở mức độ nhất định.`,
              },
              {
                title: '4. Không có cam kết lợi nhuận',
                content: `DA CASH BACK không cam kết, không đảm bảo và không dự đoán bất kỳ mức lợi nhuận nào từ giao dịch. Mọi thông tin trên website chỉ mang tính chất thông tin, không phải lời khuyên đầu tư.

Bất kỳ nội dung nào về tỷ lệ cashback, số liệu minh họa đều không phải là dự đoán hay cam kết về kết quả thực tế.`,
              },
              {
                title: '5. Trách nhiệm cá nhân',
                content: `Người dùng hoàn toàn tự chịu trách nhiệm với:
• Tất cả quyết định giao dịch của mình
• Quản lý rủi ro cá nhân
• Tuân thủ pháp luật địa phương về giao dịch tài chính
• Khai báo thuế liên quan (nếu có)
• Lựa chọn sàn giao dịch và mức độ rủi ro chấp nhận được

Trước khi giao dịch, hãy tự nghiên cứu kỹ (DYOR - Do Your Own Research) và cân nhắc tìm kiếm lời khuyên tài chính chuyên nghiệp.`,
              },
              {
                title: '6. Đối tượng không nên tham gia',
                content: `Giao dịch Crypto/Forex KHÔNG phù hợp với:
• Người không có kiến thức về tài chính và thị trường
• Người có tình hình tài chính không ổn định
• Người không thể chịu được rủi ro thua lỗ
• Người chưa đủ 18 tuổi
• Người đang trong tình trạng khó khăn tài chính`,
              },
            ].map(sec => (
              <div key={sec.title} style={{
                background: '#111111', border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '1rem', padding: '1.75rem',
              }}>
                <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#D4AF37', marginBottom: '1rem' }}>{sec.title}</h2>
                <p style={{ fontSize: '0.9rem', color: '#999', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{sec.content}</p>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '2.5rem', padding: '1.5rem', background: '#111',
            border: '1px solid rgba(212,175,55,0.2)', borderRadius: '1rem', textAlign: 'center',
          }}>
            <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.7 }}>
              Bằng cách sử dụng dịch vụ của DA CASH BACK, bạn xác nhận đã đọc, hiểu và chấp nhận tất cả các rủi ro được mô tả trong tài liệu này.
            </p>
            <Link href="/" style={{
              display: 'inline-block', marginTop: '1rem', padding: '0.625rem 1.75rem',
              background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
              color: '#050505', borderRadius: '0.625rem', textDecoration: 'none',
              fontWeight: 700, fontSize: '0.875rem',
            }}>
              Quay về trang chủ
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
