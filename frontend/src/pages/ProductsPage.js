import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

// Real product links - Replace demo URLs with actual project showcases

const PRODUCTS = [
  { id:'p1', name:'Custom Web Development', tag:'Web Development', desc:'Full-stack web applications built with React, Node.js, and modern frameworks. From startup MVPs to enterprise platforms.', features:['Responsive design','API development','Database optimization','Performance tuning','Deployment & maintenance'], price:2500, billing:'project', color:'#22C55E', demoUrl:'https://axentralab.com/portfolio' },
  { id:'p2', name:'Cybersecurity Audit', tag:'Security', desc:'Comprehensive penetration testing, vulnerability assessment, and security hardening for your digital infrastructure.', features:['Network penetration testing','Web app security audit','Code review & analysis','Threat modeling','Risk assessment report'], price:3500, billing:'project', color:'#3B82F6', demoUrl:'https://axentralab.com/services' },
  { id:'p3', name:'AI Integration & Automation', tag:'AI Services', desc:'Intelligent automation solutions using GPT-4, machine learning, and custom AI models for business process optimization.', features:['Custom AI model training','Process automation','Natural language processing','Predictive analytics','Integration with existing systems'], price:4000, billing:'project', color:'#EF4444', demoUrl:'https://axentralab.com/portfolio' },
  { id:'p4', name:'Cloud Infrastructure Setup', tag:'Cloud Services', desc:'Complete cloud migration, infrastructure automation, and DevOps pipeline setup for scalable applications.', features:['AWS/Azure/GCP setup','CI/CD pipeline setup','Container orchestration','Auto-scaling configuration','Cost optimization'], price:3000, billing:'project', color:'#A855F7', demoUrl:'https://axentralab.com/services' },
  { id:'p5', name:'SaaS Application Development', tag:'SaaS Development', desc:'End-to-end SaaS platform development with multi-tenant architecture, billing integration, and analytics.', features:['Multi-tenant architecture','Payment processing','Analytics dashboard','User management','API documentation'], price:5000, billing:'project', color:'#F97316', demoUrl:'https://axentralab.com/portfolio' },
  { id:'p6', name:'Mobile App Development', tag:'Mobile Apps', desc:'Native and cross-platform mobile applications for iOS and Android with seamless backend integration.', features:['iOS & Android development','Push notifications','Offline functionality','App store deployment','Post-launch support'], price:4500, billing:'project', color:'#06B6D4', demoUrl:'https://axentralab.com/portfolio' },
  { id:'p7', name:'E-commerce Platform', tag:'E-commerce', desc:'Complete e-commerce solutions with inventory management, payment processing, and marketing automation.', features:['Product management system','Inventory tracking','Payment gateway integration','Marketing automation','Analytics & reporting'], price:3800, billing:'project', color:'#EC4899', demoUrl:'https://axentralab.com/portfolio' },
  { id:'p8', name:'Business Intelligence & Analytics', tag:'Analytics', desc:'Custom BI solutions with real-time dashboards, data warehousing, and predictive analytics for data-driven decisions.', features:['Data warehouse setup','Real-time dashboards','Custom reporting','Data visualization','Predictive models'], price:3200, billing:'project', color:'#14B8A6', demoUrl:'https://axentralab.com/services' },
  { id:'p9', name:'AI Chatbot Development', tag:'AI Services', desc:'Intelligent conversational AI chatbots for customer support, lead generation, and business automation.', features:['Natural language understanding','Multi-language support','Integration with CRM','Sentiment analysis','Analytics dashboard'], price:2800, billing:'project', color:'#8B5CF6', demoUrl:'https://axentralab.com/portfolio' },
  { id:'p10', name:'API Development & Design', tag:'Backend Development', desc:'RESTful and GraphQL API development with solid architecture, documentation, and security best practices.', features:['API design consultation','Rate limiting & security','API documentation','Testing & QA','Version management'], price:2200, billing:'project', color:'#F59E0B', demoUrl:'https://axentralab.com/services' },
  { id:'p11', name:'SEO & Performance Optimization', tag:'Digital Marketing', desc:'Technical SEO, site optimization, and performance enhancement to boost organic visibility and user experience.', features:['Technical SEO audit','Page speed optimization','Core Web Vitals improvement','Schema markup setup','Competitor analysis'], price:1500, billing:'project', color:'#22D3EE', demoUrl:'https://axentralab.com/portfolio' },
  { id:'p12', name:'24/7 Technical Support', tag:'Support & Maintenance', desc:'Dedicated technical support team for ongoing maintenance, bug fixes, and feature development of your applications.', features:['Priority issue response','Regular updates & patches','Performance monitoring','Security patches','Feature enhancement'], price:1500, billing:'monthly', color:'#FB7185', demoUrl:'https://axentralab.com/services' },
];

