import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

const HERO_BG_IMAGE = process.env.REACT_APP_REFER_HERO_BG_IMAGE || '/images/referral-hero-bg.png';

export default function ReferralPage() {
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [stats, setStats] = useState({ totalReferrals: 0, activeReferrals: 0, completedReferrals: 0, totalEarnings: 0 });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  useEffect(() => {
    loadReferralData();
  }, []);

  const loadReferralData = async () => {
    try {
      setLoading(true);
      const [codeRes, statsRes, historyRes] = await Promise.all([
        api.get('/referrals/code'),
        api.get('/referrals/stats'),
        api.get('/referrals/history'),
      ]);

      if (codeRes.data.success) {
        setReferralCode(codeRes.data.data.referralCode);
        setReferralLink(codeRes.data.data.referralLink);
      }

      if (statsRes.data.success) {
        setStats(statsRes.data.data);
      }

      if (historyRes.data.success) {
        setHistory(historyRes.data.data);
      }
    } catch (err) {
      toast.error('Failed to load referral data', { title: 'Error' });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied to clipboard!`, { title: 'Success' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;800;900&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap');
        
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(139,92,246,0.35); } 50% { box-shadow: 0 0 0 8px rgba(139,92,246,0); } }
        
        .ref-container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
        .stat-card { 
          background: rgba(255,255,255,0.04); 
          border: 1px solid rgba(255,255,255,0.08); 
          border-radius: 16px; 
          padding: 24px; 
          text-align: center;
          transition: all 0.3s;
        }
        .stat-card:hover { 
          background: rgba(255,255,255,0.06); 
          border-color: rgba(255,255,255,0.12);
          transform: translateY(-2px);
        }
        .stat-value { 
          font-family: 'Sora', sans-serif; 
          font-size: 32px; 
          font-weight: 900; 
          color: #8B5CF6; 
          margin-bottom: 8px; 
        }
        .stat-label { 
          font-size: 12px; 
          color: rgba(255,255,255,0.4); 
          fontfamily: 'Space Mono', monospace; 
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .code-box { 
          background: rgba(139,92,246,0.08); 
          border: 1px solid rgba(139,92,246,0.3); 
          border-radius: 12px; 
          padding: 16px; 
          display: flex; 
          align-items: center; 
          justify-content: space-between;
          gap: 12px;
        }
        .code-value { 
          font-family: 'Space Mono', monospace; 
          font-size: 16px; 
          font-weight: 700; 
          color: '#fff'; 
        }
        .copy-btn { 
          padding: 8px 16px; 
          background: #8B5CF6; 
          color: #000; 
          border: none; 
          border-radius: 8px; 
          cursor: pointer; 
          font-weight: 700; 
          transition: all 0.2s;
        }
        .copy-btn:hover { background: #7C3AED; transform: translateY(-1px); }
        .history-row { 
          border-bottom: 1px solid rgba(255,255,255,0.06); 
          padding: 16px 0;
          display: grid;
          grid-template-columns: 2fr 1.5fr 1.5fr 1fr;
          gap: 16px;
          align-items: center;
        }
        .status-badge { 
          display: inline-block; 
          padding: 4px 12px; 
          border-radius: 999px; 
          font-size: 11px; 
          font-weight: 700; 
          font-family: 'Space Mono', monospace;
        }
        .status-pending { background: rgba(251,191,36,0.12); border: 1px solid rgba(251,191,36,0.3); color: #F59E0B; }
        .status-activated { background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.3); color: #3B82F6; }
        .status-completed { background: rgba(34,197,94,0.12); border: 1px solid rgba(34,197,94,0.3); color: #22C55E; }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0A0D16', color: '#fff', fontFamily: "'DM Sans', sans-serif", paddingTop: 80 }}>
        {/* Hero Section */}
        <section style={{ position: 'relative', overflow: 'hidden', marginBottom: 80, padding: '64px 20px' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${HERO_BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(10,13,22,0.9) 0%, rgba(10,13,22,0.72) 48%, rgba(10,13,22,0.9) 100%)' }} />
          
          <div className="ref-container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', animation: 'fadeUp 0.6s ease both' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px', borderRadius: 999, border: '1px solid rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.07)', marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#8B5CF6', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#8B5CF6', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Earn While You Refer</span>
            </div>
            
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(32px,5vw,64px)', fontWeight: 900, color: '#fff', margin: '0 0 16px', letterSpacing: -1.5, lineHeight: 1.05 }}>
              Get <span style={{ color: '#8B5CF6' }}>paid</span> for<br />referring clients
            </h1>
            
            <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 16, maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>
              Earn 10% commission on every project your referrals bring. Unlimited earning potential.
            </p>
          </div>
        </section>

        <div className="ref-container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>Loading your referral data...</p>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <section style={{ marginBottom: 80 }}>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 32, letterSpacing: -0.5 }}>Your Stats</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                  <div className="stat-card">
                    <div className="stat-value">{stats.totalReferrals}</div>
                    <div className="stat-label">Total Referrals</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{stats.activeReferrals}</div>
                    <div className="stat-label">Active Referrals</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{stats.completedReferrals}</div>
                    <div className="stat-label">Completed Referrals</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value" style={{ color: '#22C55E' }}>৳{stats.totalEarnings.toLocaleString()}</div>
                    <div className="stat-label">Total Earnings</div>
                  </div>
                </div>
              </section>

              {/* Referral Code Section */}
              <section style={{ marginBottom: 80 }}>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 32, letterSpacing: -0.5 }}>Your Referral Code</h2>
                
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32 }}>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>Share this code with others</p>
                  
                  <div className="code-box" style={{ marginBottom: 20 }}>
                    <span className="code-value">{referralCode}</span>
                    <button className="copy-btn" onClick={() => copyToClipboard(referralCode, 'Code')}>
                      {copied ? '✓ Copied' : '📋 Copy'}
                    </button>
                  </div>

                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 16, fontFamily: "'Space Mono', monospace" }}>OR SHARE THIS LINK</p>
                  
                  <div className="code-box">
                    <input type="text" value={referralLink} readOnly style={{ flex: 1, background: 'none', border: 'none', color: '#fff', fontFamily: "'Space Mono', monospace", fontSize: 12, outline: 'none' }} />
                    <button className="copy-btn" onClick={() => copyToClipboard(referralLink, 'Link')}>
                      {copied ? '✓ Copied' : '🔗 Copy'}
                    </button>
                  </div>

                  <div style={{ marginTop: 24, padding: 16, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 12 }}>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.6 }}>
                      💡 <strong>Tip:</strong> Share your referral link on social media, with colleagues, or directly with clients. Every signed-up user counts!
                    </p>
                  </div>
                </div>
              </section>

              {/* Referral History */}
              <section style={{ marginBottom: 80 }}>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 32, letterSpacing: -0.5 }}>Referral History</h2>
                
                {history.length === 0 ? (
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>No referrals yet</p>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Start sharing your referral code to earn commissions!</p>
                  </div>
                ) : (
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ padding: 20, borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr', gap: 16, fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: "'Space Mono', monospace", textTransform: 'uppercase', letterSpacing: 1 }}>
                      <div>Email</div>
                      <div>Status</div>
                      <div>Commission</div>
                      <div>Date</div>
                    </div>
                    
                    {history.map((ref, i) => (
                      <div key={i} className="history-row">
                        <div style={{ fontSize: 13 }}>{ref.referee?.email || ref.refereeEmail}</div>
                        <div><span className={`status-badge status-${ref.status}`}>{ref.status}</span></div>
                        <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700 }}>৳{ref.commissionAmount}</div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{new Date(ref.createdAt).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* How It Works */}
              <section style={{ marginBottom: 100 }}>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 32, letterSpacing: -0.5, textAlign: 'center' }}>How It Works</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
                  {[
                    { icon: '📤', title: 'Share Your Code', desc: 'Send your unique referral code to friends & clients' },
                    { icon: '✍️', title: 'They Sign Up', desc: 'They register using your code or link' },
                    { icon: '💼', title: 'They Order', desc: 'Once they place an order, it counts!' },
                    { icon: '💰', title: 'You Earn', desc: 'Get 10% commission automatically credited' },
                  ].map((step, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24, textAlign: 'center', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                      <div style={{ fontSize: 40, marginBottom: 12 }}>{step.icon}</div>
                      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 800, marginBottom: 8 }}>{step.title}</h3>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{step.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
}
