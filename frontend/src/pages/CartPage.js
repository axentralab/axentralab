import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, total, count } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleRemove = (serviceId, plan, title) => {
    removeFromCart(serviceId, plan);
    toast.info(`"${title}" removed from cart`);
  };

  const handleClear = () => {
    clearCart();
    toast.info('Cart cleared');
  };

  if (count === 0) return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 5%' }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🛒</div>
      <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Your cart is empty</h2>
      <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 28 }}>Browse our services and add them to your cart.</p>
      <button onClick={() => navigate('/services')} className="btn-primary" style={{ padding: '12px 28px' }}>Browse Services →</button>
    </div>
  );

  return (
    <div style={{ padding: '100px 5% 80px', minHeight: '100vh' }}>
      <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(26px,4vw,44px)', fontWeight: 900, color: '#fff', letterSpacing: -1, marginBottom: 40 }}>Your Cart</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 28, maxWidth: 1100, margin: '0 auto' }}>

        {/* Items */}
        <div>
          {cart.map((item, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 4 }}>{item.serviceTitle}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, padding: '2px 10px', borderRadius: 6, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}>{item.plan}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', padding: '2px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: 6 }}>
                    {item.billing === 'monthly' ? '/ month' : item.billing === 'yearly' ? '/ year' : 'one-time'}
                  </span>
                </div>
              </div>

              {/* Quantity controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => updateQuantity(item.serviceId, item.plan, -1)}
                  style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>−</button>
                <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 15, color: '#fff', minWidth: 20, textAlign: 'center' }}>{item.quantity || 1}</span>
                <button onClick={() => updateQuantity(item.serviceId, item.plan, 1)}
                  style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>+</button>
              </div>

              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 900, fontSize: 20, color: '#22C55E' }}>
                ${(item.price * (item.quantity || 1)).toLocaleString()}
              </div>
              <button onClick={() => handleRemove(item.serviceId, item.plan, item.serviceTitle)}
                style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>×</button>
            </div>
          ))}
          <button onClick={handleClear} style={{ marginTop: 8, fontSize: 13, color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>Clear cart</button>
        </div>

        {/* Summary */}
        <div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 28, position: 'sticky', top: 80 }}>
            <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 20 }}>Order Summary</h3>
            {cart.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                <span>{item.serviceTitle} ({item.plan}) ×{item.quantity || 1}</span>
                <span>${(item.price * (item.quantity || 1)).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: 18, fontWeight: 800, fontFamily: "'Sora',sans-serif", color: '#fff', borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 8 }}>
              <span>Total</span>
              <span style={{ color: '#22C55E' }}>${total.toLocaleString()}</span>
            </div>
            {isAuthenticated ? (
              <button onClick={() => navigate('/checkout')} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15, marginTop: 8 }}>Proceed to Checkout →</button>
            ) : (
              <div>
                <button onClick={() => navigate('/login', { state: { from: '/checkout' } })} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15, marginBottom: 10 }}>Login to Checkout →</button>
                <button onClick={() => navigate('/register')} className="btn-outline" style={{ width: '100%', padding: '12px', fontSize: 14 }}>Create Account</button>
              </div>
            )}
            <div style={{ marginTop: 20, padding: 14, background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.1)', borderRadius: 10 }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>🔒 Secure checkout powered by Stripe<br />💳 All major cards accepted<br />✅ Money-back guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}