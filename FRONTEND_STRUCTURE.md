# Frontend Code Structure & Architecture Guide

## Overview
This document outlines the recommended folder structure and coding patterns for the Axentralab Frontend to ensure consistency, maintainability, and scalability.

---

## 📂 Recommended Folder Structure

```
frontend/src/
├── App.js                      # Main app entry point
├── index.js                    # React DOM render
├── index.html                  # Static HTML
│
├── components/                 # ✅ Reusable UI components
│   ├── layout/                 # Layout components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── Sidebar.jsx
│   │   └── AppLayout.jsx       # NEW: Wrapper component
│   │
│   ├── common/                 # Common reusable components
│   │   ├── ProtectedRoute.js
│   │   ├── AIChatbot.js
│   │   ├── QuoteCalculator.jsx
│   │   ├── NewsletterSignup.js
│   │   ├── Modal.jsx           # NEW: Generic modal
│   │   ├── Button.jsx          # NEW: Reusable button
│   │   ├── Card.jsx            # NEW: Reusable card
│   │   ├── LoadingSpinner.jsx  # NEW: Loading component
│   │   └── AlertBanner.jsx     # NEW: Alert component
│   │
│   ├── sections/               # NEW: Large page sections
│   │   ├── HeroSection.jsx
│   │   ├── StatsSection.jsx
│   │   ├── FeatureGrid.jsx
│   │   ├── CaseStudiesSection.jsx
│   │   ├── PricingSection.jsx
│   │   ├── TestimonialSection.jsx
│   │   └── FooterSection.jsx
│   │
│   ├── forms/                  # NEW: Form components
│   │   ├── ContactForm.jsx
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── QuoteForm.jsx
│   │   └── NewsletterForm.jsx
│   │
│   └── ui/                     # NEW: Pure UI utilities
│       ├── Badge.jsx
│       ├── Tag.jsx
│       ├── Avatar.jsx
│       └── Tooltip.jsx
│
├── pages/                      # 📄 Page components (1:1 with routes)
│   ├── HomePage.js
│   ├── ShopPage.js
│   ├── ProductsPage.js
│   ├── PortfolioPage.js
│   ├── TeamPage.js
│   ├── BlogPage.js
│   ├── BlogPostPage.jsx
│   ├── ContactPage.js
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── QuoteCalculator.jsx
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── OrderSuccessPage.js
│   ├── DashboardPage.js
│   ├── AdminPage.js
│   └── NotFoundPage.js
│
├── hooks/                      # NEW: Custom React hooks
│   ├── useAuth.js              # Already exists, keep it here
│   ├── useCart.js
│   ├── useToast.js
│   ├── useApi.js               # NEW: API data fetching hook
│   ├── usePagination.js        # NEW: Pagination logic
│   ├── useLocalStorage.js      # NEW: Local storage hook
│   ├── useDebounce.js          # NEW: Debouncing
│   ├── useForm.js              # NEW: Form state management
│   └── useWindowSize.js        # NEW: Window resize tracking
│
├── context/                    # 🔄 React Context (State management)
│   ├── AuthContext.js          # already exists
│   ├── CartContext.js          # already exists
│   ├── ToastContext.jsx        # already exists
│   ├── ThemeContext.js         # NEW: Theme provider
│   ├── NotificationContext.js  # NEW: Global notifications
│   └── ModalContext.js         # NEW: Global modal state
│
├── services/                   # 🔧 API & business logic
│   ├── api.js                  # Axios instance
│   ├── auth.service.js         # NEW: Auth API calls
│   ├── products.service.js     # NEW: Product API calls
│   ├── orders.service.js       # NEW: Order API calls
│   ├── leads.service.js        # NEW: Leads API calls
│   ├── blog.service.js         # NEW: Blog API calls
│   ├── payment.service.js      # NEW: Stripe/Payment calls
│   └── upload.service.js       # NEW: File upload service
│
├── utils/                      # 🛠️ Utility functions
│   ├── format.js               # NEW: Format functions (date, currency, etc)
│   ├── validate.js             # NEW: Validation helpers
│   ├── constants.js            # NEW: App-wide constants
│   ├── api-helpers.js          # NEW: API error handling
│   ├── colors.js               # NEW: Color management
│   ├── readingTime.js          # already exists
│   └── helpers.js              # NEW: General helpers
│
├── config/                     # ⚙️ Configuration files
│   ├── api.config.js           # NEW: API endpoints config
│   ├── app.config.js           # NEW: App configuration
│   ├── routes.config.js        # NEW: Route definitions
│   └── theme.config.js         # NEW: Theme configuration
│
├── styles/                     # 🎨 CSS/Styling
│   ├── global.css              # already exists
│   ├── variables.css           # NEW: CSS variables & tokens
│   ├── animations.css          # NEW: Reusable animations
│   ├── responsive.css          # NEW: Media queries utilities
│   ├── layout/
│   │   ├── navbar.css
│   │   └── footer.css
│   └── components/             # Component specific styles
│       ├── button.css
│       ├── card.css
│       └── modal.css
│
├── assets/                     # 📦 Images, icons, data
│   ├── images/
│   ├── icons/
│   ├── mock-data/              # NEW: Mock API responses
│   │   ├── products.json
│   │   ├── blog-posts.json
│   │   └── team.json
│   └── fonts/
│
└── constants/                  # 📋 App constants
    ├── statusColors.js         # already exists
    ├── orderStatus.js          # already exists
    ├── apiEndpoints.js         # NEW: API route constants
    ├── formFields.js           # NEW: Form field definitions
    ├── navLinks.js             # NEW: Navigation links
    └── messages.js             # NEW: User-facing messages
```

