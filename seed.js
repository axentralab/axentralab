/**
 * Seed script — run once to populate DB with services and admin user
 * Usage:  node backend/seed.js
 */

require('dotenv').config({ path: __dirname + '/../backend/.env' });
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) { console.error('❌  Set MONGO_URI in backend/.env'); process.exit(1); }

const userSchema = new mongoose.Schema({ name:String, email:{ type:String, unique:true }, password:{ type:String, select:false }, role:{ type:String, default:'client' }, company:String, phone:String, isActive:{ type:Boolean, default:true } }, { timestamps:true });
const serviceSchema = new mongoose.Schema({ title:String, slug:{ type:String, unique:true }, category:String, icon:String, color:String, description:String, features:[String], plans:[{ name:String, price:Number, billing:String, features:[String] }], isActive:{ type:Boolean, default:true }, order:Number }, { timestamps:true });
const blogSchema = new mongoose.Schema({ title:{ type:String, required:true }, slug:{ type:String, required:true, unique:true }, content:{ type:String, required:true }, excerpt:{ type:String, default:'' }, category:{ type:String, default:'General' }, tags:[String], author:{ type:mongoose.Schema.Types.ObjectId, ref:'User' }, cover:{ type:String, default:'' }, published:{ type:Boolean, default:false }, views:{ type:Number, default:0 } }, { timestamps:true });

const User    = mongoose.models.User    || mongoose.model('User',    userSchema);
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogSchema);

const SERVICES = [
  { title:'AI Automation',    slug:'ai-automation',    category:'Automation', icon:'⚡', color:'#22C55E', order:1, description:'Chatbots, workflow automation, CRM integration, and intelligent AI agents.', features:['AI chatbots','Workflow automation','CRM integration','AI agents'], plans:[{ name:'Starter', price:499, billing:'one-time', features:['1 chatbot','Basic workflow','Email support'] },{ name:'Pro', price:999, billing:'one-time', features:['5 chatbots','Advanced workflows','Priority support','CRM integration'] },{ name:'Enterprise', price:2499, billing:'one-time', features:['Unlimited bots','Custom AI agents','Dedicated support','Full CRM suite'] }] },
  { title:'Web Development',  slug:'web-development',  category:'Development', icon:'🌐', color:'#3B82F6', order:2, description:'MERN apps, SaaS platforms, dashboards, and enterprise-grade websites.', features:['React/Next.js','Node.js backend','MongoDB','Deployment'], plans:[{ name:'Landing Page', price:799, billing:'one-time', features:['5 sections','Responsive','SEO ready','1 month support'] },{ name:'Web App', price:2999, billing:'one-time', features:['Full MERN stack','Auth system','Dashboard','3 months support'] },{ name:'SaaS Platform', price:7999, billing:'one-time', features:['Multi-tenant','Stripe billing','Admin panel','6 months support'] }] },
  { title:'Cybersecurity',    slug:'cybersecurity',    category:'Security', icon:'🛡️', color:'#EF4444', order:3, description:'Vulnerability scanning, penetration testing, malware removal, security audits.', features:['Pen testing','Vuln scanning','Security audit','Malware removal'], plans:[{ name:'Basic Audit', price:399, billing:'one-time', features:['Surface scan','Report','Fix recommendations'] },{ name:'Full Pentest', price:1499, billing:'one-time', features:['Deep pen test','OWASP coverage','Detailed report','Fix support'] },{ name:'Ongoing Monitor', price:299, billing:'monthly', features:['24/7 monitoring','Instant alerts','Monthly reports','Incident response'] }] },
  { title:'DevOps & Cloud',   slug:'devops-cloud',     category:'Infrastructure', icon:'☁️', color:'#8B5CF6', order:4, description:'CI/CD pipelines, cloud automation, containerization, infrastructure monitoring.', features:['CI/CD','Docker/K8s','Cloud setup','Monitoring'], plans:[{ name:'Setup', price:699, billing:'one-time', features:['CI/CD pipeline','Docker setup','Basic monitoring'] },{ name:'Full DevOps', price:1999, billing:'one-time', features:['Full infra setup','Auto-scaling','Advanced monitoring','Runbooks'] },{ name:'Managed', price:499, billing:'monthly', features:['Ongoing management','24/7 support','Scaling','Incident response'] }] },
  { title:'SaaS Development', slug:'saas-development', category:'Development', icon:'📦', color:'#F59E0B', order:5, description:'Full-cycle SaaS product design, development, and deployment.', features:['Full dev cycle','Subscription billing','Multi-tenant','Analytics'], plans:[{ name:'MVP', price:4999, billing:'one-time', features:['Core features','Auth & billing','Basic analytics','3 months support'] },{ name:'Full SaaS', price:14999, billing:'one-time', features:['All features','Admin dashboard','Advanced analytics','6 months support','Dedicated PM'] }] },
  { title:'IT Consulting',    slug:'it-consulting',    category:'Consulting', icon:'💡', color:'#06B6D4', order:6, description:'Architecture planning, digital transformation, tech stack advisory.', features:['Architecture','Digital transformation','Tech stack advice','Roadmapping'], plans:[{ name:'1-hour Call', price:149, billing:'one-time', features:['60 min consultation','Written summary','Action items'] },{ name:'Deep Dive', price:799, billing:'one-time', features:['Full day workshop','Architecture doc','Tech roadmap','Follow-up call'] },{ name:'Retainer', price:999, billing:'monthly', features:['10 hours/month','Priority access','Ongoing guidance','Slack access'] }] },
];

