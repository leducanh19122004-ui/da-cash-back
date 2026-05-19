'use client';
import { useEffect, useRef } from 'react';

interface Candle { o: number; h: number; l: number; c: number; }

function genCandles(n: number, base = 42800): Candle[] {
  const out: Candle[] = [];
  let p = base;
  for (let i = 0; i < n; i++) {
    const body = (Math.random() - 0.47) * p * 0.022;
    const o = p, c = p + body;
    const wick = p * 0.009;
    out.push({ o, c, h: Math.max(o,c)+Math.random()*wick, l: Math.min(o,c)-Math.random()*wick });
    p = c;
  }
  return out;
}

function calcEma(prices: number[], period: number): number[] {
  const k = 2 / (period + 1);
  return prices.reduce((acc: number[], p, i) => {
    acc.push(i === 0 ? p : p * k + acc[i-1] * (1-k));
    return acc;
  }, []);
}

export default function GlobalAnimatedBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const N = 280;
    const candles = genCandles(N);
    const closes  = candles.map(c => c.c);
    const ema9    = calcEma(closes, 9);
    const ema21   = calcEma(closes, 21);
    const ema55   = calcEma(closes, 55);

    const CW = 14, GAP = 5, STEP = CW + GAP;
    const SPEED = 0.35;
    let offset = 0, frame = 0;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      if (!W || !H) { raf.current = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, W, H);

      // 1. Gold glow orbs
      [
        { cx:W*.15, cy:H*.3,  r:W*.38, a:.13, ph:0   },
        { cx:W*.85, cy:H*.65, r:W*.32, a:.10, ph:2.1 },
        { cx:W*.5,  cy:H*.9,  r:W*.28, a:.08, ph:4.2 },
      ].forEach(g => {
        const pulse = .75 + .25*Math.sin(frame*.012 + g.ph);
        const grd = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, g.r*pulse);
        grd.addColorStop(0,  `rgba(212,175,55,${g.a*pulse})`);
        grd.addColorStop(.5, `rgba(212,175,55,${g.a*.22*pulse})`);
        grd.addColorStop(1,   'rgba(212,175,55,0)');
        ctx.fillStyle = grd; ctx.fillRect(0,0,W,H);
      });

      // 2. Grid
      ctx.strokeStyle = 'rgba(212,175,55,0.08)'; ctx.lineWidth = .8;
      for (let i=1; i<8; i++) {
        const y = H*i/8;
        ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke();
      }
      const vStep = STEP*5, vOff = offset % vStep;
      for (let x=-vOff; x<W+vStep; x+=vStep) {
        ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke();
      }

      // 3. Visible slice
      const si = Math.max(0, Math.floor(offset/STEP)-2);
      const vc = Math.ceil(W/STEP)+6;
      const vis = candles.slice(si, si+vc);
      if (!vis.length) { raf.current=requestAnimationFrame(draw); return; }

      const pMin = Math.min(...vis.map(c=>c.l));
      const pMax = Math.max(...vis.map(c=>c.h));
      const pRng = pMax - pMin || 1;
      const pad  = H*.09, cH = H - pad*2;
      const toY  = (p:number) => pad + cH*(1-(p-pMin)/pRng);
      const xOf  = (i:number) => i*STEP - (offset%STEP);

      // 4. Candles
      vis.forEach((cd,i) => {
        if (si+i>=N) return;
        const x=xOf(i), up=cd.c>=cd.o;
        ctx.strokeStyle = up ? 'rgba(52,211,153,0.6)' : 'rgba(239,68,68,0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x+CW/2,toY(cd.h)); ctx.lineTo(x+CW/2,toY(cd.l)); ctx.stroke();
        const top=toY(Math.max(cd.o,cd.c)), bH=Math.max(toY(Math.min(cd.o,cd.c))-top, 1.5);
        ctx.fillStyle   = up ? 'rgba(52,211,153,0.30)' : 'rgba(239,68,68,0.25)';
        ctx.strokeStyle = up ? 'rgba(52,211,153,0.65)' : 'rgba(239,68,68,0.60)';
        ctx.lineWidth = .9;
        ctx.fillRect(x,top,CW,bH); ctx.strokeRect(x,top,CW,bH);
      });

      // 5. EMA lines
      const drawLine = (vals:number[], color:string, lw:number, dash:number[]=[]) => {
        ctx.strokeStyle=color; ctx.lineWidth=lw; ctx.lineJoin='round'; ctx.setLineDash(dash);
        ctx.beginPath(); let s=false;
        vis.forEach((_,i)=>{ const di=si+i; if(di>=vals.length)return;
          const x=xOf(i)+CW/2, y=toY(vals[di]);
          if(!s){ctx.moveTo(x,y);s=true;}else ctx.lineTo(x,y); });
        ctx.stroke(); ctx.setLineDash([]);
      };
      drawLine(ema9,  'rgba(255,215,0,0.6)',   1.8);
      drawLine(ema21, 'rgba(99,179,237,0.48)', 1.4);
      drawLine(ema55, 'rgba(196,132,252,0.38)',1.2,[6,4]);

      // 6. Price area + line
      const fg = ctx.createLinearGradient(0,pad,0,H-pad);
      fg.addColorStop(0,  'rgba(212,175,55,0.12)');
      fg.addColorStop(.6, 'rgba(212,175,55,0.04)');
      fg.addColorStop(1,  'rgba(212,175,55,0)');
      ctx.beginPath(); let fx=0;
      vis.forEach((cd,i)=>{ if(si+i>=N)return;
        const x=xOf(i)+CW/2, y=toY(cd.c);
        if(i===0){ctx.moveTo(x,y);fx=x;}else ctx.lineTo(x,y); });
      ctx.lineTo(xOf(vis.length-1)+CW/2,H-pad); ctx.lineTo(fx,H-pad); ctx.closePath();
      ctx.fillStyle=fg; ctx.fill();

      ctx.strokeStyle='rgba(212,175,55,0.60)'; ctx.lineWidth=1.8; ctx.lineJoin='round';
      ctx.beginPath();
      vis.forEach((cd,i)=>{ if(si+i>=N)return;
        const x=xOf(i)+CW/2, y=toY(cd.c); i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
      ctx.stroke();

      // 7. Volume bars
      const vT=H*.92, vHH=H*.06, mV=Math.max(...vis.map(c=>Math.abs(c.c-c.o)))||1;
      vis.forEach((cd,i)=>{ if(si+i>=N)return;
        const vol=Math.abs(cd.c-cd.o)/mV, up=cd.c>=cd.o;
        ctx.fillStyle=up?'rgba(52,211,153,0.2)':'rgba(239,68,68,0.16)';
        ctx.fillRect(xOf(i), vT+vHH*(1-vol), CW, vHH*vol); });

      // 8. Particles
      ctx.fillStyle='rgba(212,175,55,0.08)';
      for(let i=0;i<14;i++){
        const px=((i*139.5+frame*.1)%(W+20)+W)%W;
        const py=((i*83.7+Math.sin(frame*.008+i*.9)*80)%H+H)%H;
        ctx.beginPath(); ctx.arc(px,py,1.2+(i%3)*.5,0,Math.PI*2); ctx.fill();
      }

      offset += SPEED;
      if (offset >= N*STEP) offset = 0;
      frame++;
      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas ref={ref} aria-hidden="true" style={{
      position:'fixed', inset:0, zIndex:0,
      pointerEvents:'none', width:'100%', height:'100%',
    }} />
  );
}
