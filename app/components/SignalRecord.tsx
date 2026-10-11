'use client';
import { useLang } from '../contexts/LanguageContext';
import { URLS, signalRecordStatus } from '@/config/ecosystem';
import { ArrowUpRight, Reveal, Section } from './ui';

function trackDashboardClick() {
  try {
    if (typeof window === 'undefined') return;
    const params = { source_site: 'dacashback', target_url: URLS.signalTracking, section: 'signal_record' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.gtag) w.gtag('event', 'dashboard_cta_click', params);
    if (w.fbq) w.fbq('trackCustom', 'dashboard_cta_click', params);
    if (w.plausible) w.plausible('dashboard_cta_click', { props: params });
  } catch {}
}

/** Points to DA Signal Tracking. While the tracker is rebuilt ('building'), no results are claimed. */
export default function SignalRecord() {
  const { copy, ui } = useLang();
  const s = copy.signals;

  return (
    <Section id="signals" labelledBy="signals-title">
      <Reveal>
        <article className="relative overflow-hidden rounded-[var(--radius-md)] border border-line bg-ink-1 p-6 md:p-12">
          <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">{s.eyebrow}</p>
              <h2 id="signals-title" className="h-section mt-5">
                {s.title}
              </h2>
              <p className="measure mt-5 text-lg leading-relaxed text-pretty text-muted">
                {signalRecordStatus === 'live' ? s.bodyLive : s.bodyBuilding}
              </p>
            </div>
            <div className="lg:justify-self-end">
              <a
                href={URLS.signalTracking}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackDashboardClick}
                className="btn btn-gold"
              >
                {s.cta}
                <ArrowUpRight className="btn-icon size-4" />
                <span className="sr-only"> ({ui.newTab})</span>
              </a>
            </div>
          </div>
          <p className="relative mt-10 border-t border-line pt-5 text-xs leading-relaxed text-faint">{s.disclaimer}</p>
        </article>
      </Reveal>
    </Section>
  );
}
