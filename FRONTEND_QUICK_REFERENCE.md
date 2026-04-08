# Frontend Quick Reference Guide

## 📚 How to Import Everything

### Custom Hooks
```jsx
// ✅ From hooks directory
import { useApi, useForm, useCart, useAuth } from '../hooks';
// Or individual imports
import { useApi } from '../hooks/useApi';
```

### Services (API calls)
```jsx
// ✅ From services directory
import { authService, productService, orderService } from '../services';
// Or individual imports
import { authService } from '../services/auth.service';
```

### Utilities & Helpers
```jsx
// ✅ From utils directory
import { formatCurrency, validateEmail, mergeObjects } from '../utils';
// Or by category
import { formatCurrency, formatDate } from '../utils/format';
import { validateEmail, validatePhone } from '../utils/validate';
```

### Constants & Config
```jsx
// ✅ API endpoints
import { API_ENDPOINTS } from '../config/api.config';

// ✅ Routes
import { ROUTES } from '../config/routes.config';

// ✅ App constants
import { PAGINATION, MODAL_SIZES, BUTTON_VARIANTS } from '../config/app.config';

// ✅ Status/Order constants
import { ORDER_STATUS, ORDER_STATUS_COLORS } from '../constants/orderStatus';
```

### Contexts
```jsx
// ✅ Use hooks instead of direct context
import { useAuth } from '../hooks';
import { useCart } from '../hooks';
import { useToast } from '../hooks';

// Or direct context (if needed)
import { AuthContext } from '../context/AuthContext';
```

---

## 🛠️ Common Patterns

### Fetching Data
```jsx
import { useApi } from '../hooks/useApi';
import { productService } from '../services/product.service';

function ProductsPage() {
  const { data: products, loading, error, refetch } = useApi('/products');

  return (
    <div>
      {loading && <Skeleton />}
      {error && <ErrorMessage onRetry={refetch} />}
      {products?.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
```

### Handling Forms
```jsx
import { useForm } from '../hooks/useForm';
import { validateForm } from '../utils/validate';

function LoginForm() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    async (data) => {
      const errs = validateForm(data, {
        email: { required: true, type: 'email' },
        password: { required: true, minLength: 6 },
      });
      if (Object.keys(errs).length) return;
      await authService.login(data.email, data.password);
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={values.email} onChange={handleChange} />
      {errors.email && <span>{errors.email}</span>}
      <button type="submit">Login</button>
    </form>
  );
}
```

### Formatting Data
```jsx
import { formatCurrency, formatDate, truncate } from '../utils/format';

function OrderItem({ order }) {
  return (
    <div>
      <p>{formatDate(order.date)}</p>
      <p>{formatCurrency(order.total)}</p>
      <p>{truncate(order.description, 50)}</p>
    </div>
  );
}
```

### Validating Input
```jsx
import { validateEmail, validatePassword, validateForm } from '../utils/validate';

// Individual validation
if (!validateEmail(email)) {
  setError('Invalid email');
}

// Form validation
const errors = validateForm(
  { name, email, password },
  {
    name: { required: true, minLength: 3 },
    email: { required: true, type: 'email' },
    password: { required: true, type: 'password' },
  }
);
```

### Working with URLs and Routes
```jsx
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes.config';

function Header() {
  const navigate = useNavigate();

  return (
    <nav>
      <a href={ROUTES.PUBLIC.HOME}>Home</a>
      <a href={ROUTES.PUBLIC.SERVICES}>Services</a>
      <a href={ROUTES.PUBLIC.BLOG}>Blog</a>
      <button onClick={() => navigate(ROUTES.DASHBOARD.HOME)}>
        Dashboard
      </button>
    </nav>
  );
}
```

### Managing Global State
```jsx
// Auth
import { useAuth } from '../hooks';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <UserMenu user={user} onLogout={logout} />
      ) : (
        <LoginButton />
      )}
    </>
  );
}

// Cart
import { useCart } from '../hooks';

function CartButton() {
  const { count, items, addItem, removeItem } = useCart();
  return <button>Cart ({count})</button>;
}
```

### Storing User Preferences
```jsx
import { useLocalStorage } from '../hooks';

function ThemeSwitcher() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Switch to {theme === 'light' ? 'dark' : 'light'} theme
    </button>
  );
}
```

### Debouncing Search Input
```jsx
import { useDebounce } from '../hooks';
import { productService } from '../services/product.service';

function SearchProducts() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const { data: results } = useApi(
    `/products?search=${debouncedQuery}`,
    [debouncedQuery]
  );

  return (
    <>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      <SearchResults results={results} />
    </>
  );
}
```

---

## 📋 File Location Cheatsheet

| What | Where | Example |
|------|-------|---------|
| Page component | `pages/` | `ProductsPage.js` |
| Reusable UI component | `components/common/` | `Button.jsx` |
| Section component | `components/sections/` | `HeroSection.jsx` |
| Form component | `components/forms/` | `LoginForm.jsx` |
| Layout component | `components/layout/` | `Navbar.js` |
| Custom hook | `hooks/` | `useProducts.js` |
| API service | `services/` | `product.service.js` |
| Utility function | `utils/` | `format.js` |
| Configuration | `config/` | `routes.config.js` |
| Constants | `constants/` | `orderStatus.js` |
| CSS stylesheet | `styles/` | `button.css` |

---

## 🔗 Common API Patterns

### Get data and display
```jsx
const { data, loading, error } = useApi('/products');
```

### POST request (create)
```jsx
const response = await productService.create(newProduct);
```

### PUT request (update)
```jsx
const response = await productService.update(id, updatedProduct);
```

### DELETE request
```jsx
const response = await productService.delete(id);
```

### Get with pagination
```jsx
const { data } = useApi(`/products?page=1&limit=10`);
```

### Get with filters
```jsx
const { data } = useApi(`/products?category=software&status=active`);
```

---

## 🎨 Styling Quick Tips

### ✅ DO Use CSS Classes
```jsx
<button className="btn btn--primary">Submit</button>
```

### ✅ DO Use CSS Variables
```css
:root {
  --primary: #22C55E;
  --secondary: #3B82F6;
  --radius: 8px;
}

.btn--primary {
  background: var(--primary);
  border-radius: var(--radius);
}
```

### ✅ DO Use BEM Naming
```css
.card {} /* Block */
.card__header {} /* Element */
.card--featured {} /* Modifier */
.card.is-active {} /* State */
```

### ❌ DON'T Use Inline Styles
```jsx
// ❌ Avoid this
<button style={{ background: 'green', padding: '10px' }}>Click</button>

// ✅ Use classes instead
<button className="btn btn--primary">Click</button>
```

---

## 🐛 Debugging Tips

### Log with context
```jsx
console.log('🔍 Component mounted:', { component: 'ProductPage', props });
console.warn('⚠️ API warning:', { status: 429, message: 'Too many requests' });
console.error('❌ API error:', { status: 500, message: 'Server error' });
```

### Use React DevTools
- Install "React Developer Tools" browser extension
- Inspect component props and state

### Use Network tab
- Open DevTools → Network tab
- Monitor API requests and responses

### Check localStorage
```jsx
console.log(localStorage.getItem('token'));
localStorage.removeItem('token');
```

---

## 📚 Documentation to Check

- [Frontend Structure Guide](./FRONTEND_STRUCTURE.md)
- [Coding Guidelines](./FRONTEND_CODING_GUIDELINES.md)
- [React Docs](https://react.dev)

---

✨ **Keep it simple. Make it clear. Help the next developer.**
