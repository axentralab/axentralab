import { useState } from 'react';

// ── প্রতিটা project-এর image ও demoUrl নিজের file নাম দিয়ে replace করো ──
import imgFintech     from '../assets/fintech-dashboard.png';
import imgEcommerce   from '../assets/ecommerce-ai.png';
import imgBankco      from '../assets/security-bankco.png';
import imgCloud       from '../assets/cloud-migration.png';
import imgHealthcare  from '../assets/healthcare-saas.png';
import imgCrm         from '../assets/ai-crm.png';
import imgApiThreat   from '../assets/api-threat.png';
import imgDevops      from '../assets/devops-pipeline.png';
import imgMobile      from '../assets/mobile-fintech.png';
import imgElearning   from '../assets/elearning.png';
import imgPentest     from '../assets/pentest.png';
import imgLogistics   from '../assets/logistics-ai.png';

const PROJECTS = [
  { title:'FinTech Dashboard',         category:'Web Dev',       tech:['React','Node.js','MongoDB'],      result:'+340% performance',        color:'#22C55E', img:imgFintech,    demoUrl:'https://fintech-seven-gamma.vercel.app/',     desc:'Real-time financial analytics platform with live data streaming and custom charting.' },
  { title:'E-Commerce AI Automation',  category:'AI Automation', tech:['Python','GPT-4','Zapier'],        result:'80% manual work cut',       color:'#3B82F6', img:imgEcommerce,  demoUrl:'https://demo.axentralab.com/ecommerce',   desc:'End-to-end order processing automation that eliminated repetitive ops tasks entirely.' },
  { title:'Security Audit – BankCo',   category:'Cybersecurity', tech:['Burp Suite','Metasploit'],        result:'0 breaches post-audit',     color:'#EF4444', img:imgBankco,     demoUrl:'https://demo.axentralab.com/bankco',      desc:'Full red-team engagement uncovering 23 critical CVEs before the platform went live.' },
  { title:'Cloud Migration – SaaS Co', category:'DevOps',        tech:['Docker','AWS','Terraform'],       result:'60% cost reduction',        color:'#8B5CF6', img:imgCloud,      demoUrl:'https://demo.axentralab.com/cloud',       desc:'Migrated a monolith to containerised microservices, cutting infra spend by more than half.' },
  { title:'Healthcare SaaS Platform',  category:'SaaS Dev',      tech:['Next.js','PostgreSQL','Redis'],   result:'10k+ users in 3 months',    color:'#F59E0B', img:imgHealthcare, demoUrl:'https://demo.axentralab.com/healthcare',  desc:'HIPAA-compliant patient management SaaS built and shipped from zero in 11 weeks.' },
  { title:'AI CRM Integration',        category:'AI Automation', tech:['LangChain','HubSpot API'],        result:'3x lead conversion',        color:'#06B6D4', img:imgCrm,        demoUrl:'https://demo.axentralab.com/crm',         desc:'LLM-powered lead scoring and auto-follow-up sequences plugged directly into HubSpot.' },
  { title:'API Threat Detection',      category:'Cybersecurity', tech:['Python','FastAPI','ML'],          result:'99.4% detection rate',      color:'#F43F5E', img:imgApiThreat,  demoUrl:'https://demo.axentralab.com/api-threat',  desc:'Machine-learning model that flags anomalous API traffic patterns in under 80ms.' },
  { title:'DevOps Pipeline Overhaul',  category:'DevOps',        tech:['GitHub Actions','K8s','ArgoCD'], result:'Deploy: 45 min → 4 min',    color:'#A855F7', img:imgDevops,     demoUrl:'#',      desc:'Rebuilt a legacy Jenkins pipeline into a fully declarative GitOps workflow.' },
  { title:'Mobile Fintech App',        category:'Web Dev',       tech:['React Native','Plaid','Stripe'],  result:'4.9★ App Store rating',     color:'#10B981', img:imgMobile,     demoUrl:'#',      desc:'Cross-platform personal finance app with bank-grade security and instant transfers.' },
  { title:'E-Learning Platform',       category:'SaaS Dev',      tech:['Vue.js','Django','Celery'],       result:'50k+ enrolled learners',    color:'#F97316', img:imgElearning,  demoUrl:'#',   desc:'Full LMS with live video, quizzes, certificates, and Stripe subscription billing.' },
  { title:'Pentesting Automation',     category:'Cybersecurity', tech:['Nuclei','Playwright','Go'],       result:'10× faster scan cycles',    color:'#EF4444', img:imgPentest,    demoUrl:'#',     desc:'Custom scanner that chains recon, fuzzing, and exploit checks in a single pipeline.' },
  { title:'Logistics AI Dispatcher',   category:'AI Automation', tech:['OR-Tools','GPT-4','Maps API'],   result:'31% fuel cost saved',       color:'#3B82F6', img:imgLogistics,  demoUrl:'#',   desc:'Route-optimisation engine that dynamically re-plans deliveries based on live traffic.' },
];

