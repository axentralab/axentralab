import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

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
  { _id:'15', title:'How AI is Changing Cybersecurity: A Beginner\'s Guide',                  category:'AI Automation',  excerpt:'Introduction to AI-powered defenses and what they mean for security professionals.',                                                 createdAt:'2026-03-11', views:0    },
  { _id:'16', title:'Machine Learning for Predicting Website Attacks',                        category:'AI Automation',  excerpt:'Using ML models to forecast and block malicious traffic.',                                                                          createdAt:'2026-03-12', views:0    },
  { _id:'17', title:'Using AI to Optimize UX on Your Website',                                category:'AI Automation',  excerpt:'Leverage artificial intelligence to personalize and improve user journeys.',                                                          createdAt:'2026-03-13', views:0    },
  { _id:'18', title:'Axentralab Case Study: How ML Helped Detect Vulnerabilities Faster',     category:'AI Automation',  excerpt:'A real-world example of machine learning accelerating our pentests.',                                                               createdAt:'2026-03-14', views:0    },
  { _id:'19', title:'The Future of Automated Threat Detection with AI',                       category:'AI Automation',  excerpt:'What next-generation AI systems will mean for threat hunting.',                                                                     createdAt:'2026-03-15', views:0    },
  { _id:'20', title:'How to Turn Your Idea into a SaaS Product in 6 Steps',                   category:'SaaS Dev',       excerpt:'A simple framework for going from concept to paying customers.',                                                                    createdAt:'2026-03-16', views:0    },
  { _id:'21', title:'Why Multi-Tier Subscription Models Work for Tech Startups',              category:'SaaS Dev',       excerpt:'Explore pricing strategies that maximize revenue and retention.',                                                                    createdAt:'2026-03-17', views:0    },
  { _id:'22', title:'The Complete Checklist for Launching a Web Security SaaS',               category:'SaaS Dev',       excerpt:'Everything you need before rolling out your security platform.',                                                                    createdAt:'2026-03-18', views:0    },
  { _id:'23', title:'Axentralab\'s Approach to Building Client-Focused SaaS',                 category:'SaaS Dev',       excerpt:'How we prioritize users when crafting subscription products.',                                                                     createdAt:'2026-03-19', views:0    },
  { _id:'24', title:'From Concept to Code: Launching a Cybersecurity Tool on a Budget',       category:'SaaS Dev',       excerpt:'Bootstrapping a security app with limited resources.',                                                                             createdAt:'2026-03-20', views:0    },
  { _id:'25', title:'How We Helped a Local Business Avoid a Cyberattack',                     category:'Cybersecurity',  excerpt:'A case study detailing our defense implementation for a small client.',                                                             createdAt:'2026-03-21', views:0    },
  { _id:'26', title:'Case Study: Migrating a Website to a Fully Secure MERN Stack',           category:'Web Dev',        excerpt:'Lessons learned migrating a client to a hardened MERN architecture.',                                                              createdAt:'2026-03-22', views:0    },
  { _id:'27', title:'Axentralab\'s Top 5 Security Wins in 2025',                              category:'Cybersecurity',  excerpt:'A roundup of our most impactful security projects from last year.',                                                               createdAt:'2026-03-23', views:0    },
  { _id:'28', title:'Before & After: Website Optimization that Boosted Conversions by 30%',   category:'Web Dev',        excerpt:'How performance tweaks translated into real revenue gains.',                                                                        createdAt:'2026-03-24', views:0    },
  { _id:'29', title:'Real Lessons from Client Projects: Security & Performance',              category:'General',        excerpt:'Hard-earned insights from working with diverse customers.',                                                                         createdAt:'2026-03-25', views:0    },
];

const TAG_COLORS = {
  Cybersecurity: '#EF4444',
  'AI Automation': '#22C55E',
  DevOps: '#8B5CF6',
  'SaaS Dev': '#F59E0B',
  'Web Dev': '#3B82F6',
  General: '#06B6D4',
};

const CATS = ['All', 'Cybersecurity', 'AI Automation', 'Web Dev', 'SaaS Dev', 'DevOps', 'General'];
const PER_PAGE = 9;

