'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { registrableExchanges } from '@/config/exchanges';
import { confirmedRebatePct } from '@/config/rebateTerms';
import { formatPct, formatUsd } from '../lib/format';
import { track } from '../lib/track';
import { Info, Section, SectionHeader } from './ui';

/**
 * Parses user input; null when not a number. Volume: commas/spaces/dots-as-groups
 * are thousands separators ("50,000"). Fee rate: a comma is a decimal mark ("0,05").
 */
function parse(raw: string, kind: 'volume' | 'rate'): number | null {
  let s = raw.trim().replace(/\s/g, '');
  if (!s) return null;
  s = kind === 'volume' ? s.replace(/,/g, '') : s.replace(',', '.');
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/**
 * Rebate calculator. Fees = volume × the fee rate the trader enters (no
 * default fee rate). A rebate figure appears ONLY when the chosen exchange has
 * a confirmed numeric rate (config/rebateTerms.ts); today none does.
 */
export default function Calculator() {
  const { copy } = useLang();
  const k = copy.calculator;
  const ids = { ex: useId(), vol: useId(), fee: useId() };
  const [exId, setExId] = useState(registrableExchanges[0]?.id ?? '');
  const [volume, setVolume] = useState('');
  const [fee, setFee] = useState('');
  const tracked = useRef<Set<string>>(new Set());

  const ex = registrableExchanges.find((e) => e.id === exId) ?? null;
  const vol = parse(volume, 'volume');
  const rate = parse(fee, 'rate');
  const volErr = volume.trim() !== '' && (vol === null || vol <= 0);
  const feeErr = fee.trim() !== '' && (rate === null || rate <= 0 || rate >= 100);
  const fees = vol !== null && rate !== null && !volErr && !feeErr ? (vol * rate) / 100 : null;
  const pct = ex ? confirmedRebatePct(ex.id) : null;
  const rebate = fees !== null && pct !== null ? (fees * pct) / 100 : null;

  // One calculator_used event per exchange, the first time a fee estimate is shown.
  useEffect(() => {
    if (fees === null || !ex || tracked.current.has(ex.id)) return;
    tracked.current.add(ex.id);
    track('calculator_used', { exchange: ex.id });
  }, [fees, ex]);

  if (!registrableExchanges.length) return null;

  return (
    <Section id="calculator" labelledBy="calculator-title" tone="raised" rhythm="quiet">
      <SectionHeader id="calculator-title" eyebrow={k.eyebrow} title={k.title} lead={k.lead} />

      <div className="card mt-10 grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
        <div className="grid content-start gap-5 p-5 md:p-7">
          <div>
            <label htmlFor={ids.ex} className="field-label">
              {k.exchange}
            </label>
            <select id={ids.ex} value={exId} onChange={(e) => setExId(e.target.value)} className="field min-h-11">
              {registrableExchanges.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={ids.vol} className="field-label">
              {k.volume}
            </label>
            <input
              id={ids.vol}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              aria-invalid={volErr}
              aria-describedby={`${ids.vol}-hint`}
              className="field min-h-11 tabular-nums"
            />
            <p id={`${ids.vol}-hint`} className={volErr ? 'field-error' : 'field-hint'}>
              {volErr ? k.volumeError : k.volumeHint}
            </p>
          </div>
          <div>
            <label htmlFor={ids.fee} className="field-label">
              {k.fee}
            </label>
            <input
              id={ids.fee}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              aria-invalid={feeErr}
              aria-describedby={`${ids.fee}-hint`}
              className="field min-h-11 tabular-nums"
            />
            <p id={`${ids.fee}-hint`} className={feeErr ? 'field-error' : 'field-hint'}>
              {feeErr ? k.feeError : k.feeHint}
            </p>
          </div>
        </div>

        <div className="flex flex-col border-t border-line bg-ink-0/60 p-5 md:p-7 lg:border-t-0 lg:border-l" aria-live="polite">
          <dl className="grid gap-5">
            <div>
              <dt className="text-sm text-muted">{k.feesOut}</dt>
              <dd className="mt-1">
                {fees !== null ? (
                  <span className="text-2xl font-semibold tabular-nums">{formatUsd(fees)}</span>
                ) : (
                  <span className="text-[0.9375rem] text-faint">{k.emptyOut}</span>
                )}
                <span className="block text-xs text-faint">{k.feesFormula}</span>
              </dd>
            </div>
            <div className="border-t border-line pt-5">
              <dt className="text-sm text-muted">{k.rebateOut}</dt>
              <dd className="mt-1">
                {rebate !== null && pct !== null ? (
                  <>
                    <span className="text-2xl font-semibold text-gold-soft tabular-nums">{formatUsd(rebate)}</span>
                    <span className="block text-xs text-faint">{k.rebateFormula(formatPct(pct))}</span>
                  </>
                ) : ex && pct === null ? (
                  <span className="text-[0.9375rem] text-muted">{k.ratePending(ex.name)}</span>
                ) : (
                  <span className="text-[0.9375rem] text-faint">—</span>
                )}
              </dd>
            </div>
          </dl>
          <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-muted lg:mt-auto lg:pt-6">
            <Info className="mt-0.5 size-4 shrink-0 text-faint" />
            {k.note}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg/85">{k.responsible}</p>
    </Section>
  );
}
