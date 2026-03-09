import { Link } from 'react-router-dom';

export default function OrderSuccessPage() {
  return (
    <div style={{ minHeight:'80vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'80px 5%' }}>
      <div style={{ fontSize:72, marginBottom:20, animation:'fadeUp 0.6s ease both' }}>🎉</div>
      <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(26px,4vw,44px)', fontWeight:900, color:'#fff', letterSpacing:-1, marginBottom:14, animation:'fadeUp 0.6s 0.1s ease both', opacity:0, animationFillMode:'forwards' }}>
        Payment Successful!
      </h1>
      <p style={{ color:'rgba(255,255,255,0.5)', fontSize:16, maxWidth:420, marginBottom:36, lineHeight:1.7, animation:'fadeUp 0.6s 0.2s ease both', opacity:0, animationFillMode:'forwards' }}>
        Your order has been confirmed. Our team will reach out within 24 hours to kick off your project.
      </p>
      <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', animation:'fadeUp 0.6s 0.3s ease both', opacity:0, animationFillMode:'forwards' }}>
        <Link to="/dashboard/orders" className="btn-primary" style={{ padding:'12px 28px' }}>View My Orders →</Link>
        <Link to="/services" className="btn-outline" style={{ padding:'12px 28px' }}>Browse More Services</Link>
      </div>
    </div>
  );
}
