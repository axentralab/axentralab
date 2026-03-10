import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SERVICES = [
  { icon:'🌐', title:'Web Development', desc:'Custom websites, SaaS platforms, high-performance applications', color:'#3B82F6' },
  { icon:'🛡️', title:'Cybersecurity', desc:'Penetration testing, security audits, vulnerability protection', color:'#EF4444' },
  { icon:'🤖', title:'AI Automation', desc:'Business automation, AI systems and integrations', color:'#22C55E' },
  { icon:'☁️', title:'Cloud & Infrastructure', desc:'Deployment, hosting, secure server architecture', color:'#8B5CF6' },
];

const PROCESS = [
  { step:1, title:'Discovery', desc:'Understand business goals and requirements' },
  { step:2, title:'Strategy', desc:'Plan architecture and technology stack' },
  { step:3, title:'Development', desc:'Build scalable systems with security' },
  { step:4, title:'Security & Launch', desc:'Testing, security, deployment' },
];

const PORTFOLIO = [
  { name:'SaaS Platform', industry:'Technology', tech:'React, Node.js, MongoDB', image:'/api/placeholder/400/300' },
  { name:'eCommerce System', industry:'Retail', tech:'Next.js, Stripe, PostgreSQL', image:'/api/placeholder/400/300' },
  { name:'Security Dashboard', industry:'Cybersecurity', tech:'Vue.js, Python, AWS', image:'/api/placeholder/400/300' },
  { name:'Automation System', industry:'Finance', tech:'React, AI APIs, Docker', image:'/api/placeholder/400/300' },
];

const TECH_STACK = [
  'React', 'Next.js', 'Node.js', 'MongoDB', 'Docker', 'AWS', 'Python', 'Kubernetes'
];

