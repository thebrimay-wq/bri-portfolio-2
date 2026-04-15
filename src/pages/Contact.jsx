import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import FadeUp from '../components/FadeUp.jsx';

export default function Contact() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />
      <main>

        {/* ── HERO ─────────────────────────────────────── */}
        <section style={{ padding: 'clamp(88px, 12vw, 160px) 0 clamp(72px, 9vw, 120px)' }}>
          <div className="container">
            <div style={{ maxWidth: 720 }}>
              <FadeUp>
                <p className="eyebrow" style={{ marginBottom: 24 }}>Contact</p>
                <h1 style={{
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.05,
                  marginBottom: 24,
                }}>
                  Let's build something impactful
                </h1>
                <p style={{
                  fontSize: 'clamp(17px, 1.4vw, 20px)',
                  color: 'var(--ink-2)',
                  lineHeight: 1.65,
                  marginBottom: 52,
                }}>
                  I'm currently exploring senior product design opportunities.
                  If you're looking for a designer who thinks strategically and
                  executes with craft, let's talk.
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Primary */}
                  <a
                    href="mailto:thebrimay@gmail.com"
                    className="contact-row"
                  >
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 4 }}>Email</p>
                      <p style={{ fontSize: 'clamp(16px, 1.3vw, 19px)', fontWeight: 500, letterSpacing: '-0.01em' }}>
                        thebrimay@gmail.com
                      </p>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/brimay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-row"
                  >
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 4 }}>LinkedIn</p>
                      <p style={{ fontSize: 'clamp(16px, 1.3vw, 19px)', fontWeight: 500, letterSpacing: '-0.01em' }}>
                        linkedin.com/in/brimay ↗
                      </p>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </FadeUp>
            </div>
          </div>

          <style>{`
            .contact-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 24px 28px;
              background: var(--surface);
              border-radius: var(--radius-md);
              border: 1px solid var(--border);
              color: var(--ink);
              transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
            }
            .contact-row:hover {
              border-color: var(--ink);
              background: var(--bg);
              transform: translateY(-2px);
            }
          `}</style>
        </section>

        {/* ── AVAILABILITY NOTE ─────────────────────────── */}
        <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(48px, 6vw, 80px) 0' }}>
          <div className="container">
            <FadeUp>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                flexWrap: 'wrap',
              }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--ink-2)',
                }}>
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#34c759',
                    display: 'inline-block',
                    flexShrink: 0,
                  }} />
                  Currently available for new opportunities
                </span>
                <span style={{ fontSize: 14, color: 'var(--ink-3)' }}>·</span>
                <span style={{ fontSize: 14, color: 'var(--ink-3)' }}>
                  Based in Pleasanton, CA · Open to remote
                </span>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
