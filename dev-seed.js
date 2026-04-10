/**
 * Development Seed — Load mock data for testing without MongoDB
 * Usage: node dev-seed.js
 * 
 * This creates in-memory mock data for all API endpoints
 * Perfect for frontend development before connecting to real MongoDB
 */

require('dotenv').config({ path: __dirname + '/backend/.env' });

// Mock Data Store (in-memory)
const mockDB = {
  users: [
    {
      _id: '507f1f77bcf86cd799439011',
      name: 'Admin User',
      email: 'admin@axentralab.com',
      password: 'hashed_password_admin123',
      role: 'admin',
      company: 'Axentralab',
      phone: '+8801700000000',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      _id: '507f1f77bcf86cd799439012',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password_john',
      role: 'client',
      company: 'Tech Corp',
      phone: '+8801600000000',
      isActive: true,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    },
  ],
  
  services: [
    {
      _id: '507f1f77bcf86cd799439101',
      title: 'AI Automation',
      slug: 'ai-automation',
      category: 'Automation',
      icon: '⚡',
      color: '#22C55E',
      description: 'Chatbots, workflow automation, CRM integration, and intelligent AI agents.',
      features: ['AI chatbots', 'Workflow automation', 'CRM integration', 'AI agents'],
      plans: [
        { name: 'Starter', price: 499, billing: 'one-time', features: ['1 chatbot', 'Basic workflow', 'Email support'] },
        { name: 'Pro', price: 999, billing: 'one-time', features: ['5 chatbots', 'Advanced workflows', 'Priority support', 'CRM integration'] },
        { name: 'Enterprise', price: 2499, billing: 'one-time', features: ['Unlimited bots', 'Custom AI agents', 'Dedicated support', 'Full CRM suite'] },
      ],
      isActive: true,
      order: 1,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      _id: '507f1f77bcf86cd799439102',
      title: 'Web Development',
      slug: 'web-development',
      category: 'Development',
      icon: '🌐',
      color: '#3B82F6',
      description: 'MERN apps, SaaS platforms, dashboards, and enterprise-grade websites.',
      features: ['React/Next.js', 'Node.js backend', 'MongoDB', 'Deployment'],
      plans: [
        { name: 'Landing Page', price: 799, billing: 'one-time', features: ['5 sections', 'Responsive', 'SEO ready', '1 month support'] },
        { name: 'Web App', price: 2999, billing: 'one-time', features: ['Full MERN stack', 'Auth system', 'Dashboard', '3 months support'] },
        { name: 'SaaS Platform', price: 7999, billing: 'one-time', features: ['Multi-tenant', 'Stripe billing', 'Admin panel', '6 months support'] },
      ],
      isActive: true,
      order: 2,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      _id: '507f1f77bcf86cd799439103',
      title: 'Cybersecurity',
      slug: 'cybersecurity',
      category: 'Security',
      icon: '🛡️',
      color: '#EF4444',
      description: 'Vulnerability scanning, penetration testing, malware removal, security audits.',
      features: ['Pen testing', 'Vuln scanning', 'Security audit', 'Malware removal'],
      plans: [
        { name: 'Basic Audit', price: 399, billing: 'one-time', features: ['Surface scan', 'Report', 'Fix recommendations'] },
        { name: 'Full Pentest', price: 1499, billing: 'one-time', features: ['Deep pen test', 'OWASP coverage', 'Detailed report', 'Fix support'] },
        { name: 'Ongoing Monitor', price: 299, billing: 'monthly', features: ['24/7 monitoring', 'Instant alerts', 'Monthly reports', 'Incident response'] },
      ],
      isActive: true,
      order: 3,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
  ],

  orders: [
    {
      _id: '507f1f77bcf86cd799439201',
      orderNumber: 'ORD-2024-001',
      userId: '507f1f77bcf86cd799439012',
      items: [
        { serviceTitle: 'AI Automation - Starter', price: 499, plan: 'Starter' },
      ],
      total: 499,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-02-15'),
    },
  ],

  referrals: [
    {
      _id: '507f1f77bcf86cd799439301',
      referrer: '507f1f77bcf86cd799439011',
      referee: '507f1f77bcf86cd799439012',
      referralCode: 'ADMIN001',
      referralLink: 'http://localhost:3000/register?ref=ADMIN001',
      status: 'activated',
      commissionPercentage: 10,
      commissionAmount: 49.9,
      orderValue: 499,
      activatedAt: new Date('2024-02-01'),
      completedAt: new Date('2024-02-15'),
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-02-15'),
    },
  ],

  blogPosts: [
    {
      _id: '507f1f77bcf86cd799439401',
      title: 'Getting Started with AI Automation',
      slug: 'getting-started-ai-automation',
      content: 'AI automation is transforming how businesses operate...',
      excerpt: 'Learn how to leverage AI automation to streamline your business processes.',
      category: 'AI Automation',
      tags: ['AI', 'automation', 'beginner'],
      author: '507f1f77bcf86cd799439011',
      cover: '',
      published: true,
      views: 150,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
    },
  ],

  leads: [
    {
      _id: '507f1f77bcf86cd799439501',
      name: 'Jane Smith',
      email: 'jane@company.com',
      phone: '+8801700000001',
      company: 'Innovation Inc',
      service: 'Web Development',
      budget: 5000,
      timeline: 'Q1 2024',
      message: 'Looking for MERN stack development',
      status: 'new',
      score: 85,
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date('2024-02-20'),
    },
  ],
};

// Express server to serve mock API
const express = require('express');
const app = express();
app.use(express.json());

// Mock API Routes (basic examples)
app.get('/api/services', (req, res) => {
  res.json({ success: true, data: mockDB.services });
});

app.get('/api/users', (req, res) => {
  res.json({ success: true, data: mockDB.users });
});

app.get('/api/orders', (req, res) => {
  res.json({ success: true, data: mockDB.orders });
});

app.get('/api/referrals/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      totalReferrals: mockDB.referrals.length,
      activeReferrals: mockDB.referrals.filter(r => r.status === 'activated').length,
      completedReferrals: mockDB.referrals.filter(r => r.status === 'completed').length,
      totalEarnings: mockDB.referrals.reduce((sum, r) => sum + (r.commissionAmount || 0), 0),
    },
  });
});

app.get('/api/blog', (req, res) => {
  res.json({ success: true, data: mockDB.blogPosts });
});

app.get('/api/leads', (req, res) => {
  res.json({ success: true, data: mockDB.leads });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀  DEVELOPMENT SERVER (Mock Data - No MongoDB)');
  console.log('='.repeat(60));
  console.log(`✅  Server running on http://localhost:${PORT}`);
  console.log('\n📊  Mock Data Loaded:');
  console.log(`   • ${mockDB.users.length} users`);
  console.log(`   • ${mockDB.services.length} services`);
  console.log(`   • ${mockDB.orders.length} orders`);
  console.log(`   • ${mockDB.referrals.length} referrals`);
  console.log(`   • ${mockDB.blogPosts.length} blog posts`);
  console.log(`   • ${mockDB.leads.length} leads`);
  console.log('\n📝  Admin Login Credentials:');
  console.log('   Email: admin@axentralab.com');
  console.log('   Password: admin123!');
  console.log('\n💡  Tip: When ready for real MongoDB, uncomment MONGO_URI in .env');
  console.log('='.repeat(60) + '\n');
});
