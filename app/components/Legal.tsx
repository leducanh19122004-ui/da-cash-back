import type { ReactNode } from 'react';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';

/** Shared editorial shell for the legal pages (content stays in each page). */
export function LegalShell({
  title,
  updated,
  backLabel,
  children,
}: {
  title: string;
  updated: string;
  backLabel: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main" className="min-h-screen">
        <div className="container-site section-standard">
          <div className="mx-auto max-w-3xl">
            <Link href="/" className="label inline-flex min-h-11 items-center transition-colors hover:text-fg">
              ← {backLabel.replace(/^←\s*/, '')}
            </Link>
            <h1 className="h-section mt-6">{title}</h1>
            <p className="mt-4 font-mono text-xs tracking-[0.08em] text-faint">{updated}</p>
            <div className="mt-12 border-t border-line">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-line py-9">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 text-[0.9375rem] leading-[1.8] text-muted [&_a]:text-fg [&_a]:underline [&_a]:decoration-line-strong [&_a]:underline-offset-4 hover:[&_a]:decoration-gold">
        {children}
      </div>
    </section>
  );
}

export function Bullet({ items }: { items: string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-1.5 pl-5 marker:text-faint">
      {items.map((i, k) => (
        <li key={k}>{i}</li>
      ))}
    </ul>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((i, k) => (
        <li key={k} className="flex items-start gap-3">
          <span aria-hidden className="shrink-0 text-gold">
            ✓
          </span>
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function CrossList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((i, k) => (
        <li key={k} className="flex items-start gap-3">
          <span aria-hidden className="shrink-0 text-faint">
            ✕
          </span>
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function Step({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex items-start gap-4 border-b border-line py-3 last:border-b-0">
      <span className="w-6 shrink-0 pt-0.5 font-mono text-xs text-gold tabular-nums">{String(n).padStart(2, '0')}</span>
      <p>{text}</p>
    </div>
  );
}

/** Highlighted notice: gold rule, no alarm colours. */
export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div role="note" className="my-9 border-l-2 border-gold bg-ink-1 px-5 py-5 md:px-7">
      {title ? <p className="text-sm font-semibold tracking-wide text-gold uppercase">{title}</p> : null}
      <div className="mt-2 text-[0.9375rem] leading-relaxed text-fg/85">{children}</div>
    </div>
  );
}
