import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

/* ── Same FALLBACK as BlogPage so it works without backend ── */
const FALLBACK = [
  { _id:'1',  title:'OWASP Top 10: What Every Developer Must Know in 2025',                    category:'Cybersecurity',  excerpt:'Understanding the most critical web application security risks and how to protect against them.',                                          createdAt:'2025-02-28', views:1240 },
  { _id:'2',  title:'Building AI Agents with LangChain and Node.js',                          category:'AI Automation',  excerpt:'A practical guide to building production-ready AI agents using LangChain, Node.js and GPT-4.',                                           createdAt:'2025-02-20', views:980  },
  { _id:'3',  title:'Zero-Downtime Deployments with Docker & Nginx',                          category:'DevOps',         excerpt:'Step-by-step walkthrough for achieving zero-downtime deployments using Docker, Nginx and GitHub Actions.',                                createdAt:'2025-02-12', views:740  },
  { _id:'4',  title:'Multi-Tenant SaaS Architecture: Patterns & Pitfalls',                    category:'SaaS Dev',       excerpt:'Learn the key architectural patterns for building scalable multi-tenant SaaS products.',                                               createdAt:'2025-02-05', views:610  },
  { _id:'5',  title:'10 Most Common WordPress Security Mistakes (and How to Fix Them)',        category:'Cybersecurity',  excerpt:'Avoid the typical WordPress security pitfalls with practical solutions.',                                                            createdAt:'2026-03-01', views:0    },
  { _id:'6',  title:'How to Protect Your Business from Phishing Attacks in 2026',             category:'Cybersecurity',  excerpt:'Stay ahead of phishing threats with our latest strategies.',                                                                        createdAt:'2026-03-02', views:0    },
  { _id:'7',  title:'Step-by-Step Guide: Securing Your Website Like a Pro',                   category:'Cybersecurity',  excerpt:'A full walkthrough on locking down your site against common exploits.',                                                              createdAt:'2026-03-03', views:0    },
  { _id:'8',  title:'Top 5 Cyber Threats Facing Small Businesses',                            category:'Cybersecurity',  excerpt:'Discover the biggest risks for small companies and our preventive tactics.',                                                         createdAt:'2026-03-04', views:0    },
  { _id:'9',  title:'Understanding Ransomware: Prevention Tips for Companies',                 category:'Cybersecurity',  excerpt:'Key steps to protect your organization from costly ransomware attacks.',                                                             createdAt:'2026-03-05', views:0    },
  { _id:'10', title:'Why MERN Stack is the Future of Scalable Web Apps',                      category:'Web Dev',        excerpt:'An analysis of why MERN continues to dominate modern web development.',                                                             createdAt:'2026-03-06', views:0    },
  { _id:'11', title:'Building a Secure SaaS Product in 30 Days: A Complete Roadmap',          category:'SaaS Dev',       excerpt:'Timeline and tactics for launching a secure SaaS application fast.',                                                                 createdAt:'2026-03-07', views:0    },
  { _id:'12', title:'How to Optimize Your Website Speed for Google Core Web Vitals',          category:'Web Dev',        excerpt:'Performance tips to hit the latest Core Web Vitals benchmarks.',                                                                    createdAt:'2026-03-08', views:0    },
  { _id:'13', title:'Top 10 React Hooks Every Developer Should Know in 2026',                 category:'Web Dev',        excerpt:'A curated list of hooks that boost productivity and maintainability.',                                                               createdAt:'2026-03-09', views:0    },
  { _id:'14', title:'From Wireframe to Launch: How Axentralab Builds Client Websites',        category:'Web Dev',        excerpt:'See our process for taking a design from concept to live site.',                                                                    createdAt:'2026-03-10', views:0    },
  { _id:'15', title:"How AI is Changing Cybersecurity: A Beginner's Guide",                   category:'AI Automation',  excerpt:'Introduction to AI-powered defenses and what they mean for security professionals.',                                                 createdAt:'2026-03-11', views:0    },
  { _id:'16', title:'Machine Learning for Predicting Website Attacks',                        category:'AI Automation',  excerpt:'Using ML models to forecast and block malicious traffic.',                                                                          createdAt:'2026-03-12', views:0    },
  { _id:'17', title:'Using AI to Optimize UX on Your Website',                                category:'AI Automation',  excerpt:'Leverage artificial intelligence to personalize and improve user journeys.',                                                          createdAt:'2026-03-13', views:0    },
  { _id:'18', title:'Axentralab Case Study: How ML Helped Detect Vulnerabilities Faster',     category:'AI Automation',  excerpt:'A real-world example of machine learning accelerating our pentests.',                                                               createdAt:'2026-03-14', views:0    },
  { _id:'19', title:'The Future of Automated Threat Detection with AI',                       category:'AI Automation',  excerpt:'What next-generation AI systems will mean for threat hunting.',                                                                     createdAt:'2026-03-15', views:0    },
  { _id:'20', title:'How to Turn Your Idea into a SaaS Product in 6 Steps',                   category:'SaaS Dev',       excerpt:'A simple framework for going from concept to paying customers.',                                                                    createdAt:'2026-03-16', views:0    },
  { _id:'21', title:'Why Multi-Tier Subscription Models Work for Tech Startups',              category:'SaaS Dev',       excerpt:'Explore pricing strategies that maximize revenue and retention.',                                                                    createdAt:'2026-03-17', views:0    },
  { _id:'22', title:'The Complete Checklist for Launching a Web Security SaaS',               category:'SaaS Dev',       excerpt:'Everything you need before rolling out your security platform.',                                                                    createdAt:'2026-03-18', views:0    },
  { _id:'23', title:"Axentralab's Approach to Building Client-Focused SaaS",                  category:'SaaS Dev',       excerpt:'How we prioritize users when crafting subscription products.',                                                                     createdAt:'2026-03-19', views:0    },
  { _id:'24', title:'From Concept to Code: Launching a Cybersecurity Tool on a Budget',       category:'SaaS Dev',       excerpt:'Bootstrapping a security app with limited resources.',                                                                             createdAt:'2026-03-20', views:0    },
  { _id:'25', title:'How We Helped a Local Business Avoid a Cyberattack',                     category:'Cybersecurity',  excerpt:'A case study detailing our defense implementation for a small client.',                                                             createdAt:'2026-03-21', views:0    },
  { _id:'26', title:'Case Study: Migrating a Website to a Fully Secure MERN Stack',           category:'Web Dev',        excerpt:'Lessons learned migrating a client to a hardened MERN architecture.',                                                              createdAt:'2026-03-22', views:0    },
  { _id:'27', title:"Axentralab's Top 5 Security Wins in 2025",                               category:'Cybersecurity',  excerpt:'A roundup of our most impactful security projects from last year.',                                                               createdAt:'2026-03-23', views:0    },
  { _id:'28', title:'Before & After: Website Optimization that Boosted Conversions by 30%',   category:'Web Dev',        excerpt:'How performance tweaks translated into real revenue gains.',                                                                        createdAt:'2026-03-24', views:0    },
  { _id:'29', title:'Real Lessons from Client Projects: Security & Performance',              category:'General',        excerpt:'Hard-earned insights from working with diverse customers.',                                                                         createdAt:'2026-03-25', views:0    },
];

