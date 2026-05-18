'use client';
import { useState } from 'react';
import { exchanges } from '../data/exchanges';

interface MockResult {
  uid: string;
  exchange: string;
  status: string;
  estimatedCashback: string;
  nextPayment: string;
}

export default function CashbackLookup() {
  const [selectedExchange, setSelectedExchange] = useState('');
  const [uid, setUid] = useState('');
  const [result, setResult] = useState<MockResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ exchange?: string; uid?: string }>({});

  const validate = () => {
    const newErrors: { exchange?: string; uid?: string } = {};
    if (!selectedExchange) newErrors.exchange = 'Vui lòng chọn sàn giao dịch';
    if (!uid.trim()) newErrors.uid = 'Vui lòng nhập UID tài khoản';
    else if (uid.trim().length < 4) newErrors.uid = 'UID không hợp lệ (tối thiểu 4 ký tự)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLookup = () => {
    if (!validate()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const ex = exchanges.find(e => e.id === selectedExchange);
      setResult({
        uid: uid.trim(),
        exchange: ex?.name || selectedExchange,
        status: Math.random() > 0.3 ? '✅ Đã xác minh' : '⏳ Đang chờ dữ liệu',
        estimatedCashback: `$${(Math.random() * 200 + 10).toFixed(2)}`,
        nextPayment: 'T6, 23/05/2025',
      });
      setLoading(false);
    }, 1200);
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%', padding: '0.875rem 1rem',
    background: '#1A1A1A', border: `1.5px solid ${hasError ? '#ef4444' : 'rgba(212,175,55,0.25)'}`,
    borderRadius: '0.625rem', color: '#F8F5E9', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.2s',
    fontFamily: 'Inter, sans-serif',
  });

  return (
    <section id="cashback-lookup" style={{ padding: '6rem 1.5rem', background: '#0B0B0B' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Tra cứu nhanh
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)', fontWeight: 900, color: '#F8F5E9', marginBottom: '1rem' }}>
            Kiểm tra cashback của bạn
          </h2>
          <p style={{ color: '#888', lineHeight: 1.7 }}>
            Nhập thông tin tài khoản để tra cứu tình trạng và cashback ước tính
          </p>
        </div>

        <div style={{
          background: '#111111', border: '1px solid rgba(212,175,55,0.25)',
          borderRadius: '1.5rem', padding: '2.5rem',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {/* Exchange select */}
            <div>
              <label htmlFor="exchange-select" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#B8B8B8', marginBottom: '0.5rem' }}>
                Chọn sàn giao dịch *
              </label>
              <select
                id="exchange-select"
                value={selectedExchange}
                onChange={e => { setSelectedExchange(e.target.value); setErrors(prev => ({ ...prev, exchange: undefined })); }}
                style={{ ...inputStyle(!!errors.exchange), cursor: 'pointer' }}
                onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.6)'}
                onBlur={e => e.target.style.borderColor = errors.exchange ? '#ef4444' : 'rgba(212,175,55,0.25)'}
              >
                <option value="" style={{ background: '#1A1A1A' }}>-- Chọn sàn --</option>
                {exchanges.map(ex => (
                  <option key={ex.id} value={ex.id} style={{ background: '#1A1A1A' }}>
                    {ex.name} ({ex.type === 'crypto' ? 'Crypto' : 'Forex'})
                  </option>
                ))}
              </select>
              {errors.exchange && <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.3rem' }}>{errors.exchange}</p>}
            </div>

            {/* UID input */}
            <div>
              <label htmlFor="uid-input" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#B8B8B8', marginBottom: '0.5rem' }}>
                UID tài khoản sàn *
              </label>
              <input
                id="uid-input"
                type="text"
                value={uid}
                onChange={e => { setUid(e.target.value); setErrors(prev => ({ ...prev, uid: undefined })); }}
                placeholder="Nhập UID tài khoản của bạn..."
                style={inputStyle(!!errors.uid)}
                onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.6)'}
                onBlur={e => e.target.style.borderColor = errors.uid ? '#ef4444' : 'rgba(212,175,55,0.25)'}
              />
              {errors.uid && <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.3rem' }}>{errors.uid}</p>}
              <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.4rem' }}>
                UID thường nằm trong phần Hồ sơ / Profile của tài khoản sàn
              </p>
            </div>

            {/* Submit */}
            <button
              onClick={handleLookup}
              disabled={loading}
              style={{
                padding: '0.875rem', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                background: loading ? 'rgba(212,175,55,0.4)' : 'linear-gradient(135deg,#FFD700,#D4AF37,#B8860B)',
                color: '#050505', borderRadius: '0.75rem',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
            >
              {loading ? '⏳ Đang tra cứu...' : '🔍 Tra cứu cashback'}
            </button>
          </div>

          {/* Result */}
          {result && (
            <div style={{
              background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '1rem', padding: '1.5rem',
              animation: 'fadeIn 0.4s ease',
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#D4AF37', marginBottom: '1rem' }}>📊 Kết quả tra cứu</h3>
              {[
                { label: 'UID', value: result.uid },
                { label: 'Sàn giao dịch', value: result.exchange },
                { label: 'Trạng thái', value: result.status },
                { label: 'Cashback ước tính', value: result.estimatedCashback },
                { label: 'Kỳ thanh toán gần nhất', value: result.nextPayment },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '0.875rem', color: '#888' }}>{row.label}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#F8F5E9' }}>{row.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Disclaimer */}
          <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '1.25rem', lineHeight: 1.6, textAlign: 'center', fontStyle: 'italic' }}>
            Dữ liệu chỉ mang tính tham khảo. Cashback thực tế phụ thuộc vào dữ liệu đối soát từ sàn đối tác.
          </p>
        </div>
      </div>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }`}</style>
    </section>
  );
}
