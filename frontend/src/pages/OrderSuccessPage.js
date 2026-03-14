import { Link } from 'react-router-dom';

/*
  FIX: Elements previously had inline `opacity: 0` with `animationFillMode: 'forwards'`.
  If animations are disabled (prefers-reduced-motion, browser bug, slow device),
  those elements would stay permanently invisible.

  Solution: Move opacity:0 into the keyframe only. Elements start visible by default.
  The animation overrides opacity during playback. prefers-reduced-motion disables
  the animation entirely so elements are always visible.
*/
export default function OrderSuccessPage() {
  return (
    <>
      <style>{`
        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: none; }
        }
        .anim-1 { animation: fadeUpIn 0.6s 0s ease both; }
        .anim-2 { animation: fadeUpIn 0.6s 0.1s ease both; }
        .anim-3 { animation: fadeUpIn 0.6s 0.2s ease both; }
        .anim-4 { animation: fadeUpIn 0.6s 0.3s ease both; }

        /* FIX: If animations are disabled, elements are always visible */
        @media (prefers-reduced-motion: reduce) {
          .anim-1, .anim-2, .anim-3, .anim-4 {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 5%' }}>

        <div className="anim-1" style={{ fontSize: 72, marginBottom: 20 }}>🎉</div>

        <h1 className="anim-2" style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(26px,4vw,44px)', fontWeight: 900, color: '#fff', letterSpacing: -1, marginBottom: 14 }}>
          Payment Successful!
        </h1>

        <p className="anim-3" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, maxWidth: 420, marginBottom: 36, lineHeight: 1.7 }}>
          Your order has been confirmed. Our team will reach out within 24 hours to kick off your project.
        </p>

        <div className="anim-4" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/dashboard/orders" className="btn-primary" style={{ padding: '12px 28px' }}>View My Orders →</Link>
          <Link to="/services" className="btn-outline" style={{ padding: '12px 28px' }}>Browse More Services</Link>
        </div>

      </div>
    </>
  );
}