import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import FadeUp from '../components/FadeUp.jsx';

/* ─────────────────────────────────────────────────────────
   RESUME CONTENT — edit everything here
   ───────────────────────────────────────────────────────── */

const META = {
  name:        'Bri May',
  title:       'Lead Product Designer & Creative Director',
  intro:       'I design product experiences that simplify complexity, strengthen trust, and drive measurable business impact. My work sits at the intersection of product design, UX strategy, visual systems, and creative direction.',
  location:    'Bay Area, CA',
  availability:'Open to remote',
  portfolio:   'imbrimay.com',
  portfolioUrl:'https://imbrimay.com',
  linkedin:    'linkedin.com/in/brimay',
  linkedinUrl: 'https://linkedin.com/in/brimay',
  email:       'thebrimay@gmail.com',
  resumePdf:   '/Bri-May-Resume.pdf',
  updated:     'April 2026',
};

const STATS = [
  { value: '10+',   label: 'Years experience'  },
  { value: '+200%', label: 'Engagement growth'  },
  { value: '$12M',  label: 'Revenue impact'     },
];

const IMPACT = [
  {
    result:  '+200% platform engagement',
    context: 'Drove through a full redesign of Financial Finesse\'s core wellness platform — improving personalization, onboarding, and daily utility at scale.',
  },
  {
    result:  '~$12M revenue contribution',
    context: 'Delivered through stronger product experience, sales enablement design, and brand alignment across enterprise channels.',
  },
  {
    result:  'Fortune 500 trust — Meta, JPMorgan, NFL, CVS, Federal Reserve',
    context: 'Helped win and retain enterprise clients through platform modernization, demo-ready design, and executive storytelling.',
  },
  {
    result:  'Aimee AI — designed end-to-end',
    context: 'Built a proprietary in-product AI coach that personalized onboarding, surfaced action plans, and guided users through complex financial decisions.',
  },
  {
    result:  'Financial Wellness Hub — rebuilt from scratch',
    context: 'Redesigned a legacy static content library into a modern, adaptive platform now deployed to 500K+ users and used in sales demos.',
  },
  {
    result:  'Full-cycle design leadership across 10 years',
    context: 'Led product design, brand, marketing, and executive storytelling from IC to Creative Director — shipping across every major surface.',
  },
];

const EXPERIENCE = [
  {
    company: 'Financial Finesse',
    role:    'Lead Product Designer & Creative Director',
    period:  '2015 – Present',
    summary: 'Led design across product, brand, and marketing for a financial wellness platform serving Fortune 500 companies. Owned end-to-end experience design across major platform redesigns, AI integration, UX strategy, design systems, and executive-facing storytelling.',
    bullets: [
      'Led redesign of the Financial Wellness Hub, modernizing the platform and improving engagement by approximately 200%',
      'Contributed to approximately $12M in revenue impact through stronger product experience, sales enablement, and brand alignment',
      'Helped support enterprise growth with clients including Meta, JPMorgan Chase, NFL, CVS Health, and the Federal Reserve',
      'Designed Aimee AI — a proprietary in-product AI coach that personalized onboarding, surfaced action plans, and guided financial decisions',
      'Built cohesive product and visual systems across dashboards, content experiences, onboarding, and marketing touchpoints',
      'Partnered with product, engineering, marketing, and leadership to ship high-visibility work under tight deadlines',
    ],
  },
  {
    company: 'CK Communications',
    role:    'Senior Graphic Designer & Photography Manager',
    period:  '2012 – 2015',
    summary: 'Led creative execution across branding, marketing, web, and photography for a wide range of clients.',
    bullets: [
      'Led design across 50+ client brands and campaigns',
      'Developed 15+ brand identities across digital and print',
      'Managed photography production and creative execution',
      'Supported team output across design, marketing, and visual storytelling',
    ],
  },
];

const WORK = [
  {
    to:   '/work/hub',
    n:    '01',
    title:'Financial Wellness Hub',
    tags: ['Platform Design', 'UX Strategy', 'Design Systems'],
    desc: 'Redesigned a core enterprise platform to feel modern, personalized, and scalable — driving engagement growth and enterprise sales confidence.',
  },
  {
    to:   '/work/aimee',
    n:    '02',
    title:'Aimee AI',
    tags: ['AI Product Design', 'Conversational UX', 'Product Design'],
    desc: 'Designed an embedded AI coach that made onboarding, support, and next-step recommendations more useful and more human.',
  },
  {
    to:   '/work/smart-benefits',
    n:    '03',
    title:'Smart Benefits',
    tags: ['Enterprise UX', 'AI', 'Systems Design'],
    desc: 'Created an AI-powered benefits experience that helped users understand complex documents through structured Q&A and admin workflows.',
  },
];

