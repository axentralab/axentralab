import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const FALLBACK = [
  { _id:'1', title:'AI Automation', icon:'⚡', color:'#22C55E', description:'Chatbots, workflow automation, CRM integration, and intelligent AI agents.', features:['AI chatbots','Workflow automation','CRM integration','AI agents'], plans:[{name:'Starter',price:499,billing:'one-time',features:['1 chatbot','Basic workflow','Email support']},{name:'Pro',price:999,billing:'one-time',features:['5 chatbots','Advanced workflows','Priority support','CRM integration']},{name:'Enterprise',price:2499,billing:'one-time',features:['Unlimited bots','Custom AI agents','Dedicated support','Full CRM suite']}] },
  { _id:'2', title:'Web Development', icon:'🌐', color:'#3B82F6', description:'MERN apps, SaaS platforms, dashboards, and enterprise-grade websites.', features:['React/Next.js','Node.js backend','MongoDB','Deployment'], plans:[{name:'Landing Page',price:799,billing:'one-time',features:['5 sections','Responsive','SEO ready','1 month support']},{name:'Web App',price:2999,billing:'one-time',features:['Full MERN stack','Auth system','Dashboard','3 months support']},{name:'SaaS Platform',price:7999,billing:'one-time',features:['Multi-tenant','Stripe billing','Admin panel','6 months support']}] },
  { _id:'3', title:'Cybersecurity', icon:'🛡️', color:'#EF4444', description:'Vulnerability scanning, penetration testing, malware removal, security audits.', features:['Pen testing','Vuln scanning','Security audit','Malware removal'], plans:[{name:'Basic Audit',price:399,billing:'one-time',features:['Surface scan','Report','Fix recommendations']},{name:'Full Pentest',price:1499,billing:'one-time',features:['Deep penetration test','OWASP coverage','Detailed report','Fix support']},{name:'Ongoing Monitor',price:299,billing:'monthly',features:['24/7 monitoring','Instant alerts','Monthly reports','Incident response']}] },
  { _id:'4', title:'DevOps & Cloud', icon:'☁️', color:'#8B5CF6', description:'CI/CD pipelines, cloud automation, containerization, infrastructure monitoring.', features:['CI/CD','Docker/K8s','Cloud setup','Monitoring'], plans:[{name:'Setup',price:699,billing:'one-time',features:['CI/CD pipeline','Docker setup','Basic monitoring']},{name:'Full DevOps',price:1999,billing:'one-time',features:['Full infra setup','Auto-scaling','Advanced monitoring','Runbooks']},{name:'Managed',price:499,billing:'monthly',features:['Ongoing management','24/7 support','Scaling','Incident response']}] },
  { _id:'5', title:'SaaS Development', icon:'📦', color:'#F59E0B', description:'Full-cycle SaaS product design, development, and deployment.', features:['Full dev cycle','Subscription billing','Multi-tenant','Analytics'], plans:[{name:'MVP',price:4999,billing:'one-time',features:['Core features','Auth & billing','Basic analytics','3 months support']},{name:'Full SaaS',price:14999,billing:'one-time',features:['All features','Admin dashboard','Advanced analytics','6 months support','Dedicated PM']}] },
  { _id:'6', title:'IT Consulting', icon:'💡', color:'#06B6D4', description:'Architecture planning, digital transformation, tech stack consulting.', features:['Architecture','Digital transformation','Tech stack advice','Roadmapping'], plans:[{name:'1-hour Call',price:149,billing:'one-time',features:['60 min consultation','Written summary','Action items']},{name:'Deep Dive',price:799,billing:'one-time',features:['Full day workshop','Architecture doc','Tech roadmap','Follow-up call']},{name:'Retainer',price:999,billing:'monthly',features:['10 hours/month','Priority access','Ongoing guidance','Slack access']}] },
];

const TRUST = [
  { icon:'⚡', val:'24hr', label:'Kickoff Time' },
  { icon:'🔒', val:'NDA', label:'On Request' },
  { icon:'♾️', val:'100%', label:'Ownership' },
  { icon:'🌍', val:'30+', label:'Countries' },
];

