import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(form.email, form.password);
    if (result.success) {
      navigate(result.user.role === 'admin' ? '/admin' : from, { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding:'clamp(40px, 5%, 80px) clamp(4%, 5%, 6%)', position: 'relative' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width:'clamp(300px, 60vw, 500px)', height:'clamp(300px, 60vw, 500px)', background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 4%, 36px)' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(20px, 3%, 32px)' }}>
            <div style={{ width: 'clamp(32px, 6vw, 36px)', height: 'clamp(32px, 6vw, 36px)', borderRadius: 10, background: 'linear-gradient(135deg,#22C55E,#16A34A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(14px, 3vw, 18px)', fontWeight: 900, color: '#000' }}>A</div>
            <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 'clamp(16px, 3vw, 20px)', color: '#fff' }}>Axentralab</span>
          </Link>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(24px, 4vw, 28px)', fontWeight: 900, color: '#fff', letterSpacing: -0.5, marginBottom: 8 }}>Welcome back</h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(13px, 2vw, 14px)' }}>Sign in to your account</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 'clamp(20px, 4%, 32px)' }}>
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: 'clamp(10px, 2%, 12px) clamp(12px, 2%, 16px)', marginBottom: 20, fontSize: 'clamp(12px, 1.5vw, 13px)', color: '#EF4444' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 'clamp(14px, 2%, 18px)' }}>
              <label style={{ display: 'block', fontSize: 'clamp(11px, 1.5vw, 12px)', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>Email Address</label>
              <input className="input" type="email" placeholder="you@company.com" required
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div style={{ marginBottom: 'clamp(18px, 3%, 24px)' }}>
              <label style={{ display: 'block', fontSize: 'clamp(11px, 1.5vw, 12px)', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>Password</label>
              <input className="input" type="password" placeholder="••••••••" required
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: 'clamp(11px, 1.5%, 13px)', fontSize: 'clamp(13px, 1.5vw, 15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading ? <><span className="spinner" style={{ width: 16, height: 16 }} /> Signing in...</> : 'Sign In →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 'clamp(16px, 3%, 20px)', fontSize: 'clamp(12px, 2vw, 14px)', color: 'rgba(255,255,255,0.4)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#22C55E', fontWeight: 600 }}>Create one →</Link>
        </p>
      </div>
    </div>
  );
}
