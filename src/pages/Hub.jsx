import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import FadeUp from '../components/FadeUp.jsx';
import ParallaxImage from '../components/ParallaxImage.jsx';

const CLIENTS = ['Meta', 'NFLPA', 'CVS Health', 'Federal Reserve', 'Patagonia', 'JPMorgan Chase', 'McKinsey & Co.', 'Nestlé', 'Comcast', 'General Mills'];

const SOLUTIONS = [
  { title: 'Focused homepage', image: '/images/homepage-features.png', alt: 'Redesigned hub homepage' },
  { title: 'AI-powered guidance', image: '/images/aimee-ai.png', alt: 'Aimee AI coaching interface' },
  { title: 'Personalized content system', image: '/images/explore-content.png', alt: 'Content system' },
  { title: 'Cohesive design system', image: '/images/component-library.png', alt: 'Component library' },
];

const IMPACT = [
  { value: '200%', label: 'Increase in platform engagement after launch' },
  { value: 'Fortune 500', label: 'Trusted by Fortune 500 companies, government institutions, and major enterprises worldwide', small: true },
  { value: '#1', label: 'Demo asset used to win clients including Meta, NFLPA, CVS Health, and the Federal Reserve' },
  { value: 'Market Leader', label: 'Shifted perception from dated to best-in-class — closing deals competitors couldn\'t', small: true },
];

