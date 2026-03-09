import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SERVICES = [
  { icon:'⚡', title:'AI Automation',    desc:'Chatbots, workflow automation, CRM integration and AI agents.',         color:'#22C55E' },
  { icon:'🌐', title:'Web Development',  desc:'MERN apps, SaaS platforms, dashboards, enterprise-grade websites.',     color:'#3B82F6' },
  { icon:'🛡️', title:'Cybersecurity',    desc:'Vulnerability scanning, pen testing, malware removal, audits.',        color:'#EF4444' },
  { icon:'☁️', title:'DevOps & Cloud',   desc:'CI/CD pipelines, cloud automation, containerisation, monitoring.',     color:'#8B5CF6' },
  { icon:'📦', title:'SaaS Development', desc:'Full-cycle SaaS product design, development and deployment.',          color:'#F59E0B' },
  { icon:'💡', title:'IT Consulting',    desc:'Architecture planning, digital transformation, tech stack advisory.',  color:'#06B6D4' },
];

const TESTIMONIALS = [
  { name:'Marcus Chen',   role:'CTO, NovaTech',         text:'Axentralab transformed our security posture completely. Their team genuinely cares about your protection.', avatar:'MC' },
  { name:'Sarah Okonkwo', role:'Founder, Buildly',       text:'Our SaaS platform went live in 8 weeks. The MERN stack they chose was perfect for our scale.',              avatar:'SO' },
  { name:'James Kowalski',role:'VP Engineering, Dataflow',text:'The AI automation they built saves our team 200+ hours per month. ROI was visible within 30 days.',         avatar:'JK' },
];

