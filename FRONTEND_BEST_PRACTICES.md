# Frontend Best Practices & Common Mistakes

## ✅ DO's and ❌ DON'Ts

---

## 1. Component Structure

### ❌ BAD: Component with mixed concerns
```jsx
// components/OrderList.jsx - Kitchen sink component
import { useState, useEffect } from 'react';
import axios from 'axios';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // ❌ WRONG: API call directly in component
    setLoading(true);
    axios.get('/api/orders').then(res => {
      setOrders(res.data);
      setLoading(false);
    });
  }, []);

  // ❌ WRONG: Validation logic in component
  const validateOrder = (order) => {
    if (!order.id) return false;
    if (order.total < 0) return false;
    return true;
  };

  // ❌ WRONG: Complex rendering logic
  return (
    <div style={{ padding: '20px', background: '#fff' }}>
      {loading ? <div>Loading...</div> : (
        orders.filter(o => {
          if (filter === 'all') return true;
          if (filter === 'completed') return o.status === 'completed';
          if (filter === 'pending') return o.status === 'pending';
          return false;
        }).map(order => (
          <div key={order.id} style={{
            border: '1px solid #ccc',
            padding: '10px',
            margin: '10px',
            borderRadius: '4px'
          }}>
            <h3>{order.id}</h3>
            <p>${order.total.toFixed(2)}</p>
            <button onClick={() => {
              axios.delete(`/api/orders/${order.id}`).then(() => {
                setOrders(orders.filter(o => o.id !== order.id));
              });
            }}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
```

### ✅ GOOD: Separated concerns
```jsx
// hooks/useOrders.js
import { useApi } from './useApi';

export function useOrders(filter) {
  const { data: allOrders, loading, error } = useApi('/orders');
  
  // Filtering logic in hook, not component
  const orders = allOrders?.filter(o => {
    if (filter === 'all') return true;
    if (filter === 'completed') return o.status === 'completed';
    if (filter === 'pending') return o.status === 'pending';
    return false;
  }) || [];

  return { orders, loading, error };
}

// services/order.service.js
import api from './api';

export const orderService = {
  getAll: async () => {
    const { data } = await api.get('/orders');
    return data;
  },

  delete: async (id) => {
    await api.delete(`/orders/${id}`);
  },
};

// components/sections/OrderList.jsx (PURE DISPLAY)
import { useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { orderService } from '../../services/order.service';
import { useToast } from '../../hooks';
import OrderCard from '../common/OrderCard';
import './OrderList.css';

export default function OrderList() {
  const [filter, setFilter] = useState('all');
  const { orders, loading, error } = useOrders(filter);
  const { showToast } = useToast();

  const handleDelete = async (orderId) => {
    try {
      await orderService.delete(orderId);
      showToast('Order deleted', 'success');
      // Refetch handled by hook
    } catch (err) {
      showToast('Failed to delete', 'error');
    }
  };

  if (loading) return <Skeleton />;
  if (error) return <ErrorMessage />;

  return (
    <div className="order-list">
      <FilterButtons filter={filter} onChange={setFilter} />
      <div className="order-list__grid">
        {orders.map(order => (
          <OrderCard 
            key={order.id} 
            order={order} 
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
```

**Why it's better:**
- ✅ Component only displays data
- ✅ Hooks handle logic & data fetching
- ✅ Services handle API calls
- ✅ Easy to test each piece
- ✅ Reusable across components

---

## 2. State Management

### ❌ BAD: Prop drilling (passing props through many levels)
```jsx
// App.js
function App() {
  const [user, setUser] = useState(null);
  return <Page user={user} setUser={setUser} />;
}

// Page.js
function Page({ user, setUser }) {
  return <Layout user={user} setUser={setUser} />;
}

// Layout.js
function Layout({ user, setUser }) {
  return <Header user={user} setUser={setUser} />;
}

// Header.js
function Header({ user, setUser }) {
  return <UserMenu user={user} setUser={setUser} />;
}

// UserMenu.js
function UserMenu({ user, setUser }) {
  return <button onClick={() => setUser(null)}>Logout {user.name}</button>;
}
```

### ✅ GOOD: Use context for global state
```jsx
// context/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// App.js
function App() {
  return (
    <AuthProvider>
      <Page />
    </AuthProvider>
  );
}

// UserMenu.js - Access directly, no props needed
import { useAuth } from '../hooks';

function UserMenu() {
  const { user, setUser } = useAuth();
  return <button onClick={() => setUser(null)}>Logout {user.name}</button>;
}
```

**Better because:**
- ✅ No prop drilling
- ✅ Access state from anywhere
- ✅ Less component re-renders
- ✅ Cleaner code

---

## 3. API Calls

