import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const FALLBACK = [
  { _id:'1', title:'AI Automation', icon:'⚡', color:'#F59E0B', description:'Chatbots, workflow automation, CRM integration, and intelligent AI agents.', features:['AI chatbots','Workflow automation','CRM integration','AI agents'], plans:[{name:'Starter',price:499,billing:'one-time',features:['1 chatbot','Basic workflow','Email support']},{name:'Pro',price:999,billing:'one-time',features:['5 chatbots','Advanced workflows','Priority support','CRM integration']},{name:'Enterprise',price:2499,billing:'one-time',features:['Unlimited bots','Custom AI agents','Dedicated support','Full CRM suite']}] },
  { _id:'2', title:'Web Development', icon:'🌐', color:'#3B82F6', description:'MERN apps, SaaS platforms, dashboards, and enterprise-grade websites.', features:['React/Next.js','Node.js backend','MongoDB','Deployment'], plans:[{name:'Landing Page',price:799,billing:'one-time',features:['5 sections','Responsive','SEO ready','1 month support']},{name:'Web App',price:2999,billing:'one-time',features:['Full MERN stack','Auth system','Dashboard','3 months support']},{name:'SaaS Platform',price:7999,billing:'one-time',features:['Multi-tenant','Stripe billing','Admin panel','6 months support']}] },
  { _id:'3', title:'Cybersecurity', icon:'🛡️', color:'#EF4444', description:'Vulnerability scanning, penetration testing, malware removal, security audits.', features:['Pen testing','Vuln scanning','Security audit','Malware removal'], plans:[{name:'Basic Audit',price:399,billing:'one-time',features:['Surface scan','Report','Fix recommendations']},{name:'Full Pentest',price:1499,billing:'one-time',features:['Deep penetration test','OWASP coverage','Detailed report','Fix support']},{name:'Ongoing Monitor',price:299,billing:'monthly',features:['24/7 monitoring','Instant alerts','Monthly reports','Incident response']}] },
  { _id:'4', title:'DevOps & Cloud', icon:'☁️', color:'#8B5CF6', description:'CI/CD pipelines, cloud automation, containerization, infrastructure monitoring.', features:['CI/CD','Docker/K8s','Cloud setup','Monitoring'], plans:[{name:'Setup',price:699,billing:'one-time',features:['CI/CD pipeline','Docker setup','Basic monitoring']},{name:'Full DevOps',price:1999,billing:'one-time',features:['Full infra setup','Auto-scaling','Advanced monitoring','Runbooks']},{name:'Managed',price:499,billing:'monthly',features:['Ongoing management','24/7 support','Scaling','Incident response']}] },
  { _id:'5', title:'SaaS Development', icon:'📦', color:'#22C55E', description:'Full-cycle SaaS product design, development, and deployment.', features:['Full dev cycle','Subscription billing','Multi-tenant','Analytics'], plans:[{name:'MVP',price:4999,billing:'one-time',features:['Core features','Auth & billing','Basic analytics','3 months support']},{name:'Full SaaS',price:14999,billing:'one-time',features:['All features','Admin dashboard','Advanced analytics','6 months support','Dedicated PM']}] },
  { _id:'6', title:'IT Consulting', icon:'💡', color:'#06B6D4', description:'Architecture planning, digital transformation, tech stack consulting.', features:['Architecture','Digital transformation','Tech stack advice','Roadmapping'], plans:[{name:'1-hour Call',price:149,billing:'one-time',features:['60 min consultation','Written summary','Action items']},{name:'Deep Dive',price:799,billing:'one-time',features:['Full day workshop','Architecture doc','Tech roadmap','Follow-up call']},{name:'Retainer',price:999,billing:'monthly',features:['10 hours/month','Priority access','Ongoing guidance','Slack access']}] },
];

const FAQS = [
  { q:'Do I need to pay upfront?',          a:'For one-time projects we take 50% upfront and 50% on delivery. Monthly plans are billed at the start of each billing cycle.' },
  { q:'Can I mix services in one order?',    a:'Yes — add multiple services and plans to your cart and check out together. We\'ll coordinate all deliverables under one PM.' },
  { q:'What if I\'m not satisfied?',         a:'We offer a free revision round on every deliverable. If we miss the agreed scope, we\'ll refund the relevant milestone.' },
  { q:'How fast do you start?',              a:'Most services kick off within 24 hours of payment. Enterprise projects get a scoping call booked the same day.' },
  { q:'Do you sign NDAs?',                   a:'Always. An NDA is included in every contract by default at no extra cost.' },
  { q:'Can I upgrade my plan later?',        a:'Yes. You pay only the difference when upgrading. Downgrades take effect at the next billing cycle.' },
];

