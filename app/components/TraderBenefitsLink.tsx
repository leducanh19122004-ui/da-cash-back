'use client';
import { useLang } from '../contexts/LanguageContext';
import { tradersUrl } from '@/config/ecosystem';
import { ArrowUpRight, Reveal, Section } from './ui';

/**
 * Cross-link to the DA Network Trader page (V3.1 §1). Plans, signals and
 * Volume Rewards are a separate hub programme — linked here, never merged
 * into DA Cashback's offer.
 */
export default function TraderBenefitsLink() {
  const { copy, lang, ui } = useLang();
  const c = copy.traders;

  return (
    <Section id="traders" labelledBy="traders-title" rhythm="quiet">
      <Reveal>
        <div className="flex flex-col gap-6 rounded-[var(--radius-md)] border border-line bg-ink-1 px-5 py-7 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="eyebrow">{c.eyebrow}</p>
            <h2 id="traders-title" className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
              {c.title}
            </h2>
            <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">{c.body}</p>
          </div>
          <a href={tradersUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary shrink-0">
            {c.cta}
            <ArrowUpRight className="btn-icon size-4" />
            <span className="sr-only"> ({ui.newTab})</span>
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
