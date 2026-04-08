# Frontend Setup & Environment Configuration

## Initial Project Setup

### Step 1: Clone the Repository
```bash
# Clone the project
git clone <repository-url>
cd axentralab-main

# Navigate to frontend
cd frontend
```

### Step 2: Install Dependencies
```bash
# Install all required packages
npm install

# Verify installation
npm list react react-dom react-router-dom axios
```

### Step 3: Create Environment File
```bash
# Create environment file
cp .env.example .env.local

# Or manually create .env.local in the frontend folder
touch .env.local
```

### Step 4: Configure Environment Variables

Edit `frontend/.env.local`:
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Environment
REACT_APP_ENV=development
NODE_ENV=development

# Optional: OpenAI (if frontend needs to call OpenAI directly)
REACT_APP_OPENAI_API_KEY=sk-xxxx

# Optional: Analytics/Tracking
REACT_APP_ANALYTICS_ID=

# Optional: Feature Flags
REACT_APP_ENABLE_BETA_FEATURES=false
```

### Step 5: Start Development Server
```bash
# Terminal 1: Start frontend (port 3000)
npm start

# Opens automatically at http://localhost:3000
```

### Step 6: Start Backend (Separate Terminal)
```bash
# Terminal 2: Start backend server
cd ../backend
npm install
npm run dev

# Backend runs on http://localhost:5000
```

### Expected Output

**Frontend:**
```
Compiled successfully!

You can now view axentralab in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
```

**Backend:**
```
🚀 Server running on port 5000
🤖 Initializing AI Automation Scheduler...
✅ Automation Scheduler initialized
```

---

## Environment Variables Explained

### Required
```env
REACT_APP_API_URL=http://localhost:5000/api
```
- Where the backend API is running
- Change to production URL when deploying

### Development
```env
REACT_APP_ENV=development
NODE_ENV=development
```
- Controls behavior (dev vs prod)
- Enable/disable dev tools

### Optional
```env
REACT_APP_OPENAI_API_KEY=sk-xxxx
```
- Only if frontend makes direct OpenAI calls
- Usually backend handles this

### Local vs Production

**Local (.env.local):**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

**Production (.env.production):**
```env
REACT_APP_API_URL=https://api.axentralab.com/api
REACT_APP_ENV=production
```

---

## Dependency Management

### Core Dependencies
```json
{
  "react": "^18.x",                    // React library
  "react-dom": "^18.x",                // React DOM
  "react-router-dom": "^6.x",          // Routing
  "axios": "^1.x",                     // HTTP client
}
```

### Check Installed Versions
```bash
npm list --depth=0
```

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update specific package
npm update axios

# Update all
npm update
```

### Adding New Package
```bash
# Install package
npm install package-name

# Install as dev dependency
npm install --save-dev package-name

# Save in package.json automatically
```

---

## Common Setup Issues

### Issue: "Cannot find module 'react'"
```bash
# Solution: Install dependencies
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: "Module not found: Can't resolve 'services'"
```bash
# Check import path - relative paths matter!
// ❌ Wrong
import { api } from 'services/api';

// ✅ Right
import { api } from '../services/api';
import { api } from '../../services/api';
```

### Issue: "API_URL is undefined"
```bash
# Make sure .env.local exists and has REACT_APP_API_URL
echo "REACT_APP_API_URL=http://localhost:5000/api" >> .env.local

# Restart npm (env changes require restart)
# Press Ctrl+C in terminal
# Run: npm start
```

### Issue: "Cannot GET /api/..."
```bash
# Backend is not running!
# Make sure backend server is running on port 5000
# Check in another terminal:
curl http://localhost:5000/api

# If that fails, start backend:
cd backend
npm run dev
```

### Issue: "Token is undefined" on protected routes
```bash
# Check if token is being saved
// In DevTools Console:
localStorage.getItem('token')

// If null, login first
// If exists, check if API is sending it properly:
// In api.js, token should be attached to headers
```

### Issue: CORS errors
```
Access to XMLHttpRequest at 'http://localhost:5000/api/...'
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution in Backend:**
```jsx
// backend/server.js
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true // Allow cookies
}));
```

---

## File Structure Checklist

Before starting development, verify:

```bash
# Check main files exist
frontend/
├── ✅ .env.local               (Env variables)
├── ✅ package.json             (Dependencies)
├── ✅ package-lock.json        (Dependency lock)
├── ✅ public/index.html        (Entry HTML)
└── ✅ src/
    ├── ✅ App.js               (Routes)
    ├── ✅ index.js             (React render)
    ├── ✅ components/          (All folders)
    ├── ✅ pages/               (All page files)
    ├── ✅ services/            (API services)
    ├── ✅ hooks/               (Custom hooks)
    ├── ✅ context/             (Providers)
    ├── ✅ config/              (Configuration)
    ├── ✅ constants/           (Constants)
    ├── ✅ utils/               (Helpers)
    ├── ✅ styles/              (CSS files)
    └── ✅ assets/              (Images)
```

---

## Running Commands

### Development
```bash
# Start dev server
npm start

# Runs on http://localhost:3000
# Hot reload enabled (changes show immediately)
# Dev tools available
```

