'use client';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/** Joins class names, skipping falsy values. */
export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

/**
 * Marks its element `data-inview="true"` the first time it scrolls into view
 * (ported from the DA Network hub). Server HTML has no attribute, so content
 * is visible without JavaScript; CSS only hides `[data-inview="false"]`.
 */
export function InView({
  children,
  className,
  as: Tag = 'div',
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'ol' | 'ul';
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<'pending' | 'false' | 'true'>('pending');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // Already on screen at mount: never hide it (avoids a flash).
    if (r.top < window.innerHeight && r.bottom > 0) {
      setState('true');
      return;
    }
    setState('false');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState('true');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Element = Tag as 'div';
  return (
    <Element
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={style}
      data-inview={state === 'pending' ? undefined : state}
    >
      {children}
    </Element>
  );
}

/** One-time, restrained entrance (opacity + small translate). */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <InView className={cn('reveal', className)} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </InView>
  );
}

/** Section shell with the hub's rhythm tokens and hairline top border. */
export function Section({
  id,
  labelledBy,
  children,
  className,
  tone = 'base',
  rhythm = 'standard',
}: {
  id?: string;
  labelledBy?: string;
  children: ReactNode;
  className?: string;
  tone?: 'base' | 'raised';
  rhythm?: 'feature' | 'standard' | 'quiet';
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative border-t border-line', `section-${rhythm}`, tone === 'raised' && 'bg-ink-1', className)}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}

/** Editorial section header: eyebrow + headline + optional lead. */
export function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  className,
}: {
  id: string;
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="h-section mt-5">
        {title}
      </h2>
      {lead ? <p className="measure mt-5 text-lg leading-relaxed text-pretty text-muted">{lead}</p> : null}
    </div>
  );
}

/** Thin-stroke icons in the hub's lucide style (1.75 stroke). */
type IconProps = { className?: string };
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  viewBox: '0 0 24 24',
};
export const ArrowRight = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowUpRight = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const Check = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="m5 12 5 5L20 7" />
  </svg>
);
export const Cross = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const Plus = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const ChevronDown = ({ className = 'size-3' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const ChevronLeft = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);
export const Globe = ({ className = 'size-3.5' }: IconProps) => (
  <svg {...stroke} className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
export const Menu = ({ className = 'size-5' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const Pause = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M9 5v14M15 5v14" />
  </svg>
);
export const Play = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="m7 5 12 7-12 7z" />
  </svg>
);

/* V3.2 icons — same thin-stroke style. */
export const Search = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
/** Exchange / venue: a simple columned building. */
export const Building = ({ className = 'size-5' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M3 21h18M4 10h16M12 3 4 7v3h16V7z" />
    <path d="M6 10v8M10 10v8M14 10v8M18 10v8" />
  </svg>
);
/** UID / ID card. */
export const IdCard = ({ className = 'size-5' }: IconProps) => (
  <svg {...stroke} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="9" cy="11" r="2" />
    <path d="M6 16c.6-1.4 1.7-2 3-2s2.4.6 3 2M15 10h3M15 13h3" />
  </svg>
);
/** Trading: a small line chart. */
/** Rebate: an arrow returning to its origin. */
export const Rebate = ({ className = 'size-5' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M9 14 4 9l5-5" />
    <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
  </svg>
);
export const Send = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M21 3 10 14M21 3l-7 18-4-7-7-4z" />
  </svg>
);
export const UserPlus = ({ className = 'size-5' }: IconProps) => (
  <svg {...stroke} className={className}>
    <circle cx="9" cy="8" r="4" />
    <path d="M2 21c.8-3.5 3.6-6 7-6s6.2 2.5 7 6M19 8v6M16 11h6" />
  </svg>
);
export const Copy = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </svg>
);
export const Lock = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);
export const Key = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <circle cx="8" cy="15" r="4" />
    <path d="m10.8 12.2 9.2-9.2M17 6l3 3M14 9l2 2" />
  </svg>
);
export const Shield = ({ className = 'size-5' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
export const Ban = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="m5.6 5.6 12.8 12.8" />
  </svg>
);
export const Book = ({ className = 'size-5' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2.5zM20 19v3H6" />
  </svg>
);
export const Refresh = ({ className = 'size-5' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M20 11a8 8 0 0 0-14.9-4M4 4v4h4M4 13a8 8 0 0 0 14.9 4M20 20v-4h-4" />
  </svg>
);
export const Nodes = ({ className = 'size-5' }: IconProps) => (
  <svg {...stroke} className={className}>
    <circle cx="12" cy="5" r="2.5" />
    <circle cx="5" cy="19" r="2.5" />
    <circle cx="19" cy="19" r="2.5" />
    <path d="m10.8 7.2-4.6 9.6M13.2 7.2l4.6 9.6M7.5 19h9" />
  </svg>
);
export const Handshake = ({ className = 'size-5' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" />
    <path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2L15 11l-3 1-2-2 4-3 3 1 4-1v8M3 7l4 1 4-1M3 7v8l5 4 1-1" />
  </svg>
);
export const Activity = ({ className = 'size-5' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="M3 12h4l3-8 4 16 3-8h4" />
  </svg>
);
export const Info = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);
export const Clock = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

/** External link with the hub's accessible "opens in a new tab" hint. */
export function ExternalLink({
  href,
  children,
  className,
  hint,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  hint: string;
  onClick?: () => void;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
      {children}
      <span className="sr-only"> ({hint})</span>
    </a>
  );
}

/** Removes emoji from existing copy at render time (the source strings keep them). */
export function stripEmoji(s: string) {
  return s
    .replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}️‍]/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
