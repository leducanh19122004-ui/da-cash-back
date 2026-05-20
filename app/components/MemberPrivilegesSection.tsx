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
    'rgba(212,175,55,',   // gold — Telegram
    'rgba(99,179,237,',   // blue — KOL
    'rgba(167,139,250,',  // purple — DA Network
  ];

  return (
    <section id="member-privileges" style={{ position:'relative', padding:'8rem 1.5rem', overflow:'hidden' }}>

      {/* ── Background ─────────────────────────────────── */}
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none',
        background:`
          radial-gradient(ellipse 85% 65% at 50% 45%, rgba(212,175,55,0.09) 0%, transparent 65%),
          radial-gradient(ellipse 50% 40% at 5%  55%, rgba(212,175,55,0.06) 0%, transparent 55%),
          radial-gradient(ellipse 50% 40% at 95% 55%, rgba(212,175,55,0.05) 0%, transparent 55%)
        `,
      }} />
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(212,175,55,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.05) 1px,transparent 1px)',
        backgroundSize:'58px 58px',
        maskImage:'radial-gradient(ellipse 95% 80% at 50% 50%, black 20%, transparent 75%)',
        WebkitMaskImage:'radial-gradient(ellipse 95% 80% at 50% 50%, black 20%, transparent 75%)',
      }} />
      {[0,1].map(i=>(
        <div key={i} style={{ position:'absolute',[i===0?'top':'bottom']:0,
          left:'8%',right:'8%',height:'1px',zIndex:1,
          background:`linear-gradient(90deg,transparent,rgba(212,175,55,${i===0?0.55:0.32}) 30%,rgba(212,175,55,${i===0?0.75:0.52}) 50%,rgba(212,175,55,${i===0?0.55:0.32}) 70%,transparent)`,
        }} />
      ))}

      <div style={{ maxWidth:'1180px', margin:'0 auto', position:'relative', zIndex:2 }}>

        {/* ── HEADER ───────────────────────────────────── */}
        <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:'0.5rem',
            padding:'0.38rem 1rem', borderRadius:'999px', marginBottom:'1.2rem',
            background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.42)',
            fontSize:'0.73rem', fontWeight:700, color:'#D4AF37', letterSpacing:'0.12em', textTransform:'uppercase',
          }}>
            {p.badge}
          </div>
          <h2 style={{ fontSize:'clamp(2.1rem,4.5vw,3.5rem)', fontWeight:900,
            lineHeight:1.1, letterSpacing:'-0.02em', color:'#F8F5E9', marginBottom:'1.1rem' }}>
            {p.title.includes('DA Cashback') ? (
              <>
                {p.title.split('DA Cashback')[0]}
                <span style={{ background:'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  DA Cashback
                </span>
                {p.title.split('DA Cashback')[1] || ''}
              </>
            ) : p.title}
          </h2>
          <p style={{ color:'#999', maxWidth:'620px', margin:'0 auto', lineHeight:1.78, fontSize:'0.975rem' }}>
            {p.subtitle}
          </p>
        </div>

        {/* ── 3 MAIN CARDS (flagship, full row) ──────── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem', marginBottom:'1.5rem' }}
          className="mp-main-grid">
          {mainCards.map((card, idx) => (
            <MainCard key={idx} card={card} ac={accentColors[idx]} />
          ))}
        </div>

        {/* ── 1 SECONDARY CARD (full width, compact) ─── */}
        <CoreBenefitsCard
          title={p.secondaryCardTitle ?? p.secondaryTitle}
          benefits={p.benefits}
        />

        {/* ── CTA ──────────────────────────────────────── */}
        <div style={{ textAlign:'center', marginTop:'2.5rem' }}>
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
        @media(max-width:560px){ .core-bullets{ grid-template-columns:1fr !important; }}
      `}</style>
    </section>
  );
}

// ── Main privilege card ────────────────────────────────────────────
interface CardData { icon:string; title:string; sub:string; desc:string; }
function MainCard({ card, ac }: { card:CardData; ac:string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        background:'rgba(7,6,3,0.88)',
        border:`1.5px solid ${hov?`${ac}0.7)`:`${ac}0.3)`}`,
        borderRadius:'1.5rem', padding:'2.1rem',
        display:'flex', flexDirection:'column', gap:'1.25rem',
        backdropFilter:'blur(18px)',
        transform: hov ? 'translateY(-9px)' : 'none',
        boxShadow: hov
          ? `0 22px 60px ${ac}0.24), 0 0 0 1px ${ac}0.12), inset 0 1px 0 ${ac}0.08)`
          : `0 4px 24px rgba(0,0,0,0.35)`,
        transition:'transform 0.3s ease, border-color 0.3s, box-shadow 0.3s',
        cursor:'default',
      }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
    >
      {/* Icon glow */}
      <div style={{
        width:'68px', height:'68px', borderRadius:'1.2rem',
        background:`linear-gradient(135deg,${ac}0.22),${ac}0.08))`,
        border:`1.5px solid ${ac}0.5)`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'1.9rem',
        boxShadow: hov ? `0 0 32px ${ac}0.45)` : `0 0 16px ${ac}0.18)`,
        transition:'box-shadow 0.3s',
      }}>
        {card.icon}
      </div>
      <div>
        <h3 style={{ fontSize:'1.12rem', fontWeight:800, color:'#F8F5E9', marginBottom:'0.32rem', lineHeight:1.25 }}>
          {card.title}
        </h3>
        <p style={{ fontSize:'0.78rem', fontWeight:700,
          color: hov ? '#D4AF37' : '#888',
          letterSpacing:'0.04em', transition:'color 0.3s' }}>
          {card.sub}
        </p>
      </div>
      <p style={{ fontSize:'0.9rem', color:'#B0B0B0', lineHeight:1.72, flexGrow:1 }}>
        {card.desc}
      </p>
    </div>
  );
}

// ── Core cashback benefits card (secondary, full-width) ────────────
function CoreBenefitsCard({ title, benefits }: { title:string; benefits:string[] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        background:'rgba(7,6,3,0.75)',
        border:`1px solid ${hov?'rgba(212,175,55,0.32)':'rgba(212,175,55,0.15)'}`,
        borderRadius:'1.25rem', padding:'1.75rem 2rem',
        backdropFilter:'blur(12px)',
        boxShadow: hov ? '0 8px 32px rgba(212,175,55,0.1)' : 'none',
        transition:'border-color 0.3s, box-shadow 0.3s',
        cursor:'default',
      }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
    >
      {/* Card header */}
      <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1.25rem' }}>
        <div style={{
          width:'36px', height:'36px', borderRadius:'0.65rem',
          background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.3)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'1rem',
        }}>
          🔑
        </div>
        <h3 style={{ fontSize:'0.95rem', fontWeight:700, color:'#D4AF37', letterSpacing:'0.02em' }}>
          {title}
        </h3>
      </div>

      {/* 2-column bullet grid */}
      <div
        className="core-bullets"
        style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.55rem 2rem' }}
      >
        {benefits.map((b,i) => (
          <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'0.5rem' }}>
            <span style={{ color:'rgba(212,175,55,0.7)', fontSize:'0.75rem', flexShrink:0, marginTop:'0.2rem', fontWeight:700 }}>✓</span>
            <span style={{ fontSize:'0.855rem', color:'#999', lineHeight:1.55 }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
