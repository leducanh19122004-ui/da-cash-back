'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { extraTranslations } from '../translations';
import {
  CashbackStats, CashbackTransaction,
  DEFAULT_STATS, loadOrInitStats, saveStats, getInitialTransactions, generateMockCashbackEvent,
  getRandomDelay, formatRelativeTime, formatCurrency,
} from '../lib/cashback';

function useAnimatedNum(target:number,duration=800){
  const [disp,setDisp]=useState(target);
  const prev=useRef(target);const fr=useRef<number>(0);
  useEffect(()=>{
    const s=prev.current,d=target-s;
    if(Math.abs(d)<0.01){setDisp(target);return;}
    const t0=performance.now();
    const tick=(now:number)=>{const t=Math.min((now-t0)/duration,1),e=1-Math.pow(1-t,3);setDisp(parseFloat((s+d*e).toFixed(2)));if(t<1)fr.current=requestAnimationFrame(tick);else{setDisp(target);prev.current=target;}};
    fr.current=requestAnimationFrame(tick);return()=>cancelAnimationFrame(fr.current);
  },[target,duration]);
  return disp;
}

function StatCard({label,value,format,updated}:{label:string;value:number;format:'usdt'|'int';updated:boolean}){
  const a=useAnimatedNum(value,900);
  const disp=format==='usdt'?`${a.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})} USDT`:Math.round(a).toLocaleString('en-US');
  return(
    <div style={{background:'#000',border:`1px solid ${updated?'rgba(212,175,55,0.6)':'rgba(212,175,55,0.28)'}`,borderRadius:'1rem',padding:'1.1rem 1.4rem',transition:'border-color 0.5s,box-shadow 0.5s',boxShadow:updated?'0 0 22px rgba(212,175,55,0.22)':'none'}}>
      <p style={{fontSize:'0.68rem',color:'#888',marginBottom:'0.35rem',fontWeight:500,letterSpacing:'0.04em',textTransform:'uppercase'}}>{label}</p>
      <p style={{fontSize:'clamp(1.1rem,2.5vw,1.5rem)',fontWeight:900,fontVariantNumeric:'tabular-nums',background:'linear-gradient(135deg,#FFE566,#FFD700,#D4AF37,#B8860B)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{disp}</p>
    </div>
  );
}

function TxRow({tx,isNew,lang}:{tx:CashbackTransaction;isNew:boolean;lang:string}){
  const [vis,setVis]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setVis(true),30);return()=>clearTimeout(t);},[]);
  const ic=tx.type==='crypto';
  return(
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.62rem 0',borderBottom:'1px solid rgba(255,255,255,0.05)',opacity:vis?1:0,transform:vis?'none':'translateY(-8px)',transition:'opacity 0.32s ease,transform 0.32s ease',background:isNew&&vis?'rgba(212,175,55,0.04)':'transparent'}}>
      <div style={{display:'flex',alignItems:'center',gap:'0.58rem',minWidth:0}}>
        <div style={{width:'30px',height:'30px',borderRadius:'50%',flexShrink:0,background:ic?'rgba(99,179,237,0.12)':'rgba(72,199,142,0.12)',border:`1px solid ${ic?'rgba(99,179,237,0.3)':'rgba(72,199,142,0.3)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.63rem',fontWeight:800,color:ic?'#63B3ED':'#48C78E'}}>{tx.exchange.slice(0,2).toUpperCase()}</div>
        <div style={{minWidth:0}}>
          <div style={{display:'flex',alignItems:'center',gap:'0.38rem',flexWrap:'wrap'}}>
            <span style={{fontSize:'0.8rem',fontWeight:700,color:'#F8F5E9',whiteSpace:'nowrap'}}>{tx.exchange}</span>
            <span style={{fontSize:'0.63rem',padding:'0.14rem 0.42rem',borderRadius:'999px',background:ic?'rgba(99,179,237,0.1)':'rgba(72,199,142,0.1)',color:ic?'#63B3ED':'#48C78E'}}>{ic?'Crypto':'Forex'}</span>
          </div>
          <p style={{fontSize:'0.68rem',color:'#666',marginTop:'0.1rem',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{tx.maskedAccount}</p>
        </div>
      </div>
      <div style={{textAlign:'right',flexShrink:0,marginLeft:'0.7rem'}}>
        <p style={{fontSize:'0.86rem',fontWeight:700,color:'#4CAF50',whiteSpace:'nowrap'}}>+{formatCurrency(tx.amount)}</p>
        <p style={{fontSize:'0.66rem',color:'#555',marginTop:'0.1rem'}}>{formatRelativeTime(tx.timestampMs,lang as 'vi')}</p>
      </div>
    </div>
  );
}

export default function CashbackActivity(){
  const { lang } = useLang();
  const ac = extraTranslations[lang as keyof typeof extraTranslations]?.activity ?? extraTranslations.vi.activity;
  const [stats,setStats]=useState<CashbackStats>({...DEFAULT_STATS});
  const [txList,setTxList]=useState<CashbackTransaction[]>([]);
  const [newTxId,setNewTxId]=useState<string|null>(null);
  const [upd,setUpd]=useState<keyof CashbackStats|null>(null);
  const [,setTick]=useState(0);
  const timerRef=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
  useEffect(()=>{setStats(loadOrInitStats());setTxList(getInitialTransactions(7));},[]);
  useEffect(()=>{const iv=setInterval(()=>setTick(t=>t+1),30_000);return()=>clearInterval(iv);},[]);
  const scheduleNext=useCallback(()=>{
    timerRef.current=setTimeout(()=>{
      const ev=generateMockCashbackEvent();
      setTxList(p=>[ev,...p].slice(0,8));
      setNewTxId(ev.id);setTimeout(()=>setNewTxId(null),2000);
      const key=Math.random()<0.7?(Math.random()<0.5?'totalCashback':'monthCashback'):'verifiedAccounts';
      setStats(p=>{const n={...p};if(key==='verifiedAccounts'){if(Math.random()<0.15)n.verifiedAccounts+=1;}else{n.totalCashback+=ev.amount;n.monthCashback+=ev.amount*(Math.random()>0.2?1:0);}saveStats(n);return n;});
      setUpd(key as keyof CashbackStats);setTimeout(()=>setUpd(null),1500);
      scheduleNext();
    },getRandomDelay());
  },[]);
  useEffect(()=>{const init=setTimeout(()=>scheduleNext(),4000);return()=>{clearTimeout(init);clearTimeout(timerRef.current);};},[scheduleNext]);

  return(
    <section id="cashback-activity" style={{padding:'6rem 1.5rem',background:'rgba(5,5,5,0)'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'2.5rem'}}>
          <p style={{fontSize:'0.8rem',fontWeight:700,color:'#D4AF37',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.6rem'}}>{ac.sectionBadge}</p>
          <h2 style={{fontSize:'clamp(1.6rem,3vw,2.25rem)',fontWeight:900,color:'#F8F5E9',marginBottom:'0.75rem'}}>{ac.sectionTitle}</h2>
          <div style={{display:'inline-flex',alignItems:'center',gap:'0.4rem',padding:'0.28rem 0.85rem',borderRadius:'999px',background:'rgba(212,175,55,0.06)',border:'1px solid rgba(212,175,55,0.18)',fontSize:'0.7rem',color:'#666'}}>
            🔒 {ac.privacyNote}
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem',marginBottom:'2rem'}} className="activity-stats-grid">
          <StatCard label={ac.totalLabel} value={stats.totalCashback} format="usdt" updated={upd==='totalCashback'} />
          <StatCard label={ac.monthLabel}  value={stats.monthCashback}  format="usdt" updated={upd==='monthCashback'} />
          <StatCard label={ac.verifiedLabel} value={stats.verifiedAccounts} format="int" updated={upd==='verifiedAccounts'} />
        </div>
        <div style={{background:'rgba(8,7,5,0.75)',backdropFilter:'blur(12px)',border:'1px solid rgba(212,175,55,0.2)',borderRadius:'1.25rem',padding:'1.5rem 1.75rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
            <div style={{display:'flex',alignItems:'center',gap:'0.45rem'}}>
              <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#4CAF50',display:'inline-block',boxShadow:'0 0 5px rgba(76,175,80,0.55)'}}/>
              <p style={{fontSize:'0.83rem',fontWeight:700,color:'#F8F5E9'}}>{ac.liveFeedTitle}</p>
            </div>
            <span style={{fontSize:'0.65rem',color:'#555',fontStyle:'italic'}}>{ac.privacyNote}</span>
          </div>
          {txList.map(tx=><TxRow key={tx.id} tx={tx} isNew={tx.id===newTxId} lang={lang} />)}
        </div>
        <div style={{marginTop:'1.1rem',padding:'0.8rem 1.1rem',borderRadius:'0.7rem',background:'rgba(212,175,55,0.03)',border:'1px solid rgba(212,175,55,0.1)',display:'flex',gap:'0.55rem',alignItems:'flex-start'}}>
          <span style={{fontSize:'0.85rem',flexShrink:0}}>ℹ️</span>
          <p style={{fontSize:'0.73rem',color:'#555',lineHeight:1.6}}>{ac.disclaimerMock}</p>
        </div>
      </div>
      <style>{`@media(max-width:700px){.activity-stats-grid{grid-template-columns:1fr!important}}@media(min-width:701px) and (max-width:900px){.activity-stats-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}
