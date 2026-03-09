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
    <div style={{ padding:'100px 5% 80px', minHeight:'100vh' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:60, maxWidth:1100, margin:'0 auto', alignItems:'start' }}>

        {/* ── LEFT ── */}
        <div>
          <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #22C55E40', background:'#22C55E12', color:'#22C55E', fontSize:11, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Let's Talk</span>
          <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px,4.5vw,54px)', fontWeight:900, color:'#fff', marginTop:16, letterSpacing:-1.5, lineHeight:1.1 }}>Start Your<br /><span style={{ color:'#22C55E' }}>Project</span></h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.45)', lineHeight:1.75, marginTop:16, maxWidth:380 }}>Tell us about your project and we'll get back within 24 hours with a tailored proposal.</p>

          <div style={{ marginTop:40, display:'flex', flexDirection:'column', gap:22 }}>
            {[
              { icon:'📧', label:'Email',        val:'hello@axentralab.com' },
              { icon:'💬', label:'Telegram',     val:'@axentralab' },
              { icon:'🌍', label:'Availability', val:'Worldwide, 24/7' },
            ].map(c => (
              <div key={c.label} style={{ display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:44, height:44, borderRadius:12, background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.18)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'rgba(255,255,255,0.3)', letterSpacing:1, textTransform:'uppercase' }}>{c.label}</div>
                  <div style={{ fontSize:14, color:'rgba(255,255,255,0.8)', fontWeight:500, marginTop:2 }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FORM ── */}
        <div className="card" style={{ padding:'clamp(22px,4vw,36px)' }}>
          {submitted ? (
            <div style={{ textAlign:'center', padding:'32px 0' }}>
              <div style={{ fontSize:52, marginBottom:14 }}>✅</div>
              <h2 style={{ fontFamily:"'Sora',sans-serif", color:'#22C55E', fontSize:22, fontWeight:800, marginBottom:10 }}>Message Received!</h2>
              <p style={{ color:'rgba(255,255,255,0.5)', fontSize:14 }}>We'll reach out within 24 hours with a personalised proposal.</p>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:800, color:'#fff', marginTop:0, marginBottom:22 }}>Send a Message</h3>
              {error && <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:10, padding:'10px 14px', marginBottom:16, fontSize:13, color:'#EF4444' }}>{error}</div>}
              <form onSubmit={handleSubmit}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  {[{ k:'name', l:'Name', ph:'John Smith', req:true }, { k:'email', l:'Email', ph:'john@co.com', req:true }].map(f => (
                    <div key={f.k}>
                      <label style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.4)', display:'block', marginBottom:5 }}>{f.l}</label>
                      <input className="input" type={f.k==='email'?'email':'text'} placeholder={f.ph} required={f.req} value={form[f.k]} onChange={e=>set(f.k,e.target.value)} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:12 }}>
                  <label style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.4)', display:'block', marginBottom:5 }}>Company</label>
                  <input className="input" placeholder="Company name" value={form.company} onChange={e=>set('company',e.target.value)} />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12 }}>
                  {[{ k:'service', l:'Service', opts:SERVICES }, { k:'budget', l:'Budget', opts:BUDGETS }].map(f => (
                    <div key={f.k}>
                      <label style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.4)', display:'block', marginBottom:5 }}>{f.l}</label>
                      <select className="input" value={form[f.k]} onChange={e=>set(f.k,e.target.value)}>
                        <option value="" style={{ background:'#0F172A' }}>Select…</option>
                        {f.opts.map(o=><option key={o} value={o} style={{ background:'#0F172A' }}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:12 }}>
                  <label style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.4)', display:'block', marginBottom:5 }}>Message</label>
                  <textarea className="input" rows={4} placeholder="Describe your project…" required value={form.message} onChange={e=>set('message',e.target.value)} style={{ resize:'none' }} />
                </div>
                <button type="submit" disabled={loading} className="btn-primary" style={{ width:'100%', padding:'13px', fontSize:15, marginTop:16, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
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
