'use client';
import { useId, useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { exchangeById } from '@/config/exchanges';
import { videoGuides } from '@/config/guides';
import { telegramLinkProps } from '../lib/track';
import { ArrowUpRight, ChevronDown, IdCard, Play, Section, SectionHeader, Send, UserPlus, cn } from './ui';

const ICONS = { register: UserPlus, uid: IdCard } as Record<string, (p: { className?: string }) => React.JSX.Element>;

function GuideCard({ item }: { item: { id: string; title: string; summary: string; steps: string[] } }) {
  const { copy } = useLang();
  const g = copy.guides;
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const Icon = ICONS[item.id] ?? IdCard;

  return (
    <li className="card flex flex-col p-5 md:p-6">
      <span className="icon-tile">
        <Icon />
      </span>
      <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.summary}</p>

      <div id={panelId} hidden={!open} className="panel-in">
        <ol className="mt-4 grid gap-2.5 border-t border-line pt-4">
          {item.steps.map((s, i) => (
            <li key={s} className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg/90">
              <span aria-hidden className="mt-0.5 font-mono text-xs text-gold tabular-nums">
                {i + 1}.
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="mt-auto inline-flex min-h-10 items-center gap-1.5 self-start pt-4 text-sm font-medium text-gold-soft transition-colors hover:text-fg"
      >
        {open ? g.readLess : g.readMore}
        <span className="sr-only"> — {item.title}</span>
        <ChevronDown className={cn('size-3.5 transition-transform duration-[var(--dur-fast)]', open && 'rotate-180')} />
      </button>
    </li>
  );
}

export default function Guides() {
  const { copy, ui } = useLang();
  const g = copy.guides;
  const videos = videoGuides();

  return (
    <Section id="guides" labelledBy="guides-title" rhythm="quiet">
      <SectionHeader id="guides-title" eyebrow={g.eyebrow} title={g.title} />

      <ul className="mt-10 grid items-start gap-4 md:grid-cols-2">
        {g.items.map((item) => (
          <GuideCard key={item.id} item={item} />
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {videos.length ? (
          <div>
            <h3 className="label">{g.videos}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {videos.map((v) => {
                const name = exchangeById(v.exchangeId)?.name ?? v.exchangeId;
                return (
                  <li key={v.exchangeId}>
                    <a href={v.videoUrl} target="_blank" rel="noopener noreferrer" className="chip">
                      <Play className="size-3.5" />
                      {g.watch(name)}
                      <span className="sr-only"> ({ui.newTab})</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-muted">{g.perExchange}</p>
        )}
        <a {...telegramLinkProps('guides')} className="btn btn-secondary self-start md:self-auto">
          <Send className="size-4" />
          {g.ask}
          <ArrowUpRight className="btn-icon size-3.5" />
          <span className="sr-only"> ({ui.newTab})</span>
        </a>
      </div>
    </Section>
  );
}
