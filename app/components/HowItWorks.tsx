'use client';
import { useLang } from '../contexts/LanguageContext';
import { telegramContact, uidSubmission } from '@/config/contact';
import { ArrowUpRight, Building, ChartLine, IdCard, InView, Rebate, Section, SectionHeader } from './ui';

const ICONS = [Building, IdCard, ChartLine, Rebate];

export default function HowItWorks() {
  const { copy, ui } = useLang();
  const h = copy.how;

  // Step 2 follows the configured UID channel. Today (interim): manually via the DA team on Telegram.
  const uidStep =
    uidSubmission.method === 'form' && uidSubmission.confirmed
      ? h.uidForm
      : uidSubmission.method === 'telegram-bot' && uidSubmission.confirmed
        ? h.uidBot
        : h.uidAdmin(telegramContact.handle);
  const steps = h.steps(uidStep);

  return (
    <Section id="how-it-works" labelledBy="how-title" tone="raised">
      <SectionHeader id="how-title" eyebrow={h.eyebrow} title={h.title} />

      <InView as="ol" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <li key={s.t} className="seq card card-raised flex flex-col p-5 md:p-6" style={{ '--i': i } as React.CSSProperties}>
              <div className="flex items-center justify-between">
                <span className="icon-tile">
                  <Icon />
                </span>
                <span aria-hidden className="font-mono text-sm text-faint tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-5 text-lg leading-snug font-semibold">
                <span className="sr-only">{i + 1}. </span>
                {s.t}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{s.d}</p>
              {i === 1 && uidSubmission.url ? (
                <a
                  href={uidSubmission.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-auto inline-flex min-h-10 items-center gap-1 pt-3 text-sm"
                >
                  {h.uidLink}
                  <ArrowUpRight className="size-3.5" />
                  <span className="sr-only"> ({ui.newTab})</span>
                </a>
              ) : null}
            </li>
          );
        })}
      </InView>

      <div role="note" className="mt-6 rounded-[var(--radius-md)] border-l-2 border-gold bg-ink-0 px-5 py-4 md:px-6">
        <p className="text-[0.9375rem] font-semibold text-gold-soft">{h.responsibleTitle}</p>
        <p className="mt-1 text-[0.9375rem] leading-relaxed text-fg/85">{h.responsible}</p>
      </div>
    </Section>
  );
}
