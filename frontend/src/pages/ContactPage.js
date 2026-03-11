import { useState } from 'react';
import api from '../services/api';

const SERVICES = ['AI Automation','Web Development','Cybersecurity','DevOps & Cloud','SaaS Development','IT Consulting','Other'];
const BUDGETS  = ['Under $5k','$5k – $15k','$15k – $50k','$50k+','Let\'s discuss'];

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', company:'', service:'', budget:'', message:'' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await api.post('/leads', form);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ padding:'clamp(60px, 5%, 100px) clamp(4%, 5%, 6%) clamp(40px, 5%, 80px)', minHeight:'100vh' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'clamp(40px, 5%, 60px)', maxWidth:1100, margin:'0 auto', alignItems:'start' }}>

        {/* ── LEFT ── */}
        <div>
          <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #22C55E40', background:'#22C55E12', color:'#22C55E', fontSize:'clamp(9px, 1.5vw, 11px)', fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Let's Talk</span>
          <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px, 4vw, 54px)', fontWeight:900, color:'#fff', marginTop:'clamp(12px, 2%, 16px)', letterSpacing:-1.5, lineHeight:1.1 }}>Start Your<br /><span style={{ color:'#22C55E' }}>Project</span></h1>
          <p style={{ fontSize:'clamp(13px, 2vw, 15px)', color:'rgba(255,255,255,0.45)', lineHeight:1.75, marginTop:'clamp(12px, 2%, 16px)', maxWidth:380 }}>Tell us about your project and we'll get back within 24 hours with a tailored proposal.</p>

          <div style={{ marginTop:'clamp(30px, 5%, 40px)', display:'flex', flexDirection:'column', gap:'clamp(16px, 3%, 22px)' }}>
            {[
              { icon:'📧', label:'Email',        val:'hello@axentralab.com' },
              { icon:'💬', label:'Telegram',     val:'@axentralab' },
              { icon:'🌍', label:'Availability', val:'Worldwide, 24/7' },
            ].map(c => (
              <div key={c.label} style={{ display:'flex', alignItems:'center', gap:'clamp(10px, 2%, 14px)' }}>
                <div style={{ width:'clamp(40px, 8vw, 44px)', height:'clamp(40px, 8vw, 44px)', borderRadius:12, background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.18)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'clamp(16px, 3vw, 20px)', flexShrink:0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'clamp(8px, 1.5vw, 9px)', color:'rgba(255,255,255,0.3)', letterSpacing:1, textTransform:'uppercase' }}>{c.label}</div>
                  <div style={{ fontSize:'clamp(12px, 2vw, 14px)', color:'rgba(255,255,255,0.8)', fontWeight:500, marginTop:2 }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FORM ── */}
        <div className="card" style={{ padding:'clamp(16px, 4vw, 36px)' }}>
          {submitted ? (
            <div style={{ textAlign:'center', padding:'clamp(24px, 5%, 32px) 0' }}>
              <div style={{ fontSize:'clamp(36px, 8vw, 52px)', marginBottom:14 }}>✅</div>
              <h2 style={{ fontFamily:"'Sora',sans-serif", color:'#22C55E', fontSize:'clamp(18px, 3vw, 22px)', fontWeight:800, marginBottom:10 }}>Message Received!</h2>
              <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'clamp(12px, 2vw, 14px)' }}>We'll reach out within 24 hours with a personalised proposal.</p>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(16px, 2.5vw, 18px)', fontWeight:800, color:'#fff', marginTop:0, marginBottom:'clamp(16px, 3%, 22px)' }}>Send a Message</h3>
              {error && <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:10, padding:'clamp(8px, 1.5%, 10px)', marginBottom:16, fontSize:'clamp(12px, 2vw, 13px)', color:'#EF4444' }}>{error}</div>}
              <form onSubmit={handleSubmit}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:'clamp(10px, 2%, 12px)' }}>
                  {[{ k:'name', l:'Name', ph:'John Smith', req:true }, { k:'email', l:'Email', ph:'john@co.com', req:true }].map(f => (
                    <div key={f.k}>
                      <label style={{ fontSize:'clamp(10px, 1.5vw, 11px)', fontWeight:600, color:'rgba(255,255,255,0.4)', display:'block', marginBottom:5 }}>{f.l}</label>
                      <input className="input" type={f.k==='email'?'email':'text'} placeholder={f.ph} required={f.req} value={form[f.k]} onChange={e=>set(f.k,e.target.value)} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:'clamp(10px, 2%, 12px)' }}>
                  <label style={{ fontSize:'clamp(10px, 1.5vw, 11px)', fontWeight:600, color:'rgba(255,255,255,0.4)', display:'block', marginBottom:5 }}>Company</label>
                  <input className="input" placeholder="Company name" value={form.company} onChange={e=>set('company',e.target.value)} />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:'clamp(10px, 2%, 12px)', marginTop:'clamp(10px, 2%, 12px)' }}>
                  {[{ k:'service', l:'Service', opts:SERVICES }, { k:'budget', l:'Budget', opts:BUDGETS }].map(f => (
                    <div key={f.k}>
                      <label style={{ fontSize:'clamp(10px, 1.5vw, 11px)', fontWeight:600, color:'rgba(255,255,255,0.4)', display:'block', marginBottom:5 }}>{f.l}</label>
                      <select className="input" value={form[f.k]} onChange={e=>set(f.k,e.target.value)}>
                        <option value="" style={{ background:'#0F172A' }}>Select…</option>
                        {f.opts.map(o=><option key={o} value={o} style={{ background:'#0F172A' }}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:'clamp(10px, 2%, 12px)' }}>
                  <label style={{ fontSize:'clamp(10px, 1.5vw, 11px)', fontWeight:600, color:'rgba(255,255,255,0.4)', display:'block', marginBottom:5 }}>Message</label>
                  <textarea className="input" rows={4} placeholder="Describe your project…" required value={form.message} onChange={e=>set('message',e.target.value)} style={{ resize:'none' }} />
                </div>
                <button type="submit" disabled={loading} className="btn-primary" style={{ width:'100%', padding:'clamp(11px, 2%, 13px)', fontSize:'clamp(13px, 1.5vw, 15px)', marginTop:'clamp(12px, 2%, 16px)', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                  {loading ? <><span className="spinner" style={{ width:16, height:16 }} /> Sending…</> : 'Send Message →'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
