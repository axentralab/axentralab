# Frontend Architecture & Code Structure Guide

## 📖 Overview

This document outlines the complete frontend architecture for Axentralab, designed to make it easy for development teams to:
- ✅ Understand the codebase quickly
- ✅ Add new features without breaking existing code
- ✅ Maintain consistent code quality
- ✅ Scale the application efficiently

---

## 📂 Architecture Overview

```
src/
├── App.js                 # Main entry point, route definitions
├── index.js               # React DOM render
│
├── components/            # All UI components
│   ├── layout/            # Layout wrappers (Navbar, Footer, Sidebar)
│   ├── common/            # Reusable components (Button, Modal, Card)
│   ├── sections/          # Large page sections (Hero, Stats, etc)
│   ├── forms/             # Form components
│   └── ui/                # Utility UI components
│
├── pages/                 # Page components (1:1 with routes)
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   └── ...
│
├── hooks/                 # Custom React hooks
│   ├── useApi.js          # Data fetching
│   ├── useForm.js         # Form state
│   ├── useAuth.js         # Auth state (from context)
│   └── ...
│
├── services/              # API & business logic
│   ├── api.js             # Axios instance
│   ├── auth.service.js    # Auth API calls
│   ├── product.service.js # Product API calls
│   └── ...
│
├── context/               # React Context (state management)
│   ├── AuthContext.js
│   ├── CartContext.js
│   └── ToastContext.jsx
│
├── config/                # Configuration
│   ├── api.config.js      # API endpoints
│   ├── routes.config.js   # Route definitions
│   └── app.config.js      # App constants
│
├── utils/                 # Utility functions
│   ├── format.js          # Format functions
│   ├── validate.js        # Validation helpers
│   └── helpers.js         # General helpers
│
├── constants/             # App-wide constants
│   ├── orderStatus.js
│   └── statusColors.js
│
├── styles/                # CSS files
│   ├── global.css
│   ├── variables.css
│   └── animations.css
│
└── assets/                # Images, icons, static files
    ├── images/
    ├── icons/
    └── fonts/
```

---

## 🎯 Key Principles

### 1. Separation of Concerns
- **Components** = UI only
- **Hooks** = Logic & state
- **Services** = API calls
- **Utilities** = Pure functions
- **Contexts** = Global state

### 2. Single Responsibility
Each file should do one thing well:
- Component displays UI
- Hook manages logic
- Service handles API
- Utility transforms data

### 3. Reusability
- Common UI patterns → `components/common/`
- Common logic → `hooks/`
- Common data transforms → `utils/`
- Common strings/numbers → `constants/` or `config/`

### 4. Clarity
- Clear naming conventions
- Documentation (JSDoc)
- Consistent patterns
- Easy to find things

---

## 📚 Usage Patterns

### Creating a New Page

**Step 1: Create the page component**
```jsx
// pages/MyNewPage.js
import { useMyData } from '../hooks/useMyData';
import MySection from '../components/sections/MySection';

export default function MyNewPage() {
  const data = useMyData();
  return <MySection data={data} />;
}
```

**Step 2: Add the route in App.js**
```jsx
import MyNewPage from './pages/MyNewPage';

// In <Routes>
<Route path="/my-new-page" element={<PublicLayout><MyNewPage /></PublicLayout>} />
```

### Fetching Data

**Best Practice Pattern:**
```jsx
// Step 1: Create custom hook
// hooks/useProducts.js
export function useProducts() {
  return useApi('/products');
}

// Step 2: Use in component
// pages/ProductsPage.js
import { useProducts } from '../hooks/useProducts';

function ProductsPage() {
  const { data, loading, error } = useProducts();
  // ...
}
```

### Adding a New API Service

```jsx
// Step 1: Create service
// services/newdomain.service.js
export const newDomainService = {
  getAll: () => api.get('/endpoint'),
  create: (data) => api.post('/endpoint', data),
  // ...
};

// Step 2: Use in hook
// hooks/useNewDomain.js
export function useNewDomain() {
  return useApi('/endpoint');
}

// Step 3: Use in component
import { useNewDomain } from '../hooks/useNewDomain';
```

---

## 🛠️ Common Tasks

### Add a new component
1. Create file in appropriate `components/` subfolder
2. Add JSDoc comments
3. Use CSS classes (not inline styles)
4. Export as default

### Add a new hook
1. Create file in `hooks/`
2. Name with `use` prefix
3. Add documentation
4. Export from `hooks/index.js`

### Add a new service
1. Create file in `services/`
2. Export object with methods
3. Add JSDoc for each method
4. Export from `services/index.js`

### Add styling
1. Create CSS file in `styles/`
2. Use CSS variables and BEM naming
3. Keep specificity low
4. Mobile first approach

---

## 📖 Documentation Files

| Document | Purpose |
|----------|---------|
| [FRONTEND_STRUCTURE.md](./FRONTEND_STRUCTURE.md) | Detailed folder structure & principles |
| [FRONTEND_CODING_GUIDELINES.md](./FRONTEND_CODING_GUIDELINES.md) | Code examples & best practices |
| [FRONTEND_QUICK_REFERENCE.md](./FRONTEND_QUICK_REFERENCE.md) | Quick lookup for imports & patterns |
| [FRONTEND_MIGRATION_GUIDE.md](./FRONTEND_MIGRATION_GUIDE.md) | How to refactor old code |

