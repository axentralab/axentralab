import { useState, useEffect } from 'react';
import api from '../services/api';

const FALLBACK = [
  { _id:'1', title:'OWASP Top 10: What Every Developer Must Know in 2025', category:'Cybersecurity', excerpt:'Understanding the most critical web application security risks and how to protect against them.', createdAt:'2025-02-28', views:1240 },
  { _id:'2', title:'Building AI Agents with LangChain and Node.js',         category:'AI Automation', excerpt:'A practical guide to building production-ready AI agents using LangChain, Node.js and GPT-4.',   createdAt:'2025-02-20', views:980 },
  { _id:'3', title:'Zero-Downtime Deployments with Docker & Nginx',         category:'DevOps',        excerpt:'Step-by-step walkthrough for achieving zero-downtime deployments using Docker, Nginx and GitHub Actions.', createdAt:'2025-02-12', views:740 },
  { _id:'4', title:'Multi-Tenant SaaS Architecture: Patterns & Pitfalls',   category:'SaaS Dev',      excerpt:'Learn the key architectural patterns for building scalable multi-tenant SaaS products.',       createdAt:'2025-02-05', views:610 },

  // Cybersecurity Education & Awareness
  { _id:'5', title:'10 Most Common WordPress Security Mistakes (and How to Fix Them)', category:'Cybersecurity', excerpt:'Avoid the typical WordPress security pitfalls with practical solutions.', createdAt:'2026-03-01', views:0 },
  { _id:'6', title:'How to Protect Your Business from Phishing Attacks in 2026', category:'Cybersecurity', excerpt:'Stay ahead of phishing threats with our latest strategies.', createdAt:'2026-03-02', views:0 },
  { _id:'7', title:'Step-by-Step Guide: Securing Your Website Like a Pro', category:'Cybersecurity', excerpt:'A full walkthrough on locking down your site against common exploits.', createdAt:'2026-03-03', views:0 },
  { _id:'8', title:'Top 5 Cyber Threats Facing Small Businesses and How Axentralab Prevents Them', category:'Cybersecurity', excerpt:'Discover the biggest risks for small companies and our preventive tactics.', createdAt:'2026-03-04', views:0 },
  { _id:'9', title:'Understanding Ransomware: Prevention Tips for Companies', category:'Cybersecurity', excerpt:'Key steps to protect your organization from costly ransomware attacks.', createdAt:'2026-03-05', views:0 },

  // Web Development Trends & Tutorials
  { _id:'10', title:'Why MERN Stack is the Future of Scalable Web Apps', category:'Web Dev', excerpt:'An analysis of why MERN continues to dominate modern web development.', createdAt:'2026-03-06', views:0 },
  { _id:'11', title:'Building a Secure SaaS Product in 30 Days: A Complete Roadmap', category:'SaaS Dev', excerpt:'Timeline and tactics for launching a secure SaaS application fast.', createdAt:'2026-03-07', views:0 },
  { _id:'12', title:'How to Optimize Your Website Speed for Google Core Web Vitals', category:'Web Dev', excerpt:'Performance tips to hit the latest Core Web Vitals benchmarks.', createdAt:'2026-03-08', views:0 },
  { _id:'13', title:'Top 10 React Hooks Every Developer Should Know in 2026', category:'Web Dev', excerpt:'A curated list of hooks that boost productivity and maintainability.', createdAt:'2026-03-09', views:0 },
  { _id:'14', title:'From Wireframe to Launch: How Axentralab Builds Client Websites', category:'Web Dev', excerpt:'See our process for taking a design from concept to live site.', createdAt:'2026-03-10', views:0 },

  // AI & Machine Learning in Business
  { _id:'15', title:'How AI is Changing Cybersecurity: A Beginner’s Guide', category:'AI Automation', excerpt:'Introduction to AI-powered defenses and what they mean for security professionals.', createdAt:'2026-03-11', views:0 },
  { _id:'16', title:'Machine Learning for Predicting Website Attacks', category:'AI Automation', excerpt:'Using ML models to forecast and block malicious traffic.', createdAt:'2026-03-12', views:0 },
  { _id:'17', title:'Using AI to Optimize UX on Your Website', category:'AI Automation', excerpt:'Leverage artificial intelligence to personalize and improve user journeys.', createdAt:'2026-03-13', views:0 },
  { _id:'18', title:'Axentralab Case Study: How ML Helped Detect Security Vulnerabilities Faster', category:'AI Automation', excerpt:'A real-world example of machine learning accelerating our pentests.', createdAt:'2026-03-14', views:0 },
  { _id:'19', title:'The Future of Automated Threat Detection with AI', category:'AI Automation', excerpt:'What next‑generation AI systems will mean for threat hunting.', createdAt:'2026-03-15', views:0 },

  // SaaS & Product Development
  { _id:'20', title:'How to Turn Your Idea into a SaaS Product in 6 Steps', category:'SaaS Dev', excerpt:'A simple framework for going from concept to paying customers.', createdAt:'2026-03-16', views:0 },
  { _id:'21', title:'Why Multi-Tier Subscription Models Work for Tech Startups', category:'SaaS Dev', excerpt:'Explore pricing strategies that maximize revenue and retention.', createdAt:'2026-03-17', views:0 },
  { _id:'22', title:'The Complete Checklist for Launching a Web Security SaaS', category:'SaaS Dev', excerpt:'Everything you need before rolling out your security platform.', createdAt:'2026-03-18', views:0 },
  { _id:'23', title:'Axentralab’s Approach to Building Client-Focused SaaS', category:'SaaS Dev', excerpt:'How we prioritize users when crafting subscription products.', createdAt:'2026-03-19', views:0 },
  { _id:'24', title:'From Concept to Code: Launching a Cybersecurity Tool Without a Huge Budget', category:'SaaS Dev', excerpt:'Bootstrapping a security app with limited resources.', createdAt:'2026-03-20', views:0 },

  // Case Studies & Success Stories
  { _id:'25', title:'How We Helped a Local Business Avoid a Cyberattack', category:'Cybersecurity', excerpt:'A case study detailing our defense implementation for a small client.', createdAt:'2026-03-21', views:0 },
  { _id:'26', title:'Case Study: Migrating a Website to a Fully Secure MERN Stack', category:'Web Dev', excerpt:'Lessons learned migrating a client to a hardened MERN architecture.', createdAt:'2026-03-22', views:0 },
  { _id:'27', title:'Axentralab’s Top 5 Security Wins in 2025', category:'Cybersecurity', excerpt:'A roundup of our most impactful security projects from last year.', createdAt:'2026-03-23', views:0 },
  { _id:'28', title:'Before & After: Website Optimization that Boosted Conversions by 30%', category:'Web Dev', excerpt:'How performance tweaks translated into real revenue gains.', createdAt:'2026-03-24', views:0 },
  { _id:'29', title:'Real Lessons from Client Projects: Security & Performance', category:'General', excerpt:'Hard‑earned insights from working with diverse customers.', createdAt:'2026-03-25', views:0 },
];

