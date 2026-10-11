'use client';
import { useEffect, useMemo, useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { availableExchanges, exchangeById } from '@/config/exchanges';
import {
  belowFirstMilestonePolicy,
  exchangesWithTiers,
  publishedTiersFor,
  tierFacts,
  type RewardTier,
} from '@/config/rewardTiers';
import { DEMO_TIERS } from '@/config/demoTiers';
import { InView, Reveal, Section, SectionHeader, cn } from './ui';

// Dead in production builds (NODE_ENV is inlined), so the fixtures are dropped there.
const DEMO_SOURCE: readonly RewardTier[] = process.env.NODE_ENV !== 'production' ? DEMO_TIERS : [];

/** Fired by the exchanges list ("View milestones") to pre-select an exchange here. */
export const VIEW_MILESTONES_EVENT = 'dacashback:view-milestones';

const num = (n: number) => n.toLocaleString('en-US');

/**
 * Local preview only: `?demo=1` on a non-production build. The production
 * bundle compiles this to `false`, so demo tiers can never render there.
 */
function useDemoMode() {
  const [demo, setDemo] = useState(false);
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    const on = new URLSearchParams(window.location.search).get('demo') === '1';
    if (on) requestAnimationFrame(() => setDemo(true));
  }, []);
  return process.env.NODE_ENV !== 'production' && demo;
}

export default function Rewards() {
  const { copy } = useLang();
  const r = copy.rewards;
  const demo = useDemoMode();

  // Exchanges with tiers to show: published ones, or the static demo set.
  const tierMap = useMemo(() => {
    const map = new Map<string, RewardTier[]>();
    if (demo) {
      for (const t of DEMO_SOURCE) map.set(t.exchangeId, [...(map.get(t.exchangeId) ?? []), t]);
    } else {
      for (const id of exchangesWithTiers()) map.set(id, publishedTiersFor(id));
    }
    return map;
  }, [demo]);
  const ids = availableExchanges.map((e) => e.id).filter((id) => tierMap.has(id));

  const [selected, setSelected] = useState<string | null>(null);
  const active = selected && tierMap.has(selected) ? selected : (ids[0] ?? null);
  const tiers = active ? (tierMap.get(active) ?? []) : [];
  const facts = tierFacts(tiers);
  const period = facts.volumePeriod ? r.periods[facts.volumePeriod] : null;
  const products = facts.eligibleProductTypes?.map((p) => r.products[p] ?? p).join(' and ') ?? null;

  useEffect(() => {
    const onView = (e: Event) => setSelected((e as CustomEvent<string>).detail);
    window.addEventListener(VIEW_MILESTONES_EVENT, onView);
    return () => window.removeEventListener(VIEW_MILESTONES_EVENT, onView);
  }, []);

  return (
    <Section id="rewards" labelledBy="rewards-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div>
          <SectionHeader id="rewards-title" eyebrow={r.eyebrow} title={r.title} lead={r.lead(period)} />

          <ul className="mt-10 border-t border-line text-[0.9375rem] leading-relaxed text-muted">
            <li className="border-b border-line py-3.5">
              {facts.calculationBasis ? r.bulletBasis(facts.calculationBasis, products) : r.neutralBasis}
            </li>
            <li className="border-b border-line py-3.5">
              {facts.payoutDays ? r.bulletPayout(facts.payoutDays) : r.neutralPayout}
            </li>
            {belowFirstMilestonePolicy ? (
              <li className="border-b border-line py-3.5">{r.bulletBelowFirst(belowFirstMilestonePolicy)}</li>
            ) : null}
            <li className="border-b border-line py-3.5">{r.rates}</li>
          </ul>
        </div>

        <Reveal>
          <div className="rounded-[var(--radius-md)] border border-line bg-ink-1">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 md:px-7">
              <h3 className="label">{r.ladderTitle}</h3>
              {demo ? (
                <span className="inline-flex items-center rounded-[var(--radius-sm)] border border-gold px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.12em] text-gold uppercase">
                  {r.demoTag}
                </span>
              ) : null}
            </div>

            {ids.length > 0 && active ? (
              <div className="px-5 py-6 md:px-7">
                {ids.length > 1 ? (
                  <div role="group" aria-label={r.exchangeTabs} className="flex flex-wrap border-b border-line">
                    {ids.map((id) => (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={active === id}
                        onClick={() => setSelected(id)}
                        className={cn(
                          'relative min-h-11 px-4 text-sm transition-colors',
                          active === id ? 'text-fg' : 'text-muted hover:text-fg',
                        )}
                      >
                        {exchangeById(id)?.name}
                        <span
                          aria-hidden
                          className={cn(
                            'absolute inset-x-3 -bottom-px h-px origin-left bg-gold transition-transform duration-300',
                            active === id ? 'scale-x-100' : 'scale-x-0',
                          )}
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="font-medium">{exchangeById(active)?.name}</p>
                )}

                <div className="mt-6 flex justify-between gap-4 font-mono text-[0.625rem] tracking-[0.12em] text-faint uppercase">
                  <span>{r.colMilestone(period, facts.volumeCurrency ?? tiers[0]?.volumeCurrency ?? 'USD')}</span>
                  <span>{r.colReward}</span>
                </div>
                {/* Ladder: one rung per milestone, rising from the first. */}
                <InView as="ol" key={`${active}-${demo}`} className="relative mt-3">
                  <span aria-hidden className="seq-line absolute top-3 bottom-3 left-[0.3125rem] w-px origin-top bg-gold-line" />
                  {tiers.map((t, i) => (
                    <li
                      key={t.tierId}
                      className="seq relative flex items-baseline justify-between gap-4 border-b border-line py-4 pl-8 last:border-b-0"
                      style={{ '--i': i } as React.CSSProperties}
                    >
                      <span
                        aria-hidden
                        className="absolute top-[1.4rem] left-0 size-[0.6875rem] rounded-full border border-gold bg-ink-1"
                        style={{ opacity: 0.45 + (0.55 * (i + 1)) / tiers.length }}
                      />
                      <span>
                        <span className="block font-mono text-[0.625rem] tracking-[0.12em] text-faint uppercase">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-xl font-semibold tracking-tight tabular-nums md:text-2xl">
                          {num(t.volumeThreshold ?? 0)}
                        </span>
                      </span>
                      <span className="text-right text-lg font-medium text-gold tabular-nums">
                        {num(t.rewardAmount ?? 0)} {t.rewardCurrency}
                      </span>
                    </li>
                  ))}
                </InView>
              </div>
            ) : (
              <div className="px-5 py-6 md:px-7">
                <p className="text-base font-medium">{r.pendingTitle}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{r.pendingBody}</p>
                {/* The mechanism, without numbers: nothing here is a milestone value. */}
                <InView as="ol" className="relative mt-8">
                  <span aria-hidden className="seq-line absolute top-2 bottom-2 left-[0.3125rem] w-px origin-top bg-gold-line" />
                  {r.howSteps.map((s, i) => (
                    <li key={s.t} className="seq relative pb-6 pl-8 last:pb-0" style={{ '--i': i } as React.CSSProperties}>
                      <span aria-hidden className="absolute top-1.5 left-0 size-[0.6875rem] rounded-full border border-gold bg-ink-1" />
                      <p className="font-medium">{s.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{s.d}</p>
                    </li>
                  ))}
                </InView>
              </div>
            )}
          </div>

          <div role="note" className="mt-4 border-l-2 border-gold bg-ink-1 px-5 py-5 md:px-7">
            <p className="text-sm font-semibold tracking-wide text-gold">{r.boxTitle}</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg/85">{r.boxBody}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
