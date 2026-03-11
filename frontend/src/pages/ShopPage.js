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

export default function ShopPage() {
  const [services, setServices] = useState(FALLBACK);
  const [activeService, setActiveService] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/services').then(r => { if (r.data.data?.length) setServices(r.data.data); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const isInCart = (serviceId, planName) => cart.some(i => i.serviceId === serviceId && i.plan === planName);

  const handleBuy = (service, plan) => {
    if (!isAuthenticated) { navigate('/register'); return; }
    addToCart(service, plan);
    navigate('/cart');
  };

  return (
    <div style={{ padding: 'clamp(60px, 5%, 100px) clamp(4%, 5%, 6%) clamp(40px, 5%, 80px)', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5%, 60px)' }}>
        <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, border: '1px solid #22C55E40', background: '#22C55E12', color: '#22C55E', fontSize: 'clamp(9px, 1.5vw, 11px)', fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Services & Pricing</span>
        <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(28px, 4.5vw, 56px)', fontWeight: 900, color: '#fff', marginTop: 'clamp(12px, 2%, 16px)', letterSpacing: -1.5 }}>Choose Your Plan</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(14px, 2vw, 16px)', maxWidth: 480, margin: 'clamp(12px, 2%, 14px) auto 0' }}>Enterprise-grade tech services with transparent pricing. Add to cart and checkout in minutes.</p>
      </div>

      {services.map(service => (
        <div key={service._id} style={{ maxWidth: 1100, margin:'0 auto clamp(32px, 4%, 48px)' }}>
          {/* Service header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2%, 16px)', marginBottom: 'clamp(16px, 3%, 24px)', cursor: 'pointer', flexWrap:'wrap' }} onClick={() => setActiveService(activeService === service._id ? null : service._id)}>
            <div style={{ width: 'clamp(44px, 10vw, 52px)', height: 'clamp(44px, 10vw, 52px)', borderRadius: 14, background: `${service.color}15`, border: `1px solid ${service.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(20px, 5vw, 26px)', flexShrink: 0 }}>{service.icon}</div>
            <div style={{ flex: 1, minWidth:'200px' }}>
              <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: 800, color: '#fff', letterSpacing: -0.4, marginBottom: 4 }}>{service.title}</h2>
              <p style={{ fontSize: 'clamp(12px, 2vw, 14px)', color: 'rgba(255,255,255,0.5)' }}>{service.description}</p>
            </div>
            <div style={{ width: 'clamp(28px, 6vw, 32px)', height: 'clamp(28px, 6vw, 32px)', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(12px, 2.5vw, 16px)', color: 'rgba(255,255,255,0.5)', transition: 'transform 0.2s', transform: activeService === service._id ? 'rotate(180deg)' : 'none', flexShrink:0 }}>▼</div>
          </div>

          {/* Plans grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 'clamp(12px, 2%, 16px)' }}>
            {(service.plans || []).map((plan, pi) => {
              const inCart = isInCart(service._id, plan.name);
              const isPopular = pi === 1;
              return (
                <div key={plan.name} style={{ background: isPopular ? `${service.color}08` : 'rgba(255,255,255,0.025)', border: `1px solid ${isPopular ? service.color + '40' : 'rgba(255,255,255,0.08)'}`, borderRadius: 18, padding: 'clamp(16px, 3%, 24px)', position: 'relative', transition: 'all 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 36px ${service.color}15`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  {isPopular && (
                    <div style={{ position: 'absolute', top: -10, right: 20, background: service.color, color: '#000', fontSize: 'clamp(8px, 1.2vw, 10px)', fontWeight: 800, padding: '3px 10px', borderRadius: 999, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5 }}>POPULAR</div>
                  )}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(15px, 2.5vw, 17px)', fontWeight: 800, color: '#fff', marginBottom: 8 }}>{plan.name}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                      <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 900, color: service.color }}>${plan.price.toLocaleString()}</span>
                      <span style={{ fontSize: 'clamp(11px, 1.5vw, 13px)', color: 'rgba(255,255,255,0.4)' }}>/ {plan.billing === 'monthly' ? 'mo' : plan.billing === 'yearly' ? 'yr' : 'one-time'}</span>
                    </div>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px' }}>
                    {(plan.features || []).map((f, fi) => (
                      <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 'clamp(4px, 1%, 6px) 0', borderBottom: fi < plan.features.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                        <span style={{ color: service.color, fontSize: 'clamp(10px, 1.5vw, 12px)', flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: 'clamp(12px, 1.8vw, 13px)', color: 'rgba(255,255,255,0.65)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleBuy(service, plan)} style={{ width: '100%', padding: 'clamp(10px, 1.5%, 12px)', borderRadius: 10, background: inCart ? 'rgba(34,197,94,0.1)' : service.color, border: inCart ? `1px solid ${service.color}40` : 'none', color: inCart ? service.color : '#000', fontWeight: 700, fontSize: 'clamp(12px, 2vw, 14px)', transition: 'all 0.2s', fontFamily: "'Inter',sans-serif" }}>
                    {inCart ? '✓ Added to Cart' : isAuthenticated ? '🛒 Add to Cart' : 'Get Started →'}
                  </button>
                </div>
              );
            })}
          </div>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', marginTop: 'clamp(16px, 3%, 24px)' }} />
        </div>
      ))}
    </div>
  );
}
