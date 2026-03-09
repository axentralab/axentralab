import { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function StatCard({ icon, label, value, color = '#22C55E' }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
      <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 28, fontWeight: 900, color, letterSpacing: -0.5 }}>{value}</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{label}</div>
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/orders/mine').then(r => setOrders(r.data.data)).catch(() => {}).finally(() => setLoading(false)); }, []);

  const statusColor = { pending:'#F59E0B', paid:'#22C55E', active:'#3B82F6', completed:'#8B5CF6', cancelled:'#EF4444' };

  if (loading) return <div style={{ textAlign: 'center', padding: 40 }}><span className="spinner" style={{ margin: 'auto' }} /></div>;

  return (
    <div>
      <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 22, color: '#fff', marginBottom: 24 }}>My Orders</h2>
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
          <p style={{ color: 'rgba(255,255,255,0.45)' }}>No orders yet. <Link to="/services" style={{ color: '#22C55E' }}>Browse services →</Link></p>
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
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 900, fontSize: 18, color: '#22C55E' }}>${order.total?.toLocaleString()}</div>
                  <span style={{ display: 'inline-block', marginTop: 6, padding: '3px 10px', borderRadius: 999, background: `${statusColor[order.status]}15`, border: `1px solid ${statusColor[order.status]}30`, color: statusColor[order.status], fontSize: 11, fontWeight: 700, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5 }}>
                    {order.status?.toUpperCase()}
                  </span>
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
  const [form, setForm] = useState({ name: user?.name || '', company: user?.company || '', phone: user?.phone || '' });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '' });
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const handleProfile = async (e) => {
    e.preventDefault();
    try { await api.put('/auth/profile', form); setMsg('Profile updated!'); setTimeout(() => setMsg(''), 3000); }
    catch (e) { setErr(e.response?.data?.message || 'Error'); }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    try { await api.put('/auth/password', pwForm); setMsg('Password changed!'); setPwForm({ currentPassword:'', newPassword:'' }); setTimeout(() => setMsg(''), 3000); }
    catch (e) { setErr(e.response?.data?.message || 'Error'); }
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 22, color: '#fff', marginBottom: 24 }}>My Profile</h2>
      {msg && <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#22C55E' }}>{msg}</div>}

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 18 }}>Personal Info</h3>
        <form onSubmit={handleProfile}>
          {[{ key:'name', label:'Name', type:'text' }, { key:'company', label:'Company', type:'text' }, { key:'phone', label:'Phone', type:'text' }].map(f => (
            <div key={f.key} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: 5 }}>{f.label}</label>
              <input className="input" type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
            </div>
          ))}
          <button type="submit" className="btn-primary" style={{ padding: '10px 24px', marginTop: 4 }}>Save Changes</button>
        </form>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
        <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 18 }}>Change Password</h3>
        <form onSubmit={handlePassword}>
          {[{ key:'currentPassword', label:'Current Password' }, { key:'newPassword', label:'New Password' }].map(f => (
            <div key={f.key} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: 5 }}>{f.label}</label>
              <input className="input" type="password" value={pwForm[f.key]} onChange={e => setPwForm({ ...pwForm, [f.key]: e.target.value })} required />
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

  useEffect(() => { api.get('/orders/mine').then(r => setOrders(r.data.data)).catch(() => {}); }, []);

  const tab = location.pathname.includes('orders') ? 'orders' : location.pathname.includes('profile') ? 'profile' : 'overview';

  const paid = orders.filter(o => ['paid','active','completed'].includes(o.status));
  const totalSpent = paid.reduce((s, o) => s + (o.total || 0), 0);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', paddingTop: 64 }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '32px 16px', flexShrink: 0, position: 'sticky', top: 64, height: 'calc(100vh - 64px)' }}>
        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 8px', marginBottom: 32 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#22C55E,#16A34A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora',sans-serif", fontWeight: 900, fontSize: 16, color: '#000', flexShrink: 0 }}>{user?.name?.[0]}</div>
          <div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 13, color: '#fff' }}>{user?.name?.split(' ')[0]}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Client</div>
          </div>
        </div>

        {[
          { icon:'📊', label:'Overview', path:'/dashboard' },
          { icon:'📦', label:'My Orders', path:'/dashboard/orders' },
          { icon:'👤', label:'Profile', path:'/dashboard/profile' },
          { icon:'🛒', label:'Shop', path:'/services' },
        ].map(item => {
          const active = item.path === '/dashboard' ? tab === 'overview' : location.pathname.startsWith(item.path);
          return (
            <Link key={item.path} to={item.path} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, marginBottom: 4, background: active ? 'rgba(34,197,94,0.1)' : 'transparent', border: active ? '1px solid rgba(34,197,94,0.2)' : '1px solid transparent', color: active ? '#22C55E' : 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: active ? 600 : 400, transition: 'all 0.15s' }}>
              <span>{item.icon}</span><span>{item.label}</span>
            </Link>
          );
        })}

        <button onClick={() => { logout(); navigate('/'); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, width: '100%', background: 'none', border: '1px solid transparent', color: 'rgba(255,255,255,0.35)', fontSize: 14, textAlign: 'left', marginTop: 16, transition: 'all 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>
          🚪 Logout
        </button>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '40px 5%', overflow: 'hidden' }}>
        {tab === 'overview' && (
          <div style={{ animation: 'fadeUp 0.4s ease both' }}>
            <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: -0.5, marginBottom: 8 }}>Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
            <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 36 }}>Here's an overview of your account activity.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
              <StatCard icon="📦" label="Total Orders" value={orders.length} />
              <StatCard icon="✅" label="Active Services" value={paid.length} color="#3B82F6" />
              <StatCard icon="💰" label="Total Spent" value={`$${totalSpent.toLocaleString()}`} color="#F59E0B" />
            </div>
            <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 16, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 18, color: '#fff', marginBottom: 6 }}>Need something new?</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>Browse our full service catalog and add to cart.</div>
              </div>
              <Link to="/services" className="btn-primary" style={{ padding: '10px 24px' }}>Browse Services →</Link>
            </div>
          </div>
        )}
        {tab === 'orders'  && <OrdersTab />}
        {tab === 'profile' && <ProfileTab />}
      </main>
    </div>
  );
}