---

## 🎯 Key Principles

### 1. **Component Organization**
- **Presentational Components**: In `components/` - just render UI, receive props
- **Container Components**: In `pages/` - manage state, fetch data, compose presentational components
- **Reusable Components**: In `components/common/` or `components/sections/`

**Example:**
```jsx
// ✅ Good: Presentational component
// components/common/Button.jsx
export default function Button({ label, onClick, variant = 'primary' }) {
  return <button className={`btn btn-${variant}`} onClick={onClick}>{label}</button>;
}

// ✅ Good: Container component using presentational
// pages/ProductsPage.js
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { loading, error, data } = useApi('/products');
  
  return (
    <div>
      {data?.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
```

### 2. **Custom Hooks Pattern**
- Keep custom logic in hooks, not components
- Hooks should be in `hooks/` folder
- Name hooks with `use` prefix

**Example:**
```jsx
// ✅ Good: Hook in hooks/ folder
// hooks/useForm.js
export function useForm(initialValues, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
  return { values, errors, handleChange };
}

// ✅ Usage in component
// components/forms/LoginForm.jsx
import { useForm } from '../../hooks/useForm';

export default function LoginForm() {
  const { values, handleChange } = useForm({ email: '', password: '' }, handleSubmit);
  return <form><input {...values} onChange={handleChange} /></form>;
}
```

### 3. **Service Layer Pattern**
- All API calls go in `services/`
- Each service is responsible for one domain
- Services use the `api` instance

**Example:**
```jsx
// ✅ services/products.service.js
import api from './api';

export const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// ✅ Usage in component
// hooks/useProducts.js
import { productService } from '../services/products.service';

export function useProducts() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    productService.getAll().then(res => setProducts(res.data));
  }, []);
  
  return products;
}
```

### 4. **Constants Management**
- All magic strings/numbers go in `constants/` or `config/`
- Group related constants together
- Export as named exports

**Example:**
```jsx
// ✅ constants/orderStatus.js
export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: '#FFA500',
  [ORDER_STATUS.PAID]: '#22C55E',
  [ORDER_STATUS.ACTIVE]: '#3B82F6',
  [ORDER_STATUS.COMPLETED]: '#10B981',
  [ORDER_STATUS.CANCELLED]: '#EF4444',
};

// ✅ Usage
// components/OrderStatus.jsx
import { ORDER_STATUS_COLORS } from '../constants/orderStatus';

function OrderStatus({ status }) {
  return <span style={{ color: ORDER_STATUS_COLORS[status] }}>{status}</span>;
}
```

