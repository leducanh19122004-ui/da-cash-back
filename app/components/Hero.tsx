'use client';
import { useLang } from '../contexts/LanguageContext';
import { exchangeCounts } from '@/config/exchanges';
import { telegramLinkProps } from '../lib/track';
import { ArrowRight, Check, Send } from './ui';

/**
 * V3.3 hero: compact — one headline, one sentence, one primary CTA. The
 * exchange list lives only in #exchanges right below (no duplicate Register
 * buttons here). The live count is derived from the registry.
 */
export default function Hero() {
  const { copy, ui } = useLang();
  const h = copy.hero;

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
      <div className="container-site relative pt-12 pb-14 md:pt-16 md:pb-16">
        <p className="eyebrow">{h.eyebrow}</p>
        <h1
          id="hero-title"
          className="tracking-display mt-6 max-w-[18ch] text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.04] font-semibold text-balance"
        >
          {h.title}
        </h1>
        <p className="mt-6 max-w-[42rem] text-lg leading-relaxed text-pretty text-muted md:text-xl">{h.sub}</p>

        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a href="#exchanges" className="btn btn-primary">
            {h.ctaPrimary}
            <ArrowRight className="btn-icon size-4" />
          </a>
          <a href="#how-it-works" className="link-underline inline-flex min-h-11 items-center text-[0.9375rem]">
            {h.ctaSecondary}
          </a>
        </div>

        {exchangeCounts.open ? (
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-fg/90">
            <span aria-hidden className="size-2 rounded-full bg-gold" />
            {h.live(exchangeCounts.open)}
          </p>
        ) : null}

        <ul className="mt-6 flex flex-col gap-x-7 gap-y-2.5 text-[0.9375rem] text-muted sm:flex-row sm:flex-wrap">
          {h.trust.map((item) => (
            <li key={item} className="inline-flex items-center gap-2">
              <Check className="size-4 shrink-0 text-gold" />
              {item}
            </li>
          ))}
          <li>
            <a
              {...telegramLinkProps('hero')}
              className="inline-flex items-center gap-2 transition-colors hover:text-fg"
            >
              <Send className="size-4 shrink-0 text-gold" />
              {h.support}
              <span className="sr-only"> ({ui.newTab})</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
