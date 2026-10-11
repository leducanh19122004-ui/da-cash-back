'use client';
import { useLang } from '../contexts/LanguageContext';
import { telegramContact, uidSubmission } from '@/config/contact';
import { partnerExchanges } from '@/config/exchanges';
import { isPublishedTerms, termsFor } from '@/config/rebateTerms';
import { ArrowRight, ArrowUpRight, InView, Reveal, Section, SectionHeader } from './ui';

export default function HowItWorks() {
  const { copy, ui } = useLang();
  const h = copy.how;

  // Step 3 follows the configured UID channel. Today (interim): manually via the DA team on Telegram.
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
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{s.d}</p>
            {i === 2 && uidSubmission.url ? (
              <a
                href={uidSubmission.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-3 inline-flex min-h-9 items-center gap-1 text-sm text-fg"
              >
                {h.uidLink}
                <ArrowUpRight className="size-3.5" />
                <span className="sr-only"> ({ui.newTab})</span>
              </a>
            ) : null}
          </li>
        ))}
      </InView>

      <Reveal className="mt-16 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* Per-exchange rebate terms: every field comes from config/rebateTerms.ts; nothing is shown until confirmed. */}
        <div className="rounded-[var(--radius-md)] border border-line bg-ink-0">
          <h3 className="label border-b border-line px-5 py-4 md:px-7">{h.termsTitle}</h3>
          <ul>
            {partnerExchanges.map((ex) => {
              const t = termsFor(ex.id);
              const live = !!t && isPublishedTerms(t);
              return (
                <li key={ex.id} className="border-b border-line px-5 py-4 last:border-b-0 md:px-7">
                  <p className="font-medium">{ex.name}</p>
                  {live && t ? (
                    <dl className="mt-2 grid gap-1.5 text-sm">
                      {[
                        [h.termsRebate, t.rebateDescription],
                        [h.termsProducts, t.eligibleProducts?.map((p) => h.products[p] ?? p).join(', ') ?? null],
                        [h.termsPayout, t.payoutTiming],
                        [h.termsMethod, t.payoutMethod],
                      ].map(([k, v]) => (
                        <div key={k} className="flex flex-wrap justify-between gap-x-4">
                          <dt className="text-muted">{k}</dt>
                          <dd className={v ? 'text-fg' : 'text-faint'}>{v ?? h.termsAsk}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="mt-1 text-sm text-muted">{h.termsPending}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div role="note" className="border-l-2 border-gold bg-ink-0 px-5 py-5 md:px-7">
          <p className="text-sm font-semibold tracking-wide text-gold">{h.responsibleTitle}</p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg/85">{h.responsible}</p>
        </div>
      </Reveal>

      <div className="mt-14">
        <a href="#exchanges" className="btn btn-primary">
          {h.cta}
          <ArrowRight className="btn-icon size-4" />
        </a>
      </div>
    </Section>
  );
}