const ENTERPRISE_FEATURES = [
  { icon:'👥', title:'Dedicated Team', desc:'Get a dedicated project team that becomes an extension of your organization for the duration of the engagement.' },
  { icon:'🔒', title:'Security First', desc:'All projects include security audits, penetration testing, and compliance checks built into the development process.' },
  { icon:'📊', title:'Custom Analytics', desc:'Real-time dashboards and analytics tailored to your business metrics and KPIs.' },
  { icon:'⚡', title:'Performance Guaranteed', desc:'SLA-backed uptime guarantees and performance optimization as part of every engagement.' },
  { icon:'🚀', title:'Rapid Deployment', desc:'Agile methodology with sprints, demos, and continuous feedback to accelerate time to market.' },
  { icon:'📞', title:'24/7 Support', desc:'Dedicated support team available round-the-clock to ensure your systems run smoothly post-launch.' },
];

const TESTIMONIALS = [
  { name:'Md. Karim', role:'CTO, TechStart Bangladesh', avatar:'MK', color:'#22C55E', quote:'Axentralab delivered our MVP in 6 weeks. The team understood our vision immediately and built a scalable platform that handles 50K+ daily users without breaking a sweat.' },
  { name:'Sarah Johnson', role:'Founder, Digital Solutions Inc', avatar:'SJ', color:'#3B82F6', quote:'The security audit they conducted uncovered critical vulnerabilities we would have missed. Their recommendations were actionable and their team helped us implement them properly.' },
  { name:'Raj Patel', role:'Operations Director, GlobalTech', avatar:'RP', color:'#A855F7', quote:'Their AI automation solution cut our manual processes by 70%. What used to take our team 40 hours per week now runs in the background automatically.' },
  { name:'Emma Wilson', role:'CEO, E-commerce Pro', avatar:'EW', color:'#F97316', quote:'Building our SaaS platform with Axentralab was the best decision we made. They handled everything from architecture to DevOps, and the platform scales beautifully.' },
  { name:'Arif Ahmed', role:'VP Engineering, StartupHub', avatar:'AA', color:'#8B5CF6', quote:'Outstanding technical team. They completed our cloud migration 2 weeks ahead of schedule and ensured zero downtime during the transition. Highly recommend.' },
  { name:'Lisa Chen', role:'Marketing Director, Growth Innovations', avatar:'LC', color:'#22D3EE', quote:'The SEO optimization work Axentralab did increased our organic traffic by 250% in 4 months. Their technical expertise and data-driven approach is unmatched.' },
];

const FAQS = [
  { q:'How long does a typical project take?', a:'It depends on scope and complexity. Most projects range from 4-16 weeks. We provide detailed timelines during the discovery phase after understanding your requirements.' },
  { q:'Do you offer retainer-based support?', a:'Yes, absolutely. After project completion, we offer flexible retainer packages for ongoing support, maintenance, and new feature development.' },
  { q:'What is your development process?', a:'We use Agile methodology with 2-week sprints, weekly demos, and regular stakeholder reviews. We prioritize communication and transparency throughout the project.' },
  { q:'Do you work with startups and enterprises?', a:'Yes, we work with everyone from early-stage startups to Fortune 500 companies. We scale our processes to match your organization and budget.' },
  { q:'What technologies do you specialize in?', a:'We specialize in modern web stack (React, Node.js, Python), cloud platforms (AWS, Azure, GCP), and emerging technologies like AI/ML and blockchain.' },
  { q:'Can you help migrate legacy systems?', a:'Definitely. We have extensive experience migrating legacy systems to modern architectures with zero or minimal downtime. Includes data migration and integration.' },
];