const TAG_COLORS = {
  Cybersecurity:  '#EF4444',
  'AI Automation':'#22C55E',
  DevOps:         '#8B5CF6',
  'SaaS Dev':     '#F59E0B',
  'Web Dev':      '#3B82F6',
  General:        '#06B6D4',
};

/* Generate placeholder body content from the excerpt */
function generateBody(post) {
  return `
${post.excerpt}

## Overview

This article covers the essential aspects of ${post.title.toLowerCase()}. Whether you're a seasoned professional or just getting started, the insights here will help you make better decisions and avoid common pitfalls.

## Key Takeaways

- Understanding the core concepts is crucial before diving into implementation
- Real-world examples provide context that documentation alone cannot offer
- Continuous iteration and testing lead to better outcomes over time
- Security and performance should never be afterthoughts

## Deep Dive

The landscape of ${post.category} is evolving rapidly. Staying up-to-date requires both a strong theoretical foundation and hands-on practice. At Axentralab, we've seen first-hand how the right approach can make or break a project.

Our team has worked across dozens of client engagements in this space, and the lessons we've learned form the basis of this article. We hope you find it actionable and relevant to your own work.

## Conclusion

Mastering ${post.category.toLowerCase()} is a journey, not a destination. Start with the fundamentals, practice consistently, and don't hesitate to reach out to our team if you need expert guidance.
  `.trim();
}

