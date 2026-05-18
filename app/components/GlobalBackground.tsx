'use client';
import { useEffect, useRef } from 'react';

// Finance-themed abstract market line using SVG path animation
function MarketLine({ y, delay, duration, color }: { y: number; delay: number; duration: number; color: string }) {
  // Simple sine-like path
  const d = `M 0 ${y} C 200 ${y-18} 350 ${y+12} 550 ${y-8} S 900 ${y+15} 1100 ${y-5} S 1400 ${y+10} 1600 ${y}`;
  return (
    <path
      d={d} fill="none" stroke={color} strokeWidth="1"
      style={{
        opacity: 0,
        animation: `market-line-fade ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

export default function GlobalBackground() {
  return (
    <>
      {/* Fixed canvas-like SVG layer behind everything */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
        // Prevent this from causing layout shift
        contain: 'strict',
      }}>
        {/* Base gradient — very subtle vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse 80% 50% at 20% 30%, rgba(212,175,55,0.055) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 80% 70%, rgba(212,175,55,0.04) 0%, transparent 55%),
            radial-gradient(ellipse 100% 80% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%)
          `,
        }} />

        {/* Fine dot grid — trading terminal feel */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(212,175,55,0.04) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
          opacity: 1,
        }} />

        {/* Abstract market lines — SVG animated */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 1 }}
          preserveAspectRatio="none"
          viewBox="0 0 1600 900"
        >
          <defs>
            <style>{`
              @keyframes market-line-fade {
                0%,100% { opacity:0; }
                20%,80% { opacity:1; }
              }
              @keyframes float-slow {
                0%,100% { transform: translateY(0px); }
                50% { transform: translateY(-14px); }
              }
              @keyframes orb-pulse {
                0%,100% { opacity:0.06; transform: scale(1); }
                50% { opacity:0.12; transform: scale(1.07); }
              }
              @media (prefers-reduced-motion: reduce) {
                * { animation: none !important; }
              }
            `}</style>
          </defs>
          {/* Market lines — very faint */}
          <MarketLine y={180} delay={0}   duration={12} color="rgba(212,175,55,0.07)" />
          <MarketLine y={320} delay={3}   duration={16} color="rgba(34,197,94,0.055)"  />
          <MarketLine y={500} delay={6}   duration={14} color="rgba(212,175,55,0.06)" />
          <MarketLine y={680} delay={2}   duration={18} color="rgba(34,197,94,0.045)"  />
          <MarketLine y={820} delay={8}   duration={11} color="rgba(212,175,55,0.05)" />

          {/* Floating orbs */}
          <ellipse cx="200" cy="300" rx="280" ry="200"
            fill="radial-gradient(rgba(212,175,55,0.08),transparent)"
            style={{ fill:'rgba(212,175,55,0.04)', animation:'orb-pulse 18s ease-in-out infinite' }} />
          <ellipse cx="1350" cy="600" rx="220" ry="180"
            style={{ fill:'rgba(212,175,55,0.035)', animation:'orb-pulse 22s ease-in-out 5s infinite' }} />
          <ellipse cx="800" cy="150" rx="180" ry="140"
            style={{ fill:'rgba(34,197,94,0.025)', animation:'orb-pulse 15s ease-in-out 8s infinite' }} />

          {/* Crypto symbols — barely visible */}
          {[
            { x:80,  y:120, t:'₿',   op:0.025 },
            { x:350, y:750, t:'ETH', op:0.02  },
            { x:900, y:80,  t:'%',   op:0.025 },
            { x:1200,y:600, t:'↑',   op:0.03  },
            { x:600, y:850, t:'USDT',op:0.02  },
            { x:1450,y:200, t:'↓',   op:0.025 },
          ].map((s,i) => (
            <text key={i} x={s.x} y={s.y}
              fontSize="22" fill={`rgba(212,175,55,${s.op})`}
              fontFamily="monospace" fontWeight="700"
              style={{ userSelect:'none', animation:`float-slow ${14+i*3}s ease-in-out ${i*2}s infinite` }}>
              {s.t}
            </text>
          ))}
        </svg>

        {/* Floating particles */}
        {Array.from({length:12},(_,i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${8 + i*7.5}%`,
            top:  `${10 + (i%5)*18}%`,
            width: `${1.5 + (i%3)*0.8}px`,
            height:`${1.5 + (i%3)*0.8}px`,
            borderRadius:'50%',
            background:'#D4AF37',
            opacity: 0.05 + (i%4)*0.025,
            animation:`float-slow ${9+i*2}s ease-in-out ${i*1.3}s infinite`,
          }} />
        ))}
      </div>

      <style>{`
        /* Ensure main content sits above the background */
        body { position: relative; }
        main, header, footer { position: relative; z-index: 1; }
      `}</style>
    </>
  );
}
