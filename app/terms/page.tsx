import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
export const metadata: Metadata = { title: 'Điều khoản dịch vụ — DA CASH BACK', description: 'Điều khoản sử dụng dịch vụ hoàn phí DA CASH BACK.' };

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
function Check({ items }: { items: string[] }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>{items.map((i,k)=><div key={k} style={{ display:'flex',gap:'0.5rem',alignItems:'flex-start' }}><span style={{color:'#4CAF50',flexShrink:0}}>✓</span><span>{i}</span></div>)}</div>;
}
function Cross({ items }: { items: string[] }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>{items.map((i,k)=><div key={k} style={{ display:'flex',gap:'0.5rem',alignItems:'flex-start' }}><span style={{color:'#ef4444',flexShrink:0}}>✕</span><span>{i}</span></div>)}</div>;
}
function Step({ n, text }: { n: number; text: string }) {
  return (
    <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#FFD700,#D4AF37)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900, color: '#050505', flexShrink: 0 }}>{n}</div>
      <p style={{ paddingTop: '0.3rem' }}>{text}</p>
    </div>
  );
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', paddingTop: '5rem', background: '#0B0B0B' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <Link href="/" style={{ color: '#D4AF37', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>← Về trang chủ</Link>
          <h1 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Điều khoản dịch vụ</h1>
          <p style={{ color: '#555', fontSize: '0.85rem', marginBottom: '2.5rem' }}>Cập nhật lần cuối: 01/05/2025</p>

          <Section title="1. Tổng quan về DA CASH BACK">
            <p style={{ marginBottom: '0.875rem' }}>DA CASH BACK là nền tảng hỗ trợ người dùng nhận cashback/hoàn phí từ các đối tác sàn giao dịch crypto và forex thông qua chương trình IB/affiliate.</p>
            <Bullet items={[
              'DA CASH BACK không phải sàn giao dịch và không thực hiện các hoạt động giao dịch thay người dùng.',
              'DA CASH BACK không cung cấp dịch vụ môi giới, tư vấn đầu tư hoặc quản lý tài sản.',
              'DA CASH BACK không giữ hoặc quản lý tiền/tài sản của người dùng.',
              'Người dùng tự chịu trách nhiệm với toàn bộ quyết định giao dịch của mình.',
            ]} />
          </Section>

          <Section title="2. Điều kiện nhận cashback">
            <p style={{ marginBottom: '0.875rem' }}>Để đủ điều kiện nhận cashback, người dùng cần đáp ứng đồng thời các yêu cầu sau:</p>
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
            <p style={{ marginBottom: '1rem' }}>DA CASH BACK thực hiện đối soát định kỳ theo chu kỳ của từng sàn đối tác:</p>
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
            <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <p>📱 Telegram: <a href="https://t.me/jacksondz" style={{ color: '#D4AF37', textDecoration: 'none' }}>@jacksondz</a></p>
              <p>📧 Email: <a href="mailto:support@dacashback.com" style={{ color: '#D4AF37', textDecoration: 'none' }}>support@dacashback.com</a></p>
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
