'use client';
import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { contactForm, supportEmail, supportHours, supportResponseTime, telegramContact } from '@/config/contact';
import { CONTACT_LIMITS } from '../lib/contactLimits';
import { Check, Section, SectionHeader } from './ui';

const EMPTY = { name: '', contact: '', message: '' };

export default function Contact() {
  const { t, ui, lang, copy } = useLang();
  const ct = t.contact;
  const c = copy.contact;
  const [form, setForm] = useState(EMPTY);
  // Honeypot: hidden from people, filled in by naive bots; the API drops those requests.
  const [website, setWebsite] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = ct.namePlaceholder;
    if (!form.contact.trim()) e.contact = ct.contactPlaceholder;
    if (!form.message.trim()) e.message = ct.msgPlaceholder;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    setSendError(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang, website }),
      });
      const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (!res.ok || data?.success !== true) throw new Error('send failed');
      setSubmitted(true);
      setForm(EMPTY);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const channels = [
    { label: c.telegram, value: telegramContact.handle, href: telegramContact.url, external: true },
    ...(supportEmail ? [{ label: c.email, value: supportEmail, href: `mailto:${supportEmail}`, external: false }] : []),
    ...(supportResponseTime ? [{ label: c.responseTime, value: supportResponseTime, href: undefined, external: false }] : []),
    ...(supportHours ? [{ label: c.hours, value: supportHours, href: undefined, external: false }] : []),
  ];

  const fields = [
    { key: 'name' as const, label: ct.nameLabel, placeholder: ct.namePlaceholder, autoComplete: 'name', max: CONTACT_LIMITS.name },
    { key: 'contact' as const, label: ct.contactLabel, placeholder: ct.contactPlaceholder, autoComplete: 'email', max: CONTACT_LIMITS.contact },
  ];

  return (
    <Section id="contact" labelledBy="contact-title" tone="raised" rhythm="feature">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeader id="contact-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

          <h3 className="label mt-12">{c.channels}</h3>
          <dl className="mt-4 border-t border-line">
            {channels.map((ch) => (
              <div key={ch.label} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <dt className="text-sm text-muted">{ch.label}</dt>
                <dd className="text-right">
                  {ch.href ? (
                    <a
                      href={ch.href}
                      {...(ch.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="link-underline font-medium break-all"
                    >
                      {ch.value}
                      {ch.external ? <span className="sr-only"> ({ui.newTab})</span> : null}
                    </a>
                  ) : (
                    <span className="font-medium">{ch.value}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {contactForm.enabled ? (
          <div className="rounded-[var(--radius-md)] border border-line bg-ink-0 p-5 md:p-8">
            {submitted ? (
              <div role="status" className="py-8">
                <span className="inline-flex size-10 items-center justify-center rounded-full border border-gold/60 text-gold">
                  <Check className="size-5" />
                </span>
                <h3 className="h-card mt-6">{ct.successTitle}</h3>
                <p className="mt-2 text-muted">{ct.successDesc}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm(EMPTY);
                  }}
                  className="btn btn-secondary mt-8"
                >
                  {ct.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-6">
                <h3 className="label">{c.formTitle}</h3>
                {fields.map((f) => (
                  <div key={f.key}>
                    <label htmlFor={`contact-${f.key}`} className="field-label">
                      {f.label}
                    </label>
                    <input
                      id={`contact-${f.key}`}
                      type="text"
                      autoComplete={f.autoComplete}
                      maxLength={f.max}
                      value={form[f.key]}
                      placeholder={f.placeholder}
                      aria-invalid={!!errors[f.key]}
                      aria-describedby={errors[f.key] ? `contact-${f.key}-err` : undefined}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, [f.key]: e.target.value }));
                        setErrors((p) => ({ ...p, [f.key]: undefined }));
                      }}
                      className="field"
                    />
                    {errors[f.key] ? (
                      <p id={`contact-${f.key}-err`} className="field-error">
                        {errors[f.key]}
                      </p>
                    ) : null}
                  </div>
                ))}
                <div>
                  <label htmlFor="contact-message" className="field-label">
                    {ct.msgLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    maxLength={CONTACT_LIMITS.message}
                    value={form.message}
                    placeholder={ct.msgPlaceholder}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-err contact-message-hint' : 'contact-message-hint'}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, message: e.target.value }));
                      setErrors((p) => ({ ...p, message: undefined }));
                    }}
                    className="field min-h-32 resize-y"
                  />
                  {errors.message ? (
                    <p id="contact-message-err" className="field-error">
                      {errors.message}
                    </p>
                  ) : null}
                  <p id="contact-message-hint" className="field-hint">
                    {c.formNote}
                  </p>
                </div>

                {/* Honeypot (visually hidden, skipped by keyboard and screen readers). */}
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                {sendError ? (
                  <p role="alert" className="border-l-2 border-danger pl-3 text-sm text-fg/90">
                    {ui.contact.sendError}
                  </p>
                ) : null}

                <button type="submit" disabled={sending} className="btn btn-primary w-full">
                  {sending ? (
                    <>
                      <span className="spinner" aria-hidden />
                      {ui.contact.sending}
                    </>
                  ) : (
                    ct.submit
                  )}
                </button>
              </form>
            )}
          </div>
        ) : null}
      </div>
    </Section>
  );
}
