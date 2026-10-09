import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalShell, LegalSection as Section, Bullet, Callout } from '../components/Legal';
export const metadata: Metadata = { title: 'Cảnh báo rủi ro — DA CASH BACK', description: 'Thông tin cảnh báo rủi ro khi giao dịch Crypto và Forex.' };

export default function RiskPage() {
  return (
    <LegalShell title="Cảnh báo rủi ro" updated="Cập nhật lần cuối: 01/05/2025" backLabel="Về trang chủ">
          {/* Main warning */}
          <Callout title="CẢNH BÁO RỦI RO CAO">
            <p>Giao dịch Crypto và Forex có rủi ro thua lỗ rất cao. Bạn có thể mất toàn bộ số tiền đầu tư. Chỉ tham gia giao dịch với số vốn bạn sẵn sàng chấp nhận mất hoàn toàn.</p>
          </Callout>

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

          <div className="py-9">
            <p className="text-sm leading-relaxed text-muted">
              Bằng cách sử dụng dịch vụ của DA CASH BACK, bạn xác nhận đã đọc, hiểu và chấp nhận các rủi ro được mô tả trong tài liệu này.
            </p>
            <Link href="/" className="btn btn-primary mt-6">
              Về trang chủ
            </Link>
          </div>
    </LegalShell>
  );
}
