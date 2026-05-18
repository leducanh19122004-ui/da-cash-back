import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
export const metadata: Metadata = { title: 'Cảnh báo rủi ro — DA CASH BACK', description: 'Thông tin cảnh báo rủi ro khi giao dịch Crypto và Forex.' };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#111', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '1rem', padding: '1.75rem', marginBottom: '1.25rem' }}>
      <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#D4AF37', marginBottom: '1rem' }}>{title}</h2>
      <div style={{ fontSize: '0.9rem', color: '#999', lineHeight: 1.85 }}>{children}</div>
    </div>
  );
}
function Bullet({ items }: { items: string[] }) {
  return <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>{items.map((i,k)=><li key={k}>{i}</li>)}</ul>;
}

export default function RiskPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', paddingTop: '5rem', background: '#0B0B0B' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <Link href="/" style={{ color: '#D4AF37', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>← Về trang chủ</Link>
          <h1 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Cảnh báo rủi ro</h1>
          <p style={{ color: '#555', fontSize: '0.85rem', marginBottom: '2rem' }}>Cập nhật lần cuối: 01/05/2025</p>

          {/* Main warning */}
          <div style={{ background: '#1A0808', border: '2px solid rgba(239,68,68,0.45)', borderRadius: '1rem', padding: '1.5rem 2rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '2rem', flexShrink: 0 }}>⚠️</span>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ef4444', marginBottom: '0.6rem' }}>CẢNH BÁO RỦI RO CAO</h2>
              <p style={{ fontSize: '0.875rem', color: '#B8B8B8', lineHeight: 1.75 }}>
                Giao dịch Crypto và Forex có rủi ro thua lỗ rất cao. Bạn có thể mất toàn bộ số tiền đầu tư. Chỉ tham gia giao dịch với số vốn bạn sẵn sàng chấp nhận mất hoàn toàn.
              </p>
            </div>
          </div>

          <Section title="1. Rủi ro thị trường Crypto">
            <Bullet items={[
              'Giá tài sản crypto có thể biến động cực kỳ mạnh và khó dự đoán.',
              'Trong thời gian ngắn, giá có thể giảm từ 50% đến 90% hoặc hơn.',
              'Thị trường crypto hoạt động 24/7, không có giới hạn biên độ.',
              'Rủi ro thanh khoản — khó bán tài sản khi cần trong điều kiện thị trường xấu.',
              'Rủi ro hack và tấn công vào sàn giao dịch hoặc ví cá nhân.',
              'Rủi ro pháp lý — chính sách quản lý crypto thay đổi theo từng quốc gia.',
              'Rủi ro dự án — altcoin có thể mất giá trị hoàn toàn.',
            ]} />
          </Section>

          <Section title="2. Rủi ro thị trường Forex và phái sinh">
            <Bullet items={[
              'Đòn bẩy cao khuếch đại cả lợi nhuận lẫn tổn thất.',
              'Có thể thua lỗ vượt quá số vốn ban đầu trong một số trường hợp.',
              'Biến động bất ngờ do sự kiện kinh tế và chính trị toàn cầu.',
              'Spread, phí qua đêm (swap) và các chi phí giao dịch ảnh hưởng đến kết quả.',
              'Rủi ro margin call khi thị trường diễn biến bất lợi nhanh.',
            ]} />
          </Section>

          <Section title="3. Cashback không làm giảm rủi ro giao dịch">
            <Bullet items={[
              'Cashback là hoàn lại một phần phí giao dịch — không phải lợi nhuận đầu tư.',
              'Cashback không bù đắp được tổn thất từ giao dịch thua lỗ.',
              'Cashback không đảm bảo kết quả giao dịch có lãi.',
              'DA CASH BACK không cam kết bất kỳ mức lợi nhuận nào.',
              'Quyết định giao dịch hoàn toàn thuộc trách nhiệm cá nhân người dùng.',
            ]} />
          </Section>

          <Section title="4. Khuyến nghị trước khi tham gia">
            <Bullet items={[
              'Tự nghiên cứu kỹ (DYOR) về thị trường, sàn giao dịch và sản phẩm tài chính.',
              'Chỉ sử dụng vốn mà bạn sẵn sàng mất hoàn toàn.',
              'Hiểu rõ cơ chế đòn bẩy và quản lý rủi ro trước khi giao dịch.',
              'Tham khảo chuyên gia tài chính độc lập nếu cần.',
              'Không đầu tư dưới áp lực hoặc cảm xúc nhất thời.',
            ]} />
          </Section>

          <div style={{ marginTop: '2rem', padding: '1.25rem 1.5rem', background: '#111', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.75 }}>
              Bằng cách sử dụng dịch vụ của DA CASH BACK, bạn xác nhận đã đọc, hiểu và chấp nhận các rủi ro được mô tả trong tài liệu này.
            </p>
            <Link href="/" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.6rem 1.75rem', background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', color: '#050505', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem' }}>
              Về trang chủ
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
