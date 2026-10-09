'use client';
import { useRef, useState } from 'react';
import { exchanges } from '../data/exchanges';
import { useLang } from '../contexts/LanguageContext';
import { lookupCashback, formatUSD, LookupResult } from '../lib/cashback';
import { ArrowUpRight, Reveal, Section, SectionHeader, stripEmoji } from './ui';

const SUPPORT_TELEGRAM = 'https://t.me/jacksondz';

export default function CashbackLookup() {
  const { t, ui } = useLang();
  const lk = t.lookup;
  const [selectedExchange, setSelectedExchange] = useState('');
  const [uid, setUid] = useState('');
  const [result, setResult] = useState<LookupResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ exchange?: string; uid?: string }>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const validate = () => {
    const next: { exchange?: string; uid?: string } = {};
    if (!selectedExchange) next.exchange = lk.selectPlaceholder.replace(/^-+\s*|\s*-+$/g, '');
    if (!uid.trim()) next.uid = lk.uidPlaceholder;
    else if (uid.trim().length < 4) next.uid = ui.lookup.uidShort;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setResult(null);
    const ex = exchanges.find((x) => x.id === selectedExchange);
    try {
      setResult(await lookupCashback(ex?.name || selectedExchange, uid));
    } finally {
      setLoading(false);
      requestAnimationFrame(() => resultRef.current?.focus());
    }
  };

  return (
    <Section id="cashback-lookup" labelledBy="lookup-title" tone="raised">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <SectionHeader id="lookup-title" eyebrow={lk.badge} title={lk.title} lead={lk.desc} />

        <Reveal>
          <form onSubmit={handleLookup} noValidate className="rounded-[var(--radius-md)] border border-line bg-ink-0 p-5 md:p-8">
            <div className="grid gap-6">
              <div>
                <label htmlFor="lookup-exchange" className="field-label">
                  {lk.selectEx}
                </label>
                <select
                  id="lookup-exchange"
                  value={selectedExchange}
                  aria-invalid={!!errors.exchange}
                  aria-describedby={errors.exchange ? 'lookup-exchange-err' : undefined}
                  onChange={(e) => {
                    setSelectedExchange(e.target.value);
                    setErrors((p) => ({ ...p, exchange: undefined }));
                  }}
                  className="field cursor-pointer"
                >
                  <option value="">{lk.selectPlaceholder}</option>
                  {exchanges.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name} ({ex.type === 'crypto' ? 'Crypto' : 'Forex'})
                    </option>
                  ))}
                </select>
                {errors.exchange ? (
                  <p id="lookup-exchange-err" className="field-error">
                    {errors.exchange}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="lookup-uid" className="field-label">
                  {lk.uidLabel}
                </label>
                <input
                  id="lookup-uid"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  spellCheck={false}
                  value={uid}
                  placeholder={lk.uidPlaceholder}
                  aria-invalid={!!errors.uid}
                  aria-describedby={errors.uid ? 'lookup-uid-err lookup-uid-hint' : 'lookup-uid-hint'}
                  onChange={(e) => {
                    setUid(e.target.value);
                    setErrors((p) => ({ ...p, uid: undefined }));
                  }}
                  className="field font-mono"
                />
                {errors.uid ? (
                  <p id="lookup-uid-err" className="field-error">
                    {errors.uid}
                  </p>
                ) : null}
                <p id="lookup-uid-hint" className="field-hint">
                  {lk.uidHint}
                </p>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary w-full">
                {loading ? <span className="spinner" aria-hidden /> : null}
                {stripEmoji(loading ? lk.loading : lk.btn)}
              </button>
            </div>

            <div ref={resultRef} tabIndex={-1} aria-live="polite" className="outline-none">
              {result ? (
                <div className="mt-8 border-t border-line pt-6">
                  <h3 className="label">{stripEmoji(lk.resultTitle)}</h3>
                  <dl className="mt-3">
                    {[
                      [lk.rExchange, result.exchange],
                      [lk.rUID, result.maskedUid],
                      [lk.rStatus, result.kind === 'manual' ? ui.lookup.statusManual : result.status],
                      ...(result.kind === 'found'
                        ? [
                            [lk.rCashback, formatUSD(result.estimatedCashback)],
                            [lk.rNextPayment, result.nextPayment],
                          ]
                        : []),
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-sm">
                        <dt className="text-muted">{label}</dt>
                        <dd className="text-right font-medium tabular-nums">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  {result.kind === 'manual' ? (
                    <div className="mt-5 border-l-2 border-gold/60 pl-4">
                      <p className="text-sm font-medium">{ui.lookup.noticeTitle}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{ui.lookup.noticeBody}</p>
                      <a
                        href={SUPPORT_TELEGRAM}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-gold mt-4"
                      >
                        {ui.lookup.contactCta}
                        <ArrowUpRight className="btn-icon size-3.5" />
                        <span className="sr-only"> ({ui.newTab})</span>
                      </a>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <p className="mt-6 text-xs leading-relaxed text-faint">{lk.disclaimer}</p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
