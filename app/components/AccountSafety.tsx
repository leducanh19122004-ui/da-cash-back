'use client';
import { useLang } from '../contexts/LanguageContext';
import { telegramContact } from '@/config/contact';
import { Check, Cross, Reveal, Section, SectionHeader } from './ui';

export default function AccountSafety() {
  const { copy, ui } = useLang();
  const s = copy.safety;

  return (
    <Section id="safety" labelledBy="safety-title">
      <SectionHeader id="safety-title" eyebrow={s.eyebrow} title={s.title} />

      <Reveal className="mt-14 grid border-t border-line md:grid-cols-2">
        <div className="border-b border-line py-8 md:border-r md:border-b-0 md:pr-10">
          <h3 className="h-card">{s.needTitle}</h3>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {s.need.map((item) => (
              <li key={item} className="flex items-start gap-3 py-3.5 text-[0.9375rem] leading-relaxed">
                <Check className="mt-1 size-4 shrink-0 text-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="py-8 md:pl-10">
          <h3 className="h-card">{s.neverTitle}</h3>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {s.never.map((item) => (
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
          <p className="text-sm font-semibold tracking-wide text-gold uppercase">{s.warnTitle}</p>
          <p className="mt-2 max-w-4xl text-[0.9375rem] leading-relaxed text-fg/85">
            {s.warnBody}{' '}
            <a href={telegramContact.url} target="_blank" rel="noopener noreferrer" className="link-underline font-medium">
              {telegramContact.handle}
              <span className="sr-only"> ({ui.newTab})</span>
            </a>
            .
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