function Glow({ x, y, color='#22C55E', size=500 }) {
  return <div style={{ position:'absolute', left:x, top:y, width:size, height:size, background:`radial-gradient(circle,${color}18 0%,transparent 70%)`, borderRadius:'50%', pointerEvents:'none', transform:'translate(-50%,-50%)', filter:'blur(40px)' }} />;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [count, setCount] = useState({ p:0, c:0, u:0 });

  useEffect(() => {
    let step = 0;
    const t = setInterval(() => {
      step++;
      const e = 1 - Math.pow(1 - step/60, 3);
      setCount({ p:Math.floor(150*e), c:Math.floor(80*e), u:Math.floor(99*e) });
      if (step >= 60) clearInterval(t);
    }, 2000/60);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'120px 6% 80px', position:'relative', overflow:'hidden' }}>
        <Glow x="20%" y="30%" color="#22C55E" size={600} />
        <Glow x="80%" y="60%" color="#3B82F6" size={500} />

        <div style={{ animation:'fadeUp 0.8s ease both', maxWidth:720, width:'100%' }}>
          <span style={{ display:'inline-block', padding:'3px 14px', borderRadius:999, border:'1px solid #22C55E40', background:'#22C55E12', color:'#22C55E', fontSize:11, fontFamily:"'Space Mono',monospace", letterSpacing:1.2, textTransform:'uppercase', fontWeight:600 }}>
            Trusted by 80+ companies worldwide
          </span>

          <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(42px,8vw,88px)', fontWeight:900, lineHeight:1.04, color:'#fff', margin:'24px 0 0', letterSpacing:-2 }}>
            Secure.<br />
            <span style={{ color:'#22C55E', position:'relative' }}>
              Automate.
              <span style={{ position:'absolute', left:0, bottom:-4, right:0, height:3, background:'linear-gradient(90deg,#22C55E,transparent)', borderRadius:2 }} />
            </span><br />
            Scale.
          </h1>

          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'clamp(15px,2.2vw,20px)', color:'rgba(255,255,255,0.5)', maxWidth:520, margin:'28px auto 0', lineHeight:1.75 }}>
            AI automation, secure development and cloud infrastructure for modern companies building at scale.
          </p>

          <div style={{ display:'flex', gap:12, justifyContent:'center', marginTop:40, flexWrap:'wrap' }}>
            <Link to="/contact" className="btn-primary" style={{ padding:'14px 32px', fontSize:15 }}>Get Free Consultation</Link>
            <Link to="/services" className="btn-outline" style={{ padding:'14px 32px', fontSize:15 }}>View Services →</Link>
          </div>

          <div style={{ display:'flex', gap:40, justifyContent:'center', marginTop:60, flexWrap:'wrap' }}>
            {[{ v:`${count.p}+`, l:'Projects Delivered' }, { v:`${count.c}+`, l:'Global Clients' }, { v:`${count.u}.9%`, l:'Uptime Guaranteed' }].map(s => (
              <div key={s.l} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(26px,4vw,38px)', fontWeight:900, color:'#22C55E', letterSpacing:-1 }}>{s.v}</div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', marginTop:4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:8, animation:'bounce 2s infinite' }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'rgba(255,255,255,0.25)', letterSpacing:2 }}>SCROLL</span>
          <div style={{ width:1, height:32, background:'linear-gradient(to bottom,rgba(34,197,94,0.6),transparent)' }} />
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section style={{ padding:'14px 5%', borderTop:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)', overflowX:'auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:24, justifyContent:'center', minWidth:'max-content', padding:'0 8px', flexWrap:'wrap' }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'rgba(255,255,255,0.25)', letterSpacing:2, textTransform:'uppercase' }}>Trusted by</span>
          {['NovaTech','Buildly','Dataflow','SecureOps','CloudBridge','NexaAI'].map(c =>
            <span key={c} style={{ fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:700, color:'rgba(255,255,255,0.16)' }}>{c}</span>
          )}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding:'100px 5%' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #22C55E40', background:'#22C55E12', color:'#22C55E', fontSize:11, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>What We Do</span>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(26px,4vw,48px)', fontWeight:900, color:'#fff', marginTop:16, letterSpacing:-1 }}>Full-Stack Tech Services</h2>
          <p style={{ color:'rgba(255,255,255,0.45)', fontSize:15, maxWidth:460, margin:'12px auto 0' }}>From idea to deployment — every layer of your stack.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:14, maxWidth:1100, margin:'0 auto' }}>
          {SERVICES.map((s,i) => <ServiceCard key={i} s={s} />)}
        </div>
        <div style={{ textAlign:'center', marginTop:40 }}>
          <Link to="/services" className="btn-primary" style={{ padding:'12px 32px' }}>View Pricing & Plans →</Link>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ padding:'80px 5%', background:'rgba(255,255,255,0.015)', borderTop:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:32, alignItems:'center' }}>
          <div>
            <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #8B5CF640', background:'#8B5CF612', color:'#8B5CF6', fontSize:11, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Why Axentralab</span>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(24px,3.5vw,40px)', fontWeight:900, color:'#fff', marginTop:16, letterSpacing:-1, lineHeight:1.15 }}>Built Different.<br /><span style={{ color:'#22C55E' }}>Delivered Different.</span></h2>
            <p style={{ color:'rgba(255,255,255,0.45)', fontSize:15, lineHeight:1.75, marginTop:14 }}>We don't just write code — we architect systems that scale, secure, and perform under pressure. Every project is led by senior engineers.</p>
            <Link to="/services" className="btn-primary" style={{ display:'inline-block', marginTop:24, padding:'12px 28px' }}>See All Services →</Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {[
              { icon:'🤖', title:'AI-First',        desc:'LLMs & automation built into everything.' },
              { icon:'🔒', title:'Security-First',   desc:'OWASP standards on every project.' },
              { icon:'⚡', title:'Fast Delivery',    desc:'Avg 8 weeks from idea to production.' },
              { icon:'🌍', title:'Global Scale',     desc:'99.9% uptime, multi-region infra.' },
              { icon:'🧩', title:'150+ Integrations',desc:'CRM, ERP, APIs — we connect them all.' },
              { icon:'📊', title:'Data-Driven',      desc:'Real-time dashboards & AI insights.' },
            ].map((f,i) => (
              <div key={i} className="card" style={{ padding:18 }}>
                <div style={{ fontSize:22, marginBottom:8 }}>{f.icon}</div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:13, color:'#fff', marginBottom:4 }}>{f.title}</div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,0.45)', lineHeight:1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding:'100px 5%' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #F59E0B40', background:'#F59E0B12', color:'#F59E0B', fontSize:11, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Client Reviews</span>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(26px,4vw,48px)', fontWeight:900, color:'#fff', marginTop:16, letterSpacing:-1 }}>What Our Clients Say</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:18, maxWidth:1000, margin:'0 auto' }}>
          {TESTIMONIALS.map((t,i) => (
            <div key={i} className="card">
              <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:16 }}>
                <div style={{ width:40, height:40, borderRadius:'50%', background:'linear-gradient(135deg,#22C55E30,#3B82F630)', border:'1px solid rgba(34,197,94,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:13, color:'#22C55E', flexShrink:0 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:14, color:'#fff' }}>{t.name}</div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)' }}>{t.role}</div>
                </div>
              </div>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.6)', lineHeight:1.7, margin:0 }}>"{t.text}"</p>
              <div style={{ display:'flex', gap:2, marginTop:14 }}>{[...Array(5)].map((_,j)=><span key={j} style={{ color:'#F59E0B', fontSize:13 }}>★</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding:'80px 5%', textAlign:'center', background:'linear-gradient(135deg,rgba(34,197,94,0.06),rgba(59,130,246,0.06))', borderTop:'1px solid rgba(34,197,94,0.1)' }}>
        <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(26px,4vw,52px)', fontWeight:900, color:'#fff', letterSpacing:-1, marginBottom:16 }}>
          Ready to Build Something<br /><span style={{ color:'#22C55E' }}>Remarkable?</span>
        </h2>
        <p style={{ color:'rgba(255,255,255,0.5)', fontSize:16, marginBottom:36 }}>Let's talk about your project. No commitment required.</p>
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <Link to="/contact" className="btn-primary" style={{ padding:'14px 36px', fontSize:15 }}>Start Your Project →</Link>
          <Link to="/services" className="btn-outline" style={{ padding:'14px 36px', fontSize:15 }}>Browse Services</Link>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ s }) {
  const [hv, setHv] = useState(false);
  return (
    <Link to="/services" onMouseEnter={()=>setHv(true)} onMouseLeave={()=>setHv(false)} style={{ background: hv?'rgba(255,255,255,0.05)':'rgba(255,255,255,0.02)', border:`1px solid ${hv?s.color+'40':'rgba(255,255,255,0.07)'}`, borderRadius:16, padding:'24px 20px', cursor:'pointer', transition:'all 0.25s', transform:hv?'translateY(-4px)':'none', boxShadow:hv?`0 12px 40px ${s.color}15`:'none', display:'block', textDecoration:'none' }}>
      <div style={{ fontSize:30, marginBottom:12 }}>{s.icon}</div>
      <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:17, fontWeight:800, color:'#fff', margin:'0 0 8px' }}>{s.title}</h3>
      <p style={{ fontSize:13, color:'rgba(255,255,255,0.5)', lineHeight:1.6, margin:'0 0 14px' }}>{s.desc}</p>
      <span style={{ fontSize:13, color:s.color, fontWeight:600 }}>View plans →</span>
    </Link>
  );
}
