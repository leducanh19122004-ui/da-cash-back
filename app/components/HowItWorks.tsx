'use client';
import { useLang } from '../contexts/LanguageContext';
import { telegramContact, uidSubmission } from '@/config/contact';
import { telegramLinkProps, track, trackAttrs } from '../lib/track';
import { ArrowUpRight, Building, IdCard, InView, Rebate, Refresh, Section, SectionHeader, Send } from './ui';

const ICONS = [Building, IdCard, Rebate];

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
    <Section id="how-it-works" labelledBy="how-title">
      <SectionHeader id="how-title" eyebrow={h.eyebrow} title={h.title} />

      <InView as="ol" className="mt-12 grid gap-4 md:grid-cols-3">
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
                  {...trackAttrs('telegram_support_click', { placement: 'how_uid' })}
                  onClick={() => track('telegram_support_click', { placement: 'how_uid' })}
                  className="link-underline mt-auto inline-flex min-h-10 items-center gap-1 self-start pt-3 text-sm"
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

      {/* Existing exchange users: separate from the 3-step new-account flow. Targeted by #existing-account. */}
      <div
        id="existing-account"
        className="mt-6 flex scroll-mt-24 flex-col gap-5 rounded-[var(--radius-lg)] border border-line bg-ink-1 p-5 md:flex-row md:items-start md:justify-between md:gap-10 md:p-6"
      >
        <div className="flex gap-4">
          <span className="icon-tile">
            <Refresh />
          </span>
          <div>
            <h3 className="text-lg font-semibold">{h.existingTitle}</h3>
            <ul className="mt-2 grid gap-1.5">
              {h.existingPoints.map((p) => (
                <li key={p} className="text-[0.9375rem] leading-relaxed text-muted">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a {...telegramLinkProps('how_existing')} className="btn btn-secondary shrink-0 self-start">
          <Send className="size-4" />
          {h.existingCta}
          <span className="sr-only"> ({ui.newTab})</span>
        </a>
      </div>
    </Section>
  );
}
