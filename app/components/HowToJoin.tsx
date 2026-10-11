'use client';
import { useLang } from '../contexts/LanguageContext';
import { telegramContact, uidSubmission } from '@/config/contact';
import { ArrowRight, ArrowUpRight, InView, Section, SectionHeader } from './ui';

export default function HowToJoin() {
  const { copy, ui } = useLang();
  const j = copy.join;

  // Step 3 follows the configured UID channel. Today: manually via the DA team on Telegram.
  const uidStep =
    uidSubmission.method === 'form' && uidSubmission.confirmed
      ? j.uidForm
      : uidSubmission.method === 'telegram-bot' && uidSubmission.confirmed
        ? j.uidBot
        : j.uidAdmin(telegramContact.handle);
  const steps = j.steps(uidStep);

  return (
    <Section id="join" labelledBy="join-title" tone="raised">
      <SectionHeader id="join-title" eyebrow={j.eyebrow} title={j.title} />

      <InView as="ol" className="relative mt-14 grid gap-0 md:mt-16 md:grid-cols-5 md:gap-6">
        <span
          aria-hidden
          className="seq-line absolute top-0 left-[0.3125rem] h-full w-px origin-top bg-gold-line md:top-[0.3125rem] md:left-0 md:h-px md:w-full md:origin-left"
        />
        {steps.map((s, i) => (
          <li key={s.t} className="seq relative pb-10 pl-8 last:pb-0 md:pt-10 md:pb-0 md:pl-0" style={{ '--i': i } as React.CSSProperties}>
            <span aria-hidden className="absolute top-0 left-0 size-[0.6875rem] rounded-full border border-gold bg-ink-1" />
            <p className="font-mono text-[2.5rem] leading-none font-medium tracking-tight text-fg/25 tabular-nums md:text-[3rem]">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-4 text-[1.0625rem] leading-snug font-medium md:mt-6">{s.t}</h3>
            {s.d ? <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{s.d}</p> : null}
            {i === 2 && uidSubmission.url ? (
              <a
                href={uidSubmission.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-3 inline-flex min-h-9 items-center gap-1 text-sm text-fg"
              >
                {j.uidLink}
                <ArrowUpRight className="size-3.5" />
                <span className="sr-only"> ({ui.newTab})</span>
              </a>
            ) : null}
            {i === 4 ? (
              <a href="#progress" className="link-underline mt-3 inline-flex min-h-9 items-center text-sm text-fg">
                {copy.progress.title}
              </a>
            ) : null}
          </li>
        ))}
      </InView>

      <div className="mt-14">
        <a href="#exchanges" className="btn btn-primary">
          {j.cta}
          <ArrowRight className="btn-icon size-4" />
        </a>
      </div>
    </Section>
  );
}
