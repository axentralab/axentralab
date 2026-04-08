# Frontend Migration Guide: Old → New Structure

This guide shows how to migrate existing frontend code to follow the new structure & coding standards.

---

## Example 1: Refactoring a Simple Page

### BEFORE: Old Structure (HomePage.js - Monolithic)
```jsx
// pages/HomePage.js - 200+ lines, everything mixed together

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch stats
    axios.get('http://localhost:5000/api/stats')
      .then(res => setStats(res.data))
      .catch(err => setError(err.message));

    // Fetch services
    axios.get('http://localhost:5000/api/services')
      .then(res => setServices(res.data.data))
      .catch(err => setError(err.message));

    setLoading(false);
  }, []);

  return (
    <div>
      {/* Navbar section */}
      <nav style={{ padding: '20px', background: '#1e293b' }}>
        <div>Axentralab</div>
        {user && <div>Welcome {user.name}</div>}
      </nav>

      {/* Hero */}
      <section style={{ padding: '100px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <h1 style={{ fontSize: '48px', color: 'white' }}>AI-Powered Solutions</h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)' }}>
          Build better software faster
        </p>
        <button style={{ padding: '12px 24px', background: '#22C55E' }}>
          Get Started
        </button>
      </section>

      {/* Stats */}
      {!loading && stats && (
        <section style={{ padding: '40px 20px' }}>
          <h2>Our Impact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            <div style={{ padding: '20px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.projects}+</div>
              <div>Projects</div>
            </div>
            {/* More stat cards */}
          </div>
        </section>
      )}

      {/* Services */}
      <section style={{ padding: '40px 20px' }}>
        <h2>Our Services</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {services.map(svc => (
            <div key={svc.id} style={{ padding: '20px', border: '1px solid #e5e7eb' }}>
              <h3>{svc.title}</h3>
              <p>{svc.description}</p>
              <button style={{ padding: '8px 16px', background: '#3B82F6' }}>Learn More</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '40px 20px', textAlign: 'center', background: '#f3f4f6' }}>
        <h2>Ready to transform your business?</h2>
        <button style={{ padding: '12px 24px', background: '#22C55E' }}>Contact Us</button>
      </section>

      {/* Footer */}
      <footer style={{ padding: '20px', background: '#1e293b', color: 'white' }}>
        <p>© 2024 Axentralab. All rights reserved.</p>
      </footer>

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
}
```

### AFTER: New Structure (Refactored)

#### Step 1: Extract sections to separate components

**components/sections/HeroSection.jsx**
```jsx
/**
 * HeroSection - Homepage hero/landing section
 */
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes.config';
import './HeroSection.css';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero__container">
        <h1 className="hero__title">AI-Powered Solutions</h1>
        <p className="hero__subtitle">Build better software faster</p>
        <button 
          className="btn btn--primary btn--lg"
          onClick={() => navigate(ROUTES.PUBLIC.QUOTE)}
        >
          Get Started
        </button>
      </div>
    </section>
  );
}
```

**components/sections/StatsSection.jsx**
```jsx
/**
 * StatsSection - Display key metrics/stats
 * @param {Array} stats - Stats data
 */
import { useCounter } from '../../hooks/useCounter';
import './StatsSection.css';

function StatCard({ label, value, suffix = '+' }) {
  const [animatedValue, ref] = useCounter(value);

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-card__value">{animatedValue}{suffix}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  );
}

export default function StatsSection({ stats }) {
  if (!stats) return null;

  return (
    <section className="stats-section">
      <h2 className="stats-section__title">Our Impact</h2>
      <div className="stats-grid">
        <StatCard label="Projects" value={stats.projects} />
        <StatCard label="Clients" value={stats.clients} />
        <StatCard label="Team Members" value={stats.teamMembers} />
        <StatCard label="Years Experience" value={stats.yearsExperience} />
      </div>
    </section>
  );
}
```

**components/sections/ServicesSection.jsx**
```jsx
/**
 * ServicesSection - Display list of services
 * @param {Array} services - Services to display
 */
import { ServiceCard } from '../common/ServiceCard';
import './ServicesSection.css';

export default function ServicesSection({ services, loading }) {
  if (loading) return <SkeletonGrid count={3} />;
  if (!services?.length) return <EmptyState />;

  return (
    <section className="services-section">
      <h2 className="services-section__title">Our Services</h2>
      <div className="services-grid">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
```

