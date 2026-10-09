'use client';
import { useLang } from '../contexts/LanguageContext';
import { ArrowRight, Plus, Reveal, Section, SectionHeader } from './ui';

export default function FAQ() {
  const { t } = useLang();
  const faq = t.faq;

  return (
    <Section id="faq" labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <SectionHeader id="faq-title" eyebrow={faq.badge} title={faq.title} lead={faq.desc} />
          <div className="mt-10 hidden lg:block">
            <p className="text-sm text-muted">{faq.noAnswer}</p>
            <a href="#contact" className="btn btn-secondary mt-4">
              {faq.contactSupport}
              <ArrowRight className="btn-icon size-4" />
            </a>
          </div>
        </div>

        <Reveal>
          <div className="border-t border-line">
            {faq.items.map((item, i) => (
              // Native <details>: keyboard accessible, works without JS, content stays indexable.
              <details key={i} className="disclosure group border-b border-line">
                <summary className="flex min-h-16 cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-[1.0625rem] font-medium transition-colors hover:text-fg [&::-webkit-details-marker]:hidden">
                  <span className="flex gap-4">
                    <span aria-hidden className="mt-0.5 w-6 shrink-0 font-mono text-xs text-faint tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{item.q}</span>
                  </span>
                  <Plus className="mt-1 size-4 shrink-0 text-gold transition-transform duration-[var(--dur-fast)] group-open:rotate-45" />
                </summary>
                <div className="disclosure-body pb-6 pl-10 pr-10">
                  <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </Reveal>

        <div className="lg:hidden">
          <p className="text-sm text-muted">{faq.noAnswer}</p>
          <a href="#contact" className="btn btn-secondary mt-4">
            {faq.contactSupport}
            <ArrowRight className="btn-icon size-4" />
          </a>
        </div>
      </div>
    </Section>
  );
}