export default function Hub() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />
      <main>

        {/* ── HERO ──────────────────────────────────────── */}
        <section style={{ padding: 'clamp(72px, 9vw, 120px) 0 clamp(48px, 5vw, 72px)' }}>
          <div className="container">
            <FadeUp>
              <p className="eyebrow" style={{ marginBottom: 20 }}>
                Creative Director &amp; Lead Product Designer · Financial Finesse
              </p>
              <h1 style={{
                fontSize: 'clamp(32px, 4vw, 54px)',
                fontWeight: 700,
                letterSpacing: '-0.035em',
                lineHeight: 1.1,
                maxWidth: 900,
                marginBottom: 48,
              }}>
                Redesigned a financial wellness platform trusted by Fortune 500 companies —
                increasing engagement 200% and winning enterprise clients including Meta,
                the Federal Reserve, and the NFLPA
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <ParallaxImage
                src="/images/hub-home-hero.png"
                alt="Financial Finesse Hub home screen"
                style={{
                  width: '100%',
                  borderRadius: 'var(--radius-lg)',
                  aspectRatio: '16/8',
                }}
              />
            </FadeUp>
          </div>
        </section>

        {/* ── CONTEXT ───────────────────────────────────── */}
        <CsSection>
          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 20 }}>Context</p>
            <p style={{ fontSize: 'clamp(16px, 1.3vw, 19px)', color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: 820, marginBottom: 32 }}>
              Financial Finesse serves Fortune 500 companies, government institutions, and major
              enterprise clients — delivering financial wellness to their employees at scale. The
              content library was strong, but the product hadn't kept pace. Competitors were
              winning deals by showing more modern, engaging experiences. The platform felt dated,
              hard to navigate, and couldn't compete in a live sales demo. Leadership needed a
              response, fast.
            </p>
            <blockquote style={{
              fontSize: 'clamp(18px, 1.8vw, 24px)',
              fontWeight: 500,
              fontStyle: 'italic',
              color: 'var(--ink)',
              letterSpacing: '-0.015em',
              lineHeight: 1.5,
              borderLeft: '3px solid var(--border)',
              paddingLeft: 28,
              maxWidth: 680,
              marginBottom: 40,
            }}>
              "The product feels outdated and hard to navigate."
            </blockquote>

            {/* Client pills */}
            <div>
              <p className="eyebrow" style={{ marginBottom: 14 }}>Trusted by</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {CLIENTS.map(c => (
                  <span key={c} style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--ink-2)',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 100,
                    padding: '6px 16px',
                  }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </CsSection>

        {/* ── PROBLEM ───────────────────────────────────── */}
        <CsSection>
          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 20 }}>The Problem</p>
            <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: 28 }}>
              The platform was losing deals it should have been winning
            </h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['Low engagement', 'users weren't returning after their first session'],
                ['Unclear value', 'the product didn't communicate what to do next'],
                ['Static experience', 'no personalization, no dynamic content, no momentum'],
                ['Weak sales demos', 'the UI couldn't compete visually in live pitches'],
              ].map(([bold, rest]) => (
                <li key={bold} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 'clamp(15px, 1.1vw, 17px)', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ink-3)', flexShrink: 0, marginTop: 10 }} />
                  <span><strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{bold}</strong> — {rest}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </CsSection>

        {/* ── BEFORE ────────────────────────────────────── */}
        <CsSection>
          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 20 }}>Before</p>
            <ParallaxImage
              src="/images/before-screenshot.png"
              alt="Before: old Financial Finesse Hub interface"
              style={{ width: '100%', borderRadius: 'var(--radius-md)' }}
            />
          </FadeUp>
        </CsSection>

        {/* ── ROLE ──────────────────────────────────────── */}
        <CsSection>
          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 20 }}>My Role</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
              {[
                ['Title', 'Creative Director & Lead Product Designer'],
                ['Team', 'Product, Engineering, Marketing'],
                ['Timeline', '6 months from audit to launch'],
                ['Scope', 'Product redesign, AI features, design system'],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>{label}</p>
                  <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.5 }}>{val}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </CsSection>

        {/* ── SOLUTION ──────────────────────────────────── */}
        <CsSection id="solution">
          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 20 }}>The Solution</p>
            <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: 48 }}>
              Four focused design decisions that transformed the platform
            </h2>
          </FadeUp>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            {SOLUTIONS.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.07}>
                <p className="eyebrow" style={{ marginBottom: 14 }}>{s.title}</p>
                <ParallaxImage
                  src={s.image}
                  alt={s.alt}
                  style={{ width: '100%', borderRadius: 'var(--radius-md)' }}
                />
              </FadeUp>
            ))}
          </div>
        </CsSection>

        {/* ── IMPACT ────────────────────────────────────── */}
        <CsSection>
          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 28 }}>Impact</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1px',
              background: 'var(--border)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
            }}>
              {IMPACT.map(item => (
                <div key={item.value} style={{ background: 'var(--bg)', padding: 'clamp(24px, 3vw, 40px)' }}>
                  <div style={{
                    fontSize: item.small ? 'clamp(20px, 2.5vw, 30px)' : 'clamp(32px, 4vw, 52px)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    color: 'var(--ink)',
                    marginBottom: 10,
                  }}>
                    {item.value}
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55 }}>{item.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </CsSection>

        {/* ── WHAT'S NEXT ───────────────────────────────── */}
        <CsSection>
          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 20 }}>What I'd Do Next</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'Improve onboarding speed and first-session value to reduce early drop-off',
                'Expand AI personalization with deeper behavioral and financial data signals',
                'Add feedback loops to surface what\'s working and create faster iteration cycles',
              ].map(item => (
                <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 'clamp(15px, 1.1vw, 17px)', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ink-3)', flexShrink: 0, marginTop: 10 }} />
                  {item}
                </li>
              ))}
            </ul>
          </FadeUp>
        </CsSection>

        {/* ── BOTTOM NAV ────────────────────────────────── */}
        <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(40px, 5vw, 64px) 0' }}>
          <div className="container">
            <FadeUp>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
                <Link to="/work" className="btn-secondary">← Back to Work</Link>
                <Link to="/resume" className="btn-secondary">View Résumé</Link>
                <Link to="/contact" className="btn-secondary">Contact ↗</Link>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

/* ─── SHARED SECTION WRAPPER ─────────────────────────────── */
function CsSection({ children, id }) {
  return (
    <section
      id={id}
      style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(52px, 7vw, 96px) 0',
      }}
    >
      <div className="container">
        {children}
      </div>
    </section>
  );
}
