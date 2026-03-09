import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Create order in DB
      const orderRes = await api.post('/orders', {
        items: cart.map(item => ({
          service: item.serviceId,
          serviceTitle: item.serviceTitle,
          plan: item.plan,
          price: item.price,
          billing: item.billing,
          quantity: item.quantity || 1,
        })),
        total,
        paymentMethod: 'stripe',
      });
      const orderId = orderRes.data.data._id;

      // 2. Create Stripe checkout session
      const stripeRes = await api.post('/payments/checkout', {
        items: cart,
        orderId,
      });

      clearCart();
      // Redirect to Stripe
      window.location.href = stripeRes.data.url;
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '100px 5% 80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(26px,4vw,44px)', fontWeight: 900, color: '#fff', letterSpacing: -1, marginBottom: 40 }}>Checkout</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 28 }}>
          {/* Left: Review */}
          <div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 28, marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Customer Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[{ label: 'Name', val: user?.name }, { label: 'Email', val: user?.email }, { label: 'Company', val: user?.company || '—' }].map(f => (
                  <div key={f.label} style={{ gridColumn: f.label === 'Email' ? 'span 2' : 'auto' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 4, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5, textTransform: 'uppercase' }}>{f.label}</div>
                    <div style={{ fontSize: 14, color: '#fff', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>{f.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 28 }}>
              <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Order Items</h3>
              {cart.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < cart.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>{item.serviceTitle}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>
                      {item.plan} · {item.billing === 'monthly' ? 'Monthly' : item.billing === 'yearly' ? 'Yearly' : 'One-time payment'}
                    </div>
                  </div>
                  <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: '#22C55E', fontSize: 16, flexShrink: 0 }}>${item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Payment */}
          <div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 28, position: 'sticky', top: 80 }}>
              <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Payment Summary</h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>
                <span>Subtotal ({cart.length} item{cart.length > 1 ? 's' : ''})</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>
                <span>Tax</span>
                <span>Calculated at payment</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.08)', fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 900, color: '#fff' }}>
                <span>Total</span>
                <span style={{ color: '#22C55E' }}>${total.toLocaleString()}</span>
              </div>

              {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#EF4444' }}>{error}</div>}

              <button onClick={handleCheckout} disabled={loading} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {loading ? <><span className="spinner" style={{ width: 16, height: 16 }} /> Redirecting...</> : '🔒 Pay with Stripe →'}
              </button>

              <div style={{ marginTop: 16, padding: 14, background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.1)', borderRadius: 10 }}>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontFamily: "'Space Mono',monospace" }}>
                  You'll be redirected to Stripe's secure payment page. We accept Visa, Mastercard, American Express, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
