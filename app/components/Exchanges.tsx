'use client';
import { useId, useMemo, useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import {
  availability,
  canRegister,
  exchangeCounts,
  exchanges,
  partnerCode,
  registrableExchanges,
  type Availability,
  type Exchange,
} from '@/config/exchanges';
import { confirmedRebatePct, confirmedTerms } from '@/config/rebateTerms';
import { guideFor } from '@/config/guides';
import { formatPct, formatUsd } from '../lib/format';
import { partnerLinkProps, telegramLinkProps, track, trackAttrs } from '../lib/track';
import ExchangeMark from './ExchangeMark';
import { ArrowUpRight, Check, ChevronDown, Clock, Copy, Info, Search, Section, SectionHeader, Send, cn } from './ui';

type MarketFilter = 'all' | 'crypto' | 'forex';
type Panel = 'terms' | 'existing' | null;

const RANK: Record<Availability, number> = { open: 0, linkPending: 1, unavailable: 2 };

function CopyCode({ code, e }: { code: string; e: Exchange }) {
  const { copy } = useLang();
  const c = copy.exchanges;
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label={c.copyLabel(e.name)}
      {...trackAttrs('partner_code_copy', { exchange: e.id })}
      onClick={async () => {
        track('partner_code_copy', { exchange: e.id });
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

function Badge({ tone, children }: { tone: 'gold' | 'muted'; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border px-2 py-1 text-xs leading-none font-medium',
        tone === 'gold' ? 'border-gold-line text-gold-soft' : 'border-line-strong text-muted',
      )}
    >
      {children}
    </span>
  );
}

function Card({ e }: { e: Exchange }) {
  const { copy, ui } = useLang();
  const c = copy.exchanges;
  const [panel, setPanel] = useState<Panel>(null);
  const baseId = useId();
  const av = availability(e);
  const terms = confirmedTerms(e.id);
  const pct = confirmedRebatePct(e.id);
  const code = partnerCode(e);
  const existingRule = terms?.existingAccounts ?? guideFor(e.id)?.refSwitchPolicy ?? null;
  const products = terms?.eligibleProducts?.map((p) => c.productNames[p] ?? p).join(', ') ?? null;

  const toggle = (p: Exclude<Panel, null>) => {
    const next = panel === p ? null : p;
    setPanel(next);
    if (next === 'terms') track('terms_open', { exchange: e.id });
    if (next === 'existing') track('existing_account_open', { exchange: e.id });
  };

  // Terms panel: confirmed values only — a row is omitted while its value is null.
  const termRows: [string, string | null][] = terms
    ? [
        [c.basis, terms.calculationBasis ?? terms.rebateDescription],
        [c.products, products],
        [c.payout, terms.payoutTiming],
        [c.method, terms.payoutMethod],
        [c.existing, terms.existingAccounts],
        [c.effective, terms.effectiveFrom],
      ]
    : [];
  const shownRows = termRows.filter((r): r is [string, string] => !!r[1]);

  const secondaryBtn =
    'inline-flex min-h-10 items-center gap-1.5 rounded-[var(--radius-sm)] px-2 text-sm text-muted transition-colors hover:bg-ink-2 hover:text-fg';

  return (
    <li className={cn('card flex flex-col p-5', av === 'unavailable' && 'bg-ink-0/40')}>
      <div className="flex items-center gap-3.5">
        <ExchangeMark ex={e} />
        <div className="min-w-0">
          <h3 className="truncate text-[1.0625rem] font-semibold">{e.name}</h3>
          <p className="text-sm text-muted">{e.market ? c.market[e.market] : c.marketUnknown}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone={av === 'open' ? 'gold' : 'muted'}>
          <span
            aria-hidden
            className={cn('size-1.5 rounded-full', av === 'open' ? 'bg-gold' : 'border border-faint')}
          />
          {c.availability[av]}
        </Badge>
        {av === 'open' ? (
          <Badge tone={terms ? 'gold' : 'muted'}>
            {terms ? <Check className="size-3" /> : <Clock className="size-3" />}
            {terms ? c.terms.confirmed : c.terms.pending}
          </Badge>
        ) : null}
      </div>

      {av === 'open' ? (
        <>
          {/* Rebate slot: the confirmed rate is the most prominent number on the card. */}
          <div className="mt-4 rounded-[var(--radius-md)] border border-line bg-ink-0/60 px-4 py-3.5">
            <p className="label">{c.rebate}</p>
            {terms ? (
              <>
                <p className="mt-1.5 text-2xl leading-tight font-semibold text-gold-soft tabular-nums">
                  {pct !== null ? c.rateValue(formatPct(pct)) : (terms.rebateRate ?? terms.rebateDescription)}
                </p>
                {pct !== null ? <p className="mt-1 text-sm text-muted">{c.per100(formatUsd(pct))}</p> : null}
              </>
            ) : (
              <p className="mt-1.5 text-[1.0625rem] font-medium text-muted">{c.ratePending}</p>
            )}
          </div>

          {products || terms?.payoutTiming ? (
            <dl className="mt-3 grid gap-1.5 text-sm">
              {products ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">{c.products}</dt>
                  <dd className="text-right">{products}</dd>
                </div>
              ) : null}
              {terms?.payoutTiming ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">{c.payout}</dt>
                  <dd className="text-right">{terms.payoutTiming}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}

          {code ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
              <span className="text-sm text-muted">
                {c.partnerCode}{' '}
                <code className="ml-1 font-mono text-[0.9375rem] font-medium tracking-wide text-gold-soft">{code}</code>
              </span>
              <CopyCode code={code} e={e} />
            </div>
          ) : null}

          {canRegister(e) ? (
            <a {...partnerLinkProps(e, 'card')} className="btn btn-primary mt-4 w-full">
              {c.register(e.name)}
              <ArrowUpRight className="btn-icon size-4" />
              <span className="sr-only"> ({ui.newTab})</span>
            </a>
          ) : null}

          <div className="mt-2 flex flex-wrap items-center justify-between gap-1">
            <button
              type="button"
              aria-expanded={panel === 'existing'}
              aria-controls={`${baseId}-existing`}
              {...trackAttrs('existing_account_open', { exchange: e.id })}
              onClick={() => toggle('existing')}
              className={secondaryBtn}
            >
              {c.existingBtn}
              <span className="sr-only"> — {e.name}</span>
              <ChevronDown className={cn('size-3.5 transition-transform', panel === 'existing' && 'rotate-180')} />
            </button>
            <button
              type="button"
              aria-expanded={panel === 'terms'}
              aria-controls={`${baseId}-terms`}
              {...trackAttrs('terms_open', { exchange: e.id })}
              onClick={() => toggle('terms')}
              className={secondaryBtn}
            >
              {c.termsBtn}
              <span className="sr-only"> — {e.name}</span>
              <ChevronDown className={cn('size-3.5 transition-transform', panel === 'terms' && 'rotate-180')} />
            </button>
          </div>

          <div
            id={`${baseId}-existing`}
            role="region"
            aria-label={c.existingFor(e.name)}
            hidden={panel !== 'existing'}
            className="panel-in mt-2 rounded-[var(--radius-md)] border border-line bg-ink-0/60 p-4 text-[0.9375rem] leading-relaxed"
          >
            {existingRule ? (
              <>
                <p className="text-muted">{c.existingConfirmed(e.name)}</p>
                <p className="mt-1 text-fg">{existingRule}</p>
              </>
            ) : (
              <p className="text-muted">{c.existingBody(e.name)}</p>
            )}
            <a
              {...telegramLinkProps('card_existing')}
              className="link-underline mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-medium"
            >
              <Send className="size-3.5" />
              {c.askTelegram}
              <span className="sr-only"> ({ui.newTab})</span>
            </a>
          </div>

          <div
            id={`${baseId}-terms`}
            role="region"
            aria-label={c.termsFor(e.name)}
            hidden={panel !== 'terms'}
            className="panel-in mt-2 rounded-[var(--radius-md)] border border-line bg-ink-0/60 p-4 text-[0.9375rem] leading-relaxed"
          >
            {shownRows.length ? (
              <>
                <dl className="grid gap-3">
                  {shownRows.map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-sm text-muted">{k}</dt>
                      <dd className="text-fg">{v}</dd>
                    </div>
                  ))}
                </dl>
                {terms?.eligibleProducts?.includes('tokenized-stocks') ? (
                  <p className="mt-3 text-sm text-muted">{c.tokenizedNote}</p>
                ) : null}
              </>
            ) : (
              <>
                <p className="text-muted">{c.termsPendingBody(e.name)}</p>
                <a
                  {...telegramLinkProps('card_terms')}
                  className="link-underline mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-medium"
                >
                  <Send className="size-3.5" />
                  {c.askTelegram}
                  <span className="sr-only"> ({ui.newTab})</span>
                </a>
              </>
            )}
          </div>
        </>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {av === 'linkPending' ? c.linkPendingBody(e.name) : c.unavailableBody(e.name)}
        </p>
      )}
    </li>
  );
}

