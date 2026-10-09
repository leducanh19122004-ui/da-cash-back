'use client';
import { useState } from 'react';
import { exchanges, Exchange } from '../data/exchanges';
import { useLang } from '../contexts/LanguageContext';
import { ArrowUpRight, Reveal, Section, SectionHeader, cn, stripEmoji } from './ui';

const DEALS_BASE = 'https://danetwork.asia/deals.html';
type Filter = 'all' | 'crypto' | 'forex';

const isLive = (e: Exchange) => e.refLink !== '#';

/** Monochrome initials mark: brand colours are left to the exchanges' own sites. */
function Mark({ ex }: { ex: Exchange }) {
  return (
    <span
      aria-hidden
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-line-strong bg-ink-2 font-mono text-[0.625rem] font-medium tracking-wider text-fg"
    >
      {ex.initials}
    </span>
  );
}

function Status({ live, label }: { live: boolean; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm whitespace-nowrap">
      <span aria-hidden className={cn('size-1.5 rounded-full', live ? 'bg-gold' : 'border border-faint')} />
      <span className={live ? 'text-fg' : 'text-muted'}>{label}</span>
    </span>
  );
}

export default function ExchangesSection() {
  const [filter, setFilter] = useState<Filter>('all');
  const { t, ui } = useLang();
  const ex = t.exchanges;

  // Open programmes first (stable sort keeps the data order within each group).
  const filtered = (filter === 'all' ? exchanges : exchanges.filter((e) => e.type === filter))
    .map((e, i) => ({ e, i }))
    .sort((a, b) => Number(isLive(b.e)) - Number(isLive(a.e)) || a.i - b.i)
    .map(({ e }) => e);
  const tabs: { id: Filter; label: string; n: number }[] = [
    { id: 'all', label: ex.all, n: exchanges.length },
    { id: 'crypto', label: stripEmoji(ex.crypto), n: exchanges.filter((e) => e.type === 'crypto').length },
    { id: 'forex', label: stripEmoji(ex.forex), n: exchanges.filter((e) => e.type === 'forex').length },
  ];

  const market = (e: Exchange) => (e.type === 'crypto' ? stripEmoji(ex.crypto) : stripEmoji(ex.forex));
  const desc = (e: Exchange) => (t.exchangeDesc as Record<string, string>)[e.id] || e.description;

  /** Guide (when available) + details links, then the registration CTA for open programmes. */
  const Actions = ({ e }: { e: Exchange }) => (
    <span className="flex items-center justify-end gap-4 text-[0.8125rem]">
      {e.guideLink !== '#' ? (
        <a href={e.guideLink} target="_blank" rel="noopener noreferrer" className="link-underline text-muted hover:text-fg">
          {ex.guide}
          <span className="sr-only">
            {' '}
            — {e.name} ({ui.newTab})
          </span>
        </a>
      ) : null}
      <a
        href={`${DEALS_BASE}?exchange=${e.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline whitespace-nowrap text-muted hover:text-fg"
      >
        {ex.viewDetails}
        <span className="sr-only">
          {' '}
          — {e.name} ({ui.newTab})
        </span>
      </a>
      {isLive(e) ? (
        <a
          href={e.refLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-gold min-h-9 px-3.5 whitespace-nowrap"
        >
          {ex.register}
          <ArrowUpRight className="btn-icon size-3.5" />
          <span className="sr-only">
            {' '}
            — {e.name} ({ui.newTab})
          </span>
        </a>
      ) : null}
    </span>
  );

  return (
    <Section id="exchanges" labelledBy="exchanges-title">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader id="exchanges-title" eyebrow={ex.badge} title={ex.title} lead={ex.desc} />

        <div role="group" aria-label={ui.exchanges.filterLabel} className="flex shrink-0 border-b border-line">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={filter === tab.id}
              onClick={() => setFilter(tab.id)}
              className={cn(
                'relative min-h-11 px-4 text-sm transition-colors',
                filter === tab.id ? 'text-fg' : 'text-muted hover:text-fg',
              )}
            >
              {tab.label}
              <span className="ml-2 font-mono text-[0.6875rem] text-faint tabular-nums">{tab.n}</span>
              <span
                aria-hidden
                className={cn(
                  'absolute inset-x-3 -bottom-px h-px origin-left bg-gold transition-transform duration-300',
                  filter === tab.id ? 'scale-x-100' : 'scale-x-0',
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {ui.exchanges.count(filtered.length)}
      </p>

      <Reveal className="mt-10">
        {/* Desktop / tablet: one compact line per exchange */}
        <table className="hidden w-full border-collapse text-left md:table">
          <caption className="sr-only">{ex.title}</caption>
          <thead>
            <tr className="border-b border-line font-mono text-[0.625rem] tracking-[0.12em] text-faint uppercase">
              <th scope="col" className="pb-3 font-normal">
                {ui.exchanges.colExchange}
              </th>
              <th scope="col" className="hidden pb-3 font-normal xl:table-cell">
                {ui.exchanges.colMarket}
              </th>
              <th scope="col" className="pb-3 text-right font-normal">
                {ui.exchanges.colRate}
              </th>
              <th scope="col" className="pb-3 pl-8 font-normal">
                {ui.exchanges.colStatus}
              </th>
              <th scope="col" className="pb-3 text-right font-normal">
                <span className="sr-only">{ui.exchanges.colAction}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="border-b border-line transition-colors hover:bg-white/[0.015]">
                <th scope="row" className="py-3 pr-6 font-normal">
                  <div className="flex items-center gap-3">
                    <Mark ex={e} />
                    <span className="w-24 shrink-0 font-medium text-fg">{e.name}</span>
                    <span className="hidden max-w-[22rem] truncate text-sm text-muted lg:inline" title={desc(e)}>
                      {desc(e)}
                    </span>
                    <span className="font-mono text-[0.625rem] tracking-[0.12em] text-faint uppercase xl:hidden">
                      {market(e)}
                    </span>
                  </div>
                </th>
                <td className="hidden py-3 pr-6 font-mono text-[0.6875rem] tracking-[0.1em] text-muted uppercase xl:table-cell">
                  {market(e)}
                </td>
                <td className="py-3 text-right text-xl font-semibold tracking-tight tabular-nums">{e.cashbackRate}</td>
                <td className="py-3 pl-8">
                  <Status live={isLive(e)} label={isLive(e) ? ui.exchanges.available : ex.comingSoon} />
                </td>
                <td className="py-3 pl-4">
                  <Actions e={e} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile: compact rows */}
        <ul className="border-t border-line md:hidden">
          {filtered.map((e) => (
            <li key={e.id} className="border-b border-line py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Mark ex={e} />
                  <div className="min-w-0">
                    <h3 className="font-medium">{e.name}</h3>
                    <p className="font-mono text-[0.625rem] tracking-[0.12em] text-faint uppercase">{market(e)}</p>
                  </div>
                </div>
                <p className="text-2xl leading-none font-semibold tracking-tight tabular-nums">
                  {e.cashbackRate}
                  <span className="sr-only"> {ex.rate}</span>
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <Status live={isLive(e)} label={isLive(e) ? ui.exchanges.available : ex.comingSoon} />
                <Actions e={e} />
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs leading-relaxed text-faint">{stripEmoji(ex.disclaimer)}</p>
      </Reveal>
    </Section>
  );
}
