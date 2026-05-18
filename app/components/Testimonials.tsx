'use client';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { extraTranslations } from '../translations';
import { USE_MOCK_CASHBACK_DATA } from '../lib/cashback';

// ─── Testimonial data ────────────────────────────────────────────
interface TestimonialItem {
  id: string; name: string; email: string; country: string; flag: string;
  exchange: string; exchangeType: 'crypto'|'forex'; avatar: string;
  rating: number; badges: ('verifiedUid'|'cashbackRecorded'|'privacyProtected')[];
  text: { vi: string; en: string; ko?: string; th?: string; id?: string };
}
const TESTIMONIALS: TestimonialItem[] = [
  { id:'vn-01', name:'N*** H.', email:'n***@gmail.com', country:'Vietnam', flag:'🇻🇳', exchange:'Binance', exchangeType:'crypto', avatar:'N', rating:5, badges:['verifiedUid','cashbackRecorded','privacyProtected'],
    text:{ vi:'Quy trình xác minh UID khá nhanh. Mình thích nhất là không cần cung cấp mật khẩu hay API rút tiền — đây là điều mình quan tâm nhất khi tìm dịch vụ cashback.', en:'The UID verification process was fast. I especially liked that no password or withdrawal API was required — that was my biggest concern when looking for a cashback service.' } },
  { id:'th-01', name:'P*** K.', email:'p***88@gmail.com', country:'Thailand', flag:'🇹🇭', exchange:'Bybit', exchangeType:'crypto', avatar:'P', rating:5, badges:['verifiedUid','cashbackRecorded'],
    text:{ vi:'Quy trình đơn giản và rõ ràng. Tôi chỉ cần xác minh UID mà không cần chia sẻ mật khẩu hoặc API rút tiền.', en:'The setup was simple and clear. I only had to verify my UID, without sharing any password or withdrawal API.', th:'การตั้งค่านั้นง่ายและชัดเจน ฉันแค่ต้องยืนยัน UID โดยไม่ต้องแชร์รหัสผ่านหรือ API ถอนเงิน' } },
  { id:'ko-01', name:'J*** Kim', email:'j***@naver.com', country:'South Korea', flag:'🇰🇷', exchange:'OKX', exchangeType:'crypto', avatar:'J', rating:5, badges:['verifiedUid','cashbackRecorded','privacyProtected'],
    text:{ vi:'Trải nghiệm tốt cho đến nay. Lịch sử cashback dễ theo dõi và việc ẩn danh thông tin giúp dashboard cảm thấy an toàn hơn.', en:'Good experience so far. The cashback record is easy to follow, and the privacy masking makes the dashboard feel safer.', ko:'UID 인증 과정이 간단했고, 비밀번호나 출금 API를 요구하지 않는 점이 마음에 들었습니다. 캐시백 내역도 파악하기 쉽습니다.' } },
  { id:'sg-01', name:'A*** Tan', email:'a***@outlook.com', country:'Singapore', flag:'🇸🇬', exchange:'Bitget', exchangeType:'crypto', avatar:'A', rating:5, badges:['verifiedUid','cashbackRecorded'],
    text:{ vi:'Giao diện sạch và theo dõi cashback minh bạch. Hữu ích cho các trader tích cực muốn tối ưu chi phí giao dịch.', en:'Clean interface and transparent cashback tracking. It feels useful for active traders who want better fee efficiency.' } },
  { id:'id-01', name:'R*** Putra', email:'r***trade@gmail.com', country:'Indonesia', flag:'🇮🇩', exchange:'MEXC', exchangeType:'crypto', avatar:'R', rating:4, badges:['verifiedUid','privacyProtected'],
    text:{ vi:'Bảng hoạt động cashback rõ ràng. Tôi muốn thấy báo cáo hàng tháng chi tiết hơn trong tương lai.', en:'The cashback activity panel is clear. I would like to see more detailed monthly reports in the future.', id:'Panel aktivitas cashback sudah jelas. Saya ingin melihat laporan bulanan yang lebih detail ke depannya.' } },
  { id:'ae-01', name:'M*** Al.', email:'m***@proton.me', country:'UAE', flag:'🇦🇪', exchange:'Exness', exchangeType:'forex', avatar:'M', rating:5, badges:['verifiedUid','cashbackRecorded'],
    text:{ vi:'Tôi thích rằng dịch vụ tập trung vào hoàn phí, không phải cam kết lợi nhuận đầu tư. Thông tin cảnh báo rủi ro cũng được trình bày rõ ràng.', en:'I like that the service focuses on fee rebates, not investment promises. The risk notice is also clearly presented.' } },
  { id:'jp-01', name:'T*** Sato', email:'t***@gmail.com', country:'Japan', flag:'🇯🇵', exchange:'IC Markets', exchangeType:'forex', avatar:'T', rating:4, badges:['verifiedUid','privacyProtected'],
    text:{ vi:'Quy trình đơn giản và thông tin tài khoản được ẩn một phần, giúp trang có cảm giác tập trung vào quyền riêng tư hơn.', en:'The process is simple, and the account information is partially hidden, which makes the page feel more privacy-focused.' } },
];