### ❌ BAD: Direct axios in components
```jsx
function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ❌ WRONG: Axios called directly
    setLoading(true);
    axios.get('http://localhost:5000/api/products', {
      // ❌ WRONG: Hardcoded URL
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      // ❌ WRONG: Manual token handling
    }).then(res => {
      setProducts(res.data);
      setLoading(false);
    }).catch(err => {
      console.log('Error:', err); // ❌ WRONG: No error state
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading && <span>Loading...</span>}
      {products.map(p => <div key={p.id}>{p.name}</div>)}
    </div>
  );
}
```

### ✅ GOOD: Use custom hook + service
```jsx
// hooks/useProducts.js
import { useApi } from './useApi';

export function useProducts() {
  return useApi('/products'); // ✅ Cleaner
}

// components/ProductsPage.js
import { useProducts } from '../hooks/useProducts';
import Skeleton from '../components/Skeleton';

function ProductsPage() {
  const { data: products, loading, error, refetch } = useProducts();
  // ✅ Hook handles: API call, token, error handling, loading state

  if (loading) return <Skeleton />;
  if (error) return <ErrorMessage onRetry={refetch} />;

  return (
    <div>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
```

**Benefits:**
- ✅ Automatic token handling
- ✅ Centralized error handling
- ✅ Consistent API calls
- ✅ Reusable logic
- ✅ Configuration in one place

---

## 4. Styling

### ❌ BAD: Inline styles
```jsx
function Button({ variant }) {
  return (
    <button style={{
      padding: variant === 'lg' ? '16px 24px' : '8px 12px',
      background: variant === 'primary' ? '#22C55E' : '#3B82F6',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.2s',
      ':hover': { opacity: 0.9 } // ❌ Doesn't work in inline styles
    }}>
      Click Me
    </button>
  );
}
```

### ✅ GOOD: CSS classes
```jsx
// components/common/Button.jsx
import './Button.css';

function Button({ variant = 'primary', size = 'md' }) {
  return (
    <button className={`btn btn--${variant} btn--${size}`}>
      Click Me
    </button>
  );
}

/* components/common/Button.css */
.btn {
  padding: 8px 12px;
  background: #3B82F6;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn--primary { background: #22C55E; }
.btn--secondary { background: #3B82F6; }

.btn--sm { padding: 6px 10px; font-size: 12px; }
.btn--md { padding: 8px 12px; font-size: 14px; }
.btn--lg { padding: 16px 24px; font-size: 16px; }
```

**Why CSS is better:**
- ✅ Cleaner JSX
- ✅ Reusable styles
- ✅ Easier to maintain
- ✅ Browser dev tools work
- ✅ CSS features work (:hover, :focus, etc)

---

## 5. Error Handling

### ❌ BAD: Ignoring errors
```jsx
function LoginForm() {
  const handleSubmit = async (email, password) => {
    // ❌ No error handling
    const response = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    window.location.href = '/dashboard';
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### ✅ GOOD: Comprehensive error handling
```jsx
import { useToast } from '../hooks';