const CATS = ['All','Web Dev','AI Automation','Cybersecurity','DevOps','SaaS Dev'];

const STATS = [
  { value:'120+', label:'Projects Delivered', color:'#22C55E' },
  { value:'98%',  label:'Client Retention',   color:'#3B82F6' },
  { value:'$2M+', label:'Revenue Generated',  color:'#A855F7' },
  { value:'4.9★', label:'Avg Client Rating',  color:'#F59E0B' },
];

const PROCESS = [
  { step:'01', icon:'🔍', title:'Discovery Call',    desc:'We audit your current setup, understand your goals, and identify the highest-leverage opportunities.' },
  { step:'02', icon:'🗺️', title:'Roadmap & Scope',   desc:'A detailed technical plan with milestones, deliverables, and a fixed or capped budget — no surprises.' },
  { step:'03', icon:'⚙️', title:'Build & Iterate',   desc:'Weekly demos, async updates on Slack or Notion, and a staging environment you can access anytime.' },
  { step:'04', icon:'🚀', title:'Launch & Handover', desc:'Full documentation, knowledge transfer, and optional retainer support post-launch.' },
];

const TESTIMONIALS = [
  { name:'Rachel Kim',   role:'CEO, FinNova',        avatar:'RK', color:'#22C55E', quote:'They rebuilt our dashboard from scratch in 6 weeks. Performance went up 340% and our users noticed immediately.' },
  { name:'Marcus Webb',  role:'CTO, BankCo',         avatar:'MW', color:'#EF4444', quote:'The security audit was thorough and non-disruptive. They found issues our internal team had missed for two years.' },
  { name:'Priya Nair',   role:'Founder, LearnLoop',  avatar:'PN', color:'#F97316', quote:'50,000 learners in six months. The platform has never gone down. These guys just ship and it works.' },
  { name:'Diego Torres', role:'Head of Ops, Carrgo', avatar:'DT', color:'#3B82F6', quote:'The AI dispatcher saved us 31% on fuel in the first month alone. ROI was clear within two weeks of going live.' },
];

const CLIENTS = ['FinNova','BankCo','LearnLoop','Carrgo','NexoraSaaS','CloudStack','Medify','DataBridge','ShopForge','Vaultify'];

