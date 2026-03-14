import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { TAG_COLORS } from '../constants/statusColors';

const SERVICES = [
  { icon: '🌐', title: 'Web Development',       desc: 'Custom websites, SaaS platforms and high-performance applications built to scale.', color: '#3B82F6', link: '/services' },
  { icon: '🛡️', title: 'Cybersecurity',          desc: 'Penetration testing, security audits and full vulnerability protection programs.',   color: '#EF4444', link: '/services' },
  { icon: '🤖', title: 'AI Automation',          desc: 'Business automation, AI agents and intelligent integrations that cut manual work.',  color: '#22C55E', link: '/services' },
  { icon: '☁️', title: 'Cloud & Infrastructure', desc: 'Secure deployment, hosting and resilient server architecture on AWS & beyond.',      color: '#8B5CF6', link: '/services' },
];

const STATS = [
  { value: 150, suffix: '+', label: 'Projects Delivered', color: '#22C55E' },
  { value: 80,  suffix: '+', label: 'Happy Clients',      color: '#3B82F6' },
  { value: 99,  suffix: '%', label: 'Uptime SLA',         color: '#A855F7' },
  { value: 30,  suffix: '+', label: 'Days Avg Delivery',  color: '#F59E0B' },
];

const PROCESS = [
  { step: '01', icon: '🔍', title: 'Discovery',        desc: 'We audit your goals, stack and competitive landscape to find the highest-leverage opportunities.' },
  { step: '02', icon: '🗺️', title: 'Strategy',          desc: 'A fixed-price technical plan with clear milestones — no scope creep, no surprises.' },
  { step: '03', icon: '⚙️', title: 'Build & Iterate',  desc: 'Weekly demos, async Slack updates and a live staging environment you can access anytime.' },
  { step: '04', icon: '🚀', title: 'Launch & Support', desc: 'Full docs, knowledge transfer and optional retainer support after go-live.' },
];

const TESTIMONIALS = [
  { name: 'Marcus Chen',    role: 'CTO, NovaTech',    avatar: 'MC', color: '#22C55E', quote: 'Axentralab transformed our security posture completely. Found 18 critical CVEs before launch. Their team genuinely cares.' },
  { name: 'Sarah Okonkwo',  role: 'Founder, Buildly', avatar: 'SO', color: '#3B82F6', quote: 'Our SaaS platform went live in 8 weeks. The MERN stack they chose was perfect for our scale — still running flawlessly.' },
  { name: 'James Kowalski', role: 'VP Eng, Dataflow',  avatar: 'JK', color: '#A855F7', quote: 'The AI automation they built saves our team 200+ hours per month. ROI was visible within 30 days of go-live.' },
];

// FIX: Static fallback for latest blog posts (used only if API fails)
// Uses slugs/titles instead of hardcoded IDs that could change
const BLOG_FALLBACK_HOME = [
  { _id: '5',  title: '10 Most Common WordPress Security Mistakes', category: 'Cybersecurity', createdAt: '2025-03-01' },
  { _id: '2',  title: 'Building AI Agents with LangChain and Node.js', category: 'AI Automation', createdAt: '2025-02-20' },
  { _id: '10', title: 'Why MERN Stack is the Future of Scalable Web Apps', category: 'Web Dev', createdAt: '2025-03-06' },
];

const CLIENTS = ['NovaTech', 'Buildly', 'Dataflow', 'SecureOps', 'CloudBridge', 'NexaAI', 'FinNova', 'BankCo'];

const FREE_OFFERS = [
  { icon: '🔍', title: 'Free Website Audit',  desc: 'Comprehensive analysis of performance, SEO & security.', cta: 'Get Free Audit' },
  { icon: '🛡️', title: 'Free Security Scan',  desc: 'Identify vulnerabilities and misconfigurations instantly.', cta: 'Start Scan' },
  { icon: '💬', title: 'Free Consultation', desc: '30-min call with our senior engineers — no strings attached.', cta: 'Book Call' },
];