const TESTIMONIALS = [
  { name:'Marcus Chen', role:'CTO, NovaTech', text:'Axentralab transformed our security posture completely. Their team genuinely cares about your protection.', rating:5 },
  { name:'Sarah Okonkwo', role:'Founder, Buildly', text:'Our SaaS platform went live in 8 weeks. The MERN stack they chose was perfect for our scale.', rating:5 },
  { name:'James Kowalski', role:'VP Engineering, Dataflow', text:'The AI automation they built saves our team 200+ hours per month. ROI was visible within 30 days.', rating:5 },
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

        <div style={{ animation:'fadeUp 0.8s ease both', maxWidth:1280, width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
          <div style={{ textAlign:'left' }}>
            <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(42px,8vw,88px)', fontWeight:900, lineHeight:1.04, color:'#fff', margin:'24px 0 0', letterSpacing:-2 }}>
              Build. Secure. Automate.
            </h1>

            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'clamp(15px,2.2vw,20px)', color:'rgba(255,255,255,0.5)', margin:'28px 0', lineHeight:1.75 }}>
              We build high-performance websites, secure digital systems, and automate businesses with modern technology.
            </p>

            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <Link to="/contact" className="btn-primary" style={{ padding:'14px 32px', fontSize:15 }}>Start Your Project</Link>
              <Link to="/portfolio" className="btn-outline" style={{ padding:'14px 32px', fontSize:15 }}>View Our Work</Link>
            </div>
          </div>

          <div style={{ position:'relative' }}>
            {/* 3D tech illustration placeholder */}
            <div style={{ width:'100%', height:400, background:'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(59,130,246,0.1))', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize:48, opacity:0.3 }}>🚀</div>
            </div>
          </div>
        </div>

        {/* Free Services Below Hero */}
        <div style={{ marginTop:80, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:20, maxWidth:1000, width:'100%' }}>
          <div style={{ textAlign:'center', padding:30, background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16 }}>
            <div style={{ fontSize:32, marginBottom:12 }}>🔍</div>
            <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:700, color:'#fff', marginBottom:8 }}>Free Website Audit</h3>
            <p style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:16 }}>Get a comprehensive analysis of your website's performance and security.</p>
            <Link to="/contact" className="btn-outline" style={{ padding:'10px 20px', fontSize:13 }}>Get Free Audit</Link>
          </div>
          <div style={{ textAlign:'center', padding:30, background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16 }}>
            <div style={{ fontSize:32, marginBottom:12 }}>🛡️</div>
            <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:700, color:'#fff', marginBottom:8 }}>Free Security Scan</h3>
            <p style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:16 }}>Identify vulnerabilities and security risks in your systems.</p>
            <Link to="/contact" className="btn-outline" style={{ padding:'10px 20px', fontSize:13 }}>Start Scan</Link>
          </div>
          <div style={{ textAlign:'center', padding:30, background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16 }}>
            <div style={{ fontSize:32, marginBottom:12 }}>💬</div>
            <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:700, color:'#fff', marginBottom:8 }}>Free Consultation</h3>
            <p style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:16 }}>Discuss your project with our technical experts.</p>
            <Link to="/contact" className="btn-outline" style={{ padding:'10px 20px', fontSize:13 }}>Book Call</Link>
          </div>
        </div>
      </section>

      {/* ── CLIENT TRUST / SOCIAL PROOF ── */}
      <section style={{ padding:'60px 5%', textAlign:'center', borderTop:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontSize:16, color:'rgba(255,255,255,0.6)', marginBottom:32 }}>Trusted by startups and growing businesses</p>
        <div style={{ display:'flex', alignItems:'center', gap:40, justifyContent:'center', flexWrap:'wrap' }}>
          {['NovaTech','Buildly','Dataflow','SecureOps','CloudBridge','NexaAI'].map(c =>
            <div key={c} style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:700, color:'rgba(255,255,255,0.3)', transition:'color 0.3s', cursor:'pointer' }}
                 onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}>
              {c}
            </div>
          )}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding:'120px 5%' }}>
        <div style={{ textAlign:'center', marginBottom:60 }}>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(32px,4vw,56px)', fontWeight:900, color:'#fff', letterSpacing:-1 }}>Our Services</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:18, maxWidth:600, margin:'16px auto' }}>Comprehensive tech solutions for modern businesses</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:30, maxWidth:1200, margin:'0 auto' }}>
          {SERVICES.map((s,i) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:32, transition:'all 0.3s', cursor:'pointer' }}
                 onMouseEnter={e => { e.target.style.transform = 'translateY(-8px)'; e.target.style.boxShadow = `0 20px 40px ${s.color}20`; }}
                 onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}>
              <div style={{ fontSize:40, marginBottom:16 }}>{s.icon}</div>
              <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:800, color:'#fff', marginBottom:12 }}>{s.title}</h3>
              <p style={{ fontSize:16, color:'rgba(255,255,255,0.6)', lineHeight:1.6, marginBottom:20 }}>{s.desc}</p>
              <Link to="/services" style={{ color:s.color, fontWeight:600, textDecoration:'none' }}>Learn more →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding:'120px 5%', background:'rgba(255,255,255,0.01)' }}>
        <div style={{ textAlign:'center', marginBottom:60 }}>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(32px,4vw,56px)', fontWeight:900, color:'#fff', letterSpacing:-1 }}>Our Process</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:18, maxWidth:600, margin:'16px auto' }}>How we turn ideas into reality</p>
        </div>
        <div style={{ display:'flex', justifyContent:'center', gap:40, flexWrap:'wrap', maxWidth:1000, margin:'0 auto' }}>
          {PROCESS.map((p,i) => (
            <div key={i} style={{ textAlign:'center', flex:1, minWidth:200 }}>
              <div style={{ width:60, height:60, borderRadius:'50%', background:'#22C55E', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, fontWeight:900, color:'#000', margin:'0 auto 20px' }}>{p.step}</div>
              <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:700, color:'#fff', marginBottom:12 }}>{p.title}</h3>
              <p style={{ fontSize:16, color:'rgba(255,255,255,0.6)', lineHeight:1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PROJECTS / PORTFOLIO ── */}
      <section style={{ padding:'120px 5%' }}>
        <div style={{ textAlign:'center', marginBottom:60 }}>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(32px,4vw,56px)', fontWeight:900, color:'#fff', letterSpacing:-1 }}>Featured Projects</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:18, maxWidth:600, margin:'16px auto' }}>Real results for real businesses</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:30, maxWidth:1200, margin:'0 auto' }}>
          {PORTFOLIO.map((p,i) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, overflow:'hidden', transition:'all 0.3s' }}
                 onMouseEnter={e => e.target.style.transform = 'translateY(-8px)'}
                 onMouseLeave={e => e.target.style.transform = 'none'}>
              <div style={{ height:200, background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ fontSize:48, opacity:0.7 }}>📊</div>
              </div>
              <div style={{ padding:24 }}>
                <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:700, color:'#fff', marginBottom:8 }}>{p.name}</h3>
                <p style={{ fontSize:14, color:'#22C55E', marginBottom:8 }}>{p.industry}</p>
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.6)', marginBottom:16 }}>{p.tech}</p>
                <Link to="/portfolio" style={{ color:'#3B82F6', fontWeight:600, textDecoration:'none' }}>View Case Study →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CASE STUDY HIGHLIGHT ── */}
      <section style={{ padding:'120px 5%', background:'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
          <div>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(32px,4vw,48px)', fontWeight:900, color:'#fff', letterSpacing:-1, marginBottom:20 }}>
              How we scaled a SaaS platform to 100,000 users
            </h2>
            <div style={{ marginBottom:30 }}>
              <h3 style={{ fontSize:18, fontWeight:700, color:'#22C55E', marginBottom:8 }}>Problem</h3>
              <p style={{ fontSize:16, color:'rgba(255,255,255,0.7)', lineHeight:1.6, marginBottom:20 }}>Legacy system couldn't handle growth, security vulnerabilities, poor performance.</p>

              <h3 style={{ fontSize:18, fontWeight:700, color:'#22C55E', marginBottom:8 }}>Solution</h3>
              <p style={{ fontSize:16, color:'rgba(255,255,255,0.7)', lineHeight:1.6, marginBottom:20 }}>Complete rebuild with React, Node.js, MongoDB, AWS infrastructure, security hardening.</p>

              <h3 style={{ fontSize:18, fontWeight:700, color:'#22C55E', marginBottom:8 }}>Result</h3>
              <p style={{ fontSize:16, color:'rgba(255,255,255,0.7)', lineHeight:1.6 }}>99.9% uptime, 300% performance improvement, zero security incidents.</p>
            </div>
            <Link to="/portfolio" className="btn-primary" style={{ padding:'14px 28px' }}>Read Full Case Study</Link>
          </div>
          <div style={{ height:400, background:'linear-gradient(135deg, #22C55E20, #3B82F620)', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize:64, opacity:0.3 }}>📈</div>
          </div>
        </div>
      </section>

      {/* ── CYBERSECURITY AUTHORITY ── */}
      <section style={{ padding:'120px 5%' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(32px,4vw,56px)', fontWeight:900, color:'#fff', letterSpacing:-1, marginBottom:20 }}>Security First Approach</h2>
          <p style={{ fontSize:18, color:'rgba(255,255,255,0.6)', marginBottom:40 }}>Every system we build follows modern cybersecurity practices</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:30 }}>
            {[
              'Penetration tested',
              'Secure authentication',
              'Infrastructure hardening',
              'Vulnerability monitoring'
            ].map((item,i) => (
              <div key={i} style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:12, padding:24, textAlign:'center' }}>
                <div style={{ fontSize:32, marginBottom:12 }}>🔒</div>
                <p style={{ fontSize:16, color:'#fff', fontWeight:600 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ padding:'120px 5%', background:'rgba(255,255,255,0.01)' }}>
        <div style={{ textAlign:'center', marginBottom:60 }}>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(32px,4vw,56px)', fontWeight:900, color:'#fff', letterSpacing:-1 }}>Technologies We Use</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:18, maxWidth:600, margin:'16px auto' }}>Modern tools for modern solutions</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(120px, 1fr))', gap:30, maxWidth:1000, margin:'0 auto' }}>
          {TECH_STACK.map((tech,i) => (
            <div key={i} style={{ textAlign:'center', padding:20, background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, transition:'all 0.3s' }}
                 onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
                 onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.background = 'rgba(255,255,255,0.02)'; }}>
              <div style={{ fontSize:24, fontWeight:700, color:'#fff' }}>{tech}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding:'120px 5%' }}>
        <div style={{ textAlign:'center', marginBottom:60 }}>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(32px,4vw,56px)', fontWeight:900, color:'#fff', letterSpacing:-1 }}>What Our Clients Say</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(350px, 1fr))', gap:30, maxWidth:1200, margin:'0 auto' }}>
          {TESTIMONIALS.map((t,i) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:32 }}>
              <div style={{ display:'flex', gap:2, marginBottom:20 }}>
                {[...Array(t.rating)].map((_,j)=><span key={j} style={{ color:'#F59E0B', fontSize:18 }}>★</span>)}
              </div>
              <p style={{ fontSize:16, color:'rgba(255,255,255,0.8)', lineHeight:1.6, marginBottom:20 }}>"{t.text}"</p>
              <div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:16, color:'#fff' }}>{t.name}</div>
                <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)' }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA (LEAD GENERATION) ── */}
      <section style={{ padding:'120px 5%', textAlign:'center', background:'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(59,130,246,0.1))' }}>
        <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(32px,4vw,56px)', fontWeight:900, color:'#fff', letterSpacing:-1, marginBottom:16 }}>
          Ready to build your next project?
        </h2>
        <p style={{ fontSize:18, color:'rgba(255,255,255,0.6)', marginBottom:40 }}>Let's build something powerful together.</p>
        <div style={{ display:'flex', gap:20, justifyContent:'center', flexWrap:'wrap' }}>
          <Link to="/contact" className="btn-primary" style={{ padding:'16px 32px', fontSize:16 }}>Start a Project</Link>
          <Link to="/contact" className="btn-outline" style={{ padding:'16px 32px', fontSize:16 }}>Schedule Call</Link>
        </div>
      </section>

      {/* ── INSIGHTS / BLOG ── */}
      <section style={{ padding:'120px 5%' }}>
        <div style={{ textAlign:'center', marginBottom:60 }}>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(32px,4vw,56px)', fontWeight:900, color:'#fff', letterSpacing:-1 }}>Latest Insights</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:18, maxWidth:600, margin:'16px auto' }}>Stay ahead with our latest thoughts on tech and security</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:30, maxWidth:1000, margin:'0 auto' }}>
          {[
            { title:'Cybersecurity trends 2026', excerpt:'How AI is changing the security landscape', date:'March 2026' },
            { title:'How to scale SaaS platform', excerpt:'Best practices for growing your application', date:'February 2026' },
            { title:'Web performance optimization', excerpt:'Techniques to improve loading speeds', date:'January 2026' }
          ].map((post,i) => (
            <Link key={i} to="/blog" style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:24, textDecoration:'none', transition:'all 0.3s' }}
                  onMouseEnter={e => e.target.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.target.style.transform = 'none'}>
              <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:700, color:'#fff', marginBottom:12 }}>{post.title}</h3>
              <p style={{ fontSize:16, color:'rgba(255,255,255,0.6)', lineHeight:1.6, marginBottom:16 }}>{post.excerpt}</p>
              <div style={{ fontSize:14, color:'rgba(255,255,255,0.4)' }}>{post.date}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section style={{ padding:'80px 5%', textAlign:'center', background:'rgba(34,197,94,0.05)', borderTop:'1px solid rgba(34,197,94,0.2)' }}>
        <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px,4vw,48px)', fontWeight:900, color:'#fff', letterSpacing:-1, marginBottom:16 }}>
          Need a secure and scalable system?
        </h2>
        <p style={{ fontSize:16, color:'rgba(255,255,255,0.6)', marginBottom:32 }}>Talk with our engineers today.</p>
        <Link to="/contact" className="btn-primary" style={{ padding:'14px 28px', fontSize:15 }}>Get Started</Link>
      </section>
    </div>
  );
}
