'use client';
import { useEffect, useRef } from 'react';

// ── Price data generator ─────────────────────────────────────────
interface Candle { o: number; h: number; l: number; c: number; }

function genCandles(count: number, base = 42800): Candle[] {
  const out: Candle[] = [];
  let p = base;
  for (let i = 0; i < count; i++) {
    const body = (Math.random() - 0.47) * p * 0.018;
    const o = p;
    const c = p + body;
    const wick = p * 0.006;
    const h = Math.max(o, c) + Math.random() * wick;
    const l = Math.min(o, c) - Math.random() * wick;
    out.push({ o, h, l, c });
    p = c;
  }
  return out;
}

function ema(prices: number[], period: number): number[] {
  const k = 2 / (period + 1);
  return prices.reduce((acc: number[], p, i) => {
    acc.push(i === 0 ? p : p * k + acc[i - 1] * (1 - k));
    return acc;
  }, []);
}

// ── Main component ───────────────────────────────────────────────
export default function GlobalAnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize handler
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate data
    const CANDLE_COUNT = 300;
    const candles = genCandles(CANDLE_COUNT);
    const closes  = candles.map(c => c.c);
    const ema9    = ema(closes, 9);
    const ema21   = ema(closes, 21);
    const ema55   = ema(closes, 55);

    // Animation state
    let offset = 0;       // scroll offset in px
    const SPEED = 0.4;   // px per frame — very slow, elegant
    const CW    = 16;    // candle width
    const GAP   = 5;     // gap between candles
    const STEP  = CW + GAP;

    // Glow orbs (fixed positions, pulsing)
    const orbs = [
      { x: 0.18, y: 0.3,  r: 380, a: 0.06,  phase: 0 },
      { x: 0.82, y: 0.65, r: 320, a: 0.045, phase: 1.8 },
      { x: 0.5,  y: 0.88, r: 260, a: 0.035, phase: 3.5 },
    ];

    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      if (W === 0 || H === 0) { rafRef.current = requestAnimationFrame(draw); return; }

      // Clear
      ctx.clearRect(0, 0, W, H);

      // ── 1. Grid ─────────────────────────────────────────────────
      ctx.strokeStyle = 'rgba(212,175,55,0.038)';
      ctx.lineWidth   = 0.8;

      // Horizontal lines
      const hLines = 8;
      for (let i = 0; i <= hLines; i++) {
        const y = (H * i) / hLines;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      // Vertical lines (scrolling with candles)
      const vStep = STEP * 4;
      const vOff  = offset % vStep;
      for (let x = -vOff; x < W + vStep; x += vStep) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }

      // ── 2. Gold glow orbs ────────────────────────────────────────
      orbs.forEach(orb => {
        const pulse = Math.sin(t * 0.015 + orb.phase) * 0.3 + 0.7;
        const grd = ctx.createRadialGradient(
          orb.x * W, orb.y * H, 0,
          orb.x * W, orb.y * H, orb.r * pulse
        );
        grd.addColorStop(0,   `rgba(212,175,55,${orb.a * pulse})`);
        grd.addColorStop(0.5, `rgba(212,175,55,${orb.a * 0.3 * pulse})`);
        grd.addColorStop(1,   'rgba(212,175,55,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      });

      // ── 3. Candle chart — bottom 40% of screen ───────────────────
      const chartTop    = H * 0.55;
      const chartBottom = H * 0.95;
      const chartH      = chartBottom - chartTop;

      // Price range across visible candles
      const startIdx = Math.max(0, Math.floor(offset / STEP) - 1);
      const visCount = Math.ceil(W / STEP) + 4;
      const visCandles = candles.slice(startIdx, startIdx + visCount);

      const priceMin = Math.min(...visCandles.map(c => c.l));
      const priceMax = Math.max(...visCandles.map(c => c.h));
      const pRange   = priceMax - priceMin || 1;

      const toY = (price: number) =>
        chartBottom - ((price - priceMin) / pRange) * chartH;

      // Draw candles
      for (let i = 0; i < visCandles.length; i++) {
        const dataIdx = startIdx + i;
        if (dataIdx >= CANDLE_COUNT) break;
        const cd = visCandles[i];
        const x  = i * STEP - (offset % STEP);

        const isUp    = cd.c >= cd.o;
        const bodyTop = toY(Math.max(cd.o, cd.c));
        const bodyBot = toY(Math.min(cd.o, cd.c));
        const bodyH   = Math.max(bodyBot - bodyTop, 1);

        // Wick
        ctx.strokeStyle = isUp
          ? 'rgba(52,211,153,0.28)'
          : 'rgba(239,68,68,0.22)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + CW / 2, toY(cd.h));
        ctx.lineTo(x + CW / 2, toY(cd.l));
        ctx.stroke();

        // Body
        ctx.fillStyle = isUp
          ? 'rgba(52,211,153,0.22)'
          : 'rgba(239,68,68,0.18)';
        ctx.fillRect(x, bodyTop, CW, bodyH);

        // Body border
        ctx.strokeStyle = isUp
          ? 'rgba(52,211,153,0.4)'
          : 'rgba(239,68,68,0.35)';
        ctx.lineWidth = 0.8;
        ctx.strokeRect(x, bodyTop, CW, bodyH);
      }

      // ── 4. EMA lines ─────────────────────────────────────────────
      const drawLine = (values: number[], color: string, lw: number) => {
        ctx.strokeStyle = color;
        ctx.lineWidth   = lw;
        ctx.lineJoin    = 'round';
        ctx.beginPath();
        let started = false;
        for (let i = 0; i < visCandles.length; i++) {
          const dataIdx = startIdx + i;
          if (dataIdx >= values.length) break;
          const x = i * STEP - (offset % STEP) + CW / 2;
          const y = toY(values[dataIdx]);
          if (!started) { ctx.moveTo(x, y); started = true; }
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };

      drawLine(ema9,  'rgba(212,175,55,0.45)',  1.2); // gold — fast
      drawLine(ema21, 'rgba(99,179,237,0.32)',   1.0); // blue — mid
      drawLine(ema55, 'rgba(167,139,250,0.25)',  0.9); // purple — slow

      // ── 5. Price line (close) — upper section ────────────────────
      const topChartTop    = H * 0.08;
      const topChartBottom = H * 0.48;
      const topChartH      = topChartBottom - topChartTop;

      // Reuse same candles, map to upper area with smoother range
      const sPriceMin = Math.min(...visCandles.map(c => c.c)) * 0.998;
      const sPriceMax = Math.max(...visCandles.map(c => c.c)) * 1.002;
      const sPRange   = sPriceMax - sPriceMin || 1;
      const toYTop = (p: number) =>
        topChartBottom - ((p - sPriceMin) / sPRange) * topChartH;

      // Gradient fill under price line
      const grad = ctx.createLinearGradient(0, topChartTop, 0, topChartBottom);
      grad.addColorStop(0,   'rgba(212,175,55,0.07)');
      grad.addColorStop(0.6, 'rgba(212,175,55,0.02)');
      grad.addColorStop(1,   'rgba(212,175,55,0)');

      ctx.beginPath();
      let firstX = 0;
      for (let i = 0; i < visCandles.length; i++) {
        const dataIdx = startIdx + i;
        if (dataIdx >= CANDLE_COUNT) break;
        const x = i * STEP - (offset % STEP) + CW / 2;
        const y = toYTop(closes[dataIdx]);
        if (i === 0) { ctx.moveTo(x, y); firstX = x; }
        else ctx.lineTo(x, y);
      }
      // Close path for fill
      const lastX = (visCandles.length - 1) * STEP - (offset % STEP) + CW / 2;
      ctx.lineTo(lastX, topChartBottom);
      ctx.lineTo(firstX, topChartBottom);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Price line stroke
      ctx.strokeStyle = 'rgba(212,175,55,0.38)';
      ctx.lineWidth   = 1.2;
      ctx.lineJoin    = 'round';
      ctx.beginPath();
      for (let i = 0; i < visCandles.length; i++) {
        const dataIdx = startIdx + i;
        if (dataIdx >= CANDLE_COUNT) break;
        const x = i * STEP - (offset % STEP) + CW / 2;
        const y = toYTop(closes[dataIdx]);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // ── 6. Tiny floating particles ───────────────────────────────
      // Pre-seeded so they look consistent
      ctx.fillStyle = 'rgba(212,175,55,0.055)';
      for (let i = 0; i < 12; i++) {
        const px = ((i * 137.508 + t * 0.08) % W + W) % W;
        const py = ((i * 79.3 + Math.sin(t * 0.01 + i) * 60) % H + H) % H;
        const r  = 1 + (i % 3) * 0.5;
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill();
      }

      // Advance
      offset += SPEED;
      // Loop when all candles scrolled off
      const totalWidth = CANDLE_COUNT * STEP;
      if (offset >= totalWidth) offset = 0;
      t++;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        opacity: 1,
      }}
    />
  );
}
