'use client';
import { useLang } from '../contexts/LanguageContext';
import { URLS, tradersUrl } from '@/config/ecosystem';
import { Activity, ArrowUpRight, Handshake, Nodes } from './ui';

/**
 * Compact DA ecosystem block near the bottom of the page (V3.3: moved out of
 * the header and away from the registration journey). DA Cashback itself is
 * never described as a membership or a signal provider; Volume Rewards belong
 * to the DA Network Trader Hub.
 */
export default function Ecosystem() {
  const { copy, ui, lang } = useLang();
  const e = copy.ecosystem;

  const meta: Record<string, { href: string; Icon: typeof Nodes; accent: string }> = {
    network: { href: tradersUrl(lang), Icon: Nodes, accent: 'var(--color-accent-network)' },
    affiliate: { href: URLS.affiliate, Icon: Handshake, accent: 'var(--color-accent-affiliate)' },
    signal: { href: URLS.signalTracking, Icon: Activity, accent: 'var(--color-accent-signal)' },
  };

  return (
    <section id="ecosystem" aria-labelledby="ecosystem-title" className="section-quiet border-t border-line">
      <div className="container-site">
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4">
          <h2 id="ecosystem-title" className="text-xl font-semibold">
            {e.title}
          </h2>
          <p className="text-sm text-muted">{e.lead}</p>
        </div>
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {e.items.map((item) => {
            const m = meta[item.id];
            return (
              <li key={item.id}>
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full items-start gap-3 rounded-[var(--radius-md)] border border-line p-4 transition-colors hover:border-line-strong hover:bg-ink-1"
                >
                  <span aria-hidden className="mt-0.5 shrink-0" style={{ color: m.accent }}>
                    <m.Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 font-medium">
                      {item.name}
                      <ArrowUpRight className="size-3.5 text-faint" />
                    </span>
                    <span className="mt-0.5 block text-sm leading-snug text-muted">{item.tag}</span>
                  </span>
                  <span className="sr-only"> ({ui.newTab})</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
