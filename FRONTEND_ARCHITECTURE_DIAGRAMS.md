# Frontend Architecture Diagram

## Data Flow & Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                      App.js (ROUTES)                         │
│  • Defines all routes                                        │
│  • Wraps providers (Auth, Cart, Toast)                       │
│  • Sets global styles                                        │
└──────────────────┬──────────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
   ┌─────────────┐     ┌──────────────┐
   │ PublicLayout│     │  AppLayout   │
   │             │     │              │
   │ Navbar      │     │ Navbar       │
   │ Content     │     │ Sidebar      │
   │ Footer      │     │ Content      │
   └─────────────┘     └──────────────┘
        │                     │
        │                     │
        ▼                     ▼
   ┌─────────────────────────────────────┐
   │         PAGE COMPONENTS              │
   │   (HomePage, ShopPage, etc)         │
   │                                      │
   │  • Fetch data with hooks            │
   │  • Render components                │
   │  • Handle page logic                │
   └────────┬────────────────────────┬───┘
            │                        │
            ▼                        ▼
    ┌──────────────┐       ┌─────────────────┐
    │ COMPONENTS   │       │ HOOKS (Logic)   │
    │              │       │                 │
    │ layout/      │       │ useApi()        │
    │ common/      │       │ useForm()       │
    │ sections/    │       │ useAuth()       │
    │ forms/       │       │ useCart()       │
    │ ui/          │       │ Custom...       │
    └────┬─────────┘       └────────┬────────┘
         │                          │
         │                          │
         ▼                          ▼
    ┌─────────────────────────────────────┐
    │    SERVICES (API Calls)             │
    │                                      │
    │  • authService.login()              │
    │  • productService.getAll()          │
    │  • orderService.create()            │
    │  • Custom services...               │
    └────────┬────────────────────────┬───┘
             │                        │
             └────────────┬───────────┘
                          │
                          ▼
         ┌────────────────────────────┐
         │   API (axios instance)     │
         │                            │
         │  • Base URL config         │
         │  • Auth token (Bearer)     │
         │  • Error handling          │
         │  • Rate limit              │
         └────────────┬───────────────┘
                      │
                      ▼
         ┌────────────────────────────┐
         │    BACKEND API            │
         │  (Node.js/Express)        │
         │                            │
         │  port 5000/api            │
         └────────────────────────────┘


STATE MANAGEMENT
================

┌──────────────────────────────────────────┐
│          Global State (Context)          │
│                                          │
│  AuthContext→User, token, login/logout  │
│  CartContext→Items, total, checkout     │
│  ToastContext→Notifications             │
└──────────────────────────────────────────┘
         △                       │
         │                       ▼
    useAuth()              showToast()
    useCart()              useToast()
    useToast()

┌──────────────────────────────────────────┐
│      Component Local State               │
│                                          │
│  useState()→Form inputs, modals, etc     │
│  useEffect()→Side effects, fetch         │
│  useRef()→DOM references                 │
└──────────────────────────────────────────┘


FOLDER ARCHITECTURE
===================

src/
│
├── 📄 APP.JS
│   └─ Routes, Layouts, Providers
│
├── 📁 COMPONENTS (Reusable UI)
│   │
│   ├── layout/
│   │   ├── Navbar     (Navigation bar)
│   │   ├── Footer     (Footer)
│   │   └── Sidebar    (Side navigation)
│   │
│   ├── common/
│   │   ├── Button        (Reusable button)
│   │   ├── Modal         (Dialog/popup)
│   │   ├── Card          (Content card)
│   │   ├── AlertBox      (Alert/notification)
│   │   ├── ProtectedRoute(Requires auth)
│   │   └── ...
│   │
│   ├── sections/
│   │   ├── HeroSection   (Large hero banner)
│   │   ├── StatsSection  (Statistics display)
│   │   ├── ProductGrid   (Product list)
│   │   ├── FeatureSection(Features showcase)
│   │   └── ...
│   │
│   ├── forms/
│   │   ├── LoginForm
│   │   ├── ContactForm
│   │   ├── CheckoutForm
│   │   └── ...
│   │
│   └── ui/
│       ├── LoadingSpinner
│       ├── ErrorMessage
│       ├── Skeleton
│       └── ...
│
├── 📁 PAGES (Routes)
│   ├── HomePage
│   ├── ShopPage
│   ├── ProductsPage
│   ├── LoginPage
│   ├── DashboardPage
│   ├── AdminPage
│   └── ... (1 per route)
│
├── 📁 HOOKS (Custom Logic)
│   ├── useApi.js        (Fetch data)
│   ├── useForm.js       (Form state)
│   ├── useAuth.js       (From context)
│   ├── useCart.js       (From context)
│   ├── useToast.js      (From context)
│   ├── useLocalStorage.js
│   ├── useDebounce.js
│   └── index.js         (Exports all)
│
├── 📁 SERVICES (API)
│   ├── api.js           (axios + interceptors)
│   ├── auth.service.js
│   ├── product.service.js
│   ├── order.service.js
│   ├── payment.service.js
│   ├── lead.service.js
│   ├── index.js         (Exports all)
│   └── ...
│
├── 📁 CONTEXT (Global State)
│   ├── AuthContext.js   (User, login, logout)
│   ├── CartContext.js   (Cart items)
│   └── ToastContext.jsx (Notifications)
│
├── 📁 CONFIG (Settings)
│   ├── api.config.js    (API endpoints)
│   ├── routes.config.js (Route definitions)
│   └── app.config.js    (Constants)
│
├── 📁 CONSTANTS (Fixed Values)
│   ├── orderStatus.js
│   ├── statusColors.js
│   └── ...
│
├── 📁 UTILS (Helpers)
│   ├── format.js        (formatCurrency, formatDate)
│   ├── validate.js      (validateEmail, etc)
│   ├── helpers.js       (Other helpers)
│   └── index.js         (Export all)
│
├── 📁 STYLES (CSS)
│   ├── global.css
│   ├── variables.css
│   ├── animations.css
│   └── pages/          (Page-specific CSS)
│
└── 📁 ASSETS
    ├── images/
    ├── icons/
    └── fonts/


