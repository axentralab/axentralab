import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const DISCOUNT_RATE = 0.5; // 50% off
const DISCOUNT_LABEL = '🎉 New Agency Launch — 50% OFF';
const DISCOUNT_BADGE = 'LAUNCH50';

const FALLBACK = [
  {
    _id:'1', title:'Web Development', icon:'🌐', color:'#3B82F6',
    description:'Business websites, landing pages, web apps, and SaaS platforms built with React, Next.js & Node.js.',
    features:['React / Next.js','Node.js & Express','MongoDB','REST API','Tailwind CSS'],
    subServices:['Business / Corporate Website','Landing Page Design','Portfolio Website','Web Application','SaaS Platform','MERN Stack Development','API Development & Integration'],
    plans:[
      { name:'Landing Page',   price:250,  billing:'one-time', bdt:'৳25,000',  features:['Responsive design','Up to 5 sections','Basic SEO','1 month support','Source code included'] },
      { name:'Business Site',  price:600,  billing:'one-time', bdt:'৳60,000',  features:['Multi-page site','Contact form','SEO ready','CMS integration','3 months support'] },
      { name:'Custom Web App', price:3000, billing:'one-time', bdt:'৳3,00,000', features:['Full MERN stack','Auth system','Dashboard','REST API','6 months support','Dedicated PM'] },
    ],
  },
  {
    _id:'2', title:'E-Commerce', icon:'🛒', color:'#F97316',
    description:'Online stores with Shopify, WooCommerce, or fully custom — including payment gateways and subscriptions.',
    features:['Shopify / WooCommerce','Custom store','Payment gateway','Subscription system','Product management'],
    subServices:['Shopify Store Development','WooCommerce Store Development','Custom E-commerce Website','Payment Gateway Integration','Subscription / Membership System'],
    plans:[
      { name:'Shopify Starter', price:300, billing:'one-time', bdt:'৳30,000', features:['Up to 50 products','Payment gateway','Responsive','Basic SEO','2 weeks delivery'] },
      { name:'WooCommerce Pro', price:500, billing:'one-time', bdt:'৳50,000', features:['Unlimited products','Custom theme','Payment + shipping','Coupons & offers','2 months support'] },
      { name:'Custom Store',    price:2500,billing:'one-time', bdt:'৳2,50,000',features:['Fully custom build','Subscription billing','Admin panel','Analytics','6 months support','Dedicated PM'] },
    ],
  },
  {
    _id:'3', title:'Cybersecurity', icon:'🛡️', color:'#EF4444',
    description:'Security audits, malware removal, penetration testing, and server hardening for web apps and servers.',
    features:['Security audit','Malware removal','Penetration testing','Server hardening','24/7 monitoring'],
    subServices:['Website Security Audit','Malware Removal','WordPress Security Hardening','Vulnerability Scanning','Penetration Testing (Web Apps)','Server Security Hardening','Incident Response'],
    plans:[
      { name:'Basic Audit',       price:80,  billing:'one-time', bdt:'৳8,000',  features:['Surface vulnerability scan','Written report','Fix recommendations','PDF delivery'] },
      { name:'Full Pentest',      price:800, billing:'one-time', bdt:'৳80,000', features:['Deep penetration test','OWASP Top 10 coverage','Exploit PoC','Detailed report','Fix support'] },
      { name:'Security Monitor',  price:99,  billing:'monthly',  bdt:'৳10,000/mo', features:['24/7 monitoring','Instant breach alerts','Monthly security report','Incident response','Server hardening check'] },
    ],
  },
  {
    _id:'4', title:'Website Optimization', icon:'⚡', color:'#F59E0B',
    description:'Speed up slow websites, fix Core Web Vitals, optimize databases, and set up CDN for peak performance.',
    features:['Speed optimization','Core Web Vitals','DB optimization','Image & asset opt','CDN setup'],
    subServices:['Website Speed Optimization','Core Web Vitals Optimization','Database Optimization','Image & Asset Optimization','CDN Setup','Performance Audit'],
    plans:[
      { name:'Speed Fix',       price:50,  billing:'one-time', bdt:'৳5,000',  features:['Image compression','Caching setup','Basic JS/CSS minify','Performance report'] },
      { name:'Advanced Boost',  price:200, billing:'one-time', bdt:'৳20,000', features:['Core Web Vitals fix','DB query optimization','CDN integration','Lazy loading','Before/after report'] },
      { name:'Full Audit+Fix',  price:300, billing:'one-time', bdt:'৳30,000', features:['Full performance audit','All above fixes','Server-side optimizations','3-month monitoring','Written SLA'] },
    ],
  },
  {
    _id:'5', title:'Hosting & DevOps', icon:'☁️', color:'#8B5CF6',
    description:'VPS setup, cloud deployment on AWS/DigitalOcean, CI/CD pipelines, Docker, and disaster recovery.',
    features:['VPS setup','AWS / Vercel / DO','CI/CD pipeline','Docker deployment','Backup & recovery'],
    subServices:['VPS Setup & Management','Cloud Deployment (AWS / Vercel / DigitalOcean)','CI/CD Pipeline Setup','Docker Deployment','Server Monitoring','Backup & Disaster Recovery'],
    plans:[
      { name:'VPS Setup',      price:120, billing:'one-time', bdt:'৳12,000', features:['Server provisioning','Nginx / Apache config','SSL setup','Basic monitoring','Docs handover'] },
      { name:'Full DevOps',    price:250, billing:'one-time', bdt:'৳25,000', features:['Cloud deployment','CI/CD pipeline','Docker + K8s','Auto-scaling','Runbooks'] },
      { name:'Managed Server', price:150, billing:'monthly',  bdt:'৳15,000/mo', features:['24/7 monitoring','Auto backups','Incident response','Security patches','Monthly report'] },
    ],
  },
  {
    _id:'6', title:'SaaS & Custom Software', icon:'📦', color:'#22C55E',
    description:'End-to-end SaaS product development — CRM dashboards, fintech tools, admin panels, and business automation.',
    features:['SaaS product dev','CRM / Fintech dashboard','Analytics panel','Admin tools','Multi-tenant'],
    subServices:['SaaS Product Development','CRM Dashboard','Fintech Dashboard','Analytics Dashboard','Admin Panels','Internal Business Tools'],
    plans:[
      { name:'MVP',       price:1500, billing:'one-time', bdt:'৳1,50,000', features:['Core features','Auth & billing','Basic analytics','3 months support','Source code'] },
      { name:'Full SaaS', price:8000, billing:'one-time', bdt:'৳8,00,000', features:['All features','Multi-tenant','Admin dashboard','Advanced analytics','6 months support','Dedicated PM'] },
    ],
  },
  {
    _id:'7', title:'UI/UX Design', icon:'🎨', color:'#EC4899',
    description:'Beautiful, conversion-focused UI designs for websites, SaaS dashboards, and mobile apps using Figma.',
    features:['Website UI','Mobile app UI','SaaS dashboard UI','Wireframe & prototype','Design system'],
    subServices:['Website UI Design','Mobile App UI','SaaS Dashboard UI','Wireframe & Prototype','Design System'],
    plans:[
      { name:'Landing Page UI', price:120, billing:'one-time', bdt:'৳12,000', features:['1-page design','Desktop + mobile','Figma source file','2 revision rounds','3-day delivery'] },
      { name:'Website UI',      price:400, billing:'one-time', bdt:'৳40,000', features:['Up to 8 pages','Component library','Figma + handoff','3 revision rounds','1 week delivery'] },
      { name:'SaaS Dashboard',  price:600, billing:'one-time', bdt:'৳60,000', features:['Full dashboard UI','Design system','Interactive prototype','Unlimited revisions','Dev handoff notes'] },
    ],
  },
  {
    _id:'8', title:'Maintenance & Support', icon:'🛠️', color:'#06B6D4',
    description:'Ongoing website maintenance, bug fixing, security monitoring, and performance upkeep after launch.',
    features:['Bug fixing','Security monitoring','Performance check','Content updates','Monthly reports'],
    subServices:['Website Maintenance','Security Monitoring','Bug Fixing','Performance Monitoring','Monthly Support Plans'],
    plans:[
      { name:'Basic',    price:30,  billing:'monthly', bdt:'৳3,000/mo',  features:['Monthly backup','Bug fixes (2hrs)','Uptime monitoring','Email support'] },
      { name:'Standard', price:60,  billing:'monthly', bdt:'৳6,000/mo',  features:['Weekly backup','Bug fixes (5hrs)','Security scan','Performance check','Priority support'] },
      { name:'Premium',  price:120, billing:'monthly', bdt:'৳12,000/mo', features:['Daily backup','Unlimited bug fixes','24/7 monitoring','Monthly report','Dedicated engineer','SLA guarantee'] },
    ],
  },
];

