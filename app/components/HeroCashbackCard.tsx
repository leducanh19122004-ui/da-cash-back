'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { extraTranslations } from '../translations';
import {
  USE_MOCK_CASHBACK_DATA, CashbackTransaction,
  loadOrInitStats, saveStats, getInitialTransactions,
  generateMockCashbackEvent, getRandomDelay, formatRelativeTime, formatCurrency,
} from '../lib/cashback';

function AnimatedCounter({ target, duration=900, flash=false }: { target:number; duration?:number; flash?:boolean }) {
  const [disp, setDisp] = useState(target);
  const [flashing, setFlashing] = useState(false);
  const prev = useRef(target);
  const fr   = useRef<number>(0);
  useEffect(() => {
    const start=prev.current; const diff=target-start;
    if (Math.abs(diff)<0.005){setDisp(target);return;}
    const t0=performance.now();
    const tick=(now:number)=>{
      const t=Math.min((now-t0)/duration,1);
      const e=1-Math.pow(1-t,3);
      setDisp(parseFloat((start+diff*e).toFixed(2)));
      if(t<1){fr.current=requestAnimationFrame(tick);}
      else{setDisp(target);prev.current=target;}
    };
    fr.current=requestAnimationFrame(tick);
    if(flash){setFlashing(true);setTimeout(()=>setFlashing(false),900);}
    return()=>cancelAnimationFrame(fr.current);
  },[target,duration,flash]);
  return (
    <span style={{ display:'inline-block', transition:'color 0.4s', animation:flashing?'num-flash 0.9s ease forwards':'none' }}>
      ${disp.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}
    </span>
  );
}

function TxRow({ tx, isNew, lang }: { tx:CashbackTransaction; isNew:boolean; lang:string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{const t=setTimeout(()=>setMounted(true),30);return()=>clearTimeout(t);},[]);
  const isCrypto = tx.type==='crypto';
  return (
    <div style={{
      display:'flex', justifyContent:'space-between', alignItems:'center',
      padding:'0.48rem 0', borderBottom:'1px solid rgba(255,255,255,0.042)',
      opacity:mounted?1:0, transform:mounted?'none':'translateY(-8px)',
      transition:'opacity 0.32s ease,transform 0.32s ease',
      background:isNew&&mounted?'rgba(212,175,55,0.04)':'transparent',
    }}>
      <div style={{display:'flex',alignItems:'center',gap:'0.5rem',minWidth:0}}>
        <div style={{
          width:'27px',height:'27px',borderRadius:'50%',flexShrink:0,
          background:isCrypto?'rgba(99,179,237,0.12)':'rgba(72,199,142,0.12)',
          border:`1px solid ${isCrypto?'rgba(99,179,237,0.25)':'rgba(72,199,142,0.25)'}`,
          display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:'0.57rem',fontWeight:800,
          color:isCrypto?'#63B3ED':'#48C78E',
        }}>{tx.exchange.slice(0,2).toUpperCase()}</div>
        <div style={{minWidth:0}}>
          <p style={{fontSize:'0.76rem',fontWeight:700,color:'#F8F5E9',lineHeight:1}}>{tx.exchange}</p>
          <p style={{fontSize:'0.62rem',color:'#555',marginTop:'0.12rem',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'105px'}}>{tx.maskedAccount}</p>
        </div>
      </div>
      <div style={{textAlign:'right',flexShrink:0,marginLeft:'0.45rem'}}>
        <p style={{fontSize:'0.8rem',fontWeight:700,color:'#4CAF50',whiteSpace:'nowrap'}}>+{formatCurrency(tx.amount)}</p>
        <p style={{fontSize:'0.6rem',color:'#555',marginTop:'0.1rem'}}>{formatRelativeTime(tx.timestampMs, lang as 'vi')}</p>
      </div>
    </div>
  );
}

