import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function AdminPage() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [stats, setStats]   = useState({ totalUsers: 0, totalOrders: 0, totalRevenue: 0 });
  const [leads, setLeads]   = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);

  const tab = location.pathname.includes('leads') ? 'leads'
    : location.pathname.includes('orders') ? 'orders'
    : location.pathname.includes('users')  ? 'users'
    : 'overview';

  useEffect(() => {
    Promise.all([
      api.get('/users/stats'),
      api.get('/leads'),
      api.get('/orders'),
      api.get('/users'),
    ]).then(([statsRes, leadsRes, ordersRes, usersRes]) => {
      setStats(statsRes.data.data);
      setLeads(leadsRes.data.data);
      setOrders(ordersRes.data.data);
      setUsers(usersRes.data.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const statusColor = { pending:'#F59E0B', paid:'#22C55E', active:'#3B82F6', completed:'#8B5CF6', cancelled:'#EF4444', new:'#3B82F6', contacted:'#F59E0B', qualified:'#22C55E', closed:'#8B5CF6' };

  const navItems = [
    { icon: '📊', label: 'Overview',  path: '/admin' },
    { icon: '📬', label: 'Leads',     path: '/admin/leads' },
    { icon: '📦', label: 'Orders',    path: '/admin/orders' },
    { icon: '👥', label: 'Users',     path: '/admin/users' },
    { icon: '🌐', label: 'Website',   path: '/', external: true },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', paddingTop: 64 }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: '#0A0F1E', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '28px 14px', flexShrink: 0, position: 'sticky', top: 64, height: 'calc(100vh - 64px)' }}>
        <div style={{ padding: '0 8px', marginBottom: 28 }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: '#22C55E', letterSpacing: 2, marginBottom: 4 }}>ADMIN PANEL</div>
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: '#fff' }}>{user?.name}</div>
        </div>
        {navItems.map(item => {
          const active = item.path === '/admin' ? tab === 'overview' : location.pathname.startsWith(item.path) && item.path !== '/';
          return (
            <Link key={item.path} to={item.path} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, marginBottom: 4, background: active ? 'rgba(34,197,94,0.1)' : 'transparent', border: active ? '1px solid rgba(34,197,94,0.2)' : '1px solid transparent', color: active ? '#22C55E' : 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: active ? 600 : 400 }}>
              <span>{item.icon}</span><span>{item.label}</span>
            </Link>
          );
        })}
        <button onClick={() => { logout(); navigate('/'); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, width: '100%', background: 'none', border: '1px solid transparent', color: 'rgba(255,255,255,0.3)', fontSize: 14, textAlign: 'left', marginTop: 16 }}>🚪 Logout</button>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '36px 40px', overflow: 'auto' }}>
        {/* Overview */}
        {tab === 'overview' && (
          <div>
            <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 26, fontWeight: 900, color: '#fff', marginBottom: 28 }}>Admin Dashboard</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 36 }}>
              {[
                { icon: '👥', label: 'Total Users',   value: stats.totalUsers,   color: '#3B82F6' },
                { icon: '📦', label: 'Total Orders',  value: stats.totalOrders,  color: '#22C55E' },
                { icon: '💰', label: 'Total Revenue', value: `$${(stats.totalRevenue||0).toLocaleString()}`, color: '#F59E0B' },
                { icon: '📬', label: 'Leads',         value: leads.length,       color: '#8B5CF6' },
              ].map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 22 }}>
                  <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 26, fontWeight: 900, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent leads */}
            <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 14 }}>Recent Leads</h3>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden' }}>
              {leads.slice(0, 5).map((lead, i) => (
                <div key={lead._id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px 100px', gap: 12, padding: '14px 20px', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#fff' }}>{lead.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{lead.email}</div>
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{lead.service || '—'}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{lead.budget || '—'}</div>
                  <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 999, background: `${statusColor[lead.status]}15`, border: `1px solid ${statusColor[lead.status]}30`, color: statusColor[lead.status], fontSize: 10, fontWeight: 700, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5, textAlign: 'center' }}>{lead.status?.toUpperCase()}</span>
                </div>
              ))}
              {leads.length === 0 && <div style={{ padding: '24px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>No leads yet</div>}
            </div>
          </div>
        )}

        {/* Leads tab */}
        {tab === 'leads' && (
          <div>
            <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 24 }}>Leads ({leads.length})</h1>
            
            {/* AI Lead Scoring Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 28 }}>
              {[
                { label: '🔴 Urgent', color: '#EF4444', count: leads.filter(l => l.leadScore?.priority === 'urgent').length },
                { label: '🟠 High', color: '#F59E0B', count: leads.filter(l => l.leadScore?.priority === 'high').length },
                { label: '🟡 Medium', color: '#EAAA08', count: leads.filter(l => l.leadScore?.priority === 'medium').length },
                { label: '🟢 Low', color: '#22C55E', count: leads.filter(l => l.leadScore?.priority === 'low').length },
              ].map(s => (
                <div key={s.label} style={{ background: `${s.color}08`, border: `1px solid ${s.color}20`, borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: s.color, marginTop: 6 }}>{s.count}</div>
                </div>
              ))}
            </div>

            {/* All Leads */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 80px 1fr 100px 100px 120px', gap: 12, padding: '14px 24px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase' }}>
                <div>Contact</div>
                <div>Score</div>
                <div>Service</div>
                <div>Budget</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
              {leads.map((lead, i) => {
                const scoreColor = lead.leadScore?.score >= 80 ? '#EF4444' : lead.leadScore?.score >= 60 ? '#F59E0B' : lead.leadScore?.score >= 40 ? '#EAAA08' : '#22C55E';
                return (
                  <div key={lead._id} style={{ padding: '16px 24px', borderBottom: i < leads.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', display: 'grid', gridTemplateColumns: '1.5fr 80px 1fr 100px 100px 120px', gap: 12, alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: '#fff' }}>{lead.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{lead.email}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: scoreColor, fontSize: 16 }}>{Math.round(lead.leadScore?.score || 0)}</div>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>/100</div>
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{lead.service || '—'}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{lead.budget || '—'}</div>
                    <select value={lead.status} onChange={async e => {
                      await api.put(`/leads/${lead._id}`, { status: e.target.value });
                      setLeads(leads.map(l => l._id === lead._id ? { ...l, status: e.target.value } : l));
                    }} style={{ padding: '5px 8px', borderRadius: 6, background: `${statusColor[lead.status]}15`, border: `1px solid ${statusColor[lead.status]}30`, color: statusColor[lead.status], fontSize: 10, fontWeight: 700, fontFamily: "'Space Mono',monospace", outline: 'none' }}>
                      {['new','contacted','qualified','closed'].map(s => <option key={s} value={s} style={{ background: '#0F172A', color: '#fff' }}>{s.toUpperCase()}</option>)}
                    </select>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => alert(`Generate Proposal for ${lead.name}`)} style={{ padding: '5px 10px', borderRadius: 6, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E', fontSize: 10, fontWeight: 600 }}>Propose</button>
                      <button onClick={() => alert(`Send Follow-up to ${lead.name}`)} style={{ padding: '5px 10px', borderRadius: 6, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#3B82F6', fontSize: 10, fontWeight: 600 }}>Follow-up</button>
                    </div>
                  </div>
                );
              })}
              {leads.length === 0 && <div style={{ padding: '32px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>No leads yet</div>}
            </div>
          </div>
        )}

        {/* Orders tab */}
        {tab === 'orders' && (
          <div>
            <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 24 }}>All Orders ({orders.length})</h1>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden' }}>
              {orders.map((order, i) => (
                <div key={order._id} style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'grid', gridTemplateColumns: '120px 1fr 1fr 100px 140px', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: '#22C55E' }}>{order.orderNumber}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#fff' }}>{order.user?.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{order.user?.email}</div>
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {order.items?.map(i => i.serviceTitle).join(', ')}
                  </div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: '#22C55E', fontSize: 15 }}>${order.total?.toLocaleString()}</div>
                  <select value={order.status} onChange={async e => {
                    await api.put(`/orders/${order._id}/status`, { status: e.target.value });
                    setOrders(orders.map(o => o._id === order._id ? { ...o, status: e.target.value } : o));
                  }} style={{ padding: '5px 8px', borderRadius: 8, background: `${statusColor[order.status]}15`, border: `1px solid ${statusColor[order.status]}30`, color: statusColor[order.status], fontSize: 11, fontWeight: 700, fontFamily: "'Space Mono',monospace", outline: 'none' }}>
                    {['pending','paid','active','completed','cancelled'].map(s => <option key={s} value={s} style={{ background: '#0F172A', color: '#fff' }}>{s.toUpperCase()}</option>)}
                  </select>
                </div>
              ))}
              {orders.length === 0 && <div style={{ padding: '32px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>No orders yet</div>}
            </div>
          </div>
        )}

        {/* Users tab */}
        {tab === 'users' && (
          <div>
            <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 24 }}>All Users ({users.length})</h1>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden' }}>
              {users.map((u, i) => (
                <div key={u._id} style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#22C55E,#3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 14, color: '#fff', flexShrink: 0 }}>{u.name?.[0]}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>{u.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{u.email}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 999, background: u.role === 'admin' ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', border: u.role === 'admin' ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(34,197,94,0.2)', color: u.role === 'admin' ? '#EF4444' : '#22C55E', fontFamily: "'Space Mono',monospace" }}>{u.role.toUpperCase()}</span>
                    <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 999, background: u.isActive ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)', color: u.isActive ? '#22C55E' : '#EF4444', fontFamily: "'Space Mono',monospace" }}>{u.isActive ? 'ACTIVE' : 'SUSPENDED'}</span>
                    <button onClick={async () => {
                      await api.put(`/users/${u._id}/toggle`);
                      setUsers(users.map(us => us._id === u._id ? { ...us, isActive: !us.isActive } : us));
                    }} style={{ padding: '6px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
                      {u.isActive ? 'Suspend' : 'Activate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