**→ Start with FRONTEND_QUICK_REFERENCE.md for quick lookups**
**→ Read FRONTEND_STRUCTURE.md for deep understanding**

---

## ✅ Code Review Checklist

Before submitting code, verify:

- [ ] **Location**: File is in the right folder
- [ ] **Naming**: Follows conventions (PascalCase for components, camelCase for functions)
- [ ] **Imports**: Uses correct import paths (from `../services/`, not `../../services/`)
- [ ] **Documentation**: Has JSDoc comments
- [ ] **Props**: Documented what props the component accepts
- [ ] **Error Handling**: Has try-catch or error boundaries
- [ ] **Loading States**: Shows loading/spinner while fetching
- [ ] **No Console**: No console.log or debug statements
- [ ] **No Inline Styles**: Uses CSS classes
- [ ] **No Direct API Calls**: Uses services layer
- [ ] **No Duplicate Code**: Extracted to utils/hooks
- [ ] **Tests**: Added tests if necessary
- [ ] **Responsive**: Works on mobile/tablet/desktop
- [ ] **Accessible**: Basic a11y (labels, alt text, etc)

---

## 🚀 Quick Start for New Developers

### 1. Explore the Structure (15 min)
```bash
# Look at the folder structure
ls -la src/

# Check out a simple page
cat src/pages/HomePage.js

# Check out a service
cat src/services/auth.service.js

# Check out a hook
cat src/hooks/useForm.js
```

### 2. Read the Documentation (30 min)
- Read [FRONTEND_QUICK_REFERENCE.md](./FRONTEND_QUICK_REFERENCE.md)
- Scan [FRONTEND_STRUCTURE.md](./FRONTEND_STRUCTURE.md)

### 3. Run the Application (5 min)
```bash
cd frontend
npm install
npm start
```

### 4. Look at Existing Examples (30 min)
- Find a page similar to what you'll build
- Trace how data flows from service → hook → component
- Read the code and understand the pattern

### 5. Start Coding (∞ min)
- Use the patterns you've learned
- Refer to [FRONTEND_QUICK_REFERENCE.md](./FRONTEND_QUICK_REFERENCE.md) when unsure
- Ask questions if anything is unclear

---

## 📝 Common Patterns

### Pattern 1: Fetch & Display
```jsx
import { useApi } from '../hooks/useApi';

function MyComponent() {
  const { data, loading, error } = useApi('/endpoint');
  
  if (loading) return <Skeleton />;
  if (error) return <ErrorMessage />;
  return <div>{data?.map(/* ... */)}</div>;
}
```

### Pattern 2: Form Handling
```jsx
import { useForm } from '../hooks/useForm';
import { validateForm } from '../utils/validate';

function MyForm() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { field1: '', field2: '' },
    onSubmit
  );

  async function onSubmit(data) {
    const errors = validateForm(data, { /* rules */ });
    if (Object.keys(errors).length) return;
    // Submit...
  }

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

### Pattern 3: Global State
```jsx
import { useAuth } from '../hooks';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  return <button onClick={logout}>Logout {user?.name}</button>;
}
```

---

## 🐛 Troubleshooting

### "Module not found" error
- Check import path
- Is the file in the right folder?
- Did you export it?

### "undefined" errors
- Check if data is loaded (use loading state)
- Check if data exists (use optional chaining `?.`)
- Check API response format

### Styling not working
- Is the CSS file imported?
- Is the class name spelled correctly?
- Check browser DevTools → Elements → Styles

### API call not working
- Check Network tab in DevTools
- Is the endpoint correct?
- Is the token being sent?
- Does the backend return the right format?

---

## 🎓 Learning Resources

### React
- [React Official Docs](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [Custom Hooks Guide](https://react.dev/learn/reusing-logic-with-custom-hooks)

### JavaScript
- [ES6+ Features](https://exploringjs.com/es6/)
- [Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)

### CSS
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

## 💡 Pro Tips

1. **Use VS Code Snippets** - Create snippets for common patterns
2. **Install Extensions** - React DevTools, ES7+ snippets
3. **Use DevTools** - React DevTools browser extension is your friend
4. **Read Existing Code** - Best way to learn patterns
5. **Ask Questions** - Better to ask than guess!
6. **Test Locally** - Test on multiple devices/screens
7. **Keep It Simple** - Don't over-engineer solutions

---

## 🤝 Contributing

When adding new code:
1. Follow the established patterns
2. Add documentation
3. Test thoroughly
4. Submit for code review
5. Incorporate feedback

---

## ❓ FAQ

**Q: Where should I put my new component?**
A: If it's reusable → `components/common/`. If it's a page section → `components/sections/`. If it's a full page → `pages/`.

**Q: When should I create a custom hook?**
A: When you have logic that can be reused or complex state management.

**Q: Why use services instead of API calls in components?**
A: Centralized API handling makes it easier to update endpoints and add features like caching/retry logic.

**Q: What's the difference between context and state?**
A: State is local to a component. Context is global and doesn't re-render unnecessarily.

**Q: How should I handle errors?**
A: Use error boundary components and show user-friendly messages via toasts/alerts.

---

## 📞 Support

- Check the documentation files
- Look at existing examples in the codebase
- Ask the team lead
- Create an issue on GitHub

---

**Last Updated:** April 2026  
**Status:** Active & Maintained  
**Version:** 1.0

---

🚀 **Happy coding! Build amazing things with a clean, maintainable codebase!**
