import FadeUp from './FadeUp.jsx';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: 'clamp(36px, 4vw, 56px) 0',
      marginTop: 'clamp(36px, 4vw, 56px)',
    }}>
      <FadeUp>
        <div style={{
          width: '100%',
          padding: '0 var(--px)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 32,
          flexWrap: 'wrap',
        }} className="footer-inner">
          <span style={{ fontSize: 14, fontWeight: 600 }}>Bri May</span>
          <div style={{ display: 'flex', gap: 28 }} className="footer-links">
            <a href="mailto:thebrimay@gmail.com" style={{ fontSize: 14, color: 'var(--ink-2)', transition: 'color 0.15s' }} className="footer-link">thebrimay@gmail.com</a>
            <a href="https://www.linkedin.com/in/brimay" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: 'var(--ink-2)', transition: 'color 0.15s' }} className="footer-link">LinkedIn ↗</a>
          </div>
          <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>© 2025 Bri May</span>
        </div>
      </FadeUp>
      <style>{`
        .footer-link:hover { color: var(--ink) !important; }
        @media (max-width: 640px) {
          .footer-inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  );
}