export default function ShopPage() {
  const [services, setServices] = useState(FALLBACK);
  const [activeService, setActiveService] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/services')
      .then(r => { if (r.data.data?.length) setServices(r.data.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const isInCart = (serviceId, planName) =>
    cart.some(i => i.serviceId === serviceId && i.plan === planName);

  const handleBuy = (service, plan) => {
    if (!isAuthenticated) { navigate('/register'); return; }
    addToCart(service, plan);
    navigate('/cart');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;800;900&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .plan-card { transition: all 0.22s ease; }
        .plan-card:hover { transform: translateY(-5px); }
        .service-row { transition: background 0.18s; }
        .service-row:hover { background: rgba(255,255,255,0.03) !important; }
        .buy-btn { transition: all 0.18s; }
        .buy-btn:hover { filter: brightness(1.12); transform: translateY(-1px); }
        .sidebar-tab { transition: all 0.18s; }
        .sidebar-tab:hover { background: rgba(255,255,255,0.06) !important; }
      `}</style>

      <div style={{ minHeight:'100vh', padding:'90px 0 100px', fontFamily:"'DM Sans',sans-serif" }}>

        {/* ── bg glows ── */}
        <div style={{ position:'fixed', top:'20%', left:'-10%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(34,197,94,0.04) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }} />
        <div style={{ position:'fixed', bottom:'10%', right:'-8%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(139,92,246,0.04) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }} />

        <div style={{ position:'relative', zIndex:1, maxWidth:1200, margin:'0 auto', padding:'0 5%' }}>

          {/* ── Header ── */}
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <span style={{ display:'inline-block', padding:'4px 14px', borderRadius:999, border:'1px solid rgba(34,197,94,0.3)', background:'rgba(34,197,94,0.07)', color:'#22C55E', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1.5, textTransform:'uppercase', fontWeight:700 }}>Services & Pricing</span>
            <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(30px,5.5vw,60px)', fontWeight:900, color:'#fff', marginTop:16, letterSpacing:-2, lineHeight:1.05 }}>
              Pick a Plan.<br />
              <span style={{ background:'linear-gradient(90deg,#22C55E,#3B82F6,#22C55E)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'shimmer 4s linear infinite' }}>We Handle the Rest.</span>
            </h1>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:15, maxWidth:460, margin:'16px auto 0', lineHeight:1.8 }}>
              Transparent pricing. No retainers unless you want one. Add to cart and we kick off within 24 hours.
            </p>
          </div>

          {/* ── Trust Strip ── */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center', marginBottom:64 }}>
            {TRUST.map((t,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 18px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:40 }}>
                <span style={{ fontSize:16 }}>{t.icon}</span>
                <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:900, fontSize:14, color:'#fff' }}>{t.val}</span>
                <span style={{ fontSize:12, color:'rgba(255,255,255,0.3)' }}>{t.label}</span>
              </div>
            ))}
          </div>

          {/* ── Two-column layout: sidebar + plans ── */}
          <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:28, alignItems:'start' }}>

            {/* ── Sidebar ── */}
            <div style={{ position:'sticky', top:100, background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, overflow:'hidden' }}>
              <div style={{ padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'rgba(255,255,255,0.25)', letterSpacing:2, textTransform:'uppercase' }}>Services</span>
              </div>
              {services.map((s) => (
                <button key={s._id} className="sidebar-tab"
                  onClick={() => {
                    setActiveService(s._id);
                    document.getElementById(`service-${s._id}`)?.scrollIntoView({ behavior:'smooth', block:'start' });
                  }}
                  style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'13px 16px', background: activeService===s._id ? `${s.color}10` : 'transparent', border:'none', borderLeft: activeService===s._id ? `2px solid ${s.color}` : '2px solid transparent', cursor:'pointer', textAlign:'left' }}>
                  <span style={{ fontSize:18 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontFamily:"'Sora',sans-serif", fontSize:13, fontWeight:700, color: activeService===s._id ? '#fff' : 'rgba(255,255,255,0.5)' }}>{s.title}</div>
                    <div style={{ fontSize:10, color:'rgba(255,255,255,0.2)', marginTop:1 }}>
                      from ${Math.min(...s.plans.map(p=>p.price)).toLocaleString()}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* ── Service Sections ── */}
            <div style={{ display:'flex', flexDirection:'column', gap:40 }}>
              {services.map((service) => (
                <div key={service._id} id={`service-${service._id}`} style={{ scrollMarginTop:110 }}>

                  {/* Service Header */}
                  <div className="service-row"
                    style={{ display:'flex', alignItems:'center', gap:16, padding:'20px 24px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, marginBottom:20, cursor:'pointer' }}
                    onClick={() => setActiveService(activeService===service._id ? null : service._id)}>
                    <div style={{ width:50, height:50, borderRadius:14, background:`${service.color}15`, border:`1px solid ${service.color}25`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>
                      {service.icon}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
                        <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:900, color:'#fff', letterSpacing:-0.4, margin:0 }}>{service.title}</h2>
                        <span style={{ padding:'2px 10px', borderRadius:999, background:`${service.color}12`, border:`1px solid ${service.color}25`, color:service.color, fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:0.5, textTransform:'uppercase', fontWeight:600 }}>
                          {service.plans.length} plan{service.plans.length!==1?'s':''}
                        </span>
                      </div>
                      <p style={{ fontSize:13, color:'rgba(255,255,255,0.4)', margin:'4px 0 0', lineHeight:1.5 }}>{service.description}</p>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:16, flexShrink:0 }}>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'rgba(255,255,255,0.2)', letterSpacing:1, textTransform:'uppercase' }}>From</div>
                        <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:900, fontSize:18, color:service.color }}>
                          ${Math.min(...service.plans.map(p=>p.price)).toLocaleString()}
                        </div>
                      </div>
                      <div style={{ width:32, height:32, borderRadius:10, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.09)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(255,255,255,0.4)', fontSize:13, transition:'transform 0.2s', transform: activeService===service._id ? 'rotate(180deg)' : 'none' }}>▼</div>
                    </div>
                  </div>

                  {/* Plans Grid */}
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:16 }}>
                    {service.plans.map((plan, pi) => {
                      const inCart = isInCart(service._id, plan.name);
                      const isPopular = pi === 1;
                      const isLast = pi === service.plans.length - 1 && service.plans.length > 2;

                      return (
                        <div key={plan.name} className="plan-card"
                          style={{
                            background: isPopular ? `${service.color}08` : 'rgba(255,255,255,0.025)',
                            border: `1px solid ${isPopular ? service.color+'50' : 'rgba(255,255,255,0.08)'}`,
                            borderRadius:20,
                            padding:'24px',
                            position:'relative',
                            boxShadow: isPopular ? `0 0 40px ${service.color}10` : 'none',
                          }}>

                          {isPopular && (
                            <div style={{ position:'absolute', top:-11, left:'50%', transform:'translateX(-50%)', background:service.color, color:'#000', fontSize:9, fontWeight:800, padding:'4px 12px', borderRadius:999, fontFamily:"'Space Mono',monospace", letterSpacing:1, whiteSpace:'nowrap' }}>
                              ★ MOST POPULAR
                            </div>
                          )}

                          {/* Plan name + billing badge */}
                          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:18, gap:8 }}>
                            <div>
                              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:17, fontWeight:900, color:'#fff', letterSpacing:-0.3 }}>{plan.name}</div>
                              <div style={{ marginTop:6, display:'flex', alignItems:'baseline', gap:4 }}>
                                <span style={{ fontFamily:"'Sora',sans-serif", fontSize:28, fontWeight:900, color:service.color, letterSpacing:-1 }}>${plan.price.toLocaleString()}</span>
                                <span style={{ fontSize:12, color:'rgba(255,255,255,0.3)' }}>
                                  {plan.billing==='monthly' ? '/mo' : plan.billing==='yearly' ? '/yr' : ' once'}
                                </span>
                              </div>
                            </div>
                            {plan.billing==='monthly' && (
                              <span style={{ padding:'3px 8px', borderRadius:6, background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.2)', color:'#22C55E', fontSize:9, fontFamily:"'Space Mono',monospace", letterSpacing:0.5, fontWeight:700, whiteSpace:'nowrap', marginTop:2 }}>RECURRING</span>
                            )}
                          </div>

                          {/* Divider */}
                          <div style={{ height:1, background:`linear-gradient(90deg,${service.color}30,transparent)`, marginBottom:18 }} />

                          {/* Features */}
                          <ul style={{ listStyle:'none', padding:0, margin:'0 0 24px' }}>
                            {plan.features.map((f,fi) => (
                              <li key={fi} style={{ display:'flex', alignItems:'center', gap:9, padding:'7px 0', borderBottom: fi<plan.features.length-1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                                <div style={{ width:16, height:16, borderRadius:4, background:`${service.color}18`, border:`1px solid ${service.color}30`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                                  <span style={{ color:service.color, fontSize:9, fontWeight:900 }}>✓</span>
                                </div>
                                <span style={{ fontSize:13, color:'rgba(255,255,255,0.6)' }}>{f}</span>
                              </li>
                            ))}
                          </ul>

                          {/* CTA */}
                          <button className="buy-btn" onClick={() => handleBuy(service, plan)}
                            style={{
                              width:'100%', padding:'12px', borderRadius:12, cursor:'pointer',
                              background: inCart ? 'rgba(34,197,94,0.1)' : isPopular ? service.color : 'rgba(255,255,255,0.07)',
                              border: inCart ? `1px solid rgba(34,197,94,0.3)` : isPopular ? 'none' : `1px solid rgba(255,255,255,0.12)`,
                              color: inCart ? '#22C55E' : isPopular ? '#000' : 'rgba(255,255,255,0.75)',
                              fontWeight:800, fontSize:14,
                              fontFamily:"'Sora',sans-serif",
                              letterSpacing:-0.2,
                              display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                            }}>
                            {inCart ? (
                              <><span style={{ fontSize:15 }}>✓</span> Added to Cart</>
                            ) : isAuthenticated ? (
                              <><span>Add to Cart</span><span style={{ fontSize:16 }}>→</span></>
                            ) : (
                              <><span>Get Started</span><span style={{ fontSize:16 }}>→</span></>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                </div>
              ))}

              {/* ── Custom / Enterprise CTA ── */}
              <div style={{ background:'linear-gradient(135deg,rgba(139,92,246,0.09) 0%,rgba(34,197,94,0.06) 100%)', border:'1px solid rgba(139,92,246,0.22)', borderRadius:24, padding:'44px 40px', display:'flex', flexWrap:'wrap', gap:28, alignItems:'center', justifyContent:'space-between', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:-40, right:-40, width:220, height:220, borderRadius:'50%', background:'radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 70%)', pointerEvents:'none' }} />
                <div style={{ position:'relative', flex:'1 1 280px' }}>
                  <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #8B5CF640', background:'#8B5CF612', color:'#8B5CF6', fontSize:9, fontFamily:"'Space Mono',monospace", letterSpacing:1.5, textTransform:'uppercase', fontWeight:700, marginBottom:12 }}>Enterprise / Custom</span>
                  <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(18px,3vw,24px)', fontWeight:900, color:'#fff', letterSpacing:-0.5, margin:'0 0 10px' }}>Need something tailored?</h3>
                  <p style={{ fontSize:14, color:'rgba(255,255,255,0.4)', lineHeight:1.7, margin:0 }}>
                    Combine multiple services, request custom scope, or get a fixed-price quote for a large project. We'll scope it out on a free 30-min call.
                  </p>
                </div>
                <div style={{ display:'flex', gap:12, flexWrap:'wrap', position:'relative' }}>
                  <button className="buy-btn" onClick={() => navigate('/contact')}
                    style={{ padding:'13px 28px', background:'#8B5CF6', color:'#fff', border:'none', borderRadius:12, fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:14, cursor:'pointer' }}>
                    Book a Free Call →
                  </button>
                  <button className="buy-btn" onClick={() => navigate('/portfolio')}
                    style={{ padding:'13px 22px', background:'rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.7)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:14, cursor:'pointer' }}>
                    See Our Work
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}