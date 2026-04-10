# ⚡ QUICK DEPLOYMENT CHECKLIST - VERCEL + RENDER

**Time Estimate:** 15-20 minutes  
**Status:** ✅ Ready to Deploy

---

## 📋 BEFORE YOU START

- [ ] Code pushed to GitHub: `git push origin main`
- [ ] GitHub account created
- [ ] MongoDB Atlas cluster created
- [ ] Stripe account created + keys obtained
- [ ] OpenAI API key obtained

---

## 🟦 STEP 1: FRONTEND DEPLOYMENT (VERCEL) - 5 min

### 🔗 Go to Vercel
```
https://vercel.com → Sign in with GitHub
```

### ➕ Import Project
```
1. New Project → Import Repository
2. Search: "axentralab"
3. Click "Import"
```

### ⚙️ Configure
```
Root Directory: ./frontend
Build Command: npm install && npm run build
Output Directory: build
```

### 🔑 Environment Variables
Add 3 variables:
```
REACT_APP_API_URL        = https://YOUR-BACKEND-URL.render.com/api
REACT_APP_STRIPE_PUBLISHABLE_KEY = pk_test_xxxxxxxxxxxxx
REACT_APP_URL            = https://YOUR-DOMAIN.vercel.app
```

### ✅ Deploy
Click "Deploy" and wait 2-3 minutes

**✨ Frontend Live:** `https://YOUR-PROJECT.vercel.app`

---

## 🔴 STEP 2: BACKEND DEPLOYMENT (RENDER) - 5 min

### 🔗 Go to Render
```
https://render.com → Sign in with GitHub
```

### ➕ Create Service
```
1. New + → Web Service
2. Select "axentralab" repository
3. Connect
```

### ⚙️ Configure
```
Name:              axentralab-backend
Environment:       Node
Build Command:     npm install
Start Command:     node backend/server.js
Region:            Oregon
Plan:              Free (or Starter for reliability)
```

### 🔑 Environment Variables (VERY IMPORTANT)
Add all 9 variables in Environment tab:

```
MONGO_URI                = mongodb+srv://USER:PASSWORD@cluster.mongodb.net/axentralab?retryWrites=true&w=majority
JWT_SECRET              = your_secret_key_32_chars_or_more_xxxxxxxxxxxxxxxxxxxx
NODE_ENV                = production
PORT                    = 5000
FRONTEND_URL            = https://YOUR-PROJECT.vercel.app
STRIPE_SECRET_KEY       = sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET   = whsec_test_xxxxxxxxxxxxx
OPENAI_API_KEY          = sk-xxxxxxxxxxxxx
SENDGRID_API_KEY        = SG.xxxxxxxxxxxxx (optional, but recommended)
```

### ✅ Deploy
Click "Create Web Service" and wait 3-5 minutes

**✨ Backend Live:** `https://YOUR-BACKEND-URL.render.com`

---

## 🧪 STEP 3: TEST DEPLOYMENT - 3 min

### Test Backend Health
```bash
curl https://YOUR-BACKEND-URL.render.com/api/health
# Should return: { "status": "ok" }
```

### Test Frontend
```
1. Open https://YOUR-PROJECT.vercel.app
2. Should see app homepage
3. F12 (DevTools) → Console
4. No CORS or API errors
```

### Test Registration
```
1. Go to: https://YOUR-PROJECT.vercel.app/register
2. Create account
3. Check MongoDB Atlas Collections → users
4. Should see new user record
```

### Test Login
```
1. Go to: https://YOUR-PROJECT.vercel.app/login
2. Login with your new account
3. Should redirect to dashboard
```

---

## 🔗 FINAL URLS

```
📱 Frontend: https://YOUR-PROJECT.vercel.app
⚙️ Backend:  https://YOUR-BACKEND-URL.render.com
📊 Database: MongoDB Atlas
```

---

## ⚡ AUTO-DEPLOY SETUP

Both platforms automatically deploy when you push to GitHub:

```bash
git add .
git commit -m "your message"
git push origin main
# ✨ Auto-deploy happens in both Vercel and Render!
```

---

## ❌ IF SOMETHING GOES WRONG

| Error | Solution |
|-------|----------|
| Frontend blank page | F12 Console → Check REACT_APP_API_URL |
| CORS error | Verify FRONTEND_URL in backend .env |
| API 503 error | Free Render plan spins down → Wait 30s or upgrade |
| Build failed | Check render.yaml exists in root |
| MongoDB connection failed | Verify MONGO_URI and IP whitelist (0.0.0.0/0) |
| Stripe payment error | Check STRIPE_SECRET_KEY is set |

---

## 🎉 YOU'RE DONE!

Your app is live and automatically deploys with every `git push` 🚀

Start using:
```bash
git push origin main
# Auto-deploy to Vercel + Render in 2-5 minutes
```

---

**For detailed steps:**  
👉 See: [VERCEL_RENDER_DEPLOYMENT.md](VERCEL_RENDER_DEPLOYMENT.md)

