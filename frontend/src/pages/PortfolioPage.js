import { useState } from 'react';
import { Link } from 'react-router-dom';

// ── Project Data ──────────────────────────────────────────────────────────────
// thumbnail: public/images/portfolio/ ফোল্ডারে রাখুন
const PROJECTS = [
  {
    id: 'p1',
    title: 'FinNova Dashboard',
    tag: 'SaaS / Fintech',
    category: 'Web App',
    color: '#22C55E',
    year: '2024',
    thumbnail: '/images/portfolio/finnova.jpg',
    desc: 'Real-time financial analytics dashboard with AI-powered anomaly detection and multi-currency support for a London-based fintech startup.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Chart.js'],
    results: ['3× faster reporting', '99.98% uptime', '40k MAU at launch'],
    liveUrl: 'https://finnova.io',
    featured: true,
  },
  {
    id: 'p2',
    title: 'SecureOps Platform',
    tag: 'Cybersecurity',
    category: 'Web App',
    color: '#EF4444',
    year: '2024',
    thumbnail: '/images/portfolio/secureops.jpg',
    desc: 'Enterprise security operations platform with automated threat hunting, incident response workflows, and SOC2-compliant audit trails.',
    stack: ['Next.js', 'Python', 'MongoDB', 'Docker', 'Redis'],
    results: ['18 CVEs patched pre-launch', 'SOC2 Type II certified', '200+ enterprise users'],
    liveUrl: 'https://secureops.io',
    featured: true,
  },
  {
    id: 'p3',
    title: 'NexaAI Automation',
    tag: 'AI / Automation',
    category: 'SaaS',
    color: '#8B5CF6',
    year: '2024',
    thumbnail: '/images/portfolio/nexaai.jpg',
    desc: 'No-code AI workflow automation platform that lets non-technical teams build GPT-4 powered business processes with drag-and-drop simplicity.',
    stack: ['React', 'Node.js', 'LangChain', 'MongoDB', 'Vercel'],
    results: ['200+ hr/mo saved per client', '6-week build to launch', '$2M ARR in year 1'],
    liveUrl: 'https://nexaai.co',
    featured: true,
  },
  {
    id: 'p4',
    title: 'CloudBridge Portal',
    tag: 'Cloud / DevOps',
    category: 'Web App',
    color: '#3B82F6',
    year: '2023',
    thumbnail: '/images/portfolio/cloudbridge.jpg',
    desc: 'Multi-cloud management portal for AWS, GCP, and Azure — unified cost monitoring, IAM governance, and one-click deployment pipelines.',
    stack: ['React', 'Terraform', 'AWS', 'Docker', 'Kubernetes'],
    results: ['35% infra cost reduction', 'Manages 400+ cloud resources', 'Zero-downtime deployments'],
    liveUrl: 'https://cloudbridge.io',
    featured: false,
  },
  {
    id: 'p5',
    title: 'BankCo Mobile App',
    tag: 'Fintech / Mobile',
    category: 'Mobile',
    color: '#F59E0B',
    year: '2023',
    thumbnail: '/images/portfolio/bankco.jpg',
    desc: 'Neobank mobile app with biometric auth, instant transfers, BNPL, and real-time spending insights. Built for a challenger bank in Southeast Asia.',
    stack: ['React Native', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    results: ['4.8★ App Store rating', '80k downloads in 3 months', 'PCI-DSS compliant'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'p6',
    title: 'Buildly SaaS',
    tag: 'SaaS / Productivity',
    category: 'SaaS',
    color: '#06B6D4',
    year: '2023',
    thumbnail: '/images/portfolio/buildly.jpg',
    desc: 'Project management SaaS for remote engineering teams — sprint planning, async standups, PR integrations, and burndown analytics in one place.',
    stack: ['Next.js', 'Node.js', 'MongoDB', 'GitHub API', 'Tailwind'],
    results: ['Used by 120+ engineering teams', '98% customer retention', 'Featured on Product Hunt'],
    liveUrl: 'https://buildly.app',
    featured: false,
  },
  {
    id: 'p7',
    title: 'Dataflow Analytics',
    tag: 'Data / Analytics',
    category: 'Web App',
    color: '#A855F7',
    year: '2023',
    thumbnail: '/images/portfolio/dataflow.jpg',
    desc: 'Self-serve analytics platform for e-commerce brands — cohort analysis, funnel visualisation, and LTV prediction powered by ML models.',
    stack: ['React', 'Python', 'PostgreSQL', 'D3.js', 'FastAPI'],
    results: ['Processes 50M events/day', '12× faster than previous solution', 'Series A secured post-launch'],
    liveUrl: 'https://dataflow.io',
    featured: false,
  },
  {
    id: 'p8',
    title: 'EcoTrack Platform',
    tag: 'SaaS / ESG',
    category: 'SaaS',
    color: '#22D3EE',
    year: '2022',
    thumbnail: '/images/portfolio/ecotrack.jpg',
    desc: 'Carbon footprint tracking and ESG reporting SaaS for mid-market companies — automated data ingestion, Scope 1/2/3 calculations, and board-ready reports.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Recharts'],
    results: ['ISO 14064 compliant', '60+ enterprise clients', 'Acquired in 2023'],
    liveUrl: '#',
    featured: false,
  },

  // ── Demo Websites ──────────────────────────────────────────────────────────
  {
    id: 'd1',
    title: 'NexaCorp — Corporate Site',
    tag: 'Branding / Corporate',
    category: 'Demo',
    color: '#6366F1',
    year: '2025',
    thumbnail: '/images/portfolio/demo-corporate.jpg',
    desc: 'কোম্পানির অফিসিয়াল সাইটের ডেমো — হোম, সার্ভিসেস, অ্যাবাউট ও কনট্যাক্ট পেজ সহ কাস্টম ব্র্যান্ডিং, কালার স্কিম এবং সম্পূর্ণ রেসপন্সিভ ক্লিন UI।',
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    results: ['প্রফেশনাল ব্র্যান্ড আইডেন্টিটি', 'সম্পূর্ণ রেসপন্সিভ লেআউট', 'কাস্টম লোগো ও কালার সিস্টেম'],
    liveUrl: 'https://demo-corporate.axentralab.com',
    featured: false,
    isDemo: true,
  },
  {
    id: 'd2',
    title: 'ShopNest — E-Commerce',
    tag: 'E-Commerce / Shop',
    category: 'Demo',
    color: '#F59E0B',
    year: '2025',
    thumbnail: '/images/portfolio/demo-ecommerce.jpg',
    desc: 'ছোট ও মাঝারি ব্যবসার জন্য ই-কমার্স সলিউশন — প্রোডাক্ট লিস্টিং, ফিল্টার, সার্চ, কার্ট ও চেকআউট সহ পেমেন্ট গেটওয়ে ইন্টিগ্রেশন।',
    stack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    results: ['প্রোডাক্ট ফিল্টার ও সার্চ সিস্টেম', 'স্ট্রাইপ পেমেন্ট ইন্টিগ্রেশন', 'WooCommerce বিকল্প সলিউশন'],
    liveUrl: 'https://demo-shop.axentralab.com',
    featured: false,
    isDemo: true,
  },
  {
    id: 'd3',
    title: 'PulseDesk — SaaS Dashboard',
    tag: 'SaaS / POS / Dashboard',
    category: 'Demo',
    color: '#22C55E',
    year: '2025',
    thumbnail: '/images/portfolio/demo-saas.jpg',
    desc: 'SaaS POS ড্যাশবোর্ড ডেমো — লগইন/রেজিস্ট্রেশন, গ্রাফ, রিপোর্ট, ইউজার ম্যানেজমেন্ট এবং রেসপন্সিভ টেবিল ও চার্ট সহ ফুল UI/UX।',
    stack: ['React', 'Chart.js', 'Node.js', 'PostgreSQL', 'JWT'],
    results: ['ইন্টারেক্টিভ চার্ট ও রিপোর্ট', 'রোল-বেসড অ্যাক্সেস কন্ট্রোল', 'রিয়েল-টাইম ড্যাশবোর্ড'],
    liveUrl: 'https://demo-saas.axentralab.com',
    featured: false,
    isDemo: true,
  },
  {
    id: 'd4',
    title: 'InkWave — Blog & Media',
    tag: 'Blog / News / Media',
    category: 'Demo',
    color: '#EC4899',
    year: '2025',
    thumbnail: '/images/portfolio/demo-blog.jpg',
    desc: 'কন্টেন্ট-ফোকাসড ব্লগ ও নিউজ সাইটের ডেমো — পোস্ট লিস্টিং, ক্যাটাগরি, ট্যাগ, রিচ মিডিয়া সাপোর্ট এবং SEO-ready টেমপ্লেট সহ কাস্টম রেসপন্সিভ লেআউট।',
    stack: ['Next.js', 'MDX', 'Tailwind CSS', 'Cloudinary', 'Vercel'],
    results: ['SEO-optimized টেমপ্লেট', 'ভিডিও ও ইমেজ মিডিয়া সাপোর্ট', 'ক্যাটাগরি ও ট্যাগ সিস্টেম'],
    liveUrl: 'https://demo-blog.axentralab.com',
    featured: false,
    isDemo: true,
  },
  {
    id: 'd5',
    title: 'LaunchPad — Landing Page',
    tag: 'Landing / One-Page',
    category: 'Demo',
    color: '#06B6D4',
    year: '2025',
    thumbnail: '/images/portfolio/demo-landing.jpg',
    desc: 'প্রোডাক্ট বা সার্ভিস প্রমোর জন্য হাই-কনভার্টিং ওয়ান-পেজ ল্যান্ডিং সাইট — হিরো সেকশন, ফিচার সেকশন, CTA এবং স্মুথ স্ক্রোল রেসপন্সিভ লেআউট।',
    stack: ['React', 'Framer Motion', 'Tailwind CSS', 'EmailJS'],
    results: ['হাই-কনভার্শন ডিজাইন প্যাটার্ন', 'স্মুথ অ্যানিমেশন ও স্ক্রোল', 'ফাস্ট লোড টাইম (<1s)'],
    liveUrl: 'https://demo-landing.axentralab.com',
    featured: false,
    isDemo: true,
  },
  {
    id: 'd6',
    title: 'EduSpark — Learning Platform',
    tag: 'LMS / E-Learning',
    category: 'Demo',
    color: '#A855F7',
    year: '2025',
    thumbnail: '/images/portfolio/demo-lms.jpg',
    desc: 'LMS ও এডুকেশনাল প্ল্যাটফর্মের ডেমো — কোর্স লিস্ট, রেজিস্ট্রেশন, প্রিভিউ ভিডিও, ড্যাশবোর্ড ও ফেক ডেটায় প্রগ্রেস ট্র্যাকিং সহ সম্পূর্ণ UI।',
    stack: ['React', 'Node.js', 'MongoDB', 'Vimeo API', 'Chart.js'],
    results: ['কোর্স প্রগ্রেস ট্র্যাকিং', 'ভিডিও প্রিভিউ ইন্টিগ্রেশন', 'স্টুডেন্ট ড্যাশবোর্ড UI'],
    liveUrl: 'https://demo-lms.axentralab.com',
    featured: false,
    isDemo: true,
  },
  {
    id: 'g1',
    title: 'Healthcare Portal',
    tag: 'Healthcare Portal',
    category: 'Web App',
    color: '#22C55E',
    year: '2024',
    thumbnail: '/images/portfolio/healthcarepo.jpg',
    desc: 'Patient management system with telemedicine, e-prescriptions, and insurance billing for a multi-clinic network.',
    stack: ["React","Node.js","PostgreSQL","AWS","HIPAA"],
    results: ['35% faster patient intake', 'HIPAA compliant', '4.9★ doctor rating'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g2',
    title: 'Real Estate Platform',
    tag: 'Real Estate Platform',
    category: 'Web App',
    color: '#3B82F6',
    year: '2024',
    thumbnail: '/images/portfolio/realestatepl.jpg',
    desc: 'Property listing marketplace with virtual tours, mortgage calculator, and AI-driven price estimation.',
    stack: ["Next.js","MongoDB","Mapbox","Stripe","Cloudinary"],
    results: ['12k active listings', '30% faster deal close', '$180M in transactions'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g3',
    title: 'Legal Tech Suite',
    tag: 'Legal Tech Suite',
    category: 'Web App',
    color: '#8B5CF6',
    year: '2024',
    thumbnail: '/images/portfolio/legaltechsui.jpg',
    desc: 'End-to-end legal case management with document automation, e-signatures, and billing for law firms.',
    stack: ["React","Node.js","PostgreSQL","DocuSign","AWS"],
    results: ['500+ lawyers onboarded', '80% less paperwork', '4-week build cycle'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g4',
    title: 'HR Management System',
    tag: 'HR Management System',
    category: 'Web App',
    color: '#F59E0B',
    year: '2024',
    thumbnail: '/images/portfolio/hrmanagement.jpg',
    desc: 'Full-cycle HR platform: hiring pipeline, payroll, leave management, and performance reviews.',
    stack: ["React","Node.js","MySQL","Redis","Docker"],
    results: ['Used by 200+ companies', '98% payroll accuracy', 'Cut HR workload by 60%'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g5',
    title: 'Supply Chain Dashboard',
    tag: 'Supply Chain Dashboard',
    category: 'Web App',
    color: '#EF4444',
    year: '2024',
    thumbnail: '/images/portfolio/supplychaind.jpg',
    desc: 'End-to-end supply chain visibility platform with predictive delay alerts and supplier scorecards.',
    stack: ["React","Python","PostgreSQL","D3.js","FastAPI"],
    results: ['Tracks 10M+ SKUs', '40% fewer disruptions', 'Real-time ETA updates'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g6',
    title: 'Event Management Portal',
    tag: 'Event Management Portal',
    category: 'Web App',
    color: '#06B6D4',
    year: '2024',
    thumbnail: '/images/portfolio/eventmanagem.jpg',
    desc: 'B2B event platform with ticketing, attendee check-in, sponsor management, and live streaming.',
    stack: ["Next.js","Node.js","MongoDB","Stripe","SendGrid"],
    results: ['50k+ tickets sold', '99.9% uptime at events', 'Full white-label support'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g7',
    title: 'Insurance Claims Platform',
    tag: 'Insurance Claims Platform',
    category: 'Web App',
    color: '#EC4899',
    year: '2024',
    thumbnail: '/images/portfolio/insurancecla.jpg',
    desc: 'Digital-first claims processing platform reducing settlement time from weeks to hours via AI triage.',
    stack: ["React","Java","PostgreSQL","AWS","Spring"],
    results: ['Claims settled 8× faster', 'Fraud detection built-in', '10M+ policies managed'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g8',
    title: 'Government e-Services',
    tag: 'Government e-Services',
    category: 'Web App',
    color: '#22D3EE',
    year: '2024',
    thumbnail: '/images/portfolio/governmente-.jpg',
    desc: 'Citizen portal for permit applications, tax filings, and license renewals with real-time status tracking.',
    stack: ["Next.js","Node.js","PostgreSQL","Redis","Docker"],
    results: ['2M+ citizens served', 'WCAG 2.1 AA compliant', '90% reduction in queues'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g9',
    title: 'Travel Booking Engine',
    tag: 'Travel Booking Engine',
    category: 'Web App',
    color: '#A855F7',
    year: '2024',
    thumbnail: '/images/portfolio/travelbookin.jpg',
    desc: 'Multi-modal travel booking with flights, hotels, and car hire, powered by real-time pricing APIs.',
    stack: ["React","Node.js","MongoDB","Stripe","Mapbox"],
    results: ['$5M booked in year 1', 'Sub-2s search results', '96% booking accuracy'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g10',
    title: 'Food Delivery Platform',
    tag: 'Food Delivery Platform',
    category: 'Web App',
    color: '#F97316',
    year: '2024',
    thumbnail: '/images/portfolio/fooddelivery.jpg',
    desc: 'Hyperlocal food delivery marketplace with real-time driver tracking, dynamic pricing, and restaurant POS.',
    stack: ["Next.js","Node.js","Redis","PostgreSQL","Stripe"],
    results: ['300+ restaurants', '18 min avg delivery', '4.7★ user rating'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g11',
    title: 'Recruitment Platform',
    tag: 'Recruitment Platform',
    category: 'Web App',
    color: '#10B981',
    year: '2024',
    thumbnail: '/images/portfolio/recruitmentp.jpg',
    desc: 'AI-powered job board with skills matching, video interviews, and automated candidate screening.',
    stack: ["React","Node.js","MongoDB","Elasticsearch","AWS"],
    results: ['50k+ job postings', '3× faster shortlisting', 'Used by 800+ employers'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g12',
    title: 'Construction Management',
    tag: 'Construction Management',
    category: 'Web App',
    color: '#6366F1',
    year: '2024',
    thumbnail: '/images/portfolio/construction.jpg',
    desc: 'Site management platform with progress tracking, budget control, and daily report automation for contractors.',
    stack: ["React","Node.js","PostgreSQL","AWS S3","Chart.js"],
    results: ['Projects worth $200M tracked', '30% fewer delays', 'Paperless site reports'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g13',
    title: 'Auction Platform',
    tag: 'Auction Platform',
    category: 'Web App',
    color: '#EF4444',
    year: '2024',
    thumbnail: '/images/portfolio/auctionplatf.jpg',
    desc: 'Real-time online auction platform with live bidding, escrow, and fraud protection for industrial assets.',
    stack: ["Next.js","Node.js","Redis","PostgreSQL","WebSocket"],
    results: ['$50M in auctions', 'Sub-100ms bid sync', 'Zero fraud incidents'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g14',
    title: 'Inventory System',
    tag: 'Inventory System',
    category: 'Web App',
    color: '#22C55E',
    year: '2024',
    thumbnail: '/images/portfolio/inventorysys.jpg',
    desc: 'Multi-warehouse inventory management with barcode scanning, demand forecasting, and reorder automation.',
    stack: ["React","Python","PostgreSQL","FastAPI","Redis"],
    results: ['99.8% stock accuracy', '40% less overstock', 'Integrates with 15 ERPs'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g15',
    title: 'CRM Platform',
    tag: 'CRM Platform',
    category: 'Web App',
    color: '#3B82F6',
    year: '2024',
    thumbnail: '/images/portfolio/crmplatform.jpg',
    desc: 'Sales CRM with pipeline management, email sequences, call logging, and revenue forecasting dashboards.',
    stack: ["React","Node.js","MongoDB","Twilio","SendGrid"],
    results: ['Used by 300+ sales teams', '28% more deals closed', 'Full Zapier integration'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g16',
    title: 'Logistics Tracker',
    tag: 'Logistics Tracker',
    category: 'Web App',
    color: '#8B5CF6',
    year: '2024',
    thumbnail: '/images/portfolio/logisticstra.jpg',
    desc: 'Real-time shipment tracking platform with route optimization and exception alerts for logistics firms.',
    stack: ["React","Node.js","PostgreSQL","Mapbox","WebSocket"],
    results: ['1M+ shipments tracked', '25% fuel savings', 'Live ETA updates'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g17',
    title: 'Hotel Booking Engine',
    tag: 'Hotel Booking Engine',
    category: 'Web App',
    color: '#F59E0B',
    year: '2024',
    thumbnail: '/images/portfolio/hotelbooking.jpg',
    desc: 'Direct booking engine for boutique hotels with dynamic pricing, channel manager, and guest CRM.',
    stack: ["Next.js","Node.js","MongoDB","Stripe","Redis"],
    results: ['40% direct bookings up', 'Replaced OTA dependence', 'Revenue up 22%'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g18',
    title: 'Telemedicine Platform',
    tag: 'Telemedicine Platform',
    category: 'Web App',
    color: '#EF4444',
    year: '2024',
    thumbnail: '/images/portfolio/telemedicine.jpg',
    desc: 'HIPAA-compliant video consultation platform with AI symptom checker and prescription management.',
    stack: ["React","WebRTC","Node.js","PostgreSQL","HIPAA"],
    results: ['100k+ consultations', '< 30s doctor connect', '98% patient satisfaction'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g19',
    title: 'Fleet Management System',
    tag: 'Fleet Management System',
    category: 'Web App',
    color: '#06B6D4',
    year: '2024',
    thumbnail: '/images/portfolio/fleetmanagem.jpg',
    desc: 'IoT-connected fleet tracker with driver behavior analysis, predictive maintenance, and fuel monitoring.',
    stack: ["React","Node.js","PostgreSQL","Mapbox","IoT"],
    results: ['500+ vehicles managed', '20% fuel reduction', 'Zero compliance fines'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g20',
    title: 'Charity & Donation Platform',
    tag: 'Charity & Donation Platform',
    category: 'Web App',
    color: '#EC4899',
    year: '2024',
    thumbnail: '/images/portfolio/charitydonat.jpg',
    desc: 'Transparent donation platform with impact reporting, recurring giving, and NGO verification.',
    stack: ["Next.js","Node.js","MongoDB","Stripe","AWS"],
    results: ['$10M+ raised', '96% donor retention', 'ISO-certified reporting'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g21',
    title: 'AI Content Writer',
    tag: 'AI Content Writer',
    category: 'SaaS',
    color: '#8B5CF6',
    year: '2024',
    thumbnail: '/images/portfolio/aicontentwri.jpg',
    desc: 'GPT-4 powered content creation SaaS for marketing teams — blogs, ads, social posts in seconds.',
    stack: ["React","Node.js","OpenAI","MongoDB","Stripe"],
    results: ['10× faster content output', 'Used by 2k+ marketers', '$500k MRR at 9 months'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g22',
    title: 'Video Conferencing SaaS',
    tag: 'Video Conferencing SaaS',
    category: 'SaaS',
    color: '#3B82F6',
    year: '2024',
    thumbnail: '/images/portfolio/videoconfere.jpg',
    desc: 'Enterprise video conferencing with AI transcription, meeting summaries, and CRM sync.',
    stack: ["React","WebRTC","Node.js","AWS","Redis"],
    results: ['50k+ daily meetings', '99.5% call reliability', 'SOC2 certified'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g23',
    title: 'Email Marketing SaaS',
    tag: 'Email Marketing SaaS',
    category: 'SaaS',
    color: '#F59E0B',
    year: '2024',
    thumbnail: '/images/portfolio/emailmarketi.jpg',
    desc: 'Smart email marketing platform with AI subject line optimization and behavioral segmentation.',
    stack: ["React","Node.js","SendGrid","MongoDB","Redis"],
    results: ['5× open rate improvement', '1B+ emails sent', 'GDPR compliant'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g24',
    title: 'Social Media Scheduler',
    tag: 'Social Media Scheduler',
    category: 'SaaS',
    color: '#EC4899',
    year: '2024',
    thumbnail: '/images/portfolio/socialmedias.jpg',
    desc: 'Omnichannel social scheduling with AI caption generation, best-time posting, and analytics.',
    stack: ["React","Node.js","MongoDB","Twitter API","OAuth"],
    results: ['8 platforms supported', '3× engagement increase', 'Used by 5k+ brands'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g25',
    title: 'Invoice & Billing SaaS',
    tag: 'Invoice & Billing SaaS',
    category: 'SaaS',
    color: '#22C55E',
    year: '2024',
    thumbnail: '/images/portfolio/invoicebilli.jpg',
    desc: 'Automated invoicing, subscription billing, and revenue recognition for B2B software companies.',
    stack: ["React","Node.js","PostgreSQL","Stripe","PDF.js"],
    results: ['$200M billed through platform', '99% payment recovery', '10-min onboarding'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g26',
    title: 'Time Tracking SaaS',
    tag: 'Time Tracking SaaS',
    category: 'SaaS',
    color: '#06B6D4',
    year: '2024',
    thumbnail: '/images/portfolio/timetracking.jpg',
    desc: 'Intelligent time tracking with idle detection, project budgets, and automated payroll exports.',
    stack: ["React","Node.js","MongoDB","WebSocket","Chart.js"],
    results: ['Used by 1k+ agencies', '92% invoice accuracy', 'Integrates with 20+ tools'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g27',
    title: 'Customer Support SaaS',
    tag: 'Customer Support SaaS',
    category: 'SaaS',
    color: '#A855F7',
    year: '2024',
    thumbnail: '/images/portfolio/customersupp.jpg',
    desc: 'AI-first helpdesk with auto-categorization, sentiment analysis, and one-click response suggestions.',
    stack: ["React","Node.js","MongoDB","WebSocket","OpenAI"],
    results: ['60% ticket deflection', 'CSAT up to 94%', '2-min avg response time'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g28',
    title: 'SEO Analytics SaaS',
    tag: 'SEO Analytics SaaS',
    category: 'SaaS',
    color: '#F97316',
    year: '2024',
    thumbnail: '/images/portfolio/seoanalytics.jpg',
    desc: 'Keyword intelligence and SERP tracking platform with competitor gap analysis and content scoring.',
    stack: ["React","Python","PostgreSQL","FastAPI","D3.js"],
    results: ['Tracks 50M keywords', 'Used by 800+ agencies', 'ROI positive in 30 days'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g29',
    title: 'Document Management SaaS',
    tag: 'Document Management SaaS',
    category: 'SaaS',
    color: '#10B981',
    year: '2024',
    thumbnail: '/images/portfolio/documentmana.jpg',
    desc: 'Smart document hub with full-text search, version control, e-signatures, and access audit logs.',
    stack: ["React","Node.js","AWS S3","PostgreSQL","Elasticsearch"],
    results: ['10M+ docs stored', '99.99% availability', 'GDPR & HIPAA ready'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g30',
    title: 'Appointment Booking SaaS',
    tag: 'Appointment Booking SaaS',
    category: 'SaaS',
    color: '#6366F1',
    year: '2024',
    thumbnail: '/images/portfolio/appointmentb.jpg',
    desc: 'White-label booking platform for service businesses with automated reminders and payment capture.',
    stack: ["React","Node.js","MongoDB","Google Calendar","Stripe"],
    results: ['500k+ appointments booked', '70% no-show reduction', 'Fully white-label'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g31',
    title: 'Survey & Feedback SaaS',
    tag: 'Survey & Feedback SaaS',
    category: 'SaaS',
    color: '#EF4444',
    year: '2023',
    thumbnail: '/images/portfolio/surveyfeedba.jpg',
    desc: 'Enterprise NPS and CSAT survey platform with real-time sentiment dashboards and Slack alerts.',
    stack: ["React","Node.js","MongoDB","D3.js","SendGrid"],
    results: ['10M+ responses collected', '2× response rates', 'Integrates with Salesforce'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g32',
    title: 'Payroll Automation SaaS',
    tag: 'Payroll Automation SaaS',
    category: 'SaaS',
    color: '#22C55E',
    year: '2023',
    thumbnail: '/images/portfolio/payrollautom.jpg',
    desc: 'Global payroll automation for remote-first companies supporting 50+ countries and currencies.',
    stack: ["React","Node.js","PostgreSQL","Stripe","AWS"],
    results: ['50 countries supported', '100% tax compliance', '8× faster payroll runs'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g33',
    title: 'Project Budget Tracker',
    tag: 'Project Budget Tracker',
    category: 'SaaS',
    color: '#3B82F6',
    year: '2023',
    thumbnail: '/images/portfolio/projectbudge.jpg',
    desc: 'Budget tracking SaaS for agencies with forecast vs actual reporting and client-facing dashboards.',
    stack: ["React","Node.js","PostgreSQL","Chart.js","Stripe"],
    results: ['Used by 400+ agencies', 'Prevents 90% overruns', 'Real-time budget alerts'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g34',
    title: 'Cybersecurity Audit SaaS',
    tag: 'Cybersecurity Audit SaaS',
    category: 'SaaS',
    color: '#EF4444',
    year: '2023',
    thumbnail: '/images/portfolio/cybersecurit.jpg',
    desc: 'Automated security audit and compliance reporting SaaS for startups and SMEs.',
    stack: ["React","Python","PostgreSQL","Docker","OWASP"],
    results: ['500+ audits completed', 'CVE database integrated', 'CIS benchmark aligned'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g35',
    title: 'AI Chatbot Builder',
    tag: 'AI Chatbot Builder',
    category: 'SaaS',
    color: '#8B5CF6',
    year: '2023',
    thumbnail: '/images/portfolio/aichatbotbui.jpg',
    desc: 'No-code AI chatbot builder with live chat handoff, CRM sync, and multilingual support.',
    stack: ["React","Node.js","OpenAI","MongoDB","WebSocket"],
    results: ['Deployed on 3k+ websites', '85% bot resolution rate', '40+ language support'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g36',
    title: 'Subscription Analytics SaaS',
    tag: 'Subscription Analytics SaaS',
    category: 'SaaS',
    color: '#F59E0B',
    year: '2023',
    thumbnail: '/images/portfolio/subscription.jpg',
    desc: 'MRR, churn, and LTV analytics dashboard for SaaS founders with cohort and revenue waterfall charts.',
    stack: ["React","Node.js","PostgreSQL","Stripe","Chart.js"],
    results: ['Tracks $500M+ in MRR', 'Used by 600+ SaaS cos', 'Stripe/Paddle native sync'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g37',
    title: 'API Management Platform',
    tag: 'API Management Platform',
    category: 'SaaS',
    color: '#06B6D4',
    year: '2023',
    thumbnail: '/images/portfolio/apimanagemen.jpg',
    desc: 'API gateway and developer portal SaaS with rate limiting, analytics, and monetization tools.',
    stack: ["React","Node.js","Kong","PostgreSQL","Docker"],
    results: ['10B+ API calls/month', '99.99% gateway uptime', 'OpenAPI 3.0 compliant'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g38',
    title: 'Learning Management SaaS',
    tag: 'Learning Management SaaS',
    category: 'SaaS',
    color: '#A855F7',
    year: '2023',
    thumbnail: '/images/portfolio/learningmana.jpg',
    desc: 'White-label LMS for corporate training with SCORM support, quizzes, and completion certificates.',
    stack: ["React","Node.js","MongoDB","Vimeo","Stripe"],
    results: ['200k+ learners trained', '92% course completion', 'SCORM 1.2 & 2004'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g39',
    title: 'Threat Intelligence SaaS',
    tag: 'Threat Intelligence SaaS',
    category: 'SaaS',
    color: '#EF4444',
    year: '2023',
    thumbnail: '/images/portfolio/threatintell.jpg',
    desc: 'Real-time threat intel aggregation and IOC enrichment platform for SOC teams.',
    stack: ["React","Python","Elasticsearch","Docker","AWS"],
    results: ['1M+ IOCs enriched/day', 'Used by 80 SOC teams', 'STIX/TAXII compliant'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g40',
    title: 'Logistics SaaS Platform',
    tag: 'Logistics SaaS Platform',
    category: 'SaaS',
    color: '#22D3EE',
    year: '2023',
    thumbnail: '/images/portfolio/logisticssaa.jpg',
    desc: '3PL management SaaS with rate shopping, carrier API integrations, and shipment analytics.',
    stack: ["React","Node.js","PostgreSQL","Google Maps","Redis"],
    results: ['100+ carrier integrations', '$1B freight managed', 'EDI 204/214 compliant'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g41',
    title: 'FitTrack Pro',
    tag: 'FitTrack Pro',
    category: 'Mobile',
    color: '#22C55E',
    year: '2023',
    thumbnail: '/images/portfolio/fittrackpro.jpg',
    desc: 'AI-powered fitness app with workout planning, nutrition tracking, and wearable sync for iOS and Android.',
    stack: ["React Native","Node.js","PostgreSQL","HealthKit","Stripe"],
    results: ['4.9★ App Store', '500k downloads', 'Featured by Apple'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g42',
    title: 'MediRemind App',
    tag: 'MediRemind App',
    category: 'Mobile',
    color: '#3B82F6',
    year: '2023',
    thumbnail: '/images/portfolio/mediremindap.jpg',
    desc: 'Medication reminder app for chronic patients with caregiver alerts and adherence reporting.',
    stack: ["React Native","Node.js","Firebase","Push Notifications","HIPAA"],
    results: ['96% adherence rate', 'Used by 200k patients', 'HIPAA certified'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g43',
    title: 'ParkEasy Mobile',
    tag: 'ParkEasy Mobile',
    category: 'Mobile',
    color: '#F59E0B',
    year: '2023',
    thumbnail: '/images/portfolio/parkeasymobi.jpg',
    desc: 'Smart parking app with real-time space availability, pre-booking, and cashless payment.',
    stack: ["React Native","Node.js","Stripe","Google Maps","IoT"],
    results: ['300k+ parkings done', '98% spot accuracy', 'City-wide IoT sensors'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g44',
    title: 'TalentConnect App',
    tag: 'TalentConnect App',
    category: 'Mobile',
    color: '#8B5CF6',
    year: '2023',
    thumbnail: '/images/portfolio/talentconnec.jpg',
    desc: 'Gig economy app connecting freelancers with local businesses for on-demand services.',
    stack: ["React Native","Node.js","MongoDB","Firebase","WebRTC"],
    results: ['50k+ freelancers', '4.8★ rating', '$5M in gigs facilitated'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g45',
    title: 'SafeRoute Security App',
    tag: 'SafeRoute Security App',
    category: 'Mobile',
    color: '#EF4444',
    year: '2023',
    thumbnail: '/images/portfolio/saferoutesec.jpg',
    desc: 'Personal safety app with SOS alerts, route sharing, and incident reporting for urban commuters.',
    stack: ["React Native","Node.js","Firebase","Google Maps","Twilio"],
    results: ['1M+ SOS responses', '< 3s alert delivery', 'Partnerships with police'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g46',
    title: 'LanguageLeap App',
    tag: 'LanguageLeap App',
    category: 'Mobile',
    color: '#06B6D4',
    year: '2023',
    thumbnail: '/images/portfolio/languageleap.jpg',
    desc: 'AI-powered language learning app with speech recognition, gamification, and native speaker sessions.',
    stack: ["React Native","Node.js","OpenAI","Firebase","Stripe"],
    results: ['40 languages supported', '4.7★ Play Store', '2M+ active learners'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g47',
    title: 'DineLocal App',
    tag: 'DineLocal App',
    category: 'Mobile',
    color: '#EC4899',
    year: '2023',
    thumbnail: '/images/portfolio/dinelocalapp.jpg',
    desc: 'Hyperlocal restaurant discovery with AR menu previews, table booking, and loyalty rewards.',
    stack: ["React Native","Node.js","MongoDB","Stripe","Mapbox"],
    results: ['5k+ restaurants listed', '200k MAU', '30% repeat visit rate'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g48',
    title: 'WalletWise Finance App',
    tag: 'WalletWise Finance App',
    category: 'Mobile',
    color: '#A855F7',
    year: '2023',
    thumbnail: '/images/portfolio/walletwisefi.jpg',
    desc: 'Personal finance app with automatic expense categorization, savings goals, and investment tracking.',
    stack: ["React Native","Node.js","Plaid","PostgreSQL","Stripe"],
    results: ['$500M in transactions', '4.9★ rating', 'PCI-DSS compliant'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g49',
    title: 'EventGo App',
    tag: 'EventGo App',
    category: 'Mobile',
    color: '#F97316',
    year: '2023',
    thumbnail: '/images/portfolio/eventgoapp.jpg',
    desc: 'Event discovery and ticketing app with AR venue previews and social planning features.',
    stack: ["React Native","Node.js","MongoDB","Stripe","Firebase"],
    results: ['1M+ events listed', '500k+ tickets sold', 'Featured on Product Hunt'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g50',
    title: 'CropSmart Agri App',
    tag: 'CropSmart Agri App',
    category: 'Mobile',
    color: '#10B981',
    year: '2023',
    thumbnail: '/images/portfolio/cropsmartagr.jpg',
    desc: 'AI crop disease detection and weather-based advisory app for smallholder farmers.',
    stack: ["React Native","Node.js","TensorFlow","Firebase","IoT"],
    results: ['Used by 300k farmers', '92% disease accuracy', 'Govt partnership secured'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g51',
    title: 'BloodConnect App',
    tag: 'BloodConnect App',
    category: 'Mobile',
    color: '#EF4444',
    year: '2023',
    thumbnail: '/images/portfolio/bloodconnect.jpg',
    desc: 'Emergency blood donation matching app connecting donors with hospitals in real-time.',
    stack: ["React Native","Node.js","Firebase","Google Maps","Twilio"],
    results: ['200k+ donors registered', '10k+ lives saved', 'WHO pilot program'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g52',
    title: 'SmartHome Controller',
    tag: 'SmartHome Controller',
    category: 'Mobile',
    color: '#22D3EE',
    year: '2023',
    thumbnail: '/images/portfolio/smarthomecon.jpg',
    desc: 'IoT smart home controller with voice commands, automation rules, and energy monitoring.',
    stack: ["React Native","Node.js","MQTT","AWS IoT","Firebase"],
    results: ['500+ device types supported', '50% energy savings', 'Works with Alexa & Google'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g53',
    title: 'Courier Driver App',
    tag: 'Courier Driver App',
    category: 'Mobile',
    color: '#6366F1',
    year: '2023',
    thumbnail: '/images/portfolio/courierdrive.jpg',
    desc: 'Last-mile delivery driver app with optimized routing, proof-of-delivery, and earnings dashboard.',
    stack: ["React Native","Node.js","Google Maps","WebSocket","Firebase"],
    results: ['99.5% on-time delivery', 'Used by 5k drivers', 'Handles 50k deliveries/day'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g54',
    title: 'MindCalm Mental Health',
    tag: 'MindCalm Mental Health',
    category: 'Mobile',
    color: '#8B5CF6',
    year: '2023',
    thumbnail: '/images/portfolio/mindcalmment.jpg',
    desc: 'Mental health app with AI therapy chatbot, mood tracking, and guided meditation sessions.',
    stack: ["React Native","Node.js","OpenAI","Firebase","HealthKit"],
    results: ['4.9★ App Store', '200k+ sessions/day', 'Therapist-reviewed content'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g55',
    title: 'PickupSports App',
    tag: 'PickupSports App',
    category: 'Mobile',
    color: '#F59E0B',
    year: '2023',
    thumbnail: '/images/portfolio/pickupsports.jpg',
    desc: 'Organize and discover pickup sports games nearby with team formation, venue booking, and scorekeeping.',
    stack: ["React Native","Node.js","MongoDB","Stripe","Mapbox"],
    results: ['500k+ games organized', '4.8★ rating', '20 sports supported'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g56',
    title: 'Waste Management Portal',
    tag: 'Waste Management Portal',
    category: 'Web App',
    color: '#10B981',
    year: '2022',
    thumbnail: '/images/portfolio/wastemanagem.jpg',
    desc: 'Smart waste collection system with IoT sensor monitoring, route optimization, and citizen reporting.',
    stack: ["React","Node.js","PostgreSQL","Google Maps","IoT"],
    results: ['40% collection efficiency', '5 cities deployed', 'Zero manual rerouting'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g57',
    title: 'Scholarship Portal',
    tag: 'Scholarship Portal',
    category: 'Web App',
    color: '#6366F1',
    year: '2022',
    thumbnail: '/images/portfolio/scholarshipp.jpg',
    desc: 'National scholarship discovery and application platform with eligibility matching and status tracking.',
    stack: ["Next.js","Node.js","PostgreSQL","SendGrid","AWS"],
    results: ['500k+ students served', '20k scholarships listed', 'Govt partnership'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g58',
    title: 'Parking Management System',
    tag: 'Parking Management System',
    category: 'Web App',
    color: '#F97316',
    year: '2022',
    thumbnail: '/images/portfolio/parkingmanag.jpg',
    desc: 'City-wide smart parking management with sensor integration, enforcement tools, and revenue analytics.',
    stack: ["React","Node.js","PostgreSQL","Mapbox","IoT"],
    results: ['95% occupancy accuracy', '$2M revenue tracked', '5 cities live'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g59',
    title: 'E-Procurement Platform',
    tag: 'E-Procurement Platform',
    category: 'Web App',
    color: '#EF4444',
    year: '2022',
    thumbnail: '/images/portfolio/e-procuremen.jpg',
    desc: 'Enterprise e-procurement with vendor management, RFQ/RFP workflows, and spend analytics.',
    stack: ["React","Java","PostgreSQL","Spring","Docker"],
    results: ['$500M procurement managed', '60% faster sourcing', 'SOX compliant'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g60',
    title: 'Media Asset Manager',
    tag: 'Media Asset Manager',
    category: 'Web App',
    color: '#8B5CF6',
    year: '2022',
    thumbnail: '/images/portfolio/mediaassetma.jpg',
    desc: 'Digital asset management platform for media companies with AI tagging, rights management, and CDN.',
    stack: ["React","Node.js","AWS S3","PostgreSQL","Elasticsearch"],
    results: ['50M+ assets managed', 'AI auto-tagging', 'Rights clearance engine'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g61',
    title: 'Agriculture Market Portal',
    tag: 'Agriculture Market Portal',
    category: 'Web App',
    color: '#22C55E',
    year: '2022',
    thumbnail: '/images/portfolio/agriculturem.jpg',
    desc: 'Direct farmer-to-buyer marketplace with price discovery, quality grading, and logistics coordination.',
    stack: ["Next.js","Node.js","MongoDB","Stripe","SMS API"],
    results: ['100k+ farmers onboarded', '30% better farm gate price', '$50M in trades'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g62',
    title: 'Clinical Trial Manager',
    tag: 'Clinical Trial Manager',
    category: 'Web App',
    color: '#3B82F6',
    year: '2022',
    thumbnail: '/images/portfolio/clinicaltria.jpg',
    desc: 'End-to-end clinical trial management with patient recruitment, protocol tracking, and 21 CFR Part 11 compliance.',
    stack: ["React","Node.js","PostgreSQL","FHIR","AWS"],
    results: ['50+ trials managed', 'FDA audit-ready', 'HL7 FHIR compliant'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g63',
    title: 'Energy Trading Platform',
    tag: 'Energy Trading Platform',
    category: 'Web App',
    color: '#F59E0B',
    year: '2022',
    thumbnail: '/images/portfolio/energytradin.jpg',
    desc: 'Real-time energy trading platform for renewable power with automated bidding and grid balancing.',
    stack: ["React","Python","PostgreSQL","WebSocket","AWS"],
    results: ['$1B in energy traded', 'Sub-ms order matching', 'FERC compliant'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g64',
    title: 'Museum Collection System',
    tag: 'Museum Collection System',
    category: 'Web App',
    color: '#A855F7',
    year: '2022',
    thumbnail: '/images/portfolio/museumcollec.jpg',
    desc: 'Digital collections management for museums with public discovery portal and conservation tracking.',
    stack: ["Next.js","Node.js","PostgreSQL","Cloudinary","IIIF"],
    results: ['500k+ artifacts catalogued', 'IIIF standard compliant', '3 national museums'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g65',
    title: 'Freelancer Marketplace',
    tag: 'Freelancer Marketplace',
    category: 'Web App',
    color: '#EC4899',
    year: '2022',
    thumbnail: '/images/portfolio/freelancerma.jpg',
    desc: 'Curated freelancer marketplace with skills verification, escrow payments, and dispute resolution.',
    stack: ["Next.js","Node.js","MongoDB","Stripe","Elasticsearch"],
    results: ['50k+ freelancers', '$20M in contracts', 'IP protection built-in'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g66',
    title: 'Sports Analytics Platform',
    tag: 'Sports Analytics Platform',
    category: 'Web App',
    color: '#06B6D4',
    year: '2022',
    thumbnail: '/images/portfolio/sportsanalyt.jpg',
    desc: 'Performance analytics platform for professional sports teams with video tagging and predictive modeling.',
    stack: ["React","Python","PostgreSQL","D3.js","FastAPI"],
    results: ['Used by 12 pro teams', '10M+ data points/match', 'Reduced injury risk 35%'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g67',
    title: 'Luxury Car Rental',
    tag: 'Luxury Car Rental',
    category: 'Web App',
    color: '#22D3EE',
    year: '2022',
    thumbnail: '/images/portfolio/luxurycarren.jpg',
    desc: 'Premium car rental platform with chauffeur booking, subscription plans, and concierge service.',
    stack: ["Next.js","Node.js","MongoDB","Stripe","Twilio"],
    results: ['500+ luxury vehicles', '$15M in bookings', '99% booking fulfillment'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g68',
    title: 'Code Review SaaS',
    tag: 'Code Review SaaS',
    category: 'SaaS',
    color: '#8B5CF6',
    year: '2022',
    thumbnail: '/images/portfolio/codereviewsa.jpg',
    desc: 'AI-powered code review tool that catches bugs, security issues, and style violations automatically.',
    stack: ["React","Node.js","GitHub API","PostgreSQL","OpenAI"],
    results: ['500k PRs reviewed', '90% bug catch rate', 'Used by 1k+ dev teams'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g69',
    title: 'Influencer Marketing SaaS',
    tag: 'Influencer Marketing SaaS',
    category: 'SaaS',
    color: '#EC4899',
    year: '2022',
    thumbnail: '/images/portfolio/influencerma.jpg',
    desc: 'Influencer discovery and campaign management SaaS with ROI tracking and fake follower detection.',
    stack: ["React","Node.js","MongoDB","Instagram API","Stripe"],
    results: ['5M+ influencers indexed', 'Used by 300+ brands', '$100M in campaigns'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g70',
    title: 'Customer Data Platform',
    tag: 'Customer Data Platform',
    category: 'SaaS',
    color: '#3B82F6',
    year: '2022',
    thumbnail: '/images/portfolio/customerdata.jpg',
    desc: 'Unified customer data platform with identity resolution, real-time segmentation, and activation.',
    stack: ["React","Node.js","Kafka","PostgreSQL","Redis"],
    results: ['10B+ events processed', '360° customer view', 'GDPR native'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g71',
    title: 'Logistics Billing SaaS',
    tag: 'Logistics Billing SaaS',
    category: 'SaaS',
    color: '#F59E0B',
    year: '2022',
    thumbnail: '/images/portfolio/logisticsbil.jpg',
    desc: 'Automated freight billing with rate auditing, dispute resolution, and carrier invoice matching.',
    stack: ["React","Node.js","PostgreSQL","PDF.js","Stripe"],
    results: ['$2B freight billed', '99.2% invoice accuracy', 'EDI compliant'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g72',
    title: 'Retail Intelligence SaaS',
    tag: 'Retail Intelligence SaaS',
    category: 'SaaS',
    color: '#22C55E',
    year: '2022',
    thumbnail: '/images/portfolio/retailintell.jpg',
    desc: 'Retail analytics SaaS with foot traffic analysis, planogram compliance, and shelf availability AI.',
    stack: ["React","Python","PostgreSQL","TensorFlow","FastAPI"],
    results: ['500+ stores monitored', '18% sales lift', 'Computer vision powered'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g73',
    title: 'Password Manager SaaS',
    tag: 'Password Manager SaaS',
    category: 'SaaS',
    color: '#EF4444',
    year: '2022',
    thumbnail: '/images/portfolio/passwordmana.jpg',
    desc: 'Zero-knowledge enterprise password manager with SSO, audit logs, and breach monitoring.',
    stack: ["React","Node.js","PostgreSQL","AES-256","Docker"],
    results: ['10M+ credentials secured', 'Zero-knowledge architecture', 'SOC2 Type II'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g74',
    title: 'Construction Estimating SaaS',
    tag: 'Construction Estimating SaaS',
    category: 'SaaS',
    color: '#6366F1',
    year: '2022',
    thumbnail: '/images/portfolio/construction.jpg',
    desc: 'AI-powered construction cost estimating with material price feeds and subcontractor bid management.',
    stack: ["React","Node.js","PostgreSQL","PDF.js","AWS"],
    results: ['Used by 200+ contractors', 'Estimates in 10 minutes', '40% more accurate bids'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g75',
    title: 'Pet Care SaaS Platform',
    tag: 'Pet Care SaaS Platform',
    category: 'SaaS',
    color: '#F97316',
    year: '2022',
    thumbnail: '/images/portfolio/petcaresaasp.jpg',
    desc: 'Vet clinic management SaaS with appointment booking, medical records, and pet owner portal.',
    stack: ["React","Node.js","MongoDB","Stripe","Twilio"],
    results: ['2k+ vet clinics', '500k+ pet profiles', 'Integrates with Idexx'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g76',
    title: 'Podcast Hosting SaaS',
    tag: 'Podcast Hosting SaaS',
    category: 'SaaS',
    color: '#A855F7',
    year: '2022',
    thumbnail: '/images/portfolio/podcasthosti.jpg',
    desc: 'Podcast hosting and analytics SaaS with dynamic ad insertion, transcript generation, and distribution.',
    stack: ["React","Node.js","AWS S3","PostgreSQL","RSS"],
    results: ['100k+ episodes hosted', 'Auto-publish to Spotify', 'AI transcription included'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g77',
    title: 'Contract Management SaaS',
    tag: 'Contract Management SaaS',
    category: 'SaaS',
    color: '#10B981',
    year: '2022',
    thumbnail: '/images/portfolio/contractmana.jpg',
    desc: 'AI contract lifecycle management with clause extraction, risk scoring, and automated renewals.',
    stack: ["React","Node.js","PostgreSQL","DocuSign","OpenAI"],
    results: ['50k+ contracts managed', '80% faster reviews', 'Legal AI trained on M&A'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g78',
    title: 'Crypto Portfolio Tracker',
    tag: 'Crypto Portfolio Tracker',
    category: 'SaaS',
    color: '#F59E0B',
    year: '2022',
    thumbnail: '/images/portfolio/cryptoportfo.jpg',
    desc: 'Multi-exchange crypto portfolio tracker with tax reporting, DeFi support, and price alerts.',
    stack: ["React","Node.js","PostgreSQL","Binance API","CoinGecko"],
    results: ['$1B+ portfolios tracked', '100+ exchanges', 'CPA-approved tax reports'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g79',
    title: 'Drone Fleet Management',
    tag: 'Drone Fleet Management',
    category: 'SaaS',
    color: '#22D3EE',
    year: '2022',
    thumbnail: '/images/portfolio/dronefleetma.jpg',
    desc: 'Commercial drone fleet management SaaS with mission planning, compliance, and telemetry streaming.',
    stack: ["React","Node.js","PostgreSQL","WebSocket","MapboxGL"],
    results: ['500+ drones managed', 'FAA Part 107 compliant', 'Real-time telemetry'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g80',
    title: 'Restaurant POS SaaS',
    tag: 'Restaurant POS SaaS',
    category: 'SaaS',
    color: '#EF4444',
    year: '2022',
    thumbnail: '/images/portfolio/restaurantpo.jpg',
    desc: 'Cloud POS for restaurants with table management, kitchen display, loyalty programs, and analytics.',
    stack: ["React","Node.js","PostgreSQL","Stripe","WebSocket"],
    results: ['2k+ restaurants live', '99.99% POS uptime', 'Offline-first design'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g81',
    title: 'B2B Lead Gen SaaS',
    tag: 'B2B Lead Gen SaaS',
    category: 'SaaS',
    color: '#6366F1',
    year: '2022',
    thumbnail: '/images/portfolio/b2bleadgensa.jpg',
    desc: 'AI-powered B2B lead generation with intent signals, automated outreach, and CRM enrichment.',
    stack: ["React","Node.js","PostgreSQL","OpenAI","LinkedIn API"],
    results: ['10M+ companies profiled', '3× pipeline growth', 'GDPR lead scoring'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g82',
    title: 'Accessibility Testing SaaS',
    tag: 'Accessibility Testing SaaS',
    category: 'SaaS',
    color: '#10B981',
    year: '2022',
    thumbnail: '/images/portfolio/accessibilit.jpg',
    desc: 'Automated WCAG compliance testing SaaS with remediation guidance and developer integrations.',
    stack: ["React","Node.js","Puppeteer","PostgreSQL","AWS"],
    results: ['5k+ sites tested monthly', 'WCAG 2.2 full coverage', 'CI/CD plugin available'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g83',
    title: 'Fundraising Platform SaaS',
    tag: 'Fundraising Platform SaaS',
    category: 'SaaS',
    color: '#EC4899',
    year: '2022',
    thumbnail: '/images/portfolio/fundraisingp.jpg',
    desc: 'SaaS fundraising platform for nonprofits and startups with donor management and campaign analytics.',
    stack: ["React","Node.js","MongoDB","Stripe","SendGrid"],
    results: ['$100M+ raised', 'Used by 500+ orgs', 'Recurring giving tools'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g84',
    title: 'Remote Desktop SaaS',
    tag: 'Remote Desktop SaaS',
    category: 'SaaS',
    color: '#3B82F6',
    year: '2022',
    thumbnail: '/images/portfolio/remotedeskto.jpg',
    desc: 'Secure remote desktop SaaS with session recording, access controls, and IT asset management.',
    stack: ["React","WebRTC","Node.js","AWS","Electron"],
    results: ['50k+ remote sessions/day', '256-bit encryption', 'Zero-trust architecture'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g85',
    title: 'Waste Compliance SaaS',
    tag: 'Waste Compliance SaaS',
    category: 'SaaS',
    color: '#22C55E',
    year: '2022',
    thumbnail: '/images/portfolio/wastecomplia.jpg',
    desc: 'Environmental compliance SaaS for manufacturing companies to track waste generation and regulatory filings.',
    stack: ["React","Node.js","PostgreSQL","AWS","PDF.js"],
    results: ['60+ regulations covered', 'Audit-ready reports', 'Used by Fortune 500'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g86',
    title: 'Hotel Revenue Management',
    tag: 'Hotel Revenue Management',
    category: 'SaaS',
    color: '#F59E0B',
    year: '2022',
    thumbnail: '/images/portfolio/hotelrevenue.jpg',
    desc: 'AI revenue management SaaS for hotels with dynamic pricing, OTA parity monitoring, and demand forecasting.',
    stack: ["React","Python","PostgreSQL","FastAPI","D3.js"],
    results: ['Revenue up avg 25%', '50+ OTAs monitored', 'Real-time rate updates'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g87',
    title: 'AgriVet Mobile',
    tag: 'AgriVet Mobile',
    category: 'Mobile',
    color: '#22C55E',
    year: '2022',
    thumbnail: '/images/portfolio/agrivetmobil.jpg',
    desc: 'Offline-first livestock disease diagnosis app for rural vets with AI image recognition.',
    stack: ["React Native","Node.js","Firebase","TensorFlow","Offline"],
    results: ['Works offline', '95% diagnosis accuracy', '50k vets trained'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g88',
    title: 'TaxFiler Mobile',
    tag: 'TaxFiler Mobile',
    category: 'Mobile',
    color: '#3B82F6',
    year: '2022',
    thumbnail: '/images/portfolio/taxfilermobi.jpg',
    desc: 'Mobile tax filing app with bank import, auto-categorization, and e-file submission for individuals.',
    stack: ["React Native","Node.js","PostgreSQL","Plaid","Stripe"],
    results: ['2M returns filed', 'Average refund $1,200', 'IRS e-file certified'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g89',
    title: 'CleanCity App',
    tag: 'CleanCity App',
    category: 'Mobile',
    color: '#F59E0B',
    year: '2022',
    thumbnail: '/images/portfolio/cleancityapp.jpg',
    desc: 'Civic cleanliness reporting app where citizens report issues and track municipal response times.',
    stack: ["React Native","Node.js","Firebase","Google Maps","Twilio"],
    results: ['500k+ reports filed', 'Used by 20 cities', 'Average response 4 hours'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g90',
    title: 'VR Property Tours',
    tag: 'VR Property Tours',
    category: 'Mobile',
    color: '#8B5CF6',
    year: '2022',
    thumbnail: '/images/portfolio/vrpropertyto.jpg',
    desc: 'VR-powered property tour app allowing remote buyers to virtually walk through properties.',
    stack: ["React Native","Three.js","Node.js","AWS","Matterport"],
    results: ['10k+ VR tours', '40% more overseas buyers', 'Integrated with Zillow'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g91',
    title: 'Wearable Health Coach',
    tag: 'Wearable Health Coach',
    category: 'Mobile',
    color: '#EF4444',
    year: '2022',
    thumbnail: '/images/portfolio/wearableheal.jpg',
    desc: 'AI health coaching app syncing with 20+ wearables to provide personalized wellness recommendations.',
    stack: ["React Native","HealthKit","Node.js","Firebase","TensorFlow"],
    results: ['20+ wearable integrations', '4.9★ rating', '12% better health outcomes'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'g92',
    title: 'JobSeeker Pro',
    tag: 'JobSeeker Pro',
    category: 'Mobile',
    color: '#06B6D4',
    year: '2022',
    thumbnail: '/images/portfolio/jobseekerpro.jpg',
    desc: 'AI job matching app with resume builder, salary negotiation coach, and interview prep simulator.',
    stack: ["React Native","Node.js","Elasticsearch","Firebase","OpenAI"],
    results: ['1M+ job seekers', '85% interview rate', 'AI salary benchmarking'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'h1',
    title: 'NFT Marketplace',
    tag: 'NFT Marketplace',
    category: 'Web App',
    color: '#A855F7',
    year: '2022',
    thumbnail: '/images/portfolio/nftmarketpla.jpg',
    desc: 'Web3 NFT marketplace with lazy minting, royalty splits, and creator analytics dashboard.',
    stack: ["React","Node.js","Solidity","IPFS","MetaMask"],
    results: ['$10M+ in NFT sales', 'Gas optimized minting', 'Multi-chain support'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'h2',
    title: 'EdTech Quiz Platform',
    tag: 'EdTech Quiz Platform',
    category: 'Web App',
    color: '#F59E0B',
    year: '2022',
    thumbnail: '/images/portfolio/edtechquizpl.jpg',
    desc: 'Gamified quiz platform for schools with live competitions, leaderboards, and teacher analytics.',
    stack: ["Next.js","Node.js","MongoDB","WebSocket","Redis"],
    results: ['5M+ quizzes taken', 'Used in 2k+ schools', 'COPPA compliant'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'h3',
    title: 'B2B Marketplace',
    tag: 'B2B Marketplace',
    category: 'Web App',
    color: '#06B6D4',
    year: '2022',
    thumbnail: '/images/portfolio/b2bmarketpla.jpg',
    desc: 'Wholesale B2B marketplace with bulk ordering, credit terms, and supplier verification.',
    stack: ["Next.js","Node.js","PostgreSQL","Elasticsearch","Stripe"],
    results: ['$200M GMV', '10k+ buyers', 'Net-30 credit built-in'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'h4',
    title: 'Smart Queue System',
    tag: 'Smart Queue System',
    category: 'Web App',
    color: '#22C55E',
    year: '2022',
    thumbnail: '/images/portfolio/smartqueuesy.jpg',
    desc: 'Digital queue management for banks and hospitals with SMS alerts and real-time wait time display.',
    stack: ["React","Node.js","Redis","WebSocket","Twilio"],
    results: ['90% queue reduction', 'Deployed in 50+ branches', '2M+ customers served'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'h5',
    title: 'Waste Recycling App',
    tag: 'Waste Recycling App',
    category: 'Mobile',
    color: '#10B981',
    year: '2022',
    thumbnail: '/images/portfolio/wasterecycli.jpg',
    desc: 'Citizen recycling app with gamified rewards, collection point locator, and impact tracking.',
    stack: ["React Native","Node.js","Firebase","Google Maps","Gamification"],
    results: ['500k+ users', '2M kg recycled', 'City government backed'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'h6',
    title: 'AI Resume Builder',
    tag: 'AI Resume Builder',
    category: 'SaaS',
    color: '#8B5CF6',
    year: '2022',
    thumbnail: '/images/portfolio/airesumebuil.jpg',
    desc: 'AI-powered resume builder with ATS optimization, role-specific templates, and LinkedIn sync.',
    stack: ["React","Node.js","OpenAI","MongoDB","PDF.js"],
    results: ['1M+ resumes created', '3× interview callbacks', 'ATS score guarantee'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'h7',
    title: 'Micro-Investment App',
    tag: 'Micro-Investment App',
    category: 'Mobile',
    color: '#22C55E',
    year: '2022',
    thumbnail: '/images/portfolio/micro-invest.jpg',
    desc: 'Round-up micro-investment app with fractional shares, ETF portfolios, and financial education.',
    stack: ["React Native","Node.js","Alpaca API","PostgreSQL","Plaid"],
    results: ['500k+ investors', '$50M invested', 'SEC registered'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'h8',
    title: 'Restaurant Review Platform',
    tag: 'Restaurant Review Platform',
    category: 'Web App',
    color: '#EF4444',
    year: '2022',
    thumbnail: '/images/portfolio/restaurantre.jpg',
    desc: 'AI-curated restaurant discovery with verified reviews, chef profiles, and exclusive dining experiences.',
    stack: ["Next.js","Node.js","MongoDB","OpenAI","Stripe"],
    results: ['100k+ reviews', '20k restaurants', '$5M in table bookings'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'h9',
    title: 'Warehouse Robotics Dashboard',
    tag: 'Warehouse Robotics Dashboard',
    category: 'Web App',
    color: '#3B82F6',
    year: '2022',
    thumbnail: '/images/portfolio/warehouserob.jpg',
    desc: 'Real-time control dashboard for warehouse robotics with task assignment, monitoring, and analytics.',
    stack: ["React","Node.js","WebSocket","PostgreSQL","ROS"],
    results: ['500+ robots managed', '99.7% pick accuracy', '40% faster fulfillment'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'h10',
    title: 'Mental Health SaaS',
    tag: 'Mental Health SaaS',
    category: 'SaaS',
    color: '#EC4899',
    year: '2022',
    thumbnail: '/images/portfolio/mentalhealth.jpg',
    desc: 'Corporate mental wellness platform with anonymous counseling, mood analytics, and HR insights.',
    stack: ["React","Node.js","PostgreSQL","OpenAI","HIPAA"],
    results: ['Used by 100+ companies', '40% stress reduction', 'HIPAA & GDPR'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'h11',
    title: 'Voice Commerce App',
    tag: 'Voice Commerce App',
    category: 'Mobile',
    color: '#F97316',
    year: '2022',
    thumbnail: '/images/portfolio/voicecommerc.jpg',
    desc: 'Voice-first shopping app for smart speakers and mobile with NLP order tracking and reordering.',
    stack: ["React Native","Node.js","Alexa SDK","Stripe","MongoDB"],
    results: ['300k orders via voice', '4.8★ App Store', 'Alexa & Google Home'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'h12',
    title: 'Drone Delivery System',
    tag: 'Drone Delivery System',
    category: 'Web App',
    color: '#22D3EE',
    year: '2022',
    thumbnail: '/images/portfolio/dronedeliver.jpg',
    desc: 'Drone delivery management platform with flight path planning, regulatory compliance, and parcel tracking.',
    stack: ["React","Node.js","PostgreSQL","FAA API","Mapbox"],
    results: ['10k+ drone deliveries', 'FAA LAANC approved', 'Sub-30 min delivery'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'h13',
    title: 'P2P Lending Platform',
    tag: 'P2P Lending Platform',
    category: 'Web App',
    color: '#6366F1',
    year: '2022',
    thumbnail: '/images/portfolio/p2plendingpl.jpg',
    desc: 'Peer-to-peer lending marketplace with credit scoring, automated repayments, and investor dashboards.',
    stack: ["React","Node.js","PostgreSQL","Stripe","Plaid"],
    results: ['$30M loans facilitated', '2.3% default rate', 'FCA registered'],
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'h14',
    title: 'Sports Betting Analytics',
    tag: 'Sports Betting Analytics',
    category: 'SaaS',
    color: '#EF4444',
    year: '2022',
    thumbnail: '/images/portfolio/sportsbettin.jpg',
    desc: 'Professional sports betting analytics SaaS with predictive models, line movement alerts, and bankroll tools.',
    stack: ["React","Python","PostgreSQL","FastAPI","Redis"],
    results: ['65% prediction accuracy', 'Used by 5k+ bettors', 'Real-time odds feeds'],
    liveUrl: '#',
    featured: false,
  },
];

const CATEGORIES = ['All', 'Web App', 'SaaS', 'Mobile', 'Demo'];

const STATS = [
  { value: '120+', label: 'Projects Shipped',    color: '#22C55E' },
  { value: '98%',  label: 'Client Retention',    color: '#3B82F6' },
  { value: '$50M+', label: 'Client Revenue Generated', color: '#A855F7' },
  { value: '30+',  label: 'Industries Served',   color: '#F59E0B' },
];

const TESTIMONIALS = [
  { name: 'Marcus Chen',   role: 'CTO, NovaTech',     avatar: 'MC', color: '#22C55E', quote: 'Axentralab built our entire SaaS platform in 8 weeks. The code quality, architecture decisions, and post-launch support were all exceptional.' },
  { name: 'Sarah Okonkwo', role: 'Founder, Buildly',  avatar: 'SO', color: '#3B82F6', quote: 'They don\'t just write code — they think like product engineers. Every decision was optimised for our users, not just the brief.' },
  { name: 'James Kowalski', role: 'VP Eng, Dataflow', avatar: 'JK', color: '#A855F7', quote: 'The AI automation they built saves us 200+ hours a month. ROI was visible within 30 days. Best technical investment we\'ve made.' },
];

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        overflow: 'hidden',
        transition: 'all 0.3s',
        animation: `fadeUp 0.5s ${index * 0.07}s ease both`,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${project.color}40`;
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = `0 20px 48px ${project.color}14`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top accent */}
      <div style={{ height: 3, background: `linear-gradient(90deg,${project.color},transparent)` }} />

      {/* Thumbnail */}
      <div style={{ position: 'relative', height: 200, background: `linear-gradient(135deg,${project.color}18,${project.color}06)`, overflow: 'hidden', flexShrink: 0 }}>
        {!imgErr ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 40, opacity: 0.35 }}>
              {project.category === 'Mobile' ? '📱' : project.category === 'SaaS' ? '📦' : project.category === 'Demo' ? '🎨' : '🌐'}
            </div>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: `${project.color}60`, letterSpacing: 2 }}>
              {project.tag.toUpperCase()}
            </span>
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(6,8,15,0.65) 100%)' }} />

        {/* Year badge */}
        <div style={{ position: 'absolute', top: 14, right: 14, padding: '3px 9px', background: 'rgba(6,8,15,0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6 }}>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>{project.year}</span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div style={{ position: 'absolute', top: 14, left: 14, padding: '3px 9px', background: project.color, borderRadius: 6 }}>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: '#000', fontWeight: 900, letterSpacing: 1 }}>★ FEATURED</span>
          </div>
        )}

        {/* Demo badge */}
        {project.isDemo && (
          <div style={{ position: 'absolute', top: 14, left: 14, padding: '3px 9px', background: 'rgba(0,0,0,0.7)', border: `1px solid ${project.color}60`, borderRadius: 6 }}>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: project.color, fontWeight: 900, letterSpacing: 1 }}>🎨 DEMO</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Tag */}
        <span style={{ display: 'inline-block', padding: '2px 9px', borderRadius: 6, background: `${project.color}10`, border: `1px solid ${project.color}25`, color: project.color, fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 12, alignSelf: 'flex-start' }}>
          {project.tag}
        </span>

        <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 18, fontWeight: 900, color: '#fff', margin: '0 0 10px', letterSpacing: -0.4 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: '0 0 16px', flex: 1 }}>
          {project.desc}
        </p>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 16 }}>
          {project.results.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: project.color, fontSize: 11, fontWeight: 900 }}>↑</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: "'Space Mono',monospace" }}>{r}</span>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 18 }}>
          {project.stack.map((s, i) => (
            <span key={i} style={{ padding: '3px 8px', borderRadius: 5, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: "'Space Mono',monospace" }}>{s}</span>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 8 }}>
          {project.liveUrl !== '#' ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, padding: '10px', background: `${project.color}15`, border: `1px solid ${project.color}30`, borderRadius: 10, color: project.color, fontSize: 13, fontWeight: 700, fontFamily: "'Sora',sans-serif", textDecoration: 'none', textAlign: 'center', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = `${project.color}25`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${project.color}15`; }}>
              {project.isDemo ? 'ডেমো দেখুন →' : 'View Live →'}
            </a>
          ) : (
            <div style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, color: 'rgba(255,255,255,0.25)', fontSize: 13, fontFamily: "'Space Mono',monospace", textAlign: 'center' }}>
              NDA Protected
            </div>
          )}
          <Link to="/contact"
            style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 700, fontFamily: "'Sora',sans-serif", textDecoration: 'none', textAlign: 'center', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; }}>
            {project.isDemo ? 'বানাবো?' : 'Similar?'}
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const PER_PAGE = 12;

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleCategoryChange = (cat) => { setActiveCategory(cat); setPage(1); };

  return (
    <div style={{ padding: '108px 5% 0', minHeight: '100vh' }}>
      <style>{`
        @keyframes fadeUp  { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
        @keyframes pulse   { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 900px;
          margin: 0 auto;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .cat-bar { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }

        @media (max-width: 700px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); }
          .stats-grid > div:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.06) !important; }
        }
        @media (max-width: 480px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <div style={{ textAlign: 'center', marginBottom: 64, animation: 'fadeUp 0.6s ease both' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px', borderRadius: 999, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.07)', marginBottom: 20 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: '#22C55E', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Selected Work</span>
        </div>
        <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(32px,5.5vw,68px)', fontWeight: 900, color: '#fff', margin: '0 0 18px', letterSpacing: -2.5, lineHeight: 1.04 }}>
          Work That{' '}
          <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.3)' }}>Speaks</span>
          <br />
          <span style={{ color: '#22C55E' }}>for Itself.</span>
        </h1>
        <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(14px,1.8vw,17px)', color: 'rgba(255,255,255,0.42)', maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.8 }}>
          Real products, real results. Every project below was shipped on time, on budget, and built to scale.
        </p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['🔒 NDA available','📦 Full source code','🚀 Production-ready','⚡ On-time delivery'].map((v, i) => (
            <span key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', fontFamily: "'Space Mono',monospace" }}>{v}</span>
          ))}
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 72 }}>
        <div className="stats-grid" style={{ background: 'rgba(255,255,255,0.01)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '28px 20px', borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 32, fontWeight: 900, color: s.color, letterSpacing: -1, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.32)', marginTop: 6, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5, textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Category Filter ── */}
      <div className="cat-bar" style={{ marginBottom: 36 }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => handleCategoryChange(cat)}
            style={{ padding: '8px 20px', borderRadius: 10, border: activeCategory === cat ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.08)', background: activeCategory === cat ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.03)', color: activeCategory === cat ? '#22C55E' : 'rgba(255,255,255,0.45)', fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.18s' }}>
            {cat}
            <span style={{ marginLeft: 7, padding: '1px 7px', borderRadius: 999, background: activeCategory === cat ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)', fontSize: 10, color: activeCategory === cat ? '#22C55E' : 'rgba(255,255,255,0.3)', fontFamily: "'Space Mono',monospace" }}>
              {cat === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── Demo Section Banner ── */}
      {activeCategory === 'Demo' && (
        <div style={{ maxWidth: 1100, margin: '0 auto 32px', background: 'linear-gradient(135deg,rgba(99,102,241,0.1),rgba(168,85,247,0.06))', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 16, padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 32 }}>🎨</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 16, color: '#fff', marginBottom: 4 }}>ডেমো ওয়েবসাইট কালেকশন</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>এই ডেমোগুলো আমাদের সার্ভিসের নমুনা — কর্পোরেট সাইট, ই-কমার্স, SaaS ড্যাশবোর্ড, ব্লগ, ল্যান্ডিং পেজ এবং LMS প্ল্যাটফর্ম। আপনার প্রজেক্টের জন্য কাস্টম সলিউশন বানাতে যোগাযোগ করুন।</div>
          </div>
          <Link to="/contact" style={{ padding: '10px 22px', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: 10, color: '#818CF8', fontSize: 13, fontWeight: 700, fontFamily: "'Sora',sans-serif", textDecoration: 'none', whiteSpace: 'nowrap' }}>
            আজই শুরু করুন →
          </Link>
        </div>
      )}

      {/* ── Project Grid ── */}
      <section style={{ marginBottom: 96 }}>
        <div className="portfolio-grid">
          {paginated.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 64, flexWrap: 'wrap' }}>
          <button onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({top: 0, behavior:'smooth'}); }} disabled={page === 1}
            style={{ padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: page === 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)', cursor: page === 1 ? 'default' : 'pointer', fontSize: 13, fontWeight: 600 }}>← Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 2)
            .reduce((acc, n, idx, arr) => { if (idx > 0 && n - arr[idx - 1] > 1) acc.push('…'); acc.push(n); return acc; }, [])
            .map((n, i) => n === '…'
              ? <span key={`e${i}`} style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>…</span>
              : <button key={n} onClick={() => { setPage(n); window.scrollTo({top: 0, behavior:'smooth'}); }}
                  style={{ width: 38, height: 38, borderRadius: 10, background: page === n ? '#22C55E' : 'rgba(255,255,255,0.04)', border: page === n ? 'none' : '1px solid rgba(255,255,255,0.09)', color: page === n ? '#000' : 'rgba(255,255,255,0.55)', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>{n}</button>
            )}
          <button onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({top: 0, behavior:'smooth'}); }} disabled={page === totalPages}
            style={{ padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: page === totalPages ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)', cursor: page === totalPages ? 'default' : 'pointer', fontSize: 13, fontWeight: 600 }}>Next →</button>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontFamily: "'Space Mono',monospace", marginLeft: 8 }}>
            {(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length}
          </span>
        </div>
      )}

      {/* ── Process Strip ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto 88px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 22, padding: 'clamp(32px,5vw,52px) clamp(24px,4vw,48px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, border: '1px solid #3B82F640', background: '#3B82F612', color: '#3B82F6', fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>How We Work</span>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 900, color: '#fff', marginTop: 12, letterSpacing: -0.8 }}>Every Project. Same Standard.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          {[
            { step: '01', icon: '🔍', title: 'Discovery Call',      desc: 'We scope the full project, agree on milestones, and sign an NDA before anything starts.' },
            { step: '02', icon: '📐', title: 'Technical Blueprint', desc: 'Detailed architecture doc, tech stack decisions, and a fixed-price quote — no surprises.' },
            { step: '03', icon: '⚙️', title: 'Sprint Delivery',     desc: 'Weekly demos on a live staging URL. You give feedback, we ship fast.' },
            { step: '04', icon: '🚀', title: 'Launch & Handover',   desc: 'Full documentation, repo access, and optional retainer support post-launch.' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '22px 18px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: 'rgba(255,255,255,0.18)', letterSpacing: 2, marginBottom: 12 }}>{s.step}</div>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 7 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.65 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ marginBottom: 88 }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, border: '1px solid #ffffff15', background: '#ffffff08', color: 'rgba(255,255,255,0.5)', fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: 'uppercase' }}>Client Feedback</span>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 900, color: '#fff', marginTop: 12, letterSpacing: -0.8 }}>What Clients Say About the Work</h2>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: 28, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${t.color}30`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ fontSize: 28, color: t.color, fontFamily: 'Georgia,serif', lineHeight: 1, marginBottom: 14, opacity: 0.7 }}>"</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 22 }}>{t.quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${t.color}20`, border: `1px solid ${t.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 12, color: t.color }}>{t.avatar}</div>
                <div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: '#fff' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack Marquee ── */}
      <section style={{ padding: '36px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', marginBottom: 88 }}>
        <div style={{ display: 'flex', gap: 48, animation: 'marquee 22s linear infinite', width: 'max-content' }}>
          {[...['React','Next.js','Node.js','MongoDB','PostgreSQL','Docker','AWS','Python','TypeScript','Kubernetes','Redis','Terraform','Figma','LangChain','Stripe','GraphQL'], ...['React','Next.js','Node.js','MongoDB','PostgreSQL','Docker','AWS','Python','TypeScript','Kubernetes','Redis','Terraform','Figma','LangChain','Stripe','GraphQL']].map((t, i) => (
            <span key={i} style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.13)', letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{t}</span>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', paddingBottom: 100 }}>
        <div style={{ position: 'relative', background: 'linear-gradient(135deg,rgba(34,197,94,0.09) 0%,rgba(59,130,246,0.06) 100%)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 24, padding: 'clamp(48px,6vw,80px) clamp(24px,5%,64px)', textAlign: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(34,197,94,0.07),transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, border: '1px solid #22C55E40', background: '#22C55E10', color: '#22C55E', fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Start a Project</span>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(26px,4.5vw,52px)', fontWeight: 900, color: '#fff', margin: '18px auto 16px', letterSpacing: -1.5, lineHeight: 1.08, maxWidth: 580 }}>
              Want Your Project<br /><span style={{ color: '#22C55E' }}>In This Portfolio?</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, maxWidth: 460, margin: '0 auto 34px', lineHeight: 1.75 }}>
              We build ambitious products for ambitious founders. Tell us what you're building and we'll respond within 24 hours with a proposal.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
              <Link to="/contact" className="btn-primary" style={{ padding: '15px 36px', background: '#22C55E', color: '#000', fontSize: 15, fontWeight: 700, borderRadius: 12, textDecoration: 'none', display: 'inline-block' }}>
                Start a Project →
              </Link>
              <Link to="/services" className="btn-outline" style={{ padding: '15px 28px', fontSize: 15, borderRadius: 12, textDecoration: 'none', display: 'inline-block' }}>
                Browse Services
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['✓ Free consultation', '✓ Fixed-price quotes', '✓ NDA on request'].map((t, i) => (
                <span key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontFamily: "'Space Mono',monospace" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}