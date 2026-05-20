'use client';
import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { extraTranslations } from '../translations';
import { USE_MOCK_CASHBACK_DATA } from '../lib/cashback';

// ─── Data ─────────────────────────────────────────────────────────
interface TestimonialItem {
  id: string; name: string; email: string; country: string; flag: string;
  exchange: string; exchangeType: 'crypto' | 'forex'; avatar: string;
  rating: number; locale: string;
  badges: ('verifiedUid' | 'cashbackRecorded' | 'privacyProtected')[];
  text: string; // native language text
}

const ALL_TESTIMONIALS: TestimonialItem[] = [
  // ── Original 7 ───────────────────────────────────────────────────
  { id:'vn-01', name:'N*** H.', email:'n***@gmail.com', country:'Vietnam', flag:'🇻🇳',
    exchange:'Binance', exchangeType:'crypto', avatar:'N', rating:5, locale:'vi',
    badges:['verifiedUid','cashbackRecorded','privacyProtected'],
    text:'Quy trình xác minh UID khá nhanh. Mình thích nhất là không cần cung cấp mật khẩu hay API rút tiền — đây là điều mình quan tâm nhất khi tìm dịch vụ cashback.' },
  { id:'th-01', name:'P*** K.', email:'p***88@gmail.com', country:'Thailand', flag:'🇹🇭',
    exchange:'Bybit', exchangeType:'crypto', avatar:'P', rating:5, locale:'th',
    badges:['verifiedUid','cashbackRecorded'],
    text:'ตั้งค่าง่ายและชัดเจน ฉันแค่ต้องยืนยัน UID โดยไม่ต้องแชร์รหัสผ่านหรือ API ถอนเงิน ระบบ cashback ติดตามได้ง่าย' },
  { id:'ko-01', name:'J*** Kim', email:'j***@naver.com', country:'South Korea', flag:'🇰🇷',
    exchange:'OKX', exchangeType:'crypto', avatar:'J', rating:5, locale:'ko',
    badges:['verifiedUid','cashbackRecorded','privacyProtected'],
    text:'UID 인증 과정이 간단했고, 비밀번호나 출금 API를 요구하지 않는 점이 마음에 들었습니다. 캐시백 내역도 파악하기 쉽습니다.' },
  { id:'sg-01', name:'A*** Tan', email:'a***@outlook.com', country:'Singapore', flag:'🇸🇬',
    exchange:'Bitget', exchangeType:'crypto', avatar:'A', rating:5, locale:'en',
    badges:['verifiedUid','cashbackRecorded'],
    text:'Clean interface and transparent cashback tracking. It feels useful for active traders who want better fee efficiency.' },
  { id:'id-01', name:'R*** Putra', email:'r***trade@gmail.com', country:'Indonesia', flag:'🇮🇩',
    exchange:'MEXC', exchangeType:'crypto', avatar:'R', rating:4, locale:'id',
    badges:['verifiedUid','privacyProtected'],
    text:'Panel aktivitas cashback sudah jelas. Saya senang tidak perlu memberikan kata sandi atau kode OTP — hanya UID yang cukup.' },
  { id:'ae-01', name:'M*** Al.', email:'m***@proton.me', country:'UAE', flag:'🇦🇪',
    exchange:'Exness', exchangeType:'forex', avatar:'M', rating:5, locale:'en',
    badges:['verifiedUid','cashbackRecorded'],
    text:'I like that the service focuses on fee rebates, not investment promises. The risk notice is also clearly presented.' },
  { id:'jp-01', name:'T*** Sato', email:'t***@gmail.com', country:'Japan', flag:'🇯🇵',
    exchange:'IC Markets', exchangeType:'forex', avatar:'T', rating:4, locale:'ja',
    badges:['verifiedUid','privacyProtected'],
    text:'手続きがシンプルで、アカウント情報が一部非表示になっている点がプライバシーを重視していると感じました。UID認証だけで済むのが良い。' },

  // ── New 8 — native language ───────────────────────────────────────
  { id:'jp-02', name:'K*** Yamamoto', email:'k***yama@gmail.com', country:'Japan', flag:'🇯🇵',
    exchange:'Bybit', exchangeType:'crypto', avatar:'K', rating:5, locale:'ja',
    badges:['verifiedUid','cashbackRecorded'],
    text:'UIDの確認だけで済み、パスワードや秘密鍵の提供は一切不要でした。キャッシュバックの履歴も見やすく管理しやすいです。' },
  { id:'kr-02', name:'S*** Park', email:'s***park@naver.com', country:'South Korea', flag:'🇰🇷',
    exchange:'MEXC', exchangeType:'crypto', avatar:'S', rating:5, locale:'ko',
    badges:['verifiedUid','cashbackRecorded','privacyProtected'],
    text:'인터페이스가 깔끔하고 캐시백 추적이 투명합니다. 비밀번호 없이 UID만으로 인증할 수 있어서 보안 걱정이 적었습니다.' },
  { id:'cn-01', name:'L*** Wei', email:'l***wei@gmail.com', country:'Taiwan', flag:'🇹🇼',
    exchange:'OKX', exchangeType:'crypto', avatar:'L', rating:5, locale:'zh',
    badges:['verifiedUid','cashbackRecorded'],
    text:'驗證流程很簡單，只需要提供UID，不需要密碼或任何提款API。返佣記錄清晰，介面也很容易操作。' },
  { id:'th-02', name:'N*** Chai', email:'n***chai@gmail.com', country:'Thailand', flag:'🇹🇭',
    exchange:'Binance', exchangeType:'crypto', avatar:'N', rating:4, locale:'th',
    badges:['verifiedUid','privacyProtected'],
    text:'ฉันชอบที่ไม่ต้องให้รหัสผ่านหรือ OTP ใดๆ เพียงแค่ UID ก็เพียงพอ แดชบอร์ดดูแล้วเข้าใจง่าย ข้อมูลบัญชีถูกปกปิดซึ่งรู้สึกปลอดภัยดี' },
  { id:'id-02', name:'A*** Wijaya', email:'a***wij@gmail.com', country:'Indonesia', flag:'🇮🇩',
    exchange:'Bitget', exchangeType:'crypto', avatar:'A', rating:5, locale:'id',
    badges:['verifiedUid','cashbackRecorded','privacyProtected'],
    text:'Proses verifikasi cukup mudah, hanya perlu UID tanpa perlu berbagi password atau kode OTP. Tampilan cashback cukup bersih dan mudah dipahami.' },
  { id:'es-01', name:'C*** García', email:'c***garcia@gmail.com', country:'Spain', flag:'🇪🇸',
    exchange:'Exness', exchangeType:'forex', avatar:'C', rating:4, locale:'es',
    badges:['verifiedUid','cashbackRecorded'],
    text:'El proceso de verificación fue sencillo, solo con el UID sin necesidad de contraseñas. El historial de cashback es claro y fácil de seguir.' },
  { id:'fr-01', name:'M*** Dubois', email:'m***dub@gmail.com', country:'France', flag:'🇫🇷',
    exchange:'XM', exchangeType:'forex', avatar:'M', rating:4, locale:'fr',
    badges:['verifiedUid','privacyProtected'],
    text:'La vérification ne demande que l\'UID, sans mot de passe ni clé privée. L\'interface est propre et le suivi des cashbacks est transparent.' },
  { id:'de-01', name:'F*** Müller', email:'f***muel@gmail.com', country:'Germany', flag:'🇩🇪',
    exchange:'Vantage', exchangeType:'forex', avatar:'F', rating:5, locale:'de',
    badges:['verifiedUid','cashbackRecorded','privacyProtected'],
    text:'Die Verifizierung ist unkompliziert – nur die UID wird benötigt, kein Passwort, keine 2FA. Die Cashback-Übersicht ist übersichtlich und verständlich gestaltet.' },

  // ── KR x3 ────────────────────────────────────────────────────────────
  { id:'kr-a1', name:'H*** Jeon',    email:'h***jeon@naver.com',   country:'South Korea', flag:'🇰🇷',
    exchange:'Binance',   exchangeType:'crypto' as const, avatar:'H', rating:5, locale:'ko',
    badges:['verifiedUid','cashbackRecorded'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'캐시백 받는 과정이 생각보다 간단했어요. UID만 입력하면 되고, 나머지는 시스템이 알아서 처리해 줍니다.' },
  { id:'kr-a2', name:'Y*** Cho',     email:'y***cho@kakao.com',    country:'South Korea', flag:'🇰🇷',
    exchange:'MEXC',      exchangeType:'crypto' as const, avatar:'Y', rating:5, locale:'ko',
    badges:['verifiedUid','privacyProtected'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'비밀번호나 OTP 없이 UID만으로 등록할 수 있어서 편리했습니다. 캐시백 내역도 확인하기 쉬웠어요.' },
  { id:'kr-a3', name:'S*** Lim',     email:'s***lim@gmail.com',    country:'South Korea', flag:'🇰🇷',
    exchange:'Bybit',     exchangeType:'crypto' as const, avatar:'S', rating:4, locale:'ko',
    badges:['verifiedUid'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'거래 수수료 일부를 돌려받을 수 있다는 점이 실용적입니다. 가입 과정도 복잡하지 않아서 좋았어요.' },

  // ── VN x4 ────────────────────────────────────────────────────────────
  { id:'vn-a1', name:'T*** Nguyễn',  email:'t***nguyen@gmail.com', country:'Vietnam',     flag:'🇻🇳',
    exchange:'OKX',       exchangeType:'crypto' as const, avatar:'T', rating:5, locale:'vi',
    badges:['verifiedUid','cashbackRecorded'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'Đăng ký đơn giản, chỉ cần UID là xong. Không yêu cầu thêm bất kỳ thông tin nhạy cảm nào.' },
  { id:'vn-a2', name:'L*** Phạm',    email:'l***pham@gmail.com',   country:'Vietnam',     flag:'🇻🇳',
    exchange:'Bybit',     exchangeType:'crypto' as const, avatar:'L', rating:5, locale:'vi',
    badges:['verifiedUid','cashbackRecorded','privacyProtected'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'Dùng được 2 tháng rồi, cashback về đúng hẹn. Không cần mật khẩu hay 2FA, chỉ cần UID là xong.' },
  { id:'vn-a3', name:'M*** Trần',    email:'m***tran@outlook.com', country:'Vietnam',     flag:'🇻🇳',
    exchange:'Exness',    exchangeType:'forex' as const,  avatar:'M', rating:4, locale:'vi',
    badges:['verifiedUid','privacyProtected'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'Giao diện khá sạch, dễ tra cứu lịch sử cashback. Thông tin tài khoản được ẩn một phần, cảm giác an tâm hơn.' },
  { id:'vn-a4', name:'K*** Lê',      email:'k***le@gmail.com',     country:'Vietnam',     flag:'🇻🇳',
    exchange:'Binance',   exchangeType:'crypto' as const, avatar:'K', rating:5, locale:'vi',
    badges:['verifiedUid','cashbackRecorded'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'Không cần lo lắng về bảo mật vì không ai yêu cầu mật khẩu hay private key. Quy trình rõ ràng.' },

  // ── Short & natural x2 ────────────────────────────────────────────────
  { id:'sg-s1', name:'B*** Lim',     email:'b***lim@gmail.com',    country:'Singapore',   flag:'🇸🇬',
    exchange:'Bitget',    exchangeType:'crypto' as const, avatar:'B', rating:5, locale:'en',
    badges:['verifiedUid'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'Quick setup, no password required. Does what it says.' },
  { id:'vn-s1', name:'A*** Hoàng',   email:'a***hoang@gmail.com',  country:'Vietnam',     flag:'🇻🇳',
    exchange:'MEXC',      exchangeType:'crypto' as const, avatar:'A', rating:5, locale:'vi',
    badges:['verifiedUid','cashbackRecorded'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'Nhanh, gọn, không rắc rối.' },

  // ── New 8 (user-specified, native language) ───────────────────────
  { id:'jp-x1', name:'T*** Sato',     email:'t***@gmail.com',      country:'Japan',       flag:'🇯🇵',
    exchange:'IC Markets', exchangeType:'forex' as const, avatar:'T', rating:5, locale:'ja',
    badges:['verifiedUid','cashbackRecorded'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'UID認証だけで確認できる点が便利です。パスワードや出金APIを求められないので安心感があります。' },
  { id:'kr-x1', name:'J*** Kim',      email:'j***@naver.com',       country:'South Korea', flag:'🇰🇷',
    exchange:'OKX',        exchangeType:'crypto' as const, avatar:'J', rating:5, locale:'ko',
    badges:['verifiedUid','privacyProtected'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'UID 인증 절차가 간단했고, 비밀번호나 OTP를 요구하지 않는 점이 마음에 들었습니다.' },
  { id:'tw-x1', name:'L*** Chen',     email:'l***@gmail.com',       country:'Taiwan',      flag:'🇹🇼',
    exchange:'Binance',    exchangeType:'crypto' as const, avatar:'L', rating:5, locale:'zh-TW',
    badges:['verifiedUid','cashbackRecorded','privacyProtected'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'介面很清楚，回饋紀錄也容易查看。帳號資訊有部分隱藏，感覺比較安全。' },
  { id:'th-x1', name:'P*** K.',       email:'p***88@gmail.com',     country:'Thailand',    flag:'🇹🇭',
    exchange:'Bybit',      exchangeType:'crypto' as const, avatar:'P', rating:5, locale:'th',
    badges:['verifiedUid','cashbackRecorded'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'ขั้นตอนยืนยัน UID เข้าใจง่าย และไม่ต้องให้รหัสผ่านหรือข้อมูลสำคัญของบัญชี' },
  { id:'id-x1', name:'R*** Putra',    email:'r***trade@gmail.com',  country:'Indonesia',   flag:'🇮🇩',
    exchange:'MEXC',       exchangeType:'crypto' as const, avatar:'R', rating:4, locale:'id',
    badges:['verifiedUid','privacyProtected'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'Panel cashback-nya mudah dipahami. Saya suka karena data akun disamarkan dan riwayatnya terlihat jelas.' },
  { id:'es-x1', name:'C*** García',   email:'c***@outlook.com',     country:'Spain',       flag:'🇪🇸',
    exchange:'Bitget',     exchangeType:'crypto' as const, avatar:'C', rating:5, locale:'es',
    badges:['verifiedUid','cashbackRecorded'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'El proceso es claro y sencillo. Me gusta que no pidan contraseña, OTP ni claves privadas.' },
  { id:'fr-x1', name:'M*** Laurent',  email:'m***@proton.me',       country:'France',      flag:'🇫🇷',
    exchange:'Exness',     exchangeType:'forex' as const, avatar:'M', rating:4, locale:'fr',
    badges:['verifiedUid','privacyProtected'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'Le suivi du cashback est simple à comprendre. Les informations du compte sont masquées, ce qui inspire confiance.' },
  { id:'de-x1', name:'A*** Müller',   email:'a***@gmail.com',       country:'Germany',     flag:'🇩🇪',
    exchange:'XM',         exchangeType:'forex' as const, avatar:'A', rating:5, locale:'de',
    badges:['verifiedUid','cashbackRecorded','privacyProtected'] as ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[],
    text:'Die UID-Verifizierung war unkompliziert. Gut finde ich, dass keine Passwörter oder privaten Schlüssel verlangt werden.' },
];

// ─── Badge ────────────────────────────────────────────────────────
function Badge({ type, labels }: { type: string; labels: Record<string, string> }) {
  const cfg: Record<string, { bg: string; border: string; color: string }> = {
    verifiedUid:      { bg:'rgba(212,175,55,0.12)',  border:'rgba(212,175,55,0.3)', color:'#D4AF37' },
    cashbackRecorded: { bg:'rgba(76,175,80,0.1)',    border:'rgba(76,175,80,0.3)',  color:'#4CAF50' },
    privacyProtected: { bg:'rgba(184,184,184,0.08)', border:'rgba(184,184,184,0.2)',color:'#888' },
  };
  const c = cfg[type] || cfg.privacyProtected;
  return (
    <span style={{ padding:'0.18rem 0.55rem', borderRadius:'999px', fontSize:'0.62rem', fontWeight:600,
      background:c.bg, border:`1px solid ${c.border}`, color:c.color, whiteSpace:'nowrap' }}>
      {labels[type] || type}
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────
function TestimonialCard({ item, badgeLabels, exchangeLabel }:
  { item: TestimonialItem; badgeLabels: Record<string,string>; exchangeLabel: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width:'310px', flexShrink:0,
        background:'rgba(12,12,12,0.9)', backdropFilter:'blur(14px)',
        border:`1px solid ${hov ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.18)'}`,
        borderRadius:'1.25rem', padding:'1.4rem',
        display:'flex', flexDirection:'column', gap:'0.8rem',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov
          ? '0 12px 36px rgba(0,0,0,0.55), 0 0 20px rgba(212,175,55,0.1)'
          : '0 4px 18px rgba(0,0,0,0.3)',
        transition:'transform 0.25s ease, border-color 0.25s, box-shadow 0.25s',
        userSelect:'none',
      }}
    >
      {/* Top row */}
      <div style={{ display:'flex', gap:'0.65rem', alignItems:'flex-start' }}>
        <div style={{ width:'40px', height:'40px', borderRadius:'50%',
          background:'linear-gradient(135deg,#FFD700,#D4AF37)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'0.95rem', fontWeight:900, color:'#050505', flexShrink:0 }}>
          {item.avatar}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', flexWrap:'wrap' }}>
            <p style={{ fontSize:'0.86rem', fontWeight:700, color:'#F8F5E9' }}>{item.name}</p>
            <span style={{ fontSize:'0.9rem' }}>{item.flag}</span>
          </div>
          <p style={{ fontSize:'0.65rem', color:'#555', marginTop:'0.06rem' }}>{item.email}</p>
          <div style={{ display:'flex', gap:'1px', marginTop:'0.28rem' }}>
            {Array.from({length:5}).map((_,i) => (
              <span key={i} style={{ fontSize:'0.72rem', color:i < item.rating ? '#D4AF37' : '#222' }}>★</span>
            ))}
          </div>
        </div>
      </div>

      {/* Review text — native language */}
      <p style={{ fontSize:'0.84rem', color:'#B0B0B0', lineHeight:1.7, fontStyle:'italic', flex:1 }}>
        &ldquo;{item.text}&rdquo;
      </p>

      {/* Footer */}
      <div>
        <div style={{ fontSize:'0.63rem', color:'#555', marginBottom:'0.45rem',
          paddingBottom:'0.45rem', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          {exchangeLabel}:{' '}
          <span style={{ color:'#888', fontWeight:600 }}>{item.exchange}</span>
        </div>
        <div style={{ display:'flex', gap:'0.32rem', flexWrap:'wrap' }}>
          {item.badges.map(b => <Badge key={b} type={b} labels={badgeLabels} />)}
        </div>
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────
export default function Testimonials() {
  const { lang } = useLang();
  const ts = extraTranslations[lang as keyof typeof extraTranslations]?.testimonials
    ?? extraTranslations.vi.testimonials;
  const isMock = USE_MOCK_CASHBACK_DATA;

  const badgeLabels = {
    verifiedUid:      ts.badges.verifiedUid,
    cashbackRecorded: ts.badges.cashbackRecorded,
    privacyProtected: ts.badges.privacyProtected,
  };

  // 3 copies for smooth infinite loop (translateX -33.333% = 1 copy)
  const cards = [...ALL_TESTIMONIALS, ...ALL_TESTIMONIALS, ...ALL_TESTIMONIALS];

  return (
    <section style={{ padding: '6rem 0 5rem', background: 'rgba(5,5,5,0)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
          {ts.badge}
        </p>
        <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.25rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '0.75rem' }}>
          {ts.title}
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.7, fontStyle: 'italic', maxWidth: '620px', margin: '0 auto 0.5rem' }}>
          {ts.subtitle}
        </p>
        <p style={{ fontSize: '0.72rem', color: '#555', letterSpacing: '0.04em' }}>↔ Hover vào từng card để dừng — cuộn tự động</p>
      </div>

      {/* Carousel — pure CSS hover, no JS needed */}
      <div className="testimonials-wrapper">
        <div className="testimonials-track">
          {cards.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="testimonial-card">
              <TestimonialCard item={item} badgeLabels={badgeLabels} exchangeLabel={ts.exchange} />
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div style={{ maxWidth: '1100px', margin: '1.5rem auto 0', padding: '0 1.5rem', textAlign: 'center',
        display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center' }}>
        <p style={{ fontSize: '0.72rem', color: '#555', maxWidth: '580px', lineHeight: 1.65, margin: '0 auto' }}>{ts.fullNote}</p>
      </div>
    </section>
  );
}