const CAPABILITIES = [
  {
    group: 'Product',
    items: ['Product strategy', 'UX / UI design', 'Interaction design', 'User research', 'Rapid prototyping'],
  },
  {
    group: 'Systems & Visual',
    items: ['Design systems', 'Visual design', 'AI product design', 'Component libraries', 'Cross-platform design'],
  },
  {
    group: 'Leadership',
    items: ['Creative direction', 'Cross-functional leadership', 'Storytelling', 'Stakeholder alignment', 'Design reviews'],
  },
];

const EDUCATION = {
  school: 'California State University, Chico',
  degree: 'B.S. Business Marketing',
};

/* ─── ACCENT COLOR — used only for links ────────────────── */
const A = '#0066cc';

/* ─────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────── */
export default function Resume() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />
      <main>
        <HeroSection />
        <ImpactSection />
        <ExperienceSection />
        <WorkSection />
        <CapabilitiesSection />
        <EducationSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

/* ─── 1. HERO ────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section style={{ padding: 'clamp(80px, 10vw, 140px) 0 clamp(60px, 7vw, 96px)' }}>
      <div className="container">

        <FadeUp>
          <p className="eyebrow" style={{ marginBottom: 28 }}>Résumé</p>
        </FadeUp>

        <FadeUp delay={0.04}>
          <h1 style={{
            fontSize: 'clamp(48px, 7vw, 88px)',
            fontWeight: 700,
            letterSpacing: '-0.045em',
            lineHeight: 0.98,
            marginBottom: 20,
            color: 'var(--ink)',
          }}>
            {META.name}
          </h1>
        </FadeUp>

        <FadeUp delay={0.08}>
          <p style={{
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
            color: 'var(--ink-2)',
            marginBottom: 28,
          }}>
            {META.title}
          </p>
        </FadeUp>

        <FadeUp delay={0.12}>
          <p style={{
            fontSize: 'clamp(16px, 1.2vw, 18px)',
            color: 'var(--ink-2)',
            lineHeight: 1.72,
            maxWidth: 560,
            marginBottom: 36,
          }}>
            {META.intro}
          </p>
        </FadeUp>

        {/* Metadata row */}
        <FadeUp delay={0.16}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 0',
            alignItems: 'center',
            fontSize: 14,
            color: 'var(--ink-3)',
            marginBottom: 56,
          }}>
            {[
              { label: META.location },
              { label: META.availability },
              { label: META.portfolio, href: META.portfolioUrl },
              { label: 'LinkedIn', href: META.linkedinUrl },
            ].map((item, i, arr) => (
              <span key={item.label} style={{ display: 'flex', alignItems: 'center' }}>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: A,
                      textDecoration: 'none',
                      borderBottom: `1px solid ${A}22`,
                      paddingBottom: 1,
                      transition: 'border-color 0.15s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = A}
                    onMouseLeave={e => e.currentTarget.style.borderColor = `${A}22`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
                {i < arr.length - 1 && (
                  <span style={{ margin: '0 14px', color: 'var(--border)', userSelect: 'none' }}>·</span>
                )}
              </span>
            ))}
            <span style={{ margin: '0 14px', color: 'var(--border)', userSelect: 'none' }}>·</span>
            <a
              href={META.resumePdf}
              download
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                color: 'var(--ink)',
                fontSize: 14,
                fontWeight: 500,
                border: '1px solid var(--border)',
                borderRadius: 100,
                padding: '5px 14px',
                transition: 'border-color 0.15s ease, background 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.background = 'var(--surface)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent'; }}
            >
              Download PDF
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1v7M3 6l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </FadeUp>

        {/* Credibility stats strip */}
        <FadeUp delay={0.2}>
          <div style={{
            display: 'flex',
            gap: 0,
            borderTop: '1px solid var(--border)',
            paddingTop: 0,
          }}>
            {STATS.map((s, i) => (
              <div key={s.value} style={{
                flex: 1,
                padding: 'clamp(20px, 2.5vw, 28px) clamp(20px, 3vw, 36px)',
                borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none',
                borderTop: '1px solid var(--border)',
              }}>
                <div style={{
                  fontSize: 'clamp(22px, 2.5vw, 34px)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: 'var(--ink)',
                  marginBottom: 6,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: 12,
                  color: 'var(--ink-3)',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

      </div>
    </section>
  );
}

/* ─── 2. IMPACT ──────────────────────────────────────────── */
function ImpactSection() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(64px, 8vw, 112px) 0' }}>
      <div className="container">

        <FadeUp style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          <SectionLabel>Impact</SectionLabel>
        </FadeUp>

        <div>
          {IMPACT.map((item, i) => (
            <FadeUp key={item.result} delay={i * 0.05}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'clamp(220px, 30%, 360px) 1fr',
                gap: 'clamp(24px, 4vw, 64px)',
                padding: 'clamp(22px, 2.5vw, 32px) 0',
                borderTop: '1px solid var(--border)',
                alignItems: 'baseline',
              }}
              className="impact-row"
              >
                <p style={{
                  fontSize: 'clamp(14px, 1.1vw, 16px)',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  lineHeight: 1.4,
                  letterSpacing: '-0.01em',
                }}>
                  {item.result}
                </p>
                <p style={{
                  fontSize: 'clamp(14px, 1.05vw, 15px)',
                  color: 'var(--ink-2)',
                  lineHeight: 1.68,
                }}>
                  {item.context}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .impact-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── 3. EXPERIENCE ──────────────────────────────────────── */
function ExperienceSection() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(64px, 8vw, 112px) 0' }}>
      <div className="container">

        <FadeUp style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          <SectionLabel>Experience</SectionLabel>
        </FadeUp>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {EXPERIENCE.map((job, i) => (
            <FadeUp key={job.company} delay={i * 0.07}>
              <div
                className="exp-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'clamp(160px, 22%, 240px) 1fr',
                  gap: 'clamp(24px, 5vw, 72px)',
                  padding: 'clamp(40px, 5vw, 64px) 0',
                  borderTop: '1px solid var(--border)',
                  alignItems: 'start',
                }}
              >
                {/* Left col */}
                <div>
                  <p style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-3)',
                    marginBottom: 8,
                  }}>
                    {job.period}
                  </p>
                  <p style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--ink-2)',
                    letterSpacing: '-0.01em',
                  }}>
                    {job.company}
                  </p>
                </div>

                {/* Right col */}
                <div>
                  <h3 style={{
                    fontSize: 'clamp(18px, 1.5vw, 21px)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    color: 'var(--ink)',
                    marginBottom: 14,
                  }}>
                    {job.role}
                  </h3>
                  <p style={{
                    fontSize: 'clamp(14px, 1.1vw, 15px)',
                    color: 'var(--ink-2)',
                    lineHeight: 1.72,
                    marginBottom: 24,
                    maxWidth: 620,
                  }}>
                    {job.summary}
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {job.bullets.map(b => (
                      <li
                        key={b}
                        style={{
                          display: 'flex',
                          gap: 14,
                          alignItems: 'flex-start',
                          fontSize: 'clamp(14px, 1.05vw, 15px)',
                          color: 'var(--ink-2)',
                          lineHeight: 1.65,
                        }}
                      >
                        <span style={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: 'var(--ink-3)',
                          flexShrink: 0,
                          marginTop: 10,
                        }} />
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
        @media (max-width: 640px) {
          .exp-row { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── 4. SELECTED WORK ───────────────────────────────────── */
function WorkSection() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(64px, 8vw, 112px) 0' }}>
      <div className="container">

        <FadeUp style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          <SectionLabel>Selected Work</SectionLabel>
        </FadeUp>

        <div>
          {WORK.map((proj, i) => (
            <FadeUp key={proj.title} delay={i * 0.06}>
              <Link to={proj.to} className="work-row-link">
                <div
                  className="work-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr auto',
                    gap: 'clamp(20px, 3vw, 48px)',
                    padding: 'clamp(28px, 3.5vw, 40px) 0',
                    borderTop: '1px solid var(--border)',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {/* Number */}
                  <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: 'var(--ink-3)',
                    paddingTop: 2,
                  }}>
                    {proj.n}
                  </span>

                  {/* Content */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 8 }}>
                      <h3 style={{
                        fontSize: 'clamp(17px, 1.5vw, 20px)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        color: 'var(--ink)',
                        margin: 0,
                      }}>
                        {proj.title}
                      </h3>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {proj.tags.map(t => (
                          <span key={t} className="tag">{t}</span>
                        ))}
                      </div>
                    </div>
                    <p style={{
                      fontSize: 'clamp(14px, 1.05vw, 15px)',
                      color: 'var(--ink-2)',
                      lineHeight: 1.6,
                      maxWidth: 560,
                      margin: 0,
                    }}>
                      {proj.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <span className="work-row-arrow" style={{
                    fontSize: 13,
                    color: 'var(--ink-3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    transition: 'color 0.15s ease, gap 0.2s ease',
                  }}>
                    View
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>

      <style>{`
        .work-row { transition: opacity 0.15s ease; }
        .work-row-link:hover .work-row { opacity: 0.75; }
        .work-row-link:hover .work-row-arrow { color: var(--ink); gap: 8px; }
        @media (max-width: 580px) {
          .work-row { grid-template-columns: 40px 1fr !important; }
          .work-row-arrow { display: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── 5. CAPABILITIES ────────────────────────────────────── */
function CapabilitiesSection() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(64px, 8vw, 112px) 0' }}>
      <div className="container">

        <FadeUp style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          <SectionLabel>Capabilities</SectionLabel>
        </FadeUp>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(32px, 5vw, 72px)',
        }}
        className="cap-grid"
        >
          {CAPABILITIES.map((group, i) => (
            <FadeUp key={group.group} delay={i * 0.07}>
              <p style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-3)',
                marginBottom: 20,
              }}>
                {group.group}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {group.items.map(item => (
                  <li key={item} style={{
                    fontSize: 'clamp(15px, 1.15vw, 16px)',
                    color: 'var(--ink-2)',
                    lineHeight: 1.4,
                    letterSpacing: '-0.01em',
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeUp>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .cap-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 400px) {
          .cap-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── 6. EDUCATION ───────────────────────────────────────── */
function EducationSection() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(56px, 6vw, 88px) 0' }}>
      <div className="container">

        <FadeUp>
          <div
            className="edu-row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'clamp(160px, 22%, 240px) 1fr',
              gap: 'clamp(24px, 5vw, 72px)',
              alignItems: 'baseline',
            }}
          >
            <SectionLabel>Education</SectionLabel>
            <div>
              <p style={{
                fontSize: 'clamp(16px, 1.3vw, 18px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
                marginBottom: 4,
              }}>
                {EDUCATION.school}
              </p>
              <p style={{
                fontSize: 'clamp(14px, 1.05vw, 15px)',
                color: 'var(--ink-2)',
              }}>
                {EDUCATION.degree}
              </p>
            </div>
          </div>
        </FadeUp>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .edu-row { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── 7. CTA / CONTACT ───────────────────────────────────── */
function CtaSection() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 140px) 0 clamp(48px, 6vw, 80px)' }}>
      <div className="container">

        <FadeUp>
          <p className="eyebrow" style={{ marginBottom: 28 }}>Let's work together</p>
          <h2 style={{
            fontSize: 'clamp(26px, 3.5vw, 48px)',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            maxWidth: 720,
            marginBottom: 20,
            color: 'var(--ink)',
          }}>
            Interested in building thoughtful, high-impact products together?
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.1vw, 16px)',
            color: 'var(--ink-3)',
            lineHeight: 1.65,
            maxWidth: 520,
            marginBottom: 44,
          }}>
            Currently open to senior, lead, and principal-level opportunities across
            product design, design leadership, and creative direction.
          </p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 48 }}>
            <a
              href={`mailto:${META.email}`}
              className="btn-primary"
            >
              {META.email}
            </a>
            <a
              href={META.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              LinkedIn ↗
            </a>
            <a
              href={META.resumePdf}
              download
              className="btn-ghost"
            >
              Download Résumé
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div style={{
            borderTop: '1px solid var(--border)',
            paddingTop: 28,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <Link to="/work" className="btn-secondary">View case studies</Link>
              <Link to="/about" className="btn-secondary">About me</Link>
            </div>
            <p style={{
              fontSize: 12,
              color: 'var(--ink-3)',
              letterSpacing: '0.04em',
            }}>
              Last updated {META.updated}
            </p>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}

/* ─── SHARED: SECTION LABEL ──────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <h2 style={{
      fontSize: 'clamp(22px, 2vw, 30px)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: 'var(--ink)',
      margin: 0,
    }}>
      {children}
    </h2>
  );
}
