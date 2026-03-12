import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SERVICES = [
  { icon:'🌐', title:'Web Development',       desc:'Custom websites, SaaS platforms and high-performance applications built to scale.', color:'#3B82F6', link:'/services' },
  { icon:'🛡️', title:'Cybersecurity',          desc:'Penetration testing, security audits and full vulnerability protection programs.',   color:'#EF4444', link:'/services' },
  { icon:'🤖', title:'AI Automation',          desc:'Business automation, AI agents and intelligent integrations that cut manual work.',  color:'#22C55E', link:'/services' },
  { icon:'☁️', title:'Cloud & Infrastructure', desc:'Secure deployment, hosting and resilient server architecture on AWS & beyond.',      color:'#8B5CF6', link:'/services' },
];

const STATS = [
  { value:150, suffix:'+', label:'Projects Delivered', color:'#22C55E' },
  { value:80,  suffix:'+', label:'Happy Clients',      color:'#3B82F6' },
  { value:99,  suffix:'%', label:'Uptime SLA',         color:'#A855F7' },
  { value:30,  suffix:'+', label:'Days Avg Delivery',  color:'#F59E0B' },
];

const PROCESS = [
  { step:'01', icon:'🔍', title:'Discovery',        desc:'We audit your goals, stack and competitive landscape to find the highest-leverage opportunities.' },
  { step:'02', icon:'🗺️', title:'Strategy',          desc:'A fixed-price technical plan with clear milestones — no scope creep, no surprises.' },
  { step:'03', icon:'⚙️', title:'Build & Iterate',  desc:'Weekly demos, async Slack updates and a live staging environment you can access anytime.' },
  { step:'04', icon:'🚀', title:'Launch & Support', desc:'Full docs, knowledge transfer and optional retainer support after go-live.' },
];

const TESTIMONIALS = [
  { name:'Marcus Chen',    role:'CTO, NovaTech',     avatar:'MC', color:'#22C55E', quote:'Axentralab transformed our security posture completely. Found 18 critical CVEs before launch. Their team genuinely cares.' },
  { name:'Sarah Okonkwo',  role:'Founder, Buildly',  avatar:'SO', color:'#3B82F6', quote:'Our SaaS platform went live in 8 weeks. The MERN stack they chose was perfect for our scale — still running flawlessly.' },
  { name:'James Kowalski', role:'VP Eng, Dataflow',  avatar:'JK', color:'#A855F7', quote:'The AI automation they built saves our team 200+ hours per month. ROI was visible within 30 days of go-live.' },
];

const BLOG_POSTS = [
  { id:'5',  title:'10 Most Common WordPress Security Mistakes', category:'Cybersecurity', date:'Mar 2026', color:'#EF4444' },
  { id:'2',  title:'Building AI Agents with LangChain and Node.js', category:'AI Automation', date:'Feb 2026', color:'#22C55E' },
  { id:'10', title:'Why MERN Stack is the Future of Scalable Web Apps', category:'Web Dev', date:'Mar 2026', color:'#3B82F6' },
];

const CLIENTS = ['NovaTech','Buildly','Dataflow','SecureOps','CloudBridge','NexaAI','FinNova','BankCo'];

const FREE_OFFERS = [
  { icon:'🔍', title:'Free Website Audit',   desc:'Comprehensive analysis of performance, SEO & security.', cta:'Get Free Audit' },
  { icon:'🛡️', title:'Free Security Scan',   desc:'Identify vulnerabilities and misconfigurations instantly.', cta:'Start Scan' },
  { icon:'💬', title:'Free Consultation',    desc:'30-min call with our senior engineers — no strings attached.', cta:'Book Call' },
];

