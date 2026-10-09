'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLang } from '../contexts/LanguageContext';
import { Lang } from '../translations';
import { langLabels } from '../translations/ui';
import { cn } from './ui';

const LANGS: Lang[] = ['vi', 'en', 'ko', 'th', 'id'];
const linkCls = 'inline-flex min-h-9 items-center text-sm text-muted transition-colors hover:text-fg';

function Heading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="font-mono text-[0.6875rem] tracking-[0.14em] text-faint uppercase">
      {children}
    </h3>
  );
}

export default function Footer() {
  const { t, ui, lang, setLang } = useLang();
  const ft = t.footer;
  const isHome = usePathname() === '/';
  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const navLinks = [
    { id: 'exchanges', label: t.nav.exchanges },
    { id: 'how-it-works', label: t.nav.howItWorks },
    { id: 'cashback-activity', label: t.nav.cashbackLookup },
    { id: 'cashback-lookup', label: t.nav.lookupCashback },
    { id: 'faq', label: t.nav.faq },
    { id: 'contact', label: t.nav.contact },
  ];
  const legalLinks = [
    { href: '/terms', label: ft.terms },
    { href: '/privacy', label: ft.privacy },
    { href: '/risk-disclaimer', label: ft.risk },
  ];
  const ecosystem = [
    { href: `https://danetwork.asia/${lang}`, label: ui.footer.network },
    { href: 'https://crypto.danetwork.asia', label: ui.footer.crypto },
    { href: 'https://da-signal-tracking.vercel.app/', label: ui.footer.tracking },
  ];

  return (
    <footer className="border-t border-line bg-ink-1" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        DA CASH BACK
      </h2>
      <div className="container-site pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label={`DA CASH BACK — ${t.nav.home}`}>
              <Image src="/logo.png" alt="" width={32} height={32} className="size-8 rounded-full" />
              <span className="font-semibold tracking-[0.12em]">DA CASH BACK</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{ft.desc}</p>
            <a
              href={`https://danetwork.asia/${lang}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-9 items-center font-mono text-[0.6875rem] tracking-[0.14em] text-gold uppercase transition-colors hover:text-gold-soft"
            >
              {ui.partOf}
              <span className="sr-only"> ({ui.newTab})</span>
            </a>

            <div className="mt-10">
              <Heading id="f-support">{ui.footer.support}</Heading>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-faint">Telegram</dt>
                  <dd>
                    <a
                      href="https://t.me/jacksondz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline inline-flex min-h-9 items-center"
                    >
                      @jacksondz
                      <span className="sr-only"> ({ui.newTab})</span>
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-faint">{ui.contact.email}</dt>
                  <dd>
                    <a href="mailto:support@dacashback.com" className="link-underline inline-flex min-h-9 items-center">
                      support@dacashback.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
            <nav aria-labelledby="f-nav">
              <Heading id="f-nav">{ft.nav}</Heading>
              <ul className="mt-4 space-y-1">
                {navLinks.map((l) => (
                  <li key={l.id}>
                    <a href={href(l.id)} className={linkCls}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="f-eco">
              <Heading id="f-eco">{ui.footer.ecosystem}</Heading>
              <ul className="mt-4 space-y-1">
                {ecosystem.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                      {l.label}
                      <span className="sr-only"> ({ui.newTab})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="f-legal">
              <Heading id="f-legal">{ft.legal}</Heading>
              <ul className="mt-4 space-y-1">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <Heading id="f-lang">{ui.footer.languages}</Heading>
              <ul className="mt-4 space-y-1" aria-labelledby="f-lang">
                {LANGS.map((l) => (
                  <li key={l}>
                    <button
                      type="button"
                      lang={l}
                      aria-pressed={l === lang}
                      onClick={() => setLang(l)}
                      className={cn(linkCls, l === lang && 'text-fg')}
                    >
                      {langLabels[l].native}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-16 max-w-4xl text-xs leading-relaxed text-faint">{ft.disclaimer}</p>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-8 text-xs leading-relaxed text-faint md:flex-row md:justify-between">
          <p>{ft.copyright.replace('{year}', new Date().getFullYear().toString())}</p>
          <p>{t.contact.address}</p>
        </div>
      </div>
    </footer>
  );
}
