'use client';
import Link from 'next/link';
import { useLang } from '../contexts/LanguageContext';
import { Info, Section } from './ui';

/** Trading risk + programme conditions, readable without expanding anything. */
export default function Disclosures() {
  const { copy } = useLang();
  const d = copy.disclosures;

  return (
    <Section id="disclosures" labelledBy="disclosures-title" rhythm="quiet">
      <p className="eyebrow">{d.eyebrow}</p>
      <h2 id="disclosures-title" className="mt-4 text-2xl font-semibold tracking-tight md:text-[1.75rem]">
        {d.title}
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          { title: d.riskTitle, list: d.risk },
          { title: d.programmeTitle, list: d.programme },
        ].map((block) => (
          <div key={block.title} className="rounded-[var(--radius-lg)] border border-line p-5 md:p-6">
            <h3 className="flex items-center gap-2 font-semibold">
              <Info className="size-4 text-gold" />
              {block.title}
            </h3>
            <ul className="mt-3 grid gap-2.5">
              {block.list.map((line) => (
                <li key={line} className="text-[0.9375rem] leading-relaxed text-muted">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link href="/terms" className="link-underline">
          {d.terms}
        </Link>
        <Link href="/risk-disclaimer" className="link-underline">
          {d.riskLink}
        </Link>
      </p>
    </Section>
  );
}