const BLOG_POSTS = [
  { title:'Getting Started with AI Automation', slug:'getting-started-ai-automation', category:'AI Automation', excerpt:'Learn how to leverage AI automation to streamline your business processes.', content:'AI automation is transforming how businesses operate. In this guide, we explore the fundamentals of AI automation, from chatbots to workflow integration. Discover how companies like yours are saving time and resources by automating repetitive tasks.\n\n## Key Benefits\n- 40% reduction in operational costs\n- 24/7 customer support availability\n- Improved data accuracy\n- Faster decision-making\n\n## Getting Started\nBegin with a simple chatbot to handle customer inquiries, then expand to full workflow automation as your needs grow.', tags:['AI','automation','beginner'], published:true, views:0 },
  { title:'Cybersecurity Best Practices for 2025', slug:'cybersecurity-best-practices-2025', category:'Cybersecurity', excerpt:'Essential security practices every business should implement this year.', content:'Cybersecurity threats are evolving faster than ever. Here are the critical security measures your organization needs:\n\n## Must-Have Security Practices\n1. **Multi-Factor Authentication (MFA)** - Reduce unauthorized access by 99%\n2. **Regular Security Audits** - Identify vulnerabilities before attackers do\n3. **Employee Training** - Your team is your first line of defense\n4. **Backup & Recovery** - Always have a recovery plan\n\n## Testing Your Security\nPenetration testing helps identify weaknesses in your system. We recommend quarterly tests for critical infrastructure.', tags:['security','best-practices','2025'], published:true, views:0 },
  { title:'Building Scalable Web Applications', slug:'building-scalable-web-applications', category:'Web Dev', excerpt:'Architecture patterns and best practices for creating web apps that grow with your business.', content:'Scalability should be built into your architecture from day one. This guide covers proven patterns used by companies handling millions of users.\n\n## Scalability Fundamentals\n- **Database Design** - Proper indexing and sharding\n- **Caching Strategies** - Reduce database load\n- **Load Balancing** - Distribute traffic efficiently\n- **Microservices** - Break monoliths into manageable pieces\n\n## Real-World Example\nOur recent project scaled from 1K to 1M users in 6 months using these principles. Learn what worked for us and what didn\'t.', tags:['web-dev','scalability','architecture'], published:true, views:0 },
  { title:'DevOps & Container Revolution', slug:'devops-container-revolution', category:'DevOps', excerpt:'How containers and DevOps practices are reshaping software deployment.', content:'Docker and Kubernetes have revolutionized how we deploy applications. Here\'s why every development team should embrace containerization.\n\n## Why Containers Matter\n- **Consistency** - Same environment everywhere\n- **Speed** - Deploy in seconds, not hours\n- **Scalability** - Auto-scaling made easy\n- **Cost** - Better resource utilization\n\n## Your DevOps Journey\nStart with Docker for local development, move to CI/CD pipelines, then scale with Kubernetes when needed.', tags:['devops','docker','kubernetes'], published:true, views:0 },
  { title:'Choosing the Right SaaS Stack', slug:'choosing-right-saas-stack', category:'SaaS Dev', excerpt:'Strategic decisions that will impact your SaaS product\'s success.', content:'Building a SaaS product requires choosing the right technology stack. The wrong choices can cost you millions later.\n\n## Stack Considerations\n- **Frontend** - React, Vue, or Angular?\n- **Backend** - Node.js, Python, or Go?\n- **Database** - SQL or NoSQL?\n- **Infrastructure** - AWS, GCP, or Azure?\n\n## Our Recommendation\nWe recommend MERN stack for most SaaS applications - mature, flexible, and well-supported community.', tags:['saas','stack','architecture'], published:true, views:0 },
];


async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅  Connected to MongoDB');

    // Services
    await Service.deleteMany({});
    await Service.insertMany(SERVICES);
    console.log(`✅  Seeded ${SERVICES.length} services`);

    // Admin user
    const user = await User.findOne({ email: 'admin@axentralab.com' });
    if (!user) {
      const hash = await bcrypt.hash('admin123!', 12);
      await User.create({ name:'Admin User', email:'admin@axentralab.com', password: hash, role:'admin', company:'Axentralab' });
      console.log('✅  Admin user created  →  admin@axentralab.com / admin123!');
    } else {
      console.log('ℹ️   Admin user already exists');
    }

    // Blog posts
    await BlogPost.deleteMany({});
    const adminUser = await User.findOne({ email: 'admin@axentralab.com' });
    const blogPostsWithAuthor = BLOG_POSTS.map(post => ({ ...post, author: adminUser._id }));
    await BlogPost.insertMany(blogPostsWithAuthor);
    console.log(`✅  Seeded ${BLOG_POSTS.length} blog posts`);

    console.log('\n🎉  Seed complete!\n');
    process.exit(0);
  } catch (err) {
    console.error('❌  Seed error:', err.message);
    process.exit(1);
  }
}

seed();