const COMPARE_ROWS = [
  { label:'Dedicated PM',          vals:[false,true,true,false,true,false] },
  { label:'Source code ownership', vals:[true,true,true,true,true,false]  },
  { label:'Monthly retainer opt',  vals:[false,false,true,true,false,true] },
  { label:'SLA guarantee',         vals:[false,true,true,true,true,true]  },
  { label:'NDA included',          vals:[true,true,true,true,true,true]   },
  { label:'Post-delivery support', vals:[false,true,true,true,true,true]  },
];

const HOW_IT_WORKS = [
  { n:'01', icon:'🛒', title:'Add to Cart',       desc:'Pick any plan. Mix services. One unified checkout — our PM coordinates everything.' },
  { n:'02', icon:'📋', title:'Scope & Sign',       desc:'Detailed scope doc + NDA within 2 hours. E-sign in one click. No back-and-forth.' },
  { n:'03', icon:'⚙️', title:'Build & Review',     desc:'Weekly sprint demos with staging access. You give feedback; we iterate.' },
  { n:'04', icon:'🚀', title:'Launch & Handover',  desc:'Full docs, repo transfer, and optional retainer. You own everything — forever.' },
];

const STACK_BADGES = ['React','Next.js','Node.js','Python','Go','Docker','Kubernetes','AWS','GCP','Terraform','PostgreSQL','MongoDB','Redis','LangChain','GPT-4','Burp Suite','Metasploit'];