### 5. **Route Configuration**
- Keep routes organized in a single place
- Use route config for dynamic navigation

**Example:**
```jsx
// ✅ config/routes.config.js
export const PUBLIC_ROUTES = [
  { path: '/', component: 'HomePage', exact: true },
  { path: '/services', component: 'ShopPage' },
  { path: '/blog', component: 'BlogPage' },
  { path: '/blog/:id', component: 'BlogPostPage' },
];

export const AUTH_ROUTES = [
  { path: '/login', component: 'LoginPage' },
  { path: '/register', component: 'RegisterPage' },
];

export const PROTECTED_ROUTES = [
  { path: '/dashboard', component: 'DashboardPage' },
  { path: '/checkout', component: 'CheckoutPage' },
];

export const ADMIN_ROUTES = [
  { path: '/admin', component: 'AdminPage' },
];

// ✅ Usage in App.js
import { PUBLIC_ROUTES, PROTECTED_ROUTES, ADMIN_ROUTES } from './config/routes.config';

// Then loop through and create <Route> elements
```

### 6. **Styling Best Practices**
- Use CSS variables for consistent theming
- Scope component styles in folders
- Avoid inline styles, use CSS classes
- Use BEM naming convention

**Example:**
```css
/* ✅ styles/variables.css */
:root {
  --primary: #22C55E;
  --secondary: #3B82F6;
  --danger: #EF4444;
  --bg: #0F172A;
  --text: #FFFFFF;
  --border: rgba(255, 255, 255, 0.1);
  --radius: 8px;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* ✅ styles/components/button.css */
.btn {
  padding: 8px 16px;
  border-radius: var(--radius);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn--primary {
  background: var(--primary);
  color: white;
}

.btn--primary:hover {
  background: var(--primary-dark);
}
```

---

## 📝 File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `HomePage.js`, `ProductCard.jsx` |
| Hooks | camelCase with `use` | `useAuth.js`, `useForm.js` |
| Services | camelCase with `.service` | `products.service.js` |
| Utils | camelCase | `format.js`, `validate.js` |
| Constants | UPPER_SNAKE_CASE | `ORDER_STATUS.js` |
| Styles | lowercase with `-` | `navbar.css`, `button.css` |

---

## 🔄 Data Flow Patterns

### Pattern 1: Simple Component with Props
```jsx
// Stateless, receives all data from parent
<ProductCard product={product} onAddToCart={handleAdd} />
```

### Pattern 2: Hook + Service
```jsx
// Custom hook fetches data, component displays it
const products = useProducts();
return <ProductList products={products} />;
```

### Pattern 3: Context + Hook
```jsx
// Global state via context, accessed via hook
const { user, logout } = useAuth();
```

### Pattern 4: Local State + Props
```jsx
// Component manages its own UI state, receives data as props
const [filters, setFilters] = useState({});
const filteredProducts = filterProducts(products, filters);
```

---

## ✅ Checklist for Code Review

- [ ] Component is in the correct folder
- [ ] File naming follows conventions
- [ ] Component has clear props/documentation
- [ ] API calls use services layer
- [ ] Constants are extracted to `constants/` or `config/`
- [ ] Custom logic is in hooks
- [ ] No inline styles (use CSS classes)
- [ ] Error handling is present
- [ ] Loading states are handled
- [ ] Component is reusable (not over-specific)

---

## 🚀 Migration Strategy

1. **Phase 1**: Create new folder structure (don't delete old files yet)
2. **Phase 2**: Create reusable components in `components/common/` and `components/sections/`
3. **Phase 3**: Extract services from components to `services/`
4. **Phase 4**: Create custom hooks in `hooks/`
5. **Phase 5**: Move constants to `constants/` and `config/`
6. **Phase 6**: Refactor pages to use new structure
7. **Phase 7**: Update imports in App.js and test everything
8. **Phase 8**: Delete old/duplicate files

---

## 📚 References

- React Documentation: https://react.dev
- Component Best Practices: https://react.dev/learn
- Folder Structure Guide: https://react.dev/learn/start-a-new-react-project

---

## 💡 Questions?

Refer to existing pattern in the codebase or ask the team lead.
