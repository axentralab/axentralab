# 🚀 AXENTRALAB - FINAL DEPLOYMENT GUIDE

**Last Updated:** April 10, 2026  
**Status:** ✅ READY FOR DEPLOYMENT  
**All Critical Issues Fixed:** ✅

---

## 📋 QUICK START - LOCAL TESTING

### 1. **Setup Backend**
```bash
cd backend
npm install
node server.js
```
✅ Backend running on `http://localhost:5000`

### 2. **Setup Frontend**
```bash
cd frontend
npm install
npm start
```
✅ Frontend running on `http://localhost:3000`

### 3. **Test Referral System**
1. Go to `http://localhost:3000/register`
2. Enter referral code or URL: `http://localhost:3000/register?ref=YOUR_CODE`
3. User should see "✨ Registered with referral link!" message
4. Check dashboard → referrals page

---

## 🔧 ENVIRONMENT SETUP

### Backend `.env` Configuration

All required variables are in `backend/.env`. Update these:

```env
# CRITICAL - MUST UPDATE
MONGO_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/axentralab
JWT_SECRET=your_unique_secret_key_min_32_chars
STRIPE_SECRET_KEY=sk_test_xxxxx (get from Stripe dashboard)
OPENAI_API_KEY=sk-xxxxx (get from OpenAI)

# OPTIONAL BUT RECOMMENDED
SENDGRID_API_KEY=SG.xxxxx (for email)
EMAIL_FROM=noreply@yourdomain.com
TELEGRAM_BOT_TOKEN=xxxxx (for notifications)
```

### Frontend `.env` Configuration

Update `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
REACT_APP_URL=http://localhost:3000
```

---

## 🧪 LOCAL TESTING CHECKLIST

### Test Referral Registration Flow
```bash
# Terminal 1: Start backend
cd backend && npm run dev

# Terminal 2: Start frontend
cd frontend && npm start

# In browser:
# 1. Visit: http://localhost:3000/register
# 2. Try registering with referral code (if you have one)
# 3. Check: console for any errors
# 4. Verify: user created in MongoDB
# 5. Check: /api/referrals/my-referrals endpoint
```

### Test API Endpoints
```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"123456","company":"Acme","referralCode":""}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'
```

---

## ☁️ PRODUCTION DEPLOYMENT

### Option 1: Deploy Backend to Railway.app

1. **Create Railway Account** → https://railway.app
2. **Connect GitHub** → Push code to GitHub
3. **Create New Project**
4. **Add Variables:**
   ```
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=your_secret
   STRIPE_SECRET_KEY=sk_xxx
   NODE_ENV=production
   PORT=5000
   (all other .env variables)
   ```
5. **Deploy** → Railway auto-deploys on push
6. **Get Backend URL** → `https://your-railway-project.railway.app`

### Option 2: Deploy Backend to Heroku

1. **Create Heroku Account** → https://heroku.com
2. **Install Heroku CLI**
3. **Login:**
   ```bash
   heroku login
   ```
4. **Create App:**
   ```bash
   heroku create your-app-name
   ```
5. **Set Environment Variables:**
   ```bash
   heroku config:set MONGO_URI=mongodb+srv://...
   heroku config:set JWT_SECRET=your_secret
   heroku config:set NODE_ENV=production
   (set all other variables)
   ```
6. **Deploy:**
   ```bash
   git push heroku main
   ```

### Option 3: Deploy Backend to Render.com ⭐ RECOMMENDED

1. **Create Render Account** → https://render.com
2. **Connect GitHub Repository**
3. **Import from YAML**
   - Click "Build and deploy from Git"
   - Select your repository
   - Click "Connect"
4. **Render will auto-detect render.yaml** → Deploy with correct config
5. **If manual setup needed:**
   - **Root Directory:** `.` (use root folder)
   - **Build Command:** `npm install`
   - **Start Command:** `node backend/server.js`
   - **Plan:** Free or Starter
   - **Region:** Oregon or US

6. **Add Environment Variables:**
   ```
   MONGO_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/axentralab
   JWT_SECRET=your_unique_secret_key_min_32_chars
   NODE_ENV=production
   PORT=5000
   STRIPE_SECRET_KEY=sk_test_xxxxx
   OPENAI_API_KEY=sk-xxxxx
   SENDGRID_API_KEY=SG.xxxxx (optional)
   TELEGRAM_BOT_TOKEN=xxxxx (optional)
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

7. **Deploy** → Render auto-deploys on Git push

**✅ Note:** `render.yaml` is already created in your project root. Render will use it automatically!

---

## 🎯 Frontend Deployment to Vercel

### Option 1: Deploy from Terminal

```bash
npm install -g vercel
vercel login
cd frontend
vercel
```

### Option 2: Deploy from GitHub

1. **Push code to GitHub**
2. **Go to Vercel** → https://vercel.com/dashboard
3. **Import Project** → Select your GitHub repo
4. **Configure:**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
5. **Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app/api
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_xxx
   REACT_APP_URL=https://your-frontend-url.vercel.app
   ```
