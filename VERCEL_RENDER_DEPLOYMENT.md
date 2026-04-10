# 🚀 VERCEL + RENDER DEPLOYMENT GUIDE

**Frontend:** Vercel (React)  
**Backend:** Render (Node.js + Express)  
**Database:** MongoDB Atlas

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### Step 1: GitHub Setup
- [ ] Create account on GitHub (if not done): https://github.com
- [ ] Create new repository named `axentralab`
- [ ] Push code to GitHub:
```bash
git add .
git commit -m "Initial commit - ready for deployment"
git push origin main
```

### Step 2: MongoDB Atlas Setup
- [ ] Create account: https://www.mongodb.com/cloud/atlas
- [ ] Create free cluster (M0 tier)
- [ ] Create database user (save username/password)
- [ ] Whitelist IP: `0.0.0.0/0` (for all IPs)
- [ ] Get connection string: `mongodb+srv://USER:PASSWORD@cluster.mongodb.net/axentralab`

### Step 3: Stripe Setup
- [ ] Create Stripe account: https://dashboard.stripe.com
- [ ] Get test keys:
  - Publishable Key: `pk_test_...`
  - Secret Key: `sk_test_...`
- [ ] Get webhook signing secret: `whsec_test_...`

### Step 4: OpenAI Setup
- [ ] Create account: https://platform.openai.com
- [ ] Create API key for your app

---

## 🎯 FRONTEND DEPLOYMENT (VERCEL)

### 1. Create Vercel Account
```
1. Go to https://vercel.com
2. Click "Sign Up"
3. Connect with GitHub
```

### 2. Import Project
```
1. Click "Add New..." → "Project"
2. Search for your GitHub repo "axentralab"
3. Click "Import"
```

### 3. Configure Project
```
Root Directory: ./frontend
Build Command: npm install && npm run build
Output Directory: build
Install Command: npm install
```

### 4. Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:

```
REACT_APP_API_URL = https://your-backend-url.render.com/api
REACT_APP_STRIPE_PUBLISHABLE_KEY = pk_test_xxxxxxxxxxxxx
REACT_APP_URL = https://your-domain.vercel.app
```

### 5. Deploy
Click "Deploy" - Vercel will automatically build and deploy

**✅ Your frontend will be live at: `https://your-project.vercel.app`**

---

## 🎯 BACKEND DEPLOYMENT (RENDER)

### 1. Create Render Account
```
1. Go to https://render.com
2. Click "Sign up"
3. Connect with GitHub
```

### 2. Create New Web Service
```
1. Click "New +" → "Web Service"
2. Select your "axentralab" repository
3. Click "Connect"
```

### 3. Configure Service
```
Name: axentralab-backend
Environment: Node
Build Command: npm install
Start Command: node backend/server.js
Plan: Free (or Starter for better reliability)
Region: Oregon (or nearest to you)
```

### 4. Add Environment Variables
In Render Dashboard, add these:

```
MONGO_URI = mongodb+srv://USER:PASSWORD@cluster.mongodb.net/axentralab?retryWrites=true&w=majority
JWT_SECRET = your_unique_secret_key_min_32_characters_xxxxxxxxxxxxxxx
NODE_ENV = production
PORT = 5000
FRONTEND_URL = https://your-project.vercel.app
STRIPE_SECRET_KEY = sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET = whsec_test_xxxxxxxxxxxxx
OPENAI_API_KEY = sk-xxxxxxxxxxxxx
SENDGRID_API_KEY = SG.xxxxxxxxxxxxx (optional)
EMAIL_FROM = noreply@yourdomain.com (optional)
TELEGRAM_BOT_TOKEN = xxxxxxxxxxxx (optional)
```

### 5. Deploy
Click "Create Web Service" - Render will build and deploy

**✅ Your backend will be live at: `https://your-backend-url.render.com`**

---

## ✅ VERIFY DEPLOYMENT

### Test Frontend
```
1. Open: https://your-project.vercel.app
2. Should see the app homepage
3. Open DevTools (F12) → Console
4. Should be no CORS or API errors
```

### Test Backend
```bash
# Test health check
curl https://your-backend-url.render.com/api/health

# Should return: { "status": "ok" }
```

### Test Registration
```
1. Go to: https://your-project.vercel.app/register
2. Create account with email
3. Check MongoDB Atlas → Collections → users
4. Should see your new user record
```

---

## 🔗 CONNECT FRONTEND TO BACKEND

### If Frontend Gets API Errors:

**In Vercel Dashboard:**
1. Settings → Environment Variables
2. Update `REACT_APP_API_URL` to your Render backend URL:
   ```
   https://your-backend-url.render.com/api
   ```
3. Redeploy project

---

## 📊 YOUR DEPLOYMENT URLS

Track these URLs once deployed:

```
Frontend (Vercel):
- URL: https://your-project.vercel.app
- Dashboard: https://vercel.com/dashboard
- Settings: https://vercel.com/your-project/settings

Backend (Render):
- URL: https://your-backend-url.render.com
- Dashboard: https://dashboard.render.com
- Settings: https://dashboard.render.com/your-service

Database (MongoDB Atlas):
- Dashboard: https://cloud.mongodb.com/v2#/org/...
- Data: https://cloud.mongodb.com/v2#collections/...
```

---

## 🐛 TROUBLESHOOTING

### Frontend: Blank Page
```
❌ Issue: Frontend shows blank page
✅ Fix:
  1. F12 → Console tab
  2. Check for errors
  3. Verify REACT_APP_API_URL is set correctly
  4. Check Network tab for API call failures
  5. Redeploy Vercel: Settings → Redeploy
```

### Frontend: API Errors (CORS)
```
❌ Issue: "CORS error" in console
✅ Fix:
  1. Check backend CORS is enabled
  2. Verify FRONTEND_URL in backend .env
  3. Backend CORS should allow: https://your-project.vercel.app
  4. Restart backend on Render
```

### Backend: Won't Start
```
❌ Issue: Build failed on Render
✅ Fix:
  1. Check render.yaml exists in root
  2. Verify buildCommand: npm install
  3. Verify startCommand: node backend/server.js
  4. Check all environment variables are set
  5. Check MongoDB connection string
  6. Deploy again from Render dashboard
```

### Backend: 503 Error
```
❌ Issue: Service temporarily unavailable
✅ Fix:
  1. Free plan on Render spins down after inactivity
  2. Upgrade to Starter plan
  3. Or wait 30 seconds for auto-wake
```

---

## ⚙️ AUTOMATIC DEPLOYMENTS

Once connected to GitHub, both Vercel and Render will:
- **Automatically deploy** when you push to `main` branch
- **Show deployment status** in their dashboards
- **Provide rollback options** if needed

**Git Push = Auto Deploy** ✨

---

## 📝 DISABLE AUTO-DEPLOY (if needed)

**Vercel:** Settings → Git → Auto-deploy → Off  
**Render:** Settings → Auto-Deploy → Off  

---

## 🎉 DEPLOYMENT COMPLETE!

Your app is now live and automatically updating with every GitHub push!

### Next Steps:
1. ✅ Share frontend URL: `https://your-project.vercel.app`
2. ✅ Monitor both dashboards for errors
3. ✅ Setup uptime monitoring (optional)
4. ✅ Configure custom domain (optional)
5. ✅ Setup error tracking like Sentry (optional)

---

**Need help?** Check specific service docs:
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [MongoDB Docs](https://docs.mongodb.com)
