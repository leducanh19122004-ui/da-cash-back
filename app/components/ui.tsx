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
export const ChevronRight = ({ className = 'size-4' }: IconProps) => (
  <svg {...stroke} className={className}>
    <path d="m9 18 6-6-6-6" />
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
