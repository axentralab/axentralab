import { useState } from 'react';

const PROJECTS = [
  { title:'FinTech Dashboard',         category:'Web Dev',       tech:['React','Node.js','MongoDB'], result:'+340% performance', color:'#22C55E' },
  { title:'E-Commerce AI Automation',  category:'AI Automation', tech:['Python','GPT-4','Zapier'],   result:'80% manual work cut', color:'#3B82F6' },
  { title:'Security Audit – BankCo',   category:'Cybersecurity', tech:['Burp Suite','Metasploit'],   result:'0 breaches post-audit', color:'#EF4444' },
  { title:'Cloud Migration – SaaS Co', category:'DevOps',        tech:['Docker','AWS','Terraform'],  result:'60% cost reduction', color:'#8B5CF6' },
  { title:'Healthcare SaaS Platform',  category:'SaaS Dev',      tech:['Next.js','PostgreSQL','Redis'],result:'10k+ users in 3 months', color:'#F59E0B' },
  { title:'AI CRM Integration',        category:'AI Automation', tech:['LangChain','HubSpot API'],   result:'3x lead conversion', color:'#06B6D4' },
];

const CATS = ['All','Web Dev','AI Automation','Cybersecurity','DevOps','SaaS Dev'];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <div style={{ padding:'100px 5% 80px', minHeight:'100vh' }}>
      <div style={{ textAlign:'center', marginBottom:48 }}>
        <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #8B5CF640', background:'#8B5CF612', color:'#8B5CF6', fontSize:11, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Portfolio</span>
        <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px,5vw,58px)', fontWeight:900, color:'#fff', marginTop:16, letterSpacing:-1.5 }}>Our Work Speaks</h1>
        <p style={{ color:'rgba(255,255,255,0.45)', fontSize:15, maxWidth:420, margin:'12px auto 0' }}>Real projects, real results — delivered for clients worldwide.</p>
      </div>

      <div style={{ overflowX:'auto', marginBottom:40, paddingBottom:4 }}>
        <div style={{ display:'flex', gap:8, justifyContent:'center', minWidth:'max-content', padding:'0 4px' }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ padding:'8px 18px', borderRadius:999, background:filter===c?'#22C55E':'rgba(255,255,255,0.05)', border:filter===c?'none':'1px solid rgba(255,255,255,0.1)', color:filter===c?'#000':'rgba(255,255,255,0.6)', fontWeight:600, fontSize:13, transition:'all 0.2s', whiteSpace:'nowrap' }}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20, maxWidth:1100, margin:'0 auto' }}>
        {shown.map((p,i) => (
          <div key={i} className="card" style={{ cursor:'pointer', transition:'all 0.25s', padding:0, overflow:'hidden' }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.borderColor=p.color+'40'; e.currentTarget.style.boxShadow=`0 16px 40px ${p.color}12`; }}
            onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow='none'; }}>
            <div style={{ height:140, background:`linear-gradient(135deg,${p.color}25,${p.color}08)`, display:'flex', alignItems:'center', justifyContent:'center', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontFamily:"'Sora',sans-serif", fontSize:36, fontWeight:900, color:p.color+'50' }}>{p.title.slice(0,2)}</span>
            </div>
            <div style={{ padding:22 }}>
              <span style={{ display:'inline-block', padding:'2px 10px', borderRadius:999, border:`1px solid ${p.color}30`, background:`${p.color}10`, color:p.color, fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:0.5, textTransform:'uppercase', fontWeight:600 }}>{p.category}</span>
              <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:17, fontWeight:800, color:'#fff', margin:'10px 0 8px', letterSpacing:-0.3 }}>{p.title}</h3>
              <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:14 }}>
                {p.tech.map((t,j) => <span key={j} style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.35)', background:'rgba(255,255,255,0.05)', padding:'2px 7px', borderRadius:4 }}>{t}</span>)}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ color:p.color, fontSize:14 }}>↗</span>
                <span style={{ fontSize:13, color:p.color, fontWeight:700 }}>{p.result}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
