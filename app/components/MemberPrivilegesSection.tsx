'use client';
import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { memberPrivilegesTranslations } from '../translations';

export default function MemberPrivilegesSection() {
  const { lang } = useLang();
  const p = memberPrivilegesTranslations[lang as keyof typeof memberPrivilegesTranslations]
    ?? memberPrivilegesTranslations.vi;

  const mainCards = [p.m1, p.m2, p.m3];
  const accentColors = [
    { border: 'rgba(212,175,55,', glow: 'rgba(212,175,55,', icon: 'rgba(212,175,55,' },
    { border: 'rgba(99,179,237,',  glow: 'rgba(99,179,237,',  icon: 'rgba(99,179,237,'  },
    { border: 'rgba(167,139,250,', glow: 'rgba(167,139,250,', icon: 'rgba(167,139,250,' },
  ];

  return (
    <section id="member-privileges" style={{ position: 'relative', padding: '8rem 1.5rem', overflow: 'hidden' }}>

      {/* ── Background ─────────────────────────────── */}
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none',
        background:`
          radial-gradient(ellipse 80% 60% at 50% 45%, rgba(212,175,55,0.085) 0%, transparent 65%),
          radial-gradient(ellipse 50% 40% at 8%  55%, rgba(212,175,55,0.055) 0%, transparent 55%),
          radial-gradient(ellipse 50% 40% at 92% 55%, rgba(212,175,55,0.05)  0%, transparent 55%)
        `,
      }} />
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(212,175,55,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.05) 1px,transparent 1px)',
        backgroundSize:'58px 58px',
        maskImage:'radial-gradient(ellipse 95% 80% at 50% 50%, black 20%, transparent 75%)',
        WebkitMaskImage:'radial-gradient(ellipse 95% 80% at 50% 50%, black 20%, transparent 75%)',
      }} />
      {/* Accent lines top/bottom */}
      {[0,1].map(i=>(
        <div key={i} style={{ position:'absolute',[i===0?'top':'bottom']:0,
          left:'8%',right:'8%',height:'1px', zIndex:1,
          background:`linear-gradient(90deg,transparent,rgba(212,175,55,${i===0?0.5:0.3}) 30%,rgba(212,175,55,${i===0?0.75:0.5}) 50%,rgba(212,175,55,${i===0?0.5:0.3}) 70%,transparent)`,
        }} />
      ))}

      <div style={{ maxWidth:'1180px', margin:'0 auto', position:'relative', zIndex:2 }}>

        {/* ── HEADER ───────────────────────────────── */}
        <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:'0.5rem',
            padding:'0.38rem 1rem', borderRadius:'999px', marginBottom:'1.2rem',
            background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.42)',
            fontSize:'0.73rem', fontWeight:700, color:'#D4AF37', letterSpacing:'0.12em', textTransform:'uppercase',
          }}>
            {p.badge}
          </div>
          <h2 style={{
            fontSize:'clamp(2.1rem,4.5vw,3.5rem)', fontWeight:900,
            lineHeight:1.1, letterSpacing:'-0.02em', color:'#F8F5E9', marginBottom:'1.1rem',
          }}>
            {p.title.split('DA Cashback')[0]}
            <span style={{ background:'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              DA Cashback
            </span>
            {p.title.split('DA Cashback')[1] || ''}
          </h2>
          <p style={{ color:'#999', maxWidth:'620px', margin:'0 auto', lineHeight:1.78, fontSize:'0.975rem' }}>
            {p.subtitle}
          </p>
        </div>

        {/* ── 3 MAIN CARDS (flagship) ───────────────── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem', marginBottom:'2.75rem' }}
          className="mp-main-grid">
          {mainCards.map((card, idx) => (
            <MainCard key={idx} card={card} colors={accentColors[idx]} />
          ))}
        </div>

        {/* ── SECONDARY BENEFITS (pills) ───────────── */}
        <div style={{ marginBottom:'2.5rem' }}>
          <p style={{
            textAlign:'center', fontSize:'0.8rem', fontWeight:700,
            color:'#666', letterSpacing:'0.08em', textTransform:'uppercase',
            marginBottom:'1rem',
          }}>
            {p.secondaryTitle}
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.6rem', justifyContent:'center' }}>
            {p.benefits.map((b,i) => (
              <span key={i} style={{
                padding:'0.38rem 0.9rem', borderRadius:'999px',
                background:'rgba(212,175,55,0.07)', border:'1px solid rgba(212,175,55,0.2)',
                fontSize:'0.8rem', fontWeight:500, color:'#B0B0B0',
                letterSpacing:'0.01em',
                transition:'border-color 0.2s, color 0.2s, background 0.2s',
                cursor:'default',
              }}
              onMouseEnter={e=>{const el=e.currentTarget;el.style.borderColor='rgba(212,175,55,0.5)';el.style.color='#D4AF37';el.style.background='rgba(212,175,55,0.12)';}}
              onMouseLeave={e=>{const el=e.currentTarget;el.style.borderColor='rgba(212,175,55,0.2)';el.style.color='#B0B0B0';el.style.background='rgba(212,175,55,0.07)';}}>
                ✦ {b}
              </span>
            ))}
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────── */}
        <div style={{ textAlign:'center' }}>
          <a
            href="https://t.me/jacksondz"
            target="_blank" rel="noopener noreferrer"
            style={{
              display:'inline-flex', alignItems:'center', gap:'0.65rem',
              padding:'1rem 2.75rem', fontWeight:800, fontSize:'1.05rem',
              background:'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
              color:'#050505', borderRadius:'0.875rem', textDecoration:'none',
              boxShadow:'0 6px 32px rgba(212,175,55,0.45)',
              transition:'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
              letterSpacing:'0.01em', marginBottom:'0.875rem',
            }}
            onMouseEnter={e=>{const el=e.currentTarget;el.style.opacity='0.9';el.style.transform='translateY(-2px)';el.style.boxShadow='0 10px 40px rgba(212,175,55,0.55)';}}
            onMouseLeave={e=>{const el=e.currentTarget;el.style.opacity='1';el.style.transform='none';el.style.boxShadow='0 6px 32px rgba(212,175,55,0.45)';}}
          >
            <span style={{ fontSize:'1.1rem' }}>⚡</span>
            {p.ctaText}
            <span>→</span>
          </a>
          <br />
          <span style={{ fontSize:'0.72rem', color:'#555', fontStyle:'italic' }}>
            ⚠️ {p.disclaimer}
          </span>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .mp-main-grid{ grid-template-columns:1fr !important; }}
        @media(min-width:560px) and (max-width:900px){ .mp-main-grid{ grid-template-columns:1fr 1fr !important; }}
      `}</style>
    </section>
  );
}

// ── Main card sub-component ───────────────────────────────────────
interface CardColors { border: string; glow: string; icon: string; }
interface CardData { icon:string; title:string; sub:string; desc:string; }

function MainCard({ card, colors }: { card: CardData; colors: CardColors }) {
  const [hov, setHov] = useState(false);
  const c = colors;
  return (
    <div
      style={{
        background:'rgba(8,7,4,0.85)',
        border:`1.5px solid ${hov ? `${c.border}0.65)` : `${c.border}0.28)`}`,
        borderRadius:'1.5rem', padding:'2.1rem',
        display:'flex', flexDirection:'column', gap:'1.2rem',
        backdropFilter:'blur(16px)',
        transform: hov ? 'translateY(-8px)' : 'none',
        boxShadow: hov
          ? `0 20px 56px ${c.glow}0.2), 0 0 0 1px ${c.glow}0.1)`
          : `0 4px 20px rgba(0,0,0,0.3)`,
        transition:'transform 0.3s ease, border-color 0.3s, box-shadow 0.3s',
        cursor:'default',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Icon */}
      <div style={{
        width:'66px', height:'66px', borderRadius:'1.2rem',
        background:`linear-gradient(135deg,${c.icon}0.2),${c.icon}0.07))`,
        border:`1.5px solid ${c.icon}0.45)`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'1.85rem',
        boxShadow: hov ? `0 0 28px ${c.glow}0.35)` : `0 0 14px ${c.glow}0.14)`,
        transition:'box-shadow 0.3s',
      }}>
        {card.icon}
      </div>

      {/* Titles */}
      <div>
        <h3 style={{ fontSize:'1.12rem', fontWeight:800, color:'#F8F5E9', marginBottom:'0.3rem', lineHeight:1.25 }}>
          {card.title}
        </h3>
        <p style={{
          fontSize:'0.78rem', fontWeight:700,
          color: hov ? '#D4AF37' : '#999',
          letterSpacing:'0.04em', transition:'color 0.3s',
        }}>
          {card.sub}
        </p>
      </div>

      {/* Description */}
      <p style={{ fontSize:'0.9rem', color:'#B0B0B0', lineHeight:1.7, flexGrow:1 }}>
        {card.desc}
      </p>
    </div>
  );
}
