'use client';
import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
export default function Contact() {
  const { t } = useLang();
  const ct = t.contact;
  const [form, setForm] = useState({ name: '', contact: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = ct.namePlaceholder;
    if (!form.contact.trim()) e.contact = ct.contactPlaceholder;
    if (!form.message.trim()) e.message = ct.msgPlaceholder;
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = (ev: React.FormEvent) => { ev.preventDefault(); if (!validate()) return; setSubmitted(true); };
  const inputStyle = (hasError: boolean): React.CSSProperties => ({ width: '100%', padding: '0.875rem 1rem', background: '#1A1A1A', border: `1.5px solid ${hasError ? '#ef4444' : 'rgba(212,175,55,0.25)'}`, borderRadius: '0.625rem', color: '#F8F5E9', fontSize: '0.95rem', outline: 'none', fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s' });
  const contactInfo = [
    { icon: '📱', label: 'Telegram', value: '@jacksondz', href: 'https://t.me/jacksondz' },
    { icon: '📧', label: 'Email', value: 'support@dacashback.com', href: 'mailto:support@dacashback.com' },
    { icon: '📍', label: ct.address, value: ct.address, href: undefined },
  ];
  return (
    <section id="contact" style={{ padding: '6rem 1.5rem', background: 'rgba(5,5,5,0)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{ct.badge}</p>
          <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '1rem' }}>{ct.title}</h2>
          <p style={{ color: '#888', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>{ct.desc}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="contact-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8F5E9', marginBottom: '0.5rem' }}>{ct.channels}</h3>
            {contactInfo.map(info => (
              <div key={info.label} style={{ display: 'flex', gap: '0.875rem', alignItems: 'center', background: 'rgba(8,7,5,0.62)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '0.875rem', padding: '0.875rem 1.125rem' }}>
                <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{info.icon}</span>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.15rem' }}>{info.label}</p>
                  {info.href ? <a href={info.href} style={{ fontSize: '0.9rem', fontWeight: 600, color: '#D4AF37', textDecoration: 'none' }}>{info.value}</a>
                    : <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#B8B8B8' }}>{info.value}</p>}
                </div>
              </div>
            ))}
            <div style={{ background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '0.875rem', padding: '1.25rem', marginTop: '0.5rem' }}>
              <p style={{ fontSize: '0.8rem', color: '#888', lineHeight: 1.65 }}>{ct.response}</p>
            </div>
          </div>
          <div style={{ background: 'rgba(8,7,5,0.62)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '1.25rem', padding: '2rem' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8F5E9', marginBottom: '0.5rem' }}>{ct.successTitle}</h3>
                <p style={{ color: '#888', fontSize: '0.9rem' }}>{ct.successDesc}</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', contact: '', message: '' }); }}
                  style={{ marginTop: '1.5rem', padding: '0.625rem 1.5rem', background: 'rgba(5,5,5,0)', border: '1.5px solid #D4AF37', color: '#D4AF37', borderRadius: '0.625rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>
                  {ct.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#B8B8B8', marginBottom: '0.4rem' }}>{ct.nameLabel}</label>
                  <input type="text" value={form.name} onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: undefined })); }} placeholder={ct.namePlaceholder} style={inputStyle(!!errors.name)}
                    onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.6)'} onBlur={e => e.target.style.borderColor = errors.name ? '#ef4444' : 'rgba(212,175,55,0.25)'} />
                  {errors.name && <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.3rem' }}>{errors.name}</p>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#B8B8B8', marginBottom: '0.4rem' }}>{ct.contactLabel}</label>
                  <input type="text" value={form.contact} onChange={e => { setForm(p => ({ ...p, contact: e.target.value })); setErrors(p => ({ ...p, contact: undefined })); }} placeholder={ct.contactPlaceholder} style={inputStyle(!!errors.contact)}
                    onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.6)'} onBlur={e => e.target.style.borderColor = errors.contact ? '#ef4444' : 'rgba(212,175,55,0.25)'} />
                  {errors.contact && <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.3rem' }}>{errors.contact}</p>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#B8B8B8', marginBottom: '0.4rem' }}>{ct.msgLabel}</label>
                  <textarea rows={4} value={form.message} onChange={e => { setForm(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: undefined })); }} placeholder={ct.msgPlaceholder}
                    style={{ ...inputStyle(!!errors.message), resize: 'vertical', minHeight: '100px' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.6)'} onBlur={e => e.target.style.borderColor = errors.message ? '#ef4444' : 'rgba(212,175,55,0.25)'} />
                  {errors.message && <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.3rem' }}>{errors.message}</p>}
                </div>
                <button type="submit" style={{ padding: '0.875rem', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', color: '#050505', borderRadius: '0.75rem', transition: 'opacity 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}>
                  {ct.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </section>
  );
}