export default function BlogPostPage() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [post, setPost]     = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    // try API first, fall back to local data
    api.get(`/blog/${id}`)
      .then(r => {
        setPost(r.data.data || r.data);
        setLoading(false);
      })
      .catch(() => {
        const found = FALLBACK.find(p => p._id === id);
        setPost(found || null);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!post) return;
    const rel = FALLBACK
      .filter(p => p._id !== post._id && p.category === post.category)
      .slice(0, 3);
    setRelated(rel);
  }, [post]);

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:40, height:40, border:'3px solid rgba(255,255,255,0.1)', borderTop:'3px solid #06B6D4', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' }} />
        <p style={{ color:'rgba(255,255,255,0.3)', fontFamily:"'Space Mono',monospace", fontSize:12 }}>Loading…</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!post) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>📭</div>
      <h2 style={{ fontFamily:"'Sora',sans-serif", color:'#fff', fontWeight:800 }}>Post not found</h2>
      <button onClick={() => navigate('/blog')} style={{ padding:'10px 24px', background:'#06B6D4', color:'#000', border:'none', borderRadius:10, cursor:'pointer', fontWeight:700, fontFamily:"'Sora',sans-serif" }}>← Back to Blog</button>
    </div>
  );

  const color   = TAG_COLORS[post.category] || '#06B6D4';
  const body    = post.content || generateBody(post);
  const date    = new Date(post.createdAt).toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' });
  const readMin = Math.max(1, Math.ceil(body.split(' ').length / 200));

  /* ── Render markdown-ish body ── */
  const renderBody = (text) =>
    text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:800, color:'#fff', margin:'32px 0 14px', letterSpacing:-0.4 }}>{line.slice(3)}</h2>;
      if (line.startsWith('- '))  return <li  key={i} style={{ color:'rgba(255,255,255,0.65)', fontSize:15, lineHeight:1.8, marginBottom:6, paddingLeft:8 }}>{line.slice(2)}</li>;
      if (line.trim() === '')      return <br  key={i} />;
      return <p key={i} style={{ color:'rgba(255,255,255,0.6)', fontSize:15, lineHeight:1.85, marginBottom:0 }}>{line}</p>;
    });

  return (
    <div style={{ padding:'100px 5% 80px', minHeight:'100vh' }}>

      {/* ── Back button ── */}
      <div style={{ maxWidth:760, margin:'0 auto 32px' }}>
        <button
          onClick={() => navigate('/blog')}
          style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'8px 16px', background:'rgba(255,255,255,0.05)',
            border:'1px solid rgba(255,255,255,0.1)', borderRadius:999,
            color:'rgba(255,255,255,0.55)', fontSize:13, cursor:'pointer',
            fontFamily:"'Sora',sans-serif", fontWeight:600, transition:'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.09)'; e.currentTarget.style.color='#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.color='rgba(255,255,255,0.55)'; }}
        >
          ← Back to Blog
        </button>
      </div>

      {/* ── Article ── */}
      <article style={{ maxWidth:760, margin:'0 auto' }}>

        {/* category + meta */}
        <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap', marginBottom:20 }}>
          <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:`1px solid ${color}35`, background:`${color}12`, color, fontSize:11, fontFamily:"'Space Mono',monospace", letterSpacing:0.5, textTransform:'uppercase', fontWeight:600 }}>{post.category}</span>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'rgba(255,255,255,0.3)' }}>{date}</span>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'rgba(255,255,255,0.3)' }}>·</span>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'rgba(255,255,255,0.3)' }}>{readMin} min read</span>
          {post.views > 0 && <>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'rgba(255,255,255,0.3)' }}>·</span>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'rgba(255,255,255,0.3)' }}>{post.views} views</span>
          </>}
        </div>

        {/* title */}
        <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(24px,4vw,42px)', fontWeight:900, color:'#fff', margin:'0 0 24px', lineHeight:1.2, letterSpacing:-1 }}>{post.title}</h1>

        {/* excerpt highlight */}
        <div style={{ borderLeft:`3px solid ${color}`, paddingLeft:20, marginBottom:36 }}>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.55)', lineHeight:1.75, margin:0, fontStyle:'italic' }}>{post.excerpt}</p>
        </div>

        {/* divider */}
        <div style={{ height:1, background:`linear-gradient(90deg,${color}40,transparent)`, marginBottom:36 }} />

        {/* body */}
        <div style={{ fontSize:15, lineHeight:1.85 }}>
          <ul style={{ paddingLeft:20, margin:0 }}>
            {renderBody(body)}
          </ul>
        </div>

        {/* tags / share row */}
        <div style={{ marginTop:48, paddingTop:28, borderTop:'1px solid rgba(255,255,255,0.07)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', borderRadius:999, border:`1px solid ${color}30`, background:`${color}10`, color, fontSize:12, fontFamily:"'Space Mono',monospace", fontWeight:600 }}>
            # {post.category}
          </span>
          <div style={{ display:'flex', gap:8 }}>
            {[['𝕏','https://x.com/intent/tweet?text='+encodeURIComponent(post.title)],['in','https://linkedin.com/shareArticle?title='+encodeURIComponent(post.title)]].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{ width:34, height:34, borderRadius:999, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(255,255,255,0.5)', fontSize:13, textDecoration:'none', fontWeight:700 }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </article>

      {/* ── Related Posts ── */}
      {related.length > 0 && (
        <div style={{ maxWidth:760, margin:'64px auto 0' }}>
          <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:800, color:'#fff', marginBottom:20, letterSpacing:-0.3 }}>Related Articles</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16 }}>
            {related.map(r => {
              const rc = TAG_COLORS[r.category] || '#06B6D4';
              return (
                <div key={r._id}
                  onClick={() => navigate(`/blog/${r._id}`)}
                  style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, cursor:'pointer', transition:'all 0.2s', overflow:'hidden' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=`${rc}35`; e.currentTarget.style.transform='translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.transform='none'; }}
                >
                  <div style={{ height:3, background:`linear-gradient(90deg,${rc},transparent)`, marginBottom:14, borderRadius:2 }} />
                  <span style={{ display:'inline-block', padding:'2px 8px', borderRadius:999, border:`1px solid ${rc}30`, background:`${rc}10`, color:rc, fontSize:9, fontFamily:"'Space Mono',monospace", letterSpacing:0.5, textTransform:'uppercase', fontWeight:600, marginBottom:10 }}>{r.category}</span>
                  <h4 style={{ fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:800, color:'#fff', margin:'0 0 8px', lineHeight:1.4 }}>{r.title}</h4>
                  <p style={{ fontSize:12, color:'rgba(255,255,255,0.38)', lineHeight:1.6, margin:'0 0 12px' }}>{r.excerpt}</p>
                  <span style={{ fontSize:11, color:rc, fontWeight:700, fontFamily:"'Space Mono',monospace" }}>Read →</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <div style={{ maxWidth:760, margin:'64px auto 0' }}>
        <div style={{ background:`linear-gradient(135deg,${color}10,rgba(255,255,255,0.02))`, border:`1px solid ${color}20`, borderRadius:20, padding:'36px 32px', textAlign:'center' }}>
          <p style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:800, color:'#fff', margin:'0 0 8px' }}>Need help with {post.category}?</p>
          <p style={{ fontSize:14, color:'rgba(255,255,255,0.4)', margin:'0 0 20px' }}>Our team at Axentralab is ready to help you with a tailored solution.</p>
          <button
            onClick={() => navigate('/contact')}
            style={{ padding:'12px 28px', background:color, color: ['#22C55E','#F59E0B'].includes(color) ? '#000' : '#fff', border:'none', borderRadius:10, fontSize:14, fontWeight:700, fontFamily:"'Sora',sans-serif", cursor:'pointer' }}
          >
            Get in Touch →
          </button>
        </div>
      </div>

    </div>
  );
}
