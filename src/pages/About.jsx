import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import FadeUp from '../components/FadeUp.jsx';
import ParallaxImage from '../components/ParallaxImage.jsx';

const INTERESTS = [
  { icon: '⚽', title: 'Soccer', desc: 'D1 collegiate athlete — the game shaped how I think about teamwork and competition.' },
  { icon: '📷', title: 'Photography', desc: 'Finding the frame that tells the whole story in one image.' },
  { icon: '✈️', title: 'Travel & Food', desc: 'Eating my way through new cities. Best design research there is.' },
  { icon: '🤿', title: 'Scuba Diving', desc: 'Quieting the mind at 60 feet. Nothing quite like it.' },
  { icon: '🏍', title: 'Dirtbiking', desc: 'Fast, loud, muddy. A necessary counterbalance to screen time.' },
  { icon: '🏄', title: 'Wakeboarding', desc: 'Summer ritual. Water, rope, chaos.' },
  { icon: '🍞', title: 'Sourdough', desc: 'Four-day loaves. Patience as practice.' },
  { icon: '👨‍👩‍👦', title: 'Family', desc: 'Mom to a curious, energetic little boy who makes everything worth it.' },
];

const EXPERIENCE = [
  { role: 'Creative Director & Lead Product Designer', company: 'Financial Finesse', period: '2020 – Present' },
  { role: 'Senior Product Designer', company: 'Independent / Agency', period: '2017 – 2020' },
  { role: 'Product & Brand Designer', company: 'Various Startups', period: '2014 – 2017' },
];

export default function About() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />
      <main>

        {/* ── INTRO + FAMILY PHOTO ──────────────────────── */}
        <section style={{ padding: 'clamp(72px, 9vw, 120px) 0 clamp(64px, 8vw, 100px)' }}>
          <div className="container">
            <div className="about-hero-grid">

              {/* Left: text */}
              <FadeUp style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p className="eyebrow" style={{ marginBottom: 20 }}>About</p>
                <h1 style={{
                  fontSize: 'clamp(36px, 4vw, 56px)',
                  fontWeight: 700,
                  letterSpacing: '-0.035em',
                  lineHeight: 1.08,
                  marginBottom: 28,
                }}>
                  Creative by trade.<br />Competitive by nature.
                </h1>
                <p style={{
                  fontSize: 'clamp(16px, 1.2vw, 18px)',
                  color: 'var(--ink-2)',
                  lineHeight: 1.7,
                  marginBottom: 18,
                }}>
                  Before I was a designer, I was a D1 soccer player. That background — the
                  discipline, the team dynamics, the pressure of high-stakes performance — shaped
                  how I approach every product challenge I take on.
                </p>
                <p style={{
                  fontSize: 'clamp(15px, 1.1vw, 17px)',
                  color: 'var(--ink-2)',
                  lineHeight: 1.7,
                  marginBottom: 18,
                }}>
                  Today I'm a Senior Product Designer and Creative Director — 10+ years in product
                  design, designing since 2011. I live at the intersection of strategy and craft,
                  where a strong point of view meets pixel-level execution.
                </p>
                <p style={{
                  fontSize: 'clamp(15px, 1.1vw, 17px)',
                  color: 'var(--ink-2)',
                  lineHeight: 1.7,
                }}>
                  Outside of work, I'm most grounded in my role as a partner and mom. My family
                  is my number one priority — and it's what keeps everything else in perspective.
                </p>
              </FadeUp>

              {/* Right: family photo */}
              <FadeUp delay={0.1}>
                <ParallaxImage
                  src="/images/family.JPG"
                  alt="Bri May with family"
                  style={{
                    width: '100%',
                    borderRadius: 'var(--radius-lg)',
                    aspectRatio: '3/4',
                  }}
                />
              </FadeUp>

            </div>
          </div>

          <style>{`
            .about-hero-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: clamp(48px, 8vw, 96px);
              align-items: center;
            }
            @media (max-width: 768px) {
              .about-hero-grid {
                grid-template-columns: 1fr;
              }
            }
          `}</style>
        </section>

        {/* ── OUTSIDE WORK ──────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(56px, 7vw, 96px) 0',
        }}>
          <div className="container">
            <FadeUp style={{ marginBottom: 'clamp(32px, 4vw, 48px)' }}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>Outside Work</p>
              <h2 style={{
                fontSize: 'clamp(24px, 2.8vw, 36px)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
              }}>
                The things that keep me honest
              </h2>
            </FadeUp>

            <div className="interests-grid">
              {INTERESTS.map((item, i) => (
                <FadeUp key={item.title} delay={i * 0.05}>
                  <div style={{
                    background: 'var(--surface)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'clamp(24px, 3vw, 36px)',
                    height: '100%',
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 14 }}>{item.icon}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 8 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          <style>{`
            .interests-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 12px;
            }
            @media (max-width: 900px) { .interests-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 480px) { .interests-grid { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        {/* ── EXPERIENCE ────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(56px, 7vw, 96px) 0',
        }}>
          <div className="container">
            <FadeUp style={{ marginBottom: 40 }}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>Experience</p>
              <h2 style={{
                fontSize: 'clamp(22px, 2.5vw, 32px)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
              }}>
                Where I've been
              </h2>
            </FadeUp>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {EXPERIENCE.map((e, i) => (
                <FadeUp key={e.company} delay={i * 0.07}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '24px 0',
                    borderBottom: '1px solid var(--border)',
                    gap: 24,
                    flexWrap: 'wrap',
                  }}>
                    <div>
                      <p style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 4 }}>
                        {e.role}
                      </p>
                      <p style={{ fontSize: 15, color: 'var(--ink-2)' }}>{e.company}</p>
                    </div>
                    <span style={{ fontSize: 14, color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>{e.period}</span>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.2} style={{ marginTop: 40 }}>
              <Link to="/resume" className="btn-secondary">View full résumé →</Link>
            </FadeUp>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────── */}
        <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(56px, 7vw, 96px) 0' }}>
          <div className="container">
            <FadeUp>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
                <div>
                  <h2 style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 8 }}>
                    Want to work together?
                  </h2>
                  <p style={{ fontSize: 15, color: 'var(--ink-2)' }}>
                    I'm exploring senior product design opportunities.
                  </p>
                </div>
                <Link to="/contact" className="btn-primary">Get in touch</Link>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
