'use client';
import { useLang } from '../contexts/LanguageContext';
import { telegramContact } from '@/config/contact';
import { Ban, IdCard, Key, Lock, Shield, Smartphone, Vault } from './ui';

const ICONS = [IdCard, Lock, Smartphone, Key, Vault, Ban];

/** One compact safety strip + the impersonation note. */
export default function AccountSafety() {
  const { copy, ui } = useLang();
  const s = copy.safety;

  return (
    <section id="safety" aria-labelledby="safety-title" className="border-t border-line section-quiet">
      <div className="container-site">
        <div className="card p-5 md:p-7">
          <div className="flex items-center gap-3">
            <span className="icon-tile">
              <Shield className="size-[1.125rem]" />
            </span>
            <h2 id="safety-title" className="text-xl font-semibold">
              {s.title}
            </h2>
          </div>

          <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {s.items.map((item, i) => {
              const Icon = ICONS[i] ?? Shield;
              return (
                <li key={item} className="flex items-center gap-3 text-[0.9375rem]">
                  <Icon className="size-4 shrink-0 text-gold" />
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>

          <p role="note" className="mt-6 border-t border-line pt-5 text-[0.9375rem] leading-relaxed text-muted">
            {s.warnBody}{' '}
            <a href={telegramContact.url} target="_blank" rel="noopener noreferrer" className="link-underline font-medium">
              {telegramContact.handle}
              <span className="sr-only"> ({ui.newTab})</span>
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
