'use client';
import { useLang } from '../contexts/LanguageContext';
import { exchanges } from '../data/exchanges';
import { ArrowRight, Check, stripEmoji } from './ui';

/** Highest published rate per market, read from the partner list itself. */
function marketSummary(type: 'crypto' | 'forex') {
  const list = exchanges.filter((e) => e.type === type);
  const top = list.reduce((a, b) => (b.cashbackPercent > a.cashbackPercent ? b : a));
  return { count: list.length, topRate: top.cashbackRate };
}

export default function HeroSection() {
  const { t, ui } = useLang();
  const h = t.hero;
  const s = t.stats;
  const crypto = marketSummary('crypto');
  const forex = marketSummary('forex');

  const summary = [
    { label: ui.hero.cryptoLabel, value: ui.hero.upTo(crypto.topRate), meta: ui.hero.partnerCount(crypto.count) },
    { label: ui.hero.forexLabel, value: ui.hero.upTo(forex.topRate), meta: ui.hero.partnerCount(forex.count) },
    { label: s.s3l, value: s.s3v, meta: s.s3s },
    { label: s.s4l, value: s.s4v, meta: s.s4s },
  ];

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
          <p className="eyebrow">{ui.hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="tracking-display mt-6 text-[clamp(2.35rem,5.6vw,4.6rem)] leading-[1.04] font-semibold text-balance"
          >
            <span className="block">
              {h.title1} {h.titleHighlight1}
            </span>{' '}
            <span className="block text-fg/70">
              {h.title2} {h.titleHighlight2}
            </span>
          </h1>
          <p className="measure mt-7 text-lg leading-relaxed text-pretty text-muted md:text-xl">{h.desc}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#exchanges" className="btn btn-primary">
              {h.cta1}
              <ArrowRight className="btn-icon size-4" />
            </a>
            <a href="#exchanges" className="btn btn-secondary">
              {h.cta2}
            </a>
          </div>

          <ul className="mt-10 flex flex-col gap-x-7 gap-y-2.5 text-sm text-muted sm:flex-row sm:flex-wrap">
            {[h.badge1, h.badge2, h.badge3].map((b) => (
              <li key={b} className="inline-flex items-center gap-2">
                <Check className="size-4 shrink-0 text-gold" />
                {stripEmoji(b)}
              </li>
            ))}
          </ul>
        </div>

        {/* Programme summary: every figure is derived from the partner list or existing copy. */}
        <aside aria-labelledby="hero-summary" className="rounded-[var(--radius-md)] border border-line bg-ink-1/80">
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
            <h2 id="hero-summary" className="label">
              {ui.hero.summaryTitle}
            </h2>
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-gold uppercase">DA CASH BACK</span>
          </div>
          <dl>
            {summary.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 border-b border-line px-5 py-5 last:border-b-0 md:px-6"
              >
                <dt className="text-sm text-muted">{row.label}</dt>
                <dd className="text-right text-2xl font-semibold tracking-tight tabular-nums md:text-[1.75rem]">
                  {row.value}
                </dd>
                <dd className="col-span-2 font-mono text-[0.6875rem] tracking-[0.08em] text-faint uppercase">
                  {row.meta}
                </dd>
              </div>
            ))}
          </dl>
          <p className="border-t border-line px-5 py-4 text-xs leading-relaxed text-faint md:px-6">
            {s.note.replace(/^\*\s*/, '')}
          </p>
        </aside>
      </div>
    </section>
  );
}
