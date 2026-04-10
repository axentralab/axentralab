# 🚀 Development Setup Guide

## Running Without MongoDB (Development Mode)

### ✅ Current Setup
Your project is configured to run **without MongoDB** in development mode.

### 🏃 Quick Start

**1. Start Backend (Terminal 1):**
```bash
cd backend
npm install  # First time only
npm start
```

Expected output:
```
⚠️  MONGO_URI not set - DB connection skipped (development mode)
✅  Express server running on http://localhost:5000
```

**2. Start Frontend (Terminal 2):**
```bash
cd frontend
npm install  # First time only
npm start
```

Frontend will open at `http://localhost:3000`

**3. Login/Register:**
- Go to http://localhost:3000
- **Register** for a new account OR
- **Login** with test credentials (after seed):
  - Email: `admin@axentralab.com`
  - Password: `admin123!`

**4. Access Dashboard:**
- After login, you'll see the Dashboard
- Click **💰 Referrals** in sidebar to see referral page

---

## Options for Mock Data

### Option 1: Run Mock API Server (Recommended for Frontend Work)
```bash
node dev-seed.js
```

This starts a simple Express server on port 5000 with mock API endpoints:
- GET `/api/services` - 4 services
- GET `/api/users` - 2 users
- GET `/api/orders` - 1 order
- GET `/api/referrals/stats` - Referral statistics
- GET `/api/blog` - 2 blog posts
- GET `/api/leads` - 2 leads

**Perfect for:** Frontend development, testing UI without backend logic

### Option 2: In-Memory Mock Data (For Testing)
Place mock data from `backend/config/mock-db.js` in your controllers to simulate database responses.

---

## Switching to Real MongoDB

### Step 1: Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Download from: https://www.mongodb.com/try/download/community

# On Windows, MongoDB runs as a service after install
# On Mac: brew install mongodb-community
# On Linux: sudo apt-get install mongodb

# Verify MongoDB is running:
mongosh  # Should connect successfully
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/axentralab?retryWrites=true
   ```

### Step 2: Uncomment MongoDB in `.env`

Edit `backend/.env`:
```env
# Change this:
# MONGO_URI=mongodb://localhost:27017/axentralab

# To this:
MONGO_URI=mongodb://localhost:27017/axentralab

# Or for MongoDB Atlas:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/axentralab
```

### Step 3: Seed Database with Sample Data

```bash
cd backend

# First install bcryptjs if not already installed:
npm install bcryptjs

# Run seed script:
node ../seed.js
```

Expected output:
```
✅  Connected to MongoDB
✅  Seeded 6 services
✅  Admin user created  →  admin@axentralab.com / admin123!
✅  Seeded 5 blog posts
🎉  Seed complete!
```

### Step 4: Restart Backend

```bash
npm start
```

Backend should show:
```
✅ MongoDB connected: localhost:27017
✅  Express server running on port 5000
```

---

## Environment Variables Explained

```env
# Server
PORT=5000                           # Backend port
NODE_ENV=development                # development, production, or test

# Database (Comment out for dev, uncomment for production)
MONGO_URI=mongodb://localhost:27017/axentralab

# Authentication
JWT_SECRET=your_secret_key          # Change in production!
JWT_EXPIRE=7d                       # Token expiration

# Payment (Stripe - optional)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Client
CLIENT_URL=http://localhost:3000    # Frontend URL for CORS

# Email (SendGrid - optional)
SENDGRID_API_KEY=SG...
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@axentralab.com

# AI Services (optional)
OPENAI_API_KEY=sk-...
LANGCHAIN_API_KEY=ls_...

# Telegram Bot (optional)
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_ADMIN_CHAT_ID=123456789

# Redis (optional, for job queues)
REDIS_URL=redis://localhost:6379
```

---

## Troubleshooting

### Issue: Backend crashes with "Route requires callback"
- **Cause:** Middleware not properly imported
- **Solution:** Already fixed! Update to latest code:
  ```bash
  git pull origin main
  ```

### Issue: Can't connect to MongoDB
- **Check 1:** Is MongoDB running?
  ```bash
  mongosh  # Should connect without errors
  ```
- **Check 2:** Is connection string correct in `.env`?
- **Check 3:** For Atlas, is your IP whitelisted?

### Issue: Frontend shows "401 Unauthorized"
- **Cause:** Token not properly sent with requests
- **Solution:** Already fixed! Clear cache and reload:
  ```bash
  # Delete browser cache or
  localStorage.removeItem('ax_token');
  localStorage.removeItem('ax_user');
  ```

### Issue: Port 5000 already in use
```bash
# Find and kill process on port 5000
On Windows (PowerShell):
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

On Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

---

## API Endpoints (When Backend Running)

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/profile
PUT    /api/auth/password
```

### Services
```
GET    /api/services
GET    /api/services/:id
POST   /api/services (admin)
PUT    /api/services/:id (admin)
```

### Referrals ⭐ (New)
```
GET    /api/referrals/code      (Get user's referral code)
GET    /api/referrals/stats     (Get referral stats)
GET    /api/referrals/history   (Get referral history)
POST   /api/referrals/verify    (Verify referral code)
GET    /api/referrals/all       (Admin: all referrals)
POST   /api/referrals/complete  (Admin: mark as completed)
```

### Orders
```
GET    /api/orders
POST   /api/orders
GET    /api/orders/:id
```

### Blog
```
GET    /api/blog
GET    /api/blog/:id
POST   /api/blog (admin)
```

### More...
See `backend/routes/` for complete documentation.

---

## Development Workflow

### Day 1: Frontend Development (No Backend)
```bash
# Start mock API
node dev-seed.js

# Start frontend
cd frontend && npm start

# Frontend calls http://localhost:5000/api/* endpoints
```

### Day 2: Connect Real Backend
```bash
# Start full backend (with MongoDB)
cd backend && npm start

# Start frontend
cd frontend && npm start

# Now frontend uses real data & backend logic
```

### Day 3: Add MongoDB
```bash
# Uncomment MONGO_URI in .env
# Run seed script: node seed.js
# Restart backend: npm start
```

---

## Next Steps

✅ **Done:**
- Backend setup without MongoDB
- Frontend dashboard
- Referral system (backend + frontend)

🔄 **Next:**
1. Choose: Mock API or Real MongoDB?
2. Test login → Dashboard → Referrals page
3. When ready: Switch to real MongoDB with seed data

---

## Resources

- **React Docs:** https://react.dev
- **Express Docs:** https://expressjs.com
- **MongoDB Docs:** https://docs.mongodb.com
- **Mongoose Docs:** https://mongoosejs.com

---

**Questions or issues? Check the logs and error messages carefully!**
