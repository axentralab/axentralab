import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Case Studies Data ──
const CASE_STUDIES = [
  {
    id: 'cs1',
    title: 'TechStart Bangladesh - SaaS Platform Launch',
    category: 'SaaS Development',
    client: 'TechStart Bangladesh',
    logo: '🚀',
    color: '#3B82F6',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
    overview: 'Developed a complete SaaS platform for tech talent recruitment and job matching in Bangladesh with multi-tenant architecture.',
    challenge: 'Client needed a scalable platform to connect tech startups with talented developers. Existing solutions were too expensive and lacked local market understanding.',
    solution: 'Built custom multi-tenant SaaS with React frontend, Node.js backend, and MongoDB database. Implemented real-time notifications, subscription billing, and automated matching algorithm.',
    results: [
      { metric: '500+', label: 'Active Users in First Month' },
      { metric: '50+', label: 'Matched Placements' },
      { metric: '99.8%', label: 'Platform Uptime' },
      { metric: '3x', label: 'Revenue Growth (vs Projection)' },
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'Socket.io'],
    timeline: '12 weeks',
    team: 'Full-stack team of 5 engineers',
    testimonial: 'Axentralab understood our vision perfectly and delivered beyond expectations. Their platform now powers our entire recruitment ecosystem.',
    testimonialAuthor: 'Md. Karim, CTO',
  },
  {
    id: 'cs2',
    title: 'Global Fintech - Mobile Banking App',
    category: 'Mobile Development',
    client: 'Global Fintech Solutions',
    logo: '💳',
    color: '#10B981',
    thumbnail: 'https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=800&h=500&fit=crop',
    overview: 'Engineered a secure mobile banking application with biometric authentication, instant transfers, and real-time transaction tracking.',
    challenge: 'Client required a highly secure mobile app compliant with financial regulations while maintaining excellent user experience. Security and performance were critical.',
    solution: 'Developed native iOS and Android apps with end-to-end encryption, biometric authentication, and offline-first architecture. Integrated with banking APIs and implemented comprehensive fraud detection.',
    results: [
      { metric: '100K+', label: 'Downloads in 3 Months' },
      { metric: '4.8★', label: 'App Store Rating' },
      { metric: '$2.5M', label: 'Transaction Volume (First Month)' },
      { metric: '15ms', label: 'Avg Transaction Speed' },
    ],
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Stripe Connect', 'Biometric Auth'],
    timeline: '16 weeks',
    team: 'Mobile team of 4 engineers + Security specialist',
    testimonial: 'The team delivered a world-class banking app that our customers trust implicitly. Security was never compromised.',
    testimonialAuthor: 'Sarah Johnson, CEO',
  },
  {
    id: 'cs3',
    title: 'E-Commerce Brand - Platform Migration',
    category: 'Platform Migration',
    client: 'Fashion Forward Store',
    logo: '👗',
    color: '#EC4899',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab655c476?w=800&h=500&fit=crop',
    overview: 'Migrated legacy e-commerce platform to modern Next.js architecture with 300% improvement in performance and new revenue features.',
    challenge: 'Existing Shopify setup was limited and expensive. Client needed a custom platform with unique features but zero downtime during migration.',
    solution: 'Built Next.js e-commerce platform with headless commerce architecture. Implemented gradual migration strategy, synched customer data in real-time, and added AI-powered recommendations.',
    results: [
      { metric: '300%', label: 'Performance Improvement' },
      { metric: '45%', label: 'Cost Reduction (vs Shopify)' },
      { metric: '2.8x', label: 'Conversion Rate Increase' },
      { metric: '0min', label: 'Migration Downtime' },
    ],
    technologies: ['Next.js', 'Stripe', 'Algolia Search', 'TensorFlow', 'Vercel'],
    timeline: '10 weeks',
    team: 'Full-stack team of 6 engineers',
    testimonial: 'Zero downtime migration with 45% cost savings. This was a game-changer for our business growth.',
    testimonialAuthor: 'Emma Wilson, Operations Director',
  },
  {
    id: 'cs4',
    title: 'Enterprise - Cloud Infrastructure Overhaul',
    category: 'Cloud & DevOps',
    client: 'Manufacturing Enterprise Inc',
    logo: '🏭',
    color: '#F59E0B',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
    overview: 'Redesigned entire cloud infrastructure, implementing CI/CD pipelines, auto-scaling, and monitoring for 40+ microservices.',
    challenge: 'Legacy on-premise infrastructure was limiting business growth. Needed seamless cloud migration with minimal business disruption.',
    solution: 'Architected multi-region AWS infrastructure with Kubernetes orchestration. Implemented GitOps workflows, comprehensive monitoring, and disaster recovery procedures.',
    results: [
      { metric: '60%', label: 'Infrastructure Cost Cut' },
      { metric: '10x', label: 'Scaling Capacity' },
      { metric: '99.99%', label: 'New Uptime SLA' },
      { metric: '80%', label: 'Deployment Time Reduction' },
    ],
    technologies: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Prometheus', 'ELK Stack'],
    timeline: '14 weeks',
    team: 'DevOps & Infrastructure team of 4',
    testimonial: 'The infrastructure transformation enabled our business to scale 10x. We now have the confidence to tackle new markets.',
    testimonialAuthor: 'Raj Patel, VP Engineering',
  },
  {
    id: 'cs5',
    title: 'AI Startup - Data Pipeline & ML Model',
    category: 'AI/ML Development',
    client: 'DataMind AI Labs',
    logo: '🧠',
    color: '#8B5CF6',
    thumbnail: 'https://images.unsplash.com/photo-1555949519-51cc1b4b6d08?w=800&h=500&fit=crop',
    overview: 'Built end-to-end data pipeline and trained production ML models for predictive analytics serving 500K+ data points daily.',
    challenge: 'Startup needed scalable ML infrastructure to train and serve models in production. Lacked in-house expertise to build data pipelines.',
    solution: 'Designed data ingestion pipeline using Apache Kafka, built ML workflows with TensorFlow, and deployed models via FastAPI with auto-scaling containers.',
    results: [
      { metric: '94%', label: 'Model Accuracy' },
      { metric: '50ms', label: 'Avg Prediction Latency' },
      { metric: '50K', label: 'Predictions Daily' },
      { metric: '99.5%', label: 'Availability' },
    ],
    technologies: ['Python', 'TensorFlow', 'Kafka', 'FastAPI', 'Docker', 'AWS SageMaker'],
    timeline: '12 weeks',
    team: 'ML Engineers + Data Scientists (3)',
    testimonial: 'They built the entire ML infrastructure from scratch. Now we have a world-class platform for continuous learning.',
    testimonialAuthor: 'Priya Nair, ML Lead',
  },
  {
    id: 'cs6',
    title: 'Agency - Website Redesign & SEO',
    category: 'Web Design & SEO',
    client: 'Creative Digital Agency',
    logo: '🎨',
    color: '#22D3EE',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
    overview: 'Complete website redesign with modern UX, technical SEO optimization, resulting in 250% organic traffic increase.',
    challenge: 'Outdated website was ranking poorly and not converting visitors. Needed modern design without losing search rankings.',
    solution: 'Redesigned with Next.js for optimal performance, implemented technical SEO best practices, improved Core Web Vitals, and optimized content structure.',
    results: [
      { metric: '250%', label: 'Organic Traffic Growth' },
      { metric: '#1', label: 'Ranking for 45+ Keywords' },
      { metric: '3.2s', label: 'Improved Load Time' },
      { metric: '5.2x', label: 'Lead Increase' },
    ],
    technologies: ['Next.js', 'React', 'Vercel', 'Planned.ai SEO Tools', 'Tailwind CSS'],
    timeline: '8 weeks',
    team: 'Design + Dev team of 3',
    testimonial: 'Not only is the site beautiful, but our SEO and conversions have skyrocketed. Worth every penny.',
    testimonialAuthor: 'Lisa Chen, Marketing Director',
  },
];