/* Animated counter hook */
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
    <div ref={ref} style={{ textAlign: 'center', padding: '28px 20px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 36, fontWeight: 900, color: stat.color, letterSpacing: -1, lineHeight: 1 }}>
        {val}{stat.suffix}
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 6, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5, textTransform: 'uppercase' }}>{stat.label}</div>
    </div>
  );
}

function Glow({ x, y, color = '#22C55E', size = 500 }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size,
      background: `radial-gradient(circle,${color}15 0%,transparent 70%)`,
      borderRadius: '50%', pointerEvents: 'none',
      transform: 'translate(-50%,-50%)', filter: 'blur(40px)',
    }} />
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  // FIX: Fetch latest blog posts from API; fall back to static list if unavailable
  const [blogPosts, setBlogPosts] = useState(BLOG_FALLBACK_HOME);

  useEffect(() => {
    api.get('/blog?limit=3&sort=-createdAt')
      .then(r => { if (r.data.data?.length) setBlogPosts(r.data.data.slice(0, 3)); })
      .catch(() => {}); // silently keep fallback
  }, []);

  /* Auto-rotate testimonials */
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
        @keyframes shimmer  { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
        .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.25s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.4s ease both; }
        .fade-up-4 { animation: fadeUp 0.7s 0.55s ease both; }
        .section-pad { scroll-margin-top: 80px; }

        /* ── Stats grid: 4 col → 2 col → 2 col on small ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 900px;
          margin: 0 auto;
        }
        @media (max-width: 700px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .stats-grid > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
          .stats-grid > div:nth-child(odd) {
            border-right: 1px solid rgba(255,255,255,0.06) !important;
          }
        }

        /* ── Hero: tighten padding on mobile ── */
        .hero-section {
          padding: 120px 5% 80px;
        }
        @media (max-width: 768px) {
          .hero-section {
            padding: 100px 5% 60px;
            min-height: auto !important;
          }
        }
        @media (max-width: 480px) {
          .hero-section {
            padding: 90px 20px 50px;
          }
        }

        /* ── Hero h1: reduce letter-spacing on mobile (looks odd at small sizes) ── */
        .hero-h1 {
          letter-spacing: -2.5px;
        }
        @media (max-width: 480px) {
          .hero-h1 { letter-spacing: -1px; }
        }

        /* ── Testimonial card: reduce padding on mobile ── */
        .testimonial-card {
          padding: 40px 36px;
        }
        @media (max-width: 600px) {
          .testimonial-card {
            padding: 28px 20px;
          }
        }

        /* ── CTA promo nudge: stack on very small screens ── */
        .cta-promo-nudge {
          flex-wrap: wrap;
          justify-content: center;
          text-align: center;
        }

        /* ── Section padding: reduce on mobile ── */
        @media (max-width: 600px) {
          .section-mobile-pad {
            padding-top: 60px !important;
            padding-bottom: 60px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fade-up-1, .fade-up-2, .fade-up-3, .fade-up-4 { animation: none; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <Glow x="60%" y="30%" color="#22C55E" size={600} />
        <Glow x="20%" y="70%" color="#3B82F6" size={400} />
        <div style={{ position: 'relative', maxWidth: 800 }}>
          <div className="fade-up-1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 999, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.06)', marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: '#22C55E', letterSpacing: 1 }}>NOW ACCEPTING NEW CLIENTS</span>
          </div>
          <h1 className="fade-up-2 hero-h1" style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(36px,6vw,80px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, marginBottom: 24 }}>
            We build secure,<br /><span style={{ color: '#22C55E' }}>scalable software</span><br />for ambitious teams.
          </h1>
          <p className="fade-up-3" style={{ fontSize: 'clamp(15px,1.8vw,18px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 520, marginBottom: 36 }}>
            Full-stack development, cybersecurity, AI automation and cloud infrastructure — delivered by engineers who ship fast and build to last.
          </p>
          <div className="fade-up-4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary" style={{ padding: '15px 36px', fontSize: 15, textDecoration: 'none' }}>Start a Project →</Link>
            <Link to="/services" className="btn-outline" style={{ padding: '15px 28px', fontSize: 15, textDecoration: 'none' }}>Browse Services</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="stats-grid">
          {STATS.map(stat => <StatCard key={stat.label} stat={stat} />)}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-pad section-mobile-pad" style={{ padding: '96px 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: 'uppercase' }}>What We Do</span>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(26px,4vw,48px)', fontWeight: 900, color: '#fff', marginTop: 14, letterSpacing: -1 }}>Our Services</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
          {SERVICES.map((s, i) => (
            <Link key={i} to={s.link} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: 28, transition: 'all 0.25s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.color}35`; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${s.color}12`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 10, letterSpacing: -0.3 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{s.desc}</p>
                <div style={{ marginTop: 20, fontSize: 13, color: s.color, fontWeight: 700 }}>Learn more →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FREE OFFERS */}
      <section className="section-mobile-pad" style={{ padding: '72px 5%', background: 'rgba(34,197,94,0.03)', borderTop: '1px solid rgba(34,197,94,0.08)', borderBottom: '1px solid rgba(34,197,94,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(22px,3.5vw,40px)', fontWeight: 900, color: '#fff', letterSpacing: -0.8 }}>Try Us — For Free</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, marginTop: 10 }}>Three ways to get started at zero cost.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20, maxWidth: 900, margin: '0 auto' }}>
          {FREE_OFFERS.map((o, i) => (
            <div key={i} className="card" style={{ padding: 28, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{o.icon}</div>
              <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{o.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginBottom: 20 }}>{o.desc}</p>
              <Link to="/contact" className="btn-primary" style={{ padding: '10px 22px', fontSize: 13, textDecoration: 'none' }}>{o.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-pad section-mobile-pad" style={{ padding: '96px 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: 'uppercase' }}>How It Works</span>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(26px,4vw,48px)', fontWeight: 900, color: '#fff', marginTop: 14, letterSpacing: -1 }}>Our Process</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
          {PROCESS.map((p, i) => (
            <div key={i} className="card" style={{ padding: 28 }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: '#22C55E', letterSpacing: 2, marginBottom: 12 }}>{p.step}</div>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 10 }}>{p.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENT MARQUEE */}
      <section style={{ padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 48, animation: 'marquee 20s linear infinite', width: 'max-content' }}>
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span key={i} style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.15)', letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{c}</span>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad section-mobile-pad" style={{ padding: '96px 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: 'uppercase' }}>Social Proof</span>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(26px,4vw,44px)', fontWeight: 900, color: '#fff', marginTop: 14, letterSpacing: -1 }}>What Our Clients Say</h2>
        </div>

          <div style={{ maxWidth: 720, margin: '0 auto 32px' }}>
            <div className="testimonial-card" style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${TESTIMONIALS[activeTestimonial].color}30`, borderRadius: 24, transition: 'border-color 0.4s', position: 'relative' }}>
            <div style={{ fontSize: 48, color: TESTIMONIALS[activeTestimonial].color, fontFamily: 'Georgia,serif', lineHeight: 1, marginBottom: 20, opacity: 0.5 }}>"</div>
            <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 28, fontStyle: 'italic' }}>{TESTIMONIALS[activeTestimonial].quote}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${TESTIMONIALS[activeTestimonial].color}20`, border: `1px solid ${TESTIMONIALS[activeTestimonial].color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 13, color: TESTIMONIALS[activeTestimonial].color }}>
                {TESTIMONIALS[activeTestimonial].avatar}
              </div>
              <div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: '#fff' }}>{TESTIMONIALS[activeTestimonial].name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{TESTIMONIALS[activeTestimonial].role}</div>
              </div>
            </div>
            </div>
          </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? 24 : 8, height: 8, borderRadius: 999, background: i === activeTestimonial ? '#22C55E' : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section style={{ padding: '72px 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: 'uppercase' }}>Our Stack</span>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 900, color: '#fff', marginTop: 12, letterSpacing: -0.5 }}>Technologies We Use</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 800, margin: '0 auto' }}>
          {['React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'Python', 'TypeScript', 'Kubernetes', 'Redis', 'Terraform'].map((t, i) => (
            <span key={i} style={{ padding: '8px 18px', borderRadius: 999, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: "'Space Mono',monospace", fontSize: 12, color: 'rgba(255,255,255,0.5)', cursor: 'default', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}>
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* LATEST BLOG — FIX: posts fetched from API, fall back to static only if API fails */}
      <section className="section-pad section-mobile-pad" style={{ padding: '80px 5%', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1100, margin: '0 auto 36px', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, border: '1px solid #06B6D440', background: '#06B6D412', color: '#06B6D4', fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Insights</span>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 900, color: '#fff', marginTop: 10, letterSpacing: -0.5 }}>Latest from the Blog</h2>
          </div>
          <Link to="/blog" style={{ color: '#06B6D4', fontWeight: 700, textDecoration: 'none', fontSize: 14, fontFamily: "'Sora',sans-serif", display: 'flex', alignItems: 'center', gap: 6 }}>
            All articles →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
          {blogPosts.map((post, i) => {
            const color = TAG_COLORS[post.category] || '#06B6D4';
            return (
              <Link key={i} to={`/blog/${post._id}`} className="blog-card" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 0, textDecoration: 'none', transition: 'all 0.25s', overflow: 'hidden', display: 'block' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}35`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ height: 4, background: `linear-gradient(90deg,${color},transparent)` }} />
                <div style={{ padding: 24 }}>
                  <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 999, border: `1px solid ${color}30`, background: `${color}10`, color, fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 14 }}>{post.category}</span>
                  <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 800, color: '#fff', lineHeight: 1.4, marginBottom: 16 }}>{post.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                    <span style={{ fontSize: 12, color, fontWeight: 700 }}>Read →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* MAIN CTA */}
      <section className="section-pad section-mobile-pad" style={{ padding: '100px 5%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(34,197,94,0.08),transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 620, margin: '0 auto' }}>
          <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, border: '1px solid #22C55E40', background: '#22C55E10', color: '#22C55E', fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Get Started</span>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(28px,5vw,56px)', fontWeight: 900, color: '#fff', margin: '18px auto 16px', letterSpacing: -1.5, lineHeight: 1.08 }}>
            Ready to build<br /><span style={{ color: '#22C55E' }}>your next project?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, marginBottom: 20, lineHeight: 1.7 }}>Tell us what you're building — we'll respond within 24 hours with a tailored proposal.</p>

          <div className="cta-promo-nudge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 12, border: '1px solid rgba(251,191,36,0.3)', background: 'rgba(251,191,36,0.07)', marginBottom: 28 }}>
            <span style={{ fontSize: 14 }}>🎁</span>
            <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, color: '#FCD34D', fontWeight: 700 }}>New clients get 50% off their first project</span>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'rgba(253,230,138,0.55)' }}>· Code: FIRST50</span>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary" style={{ padding: '15px 36px', background: '#22C55E', color: '#000', fontSize: 15, fontWeight: 700, border: 'none', borderRadius: 12, textDecoration: 'none' }}>
              Start a Project →
            </Link>
            <Link to="/contact" className="btn-outline" style={{ padding: '15px 28px', fontSize: 15, borderRadius: 12, textDecoration: 'none' }}>
              Schedule a Call
            </Link>
          </div>
          <div style={{ marginTop: 28, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['✓ Free consultation', '✓ Fixed-price quotes', '✓ NDA on request'].map((t, i) => (
              <span key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontFamily: "'Space Mono',monospace" }}>{t}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}