'use client';
import { useLang } from '../contexts/LanguageContext';
import { safetyTranslations } from '../translations';
import { Check, Cross, Reveal, Section, SectionHeader } from './ui';

const SUPPORT_TELEGRAM = 'https://t.me/jacksondz';

export default function TrustCompactSection() {
  const { lang, ui } = useLang();
  const tr = safetyTranslations[lang] ?? safetyTranslations.vi;
  const supportHref = tr.warningLink || SUPPORT_TELEGRAM;

  return (
    <Section id="account-security" labelledBy="security-title" rhythm="standard">
      <SectionHeader id="security-title" eyebrow={tr.badge} title={tr.title} lead={tr.desc} />

      <Reveal className="mt-14 grid border-t border-line md:grid-cols-2">
        <div className="border-b border-line py-8 md:border-r md:border-b-0 md:pr-10">
          <p className="label">{ui.security.mayLabel}</p>
          <h3 className="h-card mt-3">{tr.canNeedTitle}</h3>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {tr.canNeed.map((item) => (
              <li key={item} className="flex items-start gap-3 py-3.5 text-[0.9375rem] leading-relaxed">
                <Check className="mt-1 size-4 shrink-0 text-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="py-8 md:pl-10">
          <p className="label">{ui.security.neverLabel}</p>
          <h3 className="h-card mt-3">{tr.neverAskTitle}</h3>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {tr.neverAsk.map((item) => (
              <li key={item} className="flex items-start gap-3 py-3.5 text-[0.9375rem] leading-relaxed">
                <Cross className="mt-1 size-4 shrink-0 text-muted" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="mt-4">
        <div role="note" className="border-l-2 border-gold bg-ink-1 px-5 py-5 md:px-7">
          <p className="text-sm font-semibold tracking-wide text-gold uppercase">{tr.warningTitle}</p>
          <p className="mt-2 max-w-4xl text-[0.9375rem] leading-relaxed text-fg/85">
            {tr.warningText}{' '}
            <a href={supportHref} target="_blank" rel="noopener noreferrer" className="link-underline font-medium">
              {ui.security.supportVia}
              <span className="sr-only"> ({ui.newTab})</span>
            </a>
            .
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
