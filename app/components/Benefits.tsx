'use client';
import { useLang } from '../contexts/LanguageContext';
import { InView, Section, SectionHeader } from './ui';

/** What DA Cashback offers: the fee-rebate model only (no plans, signals, community or learning). */
export default function Benefits() {
  const { copy } = useLang();
  const c = copy.benefits;

  return (
    <Section id="benefits" labelledBy="benefits-title" tone="raised">
      <SectionHeader id="benefits-title" eyebrow={c.eyebrow} title={c.title} />

      <InView as="ol" className="mt-14 grid border-t border-line md:grid-cols-2 lg:grid-cols-5">
        {c.items.map((b, i) => (
          <li
            key={b.title}
            className="seq border-b border-line py-7 md:pr-8 lg:border-r lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:border-r-0"
            style={{ '--i': i } as React.CSSProperties}
          >
            <span aria-hidden className="font-mono text-xs text-gold tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="h-card mt-4">{b.title}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{b.body}</p>
          </li>
        ))}
      </InView>
    </Section>
  );
}
