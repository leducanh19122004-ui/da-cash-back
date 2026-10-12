'use client';
import { useId, useMemo, useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { canRegister, exchangeCounts, exchanges, partnerCode, type Exchange } from '@/config/exchanges';
import { isPublishedTerms, termsFor } from '@/config/rebateTerms';
import { guideFor } from '@/config/guides';
import ExchangeMark from './ExchangeMark';
import { ArrowUpRight, Check, ChevronDown, Copy, Info, Search, Section, SectionHeader, cn } from './ui';

type MarketFilter = 'all' | 'crypto' | 'forex';

function CopyCode({ code, name }: { code: string; name: string }) {
  const { copy } = useLang();
  const c = copy.exchanges;
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label={c.copyLabel(name)}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {
          /* clipboard unavailable: the code stays visible to copy by hand */
        }
      }}
      className="inline-flex min-h-9 items-center gap-1.5 rounded-[var(--radius-sm)] border border-line px-2.5 text-[0.8125rem] text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      {done ? <Check className="size-3.5 text-gold" /> : <Copy className="size-3.5" />}
      <span aria-live="polite">{done ? c.copied : c.copy}</span>
    </button>
  );
}

function Row({ e }: { e: Exchange }) {
  const { copy, ui } = useLang();
  const c = copy.exchanges;
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const code = partnerCode(e);
  const terms = termsFor(e.id);
  const live = !!terms && isPublishedTerms(terms);
  const guide = guideFor(e.id);
  const partner = e.partnershipStatus === 'active';

  const statusDot = partner ? 'bg-gold' : e.partnershipStatus === 'new_deal_pending' ? 'border border-gold' : 'border border-faint';

  // Register only when canRegister (status 'available' + https URL). Otherwise
  // the link status text, or nothing for 'none'. Never a '#' or empty href.
  const action = canRegister(e) ? (
    <a
      href={e.referralUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-sm btn-primary min-h-10 px-4 whitespace-nowrap"
    >
      {c.register}
      <ArrowUpRight className="btn-icon size-3.5" />
      <span className="sr-only">
        {' '}
        — {e.name} ({ui.newTab})
      </span>
    </a>
  ) : c.link[e.referralLinkStatus] ? (
    <span className="text-sm text-muted">{c.link[e.referralLinkStatus]}</span>
  ) : null;

  const detailRows: [string, string | null][] = live && terms
    ? [
        [c.rate, terms.rebateRate],
        [c.basis, terms.calculationBasis ?? terms.rebateDescription],
        [c.products, terms.eligibleProducts?.map((p) => c.productNames[p] ?? p).join(', ') ?? null],
        [c.payout, terms.payoutTiming],
        [c.method, terms.payoutMethod],
        [c.existing, terms.existingAccounts ?? guide?.refSwitchPolicy ?? null],
      ]
    : [];

  return (
    <li className={cn('border-b border-line last:border-b-0', e.partnershipStatus === 'paused' && 'bg-ink-0/40')}>
      <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 px-4 py-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)_auto_auto] md:px-6">
        <div className="flex min-w-0 items-center gap-3.5">
          <ExchangeMark ex={e} />
          <div className="min-w-0">
            <h3 className="truncate text-[1.0625rem] font-semibold">{e.name}</h3>
            <p className="text-sm text-muted">{e.market ? c.market[e.market] : c.marketUnknown}</p>
          </div>
        </div>

        <p className="order-3 col-span-2 inline-flex items-center gap-2 text-sm md:order-none md:col-span-1">
          <span aria-hidden className={cn('size-2 shrink-0 rounded-full', statusDot)} />
          <span className={partner ? 'text-fg' : 'text-muted'}>{c.partnership[e.partnershipStatus]}</span>
        </p>

        <div className="order-4 col-span-2 md:order-none md:col-span-1 md:text-right">{action}</div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex min-h-10 items-center gap-1.5 justify-self-end rounded-[var(--radius-sm)] px-2.5 text-sm text-muted transition-colors hover:bg-ink-2 hover:text-fg"
        >
          {c.details}
          <span className="sr-only"> — {e.name}</span>
          <ChevronDown className={cn('size-3.5 transition-transform duration-[var(--dur-fast)]', open && 'rotate-180')} />
        </button>
      </div>

      <div
        id={panelId}
        role="region"
        aria-label={c.detailsFor(e.name)}
        hidden={!open}
        className="panel-in px-4 pb-5 md:px-6 md:pl-[4.375rem]"
      >
        <div className="rounded-[var(--radius-md)] border border-line bg-ink-0/60 p-4 md:p-5">
          {code ? (
            <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line pb-4">
              <span className="text-sm text-muted">{c.partnerCode}</span>
              <code className="font-mono text-[0.9375rem] font-medium tracking-wide text-gold-soft">{code}</code>
              <CopyCode code={code} name={e.name} />
            </div>
          ) : null}
          {detailRows.length ? (
            <dl className="grid gap-x-8 gap-y-3 text-[0.9375rem] sm:grid-cols-2">
              {detailRows.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-sm text-muted">{k}</dt>
                  <dd className={v ? 'text-fg' : 'text-faint'}>{v ?? c.askTeam}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-[0.9375rem] leading-relaxed text-muted">
              {e.partnershipStatus === 'active'
                ? c.termsPending(e.name)
                : e.partnershipStatus === 'new_deal_pending'
                  ? c.termsNew(e.name)
                  : c.termsPaused(e.name)}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default function Exchanges() {
  const { copy } = useLang();
  const c = copy.exchanges;
  const [query, setQuery] = useState('');
  const [market, setMarket] = useState<MarketFilter>('all');
  const [showPaused, setShowPaused] = useState(false);
  const searchId = useId();
  const pausedId = useId();

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return exchanges.filter(
      (e) =>
        (showPaused || e.partnershipStatus !== 'paused') &&
        // PrimeXBT (market null) shows only under "All".
        (market === 'all' || e.market === market) &&
        (!q || e.name.toLowerCase().includes(q)),
    );
  }, [query, market, showPaused]);

  const filters: { id: MarketFilter; label: string }[] = [
    { id: 'all', label: c.filterAll },
    { id: 'crypto', label: c.market.crypto },
    { id: 'forex', label: c.market.forex },
  ];

  return (
    <Section id="exchanges" labelledBy="exchanges-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader id="exchanges-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
        <p className="shrink-0 text-sm text-muted lg:max-w-xs lg:text-right">{c.count(exchangeCounts)}</p>
      </div>

      <div className="card mt-12 overflow-hidden">
        {/* Controls */}
        <div className="flex flex-col gap-4 border-b border-line px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="relative w-full md:max-w-xs">
            <label htmlFor={searchId} className="sr-only">
              {c.searchLabel}
            </label>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-faint" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={c.searchPlaceholder}
              autoComplete="off"
              className="field min-h-11 pl-10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div role="group" aria-label={c.filterLabel} className="flex gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={market === f.id}
                  onClick={() => setMarket(f.id)}
                  className="chip"
                >
                  {f.label}
                </button>
              ))}
            </div>
            <label htmlFor={pausedId} className="inline-flex min-h-10 cursor-pointer items-center gap-2.5 text-sm text-muted">
              <input
                id={pausedId}
                type="checkbox"
                role="switch"
                checked={showPaused}
                onChange={(e) => setShowPaused(e.target.checked)}
                className="switch"
              />
              {c.showPaused}
            </label>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {c.shown(list.length)}
        </p>

        {market === 'forex' ? (
          <p className="flex items-start gap-2.5 border-b border-line bg-ink-0/40 px-4 py-3 text-sm text-muted md:px-6">
            <Info className="mt-0.5 size-4 shrink-0 text-gold" />
            {c.forexNote}
          </p>
        ) : null}

        {list.length ? (
          <ul>
            {list.map((e) => (
              <Row key={e.id} e={e} />
            ))}
          </ul>
        ) : (
          <div className="px-4 py-10 text-center md:px-6">
            <p className="text-muted">{c.empty}</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setMarket('all');
              }}
              className="btn btn-sm btn-secondary mt-4"
            >
              {c.clear}
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-muted">
        <Info className="mt-0.5 size-4 shrink-0 text-faint" />
        {c.note}
      </p>
    </Section>
  );
}