**components/sections/CTASection.jsx**
```jsx
/**
 * CTASection - Call-to-action section
 */
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes.config';
import './CTASection.css';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="cta-section__content">
        <h2>Ready to transform your business?</h2>
        <p>Let's work together to build something amazing</p>
        <button 
          className="btn btn--primary btn--lg"
          onClick={() => navigate(ROUTES.PUBLIC.CONTACT)}
        >
          Contact Us
        </button>
      </div>
    </section>
  );
}
```

#### Step 2: Extract data fetching to hooks

**hooks/useHomepageData.js**
```jsx
import { useApi } from './useApi';

export function useHomepageData() {
  const stats = useApi('/stats');
  const services = useApi('/services');

  return {
    stats: stats.data,
    services: services.data,
    loading: stats.loading || services.loading,
    error: stats.error || services.error,
  };
}
```

#### Step 3: Refactor the main page

**pages/HomePage.js** (Now clean and simple!)
```jsx
/**
 * HomePage - Main landing page
 */
import { useAuth } from '../hooks';
import { useHomepageData } from '../hooks/useHomepageData';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import ServicesSection from '../components/sections/ServicesSection';
import CTASection from '../components/sections/CTASection';
import ErrorBoundary from '../components/common/ErrorBoundary';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const { stats, services, loading, error } = useHomepageData();

  return (
    <>
      <Navbar />
      <main>
        <ErrorBoundary>
          <HeroSection />
          <StatsSection stats={stats} />
          <ServicesSection services={services} loading={loading} />
          <CTASection />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
```

---

## Example 2: Refactoring a Form

### BEFORE: Form scattered across component
```jsx
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Inline validation
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email required' }));
      return;
    }
    if (!email.includes('@')) {
      setErrors(prev => ({ ...prev, email: 'Invalid email' }));
      return;
    }
    if (!password || password.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Password min 6 chars' }));
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      // ... redirect
    } catch (err) {
      setErrors({ form: err.response?.data?.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      
      {errors.form && <div style={{ color: 'red' }}>{errors.form}</div>}
      
      <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
    </form>
  );
}
```

### AFTER: Clean extracted form

**components/forms/LoginForm.jsx**
```jsx
/**
 * LoginForm - User login form
 * @param {Function} onSuccess - Callback after successful login
 */
import { useForm } from '../../hooks/useForm';
import { validateForm } from '../../utils/validate';
import { authService } from '../../services/auth.service';
import { useAuth } from '../../hooks';
import './LoginForm.css';

export default function LoginForm({ onSuccess }) {
  const { login } = useAuth();
  const { values, errors, isSubmitting, handleChange, handleSubmit, setErrors } = useForm(
    { email: '', password: '' },
    onSubmit
  );

  async function onSubmit(data) {
    // Validate
    const errs = validateForm(data, {
      email: { required: true, type: 'email', label: 'Email' },
      password: { required: true, minLength: 6, label: 'Password' },
    });

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      const response = await authService.login(data.email, data.password);
      login(response.data.token, response.data.user);
      onSuccess?.();
    } catch (err) {
      setErrors({ form: err.response?.data?.message || 'Login failed' });
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {errors.form && <div className="alert alert--error">{errors.form}</div>}

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className={errors.email ? 'input--error' : ''}
          placeholder="your@email.com"
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          className={errors.password ? 'input--error' : ''}
          placeholder="••••••••"
        />
        {errors.password && <span className="error-text">{errors.password}</span>}
      </div>

      <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

**pages/LoginPage.js**
```jsx
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes.config';
import LoginForm from '../components/forms/LoginForm';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(ROUTES.DASHBOARD.HOME);
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <h1>Welcome Back</h1>
        <LoginForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
```

---

## Migration Checklist

- [ ] Extract logic to hooks
- [ ] Extract API calls to services
- [ ] Extract validation to utils
- [ ] Extract sections to components
- [ ] Move constants to config/constants
- [ ] Replace inline styles with CSS classes
- [ ] Add prop documentation (JSDoc)
- [ ] Add error handling
- [ ] Test all functionality
- [ ] Update imports in parent components

---

## Tools to Help

### Find all inline styles
```bash
grep -r "style={{" src/
```

### Find all direct axios calls
```bash
grep -r "axios\." src/ | grep -v "services/"
```

### Find all fetch calls
```bash
grep -r "fetch(" src/ | grep -v "services/"
```

---

✨ **Start with one component, maintain consistency, improve gradually!**