const STATS = [
  { value:'150+', label:'Projects Delivered', color:'#22C55E' },
  { value:'98%', label:'Client Satisfaction', color:'#3B82F6' },
  { value:'50+', label:'Team Members', color:'#A855F7' },
  { value:'8 yrs', label:'Industry Experience', color:'#F97316' },
];

const CATEGORIES = ['All', 'Web Development', 'Security', 'AI Services', 'Support'];

const getCat = (tag) => {
  if (['Web Development','Web Development','E-commerce','Mobile Apps','SaaS Development'].includes(tag)) return 'Web Development';
  if (['Security','Cybersecurity'].includes(tag)) return 'Security';
  if (['AI Services','AI Integration & Automation','AI Services','AI Chatbot Development'].includes(tag)) return 'AI Services';
  if (['Support & Maintenance'].includes(tag)) return 'Support';
  return 'Web Development';
};

export default function ProductsPage() {
  const { addToCart, cart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [activeCat, setActiveCat] = useState('All');

  const isInCart = (id) => cart.some(i => i.serviceId === id);

  const handleBuy = (p) => {
    if (!isAuthenticated) { navigate('/register'); return; }
    addToCart(
      { _id: p.id, title: p.name },
      { name: 'Monthly', price: p.price, billing: p.billing }
    );
    navigate('/cart');
  };

  const filtered = activeCat === 'All' ? PRODUCTS : PRODUCTS.filter(p => getCat(p.tag) === activeCat);

  return (
    <>
      <div style={{ padding:'108px 5% 0', minHeight:'100vh' }}>
        <style>{`
          @media (max-width: 640px) {
            .cat-bar { flex-wrap: wrap !important; gap: 8px !important; }
            .cat-bar button { flex: 1 1 calc(50% - 8px) !important; }
            .prod-grid { grid-template-columns: 1fr !important; }
            .ent-inner { padding: 36px 22px !important; }
            .cta-inner  { padding: 40px 24px !important; }
            .step-grid  { grid-template-columns: 1fr !important; border-radius: 16px !important; }
            .step-grid > div { border-radius: 12px !important; border-left: 1px solid rgba(255,255,255,0.06) !important; margin-bottom: 1px; }
          }
          @media (max-width: 900px) {
            .ent-flex { flex-direction: column !important; }
          }
        `}</style>

        {/* ── Hero ── */}
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #3B82F640', background:'#3B82F612', color:'#3B82F6', fontSize:11, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>SaaS Products</span>
          <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px,5vw,58px)', fontWeight:900, color:'#fff', marginTop:16, letterSpacing:-1.5 }}>
            Security Tools Built by<br /><span style={{ color:'#22C55E' }}>Axentralab</span>
          </h1>
          <p style={{ color:'rgba(255,255,255,0.45)', fontSize:15, maxWidth:440, margin:'14px auto 0' }}>
            Plug-and-play security, automation, and growth products — start in minutes.
          </p>
        </div>

        {/* ── Stats Bar ── */}
        <div style={{ maxWidth:1100, margin:'0 auto 56px', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:1, background:'rgba(255,255,255,0.06)', borderRadius:16, overflow:'hidden', border:'1px solid rgba(255,255,255,0.07)' }}>
          {STATS.map((s,i) => (
            <div key={i} style={{ padding:'28px 24px', background:'rgba(10,10,15,0.9)', textAlign:'center' }}>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:32, fontWeight:900, color:s.color, letterSpacing:-1 }}>{s.value}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', marginTop:4, fontFamily:"'Space Mono',monospace", letterSpacing:0.5 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Category Filter ── */}
        <div className="cat-bar" style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:36, flexWrap:'wrap' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              style={{ padding:'8px 20px', borderRadius:10, border: activeCat===cat ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.08)', background: activeCat===cat ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.03)', color: activeCat===cat ? '#22C55E' : 'rgba(255,255,255,0.45)', fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:13, cursor:'pointer', transition:'all 0.18s' }}>
              {cat}
              <span style={{ marginLeft:7, padding:'1px 7px', borderRadius:999, background: activeCat===cat ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)', fontSize:10, color: activeCat===cat ? '#22C55E' : 'rgba(255,255,255,0.3)', fontFamily:"'Space Mono',monospace" }}>
                {cat === 'All' ? PRODUCTS.length : PRODUCTS.filter(p => getCat(p.tag) === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* ── Product Cards ── */}
        <div className="prod-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:24, maxWidth:1100, margin:'0 auto' }}>
          {filtered.map((p) => (
            <div key={p.id}
              style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, overflow:'hidden', transition:'all 0.25s' }}
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
                  <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline"
                    style={{ padding:'12px 16px', fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Compare Table ── */}
        <div style={{ maxWidth:1100, margin:'72px auto 0' }}>
          <div style={{ textAlign:'center', marginBottom:32 }}>
            <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #ffffff15', background:'#ffffff08', color:'rgba(255,255,255,0.5)', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase' }}>Service Offerings</span>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:28, fontWeight:800, color:'#fff', marginTop:12, letterSpacing:-0.5 }}>What We Offer</h2>
            <p style={{ fontSize:13, color:'rgba(255,255,255,0.3)', marginTop:8 }}>Core services and capabilities — scroll horizontally on mobile</p>
          </div>
          <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, overflow:'auto' }}>
            <div style={{ minWidth:780 }}>
              <div style={{ display:'grid', gridTemplateColumns:'2fr repeat(6,1fr)', padding:'14px 24px', background:'rgba(255,255,255,0.04)', borderBottom:'1px solid rgba(255,255,255,0.06)', gap:8 }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.3)', letterSpacing:1 }}>FEATURE</span>
                {PRODUCTS.slice(0,6).map(p => (
                  <span key={p.id} style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:p.color, letterSpacing:0.5, textAlign:'center' }}>{p.name.toUpperCase()}</span>
                ))}
              </div>
              {[
                ['Custom Development',     true,  true,  true,  true,  true,  true ],
                ['Frontend Development',   true,  true,  true,  true,  true,  false],
                ['Backend Services',       true,  true,  true,  true,  true,  false],
                ['Security Audit',         true,  true,  true,  true,  true,  true ],
                ['Testing & QA',           true,  true,  true,  true,  true,  true ],
                ['CI/CD Setup',            true,  true,  true,  true,  true,  true ],
                ['Cloud Infrastructure',   false, true,  true,  true,  false, false],
                ['24/7 Support',           false, false, false, true,  false, true ],
                ['Post-Launch Maintenance',false, true,  true,  false, true,  false],
                ['Performance Optimization',true, false, false, true,  false, true ],
                ['Scalability Consulting',  true, true,  false, false, true,  false],
              ].map(([label, ...vals], i, arr) => (
                <div key={i} style={{ display:'grid', gridTemplateColumns:'2fr repeat(6,1fr)', padding:'12px 24px', borderBottom:i<arr.length-1?'1px solid rgba(255,255,255,0.04)':'none', background:i%2===0?'transparent':'rgba(255,255,255,0.01)', gap:8, alignItems:'center' }}>
                  <span style={{ fontSize:13, color:'rgba(255,255,255,0.55)' }}>{label}</span>
                  {vals.map((v,j) => (
                    <span key={j} style={{ textAlign:'center', fontSize:15 }}>{v ? '✅' : '❌'}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Enterprise Section ── */}
        <div style={{ maxWidth:1100, margin:'80px auto 0' }}>
          <div className="ent-inner" style={{ background:'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(59,130,246,0.06) 100%)', border:'1px solid rgba(168,85,247,0.2)', borderRadius:24, padding:'56px 48px', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-60, right:-60, width:260, height:260, borderRadius:'50%', background:'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', bottom:-40, left:-40, width:180, height:180, borderRadius:'50%', background:'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', pointerEvents:'none' }} />
            <div className="ent-flex" style={{ display:'flex', flexWrap:'wrap', gap:40, alignItems:'flex-start', position:'relative' }}>
              <div style={{ flex:'1 1 340px' }}>
                <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #A855F740', background:'#A855F712', color:'#A855F7', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Custom Solutions</span>
                <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(24px,4vw,38px)', fontWeight:900, color:'#fff', margin:'16px 0 14px', letterSpacing:-1 }}>
                  Enterprise Projects<br />That Scale &<br /><span style={{ color:'#A855F7' }}>Perform</span>
                </h2>
                <p style={{ color:'rgba(255,255,255,0.5)', fontSize:14, lineHeight:1.8, maxWidth:380, marginBottom:28 }}>
                  Beyond standard packages — we build custom solutions tailored to your exact needs. Dedicated project teams, flexible timelines, and white-glove support throughout delivery.
                </p>
                <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                  <button className="btn-primary" style={{ padding:'13px 28px', background:'#A855F7', color:'#fff', fontSize:14, border:'none' }}>Schedule Consultation →</button>
                  <button className="btn-outline" style={{ padding:'13px 22px', fontSize:14 }}>View Case Studies</button>
                </div>
              </div>
              <div style={{ flex:'1 1 340px', display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:16 }}>
                {ENTERPRISE_FEATURES.map((f,i) => (
                  <div key={i} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'18px 16px' }}>
                    <div style={{ fontSize:24, marginBottom:10 }}>{f.icon}</div>
                    <div style={{ fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:700, color:'#fff', marginBottom:6 }}>{f.title}</div>
                    <div style={{ fontSize:12, color:'rgba(255,255,255,0.45)', lineHeight:1.6 }}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div style={{ maxWidth:1100, margin:'80px auto 0' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #ffffff15', background:'#ffffff08', color:'rgba(255,255,255,0.5)', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase' }}>Testimonials</span>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:28, fontWeight:800, color:'#fff', marginTop:12, letterSpacing:-0.5 }}>Trusted by Security-First Teams</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:20 }}>
            {TESTIMONIALS.map((t,i) => (
              <div key={i} style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, padding:28, transition:'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=`${t.color}30`; e.currentTarget.style.transform='translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform='none'; }}>
                <div style={{ fontSize:28, color:t.color, fontFamily:'Georgia,serif', lineHeight:1, marginBottom:14, opacity:0.7 }}>"</div>
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.65)', lineHeight:1.75, marginBottom:22 }}>{t.quote}</p>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:38, height:38, borderRadius:'50%', background:`${t.color}20`, border:`1px solid ${t.color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:12, color:t.color }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontFamily:"'Sora',sans-serif", fontSize:13, fontWeight:700, color:'#fff' }}>{t.name}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', marginTop:1 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── How It Works ── */}
        <div style={{ maxWidth:1100, margin:'80px auto 0' }}>
          <div style={{ textAlign:'center', marginBottom:44 }}>
            <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #22C55E40', background:'#22C55E10', color:'#22C55E', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Process</span>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:28, fontWeight:800, color:'#fff', marginTop:12, letterSpacing:-0.5 }}>Up & Running in 3 Steps</h2>
          </div>
          <div className="step-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:0 }}>
            {[
              { step:'01', icon:'🛒', title:'Pick Your Plan',      desc:'Choose one or more products and add them to your cart. Bundle for maximum coverage.' },
              { step:'02', icon:'⚙️', title:'Connect in Minutes',  desc:'Follow the guided setup wizard. Most integrations take under 5 minutes — no DevOps required.' },
              { step:'03', icon:'🛡️', title:'Stay Protected 24/7', desc:'Your dashboard goes live immediately. Get real-time alerts, weekly reports, and continuous scans.' },
            ].map((s,i) => (
              <div key={i} style={{ padding:'36px 32px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:i===0?'16px 0 0 16px':i===2?'0 16px 16px 0':'0', borderLeft:i>0?'none':undefined }}>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'rgba(255,255,255,0.2)', letterSpacing:2, marginBottom:16 }}>{s.step}</div>
                <div style={{ fontSize:32, marginBottom:14 }}>{s.icon}</div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:800, color:'#fff', marginBottom:10 }}>{s.title}</div>
                <div style={{ fontSize:14, color:'rgba(255,255,255,0.45)', lineHeight:1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={{ maxWidth:720, margin:'80px auto 0' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #ffffff15', background:'#ffffff08', color:'rgba(255,255,255,0.5)', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase' }}>FAQ</span>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:28, fontWeight:800, color:'#fff', marginTop:12, letterSpacing:-0.5 }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {FAQS.map((f,i) => (
              <div key={i} style={{ background:'rgba(255,255,255,0.025)', border:`1px solid ${openFaq===i ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.07)'}`, borderRadius:14, overflow:'hidden', transition:'border-color 0.2s' }}>
                <button onClick={() => setOpenFaq(openFaq===i ? null : i)}
                  style={{ width:'100%', padding:'18px 22px', background:'transparent', border:'none', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12 }}>
                  <span style={{ fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:700, color:'#fff', textAlign:'left' }}>{f.q}</span>
                  <span style={{ color:'rgba(255,255,255,0.4)', fontSize:18, flexShrink:0, transition:'transform 0.2s', transform: openFaq===i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {openFaq===i && (
                  <div style={{ padding:'0 22px 18px' }}>
                    <p style={{ fontSize:14, color:'rgba(255,255,255,0.5)', lineHeight:1.8, margin:0 }}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div style={{ maxWidth:1100, margin:'80px auto 0', paddingBottom:100 }}>
          <div className="cta-inner" style={{ background:'linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(59,130,246,0.08) 100%)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:24, padding:'64px 48px', textAlign:'center', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 65%)', pointerEvents:'none' }} />
            <div style={{ position:'relative' }}>
              <span style={{ display:'inline-block', padding:'3px 12px', borderRadius:999, border:'1px solid #22C55E40', background:'#22C55E10', color:'#22C55E', fontSize:10, fontFamily:"'Space Mono',monospace", letterSpacing:1, textTransform:'uppercase', fontWeight:600 }}>Get Protected Today</span>
              <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(26px,4vw,44px)', fontWeight:900, color:'#fff', margin:'20px auto 16px', letterSpacing:-1, maxWidth:600 }}>
                Your Next Security Incident<br />Could Be Your Last
              </h2>
              <p style={{ color:'rgba(255,255,255,0.45)', fontSize:15, maxWidth:480, margin:'0 auto 32px', lineHeight:1.7 }}>
                14-day free trial. No credit card required. Cancel anytime. Join 4,200+ teams already protected by Axentralab.
              </p>
              <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
                <button className="btn-primary" style={{ padding:'15px 36px', background:'#22C55E', color:'#000', fontSize:15, border:'none', fontWeight:700 }}>Start Free Trial →</button>
                <button className="btn-outline" style={{ padding:'15px 28px', fontSize:15 }}>Book a Demo</button>
              </div>
              <div style={{ marginTop:24, display:'flex', gap:28, justifyContent:'center', flexWrap:'wrap' }}>
                {['✓ No credit card','✓ 14-day free trial','✓ Cancel anytime'].map((t,i) => (
                  <span key={i} style={{ fontSize:12, color:'rgba(255,255,255,0.35)', fontFamily:"'Space Mono',monospace" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}