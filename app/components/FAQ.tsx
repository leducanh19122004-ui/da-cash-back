'use client';
import { useId, useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { telegramContact } from '@/config/contact';
import { publishedTerms } from '@/config/rebateTerms';
import { ArrowRight, Plus, Section, SectionHeader, cn } from './ui';

function More({ className, text, cta }: { className: string; text: string; cta: string }) {
  return (
    <div className={className}>
      <p className="text-[0.9375rem] text-muted">{text}</p>
      <a href="#contact" className="btn btn-secondary mt-4">
        {cta}
        <ArrowRight className="btn-icon size-4" />
      </a>
    </div>
  );
}

/** Accordion: one answer open at a time, all closed by default. */
export default function FAQ() {
  const { copy } = useLang();
  const f = copy.faq;
  const terms = publishedTerms();
  const items = f.items({
    hasPublishedTerms: terms.length > 0,
    telegram: telegramContact.handle,
  });
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();

  return (
    <Section id="faq" labelledBy="faq-title" tone="raised">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
        <div>
          <SectionHeader id="faq-title" eyebrow={f.eyebrow} title={f.title} />
          <More className="mt-10 hidden lg:block" text={f.noAnswer} cta={f.contact} />
        </div>

        <div className="card overflow-hidden">
          {items.map((item, i) => {
            const isOpen = open === i;
            const btnId = `${base}-q${i}`;
            const panelId = `${base}-a${i}`;
            return (
              <div key={item.q} className="border-b border-line last:border-b-0">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-16 w-full items-start justify-between gap-6 px-5 py-5 text-left text-[1.0625rem] font-medium transition-colors hover:bg-ink-2 md:px-6"
                  >
                    <span>{item.q}</span>
                    <Plus
                      className={cn(
                        'mt-1 size-4 shrink-0 text-gold transition-transform duration-[var(--dur-fast)]',
                        isOpen && 'rotate-45',
                      )}
                    />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen} className="panel-in px-5 pb-6 md:px-6">
                  <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <More className="lg:hidden" text={f.noAnswer} cta={f.contact} />
      </div>
    </Section>
  );
}