### Building
```bash
# Create optimized production build
npm run build

# Output in: frontend/build/
# Ready to deploy
```

### Testing
```bash
# Run tests (if configured)
npm test

# Watch mode
npm test -- --watch
```

### Linting
```bash
# Check code style (if ESLint configured)
npm run lint

# Fix issues automatically
npm run lint -- --fix
```

### Cleanup
```bash
# Clear npm cache
npm cache clean --force

# Reinstall everything
rm -rf node_modules package-lock.json
npm install
```

---

## Browser Setup

### Recommended Extensions
1. **React Developer Tools**
   - View component hierarchy
   - Inspect props & state
   - Search components

2. **Redux DevTools** (if using Redux)
   - Monitor state changes
   - Time-travel debugging

3. **Axios DevTools** (if using Axios)
   - Monitor API requests
   - See request/response data

### Enable Dev Tools
- **Chrome/Firefox:** F12
- **DevTools → Network:** Watch API calls
- **DevTools → Console:** See logs and errors
- **DevTools → Application:** Check localStorage

---

## Git Setup

### Initial Configuration
```bash
# Set your identity
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Set as global (optional)
git config --global user.name "Your Name"
```

### Basic Workflow
```bash
# Create new branch
git checkout -b feature/my-feature

# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "Add my feature"

# Push to remote
git push origin feature/my-feature

# Create Pull Request on GitHub
```

### Good Commit Messages
```bash
# ✅ Good
git commit -m "Add product filter to shop page"
git commit -m "Fix: console error in cart context"
git commit -m "Refactor: move validation to utils"

# ❌ Bad
git commit -m "update"
git commit -m "fix stuff"
git commit -m "asdf"
```

---

## Code Quality Tools

### Prettier (Code Formatter)
```bash
# Install (if not installed)
npm install --save-dev prettier

# Format all files
npx prettier --write "src/**/*.{js,jsx,css}"

# Check formatting
npx prettier --check "src/**/*.{js,jsx,css}"
```

### ESLint (Code Linter)
```bash
# Install (if not installed)
npm install --save-dev eslint eslint-plugin-react

# Initialize config
npx eslint --init

# Check for errors
npm run lint

# Fix automatically
npm run lint -- --fix
```

### Setup in package.json
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "lint": "eslint src/",
    "format": "prettier --write \"src/**/*.{js,jsx,css}\""
  }
}
```

---

## Deployment Setup

### Build for Production
```bash
# Create optimized build
npm run build

# Check output
ls -la build/

# Size check (should be < 1MB main bundle)
```

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Preview URL provided
```

### Deploy to Netlify
```bash
# Drag & drop the build/ folder to Netlify
# Or: npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Environment for Production
```env
# .env.production
REACT_APP_API_URL=https://api.axentralab.com/api
REACT_APP_ENV=production
REACT_APP_ENABLE_BETA_FEATURES=false
```

---

## Performance Optimization

### Build Analysis
```bash
# See what's in your bundle
npm install --save-dev analyze-bundle
npm run analyze

# This shows which packages take up space
```

### Reduce Bundle Size
```bash
# Check installed packages
npm list

# Remove unused packages
npm uninstall package-name

# Use lighter alternatives
npm uninstall moment
npm install date-fns
```

### Lazy Loading Routes
```jsx
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </Suspense>
  );
}
```

---

## Troubleshooting Checklist

Before asking for help:

- [ ] Node.js version 14+ installed: `node --version`
- [ ] npm version 6+ installed: `npm --version`
- [ ] `node_modules/` exists: `ls node_modules/`
- [ ] `.env.local` exists with `REACT_APP_API_URL`
- [ ] Backend is running: `curl http://localhost:5000/api`
- [ ] No typos in imports (relative paths!)
- [ ] Dependencies installed: `npm install`
- [ ] Server restarted after .env changes
- [ ] No conflicting ports (3000 for frontend, 5000 for backend)
- [ ] Browser console shows no errors

---

## Getting Help

### Check These First
1. Browser console (F12) - Look for red errors
2. Terminal output - Check for compilation errors
3. Network tab - Check API calls
4. Application tab - Check localStorage

### Debug Commands
```bash
# Show node version
node --version

# Show npm version
npm --version

# Show installed packages
npm list

# Show global packages
npm list -g

# Show npm config
npm config list
```

### Common Help Resources
- React Docs: https://react.dev
- React Router: https://reactrouter.com
- Axios: https://axios-http.com
- MDN Web Docs: https://developer.mozilla.org
- Stack Overflow: https://stackoverflow.com

### Report an Issue
When asking for help, include:
1. What you tried to do
2. What error you got (full error message)
3. Output of `npm list react react-dom`
4. Your Node version
5. Steps to reproduce

---

## Next Steps

✅ **Setup complete!** Now:

1. Read [FRONTEND_DEVELOPER_HANDBOOK.md](./FRONTEND_DEVELOPER_HANDBOOK.md)
2. Start with [FRONTEND_DEV_CHEATSHEET.md](./FRONTEND_DEV_CHEATSHEET.md)
3. Build your first component
4. Check out existing code examples