const TAG_COLORS = { Cybersecurity:'#EF4444', 'AI Automation':'#22C55E', DevOps:'#8B5CF6', 'SaaS Dev':'#F59E0B', 'Web Dev':'#3B82F6', General:'#06B6D4' };

export default function BlogPage() {
  const [posts, setPosts] = useState(FALLBACK);

  useEffect(() => {
    api.get('/blog').then(r => { if (r.data.data?.length) setPosts(r.data.data); }).catch(() => {});
  }, []);

  return (
    <div style={{ padding:'100px 5% 80px', minHeight:'100vh' }}>
      <div style={{ textAlign:'center', marginBottom:52 }}>
        <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #06B6D440', background:'#06B6D412', color:'#06B6D4', fontSize:11, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Insights</span>
        <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px,5vw,58px)', fontWeight:900, color:'#fff', marginTop:16, letterSpacing:-1.5 }}>Tech Blog</h1>
        <p style={{ color:'rgba(255,255,255,0.45)', fontSize:15, maxWidth:420, margin:'12px auto 0' }}>Expert articles on cybersecurity, AI and modern engineering.</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20, maxWidth:1100, margin:'0 auto' }}>
        {posts.map((p,i) => {
          const color = TAG_COLORS[p.category] || '#06B6D4';
          return (
            <div key={p._id} className="card" style={{ padding:0, overflow:'hidden', cursor:'pointer', transition:'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor=`${color}35`; }}
              onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; }}>
              <div style={{ height:4, background:`linear-gradient(90deg,${color},transparent)` }} />
              <div style={{ padding:24 }}>
                <span style={{ display:'inline-block', padding:'2px 10px', borderRadius:999, border:`1px solid ${color}30`, background:`${color}10`, color, fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:0.5, textTransform:'uppercase', fontWeight:600 }}>{p.category}</span>
                <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:16, fontWeight:800, color:'#fff', margin:'12px 0 10px', lineHeight:1.4, letterSpacing:-0.2 }}>{p.title}</h3>
                <p style={{ fontSize:13, color:'rgba(255,255,255,0.45)', lineHeight:1.65, marginBottom:16 }}>{p.excerpt}</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.3)' }}>{new Date(p.createdAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.3)' }}>{p.views} views</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
