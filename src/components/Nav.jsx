import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'border-color 0.2s ease',
    }}>
      <div style={{
        width: '100%',
        padding: '22px var(--px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link to="/" style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>
          Bri May
        </Link>
        <ul style={{ display: 'flex', gap: 36, listStyle: 'none' }} className="nav-links">
          <li><Link to="/work" style={{ fontSize: 14, transition: 'opacity 0.15s' }} className="nav-link">Work</Link></li>
          <li><Link to="/about" style={{ fontSize: 14, transition: 'opacity 0.15s' }} className="nav-link">About</Link></li>
          <li><Link to="/resume" style={{ fontSize: 14, transition: 'opacity 0.15s' }} className="nav-link">Résumé</Link></li>
          <li><Link to="/contact" style={{ fontSize: 14, transition: 'opacity 0.15s' }} className="nav-link">Contact</Link></li>
        </ul>
      </div>
      <style>{`
        .nav-link:hover { opacity: 0.5; }
        @media (max-width: 640px) { .nav-links { display: none !important; } }
      `}</style>
    </nav>
  );
}
