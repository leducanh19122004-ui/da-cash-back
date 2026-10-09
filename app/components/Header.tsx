'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLang } from '../contexts/LanguageContext';
import { Lang } from '../translations';
import { langLabels } from '../translations/ui';
import { ArrowUpRight, Check, ChevronDown, Cross, Globe, Menu, cn } from './ui';

const LANGS: Lang[] = ['vi', 'en', 'ko', 'th', 'id'];
const NAV_IDS = ['hero', 'exchanges', 'how-it-works', 'cashback-activity', 'faq', 'contact'] as const;
type NavId = (typeof NAV_IDS)[number];

function LanguageSwitcher() {
  const { lang, setLang, ui } = useLang();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) return;
    list.current?.querySelector<HTMLElement>('[aria-current="true"]')?.focus();
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        root.current?.querySelector<HTMLButtonElement>('button')?.focus();
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const items = Array.from(list.current?.querySelectorAll<HTMLElement>('button') ?? []);
        const idx = items.indexOf(document.activeElement as HTMLElement);
        const next = e.key === 'ArrowDown' ? (idx + 1) % items.length : (idx - 1 + items.length) % items.length;
        items[next]?.focus();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${ui.language}: ${langLabels[lang].native}`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-10 items-center gap-1.5 px-2.5 font-mono text-xs tracking-wider text-muted transition-colors hover:text-fg"
      >
        <Globe />
        {langLabels[lang].short}
        <ChevronDown className={cn('size-3 transition-transform', open && 'rotate-180')} />
      </button>
      {open ? (
        <ul
          ref={list}
          className="absolute right-0 mt-2 w-52 rounded-[var(--radius-md)] border border-line bg-ink-2 py-1.5 shadow-2xl shadow-black/60"
        >
          {LANGS.map((l) => (
            <li key={l}>
              <button
                type="button"
                lang={l}
                aria-current={l === lang ? 'true' : undefined}
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm text-muted transition-colors hover:bg-ink-3 hover:text-fg focus-visible:bg-ink-3 focus-visible:text-fg focus-visible:outline-none"
              >
                <span className="flex items-baseline gap-3">
                  <span className="w-5 font-mono text-[0.6875rem] text-faint">{langLabels[l].short}</span>
                  <span className={l === lang ? 'text-fg' : undefined}>{langLabels[l].native}</span>
                </span>
                {l === lang ? <Check className="size-3.5 text-gold" /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function Header() {
  const { t, ui, lang, setLang } = useLang();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<NavId | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // On sub-pages (legal), section links point back to the home page.
  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const networkUrl = `https://danetwork.asia/${lang}`;

  const navLinks: { id: NavId; label: string }[] = [
    { id: 'hero', label: t.nav.home },
    { id: 'exchanges', label: t.nav.exchanges },
    { id: 'how-it-works', label: t.nav.howItWorks },
    { id: 'cashback-activity', label: t.nav.cashbackLookup },
    { id: 'faq', label: t.nav.faq },
    { id: 'contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the section in the upper part of the viewport.
  useEffect(() => {
    if (!isHome) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id;
          setActive((NAV_IDS as readonly string[]).includes(id) ? (id as NavId) : null);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  // Mobile menu: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLElement>('a,button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === 'Tab' && panel.current) {
        const items = panel.current.querySelectorAll<HTMLElement>('a,button');
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300',
        scrolled || open
          ? 'border-line bg-ink-0/85 backdrop-blur-md supports-[not(backdrop-filter:blur(0))]:bg-ink-0'
          : 'border-transparent bg-transparent',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-ink-0"
      >
        {ui.skip}
      </a>
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`DA CASH BACK — ${t.nav.home}`}>
          <Image src="/logo.png" alt="" width={28} height={28} priority className="size-7 rounded-full" />
          <span className="text-[0.9375rem] font-semibold tracking-[0.12em] whitespace-nowrap">DA CASH BACK</span>
        </Link>

        <nav aria-label={ui.primaryNav} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              // "Home" duplicates the logo link; it only fits from 2xl up.
              <li key={l.id} className={l.id === 'hero' ? 'hidden 2xl:block' : undefined}>
                <a
                  href={href(l.id)}
                  aria-current={active === l.id ? 'location' : undefined}
                  className={cn(
                    'relative px-2.5 py-2 text-sm whitespace-nowrap transition-colors',
                    active === l.id ? 'text-fg' : 'text-muted hover:text-fg',
                  )}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={cn(
                      'absolute inset-x-2.5 -bottom-px h-px origin-left bg-gold transition-transform duration-300',
                      active === l.id ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={networkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-10 items-center gap-1 px-2 font-mono text-[0.6875rem] tracking-[0.14em] text-faint uppercase whitespace-nowrap transition-colors hover:text-fg lg:inline-flex xl:hidden 2xl:inline-flex"
          >
            {ui.networkLink}
            <ArrowUpRight className="size-3" />
            <span className="sr-only"> ({ui.newTab})</span>
          </a>
          <LanguageSwitcher />
          <a href={href('cashback-lookup')} className="btn btn-sm btn-secondary hidden whitespace-nowrap md:inline-flex">
            {t.nav.lookupCashback}
          </a>
          <a href={href('exchanges')} className="btn btn-sm btn-gold hidden whitespace-nowrap md:inline-flex">
            {t.nav.joinNow}
          </a>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex size-11 items-center justify-center text-fg xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Cross className="size-5" /> : <Menu />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={panel}
          className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-line bg-ink-0 md:top-[4.5rem] xl:hidden"
        >
          <nav aria-label={ui.primaryNav} className="container-site py-6">
            <ul>
              {navLinks.map((l, i) => (
                <li key={l.id} className="border-b border-line">
                  <a
                    href={href(l.id)}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center justify-between text-2xl font-medium tracking-tight"
                  >
                    {l.label}
                    <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, '0')}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a href={href('exchanges')} onClick={() => setOpen(false)} className="btn btn-gold">
                {t.nav.joinNow}
              </a>
              <a href={href('cashback-lookup')} onClick={() => setOpen(false)} className="btn btn-secondary">
                {t.nav.lookupCashback}
              </a>
            </div>

            <p className="label mt-10">{ui.language}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {LANGS.map((l) => (
                <li key={l}>
                  <button
                    type="button"
                    lang={l}
                    aria-pressed={l === lang}
                    onClick={() => {
                      setLang(l);
                      setOpen(false);
                    }}
                    className={cn(
                      'min-h-10 rounded-[var(--radius-sm)] border px-3 text-sm transition-colors',
                      l === lang ? 'border-gold/60 text-gold' : 'border-line text-muted hover:text-fg',
                    )}
                  >
                    {langLabels[l].native}
                  </button>
                </li>
              ))}
            </ul>

            <a
              href={networkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
            >
              {ui.partOf}
              <ArrowUpRight className="size-3.5" />
              <span className="sr-only"> ({ui.newTab})</span>
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
