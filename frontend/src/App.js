import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProtectedRoute, AdminRoute } from './components/common/ProtectedRoute';
import Navbar   from './components/layout/Navbar';
import Footer   from './components/layout/Footer';
import AIChatbot from './components/common/AIChatbot';

import './styles/global.css';

// Pages – public
import HomePage        from './pages/HomePage';
import ShopPage        from './pages/ShopPage';
import ProductsPage    from './pages/ProductsPage';
import PortfolioPage   from './pages/PortfolioPage';
import BlogPage        from './pages/BlogPage';
import ContactPage     from './pages/ContactPage';
import LoginPage       from './pages/LoginPage';
import RegisterPage    from './pages/RegisterPage';
import QuoteCalculator from './components/common/QuoteCalculator';

// Pages – auth-required
import CartPage        from './pages/CartPage';
import CheckoutPage    from './pages/CheckoutPage';
import DashboardPage   from './pages/DashboardPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

// Pages – admin
import AdminPage       from './pages/AdminPage';

// Misc
import NotFoundPage    from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Pages with full layout (navbar + footer)
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1 }}>{children}</main>
      <Footer />
    </>
  );
}

// Dashboard/Admin layout (no footer, navbar still shown)
function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1 }}>{children}</main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div style={{ minHeight:'100vh', background:'#020617', position:'relative' }}>
            {/* Global grid background */}
            <div className="grid-bg" />

            <ScrollToTop />
            <Toaster position="top-right" toastOptions={{ style:{ background:'#1E293B', color:'#fff', border:'1px solid rgba(255,255,255,0.1)' } }} />
            
            {/* AI Chatbot - Floating Widget */}
            <AIChatbot />

            <Routes>
              {/* ── PUBLIC ── */}
              <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
              <Route path="/services"  element={<PublicLayout><ShopPage /></PublicLayout>} />
              <Route path="/products"  element={<PublicLayout><ProductsPage /></PublicLayout>} />
              <Route path="/portfolio" element={<PublicLayout><PortfolioPage /></PublicLayout>} />
              <Route path="/blog"      element={<PublicLayout><BlogPage /></PublicLayout>} />
              <Route path="/contact"   element={<PublicLayout><ContactPage /></PublicLayout>} />
              <Route path="/quote"     element={<PublicLayout><QuoteCalculator /></PublicLayout>} />

              {/* ── AUTH ── */}
              <Route path="/login"    element={<PublicLayout><LoginPage /></PublicLayout>} />
              <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />

              {/* ── CART & CHECKOUT ── */}
              <Route path="/cart"     element={<PublicLayout><CartPage /></PublicLayout>} />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <PublicLayout><CheckoutPage /></PublicLayout>
                </ProtectedRoute>
              } />
              <Route path="/order-success" element={
                <ProtectedRoute>
                  <PublicLayout><OrderSuccessPage /></PublicLayout>
                </ProtectedRoute>
              } />

              {/* ── CLIENT DASHBOARD ── */}
              <Route path="/dashboard"         element={<ProtectedRoute><AppLayout><DashboardPage /></AppLayout></ProtectedRoute>} />
              <Route path="/dashboard/orders"  element={<ProtectedRoute><AppLayout><DashboardPage /></AppLayout></ProtectedRoute>} />
              <Route path="/dashboard/profile" element={<ProtectedRoute><AppLayout><DashboardPage /></AppLayout></ProtectedRoute>} />

              {/* ── ADMIN ── */}
              <Route path="/admin"         element={<AdminRoute><AppLayout><AdminPage /></AppLayout></AdminRoute>} />
              <Route path="/admin/leads"   element={<AdminRoute><AppLayout><AdminPage /></AppLayout></AdminRoute>} />
              <Route path="/admin/orders"  element={<AdminRoute><AppLayout><AdminPage /></AppLayout></AdminRoute>} />
              <Route path="/admin/users"   element={<AdminRoute><AppLayout><AdminPage /></AppLayout></AdminRoute>} />

              {/* ── 404 ── */}
              <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
