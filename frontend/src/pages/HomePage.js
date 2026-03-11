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
      <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'clamp(60px, 5%, 120px) clamp(4%, 5%, 6%) clamp(40px, 5%, 80px)', position:'relative', overflow:'hidden' }}>
        <Glow x="20%" y="30%" color="#22C55E" size={600} />
        <Glow x="80%" y="60%" color="#3B82F6" size={500} />

        <div style={{ animation:'fadeUp 0.8s ease both', maxWidth:1280, width:'100%', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'clamp(30px, 5%, 60px)', alignItems:'center' }}>
          <div style={{ textAlign:'left' }}>
            <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(32px, 7vw, 88px)', fontWeight:900, lineHeight:1.04, color:'#fff', margin:'clamp(16px, 3%, 24px) 0 0', letterSpacing:-2 }}>
              Build. Secure. Automate.
            </h1>

            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'clamp(14px, 2vw, 20px)', color:'rgba(255,255,255,0.5)', margin:'clamp(20px, 3%, 28px) 0', lineHeight:1.75 }}>
              We build high-performance websites, secure digital systems, and automate businesses with modern technology.
            </p>

            <div style={{ display:'flex', gap:'clamp(8px, 2%, 12px)', flexWrap:'wrap', justifyContent:'center', '@media (max-width: 640px)': { justifyContent:'flex-start' } }}>
              <Link to="/contact" className="btn-primary" style={{ padding:'clamp(10px, 2%, 14px) clamp(20px, 3%, 32px)', fontSize:'clamp(13px, 1.5%, 15px)' }}>Start Your Project</Link>
              <Link to="/portfolio" className="btn-outline" style={{ padding:'clamp(10px, 2%, 14px) clamp(20px, 3%, 32px)', fontSize:'clamp(13px, 1.5%, 15px)' }}>View Our Work</Link>
            </div>
          </div>

          <div style={{ position:'relative', height:'clamp(250px, 40vh, 400px)' }}>
            {/* 3D tech illustration placeholder */}
            <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(59,130,246,0.1))', borderRadius:'clamp(12px, 2%, 20px)', display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize:'clamp(36px, 8vw, 48px)', opacity:0.3 }}>🚀</div>
            </div>
          </div>
        </div>

        {/* Free Services Below Hero */}
        <div style={{ marginTop:'clamp(40px, 5%, 80px)', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'clamp(12px, 3%, 20px)', maxWidth:1000, width:'100%' }}>
          <div style={{ textAlign:'center', padding:'clamp(16px, 4%, 30px)', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16 }}>
            <div style={{ fontSize:'clamp(24px, 5vw, 32px)', marginBottom:'clamp(8px, 2%, 12px)' }}>🔍</div>
            <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(14px, 3vw, 18px)', fontWeight:700, color:'#fff', marginBottom:8 }}>Free Website Audit</h3>
            <p style={{ fontSize:'clamp(12px, 2.5vw, 14px)', color:'rgba(255,255,255,0.5)', marginBottom:16, lineHeight:1.5 }}>Get a comprehensive analysis of your website's performance and security.</p>
            <Link to="/contact" className="btn-outline" style={{ padding:'clamp(8px, 1.5%, 10px) clamp(16px, 2%, 20px)', fontSize:'clamp(11px, 2%, 13px)' }}>Get Free Audit</Link>
          </div>
          <div style={{ textAlign:'center', padding:'clamp(16px, 4%, 30px)', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16 }}>
            <div style={{ fontSize:'clamp(24px, 5vw, 32px)', marginBottom:'clamp(8px, 2%, 12px)' }}>🛡️</div>
            <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(14px, 3vw, 18px)', fontWeight:700, color:'#fff', marginBottom:8 }}>Free Security Scan</h3>
            <p style={{ fontSize:'clamp(12px, 2.5vw, 14px)', color:'rgba(255,255,255,0.5)', marginBottom:16, lineHeight:1.5 }}>Identify vulnerabilities and security risks in your systems.</p>
            <Link to="/contact" className="btn-outline" style={{ padding:'clamp(8px, 1.5%, 10px) clamp(16px, 2%, 20px)', fontSize:'clamp(11px, 2%, 13px)' }}>Start Scan</Link>
          </div>
          <div style={{ textAlign:'center', padding:'clamp(16px, 4%, 30px)', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16 }}>
            <div style={{ fontSize:'clamp(24px, 5vw, 32px)', marginBottom:'clamp(8px, 2%, 12px)' }}>💬</div>
            <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(14px, 3vw, 18px)', fontWeight:700, color:'#fff', marginBottom:8 }}>Free Consultation</h3>
            <p style={{ fontSize:'clamp(12px, 2.5vw, 14px)', color:'rgba(255,255,255,0.5)', marginBottom:16, lineHeight:1.5 }}>Discuss your project with our technical experts.</p>
            <Link to="/contact" className="btn-outline" style={{ padding:'clamp(8px, 1.5%, 10px) clamp(16px, 2%, 20px)', fontSize:'clamp(11px, 2%, 13px)' }}>Book Call</Link>
          </div>
        </div>
      </section>

      {/* ── CLIENT TRUST / SOCIAL PROOF ── */}
      <section style={{ padding:'clamp(40px, 5%, 60px) 5%', textAlign:'center', borderTop:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontSize:'clamp(14px, 2vw, 16px)', color:'rgba(255,255,255,0.6)', marginBottom:'clamp(20px, 3%, 32px)' }}>Trusted by startups and growing businesses</p>
        <div style={{ display:'flex', alignItems:'center', gap:'clamp(20px, 3%, 40px)', justifyContent:'center', flexWrap:'wrap' }}>
          {['NovaTech','Buildly','Dataflow','SecureOps','CloudBridge','NexaAI'].map(c =>
            <div key={c} style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(12px, 2.5vw, 18px)', fontWeight:700, color:'rgba(255,255,255,0.3)', transition:'color 0.3s', cursor:'pointer' }}
                 onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}>
              {c}
            </div>
          )}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding:'clamp(60px, 5%, 120px) 5%' }}>
        <div style={{ textAlign:'center', marginBottom:'clamp(40px, 5%, 60px)' }}>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px, 4vw, 56px)', fontWeight:900, color:'#fff', letterSpacing:-1 }}>Our Services</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'clamp(14px, 2vw, 18px)', maxWidth:600, margin:'clamp(12px, 2%, 16px) auto' }}>Comprehensive tech solutions for modern businesses</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'clamp(20px, 3%, 30px)', maxWidth:1200, margin:'0 auto' }}>
          {SERVICES.map((s,i) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:'clamp(20px, 4%, 32px)', transition:'all 0.3s', cursor:'pointer' }}
                 onMouseEnter={e => { e.target.style.transform = 'translateY(-8px)'; e.target.style.boxShadow = `0 20px 40px ${s.color}20`; }}
                 onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}>
              <div style={{ fontSize:'clamp(32px, 6vw, 40px)', marginBottom:16 }}>{s.icon}</div>
              <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(16px, 3vw, 22px)', fontWeight:800, color:'#fff', marginBottom:12 }}>{s.title}</h3>
              <p style={{ fontSize:'clamp(13px, 2vw, 16px)', color:'rgba(255,255,255,0.6)', lineHeight:1.6, marginBottom:20 }}>{s.desc}</p>
              <Link to="/services" style={{ color:s.color, fontWeight:600, textDecoration:'none' }}>Learn more →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding:'clamp(60px, 5%, 120px) 5%', background:'rgba(255,255,255,0.01)' }}>
        <div style={{ textAlign:'center', marginBottom:'clamp(40px, 5%, 60px)' }}>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px, 4vw, 56px)', fontWeight:900, color:'#fff', letterSpacing:-1 }}>Our Process</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'clamp(14px, 2vw, 18px)', maxWidth:600, margin:'clamp(12px, 2%, 16px) auto' }}>How we turn ideas into reality</p>
        </div>
        <div style={{ display:'flex', justifyContent:'center', gap:'clamp(20px, 3%, 40px)', flexWrap:'wrap', maxWidth:1000, margin:'0 auto' }}>
          {PROCESS.map((p,i) => (
            <div key={i} style={{ textAlign:'center', flex:'1 1 200px', minWidth:150 }}>
              <div style={{ width:'clamp(50px, 8vw, 60px)', height:'clamp(50px, 8vw, 60px)', borderRadius:'50%', background:'#22C55E', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'clamp(18px, 4vw, 24px)', fontWeight:900, color:'#000', margin:'0 auto 20px' }}>{p.step}</div>
              <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(16px, 2.5vw, 20px)', fontWeight:700, color:'#fff', marginBottom:12 }}>{p.title}</h3>
              <p style={{ fontSize:'clamp(13px, 2vw, 16px)', color:'rgba(255,255,255,0.6)', lineHeight:1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PROJECTS / PORTFOLIO ── */}
      <section style={{ padding:'clamp(60px, 5%, 120px) 5%' }}>
        <div style={{ textAlign:'center', marginBottom:'clamp(40px, 5%, 60px)' }}>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px, 4vw, 56px)', fontWeight:900, color:'#fff', letterSpacing:-1 }}>Featured Projects</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'clamp(14px, 2vw, 18px)', maxWidth:600, margin:'clamp(12px, 2%, 16px) auto' }}>Real results for real businesses</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'clamp(20px, 3%, 30px)', maxWidth:1200, margin:'0 auto' }}>
          {PORTFOLIO.map((p,i) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, overflow:'hidden', transition:'all 0.3s' }}
                 onMouseEnter={e => e.target.style.transform = 'translateY(-8px)'}
                 onMouseLeave={e => e.target.style.transform = 'none'}>
              <div style={{ height:'clamp(150px, 30vh, 200px)', background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ fontSize:'clamp(32px, 8vw, 48px)', opacity:0.7 }}>📊</div>
              </div>
              <div style={{ padding:'clamp(16px, 3%, 24px)' }}>
                <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(16px, 3vw, 20px)', fontWeight:700, color:'#fff', marginBottom:8 }}>{p.name}</h3>
                <p style={{ fontSize:'clamp(12px, 2vw, 14px)', color:'#22C55E', marginBottom:8 }}>{p.industry}</p>
                <p style={{ fontSize:'clamp(12px, 2vw, 14px)', color:'rgba(255,255,255,0.6)', marginBottom:16 }}>{p.tech}</p>
                <Link to="/portfolio" style={{ color:'#3B82F6', fontWeight:600, textDecoration:'none', fontSize:'clamp(12px, 1.5vw, 14px)' }}>View Case Study →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CASE STUDY HIGHLIGHT ── */}
      <section style={{ padding:'clamp(60px, 5%, 120px) 5%', background:'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'clamp(30px, 5%, 60px)', alignItems:'center' }}>
          <div>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px, 4vw, 48px)', fontWeight:900, color:'#fff', letterSpacing:-1, marginBottom:'clamp(16px, 3%, 20px)' }}>
              How we scaled a SaaS platform to 100,000 users
            </h2>
            <div style={{ marginBottom:30 }}>
              <h3 style={{ fontSize:'clamp(16px, 2.5vw, 18px)', fontWeight:700, color:'#22C55E', marginBottom:8 }}>Problem</h3>
              <p style={{ fontSize:'clamp(14px, 2vw, 16px)', color:'rgba(255,255,255,0.7)', lineHeight:1.6, marginBottom:20 }}>Legacy system couldn't handle growth, security vulnerabilities, poor performance.</p>

              <h3 style={{ fontSize:'clamp(16px, 2.5vw, 18px)', fontWeight:700, color:'#22C55E', marginBottom:8 }}>Solution</h3>
              <p style={{ fontSize:'clamp(14px, 2vw, 16px)', color:'rgba(255,255,255,0.7)', lineHeight:1.6, marginBottom:20 }}>Complete rebuild with React, Node.js, MongoDB, AWS infrastructure, security hardening.</p>

              <h3 style={{ fontSize:'clamp(16px, 2.5vw, 18px)', fontWeight:700, color:'#22C55E', marginBottom:8 }}>Result</h3>
              <p style={{ fontSize:'clamp(14px, 2vw, 16px)', color:'rgba(255,255,255,0.7)', lineHeight:1.6 }}>99.9% uptime, 300% performance improvement, zero security incidents.</p>
            </div>
            <Link to="/portfolio" className="btn-primary" style={{ padding:'clamp(10px, 2%, 14px) clamp(20px, 2%, 28px)', fontSize:'clamp(13px, 1.5%, 15px)' }}>Read Full Case Study</Link>
          </div>
          <div style={{ height:'clamp(250px, 50vh, 400px)', background:'linear-gradient(135deg, #22C55E20, #3B82F620)', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize:'clamp(48px, 10vw, 64px)', opacity:0.3 }}>📈</div>
          </div>
        </div>
      </section>

      {/* ── CYBERSECURITY AUTHORITY ── */}
      <section style={{ padding:'clamp(60px, 5%, 120px) 5%' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px, 4vw, 56px)', fontWeight:900, color:'#fff', letterSpacing:-1, marginBottom:20 }}>Security First Approach</h2>
          <p style={{ fontSize:'clamp(14px, 2vw, 18px)', color:'rgba(255,255,255,0.6)', marginBottom:'clamp(30px, 5%, 40px)' }}>Every system we build follows modern cybersecurity practices</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'clamp(20px, 3%, 30px)' }}>
            {[
              'Penetration tested',
              'Secure authentication',
              'Infrastructure hardening',
              'Vulnerability monitoring'
            ].map((item,i) => (
              <div key={i} style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:12, padding:'clamp(16px, 3%, 24px)', textAlign:'center' }}>
                <div style={{ fontSize:'clamp(24px, 5vw, 32px)', marginBottom:12 }}>🔒</div>
                <p style={{ fontSize:'clamp(14px, 2vw, 16px)', color:'#fff', fontWeight:600 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ padding:'clamp(60px, 5%, 120px) 5%', background:'rgba(255,255,255,0.01)' }}>
        <div style={{ textAlign:'center', marginBottom:'clamp(40px, 5%, 60px)' }}>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px, 4vw, 56px)', fontWeight:900, color:'#fff', letterSpacing:-1 }}>Technologies We Use</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'clamp(14px, 2vw, 18px)', maxWidth:600, margin:'clamp(12px, 2%, 16px) auto' }}>Modern tools for modern solutions</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(100px, 1fr))', gap:'clamp(15px, 2%, 30px)', maxWidth:1000, margin:'0 auto' }}>
          {TECH_STACK.map((tech,i) => (
            <div key={i} style={{ textAlign:'center', padding:'clamp(12px, 2%, 20px)', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, transition:'all 0.3s' }}
                 onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
                 onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.background = 'rgba(255,255,255,0.02)'; }}>
              <div style={{ fontSize:'clamp(18px, 4vw, 24px)', fontWeight:700, color:'#fff' }}>{tech}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding:'clamp(60px, 5%, 120px) 5%' }}>
        <div style={{ textAlign:'center', marginBottom:'clamp(40px, 5%, 60px)' }}>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px, 4vw, 56px)', fontWeight:900, color:'#fff', letterSpacing:-1 }}>What Our Clients Say</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'clamp(20px, 3%, 30px)', maxWidth:1200, margin:'0 auto' }}>
          {TESTIMONIALS.map((t,i) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:'clamp(20px, 3%, 32px)' }}>
              <div style={{ display:'flex', gap:2, marginBottom:20 }}>
                {[...Array(t.rating)].map((_,j)=><span key={j} style={{ color:'#F59E0B', fontSize:'clamp(14px, 3vw, 18px)' }}>★</span>)}
              </div>
              <p style={{ fontSize:'clamp(13px, 2vw, 16px)', color:'rgba(255,255,255,0.8)', lineHeight:1.6, marginBottom:20 }}>"{t.text}"</p>
              <div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:'clamp(14px, 2.5vw, 16px)', color:'#fff' }}>{t.name}</div>
                <div style={{ fontSize:'clamp(12px, 2vw, 14px)', color:'rgba(255,255,255,0.5)' }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA (LEAD GENERATION) ── */}
      <section style={{ padding:'clamp(60px, 5%, 120px) 5%', textAlign:'center', background:'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(59,130,246,0.1))' }}>
        <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px, 4vw, 56px)', fontWeight:900, color:'#fff', letterSpacing:-1, marginBottom:16 }}>
          Ready to build your next project?
        </h2>
        <p style={{ fontSize:'clamp(14px, 2vw, 18px)', color:'rgba(255,255,255,0.6)', marginBottom:'clamp(30px, 5%, 40px)' }}>Let's build something powerful together.</p>
        <div style={{ display:'flex', gap:'clamp(12px, 3%, 20px)', justifyContent:'center', flexWrap:'wrap', flexDirection:'column', alignItems:'center' }}>
          <div style={{ display:'flex', gap:'clamp(12px, 3%, 20px)', justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/contact" className="btn-primary" style={{ padding:'clamp(12px, 2%, 16px) clamp(24px, 3%, 32px)', fontSize:'clamp(13px, 1.5%, 16px)' }}>Start a Project</Link>
            <Link to="/contact" className="btn-outline" style={{ padding:'clamp(12px, 2%, 16px) clamp(24px, 3%, 32px)', fontSize:'clamp(13px, 1.5%, 16px)' }}>Schedule Call</Link>
          </div>
        </div>
      </section>

      {/* ── INSIGHTS / BLOG ── */}
      <section style={{ padding:'clamp(60px, 5%, 120px) 5%' }}>
        <div style={{ textAlign:'center', marginBottom:'clamp(40px, 5%, 60px)' }}>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px, 4vw, 56px)', fontWeight:900, color:'#fff', letterSpacing:-1 }}>Latest Insights</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'clamp(14px, 2vw, 18px)', maxWidth:600, margin:'clamp(12px, 2%, 16px) auto' }}>Stay ahead with our latest thoughts on tech and security</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'clamp(20px, 3%, 30px)', maxWidth:1000, margin:'0 auto' }}>
          {[
            { title:'Cybersecurity trends 2026', excerpt:'How AI is changing the security landscape', date:'March 2026' },
            { title:'How to scale SaaS platform', excerpt:'Best practices for growing your application', date:'February 2026' },
            { title:'Web performance optimization', excerpt:'Techniques to improve loading speeds', date:'January 2026' }
          ].map((post,i) => (
            <Link key={i} to="/blog" style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:'clamp(16px, 3%, 24px)', textDecoration:'none', transition:'all 0.3s', display:'block' }}
                  onMouseEnter={e => e.target.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.target.style.transform = 'none'}>
              <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(16px, 3vw, 20px)', fontWeight:700, color:'#fff', marginBottom:12 }}>{post.title}</h3>
              <p style={{ fontSize:'clamp(13px, 2vw, 16px)', color:'rgba(255,255,255,0.6)', lineHeight:1.6, marginBottom:16 }}>{post.excerpt}</p>
              <div style={{ fontSize:'clamp(12px, 2vw, 14px)', color:'rgba(255,255,255,0.4)' }}>{post.date}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section style={{ padding:'clamp(50px, 5%, 80px) 5%', textAlign:'center', background:'rgba(34,197,94,0.05)', borderTop:'1px solid rgba(34,197,94,0.2)' }}>
        <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(24px, 4vw, 48px)', fontWeight:900, color:'#fff', letterSpacing:-1, marginBottom:16 }}>
          Need a secure and scalable system?
        </h2>
        <p style={{ fontSize:'clamp(14px, 2vw, 16px)', color:'rgba(255,255,255,0.6)', marginBottom:'clamp(20px, 3%, 32px)' }}>Talk with our engineers today.</p>
        <Link to="/contact" className="btn-primary" style={{ padding:'clamp(10px, 2%, 14px) clamp(20px, 2%, 28px)', fontSize:'clamp(13px, 1.5%, 15px)' }}>Get Started</Link>
      </section>
    </div>
  );
}
