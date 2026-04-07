import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import FadeUp from '../components/FadeUp.jsx';

const EXPERIENCE = [
  {
    role: 'Creative Director & Lead Product Designer',
    company: 'Financial Finesse',
    period: '2020 – Present',
    bullets: [
      'Led end-to-end redesign of a financial wellness platform serving Fortune 500 clients, driving 200% increase in engagement',
      'Designed Aimee AI — conversational AI coach used by 500K+ users across enterprise accounts',
      'Created and maintained a comprehensive design system used across product, marketing, and sales',
      'Partnered with product and engineering to ship 4+ major feature launches per year',
      'Served as primary demo designer — platform redesign helped win Meta, NFLPA, CVS Health, and Federal Reserve',
    ],
  },
  {
    role: 'Senior Product & Brand Designer',
    company: 'Independent / Agency',
    period: '2017 – 2020',
    bullets: [
      'Designed digital products and brand systems for Series A/B startups and mid-market companies',
      'Led design for mobile apps, marketing sites, and growth campaigns',
      'Embedded with product teams to accelerate design velocity and build internal design culture',
    ],
  },
  {
    role: 'Product & Brand Designer',
    company: 'Various Startups',
    period: '2014 – 2017',
    bullets: [
      'Early-stage design generalist across product, brand, and marketing',
      'Built design systems from scratch at two companies with no prior design infrastructure',
    ],
  },
];

const SKILLS = [
  { label: 'Product Design', items: ['User Research', 'Information Architecture', 'Interaction Design', 'Usability Testing', 'Prototyping'] },
  { label: 'Systems', items: ['Design Systems', 'Component Libraries', 'Design Tokens', 'Figma Auto Layout', 'Documentation'] },
  { label: 'Visual', items: ['Brand Identity', 'Typography', 'Motion Design', 'Illustration Direction', 'Art Direction'] },
  { label: 'Tools', items: ['Figma', 'Framer', 'Principle', 'After Effects', 'Adobe Creative Suite'] },
  { label: 'Collaboration', items: ['Cross-functional Facilitation', 'Design Reviews', 'Stakeholder Presentations', 'Roadmap Planning', 'Mentorship'] },
];

export default function Resume() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />
      <main>

        {/* ── HEADER ────────────────────────────────────── */}
        <section style={{ padding: 'clamp(72px, 9vw, 120px) 0 clamp(48px, 5vw, 72px)' }}>
          <div className="container">
            <FadeUp>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
                <div>
                  <p className="eyebrow" style={{ marginBottom: 16 }}>Résumé</p>
                  <h1 style={{
                    fontSize: 'clamp(36px, 4.5vw, 58px)',
                    fontWeight: 700,
                    letterSpacing: '-0.035em',
                    lineHeight: 1.08,
                    marginBottom: 16,
                  }}>
                    Bri May
                  </h1>
                  <p style={{ fontSize: 'clamp(16px, 1.2vw, 18px)', color: 'var(--ink-2)' }}>
                    Staff Product Designer &amp; Creative Director · 10 years product design · designing since 2011
                  </p>
                </div>
                <a
                  href="mailto:thebrimay@gmail.com"
                  className="btn-primary"
                >
                  Get in touch
                </a>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── EXPERIENCE ────────────────────────────────── */}
        <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(52px, 7vw, 88px) 0' }}>
          <div className="container">
            <FadeUp style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Experience
              </h2>
            </FadeUp>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
              {EXPERIENCE.map((job, i) => (
                <FadeUp key={job.company} delay={i * 0.07}>
                  <div className="resume-job">
                    <div className="resume-job-meta">
                      <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 6 }}>
                        {job.period}
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--ink-2)' }}>{job.company}</p>
                    </div>
                    <div>
                      <h3 style={{ fontSize: 'clamp(17px, 1.4vw, 20px)', fontWeight: 600, letterSpacing: '-0.015em', marginBottom: 16 }}>
                        {job.role}
                      </h3>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {job.bullets.map(b => (
                          <li key={b} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.6 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--ink-3)', flexShrink: 0, marginTop: 10 }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          <style>{`
            .resume-job {
              display: grid;
              grid-template-columns: 160px 1fr;
              gap: clamp(20px, 4vw, 52px);
              align-items: start;
            }
            @media (max-width: 640px) {
              .resume-job { grid-template-columns: 1fr; }
            }
          `}</style>
        </section>

        {/* ── SKILLS ────────────────────────────────────── */}
        <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(52px, 7vw, 88px) 0' }}>
          <div className="container">
            <FadeUp style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Skills
              </h2>
            </FadeUp>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32 }}>
              {SKILLS.map((group, i) => (
                <FadeUp key={group.label} delay={i * 0.06}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em', marginBottom: 14 }}>
                    {group.label}
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {group.items.map(s => (
                      <li key={s} style={{ fontSize: 14, color: 'var(--ink-2)' }}>{s}</li>
                    ))}
                  </ul>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────── */}
        <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(52px, 7vw, 88px) 0' }}>
          <div className="container">
            <FadeUp>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
                <p style={{ fontSize: 'clamp(16px, 1.2vw, 18px)', color: 'var(--ink-2)' }}>
                  Interested in working together?
                </p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <Link to="/contact" className="btn-primary">Contact Me</Link>
                  <Link to="/work" className="btn-ghost">View Work</Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
