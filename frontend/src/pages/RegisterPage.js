import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', company: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Passwords do not match');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    const result = await register(form.name, form.email, form.password, form.company);
    if (result.success) navigate('/dashboard');
    else setError(result.message);
  };

  const fields = [
    { key: 'name',     label: 'Full Name',        type: 'text',     placeholder: 'John Smith' },
    { key: 'email',    label: 'Email Address',     type: 'email',    placeholder: 'you@company.com' },
    { key: 'company',  label: 'Company (optional)',type: 'text',     placeholder: 'Acme Corp' },
    { key: 'password', label: 'Password',          type: 'password', placeholder: '••••••••' },
    { key: 'confirm',  label: 'Confirm Password',  type: 'password', placeholder: '••••••••' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 460, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#22C55E,#16A34A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: '#000' }}>A</div>
            <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 20, color: '#fff' }}>Axentralab</span>
          </Link>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: -0.5, marginBottom: 8 }}>Create your account</h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>Start building with Axentralab today</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32 }}>
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#EF4444' }}>{error}</div>
          )}
          <form onSubmit={handleSubmit}>
            {fields.map(f => (
              <div key={f.key} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>{f.label}</label>
                <input className="input" type={f.type} placeholder={f.placeholder} required={f.key !== 'company'}
                  value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
              </div>
            ))}
            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '13px', fontSize: 15, marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading ? <><span className="spinner" style={{ width: 16, height: 16 }} /> Creating account...</> : 'Create Account →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#22C55E', fontWeight: 600 }}>Sign in →</Link>
        </p>
      </div>
    </div>
  );
}
