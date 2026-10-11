'use client';
import { useLang } from '../contexts/LanguageContext';
import { benefits, supportResponseTime } from '@/config/benefits';
import { ArrowUpRight, InView, Section, SectionHeader } from './ui';

export default function Benefits() {
  const { copy, lang, ui } = useLang();
  const c = copy.benefits;

  const items = benefits(lang).map((b) => {
    const text = c.items[b.id];
    const body = typeof text.body === 'function' ? text.body(supportResponseTime) : text.body;
    const linkLabel = 'link' in text ? text.link : c.open;
    return { ...b, title: text.title, body, linkLabel };
  });

  return (
    <Section id="benefits" labelledBy="benefits-title" tone="raised">
      <SectionHeader id="benefits-title" eyebrow={c.eyebrow} title={c.title} />

      <InView as="ol" className="mt-14 grid border-t border-line md:grid-cols-2 lg:grid-cols-5">
        {items.map((b, i) => (
          <li
            key={b.id}
            className="seq border-b border-line py-7 md:pr-8 lg:border-r lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:border-r-0"
            style={{ '--i': i } as React.CSSProperties}
          >
            <span aria-hidden className="font-mono text-xs text-gold tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="h-card mt-4">{b.title}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{b.body}</p>
            {b.href ? (
              <a
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-4 inline-flex min-h-9 items-center gap-1 text-sm text-fg"
              >
                {b.linkLabel}
                <ArrowUpRight className="size-3.5" />
                <span className="sr-only"> ({ui.newTab})</span>
              </a>
            ) : null}
          </li>
        ))}
      </InView>
    </Section>
  );
}
