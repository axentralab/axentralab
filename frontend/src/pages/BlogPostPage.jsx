import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import Skeleton from '../components/Skeleton';
import { TAG_COLORS } from '../constants/statusColors';

function readingTime(text = '') {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

function generateBody(post) {
  return `${post.excerpt}\n\n## Overview\n\nThis article covers the essential aspects of ${post.title.toLowerCase()}. Whether you're a seasoned professional or just getting started, the insights here will help you make better decisions.\n\n## Key Takeaways\n\n- Understanding the core concepts is crucial before diving into implementation\n- Real-world examples provide context that documentation alone cannot offer\n- Continuous iteration and testing lead to better outcomes over time\n- Security and performance should never be afterthoughts\n\n## Deep Dive\n\nThe landscape of ${post.category} is evolving rapidly. At Axentralab, we've seen first-hand how the right approach can make or break a project.\n\n## Conclusion\n\nMastering ${post.category.toLowerCase()} is a journey, not a destination. Reach out if you need expert guidance.`;
}

function renderBody(text) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 800, color: '#fff', margin: '32px 0 14px', letterSpacing: -0.3 }}>{line.slice(3)}</h2>;
    if (line.startsWith('- '))  return <li key={i} style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 8 }}>{line.slice(2)}</li>;
    if (line.trim() === '')     return <div key={i} style={{ height: 12 }} />;
    return <p key={i} style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, marginBottom: 4 }}>{line}</p>;
  });
}

export default function BlogPostPage() {
  const { id }                = useParams();
  const navigate              = useNavigate();
  const toast                 = useToast();
  const [post, setPost]       = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied]   = useState(false);

  useEffect(() => {
    setLoading(true);
    setPost(null);
    api.get(`/blog/${id}`)
      .then(r => {
        setPost(r.data.data);
        const all = r.data.allPosts || [];
        setRelated(all.filter(p => p.category === r.data.data.category && p._id !== id).slice(0, 3));
      })
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy link');
    }
  };

  if (loading) return (
    <div style={{ padding: '100px 5% 80px', maxWidth: 760, margin: '0 auto' }}>
      <Skeleton height={13} width="20%" style={{ marginBottom: 32 }} />
      <Skeleton height={20} width="35%" style={{ marginBottom: 24 }} />
      <Skeleton height={42} width="90%" style={{ marginBottom: 8 }} />
      <Skeleton height={42} width="70%" style={{ marginBottom: 32 }} />
      <Skeleton height={16} width="100%" style={{ marginBottom: 8 }} />
      <Skeleton height={16} width="95%" style={{ marginBottom: 8 }} />
      <Skeleton height={16} width="80%" />
    </div>
  );

  if (!post) return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 5%' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
      <h2 style={{ color: '#fff', fontFamily: "'Sora',sans-serif", marginBottom: 12 }}>Article not found</h2>
      <button onClick={() => navigate('/blog')} className="btn-primary" style={{ padding: '12px 28px' }}>← Back to Blog</button>
    </div>
  );

  const color   = TAG_COLORS[post.category] || '#06B6D4';
  const body    = post.body || generateBody(post);
  const minutes = readingTime(body);

  return (
    <div style={{ padding: '100px 5% 80px', minHeight: '100vh' }}>
      <article style={{ maxWidth: 760, margin: '0 auto' }}>

        <button onClick={() => navigate('/blog')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 13, cursor: 'pointer', marginBottom: 32, padding: 0, fontFamily: "'Space Mono',monospace" }}>
          ← Back to Blog
        </button>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, border: `1px solid ${color}30`, background: `${color}10`, color, fontSize: 11, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>{post.category}</span>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
            {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>· {minutes} min read</span>
          {post.views > 0 && (
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>· {post.views.toLocaleString()} views</span>
          )}
        </div>

        <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(24px,4vw,42px)', fontWeight: 900, color: '#fff', margin: '0 0 24px', lineHeight: 1.2, letterSpacing: -1 }}>{post.title}</h1>

        <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 20, marginBottom: 36 }}>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: 0, fontStyle: 'italic' }}>{post.excerpt}</p>
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg,${color}40,transparent)`, marginBottom: 36 }} />

        <div style={{ fontSize: 15, lineHeight: 1.85 }}>
          <ul style={{ paddingLeft: 20, margin: 0 }}>{renderBody(body)}</ul>
        </div>

        {/* Share row */}
        <div style={{ marginTop: 48, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 999, border: `1px solid ${color}30`, background: `${color}10`, color, fontSize: 12, fontFamily: "'Space Mono',monospace", fontWeight: 600 }}>
            # {post.category}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {/* X share */}
            <a href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank" rel="noopener noreferrer"
              style={{ width: 34, height: 34, borderRadius: 999, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none', fontWeight: 700 }}>
              𝕏
            </a>
            {/* LinkedIn share */}
            <a href={`https://linkedin.com/shareArticle?title=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank" rel="noopener noreferrer"
              style={{ width: 34, height: 34, borderRadius: 999, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none', fontWeight: 700 }}>
              in
            </a>
            {/* Copy link button */}
            <button onClick={handleCopyLink}
              style={{ height: 34, padding: '0 12px', borderRadius: 999, background: copied ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)', border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`, color: copied ? '#22C55E' : 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: "'Space Mono',monospace", cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              {copied ? '✓ Copied' : '🔗 Copy link'}
            </button>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <div style={{ maxWidth: 760, margin: '64px auto 0' }}>
          <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 20, letterSpacing: -0.3 }}>Related Articles</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
            {related.map(r => {
              const rc = TAG_COLORS[r.category] || '#06B6D4';
              return (
                <div key={r._id} onClick={() => navigate(`/blog/${r._id}`)}
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${rc}35`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ height: 3, background: `linear-gradient(90deg,${rc},transparent)`, marginBottom: 14, borderRadius: 2 }} />
                  <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 999, border: `1px solid ${rc}30`, background: `${rc}10`, color: rc, fontSize: 9, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>{r.category}</span>
                  <h4 style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 800, color: '#fff', margin: '0 0 8px', lineHeight: 1.4 }}>{r.title}</h4>
                  <span style={{ fontSize: 11, color: rc, fontWeight: 700, fontFamily: "'Space Mono',monospace" }}>Read →</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ maxWidth: 760, margin: '64px auto 0' }}>
        <div style={{ background: `linear-gradient(135deg,${color}10,rgba(255,255,255,0.02))`, border: `1px solid ${color}20`, borderRadius: 20, padding: '36px 32px', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>Need help with {post.category}?</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: '0 0 20px' }}>Our team at Axentralab is ready to help with a tailored solution.</p>
          <button onClick={() => navigate('/contact')}
            style={{ padding: '12px 28px', background: color, color: ['#22C55E', '#F59E0B'].includes(color) ? '#000' : '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'Sora',sans-serif", cursor: 'pointer' }}>
            Get in Touch →
          </button>
        </div>
      </div>
    </div>
  );
}