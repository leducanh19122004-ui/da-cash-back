'use client';
import { useLang } from '../contexts/LanguageContext';
import { ArrowRight, InView, Section, SectionHeader } from './ui';

export default function HowItWorks() {
  const { t } = useLang();
  const h = t.how;
  const steps = [
    { n: '01', title: h.s1t, desc: h.s1d },
    { n: '02', title: h.s2t, desc: h.s2d },
    { n: '03', title: h.s3t, desc: h.s3d },
    { n: '04', title: h.s4t, desc: h.s4d },
  ];

  return (
    <Section id="how-it-works" labelledBy="how-title" tone="raised">
      <SectionHeader id="how-title" eyebrow={h.badge} title={h.title} lead={h.desc} />

      <InView as="ol" className="relative mt-14 grid gap-0 md:mt-16 md:grid-cols-4 md:gap-8">
        {/* Connecting line: horizontal on desktop, vertical on mobile */}
        <span
          aria-hidden
          className="seq-line absolute top-0 left-[0.3125rem] h-full w-px origin-top bg-gold-line md:top-[0.3125rem] md:left-0 md:h-px md:w-full md:origin-left"
        />
        {steps.map((s, i) => (
          <li key={s.n} className="seq relative pb-10 pl-8 last:pb-0 md:pt-10 md:pb-0 md:pl-0" style={{ '--i': i } as React.CSSProperties}>
            <span aria-hidden className="absolute top-0 left-0 size-[0.6875rem] rounded-full border border-gold bg-ink-1" />
            <p className="font-mono text-[2.75rem] leading-none font-medium tracking-tight text-fg/25 tabular-nums md:text-[3.5rem]">
              {s.n}
            </p>
            <h3 className="h-card mt-4 md:mt-6">{s.title}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{s.desc}</p>
          </li>
        ))}
      </InView>

      <div className="mt-14">
        <a href="#exchanges" className="btn btn-primary">
          {h.cta.replace(/\s*→\s*$/, '')}
          <ArrowRight className="btn-icon size-4" />
        </a>
      </div>
    </Section>
  );
}
