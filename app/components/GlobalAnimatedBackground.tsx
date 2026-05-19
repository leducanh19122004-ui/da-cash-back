'use client';
import { useEffect, useRef } from 'react';

// ── Seeded noise helper (deterministic so no hydration flash) ────
function noise(x: number, y: number, t: number): number {
  return Math.sin(x * 0.8 + t * 0.3) * Math.cos(y * 0.6 + t * 0.2) * 0.5 + 0.5;
}

export default function GlobalAnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let W = 0, H = 0, t = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Static particle positions (stable across frames) ─────────
    const PARTICLE_COUNT = 55;
    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: (i * 137.508) % 1,      // golden-ratio distribution
      y: (i * 97.31)  % 1,
      r: 0.6 + (i % 5) * 0.28,
      speed: 0.00018 + (i % 7) * 0.000055,
      phase: (i * 2.399) % (Math.PI * 2),
      drift: (i % 3 - 1) * 0.00008,
    }));

    // ── Abstract finance curve waypoints ─────────────────────────
    const LINE_SEGMENTS = 6;
    const linePhases = Array.from({ length: LINE_SEGMENTS }, (_, i) => ({
      amp:   0.04 + (i % 3) * 0.03,
      freq:  0.4  + i * 0.15,
      phase: (i * 1.3) % (Math.PI * 2),
      speed: 0.003 + i * 0.0008,
      y:     0.12 + i * 0.135,
      alpha: 0.06 + (i % 2) * 0.04,
      width: 0.7  + (i % 3) * 0.4,
    }));

    const draw = () => {
      if (!W || !H) { rafRef.current = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, W, H);

      // ── 1. Base dark gradient ───────────────────────────────────
      const base = ctx.createLinearGradient(0, 0, W, H);
      base.addColorStop(0,    '#050505');
      base.addColorStop(0.45, '#060504');
      base.addColorStop(1,    '#040404');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, W, H);

      // ── 2. Large gold glow orbs — slow, majestic drift ─────────
      const orbs = [
        { cx: 0.12 + Math.sin(t * 0.004) * 0.06, cy: 0.25 + Math.cos(t * 0.003) * 0.08, r: 0.42, a: 0.13 },
        { cx: 0.88 + Math.cos(t * 0.003) * 0.05, cy: 0.70 + Math.sin(t * 0.005) * 0.07, r: 0.38, a: 0.11 },
        { cx: 0.50 + Math.sin(t * 0.006) * 0.08, cy: 0.05 + Math.cos(t * 0.004) * 0.04, r: 0.30, a: 0.08 },
        { cx: 0.25 + Math.cos(t * 0.005) * 0.04, cy: 0.88 + Math.sin(t * 0.004) * 0.05, r: 0.28, a: 0.07 },
      ];
      orbs.forEach(({ cx, cy, r, a }) => {
        const gx = cx * W, gy = cy * H, gr = r * Math.max(W, H);
        const pulse = 0.82 + 0.18 * Math.sin(t * 0.015 + cx * 5);
        const grd = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr * pulse);
        grd.addColorStop(0,    `rgba(212,175,55,${a * pulse})`);
        grd.addColorStop(0.35, `rgba(212,175,55,${a * 0.3 * pulse})`);
        grd.addColorStop(0.7,  `rgba(180,140,30,${a * 0.06 * pulse})`);
        grd.addColorStop(1,     'rgba(212,175,55,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      });

      // ── 3. Dot-matrix grid — fine, elegant ─────────────────────
      const dotStep = 44;
      const dotA    = 0.055;
      ctx.fillStyle = `rgba(212,175,55,${dotA})`;
      for (let x = dotStep / 2; x < W; x += dotStep) {
        for (let y = dotStep / 2; y < H; y += dotStep) {
          const n  = noise(x / W * 4, y / H * 4, t * 0.008);
          const fa = dotA * (0.5 + n * 0.5);
          ctx.globalAlpha = fa;
          ctx.beginPath();
          ctx.arc(x, y, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // ── 4. Horizontal hair-lines (trading terminal vibe) ────────
      ctx.strokeStyle = 'rgba(212,175,55,0.055)';
      ctx.lineWidth   = 0.7;
      for (let i = 1; i < 9; i++) {
        const y = H * i / 9;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      // Vertical (very sparse)
      ctx.strokeStyle = 'rgba(212,175,55,0.035)';
      for (let i = 1; i < 5; i++) {
        const x = W * i / 5;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }

      // ── 5. Abstract finance sine-curves ────────────────────────
      linePhases.forEach(lp => {
        const yBase = lp.y * H;
        ctx.strokeStyle = `rgba(212,175,55,${lp.alpha})`;
        ctx.lineWidth   = lp.width;
        ctx.lineJoin    = 'round';
        ctx.shadowColor = `rgba(212,175,55,${lp.alpha * 0.6})`;
        ctx.shadowBlur  = 4;
        ctx.beginPath();
        for (let px = 0; px <= W; px += 4) {
          const progress = px / W;
          const wave1 = Math.sin(progress * Math.PI * lp.freq + t * lp.speed + lp.phase) * lp.amp;
          const wave2 = Math.sin(progress * Math.PI * lp.freq * 1.7 + t * lp.speed * 1.3) * lp.amp * 0.4;
          const py = yBase + (wave1 + wave2) * H;
          px === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.stroke();
      });
      ctx.shadowBlur = 0;

      // ── 6. Glowing diagonal accent lines ───────────────────────
      [[0.0, 0.6, 0.55, 0.0], [1.0, 0.3, 0.45, 1.0]].forEach(([x1r, y1r, x2r, y2r], i) => {
        const prog = (Math.sin(t * 0.005 + i * Math.PI) + 1) / 2;
        const grd = ctx.createLinearGradient(x1r * W, y1r * H, x2r * W, y2r * H);
        grd.addColorStop(0,         'rgba(212,175,55,0)');
        grd.addColorStop(prog,      `rgba(212,175,55,0.10)`);
        grd.addColorStop(Math.min(prog + 0.15, 1), 'rgba(212,175,55,0.06)');
        grd.addColorStop(1,         'rgba(212,175,55,0)');
        ctx.strokeStyle = grd;
        ctx.lineWidth   = 0.9;
        ctx.beginPath();
        ctx.moveTo(x1r * W, y1r * H);
        ctx.lineTo(x2r * W, y2r * H);
        ctx.stroke();
      });

      // ── 7. Floating gold particles ──────────────────────────────
      particles.forEach((p, i) => {
        const age   = t * p.speed + p.phase;
        const px    = ((p.x + Math.sin(age * 0.7 + i) * 0.04 + p.drift * t) % 1 + 1) % 1;
        const py    = ((p.y + Math.cos(age * 0.5 + i * 0.8) * 0.03) % 1 + 1) % 1;
        const twink = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.018 + p.phase));
        const alpha = 0.08 + twink * 0.10;

        // Glow halo
        const grd = ctx.createRadialGradient(px * W, py * H, 0, px * W, py * H, p.r * 3.5);
        grd.addColorStop(0,   `rgba(212,175,55,${alpha})`);
        grd.addColorStop(0.5, `rgba(212,175,55,${alpha * 0.3})`);
        grd.addColorStop(1,    'rgba(212,175,55,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(px * W, py * H, p.r * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(240,200,80,${alpha * 1.5})`;
        ctx.beginPath();
        ctx.arc(px * W, py * H, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── 8. Corner gold accent vignette ─────────────────────────
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.9);
      vig.addColorStop(0,  'rgba(0,0,0,0)');
      vig.addColorStop(0.7,'rgba(0,0,0,0.15)');
      vig.addColorStop(1,  'rgba(0,0,0,0.5)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

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
        position: 'fixed', inset: 0, zIndex: 0,
        pointerEvents: 'none', width: '100%', height: '100%',
      }}
    />
  );
}