const STATS = [
  { value: '150+', label: 'Projects Completed' },
  { value: '50+', label: 'Team Members' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '8yrs', label: 'Industry Experience' },
];

export default function CaseStudiesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStudy, setSelectedStudy] = useState(null);

  const categories = ['All', ...new Set(CASE_STUDIES.map(c => c.category))];
  const filtered = selectedCategory === 'All' ? CASE_STUDIES : CASE_STUDIES.filter(c => c.category === selectedCategory);

  return (
    <>
      <div style={{ padding: '108px 5% 0', minHeight: '100vh', background: '#0A0A0F' }}>
        <style>{`
          @media (max-width: 640px) {
            .cat-buttons { flex-wrap: wrap !important; gap: 8px !important; }
            .cat-buttons button { flex: 1 1 calc(50% - 8px) !important; font-size: 12px !important; }
            .case-grid { grid-template-columns: 1fr !important; }
            .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .case-modal { padding: 24px !important; }
          }
        `}</style>

        {/* ── Hero ── */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, border: '1px solid #3B82F640', background: '#3B82F612', color: '#3B82F6', fontSize: 11, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Success Stories</span>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(28px,5vw,58px)', fontWeight: 900, color: '#fff', marginTop: 16, letterSpacing: -1.5 }}>
            Real Results from<br /><span style={{ color: '#3B82F6' }}>Real Clients</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, maxWidth: 440, margin: '14px auto 0' }}>
            See how we've helped startups and enterprises solve complex problems and achieve ambitious goals.
          </p>
        </div>

        {/* ── Stats Bar ── */}
        <div className="stats-grid" style={{ maxWidth: 1100, margin: '0 auto 56px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: '28px 24px', background: 'rgba(10,10,15,0.9)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 32, fontWeight: 900, color: '#3B82F6', letterSpacing: -1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Category Filter ── */}
        <div className="cat-buttons" style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 36, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              style={{ padding: '8px 20px', borderRadius: 10, border: selectedCategory === cat ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.08)', background: selectedCategory === cat ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.03)', color: selectedCategory === cat ? '#3B82F6' : 'rgba(255,255,255,0.45)', fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.18s' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* ── Case Study Cards ── */}
        <div className="case-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 24, maxWidth: 1100, margin: '0 auto' }}>
          {filtered.map((study) => (
            <div key={study.id}
              onClick={() => setSelectedStudy(study)}
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${study.color}35`; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${study.color}12`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              {/* Thumbnail */}
              <div style={{ height: 200, background: `linear-gradient(135deg, ${study.color}20, rgba(255,255,255,0.05))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>
                {study.logo}
              </div>
              <div style={{ padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 999, border: `1px solid ${study.color}30`, background: `${study.color}10`, color: study.color, fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>{study.category}</span>
                </div>
                <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 900, color: '#fff', margin: '12px 0 10px', letterSpacing: -0.6 }}>{study.title}</h2>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 18 }}>{study.overview}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                  {study.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, background: `${study.color}15`, color: study.color, fontFamily: "'Space Mono',monospace" }}>{tech}</span>
                  ))}
                  {study.technologies.length > 3 && <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', fontFamily: "'Space Mono',monospace" }}>+{study.technologies.length - 3}</span>}
                </div>
                <button style={{ width: '100%', padding: '10px', background: study.color, color: '#000', border: 'none', borderRadius: 8, fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.8'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  View Full Case Study →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Modal ── */}
        {selectedStudy && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }} onClick={() => setSelectedStudy(null)}>
            <div className="case-modal" style={{ background: 'linear-gradient(135deg, rgba(20,20,30,0.95), rgba(30,30,45,0.95))', border: `1px solid ${selectedStudy.color}30`, borderRadius: 24, maxWidth: 800, maxHeight: '90vh', overflow: 'auto', padding: 40, position: 'relative' }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedStudy(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, cursor: 'pointer' }}>×</button>

              <div style={{ fontSize: 56, marginBottom: 16 }}>{selectedStudy.logo}</div>
              <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 999, border: `1px solid ${selectedStudy.color}30`, background: `${selectedStudy.color}10`, color: selectedStudy.color, fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 16 }}>{selectedStudy.category}</div>

              <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 36, fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: -1 }}>{selectedStudy.title}</h1>
              <p style={{ color: selectedStudy.color, fontFamily: "'Sora',sans-serif", fontWeight: 600, marginBottom: 24 }}>{selectedStudy.client}</p>

              <div style={{ marginBottom: 32 }}>
                <h3 style={{ color: '#fff', fontFamily: "'Sora',sans-serif", fontWeight: 700, marginBottom: 8 }}>Challenge</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>{selectedStudy.challenge}</p>
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3 style={{ color: '#fff', fontFamily: "'Sora',sans-serif", fontWeight: 700, marginBottom: 8 }}>Solution</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>{selectedStudy.solution}</p>
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3 style={{ color: '#fff', fontFamily: "'Sora',sans-serif", fontWeight: 700, marginBottom: 16 }}>Results</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12 }}>
                  {selectedStudy.results.map((r, i) => (
                    <div key={i} style={{ background: `${selectedStudy.color}10`, border: `1px solid ${selectedStudy.color}30`, borderRadius: 12, padding: 16, textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 24, fontWeight: 900, color: selectedStudy.color }}>{r.metric}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3 style={{ color: '#fff', fontFamily: "'Sora',sans-serif", fontWeight: 700, marginBottom: 8 }}>Technologies</h3>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {selectedStudy.technologies.map((tech, i) => (
                    <span key={i} style={{ padding: '6px 12px', borderRadius: 8, background: `${selectedStudy.color}15`, color: selectedStudy.color, fontSize: 12, fontFamily: "'Space Mono',monospace" }}>{tech}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 20 }}>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontFamily: "'Space Mono',monospace", marginBottom: 4 }}>TIMELINE</div>
                    <div style={{ color: '#fff', fontFamily: "'Sora',sans-serif", fontWeight: 700 }}>{selectedStudy.timeline}</div>
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontFamily: "'Space Mono',monospace", marginBottom: 4 }}>TEAM SIZE</div>
                    <div style={{ color: '#fff', fontFamily: "'Sora',sans-serif", fontWeight: 700 }}>{selectedStudy.team}</div>
                  </div>
                </div>
              </div>

              <div style={{ background: `${selectedStudy.color}10`, border: `1px solid ${selectedStudy.color}30`, borderRadius: 16, padding: 24 }}>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.8, fontStyle: 'italic', marginBottom: 16 }}>{selectedStudy.testimonial}</p>
                <div style={{ color: selectedStudy.color, fontFamily: "'Sora',sans-serif", fontWeight: 700 }}>{selectedStudy.testimonialAuthor}</div>
              </div>
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div style={{ maxWidth: 720, margin: '80px auto 0', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 16 }}>Ready to Start Your Project?</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 28 }}>Let's discuss your challenges and build something amazing together.</p>
          <button onClick={() => navigate('/contact')} style={{ padding: '13px 32px', background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 10, fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
            Get Started →
          </button>
        </div>
      </div>
    </>
  );
}