export default function Exchanges() {
  const { copy, ui } = useLang();
  const c = copy.exchanges;
  const [query, setQuery] = useState('');
  const [market, setMarket] = useState<MarketFilter>('all');
  const [showUnavailable, setShowUnavailable] = useState(false);
  const searchId = useId();
  const toggleId = useId();
  const anyPending = registrableExchanges.some((e) => !confirmedTerms(e.id));

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return exchanges
      .filter(
        (e) =>
          (showUnavailable || availability(e) !== 'unavailable') &&
          // PrimeXBT (market null) shows only under "All".
          (market === 'all' || e.market === market) &&
          (!q || e.name.toLowerCase().includes(q)),
      )
      .map((e, i) => ({ e, i }))
      .sort((a, b) => RANK[availability(a.e)] - RANK[availability(b.e)] || a.i - b.i)
      .map(({ e }) => e);
  }, [query, market, showUnavailable]);

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

      {/* Controls */}
      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <label htmlFor={searchId} className="sr-only">
            {c.searchLabel}
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-faint" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(ev) => setQuery(ev.target.value)}
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
          <label htmlFor={toggleId} className="inline-flex min-h-10 cursor-pointer items-center gap-2.5 text-sm text-muted">
            <input
              id={toggleId}
              type="checkbox"
              role="switch"
              checked={showUnavailable}
              onChange={(ev) => setShowUnavailable(ev.target.checked)}
              className="switch"
            />
            {c.showUnavailable}
          </label>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {c.shown(list.length)}
      </p>

      {/* Only while no Forex exchange is open for registration. */}
      {market === 'forex' && !exchanges.some((e) => e.market === 'forex' && canRegister(e)) ? (
        <p className="mt-6 flex items-start gap-2.5 rounded-[var(--radius-md)] border border-line bg-ink-0/40 px-4 py-3 text-sm text-muted">
          <Info className="mt-0.5 size-4 shrink-0 text-gold" />
          {c.forexNote}
        </p>
      ) : null}

      {list.length ? (
        <ul className="mt-6 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <Card key={e.id} e={e} />
          ))}
        </ul>
      ) : (
        <div className="card mt-6 px-4 py-10 text-center md:px-6">
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

      {/* One section-level note explains pending terms (cards don't repeat it). */}
      {anyPending ? (
        <div
          role="note"
          className="mt-6 flex flex-col gap-3 rounded-[var(--radius-md)] border-l-2 border-gold bg-ink-1 px-5 py-4 md:flex-row md:items-center md:justify-between md:gap-8"
        >
          <div>
            <p className="text-[0.9375rem] font-semibold">{c.pendingTitle}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{c.pendingNote}</p>
          </div>
          <a
            {...telegramLinkProps('exchanges_pending')}
            className="btn btn-sm btn-secondary shrink-0 self-start md:self-auto"
          >
            <Send className="size-3.5" />
            {c.pendingCta}
            <span className="sr-only"> ({ui.newTab})</span>
          </a>
        </div>
      ) : null}
    </Section>
  );
}
