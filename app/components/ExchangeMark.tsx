import type { Exchange } from '@/config/exchanges';
import { cn } from './ui';

/**
 * Exchange mark: the owner-supplied logo when `logoSrc` is set, otherwise an
 * initials monogram. The brand colour (when known) is only a small accent dot.
 */
export default function ExchangeMark({ ex, size = 'md' }: { ex: Exchange; size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'size-8 text-[0.625rem]' : 'size-10 text-[0.6875rem]';
  return (
    <span
      aria-hidden
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-line-strong bg-ink-2 font-mono font-medium tracking-wider text-fg',
        box,
      )}
    >
      {ex.logoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element -- owner-supplied local file, any format
        <img src={ex.logoSrc} alt="" className="size-[70%] object-contain" />
      ) : (
        ex.initials
      )}
      {ex.brandColor ? (
        <span
          className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-ink-1"
          style={{ backgroundColor: ex.brandColor }}
        />
      ) : null}
    </span>
  );
}
