'use client';
import { useLang } from '../contexts/LanguageContext';
import { URLS, tradersUrl } from '@/config/ecosystem';
import { Activity, ArrowUpRight, Handshake, Nodes, Section, SectionHeader } from './ui';

/**
 * Three separate DA products. Replaces the V3.1 TraderBenefitsLink block.
 * DA Cashback itself is never described as a membership or a signal provider;
 * Volume Rewards belong to the DA Network Trader Hub.
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
    <Section id="ecosystem" labelledBy="ecosystem-title">
      <SectionHeader id="ecosystem-title" eyebrow={e.eyebrow} title={e.title} lead={e.lead} />

      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {e.items.map((item) => {
          const m = meta[item.id];
          return (
            <li key={item.id} className="card flex flex-col p-5 md:p-6">
              <span className="icon-tile" style={{ color: m.accent }}>
                <m.Icon />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{item.name}</h3>
              <p className="mt-1 text-sm font-medium" style={{ color: m.accent }}>
                {item.tag}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>
              <a
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-auto inline-flex min-h-10 items-center gap-1 self-start pt-5 text-sm font-medium"
              >
                {item.cta}
                <ArrowUpRight className="size-3.5" />
                <span className="sr-only"> ({ui.newTab})</span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