export default function BlogPage() {
  const [posts, setPosts]       = useState(FALLBACK);
  const [filter, setFilter]     = useState('All');
  const [search, setSearch]     = useState('');
  const [page, setPage]         = useState(1);
  const navigate                = useNavigate();

  useEffect(() => {
    api.get('/blog').then(r => { if (r.data.data?.length) setPosts(r.data.data); }).catch(() => {});
  }, []);

  // reset page on filter/search change
  useEffect(() => { setPage(1); }, [filter, search]);

  const filtered = useMemo(() => {
    let list = posts;
    if (filter !== 'All') list = list.filter(p => p.category === filter);
    if (search.trim())    list = list.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
    );
    return list;
  }, [posts, filter, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // category counts
  const counts = useMemo(() => {
    const c = { All: posts.length };
    CATS.slice(1).forEach(cat => { c[cat] = posts.filter(p => p.category === cat).length; });
    return c;
  }, [posts]);

  return (
    <div style={{ padding:'100px 5% 80px', minHeight:'100vh' }}>

      {/* ── Hero ── */}
      <div style={{ textAlign:'center', marginBottom:48 }}>
        <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #06B6D440', background:'#06B6D412', color:'#06B6D4', fontSize:11, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Insights</span>
        <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px,5vw,58px)', fontWeight:900, color:'#fff', marginTop:16, letterSpacing:-1.5 }}>Tech Blog</h1>
        <p style={{ color:'rgba(255,255,255,0.45)', fontSize:15, maxWidth:420, margin:'12px auto 0' }}>Expert articles on cybersecurity, AI and modern engineering.</p>
      </div>

      {/* ── Search ── */}
      <div style={{ maxWidth:520, margin:'0 auto 36px' }}>
        <div style={{ position:'relative' }}>
          <span style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', fontSize:15, opacity:0.35 }}>🔍</span>
          <input
            type="text"
            placeholder="Search articles…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width:'100%', padding:'12px 16px 12px 44px',
              background:'rgba(255,255,255,0.04)',
              border:'1px solid rgba(255,255,255,0.1)',
              borderRadius:12, color:'#fff', fontSize:14,
              fontFamily:"'Sora',sans-serif", outline:'none',
              boxSizing:'border-box',
              transition:'border-color 0.2s',
            }}
            onFocus={e  => e.target.style.borderColor='rgba(6,182,212,0.5)'}
            onBlur={e   => e.target.style.borderColor='rgba(255,255,255,0.1)'}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'rgba(255,255,255,0.35)', cursor:'pointer', fontSize:16 }}>✕</button>
          )}
        </div>
      </div>

      {/* ── Category Filter ── */}
      <div style={{ overflowX:'auto', marginBottom:40, paddingBottom:4 }}>
        <div style={{ display:'flex', gap:8, justifyContent:'center', minWidth:'max-content', padding:'0 4px' }}>
          {CATS.map(c => {
            const color = TAG_COLORS[c] || '#06B6D4';
            const active = filter === c;
            return (
              <button key={c} onClick={() => setFilter(c)}
                style={{
                  padding:'7px 16px', borderRadius:999,
                  background: active ? (c === 'All' ? '#06B6D4' : color) : 'rgba(255,255,255,0.04)',
                  border: active ? 'none' : '1px solid rgba(255,255,255,0.09)',
                  color: active ? (c === 'All' || ['#22C55E','#F59E0B','#F97316','#10B981'].includes(color) ? '#000' : '#fff') : 'rgba(255,255,255,0.55)',
                  fontWeight:600, fontSize:12, cursor:'pointer',
                  transition:'all 0.2s', whiteSpace:'nowrap',
                  display:'flex', alignItems:'center', gap:6,
                  fontFamily:"'Sora',sans-serif",
                }}
              >
                {c}
                <span style={{
                  display:'inline-flex', alignItems:'center', justifyContent:'center',
                  width:18, height:18, borderRadius:999, fontSize:10, fontWeight:700,
                  background: active ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.08)',
                  color: active ? 'inherit' : 'rgba(255,255,255,0.4)',
                }}>{counts[c] ?? 0}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Results count ── */}
      <div style={{ maxWidth:1100, margin:'0 auto 20px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'rgba(255,255,255,0.25)', letterSpacing:0.5 }}>
          {filtered.length} article{filtered.length !== 1 ? 's' : ''}{filter !== 'All' ? ` in ${filter}` : ''}{search ? ` matching "${search}"` : ''}
        </span>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'rgba(255,255,255,0.2)' }}>
          Page {page} of {totalPages || 1}
        </span>
      </div>

      {/* ── Blog Grid ── */}
      {paginated.length === 0 ? (
        <div style={{ textAlign:'center', padding:'80px 20px', color:'rgba(255,255,255,0.25)', fontFamily:"'Sora',sans-serif" }}>
          <div style={{ fontSize:40, marginBottom:16 }}>🔍</div>
          <p style={{ fontSize:16 }}>No articles found.</p>
          <button onClick={() => { setSearch(''); setFilter('All'); }} style={{ marginTop:12, padding:'8px 20px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:999, color:'rgba(255,255,255,0.5)', cursor:'pointer', fontSize:13 }}>Clear filters</button>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20, maxWidth:1100, margin:'0 auto' }}>
          {paginated.map((p) => {
            const color = TAG_COLORS[p.category] || '#06B6D4';
            return (
              <div key={p._id} className="card"
                style={{ padding:0, overflow:'hidden', cursor:'pointer', transition:'all 0.25s' }}
                onClick={() => navigate(`/blog/${p._id}`)}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor=`${color}35`; e.currentTarget.style.boxShadow=`0 12px 32px ${color}12`; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow='none'; }}
              >
                <div style={{ height:4, background:`linear-gradient(90deg,${color},transparent)` }} />
                <div style={{ padding:24 }}>
                  <span style={{ display:'inline-block', padding:'2px 10px', borderRadius:999, border:`1px solid ${color}30`, background:`${color}10`, color, fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:0.5, textTransform:'uppercase', fontWeight:600 }}>{p.category}</span>
                  <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:16, fontWeight:800, color:'#fff', margin:'12px 0 10px', lineHeight:1.4, letterSpacing:-0.2 }}>{p.title}</h3>
                  <p style={{ fontSize:13, color:'rgba(255,255,255,0.45)', lineHeight:1.65, marginBottom:16 }}>{p.excerpt}</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.3)' }}>
                      {new Date(p.createdAt).toLocaleDateString('en-US',{ month:'short', day:'numeric', year:'numeric' })}
                    </span>
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.3)' }}>
                      {p.views > 0 ? `${p.views} views` : 'New'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:8, marginTop:48, flexWrap:'wrap' }}>

          {/* Prev */}
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding:'9px 18px', borderRadius:10,
              background:'rgba(255,255,255,0.04)',
              border:'1px solid rgba(255,255,255,0.09)',
              color: page === 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)',
              cursor: page === 1 ? 'default' : 'pointer',
              fontSize:13, fontFamily:"'Sora',sans-serif", fontWeight:600,
            }}
          >← Prev</button>

          {/* page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
            .reduce((acc, n, idx, arr) => {
              if (idx > 0 && n - arr[idx - 1] > 1) acc.push('…');
              acc.push(n);
              return acc;
            }, [])
            .map((n, i) =>
              n === '…' ? (
                <span key={`ellipsis-${i}`} style={{ color:'rgba(255,255,255,0.2)', fontSize:13, padding:'0 4px' }}>…</span>
              ) : (
                <button key={n} onClick={() => setPage(n)}
                  style={{
                    width:38, height:38, borderRadius:10,
                    background: page === n ? '#06B6D4' : 'rgba(255,255,255,0.04)',
                    border: page === n ? 'none' : '1px solid rgba(255,255,255,0.09)',
                    color: page === n ? '#000' : 'rgba(255,255,255,0.55)',
                    cursor:'pointer', fontSize:13,
                    fontFamily:"'Sora',sans-serif", fontWeight:700,
                    transition:'all 0.15s',
                  }}
                >{n}</button>
              )
            )
          }

          {/* Next */}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              padding:'9px 18px', borderRadius:10,
              background:'rgba(255,255,255,0.04)',
              border:'1px solid rgba(255,255,255,0.09)',
              color: page === totalPages ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)',
              cursor: page === totalPages ? 'default' : 'pointer',
              fontSize:13, fontFamily:"'Sora',sans-serif", fontWeight:600,
            }}
          >Next →</button>
        </div>
      )}

    </div>
  );
}