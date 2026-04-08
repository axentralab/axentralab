# 🚀 Frontend Development Cheat Sheet
## Quick Copy-Paste Patterns

---

## New Page Template

```jsx
// pages/NewPage.js
/**
 * NewPage
 * Route: /new-page
 * Description: What this page does
 */
import { useState } from 'react';
import { useApi } from '../hooks';
import Skeleton from '../components/Skeleton';
import '../styles/pages/new-page.css';

export default function NewPage() {
  const { data, loading, error } = useApi('/endpoint');

  if (loading) return <Skeleton />;
  if (error) return <div className="error">Error loading data</div>;

  return (
    <div className="new-page">
      <div className="container">
        <h1>Page Title</h1>
        {/* Your JSX here */}
      </div>
    </div>
  );
}
```

---

## New Component Template

```jsx
// components/common/NewComponent.jsx
/**
 * NewComponent - Brief description
 * @param {type} propName - Description
 * @param {Function} onAction - Description
 */
import './NewComponent.css';

export default function NewComponent({ propName, onAction }) {
  return (
    <div className="new-component">
      {/* Component JSX */}
    </div>
  );
}
```

```css
/* components/common/NewComponent.css */
.new-component {
  /* Styles */
}

@media (max-width: 768px) {
  .new-component {
    /* Mobile styles */
  }
}
```

---

## New Service Template

```jsx
// services/feature.service.js
import api from './api';

/**
 * featureService - Feature API methods
 */
export const featureService = {
  /**
   * Get all items
   * @returns {Promise<Array>}
   */
  getAll: async () => {
    const { data } = await api.get('/endpoint');
    return data;
  },

  /**
   * Get single item by ID
   * @param {string} id
   * @returns {Promise<Object>}
   */
  getById: async (id) => {
    const { data } = await api.get(`/endpoint/${id}`);
    return data;
  },

  /**
   * Create new item
   * @param {Object} itemData
   * @returns {Promise<Object>}
   */
  create: async (itemData) => {
    const { data } = await api.post('/endpoint', itemData);
    return data;
  },

  /**
   * Update item
   * @param {string} id
   * @param {Object} updates
   * @returns {Promise<Object>}
   */
  update: async (id, updates) => {
    const { data } = await api.patch(`/endpoint/${id}`, updates);
    return data;
  },

  /**
   * Delete item
   * @param {string} id
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    await api.delete(`/endpoint/${id}`);
  },
};
```

Then in `services/index.js`, add:
```jsx
export { featureService } from './feature.service';
```

---

## New Hook Template

```jsx
// hooks/useFeature.js
import { useApi } from './useApi';

/**
 * useFeature - Description of what this hook does
 * @param {type} param - Parameter description
 * @returns {Object} { data, loading, error, refetch }
 */
export function useFeature(param) {
  return useApi(`/endpoint?param=${param}`);
}
```

Then in `hooks/index.js`, add:
```jsx
export { useFeature } from './useFeature';
```

---

## Common Patterns

### Data Fetching
```jsx
import { useApi } from '../hooks';

function Component() {
  const { data, loading, error, refetch } = useApi('/endpoint');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  
  return <div>{/* Render data */}</div>;
}
```

### Form Handling
```jsx
import { useForm } from '../hooks';

function MyForm() {
  const { values, handleChange, handleSubmit, errors } = useForm(
    { field: '' },
    async (values) => {
      await apiCall(values);
      showSuccess('Done!');
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <input name="field" value={values.field} onChange={handleChange} />
      {errors.field && <span className="error">{errors.field}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Using Authentication
```jsx
import { useAuth } from '../hooks';

function Component() {
  const { user, isLoggedIn, login, logout } = useAuth();

  return isLoggedIn ? (
    <button onClick={logout}>Logout</button>
  ) : (
    <button onClick={() => login(email, password)}>Login</button>
  );
}
```

### Using Cart
```jsx
import { useCart } from '../hooks';

function AddToCart({ productId }) {
  const { addItem } = useCart();

  return (
    <button onClick={() => addItem(productId)}>
      Add to Cart
    </button>
  );
}
```

### Toast Notifications
```jsx
import { useToast } from '../hooks';

function Component() {
  const { showToast } = useToast();

  const handleSuccess = () => {
    showToast('Success message', 'success'); // or 'error', 'warning', 'info'
  };

  return <button onClick={handleSuccess}>Action</button>;
}
```

### Multiple API Calls
```jsx
import { useApi } from '../hooks';

function Dashboard() {
  const { data: stats } = useApi('/stats');
  const { data: users } = useApi('/users');
  const { data: products } = useApi('/products');

  // All three requests happen in parallel
  return <div>{/* Use all three data sources */}</div>;
}
```

### API Error Handling
```jsx
import api from '../services/api';

function Component() {
  const handleAction = async () => {
    try {
      const { data } = await api.post('/endpoint', payload);
      // Success
      showToast('Success!', 'success');
    } catch (error) {
      // Error automatically shown via ToastProvider
      console.error('Request failed:', error);
    }
  };

  return <button onClick={handleAction}>Do Something</button>;
}
```

### Protected Components (Admin Only)
```jsx
import { useAuth } from '../hooks';