function LoginForm() {
  const { showToast } = useToast();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (email, password) => {
    try {
      setLoading(true);
      await login(email, password); // ✅ Uses service with error handling
      showToast('Logged in successfully!', 'success');
      // Navigation handled by router/auth guard
    } catch (error) {
      // ✅ Show user-friendly error message
      const message = error.response?.data?.message || 'Login failed. Try again.';
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

**Better handling:**
- ✅ Try-catch block
- ✅ User-friendly messages
- ✅ Loading state
- ✅ Network error handling
- ✅ Specific error messages

---

## 6. Names & Naming

### ❌ BAD: Unclear names
```jsx
function PC() { // ❌ What is PC?
  const [x, setX] = useState(null); // ❌ What is x?
  const [y, setY] = useState([]);   // ❌ What is y?

  const fn = async (z) => { // ❌ What does fn do?
    // ...
  };

  return <div className="c">{/* ❌ What is .c? */}</div>;
}
```

### ✅ GOOD: Descriptive names
```jsx
function ProductCard() { // ✅ Clear: displays a product card
  const [product, setProduct] = useState(null); // ✅ What it contains
  const [reviews, setReviews] = useState([]);   // ✅ Array of reviews

  const handleAddToCart = async (productId) => { // ✅ What it does
    // ...
  };

  return <div className="product-card">{/* ✅ Semantic CSS class */}</div>;
}
```

**Naming Rules:**
- ✅ Components: `PascalCase` - `ProductCard`, `UserProfile`
- ✅ Functions: `camelCase` - `handleClick`, `formatDate`
- ✅ Variables: `camelCase` - `userName`, `isLoading`
- ✅ Hooks: `useXxx` - `useProducts`, `useForm`
- ✅ Services: `camelCase` - `productService`
- ✅ CSS Classes: `kebab-case` - `product-card`
- ✅ Constants: `SCREAMING_SNAKE_CASE` - `API_URL`

---

## 7. Performance

### ❌ BAD: Unnecessary re-renders
```jsx
function ParentComponent() {
  const [count, setCount] = useState(0); // ✅ This is fine
  const [data, setData] = useState([]); // ✅ This is fine

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      
      {/* ❌ BAD: This re-renders even when 'data' doesn't change */}
      <ChildComponent data={data} />
    </>
  );
}
```

### ✅ GOOD: Memoize when needed
```jsx
import { useMemo } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  // ✅ Memoize: only recalculate if data changes
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      
      {/* ✅ Only re-renders if sortedData actually changes */}
      <ChildComponent data={sortedData} />
    </>
  );
}
```

**Performance Tips:**
- ✅ Use `useMemo()` for expensive computations
- ✅ Use `useCallback()` for function references
- ✅ Use `React.memo()` to skip re-renders
- ✅ Keep state as local as possible
- ✅ Lazy load routes with `React.lazy()`

---

## 8. useEffect Patterns

### ❌ BAD: Missing dependencies
```jsx
function DataComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // ❌ WRONG: No dependency array - runs every render!
    fetch('/api/data').then(r => setData(r.json()));
  }); // ❌ Missing dependency array

  return <div>{data}</div>;
}
```

### ✅ GOOD: Proper dependencies
```jsx
function DataComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // ✅ Runs once on mount
    fetch('/api/data').then(r => setData(r.json()));
  }, []); // ✅ Empty deps = run once

  return <div>{data}</div>;
}

// OR with dependencies:
function ProductComponent({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // ✅ Runs when productId changes
    fetch(`/api/products/${productId}`)
      .then(r => setProduct(r.json()));
  }, [productId]); // ✅ Deps array includes productId

  return <div>{product?.name}</div>;
}
```

**useEffect Rules:**
- ✅ `[]` = Run once on mount
- ✅ `[dep1, dep2]` = Run when deps change
- ✅ No array = Run on every render (avoid!)
- ✅ Include all dependencies that are used inside

---

## 9. Validation

### ❌ BAD: No validation
```jsx
function RegistrationForm() {
  const handleSubmit = async (formData) => {
    // ❌ No validation
    await authService.register(formData);
  };

  return <form onSubmit={handleSubmit}>
    <input name="email" />
    <input name="password" />
    <button>Register</button>
  </form>;
}
```

### ✅ GOOD: Client & server validation
```jsx
// utils/validate.js
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  if (password.length < 8) return 'Min 8 characters';
  if (!password.match(/[A-Z]/)) return 'Needs uppercase letter';
  if (!password.match(/[0-9]/)) return 'Needs a number';
  return null;
};

// Form with validation
import { useForm } from '../hooks';
import { validateEmail, validatePassword } from '../utils/validate';

function RegistrationForm() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    async (values) => {
      // ✅ Server validates too
      await authService.register(values);
    }
  );

  // Custom validation rules
  const validateForm = () => {
    const newErrors = {};
    
    if (!validateEmail(values.email)) {
      newErrors.email = 'Invalid email';
    }
    
    const passError = validatePassword(values.password);
    if (passError) {
      newErrors.password = passError;
    }
    
    return newErrors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="email" 
        value={values.email}
        onChange={handleChange}
      />
      {errors.email && <span className="error">{errors.email}</span>}
      
      <input 
        name="password" 
        type="password"
        value={values.password}
        onChange={handleChange}
      />
      {errors.password && <span className="error">{errors.password}</span>}
      
      <button type="submit">Register</button>
    </form>
  );
}
```

**Validation Strategy:**
- ✅ Client: Fast feedback to user
- ✅ Server: Security & data integrity
- ✅ Show specific error messages
- ✅ Validate on blur (not on every keystroke)

---

## 10. Common Mistakes Checklist

- [ ] ❌ API calls in component render
- [ ] ❌ Inline styles everywhere
- [ ] ❌ Hardcoded URLs
- [ ] ❌ No error handling
- [ ] ❌ Prop drilling too deep
- [ ] ❌ Missing useEffect dependencies
- [ ] ❌ Unclear variable names
- [ ] ❌ console.log in production
- [ ] ❌ No loading states
- [ ] ❌ No input validation
- [ ] ❌ Images not optimized
- [ ] ❌ Functions recreated on every render
- [ ] ❌ State shared when it should be local
- [ ] ❌ No error boundaries
- [ ] ❌ Memory leaks from uncancelled requests

---

## Quick Summary

| Do | Don't |
|---|---|
| Separate concerns | Mix logic & presentation |
| Use hooks for logic | Put logic in components |
| Use CSS for styling | Inline styles everywhere |
| Validate input | Trust user input |
| Handle errors | Ignore failures |
| Use context for global state | Prop drill deeply |
| Meaningful names | Unclear abbreviations |
| JSDoc comments | No documentation |
| Mobile responsive | Desktop only |
| Lazy load images | Load everything |

