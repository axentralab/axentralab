# Frontend Coding Guidelines

## 📋 Quick Checklist Before You Code

- [ ] Is this a reusable component? → Put in `components/`
- [ ] Is this a page? → Put in `pages/`
- [ ] Is this a custom logic? → Put in `hooks/`
- [ ] Is this an API call? → Put in `services/`
- [ ] Is this a helper function? → Put in `utils/`
- [ ] Is this a constant? → Put in `constants/` or `config/`
- [ ] Does it need styling? → Use CSS classes, not inline styles
- [ ] Is it documented? → Add JSDoc comments

---

## 1️⃣ Component Structure

### ✅ Good: Well-structured component
```jsx
/**
 * ProductCard - Displays a single product
 * @param {Object} product - { id, title, price, image }
 * @param {Function} onAddToCart - Callback when user clicks buy
 */
import { useState } from 'react';
import { formatCurrency } from '../../utils/format';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    onAddToCart({ ...product, quantity });
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-card__image" />
      <h3 className="product-card__title">{product.title}</h3>
      <p className="product-card__price">{formatCurrency(product.price)}</p>
      <button onClick={handleAdd} className="btn btn--primary">
        Add to Cart
      </button>
    </div>
  );
}
```

### ❌ Bad: Messy component
```jsx
// No docs, unclear structure
function ProductCard(props) {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <img src={props.product.image} />
      <h3>{props.product.title}</h3>
      <p style={{ color: 'green', fontSize: '18px' }}>
        ${props.product.price}
      </p>
      <button 
        onClick={() => props.onAddToCart(props.product)} 
        style={{ padding: '10px 20px', background: '#22C55E' }}
      >
        Buy
      </button>
    </div>
  );
}
```

---

## 2️⃣ Hook Usage

### ✅ Good: Custom hook for API fetching
```jsx
// hooks/useProducts.js
import { useApi } from './useApi';
import { productService } from '../services/product.service';

export function useProducts() {
  return useApi('/products');
}

// Usage in component
import { useProducts } from '../hooks/useProducts';

function ProductsPage() {
  const { data: products, loading, error } = useProducts();
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return <div>{products.map(p => <ProductCard key={p.id} product={p} />)}</div>;
}
```

### ❌ Bad: Logic scattered in components
```jsx
function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(d => {
        setProducts(d.data);
        setLoading(false);
      });
  }, []);

  // ... more code
}
```

---

## 3️⃣ Remote Data & API Calls

### ✅ Good: Service layer pattern
```jsx
// services/customer.service.js
import api from './api';

export const customerService = {
  getAll: (filters) => api.get('/customers', { params: filters }),
  create: (data) => api.post('/customers', data),
  update: (id, data) => api.put(`/customers/${id}`, data),
  delete: (id) => api.delete(`/customers/${id}`),
};

// hooks/useCustomers.js
export function useCustomers(filters) {
  const { data, loading, error, refetch } = useApi(
    `/customers?${new URLSearchParams(filters)}`,
    [JSON.stringify(filters)]
  );
  return { customers: data, loading, error, refetch };
}

// pages/CustomersPage.js
import { useCustomers } from '../hooks/useCustomers';

function CustomersPage() {
  const { customers, loading } = useCustomers({ status: 'active' });
  return <CustomerList customers={customers} loading={loading} />;
}
```

### ❌ Bad: Direct API calls everywhere
```jsx
function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/customers?status=active')
      .then(res => setCustomers(res.data.data));
  }, []);

  return <div>{customers.map(c => <div key={c.id}>{c.name}</div>)}</div>;
}
```

---

## 4️⃣ State Management

### ✅ Good: Appropriate state placement
```jsx
// Local state for UI-only concerns
function OrderFilters() {
  const [sortBy, setSortBy] = useState('date');
  return <select value={sortBy} onChange={e => setSortBy(e.target.value)} />;
}

// Global context for shared state (user, cart, theme, notifications)
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  return <UserMenu user={user} onLogout={logout} />;
}

// Custom hooks for complex local state
function OrderForm() {
  const form = useForm(
    { customerName: '', items: [] },
    async (values) => {
      await orderService.create(values);
    }
  );
  return <form onSubmit={form.handleSubmit}>{/* ... */}</form>;
}
```

### ❌ Bad: State management antipatterns
```jsx
// ❌ Don't use context for everything
const FormContext = createContext();

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({});
  // ... probably overkill for local form state
}

// ❌ Don't fetch in useEffect without dependencies
useEffect(() => {
  fetch('/api/data').then(/* ... */);
  // Missing dependencies array - infinite loops!
});
```

---

## 5️⃣ Error Handling

### ✅ Good: Proper error handling
```jsx
print function MyComponent() {
  const { data, loading, error } = useApi('/products');

  if (loading) return <Skeleton />;
  
  if (error) {
    return (
      <ErrorBoundary>
        <AlertBanner 
          type="error" 
          message="Failed to load products. Please try again."
          onRetry={refetch}
        />
      </ErrorBoundary>
    );
  }

  return <ProductList products={data} />;
}

// In service layer
export const productService = {
  getAll: async () => {
    try {
      const res = await api.get('/products');
      return res.data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw new Error(error.response?.data?.message || 'Failed to load products');
    }
  },
};
```

