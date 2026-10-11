'use client';
import { useLang } from '../contexts/LanguageContext';
import { exchangeById } from '@/config/exchanges';
import { publishedTestimonials } from '@/config/testimonials';
import { Reveal, Section, SectionHeader } from './ui';

/** Real, consented member feedback only. Renders nothing until config/testimonials.ts has entries. */
export default function MemberFeedback() {
  const { copy } = useLang();
  const c = copy.testimonials;
  const items = publishedTestimonials();
  if (items.length === 0) return null;

  return (
    <Section id="members" labelledBy="members-title" tone="raised">
      <SectionHeader id="members-title" eyebrow={c.eyebrow} title={c.title} />
      <Reveal className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <figure key={t.id} className="flex flex-col justify-between gap-8 bg-ink-1 p-6 md:p-8">
            <blockquote lang={t.originalLanguage} className="text-[1.0625rem] leading-relaxed text-fg/90">
              “{t.quote}”
            </blockquote>
            <figcaption className="text-sm">
              <span className="font-medium">{t.displayName}</span>
              {t.country ? <span className="text-muted"> · {t.country}</span> : null}
              <span className="mt-1 block font-mono text-[0.6875rem] tracking-[0.1em] text-faint uppercase">
                {c.via(exchangeById(t.exchangeId)?.name ?? t.exchangeId)} · {t.date}
              </span>
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </Section>
  );
}