/* ── Demo Modal ── */
function DemoModal({ project, onClose }) {
  if (!project) return null;
  const { title, category, desc, tech, result, color, img, demoUrl } = project;
  return (
    <div
      onClick={onClose}
      style={{
        position:'fixed', inset:0, zIndex:1000,
        background:'rgba(0,0,0,0.8)', backdropFilter:'blur(8px)',
        display:'flex', alignItems:'center', justifyContent:'center', padding:20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background:'#0d0d12',
          border:`1px solid ${color}35`,
          borderRadius:24,
          width:'100%', maxWidth:620,
          boxShadow:`0 40px 100px ${color}20`,
          overflow:'hidden',
        }}
      >
        {/* top colour bar */}
        <div style={{ height:4, background:`linear-gradient(90deg,${color},transparent)` }} />

        {/* project screenshot */}
        <div style={{ position:'relative', height:240, overflow:'hidden', background:`linear-gradient(135deg,${color}15,${color}05)` }}>
          <img
            src={img}
            alt={title}
            style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.9 }}
          />
          {/* gradient overlay bottom */}
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:80, background:'linear-gradient(to top, #0d0d12, transparent)' }} />
          {/* category badge */}
          <span style={{
            position:'absolute', top:14, left:16,
            padding:'3px 10px', borderRadius:999,
            border:`1px solid ${color}40`, background:`${color}20`,
            color:color, fontSize:10, fontFamily:"'Space Mono',monospace",
            letterSpacing:0.5, textTransform:'uppercase', fontWeight:600,
          }}>{category}</span>
          {/* close button */}
          <button
            onClick={onClose}
            style={{
              position:'absolute', top:12, right:14,
              background:'rgba(0,0,0,0.55)', border:'1px solid rgba(255,255,255,0.12)',
              color:'rgba(255,255,255,0.7)', width:32, height:32,
              borderRadius:999, cursor:'pointer', fontSize:15,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}
          >✕</button>
        </div>

        <div style={{ padding:'24px 28px 28px' }}>
          {/* title + result */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12, marginBottom:12, flexWrap:'wrap' }}>
            <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:900, color:'#fff', margin:0, letterSpacing:-0.5 }}>{title}</h3>
            <span style={{ display:'flex', alignItems:'center', gap:6, color:color, fontWeight:700, fontSize:13, flexShrink:0 }}>
              <span style={{ fontSize:16 }}>↗</span>{result}
            </span>
          </div>

          {/* description */}
          <p style={{ fontSize:14, color:'rgba(255,255,255,0.55)', lineHeight:1.75, marginBottom:18 }}>{desc}</p>

          {/* tech tags */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:24 }}>
            {tech.map((t,i) => (
              <span key={i} style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'rgba(255,255,255,0.45)', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)', padding:'4px 10px', borderRadius:6 }}>{t}</span>
            ))}
          </div>

          {/* action buttons */}
          <div style={{ display:'flex', gap:10 }}>
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex:1, padding:'13px', background:color,
                color: ['#22C55E','#F59E0B','#F97316','#10B981'].includes(color) ? '#000' : '#fff',
                borderRadius:12, fontSize:14, fontWeight:700,
                fontFamily:"'Sora',sans-serif", textAlign:'center',
                textDecoration:'none', display:'flex',
                alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer',
              }}
            >
              🚀 View Live Demo
            </a>
            <button
              onClick={onClose}
              style={{
                padding:'13px 20px', background:'rgba(255,255,255,0.05)',
                border:'1px solid rgba(255,255,255,0.1)', borderRadius:12,
                color:'rgba(255,255,255,0.5)', fontSize:13, cursor:'pointer',
                fontFamily:"'Sora',sans-serif",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [filter, setFilter]     = useState('All');
  const [hovered, setHovered]   = useState(null);
  const [modalProject, setModalProject] = useState(null);

  const shown = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <div style={{ padding:'100px 5% 0', minHeight:'100vh' }}>

      {/* ── Demo Modal ── */}
      <DemoModal project={modalProject} onClose={() => setModalProject(null)} />

      {/* ── Hero ── */}
      <div style={{ textAlign:'center', marginBottom:52 }}>
        <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #8B5CF640', background:'#8B5CF612', color:'#8B5CF6', fontSize:11, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Portfolio</span>
        <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px,5vw,58px)', fontWeight:900, color:'#fff', marginTop:16, letterSpacing:-1.5 }}>
          Our Work<br /><span style={{ color:'#22C55E' }}>Speaks</span> for Itself
        </h1>
        <p style={{ color:'rgba(255,255,255,0.45)', fontSize:15, maxWidth:420, margin:'12px auto 0' }}>Real projects, real results — delivered for clients worldwide.</p>
      </div>

      {/* ── Stats Bar ── */}
      <div style={{ maxWidth:1100, margin:'0 auto 68px', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', background:'rgba(255,255,255,0.03)', borderRadius:16, overflow:'hidden', border:'1px solid rgba(255,255,255,0.07)' }}>
        {STATS.map((s,i) => (
          <div key={i} style={{ padding:'28px 20px', textAlign:'center', borderRight: i < STATS.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:32, fontWeight:900, color:s.color, letterSpacing:-1 }}>{s.value}</div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.35)', marginTop:5, fontFamily:"'Space Mono',monospace", letterSpacing:0.5 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Filter ── */}
      <div style={{ overflowX:'auto', marginBottom:36, paddingBottom:4 }}>
        <div style={{ display:'flex', gap:8, justifyContent:'center', minWidth:'max-content', padding:'0 4px' }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{ padding:'8px 18px', borderRadius:999, background:filter===c?'#22C55E':'rgba(255,255,255,0.05)', border:filter===c?'none':'1px solid rgba(255,255,255,0.1)', color:filter===c?'#000':'rgba(255,255,255,0.6)', fontWeight:600, fontSize:13, cursor:'pointer', transition:'all 0.2s', whiteSpace:'nowrap' }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ── Project Grid ── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20, maxWidth:1100, margin:'0 auto' }}>
        {shown.map((p,i) => (
          <div key={`${filter}-${i}`}
            onClick={() => setModalProject(p)}
            style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, cursor:'pointer', transition:'all 0.25s', overflow:'hidden' }}
            onMouseEnter={e => { setHovered(i); e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.borderColor=p.color+'40'; e.currentTarget.style.boxShadow=`0 16px 40px ${p.color}14`; }}
            onMouseLeave={e => { setHovered(null); e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow='none'; }}
          >
            {/* ── Project Image ── */}
            <div style={{ height:180, overflow:'hidden', position:'relative', background:`linear-gradient(135deg,${p.color}18,${p.color}06)` }}>
              <img
                src={p.img}
                alt={p.title}
                style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.35s' }}
                onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
              />
              {/* bottom fade */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:60, background:'linear-gradient(to top, rgba(13,13,18,0.85), transparent)' }} />
              {/* category badge */}
              <span style={{
                position:'absolute', bottom:10, right:12,
                padding:'3px 10px', borderRadius:999,
                border:`1px solid ${p.color}35`, background:`${p.color}18`,
                color:p.color, fontSize:10,
                fontFamily:"'Space Mono',monospace", letterSpacing:0.5,
                textTransform:'uppercase', fontWeight:600,
              }}>{p.category}</span>
            </div>

            <div style={{ padding:22 }}>
              <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:17, fontWeight:800, color:'#fff', margin:'0 0 8px', letterSpacing:-0.3 }}>{p.title}</h3>
              <p style={{ fontSize:13, color:'rgba(255,255,255,0.4)', lineHeight:1.65, marginBottom:14 }}>{p.desc}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:16 }}>
                {p.tech.map((t,j) => <span key={j} style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.35)', background:'rgba(255,255,255,0.05)', padding:'2px 7px', borderRadius:4 }}>{t}</span>)}
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <span style={{ color:p.color, fontSize:14 }}>↗</span>
                  <span style={{ fontSize:13, color:p.color, fontWeight:700 }}>{p.result}</span>
                </div>
                <span style={{ fontSize:12, color:'rgba(255,255,255,0.25)', fontFamily:"'Space Mono',monospace" }}>View case →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Client Logos ── */}
      <div style={{ maxWidth:1100, margin:'76px auto 0', textAlign:'center' }}>
        <p style={{ fontSize:11, color:'rgba(255,255,255,0.2)', fontFamily:"'Space Mono',monospace", letterSpacing:2, textTransform:'uppercase', marginBottom:24 }}>Trusted by teams at</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center' }}>
          {CLIENTS.map((c,i) => (
            <span key={i} style={{ padding:'7px 18px', borderRadius:999, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', fontFamily:"'Sora',sans-serif", fontSize:13, fontWeight:700, color:'rgba(255,255,255,0.25)', letterSpacing:-0.3 }}>{c}</span>
          ))}
        </div>
      </div>

      {/* ── Our Process ── */}
      <div style={{ maxWidth:1100, margin:'80px auto 0' }}>
        <div style={{ textAlign:'center', marginBottom:44 }}>
          <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #3B82F640', background:'#3B82F612', color:'#3B82F6', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>How We Work</span>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:28, fontWeight:800, color:'#fff', marginTop:12, letterSpacing:-0.5 }}>From First Call to Launch Day</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16 }}>
          {PROCESS.map((s,i) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, padding:'28px 22px' }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.15)', letterSpacing:2, marginBottom:18 }}>{s.step}</div>
              <div style={{ fontSize:28, marginBottom:14 }}>{s.icon}</div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:16, fontWeight:800, color:'#fff', marginBottom:8 }}>{s.title}</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.42)', lineHeight:1.7 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div style={{ maxWidth:1100, margin:'80px auto 0' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #ffffff15', background:'#ffffff08', color:'rgba(255,255,255,0.5)', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase' }}>Client Stories</span>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:28, fontWeight:800, color:'#fff', marginTop:12, letterSpacing:-0.5 }}>What Clients Say</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:20 }}>
          {TESTIMONIALS.map((t,i) => (
            <div key={i}
              style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, padding:28, transition:'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=`${t.color}30`; e.currentTarget.style.transform='translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform='none'; }}>
              <div style={{ fontSize:28, color:t.color, fontFamily:'Georgia,serif', lineHeight:1, marginBottom:14, opacity:0.6 }}>"</div>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.62)', lineHeight:1.75, marginBottom:22 }}>{t.quote}</p>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:38, height:38, borderRadius:'50%', background:`${t.color}18`, border:`1px solid ${t.color}35`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:12, color:t.color }}>{t.avatar}</div>
                <div>
                  <div style={{ fontFamily:"'Sora',sans-serif", fontSize:13, fontWeight:700, color:'#fff' }}>{t.name}</div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.32)', marginTop:1 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ maxWidth:1100, margin:'80px auto 0', paddingBottom:100 }}>
        <div style={{ background:'linear-gradient(135deg,rgba(139,92,246,0.1) 0%,rgba(34,197,94,0.07) 100%)', border:'1px solid rgba(139,92,246,0.2)', borderRadius:24, padding:'64px 48px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 65%)', pointerEvents:'none' }} />
          <div style={{ position:'relative' }}>
            <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #8B5CF640', background:'#8B5CF612', color:'#8B5CF6', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Start a Project</span>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(24px,4vw,42px)', fontWeight:900, color:'#fff', margin:'20px auto 16px', letterSpacing:-1, maxWidth:560 }}>
              Ready to Build<br /><span style={{ color:'#8B5CF6' }}>Something Great?</span>
            </h2>
            <p style={{ color:'rgba(255,255,255,0.42)', fontSize:15, maxWidth:440, margin:'0 auto 32px', lineHeight:1.7 }}>
              Tell us about your project and we'll respond within 24 hours with a tailored proposal.
            </p>
            <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
              <button className="btn-primary" style={{ padding:'15px 36px', background:'#8B5CF6', color:'#fff', fontSize:15, border:'none', fontWeight:700 }}>Get a Free Proposal →</button>
              <button className="btn-outline" style={{ padding:'15px 28px', fontSize:15 }}>View All Case Studies</button>
            </div>
            <div style={{ marginTop:24, display:'flex', gap:24, justifyContent:'center', flexWrap:'wrap' }}>
              {['✓ 24hr response time','✓ Fixed-price quotes','✓ NDA on request'].map((t,i) => (
                <span key={i} style={{ fontSize:12, color:'rgba(255,255,255,0.3)', fontFamily:"'Space Mono',monospace" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}