### ❌ Bad: Missing error handling
```jsx
function MyComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/products').then(r => setData(r.data)); // No error handling!
  }, []);

  return <div>{data.map(/* ... */)}</div>;
}
```

---

## 6️⃣ Form Handling

### ✅ Good: Using form hook
```jsx
import { useForm } from '../hooks/useForm';
import { validateForm } from '../utils/validate';

function LoginForm() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    async (formData) => {
      const errors = validateForm(formData, {
        email: { required: true, type: 'email' },
        password: { required: true, minLength: 6 },
      });

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }

      await authService.login(formData.email, formData.password);
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email}</span>}
      
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
      />
      {errors.password && <span className="error">{errors.password}</span>}
      
      <button type="submit">Login</button>
    </form>
  );
}
```

### ❌ Bad: Uncontrolled forms
```jsx
function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(emailRef.current.value, passwordRef.current.value);
    // Hard to validate, hard to manage state
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} placeholder="Email" />
      <input ref={passwordRef} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## 7️⃣ Styling Best Practices

### ✅ Good: CSS classes + CSS variables
```jsx
// components/Button.jsx
import './Button.css';

export default function Button({ children, variant = 'primary', disabled }) {
  return (
    <button className={`btn btn--${variant} ${disabled ? 'is-disabled' : ''}`}>
      {children}
    </button>
  );
}

// styles/components/button.css
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn--primary {
  background: var(--primary);
  color: white;
}

.btn--primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.btn.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### ❌ Bad: Inline styles & magic numbers
```jsx
function Button({ children, primary }) {
  return (
    <button
      style={{
        padding: '8px 16px',
        background: primary ? '#22C55E' : '#E5E7EB',
        color: primary ? 'white' : '#374151',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
      }}
    >
      {children}
    </button>
  );
}
```

---

## 8️⃣ Naming Conventions

### ✅ Clear naming
```jsx
// Components
function UserProfileCard() { }
function LoginForm() { }
function ProductListPage() { }

// Variables & functions
const isAuthenticated = true;
const user = getCurrentUser();
const handleFormSubmit = () => {};
const validateEmail = (email) => {};

// Constants
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT = 5000;
const API_BASE_URL = 'http://localhost:5000/api';

// CSS classes (BEM naming)
.product-card { }
.product-card__image { }
.product-card--featured { }
.product-card.is-loading { }
```

### ❌ Unclear naming
```jsx
function PC() { } // What is PC?
function x() { } // What does x do?

const a = true;
const data = getData();
const h = () => {};

const CONST1 = 3; // What is CONST1?

.card { } // Too generic
.big { } // Unclear
```

---

## 9️⃣ Comments & Documentation

### ✅ Good: Clear documentation
```jsx
/**
 * OrderCard - Displays order summary in admin dashboard
 * 
 * Supports:
 * - Order status badges with color coding
 * - Quick actions (view, edit, delete)
 * - Export to PDF
 * 
 * @param {Object} order - { id, date, status, items, total }
 * @param {Function} onViewDetails - Called when user clicks "View"
 * @param {Function} onExport - Called when user clicks "Export PDF"
 * @returns {JSX.Element}
 * 
 * @example
 * <OrderCard 
 *   order={order} 
 *   onViewDetails={handleView}
 *   onExport={handleExport}
 * />
 */
export default function OrderCard({ order, onViewDetails, onExport }) {
  // ...
}
```

### ❌ Bad: Missing or unclear docs
```jsx
function OrderCard(props) {
  // display order
  return (
    <div>
      {/* order stuff */}
      <button onClick={props.onClick}>View</button>
    </div>
  );
}
```

---

## 🔟 Testing Mindset

### ✅ Write testable code
```jsx
// Pure functions (easy to test)
export const calculateDiscount = (price, discountPercent) => {
  return price * (1 - discountPercent / 100);
};

// Separated concerns (easy to mock)
function PriceDisplay({ item, discountService }) {
  const discountedPrice = discountService.calculate(item.price, item.discount);
  return <span>${discountedPrice}</span>;
}

// Hooks with dependencies (easy to test)
function useProductFilter(products, filter) {
  return useMemo(() => {
    return products.filter(p => p.category === filter);
  }, [products, filter]);
}
```

---

## 💾 File Size Guidelines

- **Component**: < 300 lines (consider breaking into smaller components)
- **Hook**: < 150 lines
- **Service**: < 100 lines
- **Utility function**: < 50 lines

If a file is getting too big, split it!

---

## 🎯 Code Review Checklist

- [ ] Follows folder structure?
- [ ] Has JSDoc comments?
- [ ] Props are typed/documented?
- [ ] Error handling present?
- [ ] Loading states handled?
- [ ] No console.logs or debug code?
- [ ] Uses services/hooks, not direct API calls?
- [ ] Uses utility functions, not repetitive code?
- [ ] No inline styles?
- [ ] Component name is PascalCase?
- [ ] Imports are from correct paths?
- [ ] No unused imports or variables?
- [ ] Responsive design considered?
- [ ] Accessible (a11y basics)?

---

🚀 **Happy coding!**
