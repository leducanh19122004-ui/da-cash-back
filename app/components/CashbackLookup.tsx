'use client';
import { useState } from 'react';
import { exchanges } from '../data/exchanges';
import { useLang } from '../contexts/LanguageContext';
interface MockResult { uid: string; exchange: string; status: string; estimatedCashback: string; nextPayment: string; }
export default function CashbackLookup() {
  const { t } = useLang();
  const lk = t.lookup;
  const [selectedExchange, setSelectedExchange] = useState('');
  const [uid, setUid] = useState('');
  const [result, setResult] = useState<MockResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ exchange?: string; uid?: string }>({});
  const validate = () => {
    const newErrors: { exchange?: string; uid?: string } = {};
    if (!selectedExchange) newErrors.exchange = t.lookup.selectPlaceholder;
    if (!uid.trim()) newErrors.uid = t.lookup.uidPlaceholder;
    else if (uid.trim().length < 4) newErrors.uid = 'UID invalid';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLookup = () => {
    if (!validate()) return;
    setLoading(true); setResult(null);
    setTimeout(() => {
      const ex = exchanges.find(e => e.id === selectedExchange);
      setResult({ uid: uid.trim(), exchange: ex?.name || selectedExchange, status: Math.random() > 0.3 ? '✅ Verified' : '⏳ Pending', estimatedCashback: `$${(Math.random() * 200 + 10).toFixed(2)}`, nextPayment: 'T6, 23/05/2025' });
      setLoading(false);
    }, 1200);
  };
  const inputStyle = (hasError: boolean): React.CSSProperties => ({ width: '100%', padding: '0.875rem 1rem', background: '#1A1A1A', border: `1.5px solid ${hasError ? '#ef4444' : 'rgba(212,175,55,0.25)'}`, borderRadius: '0.625rem', color: '#F8F5E9', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'Inter, sans-serif' });
  return (
    <section id="cashback-lookup" style={{ padding: '6rem 1.5rem', background: '#0B0B0B' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{lk.badge}</p>
          <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '1rem' }}>{lk.title}</h2>
          <p style={{ color: '#888', lineHeight: 1.7 }}>{lk.desc}</p>
        </div>
        <div style={{ background: '#111111', border: '1px solid rgba(212,175,55,0.25)', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#B8B8B8', marginBottom: '0.5rem' }}>{lk.selectEx}</label>
              <select value={selectedExchange} onChange={e => { setSelectedExchange(e.target.value); setErrors(prev => ({ ...prev, exchange: undefined })); }}
                style={{ ...inputStyle(!!errors.exchange), cursor: 'pointer' }}
                onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.6)'} onBlur={e => e.target.style.borderColor = errors.exchange ? '#ef4444' : 'rgba(212,175,55,0.25)'}>
                <option value="" style={{ background: '#1A1A1A' }}>{lk.selectPlaceholder}</option>
                {exchanges.map(ex => <option key={ex.id} value={ex.id} style={{ background: '#1A1A1A' }}>{ex.name} ({ex.type === 'crypto' ? 'Crypto' : 'Forex'})</option>)}
              </select>
              {errors.exchange && <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.3rem' }}>{errors.exchange}</p>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#B8B8B8', marginBottom: '0.5rem' }}>{lk.uidLabel}</label>
              <input type="text" value={uid} onChange={e => { setUid(e.target.value); setErrors(prev => ({ ...prev, uid: undefined })); }}
                placeholder={lk.uidPlaceholder} style={inputStyle(!!errors.uid)}
                onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.6)'} onBlur={e => e.target.style.borderColor = errors.uid ? '#ef4444' : 'rgba(212,175,55,0.25)'} />
              {errors.uid && <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.3rem' }}>{errors.uid}</p>}
              <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.4rem' }}>{lk.uidHint}</p>
            </div>
            <button onClick={handleLookup} disabled={loading}
              style={{ padding: '0.875rem', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', background: loading ? 'rgba(212,175,55,0.4)' : 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)', color: '#050505', borderRadius: '0.75rem', transition: 'opacity 0.2s, transform 0.2s' }}>
              {loading ? lk.loading : lk.btn}
            </button>
          </div>
          {result && (
            <div style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '1rem', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#D4AF37', marginBottom: '1rem' }}>{lk.resultTitle}</h3>
              {[[lk.rUID, result.uid], [lk.rExchange, result.exchange], [lk.rStatus, result.status], [lk.rCashback, result.estimatedCashback], [lk.rNextPayment, result.nextPayment]].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '0.875rem', color: '#888' }}>{label}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#F8F5E9' }}>{value}</span>
                </div>
              ))}
            </div>
          )}
          <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '1.25rem', lineHeight: 1.6, textAlign: 'center', fontStyle: 'italic' }}>{lk.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
