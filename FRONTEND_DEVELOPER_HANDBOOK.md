# 🎯 Frontend Developer Handbook
## Axentralab - Complete Development Guide

---

## Table of Contents
1. [Getting Started (5 min)](#getting-started)
2. [Folder Structure & What Goes Where](#folder-structure)
3. [How to Work With Each Folder](#how-to-work)
4. [Common Tasks With Examples](#common-tasks)
5. [Code Quality Checklist](#code-quality)
6. [Debugging & Troubleshooting](#debugging)
7. [Quick Reference](#quick-reference)

---

## Getting Started

### Setup (First Time Only)
```bash
# 1. Clone and enter the project
cd axentralab-main
cd frontend

# 2. Install dependencies
npm install

# 3. Create .env.local file
cp .env.example .env.local

# 4. Edit .env.local - Add your API URL
# REACT_APP_API_URL=http://localhost:5000/api

# 5. Start development
npm start

# Your app opens at http://localhost:3000
```

### Key Environment Variables
```env
# Frontend/.env.local
REACT_APP_API_URL=http://localhost:5000/api   # Backend API
REACT_APP_OPENAI_API_KEY=optional_for_frontend # If needed
```

### Start Backend (Separate Terminal)
```bash
cd backend
npm install
npm run dev   # Runs on port 5000
```

---

## Folder Structure

### Overview
```
frontend/src/
├── 📄 App.js                  # Routes & main entry point
├── 📄 index.js                # React DOM renderer
│
├── 📁 components/             # All UI components (FOLDERS NEXT)
├── 📁 pages/                  # Page components (1 per route)
├── 📁 hooks/                  # Custom React logic
├── 📁 services/               # API calls & business logic
├── 📁 context/                # Global state management
├── 📁 config/                 # App configuration & constants
├── 📁 constants/              # Status, colors, etc.
├── 📁 utils/                  # Helper functions
├── 📁 styles/                 # Global CSS
└── 📁 assets/                 # Images, icons, fonts
```

---

## How to Work With Each Folder

### 1️⃣ COMPONENTS (Reusable UI Pieces)

**What Goes Here:** Buttons, Cards, Forms, Modals, etc.

**Sub-folders:**
```
components/
├── layout/          # Header, Footer, Sidebar (navigation)
├── common/          # Button, Modal, Card, Alert (reusable)
├── sections/        # HeroSection, StatsSection (page sections)
├── forms/           # LoginForm, ContactForm (form components)
└── ui/              # Utility UI pieces
```

**When to Create a Component:**
- ✅ Used in multiple places
- ✅ Can be broken down into smaller pieces
- ✅ Has its own styling
- ✅ Is "presentational" (displays UI only)

**Example: Creating Button Component**
```jsx
// components/common/Button.jsx
/**
 * Button - Reusable button component
 * @param {string} variant - 'primary' | 'secondary' | 'danger'
 * @param {boolean} loading - Show loading state
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {React.ReactNode} children - Button text or content
 * @param {Function} onClick - Click handler
 * @param {Object} props - All other HTML button attributes
 */
export default function Button({ 
  variant = 'primary', 
  loading = false, 
  size = 'md', 
  children, 
  onClick, 
  ...props 
}) {
  const sizeClass = `btn--${size}`;
  const variantClass = `btn--${variant}`;
  
  return (
    <button 
      className={`btn ${sizeClass} ${variantClass}`} 
      onClick={onClick}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? '⏳ Loading...' : children}
    </button>
  );
}
```

**Using the Button:**
```jsx
import Button from '../components/common/Button';

function MyPage() {
  return (
    <>
      <Button variant="primary" onClick={() => alert('Clicked!')}>
        Click Me
      </Button>
      <Button variant="secondary" size="lg">Large Button</Button>
    </>
  );
}
```

---

### 2️⃣ PAGES (One Page = One Route)

**What Goes Here:** HomePage, LoginPage, DashboardPage

**Important Rules:**
- 1 file per route
- Can use multiple components
- Handle page-level data fetching
- Add JSDoc comment at top

**Example: Creating a Products Page**
```jsx
// pages/ProductsPage.js
/**
 * ProductsPage
 * Route: /products
 * Description: Display all products with filters and sorting
 */
import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import ProductGrid from '../components/sections/ProductGrid';
import FilterSidebar from '../components/sections/FilterSidebar';
import Skeleton from '../components/Skeleton';
import '../styles/pages/products.css';

export default function ProductsPage() {
  const [filters, setFilters] = useState({ category: '', sort: 'newest' });
  
  // Fetch products with filters
  const { data: products, loading, error } = useApi(
    `/products?category=${filters.category}&sort=${filters.sort}`
  );

  return (
    <div className="products-page">
      <div className="container">
        <h1>Our Products</h1>
        
        <div className="products-layout">
          <FilterSidebar 
            filters={filters} 
            onFilterChange={setFilters} 
          />
          
          {loading && <Skeleton count={6} />}
          {error && <ErrorMessage message="Failed to load products" />}
          {products && <ProductGrid products={products} />}
        </div>
      </div>
    </div>
  );
}
```

**Register Page in App.js:**
```jsx
// In App.js
import ProductsPage from './pages/ProductsPage';

// In Routes section:
<Route path="/products" element={<PublicLayout><ProductsPage /></PublicLayout>} />
```

---

### 3️⃣ HOOKS (Custom Logic)

**What Goes Here:** Logic that can be reused across components

**Types of Hooks:**
1. **Data Fetching** - `useApi(url)` - Fetch data from API
2. **Form Handling** - `useForm(initialValues)` - Manage form state
3. **Local Storage** - `useLocalStorage(key)` - Persist data locally
4. **Auth** - `useAuth()` - Access user data
5. **Custom Logic** - Any reusable component logic

**Example: Creating a useProducts Hook**
```jsx
// hooks/useProducts.js
import { useApi } from './useApi';

/**
 * useProducts - Fetch all products
 * @returns {Object} { data: products[], loading, error, refetch }
 */
export function useProducts() {
  return useApi('/products');
}

// Usage in component:
import { useProducts } from '../hooks/useProducts';

function HomePage() {
  const { data: products, loading } = useProducts();
  // Use products and loading in JSX...
}
```

**Example: Custom Hook for Toggle State**
```jsx
// hooks/useToggle.js
import { useState } from 'react';

/**
 * useToggle - Toggle boolean state
 * @param {boolean} initialValue - Starting value
 * @returns {[boolean, Function]} [value, toggle function]
 */
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(!value);
  return [value, toggle];
}

// Usage:
import { useToggle } from '../hooks/useToggle';

function Modal() {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <button onClick={toggle}>Open Modal</button>
      {isOpen && <div>Modal Content</div>}
    </>
  );
}
```

---

### 4️⃣ SERVICES (API Calls & Business Logic)

**What Goes Here:** API calls, data transformation

**Important Rules:**
- Export as named functions (not default)
- Use our custom `api` instance (has token + error handling)
- Always return promises
- Add JSDoc with request/response format

**Example: Product Service**
```jsx
// services/product.service.js
import api from './api';

/**
 * productService - All product-related API calls
 */
export const productService = {
  /**
   * Get all products
   * @param {Object} filters - { category, sort, limit }
   * @returns {Promise<Array>} Array of products
   */
  getAll: async (filters = {}) => {
    const { data } = await api.get('/products', { params: filters });
    return data;
  },

  /**
   * Get single product by ID
   * @param {string} id - Product ID
   * @returns {Promise<Object>} Product object
   */
  getById: async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  /**
   * Create new product (Admin only)
   * @param {Object} productData - Product details
   * @returns {Promise<Object>} Created product
   */
  create: async (productData) => {
    const { data } = await api.post('/products', productData);
    return data;
  },

  /**
   * Update product
   * @param {string} id - Product ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated product
   */
  update: async (id, updates) => {
    const { data } = await api.patch(`/products/${id}`, updates);
    return data;
  },

  /**
   * Delete product
   * @param {string} id - Product ID
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    await api.delete(`/products/${id}`);
  },
};

// In services/index.js - EXPORT for easy importing
export { productService } from './product.service';
```

**Using Service in Component:**
```jsx
import { productService } from '../services';

function EditProductForm({ productId }) {
  const handleSave = async (updatedData) => {
    try {
      await productService.update(productId, updatedData);
      showToast('Product updated!', 'success');
    } catch (error) {
      showToast('Update failed: ' + error.message, 'error');
    }
  };
  
  return <form onSubmit={handleSave}>...</form>;
}
```

---

### 5️⃣ CONTEXT (Global State)

**What Goes Here:** User info, Cart, Notifications, Auth

**When to Use Context:**
- ✅ Data used by many components
- ✅ User auth state
- ✅ Cart items
- ✅ Theme, language, preferences
- ❌ NOT for API data (use hooks instead)

**Example: Using AuthContext**
```jsx
// In any component:
import { useAuth } from '../hooks';

function UserProfile() {
  const { user, isLoggedIn, logout } = useAuth();
  
  if (!isLoggedIn) return <p>Please login</p>;
  
  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

### 6️⃣ CONFIG (Settings & Endpoints)

**Files:**
- `api.config.js` - API endpoints
- `routes.config.js` - Route definitions
- `app.config.js` - App constants

**Example: api.config.js**
```jsx
// config/api.config.js
export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGOUT: '/auth/logout',
  
  // Products
  PRODUCTS: '/products',
  PRODUCTS_SEARCH: '/products/search',
  
  // Orders
  ORDERS: '/orders',
  ORDERS_CREATE: '/orders',
  ORDERS_BY_ID: (id) => `/orders/${id}`,
  
  // Admin
  ADMIN_STATS: '/admin/stats',
  ADMIN_USERS: '/admin/users',
};

// Usage in service:
import { API_ENDPOINTS } from '../config/api.config';

export const authService = {
  login: async (email, password) => {
    const { data } = await api.post(API_ENDPOINTS.AUTH_LOGIN, { email, password });
    return data;
  },
};
```

---

### 7️⃣ CONSTANTS (Fixed Values)

**What's Here:**
- Order statuses and colors
- User roles
- Pagination sizes
- Modal sizes
- Validation rules

**Example: orderStatus.js**
```jsx
// constants/orderStatus.js
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: '#F59E0B',    // Orange
  [ORDER_STATUS.CONFIRMED]: '#3B82F6',  // Blue
  [ORDER_STATUS.SHIPPED]: '#8B5CF6',    // Purple
  [ORDER_STATUS.DELIVERED]: '#22C55E',  // Green
  [ORDER_STATUS.CANCELLED]: '#EF4444',  // Red
};

// Usage:
import { ORDER_STATUS, ORDER_STATUS_COLORS } from '../constants/orderStatus';

function OrderStatus({ status }) {
  return <span style={{ color: ORDER_STATUS_COLORS[status] }}>{status}</span>;
}
```

---

### 8️⃣ UTILS (Helper Functions)

**Example: format.js**
```jsx
// utils/format.js
/**
 * Format number as currency (USD)
 * @param {number} amount
 * @returns {string} Formatted price (e.g., "$123.45")
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Format date as readable string
 * @param {Date|string} date
 * @returns {string} Formatted date (e.g., "Jan 15, 2025")
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Usage:
import { formatCurrency, formatDate } from '../utils/format';

function OrderCard({ order }) {
  return (
    <>
      <p>Total: {formatCurrency(order.total)}</p>
      <p>Date: {formatDate(order.createdAt)}</p>
    </>
  );
}
```

---

### 9️⃣ STYLES (CSS)

**Rules:**
- Use CSS classes (not inline styles)
- Follow naming convention: `component-name__element--modifier`
- Keep global CSS minimal
- Each component gets its own CSS file

**Example: ProductCard.jsx + ProductCard.css**
```jsx
// components/common/ProductCard.jsx
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} className="product-card__image" alt="" />
      <h3 className="product-card__title">{product.title}</h3>
      <p className="product-card__price">${product.price}</p>
      <button className="btn btn--primary">Add to Cart</button>
    </div>
  );
}
```

```css
/* components/common/ProductCard.css */
.product-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.product-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 12px;
}

.product-card__title {
  font-size: 18px;
  font-weight: 600;
  margin: 12px 0 8px;
  color: #1f2937;
}

.product-card__price {
  font-size: 20px;
  font-weight: 700;
  color: #22c55e;
  margin: 8px 0 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .product-card {
    padding: 12px;
  }
}
```

---

## Common Tasks With Examples

### Task 1: Add a New Page

**Steps:**
1. Create page component in `pages/`
2. Create custom hook for data if needed
3. Register route in `App.js`
4. Create CSS file in `styles/pages/`

**Example: Creating ServiceDetailPage**

```jsx
// pages/ServiceDetailPage.js
/**
 * ServiceDetailPage
 * Route: /service/:id
 * Shows detailed info about one service
 */
import { useParams } from 'react-router-dom';
import { useApi } from '../hooks';
import Skeleton from '../components/Skeleton';
import '../styles/pages/service-detail.css';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const { data: service, loading, error } = useApi(`/services/${id}`);

  if (loading) return <Skeleton />;
  if (error) return <div className="error">Service not found</div>;

  return (
    <div className="service-detail">
      <img src={service.image} alt={service.name} />
      <h1>{service.name}</h1>
      <p>{service.description}</p>
      <button>Request Quote</button>
    </div>
  );
}
```

```jsx
// In App.js - Add to Routes:
import ServiceDetailPage from './pages/ServiceDetailPage';

<Route 
  path="/service/:id" 
  element={<PublicLayout><ServiceDetailPage /></PublicLayout>} 
/>
```

---

### Task 2: Create a Reusable Component

**Steps:**
1. Determine where it belongs (`common/`, `sections/`, etc.)
2. Write JSDoc with props
3. Create component file
4. Create CSS file
5. Export from components

**Example: Creating AlertBox Component**

```jsx
// components/common/AlertBox.jsx
/**
 * AlertBox - Display alert message with optional close button
 * @param {string} type - 'success' | 'error' | 'warning' | 'info'
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {Function} onClose - Called when user closes alert
 */
import './AlertBox.css';

export default function AlertBox({ type = 'info', title, message, onClose }) {
  return (
    <div className={`alert alert--${type}`}>
      <div className="alert__content">
        <h4 className="alert__title">{title}</h4>
        <p className="alert__message">{message}</p>
      </div>
      {onClose && (
        <button className="alert__close" onClick={onClose}>✕</button>
      )}
    </div>
  );
}
```

```css
/* components/common/AlertBox.css */
.alert {
  padding: 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.alert--success { background: #d1fae5; border-left: 4px solid #10b981; }
.alert--error   { background: #fee2e2; border-left: 4px solid #ef4444; }
.alert--warning { background: #fef3c7; border-left: 4px solid #f59e0b; }
.alert--info    { background: #dbeafe; border-left: 4px solid #3b82f6; }

.alert__title {
  font-weight: 600;
  margin-bottom: 4px;
}

.alert__close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #6b7280;
}
```

```jsx
// Usage in component:
import AlertBox from '../components/common/AlertBox';

function MyForm() {
  const [alert, setAlert] = useToggle();
  
  return (
    <>
      {alert && (
        <AlertBox
          type="success"
          title="Success!"
          message="Your form was submitted."
          onClose={() => setAlert(false)}
        />
      )}
      <form onSubmit={() => setAlert(true)}>...</form>
    </>
  );
}
```

---

### Task 3: Fetch Data from API

**Pattern:**
```jsx
// Step 1: Create custom hook
export function useMyData() {
  return useApi('/endpoint');
}

// Step 2: Use in component
import { useMyData } from '../hooks/useMyData';

function MyComponent() {
  const { data, loading, error, refetch } = useMyData();
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage onRetry={refetch} />;
  
  return <div>{/* Render data */}</div>;
}
```

---

### Task 4: Handle Form Data

**Pattern:**
```jsx
import { useForm } from '../hooks';

function MyForm() {
  const { values, handleChange, handleSubmit, errors } = useForm(
    { name: '', email: '' },
    async (values) => {
      // This runs when form is submitted
      const response = await myService.submit(values);
    }
  );
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      {errors.name && <span>{errors.name}</span>}
    </form>
  );
}
```

---

### Task 5: Use Authentication

**Pattern:**
```jsx
import { useAuth } from '../hooks';

function UserMenu() {
  const { user, isLoggedIn, login, logout } = useAuth();
  
  if (!isLoggedIn) {
    return <button onClick={() => login(email, password)}>Login</button>;
  }
  
  return (
    <>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </>
  );
}
```

---

## Code Quality Checklist

### Before Submitting Code

- [ ] **Naming**
  - [ ] Variables are descriptive: `isLoading` not `load`
  - [ ] Functions are verb-first: `handleClick()` not `onClick()`
  - [ ] Components are PascalCase: `ProductCard` not `productCard`

- [ ] **Structure**
  - [ ] Component is in correct folder
  - [ ] Related CSS file exists (if needed)
  - [ ] File has JSDoc comment at top
  - [ ] No hardcoded values (use constants)

- [ ] **Logic**
  - [ ] No API calls in component directly (use hooks)
  - [ ] No inline styles (use CSS files)
  - [ ] Error handling exists
  - [ ] Loading states shown

- [ ] **Performance**
  - [ ] No unnecessary re-renders
  - [ ] Images are optimized
  - [ ] No console.log left in code
  - [ ] Dependencies listed correctly in useEffect

- [ ] **Styling**
  - [ ] CSS follows naming convention
  - [ ] Mobile responsive (uses media queries)
  - [ ] Consistent with design system

---

## Debugging & Troubleshooting

### Common Issues

**Issue: Component not updating**
```jsx
// ❌ Wrong - React doesn't detect change
setState(state.items[0].name = 'New');

// ✅ Correct - Create new object
setState({ ...state, items: [...state.items] });
```

**Issue: API call runs infinitely**
```jsx
// ❌ Wrong - No dependencies, runs every render
useEffect(() => {
  fetchData();
});

// ✅ Correct - Has dependency array
useEffect(() => {
  fetchData();
}, []); // Empty = runs once on mount
```

**Issue: useApi hook not working**
```jsx
// Make sure you're catching the error properly
const { data, loading, error } = useApi('/url');

if (!loading && !data) {
  // Fetch started but no data yet
}
```

### Debug Tools

**1. React DevTools (Chrome Extension)**
- View component hierarchy
- Inspect props and state
- Performance profiler

**2. Network Tab**
- Check API requests/responses
- See Status codes (200, 404, 500)
- Check response data format

**3. Console**
```jsx
// Log in components
console.log('User:', user);
console.log('Loading:', loading);

// Log API calls
api.interceptors.response.use(res => {
  console.log('API Response:', res);
  return res;
});
```

**4. Check Files**
```bash
# In terminal, check if .env.local exists
ls frontend/.env.local

# Check if backend is running
curl http://localhost:5000/api
```

---

## Quick Reference

### Import Patterns

```jsx
// ✅ Hooks - From hooks folder
import { useApi, useForm, useAuth, useCart } from '../hooks';

// ✅ Services - From services folder
import { authService, productService, orderService } from '../services';

// ✅ Utils - From utils folder
import { formatCurrency, validateEmail } from '../utils';

// ✅ Constants - From constants folder
import { ORDER_STATUS } from '../constants/orderStatus';

// ✅ Config - From config folder
import { API_ENDPOINTS } from '../config/api.config';

// ✅ Components - From components folder
import Button from '../components/common/Button';
import ProductCard from '../components/sections/ProductCard';
```

### Folder Decision Tree

```
What are you creating?

├─ Is it a page/route?
│  └─ Put in pages/ (e.g., ProductsPage.js)
│
├─ Is it UI that appears in many places?
│  ├─ Navigation/layout-related?
│  │  └─ Put in components/layout/
│  ├─ Small reusable piece (Button, Card)?
│  │  └─ Put in components/common/
│  └─ Large section (Hero, Stats)?
│     └─ Put in components/sections/
│
├─ Is it business logic/data fetching?
│  ├─ Custom hook logic?
│  │  └─ Put in hooks/ (e.g., useProducts.js)
│  └─ API calls?
│     └─ Put in services/ (e.g., product.service.js)
│
├─ Is it a constant value?
│  ├─ Status, colors, enum?
│  │  └─ Put in constants/
│  └─ API endpoint, route?
│     └─ Put in config/
│
├─ Is it a helper function?
│  └─ Put in utils/ (e.g., format.js, validate.js)
│
└─ Is it global state?
   └─ Put in context/ (AuthContext, CartContext)
```

### Commands

```bash
# Development
npm start           # Start dev server (port 3000)
npm run build       # Create production build
npm test            # Run tests
npm run eject       # ⚠️ Irreversible

# Check errors
npm run lint        # Show linting issues

# Cleanup
npm cache clean     # Clear cache if issues
rm -rf node_modules && npm install  # Reinstall everything
```

---

## Getting Help

### Documentation Files (In Order of Reading)
1. **This file** - You're reading it!
2. `FRONTEND_QUICK_REFERENCE.md` - Import patterns & common usage
3. `FRONTEND_CODING_GUIDELINES.md` - Code style examples
4. `FRONTEND_ARCHITECTURE.md` - Design principles
5. `FRONTEND_START_HERE.md` - Navigation guide

### Example Components to Learn From
- Look at existing components in `src/components/`
- Check how data is fetched in `src/pages/`
- See API patterns in `src/services/`

### Ask Questions
- Check existing code for similar patterns
- Search for JSDoc comments (/** */)
- Look at git history for similar changes

---

## Summary

✅ **This is your complete guide to:**
- Where to put new code
- How to structure components
- Common patterns to follow
- How to debug issues

**Key Takeaway:**
Every file has a purpose. When you know the purpose, the structure becomes clear.

**Next Step:**
Pick a task and start coding! The folder structure will guide you.