export default function ShopPage() {
  const [services, setServices] = useState(FALLBACK);
  const [selected, setSelected] = useState('1');
  const [billing, setBilling]   = useState('all');
  const [openFaq, setOpenFaq]   = useState(null);
  const [cartAnim, setCartAnim] = useState(null);
  const { addToCart, cart }     = useCart();
  const { isAuthenticated }     = useAuth();
  const navigate                = useNavigate();

  useEffect(() => {
    api.get('/services')
      .then(r => { if (r.data.data?.length) setServices(r.data.data); })
      .catch(() => {});
  }, []);

  const isInCart = (serviceId, planName) =>
    cart.some(i => i.serviceId === serviceId && i.plan === planName);

  const handleBuy = (service, plan) => {
    if (!isAuthenticated) { navigate('/register'); return; }
    addToCart(service, plan);
    setCartAnim(service._id + plan.name);
    setTimeout(() => setCartAnim(null), 900);
    navigate('/cart');
  };

  const activeService = services.find(s => s._id === selected) || services[0];
  const filteredPlans = billing === 'all'
    ? activeService?.plans
    : activeService?.plans?.filter(p => p.billing === billing);

  const cartTotal = cart.reduce((a, i) => a + (i.price || 0), 0);

  return (
    <>
      <style>{`
        @keyframes popIn  { 0%{transform:scale(0.9);opacity:0} 60%{transform:scale(1.03)} 100%{transform:scale(1);opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes ticker  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4)} 50%{box-shadow:0 0 0 7px rgba(34,197,94,0)} }
        .srv-pill:hover  { opacity:1 !important; background: rgba(255,255,255,0.07) !important; }
        .plan-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,0.3) !important; }
        .how-card:hover  { border-color: rgba(255,255,255,0.15) !important; transform: translateY(-3px); }
        .faq-row:hover   { background: rgba(255,255,255,0.04) !important; }
        .cta-btn:hover   { filter: brightness(1.1); transform: translateY(-1px); }
      `}</style>

      <div style={{ minHeight:'100vh', background:'#06080F', color:'#fff', paddingTop:82 }}>

        {/* ── Ticker ── */}
        <div style={{ overflow:'hidden', borderTop:'1px solid rgba(255,255,255,0.05)', borderBottom:'1px solid rgba(255,255,255,0.05)', padding:'9px 0', marginBottom:64 }}>
          <div style={{ display:'flex', animation:'ticker 30s linear infinite', width:'max-content' }}>
            {[...STACK_BADGES,...STACK_BADGES].map((b,i) => (
              <span key={i} style={{ padding:'0 24px', fontSize:11, color:'rgba(255,255,255,0.18)', fontFamily:"'Space Mono',monospace", whiteSpace:'nowrap' }}>
                {b} <span style={{ color:'rgba(255,255,255,0.07)' }}>·</span>
              </span>
            ))}
          </div>
        </div>

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 5%' }}>

          {/* ── Hero split ── */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:48, alignItems:'start', marginBottom:88 }}>

            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', borderRadius:6, background:'rgba(34,197,94,0.07)', border:'1px solid rgba(34,197,94,0.18)', marginBottom:22 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#22C55E', display:'inline-block', animation:'pulse 2s infinite' }} />
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'#22C55E', letterSpacing:1.5, textTransform:'uppercase' }}>Live Pricing</span>
              </div>
              <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(34px,5vw,64px)', fontWeight:900, lineHeight:1.02, letterSpacing:-2.5, color:'#fff', margin:'0 0 18px' }}>
                Services &<br />
                <span style={{ color:'transparent', WebkitTextStroke:'1.5px rgba(255,255,255,0.25)' }}>Transparent</span><br />
                <span style={{ color:'#22C55E' }}>Pricing.</span>
              </h1>
              <p style={{ fontSize:15, color:'rgba(255,255,255,0.37)', lineHeight:1.8, maxWidth:420, margin:'0 0 32px' }}>
                No discovery fees. No hidden costs. Pick a plan, add to cart, and we kick off within 24 hours.
              </p>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                {[['120+','Projects'],['98%','Retention'],['24hr','Kickoff'],['NDA','Default']].map(([v,l],i) => (
                  <div key={i} style={{ padding:'10px 16px', background:'rgba(255,255,255,0.035)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:10 }}>
                    <div style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:900, color:'#fff', letterSpacing:-0.5 }}>{v}</div>
                    <div style={{ fontSize:10, color:'rgba(255,255,255,0.28)', marginTop:2, fontFamily:"'Space Mono',monospace" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live cart summary */}
            <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, overflow:'hidden', position:'sticky', top:96 }}>
              <div style={{ padding:'16px 22px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:14, color:'#fff' }}>🛒 Your Cart</span>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'rgba(255,255,255,0.22)', letterSpacing:1 }}>{cart.length} ITEM{cart.length!==1?'S':''}</span>
              </div>
              <div style={{ padding:'16px 22px' }}>
                {cart.length === 0 ? (
                  <div style={{ textAlign:'center', padding:'24px 0', color:'rgba(255,255,255,0.2)', fontSize:13, lineHeight:2 }}>
                    <div style={{ fontSize:28, marginBottom:8, opacity:0.4 }}>🛒</div>
                    Cart is empty.<br />Pick a plan below.
                  </div>
                ) : (
                  <>
                    <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:16 }}>
                      {cart.slice(0,4).map((item,i) => (
                        <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                          <div>
                            <div style={{ fontSize:13, color:'rgba(255,255,255,0.7)', fontWeight:700 }}>{item.serviceTitle}</div>
                            <div style={{ fontSize:10, color:'rgba(255,255,255,0.28)', marginTop:1, fontFamily:"'Space Mono',monospace" }}>{item.plan}</div>
                          </div>
                          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:900, color:'#22C55E' }}>${item.price?.toLocaleString()}</div>
                        </div>
                      ))}
                      {cart.length > 4 && <div style={{ fontSize:11, color:'rgba(255,255,255,0.22)', textAlign:'center' }}>+{cart.length-4} more</div>}
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', paddingTop:12, borderTop:'1px solid rgba(255,255,255,0.07)', marginBottom:14 }}>
                      <span style={{ fontSize:12, color:'rgba(255,255,255,0.35)' }}>Total</span>
                      <span style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:900, color:'#fff' }}>${cartTotal.toLocaleString()}</span>
                    </div>
                    <button onClick={() => navigate('/cart')} style={{ width:'100%', padding:'12px', background:'#22C55E', color:'#000', border:'none', borderRadius:11, fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:14, cursor:'pointer', letterSpacing:-0.3, transition:'all 0.17s' }}
                      onMouseEnter={e => e.currentTarget.style.background='#16a34a'}
                      onMouseLeave={e => e.currentTarget.style.background='#22C55E'}>
                      Checkout →
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── Browse Services ── */}
          <div style={{ marginBottom:88 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:14, marginBottom:22 }}>
              <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:900, color:'#fff', letterSpacing:-0.5, margin:0 }}>Browse Services</h2>
              <div style={{ display:'flex', gap:4, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:10, padding:4 }}>
                {[['all','All'],['one-time','One-time'],['monthly','Monthly']].map(([val,label]) => (
                  <button key={val} onClick={() => setBilling(val)}
                    style={{ padding:'6px 14px', borderRadius:7, border:'none', background: billing===val ? 'rgba(255,255,255,0.1)' : 'transparent', color: billing===val ? '#fff' : 'rgba(255,255,255,0.3)', fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:12, cursor:'pointer', transition:'all 0.15s' }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Service pills */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:32 }}>
              {services.map(s => (
                <button key={s._id} className="srv-pill"
                  onClick={() => setSelected(s._id)}
                  style={{ display:'flex', alignItems:'center', gap:9, padding:'10px 18px', borderRadius:12, border: selected===s._id ? `1px solid ${s.color}55` : '1px solid rgba(255,255,255,0.07)', background: selected===s._id ? `${s.color}10` : 'rgba(255,255,255,0.025)', cursor:'pointer', transition:'all 0.17s', opacity: selected===s._id ? 1 : 0.7 }}>
                  <span style={{ fontSize:17 }}>{s.icon}</span>
                  <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:13, color: selected===s._id ? '#fff' : 'rgba(255,255,255,0.6)' }}>{s.title}</span>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color: selected===s._id ? s.color : 'rgba(255,255,255,0.2)' }}>from ${Math.min(...s.plans.map(p=>p.price)).toLocaleString()}</span>
                </button>
              ))}
            </div>

            {/* Active service */}
            {activeService && (
              <div key={selected} style={{ animation:'slideUp 0.22s ease' }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:18, padding:'22px 26px', background:`linear-gradient(120deg,${activeService.color}08,rgba(255,255,255,0.02))`, border:`1px solid ${activeService.color}20`, borderRadius:18, marginBottom:22 }}>
                  <div style={{ width:54, height:54, borderRadius:15, background:`${activeService.color}14`, border:`1px solid ${activeService.color}28`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, flexShrink:0 }}>{activeService.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', marginBottom:5 }}>
                      <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:900, color:'#fff', letterSpacing:-0.4, margin:0 }}>{activeService.title}</h2>
                      <span style={{ padding:'2px 9px', borderRadius:6, background:`${activeService.color}12`, color:activeService.color, fontSize:9, fontFamily:"'Space Mono',monospace", letterSpacing:0.5 }}>
                        {activeService.plans?.length} plans
                      </span>
                    </div>
                    <p style={{ fontSize:13, color:'rgba(255,255,255,0.4)', margin:'0 0 12px', lineHeight:1.6 }}>{activeService.description}</p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                      {(activeService.features||[]).map((f,i) => (
                        <span key={i} style={{ padding:'3px 9px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:6, fontSize:10, color:'rgba(255,255,255,0.45)', fontFamily:"'Space Mono',monospace" }}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Plan cards */}
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))', gap:16 }}>
                  {(filteredPlans||[]).length === 0 ? (
                    <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'32px', color:'rgba(255,255,255,0.3)', fontSize:14 }}>
                      No {billing} plans here.{' '}
                      <button onClick={() => setBilling('all')} style={{ background:'none', border:'none', color:'#22C55E', cursor:'pointer', fontWeight:800, fontSize:14 }}>Show all →</button>
                    </div>
                  ) : (filteredPlans||[]).map((plan, pi) => {
                    const inCart    = isInCart(activeService._id, plan.name);
                    const isPopular = pi === 1;
                    const animating = cartAnim === activeService._id + plan.name;

                    return (
                      <div key={plan.name} className="plan-card"
                        style={{ position:'relative', borderRadius:20, background: isPopular ? `linear-gradient(155deg,${activeService.color}11,rgba(255,255,255,0.03))` : 'rgba(255,255,255,0.03)', border:`1px solid ${isPopular ? activeService.color+'50' : 'rgba(255,255,255,0.08)'}`, padding:'24px 22px', transition:'all 0.22s', animation: animating ? 'popIn 0.45s ease' : 'none' }}>

                        {isPopular && <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${activeService.color},transparent)`, borderRadius:'20px 20px 0 0' }} />}
                        {isPopular && <span style={{ position:'absolute', top:14, right:14, background:activeService.color, color:'#000', fontSize:8, fontWeight:900, padding:'3px 8px', borderRadius:5, fontFamily:"'Space Mono',monospace", letterSpacing:1 }}>★ TOP PICK</span>}

                        <div style={{ marginBottom:18 }}>
                          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:17, fontWeight:900, color:'#fff', marginBottom:6 }}>{plan.name}</div>
                          <div style={{ display:'flex', alignItems:'baseline', gap:3 }}>
                            <span style={{ fontFamily:"'Sora',sans-serif", fontSize:32, fontWeight:900, color: isPopular ? activeService.color : '#fff', letterSpacing:-1.5 }}>
                              ${plan.price.toLocaleString()}
                            </span>
                            <span style={{ fontSize:12, color:'rgba(255,255,255,0.28)', marginLeft:2 }}>
                              {plan.billing==='monthly' ? '/mo' : plan.billing==='yearly' ? '/yr' : ' once'}
                            </span>
                          </div>
                          {plan.billing==='monthly' && (
                            <div style={{ marginTop:5, fontSize:11, color:'rgba(255,255,255,0.22)', fontFamily:"'Space Mono',monospace" }}>
                              billed monthly · ${(plan.price*12).toLocaleString()}/yr
                            </div>
                          )}
                        </div>

                        <div style={{ height:1, background:`linear-gradient(90deg,${activeService.color}35,transparent)`, marginBottom:18 }} />

                        <ul style={{ listStyle:'none', padding:0, margin:'0 0 22px', display:'flex', flexDirection:'column', gap:9 }}>
                          {plan.features.map((f,fi) => (
                            <li key={fi} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                              <div style={{ width:17, height:17, borderRadius:5, background:`${activeService.color}15`, border:`1px solid ${activeService.color}28`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                                <span style={{ color:activeService.color, fontSize:9, fontWeight:900 }}>✓</span>
                              </div>
                              <span style={{ fontSize:13, color:'rgba(255,255,255,0.55)', lineHeight:1.5 }}>{f}</span>
                            </li>
                          ))}
                        </ul>

                        <button onClick={() => handleBuy(activeService, plan)}
                          style={{ width:'100%', padding:'12px', borderRadius:11, border: inCart ? '1px solid rgba(34,197,94,0.3)' : isPopular ? 'none' : '1px solid rgba(255,255,255,0.1)', background: inCart ? 'rgba(34,197,94,0.08)' : isPopular ? activeService.color : 'rgba(255,255,255,0.06)', color: inCart ? '#22C55E' : isPopular ? '#000' : 'rgba(255,255,255,0.65)', fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:14, letterSpacing:-0.2, cursor:'pointer', transition:'all 0.17s', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}
                          onMouseEnter={e => { if(!inCart) e.currentTarget.style.filter='brightness(1.1)'; }}
                          onMouseLeave={e => { e.currentTarget.style.filter='none'; }}>
                          {inCart ? '✓ In Cart' : isAuthenticated ? 'Add to Cart →' : 'Get Started →'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── Compare table ── */}
          <div style={{ marginBottom:88 }}>
            <div style={{ textAlign:'center', marginBottom:32 }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.22)', letterSpacing:2, textTransform:'uppercase' }}>Feature Matrix</span>
              <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:26, fontWeight:900, color:'#fff', marginTop:10, letterSpacing:-0.5 }}>Compare All Services</h2>
            </div>
            <div style={{ overflowX:'auto', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18 }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:700 }}>
                <thead>
                  <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
                    <th style={{ padding:'14px 20px', textAlign:'left', fontFamily:"'Space Mono',monospace", fontSize:9, color:'rgba(255,255,255,0.2)', letterSpacing:1.5, textTransform:'uppercase', fontWeight:400 }}>Feature</th>
                    {services.map(s => (
                      <th key={s._id} style={{ padding:'14px 16px', textAlign:'center', fontFamily:"'Sora',sans-serif", fontWeight:900, fontSize:11, color:s.color, letterSpacing:-0.2 }}>
                        <div style={{ fontSize:16, marginBottom:3 }}>{s.icon}</div>
                        {s.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)', background: ri%2===0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                      <td style={{ padding:'13px 20px', fontSize:13, color:'rgba(255,255,255,0.48)' }}>{row.label}</td>
                      {row.vals.map((v,vi) => (
                        <td key={vi} style={{ padding:'13px 16px', textAlign:'center' }}>
                          {v
                            ? <span style={{ color:'#22C55E', fontSize:15 }}>✓</span>
                            : <span style={{ color:'rgba(255,255,255,0.1)', fontSize:13 }}>—</span>
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── How It Works ── */}
          <div style={{ marginBottom:88 }}>
            <div style={{ textAlign:'center', marginBottom:40 }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.22)', letterSpacing:2, textTransform:'uppercase' }}>Process</span>
              <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:26, fontWeight:900, color:'#fff', marginTop:10, letterSpacing:-0.5 }}>From Cart to Live in 4 Steps</h2>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:14 }}>
              {HOW_IT_WORKS.map((h,i) => (
                <div key={i} className="how-card"
                  style={{ padding:'28px 22px', background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, position:'relative', transition:'all 0.22s' }}>
                  <div style={{ position:'absolute', top:18, right:18, fontFamily:"'Space Mono',monospace", fontSize:9, color:'rgba(255,255,255,0.1)', letterSpacing:1 }}>{h.n}</div>
                  <div style={{ fontSize:26, marginBottom:14 }}>{h.icon}</div>
                  <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:900, color:'#fff', marginBottom:8 }}>{h.title}</div>
                  <div style={{ fontSize:13, color:'rgba(255,255,255,0.38)', lineHeight:1.7 }}>{h.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── FAQ ── */}
          <div style={{ maxWidth:720, margin:'0 auto 88px' }}>
            <div style={{ textAlign:'center', marginBottom:36 }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.22)', letterSpacing:2, textTransform:'uppercase' }}>FAQ</span>
              <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:26, fontWeight:900, color:'#fff', marginTop:10, letterSpacing:-0.5 }}>Common Questions</h2>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {FAQS.map((f,i) => (
                <div key={i} className="faq-row"
                  onClick={() => setOpenFaq(openFaq===i ? null : i)}
                  style={{ background:'rgba(255,255,255,0.025)', border:`1px solid ${openFaq===i ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)'}`, borderRadius:13, overflow:'hidden', transition:'all 0.17s', cursor:'pointer' }}>
                  <div style={{ padding:'17px 22px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12 }}>
                    <span style={{ fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:800, color:'#fff' }}>{f.q}</span>
                    <span style={{ color:'rgba(255,255,255,0.28)', fontSize:20, flexShrink:0, transition:'transform 0.2s', transform: openFaq===i ? 'rotate(45deg)' : 'none', lineHeight:1 }}>+</span>
                  </div>
                  {openFaq===i && (
                    <div style={{ padding:'0 22px 17px' }}>
                      <p style={{ fontSize:13, color:'rgba(255,255,255,0.43)', lineHeight:1.8, margin:0 }}>{f.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Enterprise CTA ── */}
          <div style={{ background:'linear-gradient(135deg,rgba(34,197,94,0.07),rgba(59,130,246,0.05),rgba(139,92,246,0.06))', border:'1px solid rgba(255,255,255,0.08)', borderRadius:26, padding:'60px 44px', textAlign:'center', marginBottom:100, position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:560, height:300, borderRadius:'50%', background:'radial-gradient(ellipse,rgba(34,197,94,0.05) 0%,transparent 70%)', pointerEvents:'none' }} />
            <div style={{ position:'relative' }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.2)', letterSpacing:2, textTransform:'uppercase', display:'block', marginBottom:16 }}>Get Started Today</span>
              <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(26px,4vw,46px)', fontWeight:900, color:'#fff', letterSpacing:-1.5, margin:'0 0 16px', lineHeight:1.05 }}>
                Stop Planning.<br />
                <span style={{ color:'#22C55E' }}>Start Building.</span>
              </h2>
              <p style={{ color:'rgba(255,255,255,0.35)', fontSize:15, maxWidth:420, margin:'0 auto 34px', lineHeight:1.8 }}>
                Every plan includes a free kick-off call, a fixed-scope contract, and an NDA. No surprises. Ever.
              </p>
              <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:22 }}>
                <button className="cta-btn" onClick={() => navigate('/contact')}
                  style={{ padding:'14px 34px', background:'#fff', color:'#000', border:'none', borderRadius:12, fontFamily:"'Sora',sans-serif", fontWeight:900, fontSize:15, letterSpacing:-0.3, cursor:'pointer', transition:'all 0.17s' }}>
                  Book a Free Call →
                </button>
                <button className="cta-btn" onClick={() => navigate('/portfolio')}
                  style={{ padding:'14px 26px', background:'rgba(255,255,255,0.05)', color:'rgba(255,255,255,0.6)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:15, cursor:'pointer', transition:'all 0.17s' }}>
                  See Our Work
                </button>
              </div>
              <div style={{ display:'flex', gap:24, justifyContent:'center', flexWrap:'wrap' }}>
                {['✓ No lock-in contracts','✓ NDA included by default','✓ Fixed-price quotes'].map((t,i) => (
                  <span key={i} style={{ fontSize:11, color:'rgba(255,255,255,0.2)', fontFamily:"'Space Mono',monospace" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}