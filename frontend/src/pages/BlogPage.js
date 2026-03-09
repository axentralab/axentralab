import { useState, useEffect } from 'react';
import api from '../services/api';

const FALLBACK = [
  { _id:'1', title:'OWASP Top 10: What Every Developer Must Know in 2025', category:'Cybersecurity', excerpt:'Understanding the most critical web application security risks and how to protect against them.', createdAt:'2025-02-28', views:1240 },
  { _id:'2', title:'Building AI Agents with LangChain and Node.js',         category:'AI Automation', excerpt:'A practical guide to building production-ready AI agents using LangChain, Node.js and GPT-4.',   createdAt:'2025-02-20', views:980 },
  { _id:'3', title:'Zero-Downtime Deployments with Docker & Nginx',         category:'DevOps',        excerpt:'Step-by-step walkthrough for achieving zero-downtime deployments using Docker, Nginx and GitHub Actions.', createdAt:'2025-02-12', views:740 },
  { _id:'4', title:'Multi-Tenant SaaS Architecture: Patterns & Pitfalls',   category:'SaaS Dev',      excerpt:'Learn the key architectural patterns for building scalable multi-tenant SaaS products.',       createdAt:'2025-02-05', views:610 },
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