const FAQS = [
  { q:'Do I need to pay upfront?',          a:'For one-time projects we take 50% upfront and 50% on delivery. Monthly plans are billed at the start of each billing cycle.' },
  { q:'Can I mix services in one order?',    a:'Yes — add multiple services and plans to your cart and check out together. We\'ll coordinate all deliverables under one PM.' },
  { q:'What if I\'m not satisfied?',         a:'We offer a free revision round on every deliverable. If we miss the agreed scope, we\'ll refund the relevant milestone.' },
  { q:'How fast do you start?',              a:'Most services kick off within 24 hours of payment. Enterprise projects get a scoping call booked the same day.' },
  { q:'Do you sign NDAs?',                   a:'Always. An NDA is included in every contract by default at no extra cost.' },
  { q:'Can I upgrade my plan later?',        a:'Yes. You pay only the difference when upgrading. Downgrades take effect at the next billing cycle.' },
  { q:'Is the 50% launch discount permanent?', a:'No — this is a limited-time offer for our agency launch. Once the launch period ends, prices return to normal. Lock in your rate now.' },
];

const COMPARE_ROWS = [
  { label:'Source code included',  vals:[true, true, true, true, true, true, true, true]  },
  { label:'Dedicated PM',          vals:[false,false,false,false,false,true, false,false] },
  { label:'Monthly retainer opt',  vals:[false,false,true, false,true, false,false,true]  },
  { label:'SLA guarantee',         vals:[false,false,true, false,true, false,false,true]  },
  { label:'NDA included',          vals:[true, true, true, true, true, true, true, true]  },
  { label:'Post-delivery support', vals:[true, true, true, true, true, true, true, true]  },
  { label:'Design (Figma) files',  vals:[false,false,false,false,false,false,true,false]  },
  { label:'24/7 monitoring',       vals:[false,false,true, false,true, false,false,true]  },
];

