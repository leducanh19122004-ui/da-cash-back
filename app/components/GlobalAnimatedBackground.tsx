'use client';

/**
 * GlobalAnimatedBackground
 * ─────────────────────────
 * position: fixed → phủ toàn màn hình, không đẩy layout.
 * z-index: 0      → nằm dưới mọi content (content dùng z-index: 10).
 * pointer-events: none → không chặn click/hover.
 * prefers-reduced-motion → tắt animation nếu user chọn.
 */
export default function GlobalAnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
      }}
    >
      {/* ── 1. Base radial glow — vàng rất mờ ────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 75% 55% at 18% 28%, rgba(212,175,55,0.055) 0%, transparent 58%),
          radial-gradient(ellipse 55% 45% at 82% 72%, rgba(212,175,55,0.04)  0%, transparent 55%),
          radial-gradient(ellipse 40% 35% at 50% 95%, rgba(34,197,94,0.022)  0%, transparent 50%)
        `,
      }} />

      {/* ── 2. Dot-matrix grid — fintech terminal vibe ─ */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(212,175,55,0.038) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }} />

      {/* ── 3. Slow-moving light orbs ──────────────────── */}
      <div style={{
        position: 'absolute', top: '10%', left: '-5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)',
        animation: 'gb-orb1 26s ease-in-out infinite',
        willChange: 'transform',
      }} />
      <div style={{
        position: 'absolute', top: '45%', right: '-8%',
        width: '420px', height: '420px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
        animation: 'gb-orb2 32s ease-in-out infinite',
        willChange: 'transform',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', left: '35%',
        width: '320px', height: '320px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,0.03) 0%, transparent 70%)',
        animation: 'gb-orb3 22s ease-in-out infinite',
        willChange: 'transform',
      }} />

      {/* ── 4. Abstract finance lines (SVG) ────────────── */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Candlestick-vibe wave lines */}
        <path d="M 0 220 C 180 200 300 240 500 210 S 800 180 1000 220 S 1250 245 1440 210"
          fill="none" stroke="rgba(212,175,55,0.055)" strokeWidth="1.5"
          style={{ animation: 'gb-line1 14s ease-in-out infinite' }} />
        <path d="M 0 440 C 200 420 380 460 600 435 S 900 410 1100 445 S 1320 465 1440 440"
          fill="none" stroke="rgba(34,197,94,0.042)" strokeWidth="1"
          style={{ animation: 'gb-line2 18s ease-in-out infinite' }} />
        <path d="M 0 660 C 160 640 320 675 520 655 S 820 630 1020 658 S 1260 680 1440 660"
          fill="none" stroke="rgba(212,175,55,0.045)" strokeWidth="1"
          style={{ animation: 'gb-line3 22s ease-in-out infinite' }} />
        <path d="M 0 820 C 240 800 440 835 680 818 S 980 798 1200 822 S 1380 838 1440 820"
          fill="none" stroke="rgba(34,197,94,0.03)" strokeWidth="0.8"
          style={{ animation: 'gb-line1 28s ease-in-out 4s infinite' }} />

        {/* Ultra-faint crypto symbols */}
        {([
          [90,  110, '₿',    0.022],
          [380, 780, 'ETH',  0.018],
          [820,  75, '%',    0.024],
          [1180, 560, '↑',   0.026],
          [620, 870, 'USDT', 0.018],
          [1380, 170, '↓',   0.022],
          [240, 480,  '$',   0.02 ],
        ] as [number,number,string,number][]).map(([x,y,t,op],i) => (
          <text key={i} x={x} y={y} fontSize="20"
            fill={`rgba(212,175,55,${op})`}
            fontFamily="monospace" fontWeight="700"
            style={{ animation: `gb-float ${12+i*3}s ease-in-out ${i*1.8}s infinite` }}>
            {t}
          </text>
        ))}
      </svg>

      {/* ── 5. Floating micro-particles ────────────────── */}
      {([
        [7,   15, 1.6, 11, 0], [18,  55, 1.2, 14, 1.5],
        [32,  82, 1.8, 9,  3], [48,  30, 1.0, 16, 0.8],
        [61,  68, 1.5, 12, 2], [74,  20, 1.3, 10, 4],
        [85,  75, 1.7, 13, 1], [92,  42, 1.1, 15, 2.5],
        [25,  92, 1.4, 11, 3.5],[55,  10, 1.6, 17, 0.5],
      ] as [number,number,number,number,number][]).map(([lx,ly,sz,dur,del],i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${lx}%`, top: `${ly}%`,
          width: `${sz}px`, height: `${sz}px`,
          borderRadius: '50%', background: '#D4AF37',
          opacity: 0.045 + (i % 4) * 0.018,
          animation: `gb-float ${dur}s ease-in-out ${del}s infinite`,
          willChange: 'transform',
        }} />
      ))}

      {/* ── Keyframes ──────────────────────────────────── */}
      <style>{`
        @keyframes gb-orb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%     { transform: translate(55px,-35px) scale(1.07); }
          66%     { transform: translate(-25px,28px) scale(0.94); }
        }
        @keyframes gb-orb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%     { transform: translate(-60px,40px) scale(1.09); }
          70%     { transform: translate(35px,-25px) scale(0.92); }
        }
        @keyframes gb-orb3 {
          0%,100% { transform: translate(0,0); }
          50%     { transform: translate(30px,-20px); }
        }
        @keyframes gb-line1 {
          0%,100% { opacity:0.6; stroke-dashoffset:0; }
          50%     { opacity:1;   stroke-dashoffset:80; }
        }
        @keyframes gb-line2 {
          0%,100% { opacity:0.5; }
          50%     { opacity:0.9; }
        }
        @keyframes gb-line3 {
          0%,100% { opacity:0.4; }
          60%     { opacity:0.8; }
        }
        @keyframes gb-float {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-12px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="gb-orb"], [style*="gb-line"], [style*="gb-float"] {
            animation: none !important;
          }
        }
        @media (max-width: 768px) {
          /* Giảm animation trên mobile để nhẹ hơn */
          [style*="animation: gb-orb"] { animation-duration: 40s !important; }
          [style*="animation: gb-float"] { animation-duration: 18s !important; }
        }
      `}</style>
    </div>
  );
}
