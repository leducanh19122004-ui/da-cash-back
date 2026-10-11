'use client';
import { useRef, useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { exchangeById, registrableExchanges } from '@/config/exchanges';
import { telegramContact } from '@/config/contact';
import { lookupCashbackStatus, type CashbackLookupResult } from '../lib/cashbackLookup';
import { ArrowUpRight, Reveal, Section, SectionHeader } from './ui';

const maskUid = (uid: string) => (uid.length <= 4 ? '••••' : `••••${uid.slice(-4)}`);
const money = (a: { amount: number; currency: string } | null, none: string) =>
  a ? `${a.amount.toLocaleString('en-US', { maximumFractionDigits: 2 })} ${a.currency}` : none;

/** Lists only exchanges open for registration. The adapter sends nothing anywhere while not connected. */
export default function CashbackLookup() {
  const { copy, ui } = useLang();
  const p = copy.lookup;
  const [exchangeId, setExchangeId] = useState('');
  const [uid, setUid] = useState('');
  const [errors, setErrors] = useState<{ exchange?: string; uid?: string }>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ exchange: string; uid: string; data: CashbackLookupResult } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const validate = () => {
    const next: { exchange?: string; uid?: string } = {};
    if (!exchangeId || !registrableExchanges.some((e) => e.id === exchangeId)) next.exchange = p.exchangeError;
    const u = uid.trim();
    if (!u) next.uid = p.uidError;
    else if (u.length < 4) next.uid = p.uidShort;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setResult(null);
    try {
      // The adapter makes no network request while the lookup is not connected.
      const data = await lookupCashbackStatus(exchangeId, uid.trim());
      setResult({ exchange: exchangeById(exchangeId)?.name ?? exchangeId, uid: maskUid(uid.trim()), data });
    } finally {
      setLoading(false);
      requestAnimationFrame(() => resultRef.current?.focus());
    }
  };

  return (
    <Section id="lookup" labelledBy="lookup-title" tone="raised">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <SectionHeader id="lookup-title" eyebrow={p.eyebrow} title={p.title} lead={p.lead} />

        <Reveal>
          <form onSubmit={onSubmit} noValidate className="rounded-[var(--radius-md)] border border-line bg-ink-0 p-5 md:p-8">
            <div className="grid gap-6">
              <div>
                <label htmlFor="lookup-exchange" className="field-label">
                  {p.exchangeLabel}
                </label>
                <select
                  id="lookup-exchange"
                  value={exchangeId}
                  aria-invalid={!!errors.exchange}
                  aria-describedby={errors.exchange ? 'lookup-exchange-err' : undefined}
                  onChange={(e) => {
                    setExchangeId(e.target.value);
                    setErrors((x) => ({ ...x, exchange: undefined }));
                  }}
                  className="field cursor-pointer"
                >
                  <option value="">{p.exchangePlaceholder}</option>
                  {registrableExchanges.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name}
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
                  {p.uidLabel}
                </label>
                <input
                  id="lookup-uid"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  spellCheck={false}
                  maxLength={40}
                  value={uid}
                  placeholder={p.uidPlaceholder}
                  aria-invalid={!!errors.uid}
                  aria-describedby={errors.uid ? 'lookup-uid-err lookup-uid-hint' : 'lookup-uid-hint'}
                  onChange={(e) => {
                    setUid(e.target.value);
                    setErrors((x) => ({ ...x, uid: undefined }));
                  }}
                  className="field font-mono"
                />
                {errors.uid ? (
                  <p id="lookup-uid-err" className="field-error">
                    {errors.uid}
                  </p>
                ) : null}
                <p id="lookup-uid-hint" className="field-hint">
                  {p.uidHint}
                </p>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary w-full">
                {loading ? <span className="spinner" aria-hidden /> : null}
                {loading ? p.checking : p.submit}
              </button>
            </div>

            <div ref={resultRef} tabIndex={-1} aria-live="polite" className="outline-none">
              {result ? (
                <div className="mt-8 border-t border-line pt-6">
                  <dl>
                    {[
                      [p.summaryExchange, result.exchange],
                      [p.summaryUid, result.uid],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-sm">
                        <dt className="text-muted">{k}</dt>
                        <dd className="text-right font-mono font-medium">{v}</dd>
                      </div>
                    ))}
                    {result.data.status === 'ok'
                      ? [
                          [p.resultLinked, result.data.accountLinked ? p.yes : p.no],
                          [p.resultPeriod, result.data.period],
                          [p.resultAccrued, money(result.data.accrued, p.none)],
                          [p.resultApproved, money(result.data.approved, p.none)],
                          [p.resultPaid, money(result.data.paid, p.none)],
                        ].map(([k, v]) => (
                          <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-sm">
                            <dt className="text-muted">{k}</dt>
                            <dd className="text-right font-medium tabular-nums">{v}</dd>
                          </div>
                        ))
                      : null}
                  </dl>

                  {result.data.status === 'unavailable' ? (
                    <div role="status" className="mt-5 border-l-2 border-gold/60 pl-4">
                      <p className="text-sm font-medium">{p.unavailableTitle}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.unavailableBody}</p>
                      <a href={telegramContact.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-gold mt-4">
                        {p.contactCta(telegramContact.handle)}
                        <ArrowUpRight className="btn-icon size-3.5" />
                        <span className="sr-only"> ({ui.newTab})</span>
                      </a>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
