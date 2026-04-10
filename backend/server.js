const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { initializeScheduler } = require('./utils/scheduler');

dotenv.config();
connectDB();

const app = express();

// Security
app.use(helmet());

// CORS - Allow multiple origins
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.NODE_ENV === 'production' 
    ? process.env.PRODUCTION_URL 
    : null,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      const msg = 'CORS policy: this origin is not allowed';
      return callback(new Error(msg), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parser (raw for Stripe webhook) - MUST be before rate limiter
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting (after webhook to avoid rate-limiting webhook)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use('/api/', limiter);

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes - Use dev routes if MongoDB not connected
const authRoutes = !process.env.MONGO_URI ? require('./routes/auth-dev') : require('./routes/auth');

app.use('/api/auth',     authRoutes);
app.use('/api/users',    require('./routes/users'));
app.use('/api/services', require('./routes/services'));
app.use('/api/orders',   require('./routes/orders'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/leads',    require('./routes/leads'));
app.use('/api/quotes',   require('./routes/quotes'));
app.use('/api/chatbot',  require('./routes/chatbot'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/blog',     require('./routes/blog'));
app.use('/api/referrals', require('./routes/referrals'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }));

// 404
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log(`🚀 Server running on port ${PORT}`);
  
  if (!process.env.MONGO_URI) {
    console.log('📝 Using Development Auth (In-Memory Users)');
    console.log('   ✅ Test Login: admin@axentralab.com / admin123!');
  } else {
    console.log('📦 Using MongoDB Authentication');
  }
  
  console.log('='.repeat(60) + '\n');
  
  // Initialize AI Automation Scheduler
  if (process.env.ENABLE_AUTOMATION !== 'false') {
    initializeScheduler();
  }
});
