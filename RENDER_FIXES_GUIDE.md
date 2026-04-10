# 🔧 RENDER DEPLOYMENT - COMMON ISSUES & FIXES

## ⚠️ IMPORTANT: Render.yaml vs. UI Configuration

**Note:** While `render.yaml` CAN be used with Render, it's not always reliable. For **best results**, use the Render Dashboard UI to configure your service.

---

## ❌ FIXED ISSUES IN render.yaml

### Issue 1: Incorrect Build Command
**Before:**
```yaml
buildCommand: npm install
```

**After:**
```yaml
buildCommand: cd backend && npm install
```

**Why:** Need to navigate to backend directory before installing dependencies

---

### Issue 2: Incorrect Start Command
**Before:**
```yaml
startCommand: node backend/server.js
```

**After:**
```yaml
startCommand: cd backend && node server.js
```

**Why:** Must be in backend directory when starting the app

---

### Issue 3: Missing Quotes in rootDir
**Before:**
```yaml
rootDir: .
```

**After:**
```yaml
rootDir: "."
```

**Why:** YAML requires quotes for special characters like `.`

---

### Issue 4: Missing Data Type for PORT
**Before:**
```yaml
value: 5000
```

**After:**
```yaml
value: "5000"
```

**Why:** Environment variables must be strings in YAML

---

### Issue 5: Missing Health Check Timeout
**Added:**
```yaml
healthCheckTimeout: 30
```

**Why:** Gives health check 30 seconds to respond (default is too short)

---

### Issue 6: Missing Persistent Storage
**Added:**
```yaml
disk:
  name: uploads
  mountPath: /app/uploads
  sizeGB: 1
```

**Why:** Ensures file uploads persist across deployments

---

## 🎯 RECOMMENDED: Use Render Dashboard (More Reliable)

Instead of relying on render.yaml, follow these steps:

### Step 1: Go to Render
```
https://render.com/dashboard
```

### Step 2: Create Web Service
```
Click: "New +" → "Web Service"
```

### Step 3: Connect GitHub
```
1. Select: axentralab repository
2. Branch: main
3. Click: "Connect"
```

### Step 4: Configure Service

**Name:**
```
axentralab-backend
```

**Environment:**
```
Node
```

**Region:**
```
Oregon (or nearest)
```

**Plan:**
```
Free (or Starter for better uptime)
```

**Build Command:**
```
cd backend && npm install
```

**Start Command:**
```
cd backend && node server.js
```

---

### Step 5: Add Environment Variables

Click: **Environment** → Add from paste

```
MONGO_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/axentralab?retryWrites=true&w=majority
JWT_SECRET=your_unique_secret_key_min_32_characters_xxxxxxxxxxxxxxx
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-project.vercel.app
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_test_xxxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxxx
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
```

---

### Step 6: Deploy
```
Click: "Create Web Service"
Wait: 3-5 minutes
```

✅ **Backend Live:** `https://your-backend-url.render.com`

---

## ✅ VERIFY DEPLOYMENT

### Test Health Check
```bash
curl https://your-backend-url.render.com/api/health
# Should return: { "status": "ok" }
```

### Check Logs
```
In Render Dashboard → Your Service → Logs
Look for: "Server running on port 5000"
```

### Test API Endpoint
```bash
curl https://your-backend-url.render.com/api/users
# Should return: user data or empty array
```

---

## 🐛 TROUBLESHOOTING

### Issue: Build Failed
```
Error: Cannot find module 'express'
```

**Fix:**
1. Make sure `backend/package.json` exists
2. Verify build command is: `cd backend && npm install`
3. Check dependencies are listed in backend/package.json

---

### Issue: Service Spinning Down (Free Plan)
```
Error: Service is booting
```

**Why:** Free plan spins down after 15 minutes of inactivity

**Fix:**
1. Upgrade to Starter plan ($7/month)
2. Or wait 30 seconds for auto-wake

---

### Issue: CORS Error from Frontend
```
CORS error when frontend calls backend
```

**Fix:**
1. Update `FRONTEND_URL` in Render environment: `https://your-project.vercel.app`
2. Restart the service in Render dashboard
3. Check backend/server.js has CORS enabled:
   ```javascript
   app.use(cors({
     origin: process.env.FRONTEND_URL,
     credentials: true
   }));
   ```

---

### Issue: MongoDB Connection Failed
```
Error: connect ECONNREFUSED
```

**Fix:**
1. Check `MONGO_URI` is correct in environment variables
2. Go to MongoDB Atlas → Network Access
3. Add `0.0.0.0/0` to IP whitelist (allow all IPs)
4. Copy connection string correctly (without "mongodb://")

---

### Issue: 503 Service Unavailable
```
Error: Service Temporarily Unavailable
```

**Reasons:**
- Render free plan went to sleep (wait 30s)
- Build failed (check Logs tab)
- Service crashed (check error in Logs)

**Fix:**
1. Check Render dashboard Logs tab
2. Restart service: Dashboard → Restart
3. Or upgrade to Starter plan

---

## 📊 QUICK REFERENCE

| Task | Where |
|------|-------|
| Add Env Vars | Dashboard → Environment |
| View Logs | Dashboard → Logs |
| Restart Service | Dashboard → Restart |
| View Metrics | Dashboard → Metrics |
| Change Region | Dashboard → Settings |
| Upgrade Plan | Dashboard → Settings |
| Custom Domain | Dashboard → Settings → Custom Domain |

---

## 🚀 AUTO-DEPLOY SETUP

Once deployed, every `git push` to `main` auto-deploys:

```bash
git add .
git commit -m "Update backend code"
git push origin main
# ✨ Render auto-deploys in 2-3 minutes!
```

**Monitor deployment:**
1. Go to Render dashboard
2. Watch Logs tab
3. See when deployment completes

---

## 🎉 DEPLOYMENT COMPLETE

Your backend is now:
- ✅ Running on Render
- ✅ Auto-deploying on git push
- ✅ Connected to MongoDB
- ✅ Ready for frontend requests

**Next:** Connect frontend on Vercel!

---

## 📞 SUPPORT

- **Render Docs:** https://render.com/docs
- **Render Status:** https://status.render.com
- **Express.js Docs:** https://expressjs.com
- **MongoDB Docs:** https://docs.mongodb.com
