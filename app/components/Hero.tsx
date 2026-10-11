'use client';
import { useLang } from '../contexts/LanguageContext';
import { exchangeCounts, registrableExchanges } from '@/config/exchanges';
import { ArrowRight, Check } from './ui';

export default function Hero() {
  const { copy } = useLang();
  const h = copy.hero;
  const c = exchangeCounts;
  const secondary = [
    c.linkUpdating ? h.linkUpdating(c.linkUpdating) : null,
    c.newPartners ? h.newPartners(c.newPartners) : null,
    h.paused(c.paused),
  ].filter((x): x is string => !!x);

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative -mt-16 overflow-hidden pt-16 md:-mt-[4.5rem] md:pt-[4.5rem]"
    >
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]"
      />
      <div className="container-site relative grid items-center gap-12 pt-10 pb-14 md:pt-20 md:pb-20 lg:min-h-[calc(88dvh-4.5rem)] lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow">{h.eyebrow}</p>
          <h1
            id="hero-title"
            className="tracking-display mt-6 text-[clamp(2.35rem,5.6vw,4.6rem)] leading-[1.04] font-semibold text-balance"
          >
            <span className="block">{h.title1}</span> <span className="block text-fg/70">{h.title2}</span>
          </h1>
          <p className="measure mt-7 text-lg leading-relaxed text-pretty text-muted md:text-xl">
            {h.sub}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#exchanges" className="btn btn-primary">
              {h.ctaPrimary}
              <ArrowRight className="btn-icon size-4" />
            </a>
            <a href="#how-it-works" className="btn btn-secondary">
              {h.ctaSecondary}
            </a>
          </div>

          <ul className="mt-10 flex flex-col gap-x-7 gap-y-2.5 text-sm text-muted sm:flex-row sm:flex-wrap">
            {h.trust.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <Check className="size-4 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-faint">
            {h.trustNote}{' '}
            <a href="#safety" className="link-underline text-muted hover:text-fg">
              {copy.safety.eyebrow}
            </a>
          </p>
        </div>

        {/* Exchange summary: counts are derived from config/exchanges.ts; no rates or totals. */}
        <aside aria-labelledby="hero-summary" className="rounded-[var(--radius-md)] border border-line bg-ink-1/80">
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
            <h2 id="hero-summary" className="label">
              {h.cardTitle}
            </h2>
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-gold uppercase">{h.cardBrand}</span>
          </div>

          <div className="border-b border-line px-5 py-5 md:px-6">
            <p className="text-2xl font-semibold tracking-tight md:text-[1.75rem]">{h.open(c.open)}</p>
            {registrableExchanges.length ? (
              <p className="mt-1 font-mono text-[0.6875rem] tracking-[0.08em] text-faint uppercase">
                {registrableExchanges.map((e) => e.name).join(' · ')}
              </p>
            ) : null}
            <ul className="mt-4">
              {secondary.map((item) => (
                <li key={item} className="border-b border-line py-2.5 text-[0.9375rem] text-muted last:border-b-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="px-5 py-5 md:px-6">
            <p className="label">{h.termsLabel}</p>
            <p className="mt-2 text-[0.9375rem] text-muted">{h.termsBody}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
