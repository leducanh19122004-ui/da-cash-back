import type { Metadata } from 'next';
import { LegalShell, LegalSection, Callout } from '../components/Legal';

export const metadata: Metadata = {
  title: 'Chính sách bảo mật — DA CASH BACK',
  description: 'Chính sách bảo mật và quyền riêng tư của nền tảng DA CASH BACK.',
};

const sections = [
  {
    title: '1. Dữ liệu chúng tôi thu thập',
    content: `Để cung cấp dịch vụ cashback, DA CASH BACK có thể thu thập các thông tin sau:
• Họ tên
• Địa chỉ email
• Tên người dùng Telegram / Zalo
• UID tài khoản sàn giao dịch
• Lịch sử yêu cầu hỗ trợ
• Thông tin giao tiếp trong quá trình hỗ trợ`,
  },
  {
    title: '2. Dữ liệu chúng tôi KHÔNG thu thập',
    content: `DA CASH BACK tuyệt đối không thu thập và không yêu cầu:
• Mật khẩu tài khoản sàn
• Mã xác thực 2FA / OTP
• Private key / Seed phrase / Recovery phrase
• API key có quyền rút tiền
• Thông tin thẻ ngân hàng / tài khoản ngân hàng
• Số CCCD / Căn cước công dân

Nếu bất kỳ ai tự xưng là DA CASH BACK và yêu cầu các thông tin trên, đây là hành vi lừa đảo. Vui lòng báo cáo ngay cho chúng tôi.`,
  },
  {
    title: '3. Mục đích sử dụng dữ liệu',
    content: `Thông tin thu thập được sử dụng để:
• Xác minh liên kết cashback giữa tài khoản sàn và chương trình đối tác
• Hỗ trợ tra cứu và giải quyết thắc mắc của người dùng
• Thanh toán cashback về tài khoản được chỉ định
• Thông báo cập nhật về cashback và chính sách đối tác
• Phòng chống gian lận`,
  },
  {
    title: '4. Bảo mật dữ liệu',
    content: `DA CASH BACK thực hiện các biện pháp bảo mật phù hợp để bảo vệ thông tin của người dùng. Dữ liệu không được bán, trao đổi hoặc chuyển nhượng cho bên thứ ba vì mục đích thương mại. Thông tin chỉ được chia sẻ với sàn đối tác trong giới hạn cần thiết để thực hiện chương trình cashback.`,
  },
  {
    title: '5. Quyền của người dùng',
    content: `Người dùng có quyền:
• Yêu cầu xem dữ liệu cá nhân được lưu trữ
• Yêu cầu chỉnh sửa thông tin không chính xác
• Yêu cầu xóa dữ liệu cá nhân (khi không còn tham gia chương trình)
• Rút lại sự đồng ý sử dụng dữ liệu bất kỳ lúc nào

Để thực hiện các quyền trên, liên hệ qua email: support@dacashback.com`,
  },
  {
    title: '6. Thay đổi chính sách',
    content: `DA CASH BACK có thể cập nhật chính sách bảo mật này theo thời gian. Mọi thay đổi sẽ được thông báo trên website. Việc tiếp tục sử dụng dịch vụ sau khi thay đổi được công bố đồng nghĩa với việc bạn chấp nhận chính sách mới.`,
  },
  {
    title: '7. Liên hệ',
    content: `Mọi câu hỏi về chính sách bảo mật, vui lòng liên hệ:
• Telegram: @jacksondz
• Email: support@dacashback.com`,
  },
];

export default function PrivacyPage() {
  return (
    <LegalShell title="Chính sách bảo mật" updated="Cập nhật lần cuối: 01/05/2025" backLabel="Quay về trang chủ">
      <Callout>
        <p>DA CASH BACK cam kết bảo vệ quyền riêng tư của bạn. Chúng tôi chỉ thu thập thông tin tối thiểu cần thiết và không bao giờ yêu cầu mật khẩu, private key, hay seed phrase.</p>
      </Callout>
      {sections.map((sec) => (
        <LegalSection key={sec.title} title={sec.title}>
          <p className="whitespace-pre-line">{sec.content}</p>
        </LegalSection>
      ))}
    </LegalShell>
  );
}