/* ── Animated counter hook ── */
function useCounter(target, duration = 1800) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60;
        let i = 0;
        const tick = setInterval(() => {
          i++;
          const ease = 1 - Math.pow(1 - i / steps, 3);
          setVal(Math.floor(target * ease));
          if (i >= steps) { setVal(target); clearInterval(tick); }
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return [val, ref];
}

function StatCard({ stat }) {
  const [val, ref] = useCounter(stat.value);
  return (
    <div ref={ref} style={{ textAlign:'center', padding:'28px 20px', borderRight:'1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ fontFamily:"'Sora',sans-serif", fontSize:36, fontWeight:900, color:stat.color, letterSpacing:-1, lineHeight:1 }}>
        {val}{stat.suffix}
      </div>
      <div style={{ fontSize:12, color:'rgba(255,255,255,0.35)', marginTop:6, fontFamily:"'Space Mono',monospace", letterSpacing:0.5, textTransform:'uppercase' }}>{stat.label}</div>
    </div>
  );
}

function Glow({ x, y, color = '#22C55E', size = 500 }) {
  return (
    <div style={{
      position:'absolute', left:x, top:y,
      width:size, height:size,
      background:`radial-gradient(circle,${color}15 0%,transparent 70%)`,
      borderRadius:'50%', pointerEvents:'none',
      transform:'translate(-50%,-50%)', filter:'blur(40px)',
    }} />
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  /* auto-rotate testimonials */
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(v => (v + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <style>{`
        @keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes pulse    { 0%,100% { opacity:.5; transform:scale(1); } 50% { opacity:1; transform:scale(1.04); } }
        @keyframes marquee  { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes blink    { 0%,100% { opacity:1; } 50% { opacity:0; } }
        .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.25s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.4s ease both; }
        .hero-tag  { animation: fadeIn 0.6s ease both; }
        .service-card:hover { transform:translateY(-6px) !important; }
        .blog-card:hover    { transform:translateY(-4px) !important; }
        .process-card:hover { border-color:rgba(34,197,94,0.3) !important; }
      `}</style>

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'120px 5% 80px', position:'relative', overflow:'hidden' }}>
        <Glow x="15%"  y="35%"  color="#22C55E" size={700} />
        <Glow x="85%"  y="55%"  color="#3B82F6" size={600} />
        <Glow x="50%"  y="90%"  color="#8B5CF6" size={400} />

        {/* badge */}
        <div className="hero-tag" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 16px', borderRadius:999, border:'1px solid rgba(34,197,94,0.3)', background:'rgba(34,197,94,0.08)', marginBottom:28 }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'#22C55E', display:'inline-block', animation:'pulse 2s infinite' }} />
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'#22C55E', letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Available for new projects</span>
        </div>

        {/* headline */}
        <h1 className="fade-up-1" style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(38px,7vw,92px)', fontWeight:900, lineHeight:1.02, color:'#fff', margin:'0 0 8px', letterSpacing:-3, maxWidth:900 }}>
          Build.{' '}
          <span style={{ WebkitTextStroke:'1px rgba(255,255,255,0.4)', color:'transparent' }}>Secure.</span>
          {' '}Automate.
        </h1>

        <p className="fade-up-2" style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(15px,2vw,20px)', color:'rgba(255,255,255,0.45)', margin:'24px auto 36px', lineHeight:1.75, maxWidth:520 }}>
          We build high-performance websites, harden digital systems and automate operations — so you can focus on growing.
        </p>

        {/* CTAs */}
        <div className="fade-up-3" style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <Link to="/contact" className="btn-primary" style={{ padding:'14px 32px', fontSize:15, fontWeight:700, background:'#22C55E', color:'#000', border:'none', borderRadius:12 }}>
            Start Your Project →
          </Link>
          <Link to="/portfolio" className="btn-outline" style={{ padding:'14px 28px', fontSize:15, borderRadius:12 }}>
            View Our Work
          </Link>
        </div>

        {/* trust row */}
        <div className="fade-up-3" style={{ display:'flex', gap:24, justifyContent:'center', flexWrap:'wrap', marginTop:40 }}>
          {['✓ No lock-in contracts','✓ Fixed-price quotes','✓ 24hr response time'].map((t,i) => (
            <span key={i} style={{ fontSize:12, color:'rgba(255,255,255,0.3)', fontFamily:"'Space Mono',monospace" }}>{t}</span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          STATS BAR
      ════════════════════════════════ */}
      <section style={{ borderTop:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', background:'rgba(255,255,255,0.01)' }}>
          {STATS.map((s,i) => <StatCard key={i} stat={s} />)}
        </div>
      </section>

      {/* ════════════════════════════════
          CLIENT MARQUEE
      ════════════════════════════════ */}
      <section style={{ padding:'32px 0', borderBottom:'1px solid rgba(255,255,255,0.05)', overflow:'hidden' }}>
        <p style={{ textAlign:'center', fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.2)', letterSpacing:2, textTransform:'uppercase', marginBottom:20 }}>Trusted by teams at</p>
        <div style={{ display:'flex', animation:'marquee 18s linear infinite', width:'max-content' }}>
          {[...CLIENTS, ...CLIENTS].map((c,i) => (
            <span key={i} style={{ padding:'6px 28px', fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:700, color:'rgba(255,255,255,0.18)', whiteSpace:'nowrap', letterSpacing:-0.3 }}>{c}</span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          FREE OFFERS
      ════════════════════════════════ */}
      <section style={{ padding:'80px 5%' }}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #22C55E40', background:'#22C55E10', color:'#22C55E', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Free for Everyone</span>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(26px,4vw,44px)', fontWeight:900, color:'#fff', marginTop:14, letterSpacing:-1 }}>Start with Something Free</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:20, maxWidth:1000, margin:'0 auto' }}>
          {FREE_OFFERS.map((o,i) => (
            <div key={i} style={{ textAlign:'center', padding:'36px 28px', background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, transition:'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(34,197,94,0.3)'; e.currentTarget.style.transform='translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.transform='none'; }}>
              <div style={{ fontSize:36, marginBottom:16 }}>{o.icon}</div>
              <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:800, color:'#fff', marginBottom:10 }}>{o.title}</h3>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.45)', lineHeight:1.7, marginBottom:24 }}>{o.desc}</p>
              <Link to="/contact" className="btn-outline" style={{ padding:'9px 22px', fontSize:13, borderRadius:10, textDecoration:'none', display:'inline-block' }}>{o.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          SERVICES
      ════════════════════════════════ */}
      <section style={{ padding:'80px 5%', background:'rgba(255,255,255,0.01)', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #3B82F640', background:'#3B82F612', color:'#3B82F6', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>What We Do</span>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(26px,4vw,44px)', fontWeight:900, color:'#fff', marginTop:14, letterSpacing:-1 }}>Our Core Services</h2>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:15, maxWidth:440, margin:'12px auto 0' }}>Comprehensive tech solutions from a single, trusted team.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:20, maxWidth:1100, margin:'0 auto' }}>
          {SERVICES.map((s,i) => (
            <div key={i} className="service-card" style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, padding:28, transition:'all 0.25s', overflow:'hidden', position:'relative' }}>
              <div style={{ position:'absolute', top:-40, right:-40, width:120, height:120, borderRadius:'50%', background:`radial-gradient(circle,${s.color}15,transparent 70%)`, pointerEvents:'none' }} />
              <div style={{ height:4, background:`linear-gradient(90deg,${s.color},transparent)`, marginBottom:24, borderRadius:2 }} />
              <div style={{ fontSize:32, marginBottom:16 }}>{s.icon}</div>
              <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:800, color:'#fff', marginBottom:10, letterSpacing:-0.3 }}>{s.title}</h3>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.5)', lineHeight:1.7, marginBottom:20 }}>{s.desc}</p>
              <Link to={s.link} style={{ color:s.color, fontWeight:700, textDecoration:'none', fontSize:13, display:'flex', alignItems:'center', gap:6 }}>
                Learn more <span style={{ fontSize:16 }}>→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          CASE STUDY HIGHLIGHT
      ════════════════════════════════ */}
      <section style={{ padding:'80px 5%' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', background:'linear-gradient(135deg,rgba(34,197,94,0.08),rgba(59,130,246,0.06))', border:'1px solid rgba(34,197,94,0.18)', borderRadius:24, padding:'56px 48px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-80, right:-80, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(34,197,94,0.1),transparent 70%)', pointerEvents:'none' }} />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:40, alignItems:'center', position:'relative' }}>
            <div>
              <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #22C55E40', background:'#22C55E10', color:'#22C55E', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600, marginBottom:20 }}>Case Study</span>
              <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(22px,3.5vw,38px)', fontWeight:900, color:'#fff', letterSpacing:-1, marginBottom:28, lineHeight:1.15 }}>
                How we scaled a SaaS<br />platform to <span style={{ color:'#22C55E' }}>100,000 users</span>
              </h2>
              {[
                { label:'Problem', text:"Legacy system couldn't handle growth — security vulnerabilities and crippling performance issues." },
                { label:'Solution', text:'Complete rebuild on React + Node.js + AWS. Security hardening from day one.' },
                { label:'Result',  text:'99.9% uptime, 300% performance gain and zero security incidents post-launch.' },
              ].map((row,i) => (
                <div key={i} style={{ marginBottom:16, display:'flex', gap:12, alignItems:'flex-start' }}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'#22C55E', fontWeight:700, minWidth:64, paddingTop:2 }}>{row.label}</span>
                  <span style={{ fontSize:14, color:'rgba(255,255,255,0.6)', lineHeight:1.65 }}>{row.text}</span>
                </div>
              ))}
              <Link to="/portfolio" className="btn-primary" style={{ display:'inline-block', marginTop:12, padding:'12px 28px', background:'#22C55E', color:'#000', borderRadius:12, fontSize:14, fontWeight:700, textDecoration:'none' }}>
                Read Full Case Study →
              </Link>
            </div>
            {/* metrics */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              {[
                { v:'300%', l:'Performance Gain', c:'#22C55E' },
                { v:'99.9%', l:'Uptime SLA',       c:'#3B82F6' },
                { v:'0',    l:'Security Incidents', c:'#EF4444' },
                { v:'8wk',  l:'Time to Launch',    c:'#F59E0B' },
              ].map((m,i) => (
                <div key={i} style={{ background:'rgba(0,0,0,0.3)', border:`1px solid ${m.c}25`, borderRadius:16, padding:'22px 16px', textAlign:'center' }}>
                  <div style={{ fontFamily:"'Sora',sans-serif", fontSize:30, fontWeight:900, color:m.c, letterSpacing:-1 }}>{m.v}</div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', marginTop:4, fontFamily:"'Space Mono',monospace", letterSpacing:0.5 }}>{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          PROCESS
      ════════════════════════════════ */}
      <section style={{ padding:'80px 5%', background:'rgba(255,255,255,0.01)', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #8B5CF640', background:'#8B5CF612', color:'#8B5CF6', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>How We Work</span>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(26px,4vw,44px)', fontWeight:900, color:'#fff', marginTop:14, letterSpacing:-1 }}>From Idea to Launch</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16, maxWidth:1100, margin:'0 auto' }}>
          {PROCESS.map((p,i) => (
            <div key={i} className="process-card" style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, padding:'28px 22px', transition:'border-color 0.2s', position:'relative' }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.15)', letterSpacing:2, marginBottom:18 }}>{p.step}</div>
              <div style={{ fontSize:28, marginBottom:14 }}>{p.icon}</div>
              <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:17, fontWeight:800, color:'#fff', marginBottom:8 }}>{p.title}</h3>
              <p style={{ fontSize:13, color:'rgba(255,255,255,0.42)', lineHeight:1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          SECURITY AUTHORITY
      ════════════════════════════════ */}
      <section style={{ padding:'80px 5%' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #EF444440', background:'#EF444412', color:'#EF4444', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Security First</span>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(26px,4vw,44px)', fontWeight:900, color:'#fff', marginTop:14, letterSpacing:-1 }}>Every Build Is Hardened by Default</h2>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:15, maxWidth:460, margin:'12px auto 0' }}>Security isn't a feature — it's our baseline.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16 }}>
            {[
              { icon:'🔒', label:'Penetration Tested'    },
              { icon:'🔑', label:'Secure Authentication' },
              { icon:'🏗️', label:'Infra Hardening'       },
              { icon:'📡', label:'Vuln Monitoring'       },
            ].map((item,i) => (
              <div key={i} style={{ background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.15)', borderRadius:16, padding:'28px 20px', textAlign:'center', transition:'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(239,68,68,0.35)'; e.currentTarget.style.background='rgba(239,68,68,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(239,68,68,0.15)'; e.currentTarget.style.background='rgba(239,68,68,0.06)'; }}>
                <div style={{ fontSize:28, marginBottom:12 }}>{item.icon}</div>
                <p style={{ fontSize:14, color:'#fff', fontWeight:700, fontFamily:"'Sora',sans-serif" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════ */}
      <section style={{ padding:'80px 5%', background:'rgba(255,255,255,0.01)', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #ffffff15', background:'#ffffff08', color:'rgba(255,255,255,0.5)', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase' }}>Client Stories</span>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(26px,4vw,44px)', fontWeight:900, color:'#fff', marginTop:14, letterSpacing:-1 }}>What Our Clients Say</h2>
        </div>

        {/* large featured testimonial */}
        <div style={{ maxWidth:720, margin:'0 auto 32px' }}>
          <div style={{ background:'rgba(255,255,255,0.025)', border:`1px solid ${TESTIMONIALS[activeTestimonial].color}30`, borderRadius:24, padding:'40px 36px', transition:'border-color 0.4s', position:'relative' }}>
            <div style={{ fontSize:48, color:TESTIMONIALS[activeTestimonial].color, fontFamily:'Georgia,serif', lineHeight:1, marginBottom:20, opacity:0.5 }}>"</div>
            <p style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(15px,2vw,18px)', color:'rgba(255,255,255,0.75)', lineHeight:1.75, marginBottom:28, fontStyle:'italic' }}>{TESTIMONIALS[activeTestimonial].quote}</p>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:44, height:44, borderRadius:'50%', background:`${TESTIMONIALS[activeTestimonial].color}20`, border:`1px solid ${TESTIMONIALS[activeTestimonial].color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:13, color:TESTIMONIALS[activeTestimonial].color }}>
                {TESTIMONIALS[activeTestimonial].avatar}
              </div>
              <div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:700, color:'#fff' }}>{TESTIMONIALS[activeTestimonial].name}</div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,0.35)', marginTop:2 }}>{TESTIMONIALS[activeTestimonial].role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* dots */}
        <div style={{ display:'flex', justifyContent:'center', gap:8 }}>
          {TESTIMONIALS.map((_,i) => (
            <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i===activeTestimonial?24:8, height:8, borderRadius:999, background: i===activeTestimonial?'#22C55E':'rgba(255,255,255,0.15)', border:'none', cursor:'pointer', transition:'all 0.3s' }} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          TECH STACK
      ════════════════════════════════ */}
      <section style={{ padding:'72px 5%' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #ffffff15', background:'#ffffff08', color:'rgba(255,255,255,0.4)', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase' }}>Our Stack</span>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(22px,3vw,36px)', fontWeight:900, color:'#fff', marginTop:12, letterSpacing:-0.5 }}>Technologies We Use</h2>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center', maxWidth:800, margin:'0 auto' }}>
          {['React','Next.js','Node.js','MongoDB','PostgreSQL','Docker','AWS','Python','TypeScript','Kubernetes','Redis','Terraform'].map((t,i) => (
            <span key={i} style={{ padding:'8px 18px', borderRadius:999, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', fontFamily:"'Space Mono',monospace", fontSize:12, color:'rgba(255,255,255,0.5)', cursor:'default', transition:'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.09)'; e.currentTarget.style.color='#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.color='rgba(255,255,255,0.5)'; }}>
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          LATEST BLOG
      ════════════════════════════════ */}
      <section style={{ padding:'80px 5%', background:'rgba(255,255,255,0.01)', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', maxWidth:1100, margin:'0 auto 36px', flexWrap:'wrap', gap:12 }}>
          <div>
            <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #06B6D440', background:'#06B6D412', color:'#06B6D4', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Insights</span>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(22px,3vw,36px)', fontWeight:900, color:'#fff', marginTop:10, letterSpacing:-0.5 }}>Latest from the Blog</h2>
          </div>
          <Link to="/blog" style={{ color:'#06B6D4', fontWeight:700, textDecoration:'none', fontSize:14, fontFamily:"'Sora',sans-serif", display:'flex', alignItems:'center', gap:6 }}>
            All articles →
          </Link>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20, maxWidth:1100, margin:'0 auto' }}>
          {BLOG_POSTS.map((post,i) => (
            <Link key={i} to={`/blog/${post.id}`} className="blog-card" style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:18, padding:0, textDecoration:'none', transition:'all 0.25s', overflow:'hidden', display:'block' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=`${post.color}35`; e.currentTarget.style.transform='translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.transform='none'; }}>
              <div style={{ height:4, background:`linear-gradient(90deg,${post.color},transparent)` }} />
              <div style={{ padding:24 }}>
                <span style={{ display:'inline-block', padding:'2px 10px', borderRadius:999, border:`1px solid ${post.color}30`, background:`${post.color}10`, color:post.color, fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:0.5, textTransform:'uppercase', fontWeight:600, marginBottom:14 }}>{post.category}</span>
                <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:16, fontWeight:800, color:'#fff', lineHeight:1.4, marginBottom:16 }}>{post.title}</h3>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.25)' }}>{post.date}</span>
                  <span style={{ fontSize:12, color:post.color, fontWeight:700 }}>Read →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          MAIN CTA
      ════════════════════════════════ */}
      <section style={{ padding:'100px 5%', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(34,197,94,0.08),transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', maxWidth:620, margin:'0 auto' }}>
          <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #22C55E40', background:'#22C55E10', color:'#22C55E', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Get Started</span>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px,5vw,56px)', fontWeight:900, color:'#fff', margin:'18px auto 16px', letterSpacing:-1.5, lineHeight:1.08 }}>
            Ready to build<br /><span style={{ color:'#22C55E' }}>your next project?</span>
          </h2>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:15, marginBottom:36, lineHeight:1.7 }}>Tell us what you're building — we'll respond within 24 hours with a tailored proposal.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/contact" className="btn-primary" style={{ padding:'15px 36px', background:'#22C55E', color:'#000', fontSize:15, fontWeight:700, border:'none', borderRadius:12, textDecoration:'none' }}>
              Start a Project →
            </Link>
            <Link to="/contact" className="btn-outline" style={{ padding:'15px 28px', fontSize:15, borderRadius:12, textDecoration:'none' }}>
              Schedule a Call
            </Link>
          </div>
          <div style={{ marginTop:28, display:'flex', gap:24, justifyContent:'center', flexWrap:'wrap' }}>
            {['✓ Free consultation','✓ Fixed-price quotes','✓ NDA on request'].map((t,i) => (
              <span key={i} style={{ fontSize:12, color:'rgba(255,255,255,0.25)', fontFamily:"'Space Mono',monospace" }}>{t}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}