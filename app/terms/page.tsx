import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Điều khoản dịch vụ — DA CASH BACK',
  description: 'Điều khoản và điều kiện sử dụng dịch vụ hoàn phí giao dịch DA CASH BACK.',
};

const sections = [
  {
    title: '1. Mô tả dịch vụ',
    content: `DA CASH BACK là nền tảng kết nối trader với các sàn giao dịch crypto và forex thông qua chương trình đối tác (IB/affiliate). Khi người dùng đăng ký tài khoản sàn qua link hoặc mã giới thiệu của DA CASH BACK và giao dịch, một phần phí giao dịch sẽ được hoàn lại (cashback) theo chính sách của từng sàn đối tác.

DA CASH BACK không phải là sàn giao dịch, không cung cấp dịch vụ môi giới đầu tư và không giữ tiền giao dịch của người dùng.`,
  },
  {
    title: '2. Điều kiện sử dụng',
    content: `Để sử dụng dịch vụ của DA CASH BACK, người dùng phải:
• Từ 18 tuổi trở lên và đủ năng lực pháp lý
• Tự đăng ký tài khoản trên sàn chính thức qua link đối tác của DA CASH BACK
• Cung cấp thông tin chính xác (họ tên, UID, thông tin liên hệ)
• Không sử dụng dịch vụ cho mục đích bất hợp pháp
• Tuân thủ điều khoản sử dụng của từng sàn giao dịch đối tác`,
  },
  {
    title: '3. Quy trình cashback',
    content: `Cashback được tính dựa trên phí giao dịch thực tế phát sinh trên sàn đối tác. Tỷ lệ và chu kỳ thanh toán phụ thuộc vào chính sách của từng sàn và thỏa thuận đối tác tại từng thời điểm.

Để nhận cashback, người dùng cần:
1. Đăng ký tài khoản sàn qua link/ref code của DA CASH BACK
2. Cung cấp UID tài khoản để xác minh liên kết
3. Giao dịch trên sàn như bình thường

DA CASH BACK sẽ đối soát dữ liệu từ sàn và hoàn phí theo chu kỳ thỏa thuận.`,
  },
  {
    title: '4. Thay đổi tỷ lệ hoàn phí',
    content: `Tỷ lệ cashback có thể thay đổi tại bất kỳ thời điểm nào do chính sách của sàn đối tác thay đổi hoặc do điều chỉnh thỏa thuận đối tác. DA CASH BACK sẽ thông báo cho người dùng trong khả năng có thể. Người dùng cần theo dõi thông tin cập nhật thường xuyên.`,
  },
  {
    title: '5. Giới hạn trách nhiệm',
    content: `DA CASH BACK không chịu trách nhiệm về:
• Kết quả giao dịch và tổn thất của người dùng trên sàn
• Thay đổi chính sách từ phía sàn đối tác
• Gián đoạn dịch vụ do sàn đối tác hoặc lực lượng bất khả kháng
• Thiệt hại phát sinh từ việc cung cấp thông tin không chính xác

DA CASH BACK không cung cấp lời khuyên đầu tư và không chịu trách nhiệm cho bất kỳ tổn thất tài chính nào.`,
  },
  {
    title: '6. Cảnh báo rủi ro',
    content: `Giao dịch crypto và forex có rủi ro thua lỗ cao, có thể dẫn đến mất toàn bộ vốn đầu tư. Cashback chỉ là hoàn phí giao dịch và không làm giảm rủi ro giao dịch. Người dùng cần tự nghiên cứu, hiểu rõ rủi ro và chỉ sử dụng vốn có thể chấp nhận mất trước khi tham gia giao dịch.`,
  },
  {
    title: '7. Liên hệ hỗ trợ',
    content: `Mọi thắc mắc về điều khoản dịch vụ, vui lòng liên hệ:
• Telegram: @jacksondz
• Email: support@dacashback.com`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', paddingTop: '5rem', background: '#0B0B0B' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <div style={{ marginBottom: '3rem' }}>
            <Link href="/" style={{ color: '#D4AF37', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>← Quay về trang chủ</Link>
            <h1 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginTop: '1.25rem', marginBottom: '0.5rem' }}>
              Điều khoản dịch vụ
            </h1>
            <p style={{ color: '#666', fontSize: '0.875rem' }}>Cập nhật lần cuối: 01/05/2025</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {sections.map(sec => (
              <div key={sec.title} style={{
                background: '#111111', border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '1rem', padding: '1.75rem',
              }}>
                <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#D4AF37', marginBottom: '1rem' }}>{sec.title}</h2>
                <p style={{ fontSize: '0.9rem', color: '#999', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{sec.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
