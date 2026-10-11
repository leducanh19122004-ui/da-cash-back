'use client';
import { useLang } from '../contexts/LanguageContext';
import { isPublicMetric, rewardRecord, type Metric } from '@/config/metrics';
import { Reveal, Section, SectionHeader, cn } from './ui';

const fmt = (m: Metric) =>
  typeof m.value === 'number'
    ? `${m.value.toLocaleString('en-US', { maximumFractionDigits: 2 })}${m.unit === 'USDT' ? ' USDT' : ''}`
    : String(m.value);

export default function RewardRecord() {
  const { copy } = useLang();
  const r = copy.record;

  return (
    <Section id="record" labelledBy="record-title">
      <SectionHeader id="record-title" eyebrow={r.eyebrow} title={r.title} lead={r.lead} />

      <Reveal className="mt-14">
        <div className="hidden grid-cols-[1.6fr_1fr_1fr] gap-6 border-b border-line pb-3 font-mono text-[0.625rem] tracking-[0.12em] text-faint uppercase md:grid">
          <span>{r.colMetric}</span>
          <span>{r.colValue}</span>
          <span>{r.colStatus}</span>
        </div>
        <dl>
          {rewardRecord.map((m) => {
            const live = isPublicMetric(m);
            const status = !live
              ? r.pendingStatus
              : [
                  m.verificationStatus === 'VERIFIED' ? r.verified : r.reconciled,
                  m.reportingPeriod ? r.period(m.reportingPeriod) : null,
                  m.lastUpdated ? r.updated(m.lastUpdated) : null,
                ]
                  .filter(Boolean)
                  .join(' · ');
            return (
              <div
                key={m.id}
                className="grid grid-cols-2 gap-x-6 gap-y-2 border-b border-line py-6 md:grid-cols-[1.6fr_1fr_1fr] md:items-baseline"
              >
                <dt className="col-span-2 text-lg font-medium md:col-span-1">{m.label}</dt>
                <dd className={cn('tabular-nums', live ? 'text-3xl font-semibold tracking-tight' : 'text-faint')}>
                  {live ? fmt(m) : <span className="font-mono text-sm tracking-wider uppercase">{r.pendingValue}</span>}
                </dd>
                <dd className="text-sm">
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden className={cn('size-1.5 rounded-full', live ? 'bg-gold' : 'border border-faint')} />
                    <span className={live ? 'text-fg' : 'text-muted'}>{status}</span>
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>
      </Reveal>
    </Section>
  );
}