function AdminPanel() {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <div className="error">Access Denied</div>;
  }

  return <div>{/* Admin content */}</div>;
}
```

### Conditional Rendering
```jsx
function Component({ data }) {
  // Loading state
  if (!data) return <LoadingSpinner />;

  // Empty state
  if (data.length === 0) return <EmptyState />;

  // Error state
  if (isError) return <ErrorMessage />;

  // Success state
  return <div>{/* Render data */}</div>;
}
```

---

## CSS Naming Convention (BEM)

```css
/* Block: Main component */
.product-card { }

/* Element: Part of block */
.product-card__image { }
.product-card__title { }
.product-card__price { }

/* Modifier: Variation */
.product-card--featured { }
.product-card__button--disabled { }

/* Responsive: Mobile first */
@media (min-width: 768px) {
  .product-card {
    /* Tablet and up */
  }
}

@media (min-width: 1024px) {
  .product-card {
    /* Desktop and up */
  }
}
```

---

## File Organization Checklist

For each new feature, create:

```
✅ Component file (JSX)
  └─ components/category/ComponentName.jsx

✅ Style file (CSS) 
  └─ components/category/ComponentName.css

✅ Service file (if API calls)
  └─ services/feature.service.js
  └─ Export in services/index.js

✅ Hook file (if reusable logic)
  └─ hooks/useFeature.js
  └─ Export in hooks/index.js

✅ Constants file (if needed)
  └─ constants/feature.js

✅ Update imports
  └─ Add JSDoc comments
  └─ Add exports to index.js files

✅ Register routes (if new page)
  └─ Update App.js
  └─ Add to ROUTES config
```

---

## Environment Variables

Create `frontend/.env.local`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
REACT_APP_OPENAI_API_KEY=xx-xxx  # Optional
```

Access in code:
```jsx
const apiUrl = process.env.REACT_APP_API_URL;
const isDev = process.env.NODE_ENV === 'development';
```

---

## Dependencies

### API Requests
```bash
npm install axios
```

### Form Handling
```bash
npm install react-hook-form
```

### Date Handling
```bash
npm install date-fns
```

### Validation
```bash
npm install joi
```

### Notifications
```bash
npm install react-toastify
```

---

## Testing Patterns

### Test File Setup
```jsx
// components/common/Button.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### API Mocking
```jsx
import { vi } from 'vitest';
import api from '../services/api';

vi.mock('../services/api');

test('fetches data from API', async () => {
  api.get.mockResolvedValue({ data: [{ id: 1, name: 'Test' }] });
  
  // Your test here
});
```

---

## Debugging Tips

### Log Component Props
```jsx
function Component(props) {
  console.log('Component Props:', props);
  return <div>{JSON.stringify(props, null, 2)}</div>;
}
```

### Log Hook State
```jsx
function Component() {
  const [state, setState] = useState(0);
  
  useEffect(() => {
    console.log('State changed:', state);
  }, [state]);

  return <div>{state}</div>;
}
```

### Monitor API Calls
```jsx
// In App.js or main entry
api.interceptors.request.use(config => {
  console.log('API Request:', config);
  return config;
});

api.interceptors.response.use(
  res => {
    console.log('API Response:', res);
    return res;
  },
  err => {
    console.error('API Error:', err);
    throw err;
  }
);
```

### Check Performance
```jsx
import { Profiler } from 'react';

<Profiler id="my-component" onRender={console.log}>
  <MyComponent />
</Profiler>
```

---

## Quick Commands

```bash
# Install dependencies
npm install

# Start development 
npm start

# Create production build
npm run build

# Deploy (if configured)
npm run deploy

# Clean cache
rm -rf node_modules package-lock.json
npm install

# Format code (if prettier configured)
npm run format

# Lint check
npm run lint

# Run tests
npm test

# Watch for changes (if available)
npm run dev
```

---

## Critical Rules

❌ **DON'T:**
- Put API calls in components (use hooks/services)
- Use inline styles (use CSS files)
- Hardcode values (use constants/config)
- Ignore error states
- Forget to add JSDoc comments
- Use `console.log` in production code
- Access user data without checking auth

✅ **DO:**
- Keep components focused and small
- Use meaningful names
- Document with JSDoc
- Handle all states (loading, error, success)
- Test critical features
- Check console for errors
- Use TypeScript for complex features (optional)

---

## File Checklist Before Push

```
□ No console.log() statements
□ No hardcoded API URLs
□ Error states handled
□ Loading states shown
□ Mobile responsive
□ Images optimized
□ CSS follows naming convention
□ JSDoc comments added
□ No unused imports
□ PropTypes or TypeScript checked
```

---

## Useful Links

- React Docs: https://react.dev
- Modern JavaScript: https://javascript.info
- CSS Guide: https://developer.mozilla.org/en-US/docs/Web/CSS
- Axios: https://axios-http.com/docs
- React Router: https://reactrouter.com

---

Print this and keep it by your desk! 📋

