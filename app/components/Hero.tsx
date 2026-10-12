'use client';
import { useLang } from '../contexts/LanguageContext';
import { exchangeCounts, registrableExchanges } from '@/config/exchanges';
import ExchangeMark from './ExchangeMark';
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Receipt, Rebate, Shield } from './ui';

/**
 * V3.2 hero: one title, one sentence, two CTAs. The side panel lists only
 * exchanges that pass `canRegister` (real statuses from config/exchanges.ts)
 * and a three-step flow — no charts, no amounts.
 */
export default function Hero() {
  const { copy, ui } = useLang();
  const h = copy.hero;
  const more = h.more(exchangeCounts);
  const flowIcons = [Receipt, Shield, Rebate];

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative -mt-16 overflow-hidden pt-16 md:-mt-[4.5rem] md:pt-[4.5rem]"
    >
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_35%,black,transparent_65%)]"
      />
      <div className="container-site relative grid items-center gap-12 pt-12 pb-16 md:pt-20 md:pb-24 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow">{h.eyebrow}</p>
          <h1
            id="hero-title"
            className="tracking-display mt-6 max-w-[16ch] text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.04] font-semibold text-balance"
          >
            {h.title}
          </h1>
          <p className="mt-6 max-w-[40rem] text-lg leading-relaxed text-pretty text-muted md:text-xl">{h.sub}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#exchanges" className="btn btn-primary">
              {h.ctaPrimary}
              <ArrowRight className="btn-icon size-4" />
            </a>
            <a href="#how-it-works" className="btn btn-secondary">
              {h.ctaSecondary}
            </a>
          </div>

          <ul className="mt-9 flex flex-col gap-x-7 gap-y-2.5 text-[0.9375rem] text-muted sm:flex-row sm:flex-wrap">
            {h.trust.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <Check className="size-4 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <aside aria-labelledby="hero-panel" className="card">
          <div className="px-5 pt-5 md:px-6 md:pt-6">
            <h2 id="hero-panel" className="label">
              {h.panelTitle}
            </h2>
            {registrableExchanges.length ? (
              <ul className="mt-4 grid gap-2.5">
                {registrableExchanges.map((e) => (
                  <li
                    key={e.id}
                    className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-line bg-ink-0/60 px-3.5 py-3"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <ExchangeMark ex={e} size="sm" />
                      <span className="truncate font-medium">{e.name}</span>
                    </span>
                    <a
                      href={e.referralUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-gold min-h-9 px-3.5 whitespace-nowrap"
                    >
                      {h.register}
                      <ArrowUpRight className="btn-icon size-3.5" />
                      <span className="sr-only">
                        {' '}
                        — {e.name} ({ui.newTab})
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[0.9375rem] text-muted">{h.panelEmpty}</p>
            )}
            {more ? (
              <a
                href="#exchanges"
                className="mt-3 inline-flex min-h-10 items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
              >
                {more}
                <ChevronRight className="size-3.5" />
                <span className="sr-only"> — {h.allExchanges}</span>
              </a>
            ) : null}
          </div>

          <div className="mt-4 border-t border-line px-5 py-5 md:px-6">
            <h3 className="label">{h.flowTitle}</h3>
            <ol className="mt-4 flex items-start justify-between gap-1">
              {h.flow.map((step, i) => {
                const Icon = flowIcons[i];
                return (
                  <li key={step} className="flex flex-1 items-start">
                    <span className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
                      <span className="icon-tile">
                        <Icon className="size-[1.125rem]" />
                      </span>
                      <span className="text-sm leading-snug text-fg/90">{step}</span>
                    </span>
                    {i < h.flow.length - 1 ? (
                      <ArrowRight className="mt-3 size-4 shrink-0 text-faint" />
                    ) : null}
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 text-sm text-muted">{h.flowNote}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
