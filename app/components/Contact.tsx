'use client';
import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { Check, Section, SectionHeader, stripEmoji } from './ui';

export default function Contact() {
  const { t, ui, lang } = useLang();
  const ct = t.contact;
  const [form, setForm] = useState({ name: '', contact: '', message: '' });
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
        body: JSON.stringify({ name: form.name, contact: form.contact, message: form.message, lang }),
      });
      if (!res.ok) throw new Error('server error');
      setSubmitted(true);
      setForm({ name: '', contact: '', message: '' });
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const channels = [
    { label: ui.contact.telegram, value: '@jacksondz', href: 'https://t.me/jacksondz', external: true },
    { label: ui.contact.email, value: 'support@dacashback.com', href: 'mailto:support@dacashback.com', external: false },
    { label: ui.contact.location, value: ct.address, href: undefined, external: false },
  ];

  const fields = [
    { key: 'name' as const, label: ct.nameLabel, placeholder: ct.namePlaceholder, autoComplete: 'name' },
    { key: 'contact' as const, label: ct.contactLabel, placeholder: ct.contactPlaceholder, autoComplete: 'email' },
  ];

  return (
    <Section id="contact" labelledBy="contact-title" tone="raised" rhythm="feature">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeader id="contact-title" eyebrow={ct.badge} title={ct.title} lead={ct.desc} />

          <h3 className="label mt-12">{ct.channels}</h3>
          <dl className="mt-4 border-t border-line">
            {channels.map((c) => (
              <div key={c.label} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <dt className="text-sm text-muted">{c.label}</dt>
                <dd className="text-right">
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="link-underline font-medium break-all"
                    >
                      {c.value}
                      {c.external ? <span className="sr-only"> ({ui.newTab})</span> : null}
                    </a>
                  ) : (
                    <span className="font-medium">{c.value}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm leading-relaxed text-faint">{stripEmoji(ct.response)}</p>
        </div>

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
                  setForm({ name: '', contact: '', message: '' });
                }}
                className="btn btn-secondary mt-8"
              >
                {ct.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-6">
              {fields.map((f) => (
                <div key={f.key}>
                  <label htmlFor={`contact-${f.key}`} className="field-label">
                    {f.label}
                  </label>
                  <input
                    id={`contact-${f.key}`}
                    type="text"
                    autoComplete={f.autoComplete}
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
                  value={form.message}
                  placeholder={ct.msgPlaceholder}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-err' : undefined}
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
      </div>
    </Section>
  );
}