export default function HeroCashbackCard() {
  const { lang } = useLang();
  const hc = extraTranslations[lang as keyof typeof extraTranslations]?.heroCard ?? extraTranslations.vi.heroCard;
  const [stats,setStats]     = useState(()=>loadOrInitStats());
  const [txList,setTxList]   = useState<CashbackTransaction[]>(()=>getInitialTransactions(5));
  const [newTxId,setNewTxId] = useState<string|null>(null);
  const [flashTot,setFlashTot] = useState(false);
  const [,setTick]            = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
  const cardRef  = useRef<HTMLDivElement>(null);
  const [tilt,setTilt]       = useState({x:0,y:0});
  const [hovered,setHovered] = useState(false);
  const [mounted,setMounted] = useState(false);

  useEffect(()=>{const t=setTimeout(()=>setMounted(true),80);return()=>clearTimeout(t);},[]);
  useEffect(()=>{const iv=setInterval(()=>setTick(t=>t+1),25_000);return()=>clearInterval(iv);},[]);

  const scheduleNext = useCallback(()=>{
    timerRef.current=setTimeout(()=>{
      const ev=generateMockCashbackEvent();
      setTxList(p=>[ev,...p].slice(0,6));
      setNewTxId(ev.id); setTimeout(()=>setNewTxId(null),2500);
      setStats(p=>{
        const n={...p,totalCashback:p.totalCashback+ev.amount,monthCashback:p.monthCashback+ev.amount};
        saveStats(n); return n;
      });
      setFlashTot(true); setTimeout(()=>setFlashTot(false),1000);
      scheduleNext();
    }, getRandomDelay());
  },[]);

  useEffect(()=>{
    const init=setTimeout(()=>scheduleNext(),4500);
    return()=>{clearTimeout(init);clearTimeout(timerRef.current);};
  },[scheduleNext]);

  const onMove=(e:React.MouseEvent<HTMLDivElement>)=>{
    if(!cardRef.current)return;
    const r=cardRef.current.getBoundingClientRect();
    const dx=(e.clientX-(r.left+r.width/2))/(r.width/2);
    const dy=(e.clientY-(r.top+r.height/2))/(r.height/2);
    setTilt({x:dy*-2.5,y:dx*2.5});
  };

  return (
    <div style={{position:'relative',display:'flex',justifyContent:'center'}} className="hero-dashboard">
      {/* Glow */}
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
        width:'400px',height:'400px',background:'radial-gradient(circle,rgba(212,175,55,0.14) 0%,transparent 70%)',
        borderRadius:'50%',animation:'glow-pulse 4.5s ease-in-out infinite',pointerEvents:'none',zIndex:0}} />

      <div ref={cardRef} onMouseMove={onMove}
        onMouseLeave={()=>{setTilt({x:0,y:0});setHovered(false);}}
        onMouseEnter={()=>setHovered(true)}
        style={{
          position:'relative',zIndex:1,width:'100%',maxWidth:'375px',
          background:'rgba(8,7,5,0.88)',backdropFilter:'blur(22px)',
          border:`1px solid ${hovered?'rgba(212,175,55,0.55)':'rgba(212,175,55,0.28)'}`,
          borderRadius:'1.5rem',padding:'1.5rem',
          boxShadow:hovered?'0 22px 62px rgba(0,0,0,0.65),0 0 42px rgba(212,175,55,0.12)':'0 14px 44px rgba(0,0,0,0.52),0 0 22px rgba(212,175,55,0.07)',
          transform:`${mounted?'translateY(0) scale(1)':'translateY(18px) scale(0.965)'} perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          opacity:mounted?1:0,
          transition:'opacity 0.6s ease,border-color 0.28s,box-shadow 0.28s,transform 0.4s cubic-bezier(0.23,1,0.32,1)',
          animation:mounted?'float 6s ease-in-out infinite':'none',willChange:'transform',
        }}>

        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'1rem'}}>
          <div>
            <p style={{fontSize:'0.68rem',fontWeight:700,color:'#B8B8B8',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'0.18rem'}}>{hc.title}</p>
            <div style={{display:'flex',alignItems:'center',gap:'0.38rem'}}>
              <span className="live-dot-anim" style={{width:'7px',height:'7px',borderRadius:'50%',background:'#4ade80',flexShrink:0,display:'inline-block'}} />
              <span style={{fontSize:'0.65rem',color:'#4ade80',fontWeight:600}}>{hc.liveActivity}</span>
            </div>
          </div>
          <div style={{padding:'0.28rem 0.65rem',borderRadius:'999px',background:'rgba(212,175,55,0.12)',border:'1px solid rgba(212,175,55,0.35)',fontSize:'0.62rem',fontWeight:700,color:'#D4AF37',whiteSpace:'nowrap'}}>
            {hc.verifiedUid}
          </div>
        </div>

        {/* Total */}
        <div style={{marginBottom:'0.85rem',paddingBottom:'0.85rem',borderBottom:'1px solid rgba(255,255,255,0.055)'}}>
          <p style={{fontSize:'0.64rem',color:'#666',marginBottom:'0.28rem',fontWeight:500}}>{hc.totalLabel}</p>
          <p style={{fontSize:'1.8rem',fontWeight:900,lineHeight:1,background:'linear-gradient(135deg,#FFD700,#D4AF37)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
            <AnimatedCounter target={stats.totalCashback} duration={900} flash={flashTot} />
          </p>
        </div>

        {/* Secondary stats */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.55rem',marginBottom:'0.9rem'}}>
          <div style={{background:'rgba(255,255,255,0.022)',borderRadius:'0.65rem',padding:'0.65rem 0.75rem',border:'1px solid rgba(212,175,55,0.09)'}}>
            <p style={{fontSize:'0.58rem',color:'#666',marginBottom:'0.18rem',fontWeight:500}}>{hc.monthLabel}</p>
            <p style={{fontSize:'0.95rem',fontWeight:800,color:'#D4AF37'}}>${stats.monthCashback.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
          </div>
          <div style={{background:'rgba(255,255,255,0.022)',borderRadius:'0.65rem',padding:'0.65rem 0.75rem',border:'1px solid rgba(212,175,55,0.09)'}}>
            <p style={{fontSize:'0.58rem',color:'#666',marginBottom:'0.18rem',fontWeight:500}}>{hc.exchangesLabel}</p>
            <p style={{fontSize:'0.95rem',fontWeight:800,color:'#F8F5E9'}}>13</p>
          </div>
        </div>

        {/* Recent list */}
        <div>
          <p style={{fontSize:'0.62rem',color:'#555',fontWeight:600,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:'0.5rem'}}>{hc.recentLabel}</p>
          {txList.slice(0,5).map(tx=><TxRow key={tx.id} tx={tx} isNew={tx.id===newTxId} lang={lang} />)}
        </div>

        {/* Footer */}
        <div style={{marginTop:'0.8rem',paddingTop:'0.65rem',borderTop:'1px solid rgba(255,255,255,0.038)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'0.4rem'}}>
          <p style={{fontSize:'0.58rem',color:'#3d3d3d',lineHeight:1.45}}>{hc.privacyNote}</p>
          <span style={{fontSize:'0.56rem',color:'#2e2e2e',whiteSpace:'nowrap',padding:'0.12rem 0.38rem',borderRadius:'4px',border:'1px solid rgba(255,255,255,0.055)'}}>{hc.periodicUpdate}</span>
        </div>
      </div>
    </div>
  );
}
