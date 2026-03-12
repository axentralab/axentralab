import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FEATURES = [
  { icon:'🛡️', text:'Enterprise-grade security on every project' },
  { icon:'⚡', text:'Kick off within 24 hours of payment' },
  { icon:'🔒', text:'NDA included in every contract by default' },
  { icon:'🌍', text:'Trusted by 4,200+ teams in 30+ countries' },
];

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';
  const [form, setForm]   = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [show, setShow]   = useState(false);

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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;800;900&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.35)} 50%{box-shadow:0 0 0 8px rgba(34,197,94,0)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes gridMove { 0%{background-position:0 0} 100%{background-position:40px 40px} }
        @keyframes glow    { 0%,100%{opacity:0.5} 50%{opacity:1} }
        .login-input {
          width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1);
          border-radius:12px; padding:13px 16px; color:#fff; font-size:14px;
          font-family:'DM Sans',sans-serif; outline:none; transition:all 0.2s;
        }
        .login-input:focus {
          border-color:rgba(34,197,94,0.5);
          background:rgba(34,197,94,0.04);
          box-shadow:0 0 0 3px rgba(34,197,94,0.08);
        }
        .login-input::placeholder { color:rgba(255,255,255,0.2); }
        .login-submit {
          width:100%; padding:14px; background:#22C55E; color:#000; border:none;
          border-radius:12px; font-family:'Sora',sans-serif; font-weight:900;
          font-size:15px; letter-spacing:-0.3px; cursor:pointer; transition:all 0.2s;
          display:flex; align-items:center; justify-content:center; gap:10px;
        }
        .login-submit:hover:not(:disabled) { background:#16a34a; transform:translateY(-1px); box-shadow:0 8px 24px rgba(34,197,94,0.3); }
        .login-submit:disabled { opacity:0.6; cursor:not-allowed; }
        .feat-item { animation: fadeUp 0.5s ease both; }

        /* Layout */
        .login-outer {
          min-height:100vh; display:grid; grid-template-columns:1fr 1fr;
        }
        @media (max-width:860px) {
          .login-outer { grid-template-columns:1fr !important; }
          .login-left  { display:none !important; }
          .login-right { padding:clamp(40px,8vw,80px) clamp(20px,6vw,48px) !important; justify-content:center; }
        }
        @media (max-width:400px) {
          .login-right { padding:32px 18px !important; }
        }
      `}</style>

      <div className="login-outer">

        {/* ── LEFT VISUAL PANEL ── */}
        <div className="login-left" style={{ position:'relative', background:'#06080F', overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'48px 52px' }}>

          {/* animated grid bg */}
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(34,197,94,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.04) 1px,transparent 1px)', backgroundSize:'40px 40px', animation:'gridMove 6s linear infinite', pointerEvents:'none' }} />

          {/* glow blob */}
          <div style={{ position:'absolute', bottom:'-10%', right:'-10%', width:480, height:480, borderRadius:'50%', background:'radial-gradient(circle,rgba(34,197,94,0.12) 0%,transparent 65%)', pointerEvents:'none', animation:'glow 4s ease-in-out infinite' }} />
          <div style={{ position:'absolute', top:'20%', left:'-5%', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(59,130,246,0.07) 0%,transparent 65%)', pointerEvents:'none' }} />

          {/* Logo */}
          <div style={{ position:'relative', zIndex:1 }}>
            <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:10, textDecoration:'none' }}>
              <div style={{ width:38, height:38, borderRadius:11, background:'linear-gradient(135deg,#22C55E,#16A34A)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:900, color:'#000', fontFamily:"'Sora',sans-serif" }}>A</div>
              <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:900, fontSize:18, color:'#fff', letterSpacing:-0.3 }}>Axentralab</span>
            </Link>
          </div>

          {/* Center visual */}
          <div style={{ position:'relative', zIndex:1, flex:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'40px 0' }}>

            {/* Big stat card */}
            <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:24, padding:'32px 36px', width:'100%', maxWidth:360, marginBottom:20, backdropFilter:'blur(10px)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'#22C55E', animation:'pulse 2s infinite' }} />
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'rgba(255,255,255,0.3)', letterSpacing:2, textTransform:'uppercase' }}>Live Dashboard Preview</span>
              </div>

              {/* Mini stat row */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>
                {[['$2.4M+','Revenue Generated'],['120+','Projects Done'],['98%','Client Retention'],['< 24h','Avg Kickoff']].map(([v,l],i) => (
                  <div key={i} style={{ padding:'14px 12px', background:'rgba(255,255,255,0.04)', borderRadius:12, border:'1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:900, color: i===0?'#22C55E':i===1?'#3B82F6':i===2?'#F59E0B':'#A855F7', letterSpacing:-0.5 }}>{v}</div>
                    <div style={{ fontSize:10, color:'rgba(255,255,255,0.3)', marginTop:3, lineHeight:1.4 }}>{l}</div>
                  </div>
                ))}
              </div>

              {/* Mini progress bars */}
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {[['Web Development','#3B82F6',88],['Cybersecurity','#EF4444',72],['SaaS / AI','#22C55E',95]].map(([label,color,pct],i) => (
                  <div key={i}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                      <span style={{ fontSize:11, color:'rgba(255,255,255,0.45)' }}>{label}</span>
                      <span style={{ fontSize:11, color, fontWeight:700 }}>{pct}%</span>
                    </div>
                    <div style={{ height:4, background:'rgba(255,255,255,0.06)', borderRadius:99 }}>
                      <div style={{ height:'100%', width:`${pct}%`, background:color, borderRadius:99, opacity:0.8 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'10px 18px', background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:999, animation:'float 4s ease-in-out infinite' }}>
              <span style={{ fontSize:16 }}>🔒</span>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:'rgba(255,255,255,0.7)', fontWeight:500 }}>SOC 2 compliant · NDA on every deal</span>
            </div>
          </div>

          {/* Bottom feature list */}
          <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', gap:12 }}>
            {FEATURES.map((f,i) => (
              <div key={i} className="feat-item" style={{ display:'flex', alignItems:'center', gap:12, animationDelay:`${i*0.1}s` }}>
                <div style={{ width:32, height:32, borderRadius:9, background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, flexShrink:0 }}>{f.icon}</div>
                <span style={{ fontSize:13, color:'rgba(255,255,255,0.5)', fontFamily:"'DM Sans',sans-serif" }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: LOGIN FORM ── */}
        <div className="login-right" style={{ background:'#0A0D16', display:'flex', alignItems:'center', padding:'clamp(40px,6vw,80px) clamp(24px,6vw,72px)' }}>
          <div style={{ width:'100%', maxWidth:420, margin:'0 auto' }}>

            {/* Mobile logo (hidden on desktop via left panel being hidden) */}
            <div style={{ marginBottom:36 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', borderRadius:999, border:'1px solid rgba(34,197,94,0.2)', background:'rgba(34,197,94,0.06)', marginBottom:28 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#22C55E', display:'inline-block' }} />
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#22C55E', letterSpacing:2, textTransform:'uppercase' }}>Client Portal</span>
              </div>
              <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px,4vw,38px)', fontWeight:900, color:'#fff', letterSpacing:-1.2, lineHeight:1.1, margin:'0 0 10px' }}>
                Welcome<br />back<span style={{ color:'#22C55E' }}>.</span>
              </h1>
              <p style={{ color:'rgba(255,255,255,0.38)', fontSize:14, fontFamily:"'DM Sans',sans-serif", lineHeight:1.7, margin:0 }}>
                Sign in to track your projects, invoices, and deliverables.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:12, padding:'12px 16px', marginBottom:20, fontSize:13, color:'#EF4444', fontFamily:"'DM Sans',sans-serif", display:'flex', alignItems:'center', gap:8, animation:'fadeUp 0.3s ease' }}>
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:18 }}>

              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.35)', marginBottom:7, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase' }}>Email Address</label>
                <input className="login-input" type="email" placeholder="you@company.com" required
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>

              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:7 }}>
                  <label style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.35)', fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase' }}>Password</label>
                  <span style={{ fontSize:12, color:'rgba(34,197,94,0.7)', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Forgot password?</span>
                </div>
                <div style={{ position:'relative' }}>
                  <input className="login-input" type={show ? 'text' : 'password'} placeholder="••••••••" required
                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                    style={{ paddingRight:44 }} />
                  <button type="button" onClick={() => setShow(!show)}
                    style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'rgba(255,255,255,0.3)', cursor:'pointer', fontSize:16, padding:0, lineHeight:1 }}>
                    {show ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
                <div style={{ width:18, height:18, borderRadius:5, border:'1px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.03)', flexShrink:0 }} />
                <span style={{ fontSize:13, color:'rgba(255,255,255,0.4)', fontFamily:"'DM Sans',sans-serif" }}>Remember me for 30 days</span>
              </label>

              <button type="submit" className="login-submit" disabled={loading}>
                {loading
                  ? <><span style={{ width:16, height:16, border:'2px solid rgba(0,0,0,0.3)', borderTopColor:'#000', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }} /> Signing in…</>
                  : <><span>Sign In</span><span style={{ fontSize:18 }}>→</span></>
                }
              </button>
            </form>

            {/* Divider */}
            <div style={{ display:'flex', alignItems:'center', gap:12, margin:'24px 0' }}>
              <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.07)' }} />
              <span style={{ fontSize:11, color:'rgba(255,255,255,0.2)', fontFamily:"'Space Mono',monospace", letterSpacing:1 }}>OR</span>
              <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.07)' }} />
            </div>

            {/* Social login placeholder */}
            <button style={{ width:'100%', padding:'13px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:12, color:'rgba(255,255,255,0.6)', fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:10, transition:'all 0.18s' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.09)'; }}>
              <span style={{ fontSize:18 }}>🔗</span> Continue with Google
            </button>

            {/* Register link */}
            <p style={{ textAlign:'center', marginTop:24, fontSize:14, color:'rgba(255,255,255,0.35)', fontFamily:"'DM Sans',sans-serif" }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color:'#22C55E', fontWeight:700, textDecoration:'none' }}>Create one →</Link>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}