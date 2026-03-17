import { useState } from 'react';
import { Link } from 'react-router-dom';

// ── Project Data ──────────────────────────────────────────────────────────────
// thumbnail: public/images/portfolio/ ফোল্ডারে রাখুন
const PROJECTS = [
  {
    id: 'p1',
    title: 'FinNova Dashboard',
    tag: 'SaaS / Fintech',
    category: 'Web App',
    color: '#22C55E',
    year: '2024',
    thumbnail: '/images/portfolio/finnova.jpg',
    desc: 'Real-time financial analytics dashboard with AI-powered anomaly detection and multi-currency support for a London-based fintech startup.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Chart.js'],
    results: ['3× faster reporting', '99.98% uptime', '40k MAU at launch'],
    liveUrl: 'https://finnova.io',
    featured: true,
  },
  {
    id: 'p2',
    title: 'SecureOps Platform',
    tag: 'Cybersecurity',
    category: 'Web App',
    color: '#EF4444',
    year: '2024',
    thumbnail: '/images/portfolio/secureops.jpg',
    desc: 'Enterprise security operations platform with automated threat hunting, incident response workflows, and SOC2-compliant audit trails.',
    stack: ['Next.js', 'Python', 'MongoDB', 'Docker', 'Redis'],
    results: ['18 CVEs patched pre-launch', 'SOC2 Type II certified', '200+ enterprise users'],
    liveUrl: 'https://secureops.io',
    featured: true,
  },
  {
    id: 'p3',
    title: 'NexaAI Automation',
    tag: 'AI / Automation',
    category: 'SaaS',
    color: '#8B5CF6',
    year: '2024',
    thumbnail: '/images/portfolio/nexaai.jpg',
    desc: 'No-code AI workflow automation platform that lets non-technical teams build GPT-4 powered business processes with drag-and-drop simplicity.',
    stack: ['React', 'Node.js', 'LangChain', 'MongoDB', 'Vercel'],
    results: ['200+ hr/mo saved per client', '6-week build to launch', '$2M ARR in year 1'],
    liveUrl: 'https://nexaai.co',
    featured: true,
  },
  {
    id: 'p4',
    title: 'CloudBridge Portal',
    tag: 'Cloud / DevOps',
    category: 'Web App',
    color: '#3B82F6',
    year: '2023',
    thumbnail: '/images/portfolio/cloudbridge.jpg',
    desc: 'Multi-cloud management portal for AWS, GCP, and Azure — unified cost monitoring, IAM governance, and one-click deployment pipelines.',
    stack: ['React', 'Terraform', 'AWS', 'Docker', 'Kubernetes'],
    results: ['35% infra cost reduction', 'Manages 400+ cloud resources', 'Zero-downtime deployments'],
    liveUrl: 'https://cloudbridge.io',
    featured: false,
  },
  {
    id: 'p5',
    title: 'BankCo Mobile App',
    tag: 'Fintech / Mobile',
    category: 'Mobile',
    color: '#F59E0B',
    year: '2023',
    thumbnail: '/images/portfolio/bankco.jpg',
    desc: 'Neobank mobile app with biometric auth, instant transfers, BNPL, and real-time spending insights. Built for a challenger bank in Southeast Asia.',
    stack: ['React Native', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    results: ['4.8★ App Store rating', '80k downloads in 3 months', 'PCI-DSS compliant'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'p6',
    title: 'Buildly SaaS',
    tag: 'SaaS / Productivity',
    category: 'SaaS',
    color: '#06B6D4',
    year: '2023',
    thumbnail: '/images/portfolio/buildly.jpg',
    desc: 'Project management SaaS for remote engineering teams — sprint planning, async standups, PR integrations, and burndown analytics in one place.',
    stack: ['Next.js', 'Node.js', 'MongoDB', 'GitHub API', 'Tailwind'],
    results: ['Used by 120+ engineering teams', '98% customer retention', 'Featured on Product Hunt'],
    liveUrl: 'https://buildly.app',
    featured: false,
  },
  {
    id: 'p7',
    title: 'Dataflow Analytics',
    tag: 'Data / Analytics',
    category: 'Web App',
    color: '#A855F7',
    year: '2023',
    thumbnail: '/images/portfolio/dataflow.jpg',
    desc: 'Self-serve analytics platform for e-commerce brands — cohort analysis, funnel visualisation, and LTV prediction powered by ML models.',
    stack: ['React', 'Python', 'PostgreSQL', 'D3.js', 'FastAPI'],
    results: ['Processes 50M events/day', '12× faster than previous solution', 'Series A secured post-launch'],
    liveUrl: 'https://dataflow.io',
    featured: false,
  },
  {
    id: 'p8',
    title: 'EcoTrack Platform',
    tag: 'SaaS / ESG',
    category: 'SaaS',
    color: '#22D3EE',
    year: '2022',
    thumbnail: '/images/portfolio/ecotrack.jpg',
    desc: 'Carbon footprint tracking and ESG reporting SaaS for mid-market companies — automated data ingestion, Scope 1/2/3 calculations, and board-ready reports.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Recharts'],
    results: ['ISO 14064 compliant', '60+ enterprise clients', 'Acquired in 2023'],
    liveUrl: '#',
    featured: false,
  },
];

