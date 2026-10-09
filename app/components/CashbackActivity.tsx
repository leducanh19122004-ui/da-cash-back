'use client';
import { useEffect, useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { extraTranslations } from '../translations';
import { exchanges } from '../data/exchanges';
import {
  USE_MOCK_CASHBACK_DATA,
  PUBLISHED_STATS,
  CashbackTransaction,
  fetchCashbackStats,
  fetchRecentTransactions,
  getSampleTransactions,
  formatRelativeTime,
  SupportedLang,
} from '../lib/cashback';
import { Reveal, Section, SectionHeader, cn, stripEmoji } from './ui';

type Load<T> = { state: 'loading' } | { state: 'error' } | { state: 'ready'; data: T };

const usdt = (n: number) => `${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`;

export default function CashbackActivity() {
  const { lang, ui, t } = useLang();
  const ac = extraTranslations[lang]?.activity ?? extraTranslations.vi.activity;
  const hc = extraTranslations[lang]?.heroCard ?? extraTranslations.vi.heroCard;
  const r = ui.record;

  const [stats, setStats] = useState(PUBLISHED_STATS);
  const [rows, setRows] = useState<Load<CashbackTransaction[]>>(() =>
    USE_MOCK_CASHBACK_DATA ? { state: 'ready', data: getSampleTransactions() } : { state: 'loading' },
  );
  // Relative times are rendered only on the client (avoids hydration mismatch).
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setNow(Date.now()));
    if (USE_MOCK_CASHBACK_DATA) return () => cancelAnimationFrame(raf);
    let cancelled = false;
    fetchCashbackStats()
      .then((s) => !cancelled && setStats((p) => ({ ...p, ...s })))
      .catch(() => {});
    fetchRecentTransactions()
      .then((data) => !cancelled && setRows({ state: 'ready', data }))
      .catch(() => !cancelled && setRows({ state: 'error' }));
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  const metrics = [
    { label: ac.totalLabel, value: stats.totalCashback, fmt: usdt },
    { label: ac.monthLabel, value: stats.monthCashback, fmt: usdt },
    { label: ac.verifiedLabel, value: stats.verifiedAccounts, fmt: (n: number) => n.toLocaleString('en-US') },
  ];

  return (
    <Section id="cashback-activity" labelledBy="record-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader id="record-title" eyebrow={r.eyebrow} title={r.title} lead={r.lead} />
        <p className="shrink-0 font-mono text-[0.6875rem] tracking-[0.12em] text-faint uppercase">
          {r.cadence}
          {stats.lastUpdated ? ` · ${stats.lastUpdated}` : ''}
        </p>
      </div>

      {/* Ledger of aggregate figures */}
      <Reveal className="mt-14">
        <div className="hidden grid-cols-[1.6fr_1fr_1fr] gap-6 border-b border-line pb-3 font-mono text-[0.625rem] tracking-[0.12em] text-faint uppercase md:grid">
          <span>{r.colMetric}</span>
          <span>{r.colValue}</span>
          <span>{r.colStatus}</span>
        </div>
        <dl>
          {metrics.map((m) => {
            const live = m.value !== null;
            return (
              <div
                key={m.label}
                className="grid grid-cols-2 gap-x-6 gap-y-2 border-b border-line py-6 md:grid-cols-[1.6fr_1fr_1fr] md:items-baseline"
              >
                <dt className="col-span-2 text-lg font-medium md:col-span-1">{m.label}</dt>
                <dd className={cn('tabular-nums', live ? 'text-3xl font-semibold tracking-tight' : 'text-faint')}>
                  {live ? m.fmt(m.value!) : <span className="font-mono text-sm tracking-wider uppercase">{r.pendingValue}</span>}
                </dd>
                <dd className="text-sm">
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden className={cn('size-1.5 rounded-full', live ? 'bg-gold' : 'border border-faint')} />
                    <span className={live ? 'text-fg' : 'text-muted'}>
                      {live ? stats.reportingPeriod ?? r.cadence : r.pendingStatus}
                    </span>
                  </span>
                </dd>
              </div>
            );
          })}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 border-b border-line py-6 md:grid-cols-[1.6fr_1fr_1fr] md:items-baseline">
            <dt className="col-span-2 text-lg font-medium md:col-span-1">
              {hc.exchangesLabel}
              <span className="mt-1 block text-xs text-faint">{r.supportedNote}</span>
            </dt>
            <dd className="text-3xl font-semibold tracking-tight tabular-nums">{exchanges.length}</dd>
            <dd className="text-sm">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-gold" />
                {r.liveStatus}
              </span>
            </dd>
          </div>
        </dl>
      </Reveal>

      {/* Recent activity */}
      <Reveal className="mt-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="h-card">{ac.liveFeedTitle}</h3>
          {USE_MOCK_CASHBACK_DATA ? (
            <span className="inline-flex items-center rounded-[var(--radius-sm)] border border-gold-line px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.12em] text-gold uppercase">
              {r.sampleBadge}
            </span>
          ) : null}
        </div>
        {USE_MOCK_CASHBACK_DATA ? <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{r.sampleNote}</p> : null}

        <div className="mt-6">
          {rows.state === 'loading' ? (
            <p className="flex items-center gap-3 border-y border-line py-8 text-sm text-muted" role="status">
              <span className="spinner text-gold" aria-hidden />
              {r.loading}
            </p>
          ) : rows.state === 'error' ? (
            <p className="border-y border-line py-8 text-sm text-muted" role="alert">
              {r.error}
            </p>
          ) : rows.data.length === 0 ? (
            <p className="border-y border-line py-8 text-sm text-muted">{r.empty}</p>
          ) : (
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                {ac.liveFeedTitle}
                {USE_MOCK_CASHBACK_DATA ? ` — ${r.sampleBadge}` : ''}
              </caption>
              <thead>
                <tr className="border-b border-line font-mono text-[0.625rem] tracking-[0.12em] text-faint uppercase">
                  <th scope="col" className="pb-3 font-normal">
                    {r.colExchange}
                  </th>
                  <th scope="col" className="hidden pb-3 font-normal sm:table-cell">
                    {r.colAccount}
                  </th>
                  <th scope="col" className="hidden pb-3 font-normal md:table-cell">
                    {r.colTime}
                  </th>
                  <th scope="col" className="pb-3 text-right font-normal">
                    {r.colAmount}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.data.map((tx) => {
                  const when = now ? formatRelativeTime(tx.timestampMs, lang as SupportedLang) : '';
                  const market = tx.type === 'crypto' ? stripEmoji(t.exchanges.crypto) : stripEmoji(t.exchanges.forex);
                  return (
                    <tr key={tx.id} className="border-b border-line align-top">
                      <td className="py-4 pr-4">
                        <span className="block font-medium">{tx.exchange}</span>
                        <span className="font-mono text-[0.625rem] tracking-[0.12em] text-faint uppercase">{market}</span>
                        {/* Small screens: account + time under the exchange */}
                        <span className="mt-1 block truncate text-xs text-muted sm:hidden">{tx.maskedAccount}</span>
                        <span className="block text-xs text-faint md:hidden">{when}</span>
                      </td>
                      <td className="hidden max-w-[14rem] truncate py-4 pr-4 font-mono text-sm text-muted sm:table-cell">
                        {tx.maskedAccount}
                      </td>
                      <td className="hidden py-4 pr-4 text-sm whitespace-nowrap text-muted md:table-cell">{when}</td>
                      <td className="py-4 text-right font-medium whitespace-nowrap tabular-nums">+{usdt(tx.amount)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2 text-xs leading-relaxed text-faint md:flex-row md:justify-between md:gap-8">
          <p>{ac.privacyNote}</p>
          <p className="max-w-xl md:text-right">{USE_MOCK_CASHBACK_DATA ? ac.disclaimer : ac.disclaimerMock}</p>
        </div>
      </Reveal>
    </Section>
  );
}
