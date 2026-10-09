'use client';
import { useLang } from '../contexts/LanguageContext';
import { signalTeaserTranslations } from '../translations';
import { ArrowUpRight, Reveal, Section } from './ui';

const DASHBOARD_URL = 'https://da-signal-tracking.vercel.app/';

function trackDashboardClick() {
  try {
    if (typeof window === 'undefined') return;
    const params = { source_site: 'dacashback', target_url: DASHBOARD_URL, section: 'signal_teaser' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.gtag) w.gtag('event', 'dashboard_cta_click', params);
    if (w.fbq) w.fbq('trackCustom', 'dashboard_cta_click', params);
    if (w.plausible) w.plausible('dashboard_cta_click', { props: params });
  } catch {}
}

/** DA Network ecosystem: parent-brand link + the public signal-tracking teaser. */
export default function MemberPrivilegesSection() {
  const { lang, ui } = useLang();
  const s = signalTeaserTranslations[lang] ?? signalTeaserTranslations.vi;
  const networkUrl = `https://danetwork.asia/${lang}`;

  return (
    <Section id="ecosystem" labelledBy="ecosystem-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <p className="eyebrow">{ui.ecosystem.eyebrow}</p>
          <h2 id="ecosystem-title" className="h-section mt-5">
            {ui.ecosystem.title}
          </h2>
          <p className="measure mt-5 text-lg leading-relaxed text-pretty text-muted">{ui.ecosystem.body}</p>
          <a href={networkUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-8">
            {ui.ecosystem.visit}
            <ArrowUpRight className="btn-icon size-4" />
            <span className="sr-only"> ({ui.newTab})</span>
          </a>
        </div>

        <Reveal>
          <article
            aria-labelledby="tracking-title"
            className="relative h-full overflow-hidden rounded-[var(--radius-md)] border border-line bg-ink-1 p-6 md:p-10"
          >
            <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="label">{ui.ecosystem.trackingLabel}</p>
                <p className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase">
                  <span aria-hidden className="size-1.5 rounded-full bg-gold" />
                  {s.badge.replace(/^●\s*/, '')}
                </p>
              </div>
              <h3 id="tracking-title" className="h-card mt-8 max-w-xl text-balance">
                {s.headline}
              </h3>
              <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted">{s.desc}</p>
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackDashboardClick}
                className="btn btn-gold mt-8"
              >
                {s.cta.replace(/\s*→\s*$/, '')}
                <ArrowUpRight className="btn-icon size-4" />
                <span className="sr-only"> ({ui.newTab})</span>
              </a>
              <p className="mt-8 border-t border-line pt-5 text-xs leading-relaxed text-faint">{s.disclaimer}</p>
            </div>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
