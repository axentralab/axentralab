import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api, { apiErrorMessage } from '../services/api';
import Sidebar from '../components/Sidebar';
import Skeleton, { SkeletonList } from '../components/Skeleton';
import { STATUS_COLORS } from '../constants/statusColors';

function StatCard({ icon, label, value, color = '#22C55E' }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
      <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 28, fontWeight: 900, color, letterSpacing: -0.5 }}>{value}</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{label}</div>
    </div>
  );
}

// Invoice download helper — generates a simple HTML invoice and triggers print/save
function downloadInvoice(order) {
  const items = order.items?.map(i =>
    `<tr><td style="padding:8px 0;border-bottom:1px solid #eee">${i.serviceTitle || i.plan}</td><td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">$${i.price?.toLocaleString()}</td></tr>`
  ).join('') || '';

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Invoice ${order.orderNumber}</title>
  <style>body{font-family:sans-serif;max-width:600px;margin:40px auto;color:#111}h1{font-size:24px}table{width:100%;border-collapse:collapse}.total{font-size:18px;font-weight:bold}</style>
  </head><body>
  <h1>Invoice</h1>
  <p><strong>Order:</strong> ${order.orderNumber}<br>
  <strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}<br>
  <strong>Status:</strong> ${order.status?.toUpperCase()}</p>
  <table><thead><tr><th style="text-align:left;padding:8px 0;border-bottom:2px solid #333">Service</th><th style="text-align:right;padding:8px 0;border-bottom:2px solid #333">Price</th></tr></thead>
  <tbody>${items}</tbody></table>
  <p class="total" style="text-align:right;margin-top:16px">Total: $${order.total?.toLocaleString()}</p>
  <p style="margin-top:40px;font-size:12px;color:#888">Axentralab · axentralab.com</p>
  </body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `invoice-${order.orderNumber}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

function OrdersTab({ orders, loading }) {
  const toast = useToast();

  if (loading) return (
    <div>
      <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 22, color: '#fff', marginBottom: 24 }}>My Orders</div>
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>
        <SkeletonList count={4} variant="order-row" />
      </div>
    </div>
  );

  return (
    <div>
      <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 22, color: '#fff', marginBottom: 24 }}>My Orders</h2>
      {orders.length === 0 ? (
        // Improved empty state
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '56px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>📦</div>
          <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 20, color: '#fff', marginBottom: 10 }}>No orders yet</h3>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 28, maxWidth: 320, margin: '0 auto 28px' }}>
            You haven't placed any orders. Browse our services to get started.
          </p>
          <Link to="/services" className="btn-primary" style={{ padding: '12px 28px', textDecoration: 'none' }}>Browse Services →</Link>
        </div>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order._id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: '#22C55E', letterSpacing: 1, marginBottom: 6 }}>{order.orderNumber}</div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 15, color: '#fff' }}>
                    {order.items?.map(i => i.serviceTitle || i.plan).join(', ')}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 900, fontSize: 18, color: '#22C55E' }}>${order.total?.toLocaleString()}</div>
                  <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 999, background: `${STATUS_COLORS[order.status]}15`, border: `1px solid ${STATUS_COLORS[order.status]}30`, color: STATUS_COLORS[order.status], fontSize: 11, fontWeight: 700, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5 }}>
                    {order.status?.toUpperCase()}
                  </span>
                  {/* Invoice download for paid/completed orders */}
                  {['paid', 'active', 'completed'].includes(order.status) && (
                    <button onClick={() => { downloadInvoice(order); toast.success('Invoice downloaded!'); }}
                      style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontFamily: "'Space Mono',monospace" }}>
                      ↓ Invoice
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfileTab() {
  const { user } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({ name: user?.name || '', company: user?.company || '', phone: user?.phone || '' });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '' });
  const [fieldErrors, setFieldErrors] = useState({});

  // Field-level validation
  const validateProfile = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    return errs;
  };

  const validatePassword = () => {
    const errs = {};
    if (!pwForm.currentPassword) errs.currentPassword = 'Current password required';
    if (pwForm.newPassword.length < 6) errs.newPassword = 'Minimum 6 characters';
    return errs;
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    const errs = validateProfile();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setFieldErrors({});
    try {
      await api.put('/auth/profile', form);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Failed to update profile'));
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    const errs = validatePassword();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setFieldErrors({});
    try {
      await api.put('/auth/password', pwForm);
      toast.success('Password changed!');
      setPwForm({ currentPassword: '', newPassword: '' });
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Failed to change password'));
    }
  };

  const inputStyle = (field) => ({
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${fieldErrors[field] ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 10, padding: '11px 14px', color: '#fff', fontSize: 14, outline: 'none',
    fontFamily: 'inherit',
  });

  const FieldError = ({ field }) => fieldErrors[field]
    ? <div style={{ fontSize: 11, color: '#EF4444', marginTop: 4 }}>{fieldErrors[field]}</div>
    : null;

  return (
    <div style={{ maxWidth: 520 }}>
      <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 22, color: '#fff', marginBottom: 24 }}>My Profile</h2>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 18 }}>Personal Info</h3>
        <form onSubmit={handleProfile}>
          {[{ key: 'name', label: 'Name' }, { key: 'company', label: 'Company' }, { key: 'phone', label: 'Phone' }].map(f => (
            <div key={f.key} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: 5 }}>{f.label}</label>
              <input style={inputStyle(f.key)} type="text" value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
              <FieldError field={f.key} />
            </div>
          ))}
          <button type="submit" className="btn-primary" style={{ padding: '10px 24px', marginTop: 4 }}>Save Changes</button>
        </form>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
        <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 18 }}>Change Password</h3>
        <form onSubmit={handlePassword}>
          {[{ key: 'currentPassword', label: 'Current Password' }, { key: 'newPassword', label: 'New Password (min. 6 chars)' }].map(f => (
            <div key={f.key} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: 5 }}>{f.label}</label>
              <input style={inputStyle(f.key)} type="password" value={pwForm[f.key]} onChange={e => setPwForm({ ...pwForm, [f.key]: e.target.value })} />
              <FieldError field={f.key} />
            </div>
          ))}
          <button type="submit" className="btn-primary" style={{ padding: '10px 24px', marginTop: 4 }}>Update Password</button>
        </form>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/mine')
      .then(r => setOrders(r.data.data))
      .catch(() => {})
      .finally(() => setOrdersLoading(false));
  }, []);

  const tab = location.pathname.includes('orders')  ? 'orders'
            : location.pathname.includes('profile') ? 'profile'
            : 'overview';

  const paid      = orders.filter(o => ['paid', 'active', 'completed'].includes(o.status));
  const totalSpent = paid.reduce((s, o) => s + (o.total || 0), 0);

  const navItems = [
    { icon: '📊', label: 'Overview',  path: '/dashboard' },
    { icon: '📦', label: 'My Orders', path: '/dashboard/orders' },
    { icon: '👤', label: 'Profile',   path: '/dashboard/profile' },
    { icon: '🛒', label: 'Shop',      path: '/services' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', paddingTop: 64 }}>
      <Sidebar navItems={navItems} user={user} onLogout={() => { logout(); navigate('/'); }} />
      <main style={{ flex: 1, padding: '40px 5%', overflow: 'hidden' }}>
        {tab === 'overview' && (
          <div style={{ animation: 'fadeUp 0.4s ease both' }}>
            <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: -0.5, marginBottom: 8 }}>
              Welcome back, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 36 }}>Here's an overview of your account activity.</p>

            {/* Stat cards with skeleton */}
            {ordersLoading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
                <Skeleton variant="stat" /><Skeleton variant="stat" /><Skeleton variant="stat" />
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
                <StatCard icon="📦" label="Total Orders"    value={orders.length} />
                <StatCard icon="✅" label="Active Services" value={paid.length}   color="#3B82F6" />
                <StatCard icon="💰" label="Total Spent"     value={`$${totalSpent.toLocaleString()}`} color="#F59E0B" />
              </div>
            )}

            <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 16, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 18, color: '#fff', marginBottom: 6 }}>Need something new?</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>Browse our full service catalog and add to cart.</div>
              </div>
              <Link to="/services" className="btn-primary" style={{ padding: '10px 24px', textDecoration: 'none' }}>Browse Services →</Link>
            </div>
          </div>
        )}
        {tab === 'orders'  && <OrdersTab orders={orders} loading={ordersLoading} />}
        {tab === 'profile' && <ProfileTab />}
      </main>
    </div>
  );
}