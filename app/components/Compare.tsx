'use client';
import { useLang } from '../contexts/LanguageContext';
import { URLS, comparison } from '@/config/ecosystem';
import { ArrowUpRight, Reveal, Section, SectionHeader } from './ui';

/** Spec §9 comparison block (same content as the hub). No partner-recruiting copy here. */
export default function Compare() {
  const { copy, ui } = useLang();
  const c = copy.compare;

  return (
    <Section id="compare" labelledBy="compare-title" tone="raised">
      <SectionHeader id="compare-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

      <Reveal className="mt-14">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{c.title}</caption>
          <thead>
            <tr className="border-b border-line-strong align-bottom">
              <td className="hidden w-[22%] pb-4 md:table-cell" />
              <th scope="col" className="w-1/2 pr-4 pb-4 text-lg font-semibold md:w-[39%] md:pr-8">
                <span className="mb-2 block size-1.5 rounded-full bg-gold" aria-hidden />
                {c.colA}
              </th>
              <th scope="col" className="w-1/2 pb-4 text-lg font-semibold text-fg/80 md:w-[39%]">
                <span className="mb-2 block size-1.5 rounded-full border border-faint" aria-hidden />
                {c.colB}
              </th>
            </tr>
          </thead>
          <tbody>
            {c.rows.map((row) => (
              <tr key={row.k} className="border-b border-line align-top">
                <th scope="row" className="hidden py-5 pr-6 font-mono text-[0.6875rem] font-normal tracking-[0.12em] text-faint uppercase md:table-cell">
                  {row.k}
                </th>
                <td className="py-5 pr-4 text-[0.9375rem] leading-relaxed md:pr-8">
                  <span className="mb-1 block font-mono text-[0.625rem] tracking-[0.12em] text-faint uppercase md:hidden">{row.k}</span>
                  {row.a}
                </td>
                <td className="py-5 text-[0.9375rem] leading-relaxed text-muted">
                  <span className="mb-1 block font-mono text-[0.625rem] tracking-[0.12em] text-faint uppercase md:hidden">&nbsp;</span>
                  {row.b}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {comparison.switchingFootnote ? (
          <p className="mt-5 text-xs leading-relaxed text-faint">{comparison.switchingFootnote}</p>
        ) : null}

        <a href={URLS.affiliate} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-10">
          {c.cta}
          <ArrowUpRight className="btn-icon size-4" />
          <span className="sr-only"> ({ui.newTab})</span>
        </a>
      </Reveal>
    </Section>
  );
}
