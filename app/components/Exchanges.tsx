'use client';
import { useLang } from '../contexts/LanguageContext';
import {
  canRegister,
  exchangeCounts,
  newPartnerExchanges,
  partnerExchanges,
  pausedExchanges,
  type Exchange,
} from '@/config/exchanges';
import { ArrowUpRight, Reveal, Section, SectionHeader, cn } from './ui';

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

export default function Exchanges() {
  const { copy, ui } = useLang();
  const c = copy.exchanges;

  const status = (e: Exchange) => {
    const partner = e.partnershipStatus === 'active';
    return (
      <span className="inline-flex items-center gap-2 text-sm whitespace-nowrap">
        <span aria-hidden className={cn('size-1.5 rounded-full', partner ? 'bg-gold' : 'border border-faint')} />
        <span className={partner ? 'text-fg' : 'text-muted'}>{c.partnership[e.partnershipStatus]}</span>
      </span>
    );
  };

  // Register only when the link is 'available' and https (canRegister). Otherwise a
  // neutral link status, or nothing for 'none'. Never a '#' or empty href.
  const action = (e: Exchange) => {
    if (canRegister(e)) {
      return (
        <a href={e.referralUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-gold min-h-9 px-3.5 whitespace-nowrap">
          {c.register}
          <ArrowUpRight className="btn-icon size-3.5" />
          <span className="sr-only">
            {' '}
            — {e.name} ({ui.newTab})
          </span>
        </a>
      );
    }
    const label = c.link[e.referralLinkStatus];
    return label ? <span className="text-[0.8125rem] whitespace-nowrap text-muted">{label}</span> : null;
  };

  const market = (e: Exchange) => (e.market ? c.market[e.market] : c.marketUnknown);

  const groups = [
    { id: 'partners', title: c.groupPartners, list: partnerExchanges },
    { id: 'new', title: c.groupNew, list: newPartnerExchanges },
    { id: 'paused', title: c.groupPaused, list: pausedExchanges },
  ].filter((g) => g.list.length > 0);

  return (
    <Section id="exchanges" labelledBy="exchanges-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader id="exchanges-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
        <p className="shrink-0 font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase">
          {c.count(exchangeCounts)}
        </p>
      </div>

      <Reveal className="mt-12 grid gap-12">
        {groups.map((g) => (
          <div key={g.id}>
            <h3 className="label flex items-baseline gap-3">
              {g.title}
              <span className="font-mono text-faint tabular-nums">{g.list.length}</span>
            </h3>

            {/* Desktop / tablet */}
            <table className="mt-3 hidden w-full border-collapse text-left md:table">
              <caption className="sr-only">
                {c.title} — {g.title}
              </caption>
              <thead>
                <tr className="border-b border-line font-mono text-[0.625rem] tracking-[0.12em] text-faint uppercase">
                  <th scope="col" className="w-[40%] pb-3 font-normal">
                    {c.colExchange}
                  </th>
                  <th scope="col" className="pb-3 font-normal">
                    {c.colMarket}
                  </th>
                  <th scope="col" className="pb-3 font-normal">
                    {c.colStatus}
                  </th>
                  <th scope="col" className="pb-3 text-right font-normal">
                    <span className="sr-only">{c.colAction}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {g.list.map((e) => (
                  <tr key={e.id} className="border-b border-line transition-colors hover:bg-white/[0.015]">
                    <th scope="row" className="py-3 pr-6 font-normal">
                      <span className="flex items-center gap-3">
                        <Mark ex={e} />
                        <span className="font-medium text-fg">{e.name}</span>
                      </span>
                    </th>
                    <td className="py-3 pr-6 font-mono text-[0.6875rem] tracking-[0.1em] text-muted uppercase">
                      {market(e)}
                    </td>
                    <td className="py-3 pr-6">
                      {status(e)}
                    </td>
                    <td className="py-3 pl-4 text-right">{action(e)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile */}
            <ul className="mt-3 border-t border-line md:hidden">
              {g.list.map((e) => (
                <li key={e.id} className="border-b border-line py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <Mark ex={e} />
                      <div className="min-w-0">
                        <p className="font-medium">{e.name}</p>
                        <p className="font-mono text-[0.625rem] tracking-[0.12em] text-faint uppercase">{market(e)}</p>
                      </div>
                    </div>
                    {status(e)}
                  </div>
                  {action(e) ? <div className="mt-3">{action(e)}</div> : null}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="text-xs leading-relaxed text-faint">{c.note}</p>
      </Reveal>
    </Section>
  );
}