6. **Deploy** → Vercel auto-deploys

---

## 📊 Production Checklist

- [ ] **Backend Ready?**
  - [ ] MongoDB Atlas connected
  - [ ] All environment variables set
  - [ ] Rate limiting enabled
  - [ ] CORS properly configured
  - [ ] Health check endpoint working

- [ ] **Frontend Ready?**
  - [ ] `npm run build` successful
  - [ ] No console errors/warnings
  - [ ] API URL points to production backend
  - [ ] Stripe publishable key is production key
  - [ ] Referral system tested

- [ ] **Database**
  - [ ] MongoDB Atlas cluster created
  - [ ] Connection string in .env
  - [ ] All models created
  - [ ] Indexes created for performance

- [ ] **Security**
  - [ ] JWT_SECRET is strong & random (32+ chars)
  - [ ] STRIPE keys are production keys (not test)
  - [ ] CORS origins are correct
  - [ ] Rate limiting enabled
  - [ ] HTTPS enforced

- [ ] **Stripe Setup**
  - [ ] Webhook configured
  - [ ] Production keys set
  - [ ] Test mode disabled
  - [ ] Payment success page configured

- [ ] **Email Service**
  - [ ] SendGrid or Resend configured
  - [ ] Email templates verified
  - [ ] Sender email address correct
  - [ ] SPF/DKIM records added

- [ ] **Monitoring**
  - [ ] Error tracking (Sentry/etc) setup
  - [ ] Uptime monitoring enabled
  - [ ] Logs configured
  - [ ] Alerts enabled

---

## 📈 What Was Fixed

### ✅ Code Changes Made

1. **RegisterPage.js (Frontend)**
   - Added `useSearchParams` hook
   - Detects `?ref=CODE` URL parameter
   - Added referral code input field
   - Displays referral info message
   - Passes referral code to auth context

2. **AuthContext.js (Frontend)**
   - Updated `register()` function signature
   - Now accepts `referralCode` parameter
   - Sends referral code to backend

3. **authController.js (Backend)**
   - Generates unique referral code for each user
   - Validates referral code if provided
   - Creates Referral record if valid code used
   - Returns referral code in response

4. **Order.js Model (Backend)**
   - Added `referrer` field (ObjectId)
   - Added `referralCommission` field
   - Added `referralPercentage` field
   - Added `referralBounty` field

5. **Environment Files**
   - Created `frontend/.env`
   - Updated `backend/.env` with FRONTEND_URL

---

## 🐛 Troubleshooting

### Render Build Failed - "npm" command shows help menu
**Problem:** Build command is set to just `npm`  
**Solution:** 
- ✅ You now have `render.yaml` - Render will auto-use it
- Alternatively, in Render UI set: **Build Command:** `npm install`

### Backend won't start
```bash
# Check MongoDB connection
$ mongo your_connection_string

# Check ports
$ lsof -i :5000

# Check .env file
$ cat backend/.env | grep MONGO_URI
```

### Frontend blank page
```bash
# Check API URL
$ echo $REACT_APP_API_URL

# Check Build
$ npm run build

# Check Console (F12)
# Look for CORS errors
```

### Referral code not working
1. Check `backend/.env` has FRONTEND_URL
2. Check referral code is uppercase in URL
3. Verify referral code exists in User collection
4. Check Referral collection for record creation

### Payment errors
1. Check Stripe keys are correct
2. Test keys should start with `pk_test_` or `sk_test_`
3. Check webhook is configured
4. Verify STRIPE_WEBHOOK_SECRET is set

---

## 📞 Support

### Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| CORS Error | Update CORS origins in `server.js` |
| JWT expired | Increase `JWT_EXPIRE` in `.env` |
| 500 Server Error | Check logs: `heroku logs --tail` |
| Database connection failed | Verify `MONGO_URI` and IP whitelist |
| Stripe payment stuck | Check webhook configuration |

### Debug Commands

```bash
# Check backend logs
heroku logs --tail

# Check frontend console
F12 → Console tab

# Test API
curl -v http://localhost:5000/api/health

# Test database
mongo $MONGO_URI
> show collections
```

---

## 🎉 SUCCESS CRITERIA

Your deployment is successful when:

1. ✅ Users can register at `/register`
2. ✅ Users can use referral codes (`?ref=CODE`)
3. ✅ Referral codes appear in user profile
4. ✅ Referral dashboard shows stats
5. ✅ Orders can be created and paid
6. ✅ Emails are sent (if configured)
7. ✅ No console errors
8. ✅ All API endpoints respond

---

## 📝 Next Steps

After deployment:

1. **Test all flows**
2. **Monitor error logs**
3. **Setup uptime monitoring**
4. **Configure backups**
5. **Setup CI/CD pipeline**
6. **Monitor performance**
7. **Plan scaling strategy**

---

**Deployment ready? Let's go! 🚀**
