import type { Metadata } from 'next';
import { LegalShell, LegalSection as Section, Bullet, CheckList as Check, CrossList as Cross, Step } from '../components/Legal';
export const metadata: Metadata = { title: 'Điều khoản dịch vụ — DA CASH BACK', description: 'Điều khoản sử dụng dịch vụ hoàn phí DA CASH BACK.' };

export default function TermsPage() {
  return (
    <LegalShell title="Điều khoản dịch vụ" updated="Cập nhật lần cuối: 01/05/2025" backLabel="Về trang chủ">
          <Section title="1. Tổng quan về DA CASH BACK">
            <p className="mb-4">DA CASH BACK là nền tảng hỗ trợ người dùng nhận cashback/hoàn phí từ các đối tác sàn giao dịch crypto và forex thông qua chương trình IB/affiliate.</p>
            <Bullet items={[
              'DA CASH BACK không phải sàn giao dịch và không thực hiện các hoạt động giao dịch thay người dùng.',
              'DA CASH BACK không cung cấp dịch vụ môi giới, tư vấn đầu tư hoặc quản lý tài sản.',
              'DA CASH BACK không giữ hoặc quản lý tiền/tài sản của người dùng.',
              'Người dùng tự chịu trách nhiệm với toàn bộ quyết định giao dịch của mình.',
            ]} />
          </Section>

          <Section title="2. Điều kiện nhận cashback">
            <p className="mb-4">Để đủ điều kiện nhận cashback, người dùng cần đáp ứng đồng thời các yêu cầu sau:</p>
            <Check items={[
              'Đăng ký tài khoản tại sàn qua link/mã giới thiệu đối tác chính thức của DA CASH BACK.',
              'Không có tài khoản cũ trùng thông tin tại cùng sàn (nếu sàn không cho phép đăng ký lại).',
              'Cung cấp chính xác UID/email và tên sàn để DA CASH BACK xác minh liên kết.',
              'Tài khoản được sàn ghi nhận trong hệ thống đối tác của DA CASH BACK.',
              'Phát sinh giao dịch hợp lệ theo đúng chính sách của từng sàn.',
              'Không vi phạm điều khoản sử dụng của sàn hoặc của DA CASH BACK.',
            ]} />
          </Section>

          <Section title="3. Trường hợp không đủ điều kiện cashback">
            <Cross items={[
              'Đăng ký không thông qua link/mã giới thiệu đối tác của DA CASH BACK.',
              'UID hoặc thông tin xác minh sai, không khớp với dữ liệu từ sàn.',
              'Tài khoản đã liên kết với IB/đối tác khác trước đó.',
              'Tài khoản vi phạm điều khoản sử dụng của sàn giao dịch.',
              'Giao dịch bị sàn loại khỏi chương trình hoa hồng đối tác.',
              'Có dấu hiệu gian lận, abuse, tạo nhiều tài khoản bất thường hoặc vi phạm chính sách.',
            ]} />
          </Section>

          <Section title="4. Quy trình đối soát cashback">
            <p className="mb-4">DA CASH BACK thực hiện đối soát định kỳ theo chu kỳ của từng sàn đối tác:</p>
            {[
              'Người dùng đăng ký tài khoản sàn qua link đối tác DA CASH BACK',
              'Gửi UID/email để DA CASH BACK xác minh liên kết tài khoản',
              'DA CASH BACK kiểm tra trạng thái tài khoản trong hệ thống đối tác',
              'Người dùng phát sinh giao dịch hợp lệ trên sàn',
              'Sàn ghi nhận phí giao dịch và tính toán hoa hồng/cashback cho đối tác',
              'DA CASH BACK nhận dữ liệu đối soát và xác minh từng khoản',
              'Cashback được cập nhật và thanh toán cho người dùng theo chu kỳ thỏa thuận',
            ].map((s, i) => <Step key={i} n={i+1} text={s} />)}
          </Section>

          <Section title="5. Chính sách cashback và giới hạn trách nhiệm">
            <Bullet items={[
              'Tỷ lệ cashback phụ thuộc vào chính sách của từng sàn đối tác và có thể thay đổi.',
              'Thời gian đối soát và thanh toán có thể khác nhau tùy theo từng sàn.',
              'DA CASH BACK có quyền từ chối cashback nếu phát hiện gian lận hoặc vi phạm chính sách.',
              'DA CASH BACK không chịu trách nhiệm cho bất kỳ tổn thất giao dịch nào.',
              'DA CASH BACK không cam kết lợi nhuận dưới bất kỳ hình thức nào.',
            ]} />
          </Section>

          <Section title="6. Liên hệ hỗ trợ">
            <p>Mọi thắc mắc về điều khoản hoặc cashback, vui lòng liên hệ qua:</p>
            <div className="mt-3 flex flex-col gap-1.5">
              <p>Telegram: <a href="https://t.me/jacksondz" target="_blank" rel="noopener noreferrer">@jacksondz</a></p>
              <p>Email: <a href="mailto:support@dacashback.com">support@dacashback.com</a></p>
            </div>
          </Section>
    </LegalShell>
  );
}
