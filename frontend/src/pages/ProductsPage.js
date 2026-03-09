import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const PRODUCTS = [
  { id:'p1', name:'WP Shield', tag:'WordPress Security', desc:'Enterprise-grade WordPress security scanner with real-time threat detection and automated malware removal.', features:['Malware scanning','Plugin vulnerability detection','Security header analysis','SSL certificate check','Automated fix suggestions'], price:29, billing:'monthly', color:'#22C55E' },
  { id:'p2', name:'SiteGuard', tag:'Monitoring Platform', desc:'Continuous website security monitoring with instant alerts and automated incident responses.', features:['24/7 uptime monitoring','Threat intelligence feed','Auto IP blocking','Incident reports','Slack & email alerts'], price:49, billing:'monthly', color:'#3B82F6' },
  { id:'p3', name:'API Scanner', tag:'API Security', desc:'Find and fix vulnerabilities in your APIs before attackers do. Covers OWASP API Top 10.', features:['OWASP API Top 10 coverage','Auth & rate limit testing','Detailed vulnerability report','CI/CD integration','Remediation guidance'], price:39, billing:'monthly', color:'#EF4444' },
];

export default function ProductsPage() {
  const { addToCart, cart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isInCart = (id) => cart.some(i => i.serviceId === id);

  const handleBuy = (p) => {
    if (!isAuthenticated) { navigate('/register'); return; }
    addToCart(
      { _id: p.id, title: p.name },
      { name: 'Monthly', price: p.price, billing: p.billing }
    );
    navigate('/cart');
  };

  return (
    <div style={{ padding:'100px 5% 80px', minHeight:'100vh' }}>
      <div style={{ textAlign:'center', marginBottom:60 }}>
        <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #3B82F640', background:'#3B82F612', color:'#3B82F6', fontSize:11, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>SaaS Products</span>
        <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px,5vw,58px)', fontWeight:900, color:'#fff', marginTop:16, letterSpacing:-1.5 }}>
          Security Tools Built by<br /><span style={{ color:'#22C55E' }}>Axentralab</span>
        </h1>
        <p style={{ color:'rgba(255,255,255,0.45)', fontSize:15, maxWidth:440, margin:'14px auto 0' }}>Plug-and-play security products for websites and APIs — start in minutes.</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:24, maxWidth:1100, margin:'0 auto' }}>
        {PRODUCTS.map((p,i) => (
          <div key={p.id} style={{ background:'rgba(255,255,255,0.025)', border:`1px solid rgba(255,255,255,0.08)`, borderRadius:20, overflow:'hidden', transition:'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=`${p.color}35`; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 16px 40px ${p.color}12`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
            <div style={{ height:5, background:`linear-gradient(90deg,${p.color},transparent)` }} />
            <div style={{ padding:28 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10, flexWrap:'wrap', gap:8 }}>
                <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:999, border:`1px solid ${p.color}30`, background:`${p.color}10`, color:p.color, fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:0.5, textTransform:'uppercase', fontWeight:600 }}>{p.tag}</span>
                <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:900, fontSize:22, color:p.color }}>${p.price}<span style={{ fontSize:12, fontWeight:500, color:'rgba(255,255,255,0.4)' }}>/mo</span></span>
              </div>

              <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:26, fontWeight:900, color:'#fff', margin:'12px 0 10px', letterSpacing:-0.6 }}>{p.name}</h2>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.5)', lineHeight:1.7, marginBottom:22 }}>{p.desc}</p>

              <ul style={{ listStyle:'none', padding:0, margin:'0 0 26px' }}>
                {p.features.map((f,j) => (
                  <li key={j} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color:p.color, fontSize:13 }}>✓</span>
                    <span style={{ fontSize:14, color:'rgba(255,255,255,0.65)' }}>{f}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display:'flex', gap:10 }}>
                <button onClick={() => handleBuy(p)} className="btn-primary" style={{ flex:1, padding:'12px', background:isInCart(p.id)?'rgba(34,197,94,0.15)':p.color, color:isInCart(p.id)?p.color:'#000', border:isInCart(p.id)?`1px solid ${p.color}40`:'none', fontSize:14 }}>
                  {isInCart(p.id) ? '✓ Added to Cart' : isAuthenticated ? '🛒 Start Free Trial' : 'Get Started →'}
                </button>
                <button className="btn-outline" style={{ padding:'12px 16px', fontSize:13 }}>Demo</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compare table */}
      <div style={{ maxWidth:1100, margin:'60px auto 0' }}>
        <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:800, color:'#fff', textAlign:'center', marginBottom:28, letterSpacing:-0.5 }}>Compare Plans</h2>
        <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, overflow:'hidden' }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', padding:'14px 24px', background:'rgba(255,255,255,0.04)', borderBottom:'1px solid rgba(255,255,255,0.06)', gap:12 }}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.3)', letterSpacing:1 }}>FEATURE</span>
            {PRODUCTS.map(p => <span key={p.id} style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:p.color, letterSpacing:1, textAlign:'center' }}>{p.name.toUpperCase()}</span>)}
          </div>
          {[
            ['Real-time scanning',         true,  true,  true ],
            ['Auto remediation',           false, true,  false],
            ['API endpoint testing',       false, false, true ],
            ['Dashboard & reports',        true,  true,  true ],
            ['Slack / email alerts',       false, true,  true ],
            ['CI/CD integration',          false, false, true ],
            ['White-label option',         false, true,  false],
          ].map(([label, ...vals], i, arr) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', padding:'13px 24px', borderBottom:i<arr.length-1?'1px solid rgba(255,255,255,0.04)':'none', background:i%2===0?'transparent':'rgba(255,255,255,0.01)', gap:12, alignItems:'center' }}>
              <span style={{ fontSize:13, color:'rgba(255,255,255,0.55)' }}>{label}</span>
              {vals.map((v,j) => <span key={j} style={{ textAlign:'center', fontSize:16 }}>{v?'✅':'❌'}</span>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
