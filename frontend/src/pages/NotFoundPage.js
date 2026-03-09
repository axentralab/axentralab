import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ minHeight:'80vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'80px 5%' }}>
      <div style={{ fontFamily:"'Sora',sans-serif", fontSize:96, fontWeight:900, color:'rgba(34,197,94,0.15)', letterSpacing:-4, lineHeight:1 }}>404</div>
      <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:28, fontWeight:800, color:'#fff', marginTop:16, marginBottom:12 }}>Page Not Found</h1>
      <p style={{ color:'rgba(255,255,255,0.45)', fontSize:15, marginBottom:32 }}>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary" style={{ padding:'12px 28px' }}>Go Home →</Link>
    </div>
  );
}