const CATEGORIES = ['All', 'Web App', 'SaaS', 'Mobile'];

const STATS = [
  { value: '120+', label: 'Projects Shipped',    color: '#22C55E' },
  { value: '98%',  label: 'Client Retention',    color: '#3B82F6' },
  { value: '$50M+', label: 'Client Revenue Generated', color: '#A855F7' },
  { value: '30+',  label: 'Industries Served',   color: '#F59E0B' },
];

const TESTIMONIALS = [
  { name: 'Marcus Chen',   role: 'CTO, NovaTech',     avatar: 'MC', color: '#22C55E', quote: 'Axentralab built our entire SaaS platform in 8 weeks. The code quality, architecture decisions, and post-launch support were all exceptional.' },
  { name: 'Sarah Okonkwo', role: 'Founder, Buildly',  avatar: 'SO', color: '#3B82F6', quote: 'They don\'t just write code — they think like product engineers. Every decision was optimised for our users, not just the brief.' },
  { name: 'James Kowalski', role: 'VP Eng, Dataflow', avatar: 'JK', color: '#A855F7', quote: 'The AI automation they built saves us 200+ hours a month. ROI was visible within 30 days. Best technical investment we\'ve made.' },
];

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        overflow: 'hidden',
        transition: 'all 0.3s',
        animation: `fadeUp 0.5s ${index * 0.07}s ease both`,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${project.color}40`;
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = `0 20px 48px ${project.color}14`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top accent */}
      <div style={{ height: 3, background: `linear-gradient(90deg,${project.color},transparent)` }} />

      {/* Thumbnail */}
      <div style={{ position: 'relative', height: 200, background: `linear-gradient(135deg,${project.color}18,${project.color}06)`, overflow: 'hidden', flexShrink: 0 }}>
        {!imgErr ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 40, opacity: 0.35 }}>
              {project.category === 'Mobile' ? '📱' : project.category === 'SaaS' ? '📦' : '🌐'}
            </div>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: `${project.color}60`, letterSpacing: 2 }}>
              {project.tag.toUpperCase()}
            </span>
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(6,8,15,0.65) 100%)' }} />

        {/* Year badge */}
        <div style={{ position: 'absolute', top: 14, right: 14, padding: '3px 9px', background: 'rgba(6,8,15,0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6 }}>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>{project.year}</span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div style={{ position: 'absolute', top: 14, left: 14, padding: '3px 9px', background: project.color, borderRadius: 6 }}>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: '#000', fontWeight: 900, letterSpacing: 1 }}>★ FEATURED</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Tag */}
        <span style={{ display: 'inline-block', padding: '2px 9px', borderRadius: 6, background: `${project.color}10`, border: `1px solid ${project.color}25`, color: project.color, fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 12, alignSelf: 'flex-start' }}>
          {project.tag}
        </span>

        <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 18, fontWeight: 900, color: '#fff', margin: '0 0 10px', letterSpacing: -0.4 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: '0 0 16px', flex: 1 }}>
          {project.desc}
        </p>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 16 }}>
          {project.results.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: project.color, fontSize: 11, fontWeight: 900 }}>↑</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: "'Space Mono',monospace" }}>{r}</span>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 18 }}>
          {project.stack.map((s, i) => (
            <span key={i} style={{ padding: '3px 8px', borderRadius: 5, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: "'Space Mono',monospace" }}>{s}</span>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 8 }}>
          {project.liveUrl !== '#' ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, padding: '10px', background: `${project.color}15`, border: `1px solid ${project.color}30`, borderRadius: 10, color: project.color, fontSize: 13, fontWeight: 700, fontFamily: "'Sora',sans-serif", textDecoration: 'none', textAlign: 'center', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = `${project.color}25`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${project.color}15`; }}>
              View Live →
            </a>
          ) : (
            <div style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, color: 'rgba(255,255,255,0.25)', fontSize: 13, fontFamily: "'Space Mono',monospace", textAlign: 'center' }}>
              NDA Protected
            </div>
          )}
          <Link to="/contact"
            style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 700, fontFamily: "'Sora',sans-serif", textDecoration: 'none', textAlign: 'center', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; }}>
            Similar?
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div style={{ padding: '108px 5% 0', minHeight: '100vh' }}>
      <style>{`
        @keyframes fadeUp  { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
        @keyframes pulse   { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 900px;
          margin: 0 auto;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .cat-bar { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }

        @media (max-width: 700px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); }
          .stats-grid > div:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.06) !important; }
        }
        @media (max-width: 480px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <div style={{ textAlign: 'center', marginBottom: 64, animation: 'fadeUp 0.6s ease both' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px', borderRadius: 999, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.07)', marginBottom: 20 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: '#22C55E', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Selected Work</span>
        </div>
        <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(32px,5.5vw,68px)', fontWeight: 900, color: '#fff', margin: '0 0 18px', letterSpacing: -2.5, lineHeight: 1.04 }}>
          Work That{' '}
          <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.3)' }}>Speaks</span>
          <br />
          <span style={{ color: '#22C55E' }}>for Itself.</span>
        </h1>
        <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(14px,1.8vw,17px)', color: 'rgba(255,255,255,0.42)', maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.8 }}>
          Real products, real results. Every project below was shipped on time, on budget, and built to scale.
        </p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['🔒 NDA available','📦 Full source code','🚀 Production-ready','⚡ On-time delivery'].map((v, i) => (
            <span key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', fontFamily: "'Space Mono',monospace" }}>{v}</span>
          ))}
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 72 }}>
        <div className="stats-grid" style={{ background: 'rgba(255,255,255,0.01)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '28px 20px', borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 32, fontWeight: 900, color: s.color, letterSpacing: -1, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.32)', marginTop: 6, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5, textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Category Filter ── */}
      <div className="cat-bar" style={{ marginBottom: 36 }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            style={{ padding: '8px 20px', borderRadius: 10, border: activeCategory === cat ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.08)', background: activeCategory === cat ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.03)', color: activeCategory === cat ? '#22C55E' : 'rgba(255,255,255,0.45)', fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.18s' }}>
            {cat}
            <span style={{ marginLeft: 7, padding: '1px 7px', borderRadius: 999, background: activeCategory === cat ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)', fontSize: 10, color: activeCategory === cat ? '#22C55E' : 'rgba(255,255,255,0.3)', fontFamily: "'Space Mono',monospace" }}>
              {cat === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── Project Grid ── */}
      <section style={{ marginBottom: 96 }}>
        <div className="portfolio-grid">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ── Process Strip ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto 88px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 22, padding: 'clamp(32px,5vw,52px) clamp(24px,4vw,48px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, border: '1px solid #3B82F640', background: '#3B82F612', color: '#3B82F6', fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>How We Work</span>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 900, color: '#fff', marginTop: 12, letterSpacing: -0.8 }}>Every Project. Same Standard.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          {[
            { step: '01', icon: '🔍', title: 'Discovery Call',      desc: 'We scope the full project, agree on milestones, and sign an NDA before anything starts.' },
            { step: '02', icon: '📐', title: 'Technical Blueprint', desc: 'Detailed architecture doc, tech stack decisions, and a fixed-price quote — no surprises.' },
            { step: '03', icon: '⚙️', title: 'Sprint Delivery',     desc: 'Weekly demos on a live staging URL. You give feedback, we ship fast.' },
            { step: '04', icon: '🚀', title: 'Launch & Handover',   desc: 'Full documentation, repo access, and optional retainer support post-launch.' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '22px 18px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: 'rgba(255,255,255,0.18)', letterSpacing: 2, marginBottom: 12 }}>{s.step}</div>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 7 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.65 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ marginBottom: 88 }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, border: '1px solid #ffffff15', background: '#ffffff08', color: 'rgba(255,255,255,0.5)', fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: 'uppercase' }}>Client Feedback</span>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 900, color: '#fff', marginTop: 12, letterSpacing: -0.8 }}>What Clients Say About the Work</h2>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: 28, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${t.color}30`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ fontSize: 28, color: t.color, fontFamily: 'Georgia,serif', lineHeight: 1, marginBottom: 14, opacity: 0.7 }}>"</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 22 }}>{t.quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${t.color}20`, border: `1px solid ${t.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 12, color: t.color }}>{t.avatar}</div>
                <div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: '#fff' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack Marquee ── */}
      <section style={{ padding: '36px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', marginBottom: 88 }}>
        <div style={{ display: 'flex', gap: 48, animation: 'marquee 22s linear infinite', width: 'max-content' }}>
          {[...['React','Next.js','Node.js','MongoDB','PostgreSQL','Docker','AWS','Python','TypeScript','Kubernetes','Redis','Terraform','Figma','LangChain','Stripe','GraphQL'], ...['React','Next.js','Node.js','MongoDB','PostgreSQL','Docker','AWS','Python','TypeScript','Kubernetes','Redis','Terraform','Figma','LangChain','Stripe','GraphQL']].map((t, i) => (
            <span key={i} style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.13)', letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{t}</span>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', paddingBottom: 100 }}>
        <div style={{ position: 'relative', background: 'linear-gradient(135deg,rgba(34,197,94,0.09) 0%,rgba(59,130,246,0.06) 100%)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 24, padding: 'clamp(48px,6vw,80px) clamp(24px,5%,64px)', textAlign: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(34,197,94,0.07),transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, border: '1px solid #22C55E40', background: '#22C55E10', color: '#22C55E', fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Start a Project</span>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(26px,4.5vw,52px)', fontWeight: 900, color: '#fff', margin: '18px auto 16px', letterSpacing: -1.5, lineHeight: 1.08, maxWidth: 580 }}>
              Want Your Project<br /><span style={{ color: '#22C55E' }}>In This Portfolio?</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, maxWidth: 460, margin: '0 auto 34px', lineHeight: 1.75 }}>
              We build ambitious products for ambitious founders. Tell us what you're building and we'll respond within 24 hours with a proposal.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
              <Link to="/contact" className="btn-primary" style={{ padding: '15px 36px', background: '#22C55E', color: '#000', fontSize: 15, fontWeight: 700, borderRadius: 12, textDecoration: 'none', display: 'inline-block' }}>
                Start a Project →
              </Link>
              <Link to="/services" className="btn-outline" style={{ padding: '15px 28px', fontSize: 15, borderRadius: 12, textDecoration: 'none', display: 'inline-block' }}>
                Browse Services
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['✓ Free consultation', '✓ Fixed-price quotes', '✓ NDA on request'].map((t, i) => (
                <span key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontFamily: "'Space Mono',monospace" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}