// ─── Badge component ──────────────────────────────────────────────
function Badge({ type, labels }: { type: string; labels: Record<string,string> }) {
  const cfg: Record<string,{bg:string;border:string;color:string}> = {
    verifiedUid:      { bg:'rgba(212,175,55,0.12)',border:'rgba(212,175,55,0.3)',color:'#D4AF37' },
    cashbackRecorded: { bg:'rgba(76,175,80,0.1)', border:'rgba(76,175,80,0.3)', color:'#4CAF50' },
    privacyProtected: { bg:'rgba(184,184,184,0.08)',border:'rgba(184,184,184,0.2)',color:'#888' },
  };
  const c = cfg[type] || cfg.privacyProtected;
  return (
    <span style={{ padding:'0.18rem 0.55rem',borderRadius:'999px',fontSize:'0.62rem',fontWeight:600,background:c.bg,border:`1px solid ${c.border}`,color:c.color,whiteSpace:'nowrap' }}>
      {labels[type] || type}
    </span>
  );
}

// ─── Card component ───────────────────────────────────────────────
function TestimonialCard({ item, lang, labels }: { item: TestimonialItem; lang: string; labels: Record<string,string> }) {
  const [hov, setHov] = useState(false);
  const text = (item.text as Record<string,string|undefined>)[lang] || item.text.en;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '320px', flexShrink: 0,
        background: 'rgba(13,13,13,0.9)', backdropFilter: 'blur(14px)',
        border: `1px solid ${hov ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.18)'}`,
        borderRadius: '1.25rem', padding: '1.5rem',
        display: 'flex', flexDirection: 'column', gap: '0.85rem',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? '0 12px 36px rgba(0,0,0,0.5),0 0 20px rgba(212,175,55,0.1)' : '0 4px 18px rgba(0,0,0,0.3)',
        transition: 'transform 0.25s ease,border-color 0.25s,box-shadow 0.25s',
        userSelect: 'none',
      }}
    >
      {/* Top */}
      <div style={{ display:'flex',gap:'0.7rem',alignItems:'flex-start' }}>
        <div style={{ width:'42px',height:'42px',borderRadius:'50%',background:'linear-gradient(135deg,#FFD700,#D4AF37)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem',fontWeight:900,color:'#050505',flexShrink:0 }}>
          {item.avatar}
        </div>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex',alignItems:'center',gap:'0.45rem',flexWrap:'wrap' }}>
            <p style={{ fontSize:'0.88rem',fontWeight:700,color:'#F8F5E9' }}>{item.name}</p>
            <span style={{ fontSize:'0.88rem' }}>{item.flag}</span>
          </div>
          <p style={{ fontSize:'0.67rem',color:'#555',marginTop:'0.08rem' }}>{item.email}</p>
          <div style={{ display:'flex',gap:'1px',marginTop:'0.3rem' }}>
            {Array.from({length:5}).map((_,i)=><span key={i} style={{fontSize:'0.75rem',color:i<item.rating?'#D4AF37':'#2a2a2a'}}>★</span>)}
          </div>
        </div>
      </div>

      {/* Review */}
      <p style={{ fontSize:'0.845rem',color:'#B8B8B8',lineHeight:1.7,fontStyle:'italic',flex:1 }}>
        &ldquo;{text}&rdquo;
      </p>

      {/* Footer */}
      <div>
        <div style={{ fontSize:'0.65rem',color:'#555',marginBottom:'0.5rem',paddingBottom:'0.5rem',borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          {labels.exchange || 'Exchange'}: <span style={{ color:'#888',fontWeight:600 }}>{item.exchange}</span>
        </div>
        <div style={{ display:'flex',gap:'0.35rem',flexWrap:'wrap' }}>
          {item.badges.map(b => <Badge key={b} type={b} labels={labels} />)}
        </div>
      </div>
    </div>
  );
}