TYPICAL DEVELOPMENT WORKFLOW
=============================

1. CREATE PAGE
   pages/MyNewPage.js
      ↓
   Import in App.js
      ↓
   Add route to Routes

2. CREATE COMPONENTS (If needed)
   components/sections/MySection.jsx
   components/sections/MySection.css
      ↓
   Import in page

3. CREATE LOGIC (If reusable)
   hooks/useMyData.js
      ↓
   Export in hooks/index.js
      ↓
   Use in page/component

4. CREATE SERVICE (If API calls)
   services/my.service.js
      ↓
   Export in services/index.js
      ↓
   Use in hooks/service directly


ERROR HANDLING FLOW
===================

API Call
    ↓
useApi Hook catches error
    ↓
api.js interceptor processes
    ↓
401 Unauthorized? → Redirect to /login
429 Rate Limited? → Show warning toast
Network Error?    → Show error toast
    ↓
Component shows error state
    ↓
User can retry or navigate away


RESPONSIVE DESIGN FLOW
=======================

Mobile First (< 768px)
    ↓
Tablet @media (768px)
    ↓
Desktop @media (1024px)
    ↓
Large @media (1440px)

Each component has CSS for all breakpoints.


AUTHENTICATION FLOW
===================

Login Page
    ↓
authService.login(email, password)
    ↓
Backend validates, returns token
    ↓
localStorage.setItem('token', token)
    ↓
AuthContext updated
    ↓
useAuth() hook reflects change
    ↓
Protected routes allow access
    ↓
Navbar shows user menu


API CALL LIFECYCLE
==================

Component using useApi()
    ↓
useApi hook calls api.get('/endpoint')
    ↓
api.js intercepts request, adds token
    ↓
Request sent to backend
    ↓
Backend processes & returns response
    ↓
api.js intercepts response
    ↓
Success? Return data
Error? Handle (401, 429, etc)
    ↓
Hook updates state
    ↓
Component re-renders with new data
```

---

## Key Concepts

### Separation of Concerns
```
UI LAYER        → Components (display only)
LOGIC LAYER     → Hooks (state & logic)
API LAYER       → Services (data fetching)
STATE LAYER     → Context (global state)
```

###  Component Props Flow
```
Parent Component
    ↓
Pass props down
    ↓
Child Component
    ↓
Use data
    ↓
Call callback onProperty
    ↓
Parent receives & handles event
```

### Naming Conventions
```
Components      → LoginForm, ProductCard, HeroSection (PascalCase)
Hooks           → useProducts, useForm, useAuth (useXxx)
Services        → productService, authService (camelCase)
Functions       → handleClick, formatCurrency, validateEmail (camelCase)
CSS Classes     → product-card, btn-primary, hero-section (kebab-case)
CSS Elements    → product-card__title, btn--active (BEM)
Constants       → ORDER_STATUS, API_URL (SCREAMING_SNAKE_CASE)
```

---

## Common Patterns

### Conditional Rendering
```
Loading? → Show Skeleton/Spinner
Error?   → Show ErrorMessage
Data?    → Show Content
Empty?   → Show EmptyState
```

### Form Handling
```
User types in input
    ↓
handleChange updates state
    ↓
Validation runs
    ↓
Errors displayed
    ↓
User submits form
    ↓
handleSubmit validates again
    ↓
API call made
    ↓
Success/Error shown
```

### Data Fetching
```
Component mounts
    ↓
useApi hook triggered
    ↓
API call starts [loading = true]
    ↓
Request sent
    ↓
Response received [data = response]
    ↓
Component renders [loading = false, data = filled]
    ↓
Or Error occurs [error = message]
```