const HOW_IT_WORKS = [
  { n:'01', icon:'🛒', title:'Add to Cart',       desc:'Pick any plan. Mix services. One unified checkout — our PM coordinates everything.' },
  { n:'02', icon:'📋', title:'Scope & Sign',       desc:'Detailed scope doc + NDA within 2 hours. E-sign in one click. No back-and-forth.' },
  { n:'03', icon:'⚙️', title:'Build & Review',     desc:'Weekly sprint demos with staging access. You give feedback; we iterate.' },
  { n:'04', icon:'🚀', title:'Launch & Handover',  desc:'Full docs, repo transfer, and optional retainer. You own everything — forever.' },
];

const STACK_BADGES = ['React','Next.js','Node.js','MongoDB','Express','Tailwind','Shopify','WooCommerce','Docker','AWS','DigitalOcean','Vercel','Figma','Adobe XD','Burp Suite','OWASP','Nginx','PostgreSQL','Redis','CI/CD'];

// Helper: apply discount
const discountedPrice = (price) => Math.round(price * (1 - DISCOUNT_RATE));

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
    const discountedPlan = { ...plan, price: discountedPrice(plan.price), originalPrice: plan.price };
    addToCart(service, discountedPlan);
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
        @keyframes popIn    { 0%{transform:scale(0.9);opacity:0} 60%{transform:scale(1.03)} 100%{transform:scale(1);opacity:1} }
        @keyframes slideUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes ticker   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes pulse    { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4)} 50%{box-shadow:0 0 0 7px rgba(34,197,94,0)} }
        @keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes badgePop { 0%{transform:scale(0.8) rotate(-6deg);opacity:0} 70%{transform:scale(1.1) rotate(2deg)} 100%{transform:scale(1) rotate(0deg);opacity:1} }
        @keyframes strikeThrough { from{width:0} to{width:100%} }

        .srv-pill:hover  { opacity:1 !important; background: rgba(255,255,255,0.07) !important; }
        .plan-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,0.3) !important; }
        .how-card:hover  { border-color: rgba(255,255,255,0.15) !important; transform: translateY(-3px); }
        .faq-row:hover   { background: rgba(255,255,255,0.04) !important; }
        .cta-btn:hover   { filter: brightness(1.1); transform: translateY(-1px); }

        .old-price {
          position: relative;
          display: inline-block;
          color: rgba(255,255,255,0.3);
        }
        .old-price::after {
          content: '';
          position: absolute;
          left: 0; top: 50%;
          height: 2px;
          width: 100%;
          background: #EF4444;
          border-radius: 2px;
          animation: strikeThrough 0.4s ease forwards;
        }

        .discount-shine {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
          background-size: 400px 100%;
          animation: shimmer 2.5s infinite;
        }

        /* ── RESPONSIVE ── */
        .hero-grid    { display:grid; grid-template-columns:1fr 360px; gap:48px; align-items:start; margin-bottom:88px; }
        .browse-hdr   { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:14px; margin-bottom:22px; }
        .svc-hdr      { display:flex; align-items:flex-start; gap:18px; }
        .cta-section  { padding:60px 44px; }
        .cart-sticky  { position:sticky; top:116px; }
        .stat-pills   { display:flex; gap:10px; flex-wrap:wrap; }
        .pill-scroll  { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:32px; }
        .billing-bar  { display:flex; gap:4px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07); border-radius:10px; padding:4px; }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns:1fr !important; gap:32px !important; margin-bottom:56px !important; }
          .cart-sticky { position:static !important; top:unset !important; }
        }

        @media (max-width: 640px) {
          .hero-grid    { margin-bottom:40px !important; }
          .cta-section  { padding:36px 22px !important; }
          .svc-hdr      { flex-wrap:wrap !important; }
          .browse-hdr   { flex-direction:column !important; align-items:flex-start !important; }
          .billing-bar  { width:100%; justify-content:space-between; }
          .billing-bar button { flex:1; }
          .stat-pills   { gap:8px; }
          .stat-pills > div { flex:1 1 calc(50% - 8px); min-width:80px; }
          .pill-scroll  { overflow-x:auto; flex-wrap:nowrap !important; padding-bottom:6px; }
          .pill-scroll::-webkit-scrollbar { display:none; }
        }

        @media (max-width: 420px) {
          .cta-btns { flex-direction:column !important; }
          .cta-btns button { width:100% !important; }
          .trust-pills { flex-direction:column !important; }
          .trust-pills span { text-align:center; }
          .banner-inner { flex-direction:column !important; gap:8px !important; text-align:center; }
        }
      `}</style>

      {/* paddingTop: navbar(64) + promo banner(44) = 108 */}
      <div style={{ minHeight:'100vh', background:'#06080F', color:'#fff', paddingTop:108 }}>

        {/* ── Ticker ── */}
        <div style={{ overflow:'hidden', borderTop:'1px solid rgba(255,255,255,0.05)', borderBottom:'1px solid rgba(255,255,255,0.05)', padding:'9px 0', marginBottom:'clamp(32px,5vw,64px)' }}>
          <div style={{ display:'flex', animation:'ticker 30s linear infinite', width:'max-content' }}>
            {[...STACK_BADGES,...STACK_BADGES].map((b,i) => (
              <span key={i} style={{ padding:'0 24px', fontSize:11, color:'rgba(255,255,255,0.18)', fontFamily:"'Space Mono',monospace", whiteSpace:'nowrap' }}>
                {b} <span style={{ color:'rgba(255,255,255,0.07)' }}>·</span>
              </span>
            ))}
          </div>
        </div>

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 clamp(16px,5%,5%)' }}>

          {/* ── Hero split ── */}
          <div className="hero-grid">

            <div>
              {/* Launch discount badge */}
              <div style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'5px 14px', borderRadius:6,
                background:'linear-gradient(90deg,rgba(251,191,36,0.12),rgba(245,158,11,0.08))',
                border:'1px solid rgba(251,191,36,0.35)',
                marginBottom:14,
                animation:'badgePop 0.5s ease 0.3s both',
              }}>
                <span style={{ fontSize:14 }}>🏷️</span>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'#fbbf24', letterSpacing:1.2, textTransform:'uppercase', fontWeight:900 }}>
                  50% OFF — New Agency Launch
                </span>
              </div>

              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', borderRadius:6, background:'rgba(34,197,94,0.07)', border:'1px solid rgba(34,197,94,0.18)', marginBottom:22, marginLeft:8 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#22C55E', display:'inline-block', animation:'pulse 2s infinite' }} />
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'#22C55E', letterSpacing:1.5, textTransform:'uppercase' }}>Live Pricing</span>
              </div>

              <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(34px,5vw,64px)', fontWeight:900, lineHeight:1.02, letterSpacing:-2.5, color:'#fff', margin:'0 0 18px' }}>
                Services &<br />
                <span style={{ color:'transparent', WebkitTextStroke:'1.5px rgba(255,255,255,0.25)' }}>Transparent</span><br />
                <span style={{ color:'#22C55E' }}>Pricing.</span>
              </h1>
              <p style={{ fontSize:15, color:'rgba(255,255,255,0.37)', lineHeight:1.8, maxWidth:420, margin:'0 0 32px' }}>
                No discovery fees. No hidden costs. Pick a plan, add to cart, and we kick off within 24 hours.<br />
                <span style={{ color:'#fbbf24', fontWeight:700 }}>🎉 Launch special: All plans are 50% off — limited time.</span>
              </p>
              <div className="stat-pills">
                {[['120+','Projects'],['98%','Retention'],['24hr','Kickoff'],['50%','OFF NOW']].map(([v,l],i) => (
                  <div key={i} style={{
                    padding:'10px 16px',
                    background: i===3 ? 'rgba(251,191,36,0.08)' : 'rgba(255,255,255,0.035)',
                    border: i===3 ? '1px solid rgba(251,191,36,0.3)' : '1px solid rgba(255,255,255,0.07)',
                    borderRadius:10
                  }}>
                    <div style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:900, color: i===3 ? '#fbbf24' : '#fff', letterSpacing:-0.5 }}>{v}</div>
                    <div style={{ fontSize:10, color: i===3 ? 'rgba(251,191,36,0.55)' : 'rgba(255,255,255,0.28)', marginTop:2, fontFamily:"'Space Mono',monospace" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live cart summary */}
            <div className="cart-sticky" style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, overflow:'hidden' }}>
              {/* Discount strip on cart */}
              <div style={{ background:'linear-gradient(90deg,#92400e,#d97706,#92400e)', padding:'7px 16px', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                <span style={{ fontSize:12 }}>🏷️</span>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#000', letterSpacing:1.5, fontWeight:900 }}>50% OFF APPLIED — {DISCOUNT_BADGE}</span>
              </div>
              <div style={{ padding:'16px 22px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:14, color:'#fff' }}>🛒 Your Cart</span>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'rgba(255,255,255,0.22)', letterSpacing:1 }}>{cart.length} ITEM{cart.length!==1?'S':''}</span>
              </div>
              <div style={{ padding:'16px 22px' }}>
                {cart.length === 0 ? (
                  <div style={{ textAlign:'center', padding:'24px 0', color:'rgba(255,255,255,0.2)', fontSize:13, lineHeight:2 }}>
                    <div style={{ fontSize:28, marginBottom:8, opacity:0.4 }}>🛒</div>
                    Cart is empty.<br />Pick a plan below.
                    <div style={{ marginTop:12, padding:'8px 12px', background:'rgba(251,191,36,0.07)', border:'1px solid rgba(251,191,36,0.2)', borderRadius:8, fontSize:11, color:'#fbbf24' }}>
                      🏷️ 50% discount auto-applied
                    </div>
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
                          <div style={{ textAlign:'right' }}>
                            {item.originalPrice && (
                              <div className="old-price" style={{ fontSize:10, display:'block', marginBottom:2 }}>
                                ${item.originalPrice?.toLocaleString()}
                              </div>
                            )}
                            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:900, color:'#22C55E' }}>${item.price?.toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                      {cart.length > 4 && <div style={{ fontSize:11, color:'rgba(255,255,255,0.22)', textAlign:'center' }}>+{cart.length-4} more</div>}
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', paddingTop:12, borderTop:'1px solid rgba(255,255,255,0.07)', marginBottom:8 }}>
                      <span style={{ fontSize:12, color:'rgba(255,255,255,0.35)' }}>Total</span>
                      <span style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:900, color:'#fff' }}>${cartTotal.toLocaleString()}</span>
                    </div>
                    <div style={{ padding:'6px 10px', background:'rgba(251,191,36,0.07)', border:'1px solid rgba(251,191,36,0.2)', borderRadius:8, marginBottom:14, display:'flex', alignItems:'center', gap:6 }}>
                      <span style={{ fontSize:11 }}>🏷️</span>
                      <span style={{ fontSize:11, color:'#fbbf24', fontFamily:"'Space Mono',monospace" }}>50% LAUNCH DISCOUNT SAVED!</span>
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
          <div style={{ marginBottom:'clamp(48px,7vw,88px)' }}>
            <div className="browse-hdr">
              <div>
                <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:900, color:'#fff', letterSpacing:-0.5, margin:'0 0 4px' }}>Browse Services</h2>
                <div style={{ fontSize:12, color:'#fbbf24', fontFamily:"'Space Mono',monospace", fontWeight:700 }}>
                  🏷️ All plans 50% off — Launch discount auto-applied
                </div>
              </div>
              <div className="billing-bar">
                {[['all','All'],['one-time','One-time'],['monthly','Monthly']].map(([val,label]) => (
                  <button key={val} onClick={() => setBilling(val)}
                    style={{ padding:'6px 14px', borderRadius:7, border:'none', background: billing===val ? 'rgba(255,255,255,0.1)' : 'transparent', color: billing===val ? '#fff' : 'rgba(255,255,255,0.3)', fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:12, cursor:'pointer', transition:'all 0.15s' }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Service pills */}
            <div className="pill-scroll">
              {services.map(s => (
                <button key={s._id} className="srv-pill"
                  onClick={() => setSelected(s._id)}
                  style={{ display:'flex', alignItems:'center', gap:9, padding:'10px 18px', borderRadius:12, border: selected===s._id ? `1px solid ${s.color}55` : '1px solid rgba(255,255,255,0.07)', background: selected===s._id ? `${s.color}10` : 'rgba(255,255,255,0.025)', cursor:'pointer', transition:'all 0.17s', opacity: selected===s._id ? 1 : 0.7 }}>
                  <span style={{ fontSize:17 }}>{s.icon}</span>
                  <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:13, color: selected===s._id ? '#fff' : 'rgba(255,255,255,0.6)' }}>{s.title}</span>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color: selected===s._id ? '#fbbf24' : 'rgba(255,255,255,0.2)', textDecoration:'line-through', opacity:0.6 }}>
                    ${Math.min(...s.plans.map(p=>p.price)).toLocaleString()}
                  </span>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'#fbbf24', fontWeight:900 }}>
                    from ${Math.min(...s.plans.map(p=>discountedPrice(p.price))).toLocaleString()}
                  </span>
                </button>
              ))}
            </div>

            {/* Active service */}
            {activeService && (
              <div key={selected} style={{ animation:'slideUp 0.22s ease' }}>
                <div className="svc-hdr" style={{ padding:'22px 26px', background:`linear-gradient(120deg,${activeService.color}08,rgba(255,255,255,0.02))`, border:`1px solid ${activeService.color}20`, borderRadius:18, marginBottom:22 }}>
                  <div style={{ width:54, height:54, borderRadius:15, background:`${activeService.color}14`, border:`1px solid ${activeService.color}28`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, flexShrink:0 }}>{activeService.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', marginBottom:5 }}>
                      <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:900, color:'#fff', letterSpacing:-0.4, margin:0 }}>{activeService.title}</h2>
                      <span style={{ padding:'2px 9px', borderRadius:6, background:`${activeService.color}12`, color:activeService.color, fontSize:9, fontFamily:"'Space Mono',monospace", letterSpacing:0.5 }}>
                        {activeService.plans?.length} plans
                      </span>
                      <span style={{ padding:'2px 9px', borderRadius:6, background:'rgba(251,191,36,0.12)', color:'#fbbf24', fontSize:9, fontFamily:"'Space Mono',monospace", letterSpacing:0.5, fontWeight:900, border:'1px solid rgba(251,191,36,0.25)' }}>
                        🏷️ 50% OFF
                      </span>
                    </div>
                    <p style={{ fontSize:13, color:'rgba(255,255,255,0.4)', margin:'0 0 12px', lineHeight:1.6 }}>{activeService.description}</p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom: activeService.subServices ? 12 : 0 }}>
                      {(activeService.features||[]).map((f,i) => (
                        <span key={i} style={{ padding:'3px 9px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:6, fontSize:10, color:'rgba(255,255,255,0.45)', fontFamily:"'Space Mono',monospace" }}>{f}</span>
                      ))}
                    </div>
                    {activeService.subServices && (
                      <div style={{ marginTop:10, paddingTop:10, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize:9, fontFamily:"'Space Mono',monospace", color:'rgba(255,255,255,0.2)', letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 }}>Includes</div>
                        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                          {activeService.subServices.map((s,i) => (
                            <span key={i} style={{ padding:'3px 9px', background:`${activeService.color}08`, border:`1px solid ${activeService.color}20`, borderRadius:6, fontSize:11, color:`${activeService.color}cc` }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
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
                    const salePrice = discountedPrice(plan.price);

                    return (
                      <div key={plan.name} className="plan-card"
                        style={{ position:'relative', borderRadius:20, background: isPopular ? `linear-gradient(155deg,${activeService.color}11,rgba(255,255,255,0.03))` : 'rgba(255,255,255,0.03)', border:`1px solid ${isPopular ? activeService.color+'50' : 'rgba(255,255,255,0.08)'}`, padding:'24px 22px', transition:'all 0.22s', animation: animating ? 'popIn 0.45s ease' : 'none' }}>

                        {isPopular && <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${activeService.color},transparent)`, borderRadius:'20px 20px 0 0' }} />}

                        {/* Discount ribbon */}
                        <div style={{
                          position:'absolute', top:0, right:0,
                          background:'linear-gradient(135deg,#d97706,#fbbf24)',
                          color:'#000', fontSize:9, fontWeight:900,
                          padding:'4px 10px 4px 14px',
                          borderRadius:'0 18px 0 12px',
                          fontFamily:"'Space Mono',monospace",
                          letterSpacing:0.5,
                          zIndex:2,
                        }}>
                          50% OFF
                        </div>

                        {isPopular && (
                          <span style={{ position:'absolute', top:14, left:14, background:activeService.color, color:'#000', fontSize:8, fontWeight:900, padding:'3px 8px', borderRadius:5, fontFamily:"'Space Mono',monospace", letterSpacing:1 }}>★ TOP PICK</span>
                        )}

                        <div style={{ marginBottom:18, marginTop:isPopular ? 16 : 0 }}>
                          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:17, fontWeight:900, color:'#fff', marginBottom:6 }}>{plan.name}</div>

                          <div style={{ display:'flex', alignItems:'baseline', gap:8, flexWrap:'wrap', marginBottom:4 }}>
                            <span className="old-price" style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:700, letterSpacing:-0.5 }}>
                              ${plan.price.toLocaleString()}
                            </span>
                            <span style={{ fontFamily:"'Sora',sans-serif", fontSize:32, fontWeight:900, color:'#fbbf24', letterSpacing:-1.5 }}>
                              ${salePrice.toLocaleString()}
                            </span>
                            <span style={{ fontSize:12, color:'rgba(255,255,255,0.28)', marginLeft:2 }}>
                              {plan.billing==='monthly' ? '/mo' : plan.billing==='yearly' ? '/yr' : ' once'}
                            </span>
                          </div>

                          <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 9px', background:'rgba(251,191,36,0.08)', border:'1px solid rgba(251,191,36,0.2)', borderRadius:6, marginBottom:4 }}>
                            <span style={{ fontSize:10, color:'#fbbf24', fontFamily:"'Space Mono',monospace", fontWeight:900 }}>
                              You save ${(plan.price - salePrice).toLocaleString()}
                            </span>
                          </div>

                          {plan.bdt && (
                            <div style={{ marginTop:4, fontSize:12, color:`${activeService.color}90`, fontFamily:"'Space Mono',monospace", fontWeight:700 }}>
                              ≈ {plan.bdt}
                            </div>
                          )}
                          {plan.billing==='monthly' && (
                            <div style={{ marginTop:3, fontSize:10, color:'rgba(255,255,255,0.2)', fontFamily:"'Space Mono',monospace" }}>
                              billed monthly · ${(salePrice*12).toLocaleString()}/yr
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
                          {inCart ? '✓ In Cart' : isAuthenticated ? '🏷️ Add to Cart →' : '🏷️ Get Started →'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── Compare table ── */}
          <div style={{ marginBottom:'clamp(48px,7vw,88px)' }}>
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
          <div style={{ marginBottom:'clamp(48px,7vw,88px)' }}>
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
          <div style={{ maxWidth:720, margin:`0 auto clamp(48px,7vw,88px)` }}>
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
          <div className="cta-section" style={{ background:'linear-gradient(135deg,rgba(34,197,94,0.07),rgba(59,130,246,0.05),rgba(139,92,246,0.06))', border:'1px solid rgba(255,255,255,0.08)', borderRadius:26, textAlign:'center', marginBottom:100, position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:560, height:300, borderRadius:'50%', background:'radial-gradient(ellipse,rgba(34,197,94,0.05) 0%,transparent 70%)', pointerEvents:'none' }} />

            <div style={{
              position:'relative',
              margin:'0 0 28px',
              padding:'14px 24px',
              background:'linear-gradient(90deg,rgba(251,191,36,0.08),rgba(245,158,11,0.05),rgba(251,191,36,0.08))',
              border:'1px solid rgba(251,191,36,0.2)',
              borderRadius:16,
              display:'inline-flex', alignItems:'center', gap:12, flexWrap:'wrap', justifyContent:'center',
            }}>
              <span style={{ fontSize:20 }}>🎉</span>
              <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:900, fontSize:16, color:'#fbbf24' }}>New Agency Launch — 50% OFF All Plans</span>
              <span style={{ padding:'3px 11px', background:'rgba(251,191,36,0.15)', border:'1px solid rgba(251,191,36,0.3)', borderRadius:6, fontFamily:"'Space Mono',monospace", fontSize:11, color:'#fbbf24', fontWeight:900, letterSpacing:1 }}>
                {DISCOUNT_BADGE}
              </span>
              <span style={{ fontSize:12, color:'rgba(251,191,36,0.5)', fontFamily:"'Space Mono',monospace" }}>Auto-applied · Limited time</span>
            </div>

            <div style={{ position:'relative' }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.2)', letterSpacing:2, textTransform:'uppercase', display:'block', marginBottom:16 }}>Get Started Today</span>
              <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(26px,4vw,46px)', fontWeight:900, color:'#fff', letterSpacing:-1.5, margin:'0 0 16px', lineHeight:1.05 }}>
                Stop Planning.<br />
                <span style={{ color:'#22C55E' }}>Start Building.</span>
              </h2>
              <p style={{ color:'rgba(255,255,255,0.35)', fontSize:15, maxWidth:420, margin:'0 auto 34px', lineHeight:1.8 }}>
                Every plan includes a free kick-off call, a fixed-scope contract, and an NDA. No surprises. Ever.<br />
                <span style={{ color:'#fbbf24', fontWeight:700 }}>🏷️ All plans are 50% off for our launch — don't miss it.</span>
              </p>
              <div className="cta-btns" style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:22 }}>
                <button className="cta-btn" onClick={() => navigate('/contact')}
                  style={{ padding:'14px 34px', background:'#fff', color:'#000', border:'none', borderRadius:12, fontFamily:"'Sora',sans-serif", fontWeight:900, fontSize:15, letterSpacing:-0.3, cursor:'pointer', transition:'all 0.17s' }}>
                  Book a Free Call →
                </button>
                <button className="cta-btn" onClick={() => navigate('/portfolio')}
                  style={{ padding:'14px 26px', background:'rgba(255,255,255,0.05)', color:'rgba(255,255,255,0.6)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:15, cursor:'pointer', transition:'all 0.17s' }}>
                  See Our Work
                </button>
              </div>
              <div className="trust-pills" style={{ display:'flex', gap:24, justifyContent:'center', flexWrap:'wrap' }}>
                {['✓ No lock-in contracts','✓ NDA included by default','✓ Fixed-price quotes','🏷️ 50% OFF Launch Deal'].map((t,i) => (
                  <span key={i} style={{ fontSize:11, color: i===3 ? '#fbbf24' : 'rgba(255,255,255,0.2)', fontFamily:"'Space Mono',monospace", fontWeight: i===3 ? 900 : 400 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}