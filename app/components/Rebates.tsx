'use client';
import { useLang } from '../contexts/LanguageContext';
import { telegramContact } from '@/config/contact';
import { cashbackRecord, isPublicMetric, type Metric } from '@/config/metrics';
import { Clock, Info, Lock, Search, Section, SectionHeader, Send, cn } from './ui';

const fmt = (m: Metric) =>
  typeof m.value === 'number'
    ? `${m.value.toLocaleString('en-US', { maximumFractionDigits: 2 })}${m.unit === 'USDT' ? ' USDT' : ''}`
    : String(m.value);

/**
 * Rebate status + payout history.
 * - No lookup form: there is no real lookup, and a UID alone must never
 *   reveal account data (see app/lib/cashbackLookup.ts for the required design).
 * - Payout history: the three payment states are explained as a legend only.
 *   Figures render only for public 'paid' metrics (config/metrics.ts); the
 *   accrued/approved pipeline is never rendered or summed.
 */
export default function Rebates() {
  const { copy, ui } = useLang();
  const r = copy.rebates;
  const published = cashbackRecord.filter(isPublicMetric);

  return (
    <Section id="rebates" labelledBy="rebates-title">
      <SectionHeader id="rebates-title" eyebrow={r.eyebrow} title={r.title} />

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {/* Rebate status */}
        <div className="card flex flex-col p-5 md:p-7">
          <div className="flex items-center gap-3">
            <span className="icon-tile">
              <Search className="size-[1.125rem]" />
            </span>
            <h3 className="text-xl font-semibold">{r.lookupTitle}</h3>
          </div>
          <p role="status" className="mt-6 inline-flex items-center gap-2 self-start rounded-[var(--radius-sm)] border border-line-strong bg-ink-2 px-3 py-1.5 text-sm text-fg">
            <Info className="size-4 text-gold" />
            {r.lookupStatus}
          </p>
          <p className="mt-4 flex gap-2.5 text-[0.9375rem] leading-relaxed text-muted">
            <Lock className="mt-1 size-4 shrink-0 text-faint" />
            {r.lookupBody}
          </p>
          <div className="mt-auto pt-6">
            <a href={telegramContact.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Send className="size-4" />
              {r.lookupCta} ({telegramContact.handle})
              <span className="sr-only"> ({ui.newTab})</span>
            </a>
          </div>
        </div>

        {/* Payout history */}
        <div className="card flex flex-col p-5 md:p-7">
          <div className="flex items-center gap-3">
            <span className="icon-tile">
              <Clock className="size-[1.125rem]" />
            </span>
            <h3 className="text-xl font-semibold">{r.historyTitle}</h3>
          </div>

          <ol className="mt-6 grid gap-3 sm:grid-cols-3">
            {r.states.map((s, i) => (
              <li key={s.id} className="rounded-[var(--radius-md)] border border-line bg-ink-0/60 p-3.5">
                <p className="flex items-center gap-2 text-[0.9375rem] font-semibold">
                  <span
                    aria-hidden
                    className={cn(
                      'size-2 rounded-full',
                      i === 0 ? 'border border-faint' : i === 1 ? 'border border-gold' : 'bg-gold',
                    )}
                  />
                  {s.label}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-faint">{r.statesNote}</p>

          {published.length ? (
            <dl className="mt-6 border-t border-line">
              {published.map((m) => (
                <div key={m.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4">
                  <dt className="text-[0.9375rem] text-muted">{r.metricLabels[m.id] ?? m.label}</dt>
                  <dd className="text-right">
                    <span className="text-2xl font-semibold tabular-nums">{fmt(m)}</span>
                    <span className="block text-xs text-faint">
                      {[
                        m.verificationStatus === 'VERIFIED' ? r.verified : r.reconciled,
                        m.reportingPeriod ? r.period(m.reportingPeriod) : null,
                        m.lastUpdated ? r.updated(m.lastUpdated) : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="mt-6 rounded-[var(--radius-md)] border border-dashed border-line-strong px-4 py-5">
              <p className="font-medium">{r.emptyTitle}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{r.emptyBody}</p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