// ─── Main Testimonials component ─────────────────────────────────
export default function Testimonials() {
  const { lang } = useLang();
  const ts = extraTranslations[lang as keyof typeof extraTranslations]?.testimonials ?? extraTranslations.vi.testimonials;
  const isMock = USE_MOCK_CASHBACK_DATA;

  // Marquee state
  const trackRef   = useRef<HTMLDivElement>(null);
  const posRef     = useRef(0);
  const animRef    = useRef<number>(0);
  const activeRef  = useRef(false);  // hover on section
  const pausedRef  = useRef(false);  // hover on individual card
  const SPEED      = 0.55; // px per frame

  useEffect(() => {
    const animate = () => {
      if (activeRef.current && !pausedRef.current && trackRef.current) {
        posRef.current += SPEED;
        const half = trackRef.current.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const badgeLabels = {
    verifiedUid:      ts.badges.verifiedUid,
    cashbackRecorded: ts.badges.cashbackRecorded,
    privacyProtected: ts.badges.privacyProtected,
    exchange:         ts.exchange,
  };

  const cards = [...TESTIMONIALS, ...TESTIMONIALS]; // duplicate for infinite loop

  return (
    <section style={{ padding: '6rem 0 5rem', background: 'transparent', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', marginBottom: '2.5rem', textAlign: 'center' }}>
        <p style={{ fontSize:'0.8rem',fontWeight:700,color:'#D4AF37',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.6rem' }}>{ts.badge}</p>
        <h2 style={{ fontSize:'clamp(1.6rem,3vw,2.25rem)',fontWeight:900,color:'#F8F5E9',marginBottom:'0.75rem' }}>{ts.title}</h2>
        <p style={{ fontSize:'0.85rem',color:'#666',lineHeight:1.7,fontStyle:'italic',maxWidth:'620px',margin:'0 auto' }}>{ts.subtitle}</p>
      </div>

      {/* Carousel area */}
      <div
        style={{ position:'relative', overflow:'hidden', cursor:'default' }}
        onMouseEnter={() => { activeRef.current = true; }}
        onMouseLeave={() => { activeRef.current = false; }}
      >
        {/* Fade masks */}
        <div style={{ position:'absolute',top:0,left:0,bottom:0,width:'80px',background:'linear-gradient(to right,rgba(5,5,5,0.9),transparent)',zIndex:2,pointerEvents:'none' }} />
        <div style={{ position:'absolute',top:0,right:0,bottom:0,width:'80px',background:'linear-gradient(to left,rgba(5,5,5,0.9),transparent)',zIndex:2,pointerEvents:'none' }} />

        {/* Track */}
        <div
          ref={trackRef}
          style={{ display:'flex',gap:'1.1rem',padding:'1.5rem 1.5rem',willChange:'transform' }}
        >
          {cards.map((item, idx) => (
            <div key={`${item.id}-${idx}`}
              onMouseEnter={() => { pausedRef.current = true; }}
              onMouseLeave={() => { pausedRef.current = false; }}>
              <TestimonialCard item={item} lang={lang} labels={badgeLabels} />
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div style={{ maxWidth:'1100px',margin:'1.5rem auto 0',padding:'0 1.5rem',textAlign:'center',display:'flex',flexDirection:'column',gap:'0.4rem',alignItems:'center' }}>
        <p style={{ fontSize:'0.7rem',color:'#444',fontStyle:'italic' }}>{ts.privacyNote}</p>
        {isMock && <p style={{ fontSize:'0.68rem',color:'#3a3a3a',fontStyle:'italic' }}>{ts.mockLabel}</p>}
        <p style={{ fontSize:'0.68rem',color:'#383838',maxWidth:'560px',lineHeight:1.6 }}>{ts.fullNote}</p>
      </div>
    </section>
  );
}
