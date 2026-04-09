import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import FadeUp from '../components/FadeUp.jsx';

const CASES = [
  {
    to: '/work/hub',
    title: 'Financial Wellness Hub',
    desc: 'Reimagining a financial wellness platform to improve onboarding, engagement, and clarity across complex user journeys.',
    impact: 'Increased engagement 200% and supported $12M in revenue growth',
    tags: ['Platform Design', 'UX Strategy'],
    bg: '#EBE8F4',
    image: '/images/hub-thumbnail.png',
  },
  {
    to: '/work/aimee',
    title: 'Aimee AI Coach',
    desc: 'Designing a conversational AI coach that turns static financial education into personalized, motivating guidance.',
    impact: 'Designed core AI conversation flows used by 500K+ active users',
    tags: ['AI Experience', 'Product Design'],
    bg: '#E2E7F0',
    image: '/images/aimee-thumbnail.png',
  },
  {
    to: '/work/smart-benefits',
    title: 'Smart Benefits Platform',
    desc: 'An AI-powered benefits experience that helps employees understand and use complex workplace benefits.',
    impact: 'Reduced benefits confusion 40%, improving employee retention scores',
    tags: ['Enterprise UX', 'Systems Design'],
    bg: '#E2EDE8',
    image: '/images/smart-benefits-thumbnail.png',
  },
];

export default function Work() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />
      <main>
        {/* Page header */}
        <section style={{ padding: 'clamp(72px, 9vw, 120px) 0 clamp(40px, 5vw, 64px)' }}>
          <div className="container">
            <FadeUp>
              <p className="eyebrow" style={{ marginBottom: 20 }}>Work</p>
              <h1 style={{
                fontSize: 'clamp(36px, 4.5vw, 58px)',
                fontWeight: 700,
                letterSpacing: '-0.035em',
                lineHeight: 1.08,
                maxWidth: 680,
                marginBottom: 20,
              }}>
                Selected Case Studies
              </h1>
              <p style={{
                fontSize: 'clamp(16px, 1.2vw, 19px)',
                color: 'var(--ink-2)',
                maxWidth: 520,
                lineHeight: 1.65,
              }}>
                A few examples of products I've designed that drove measurable impact.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Cards */}
        <section style={{ paddingBottom: 'clamp(72px, 9vw, 120px)' }}>
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {CASES.map((c, i) => <CaseCard key={c.to} card={c} index={i} />)}
            </div>
          </div>
        </section>

        {/* CTA row */}
        <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(56px, 7vw, 96px) 0' }}>
          <div className="container">
            <FadeUp>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 24,
              }}>
                <div>
                  <h2 style={{
                    fontSize: 'clamp(22px, 2.5vw, 32px)',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    marginBottom: 8,
                  }}>
                    Interested in working together?
                  </h2>
                  <p style={{ fontSize: 15, color: 'var(--ink-2)' }}>
                    I'm open to senior product design roles.
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

function CaseCard({ card, index }) {
  const reduce = useReducedMotion();
  const isEven = index % 2 === 0;

  return (
    <FadeUp delay={index * 0.07}>
      <Link to={card.to} className="case-card-link">
        <div className="case-card-inner" style={{ flexDirection: isEven ? 'row' : 'row-reverse' }}>
          {/* Image */}
          <div className="case-card-img" style={{ background: card.bg }}>
            {card.image && (
              <motion.img
                src={card.image}
                alt={card.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                whileHover={reduce ? {} : { scale: 1.03 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            )}
          </div>

          {/* Body */}
          <div style={{
            padding: 'clamp(32px, 4vw, 52px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
          }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
              {card.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <h2 style={{
              fontSize: 'clamp(22px, 2.2vw, 30px)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              marginBottom: 12,
            }}>
              {card.title}
            </h2>
            <p style={{
              fontSize: 15,
              color: 'var(--ink-2)',
              lineHeight: 1.65,
              marginBottom: 12,
            }}>
              {card.desc}
            </p>
            {/* Impact highlight */}
            <p style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
              marginBottom: 28,
            }}>
              ↑ {card.impact}
            </p>
            <span style={{
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--ink-3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }} className="case-cta">
              View Case Study
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </Link>

      <style>{`
        .case-card-link { display: block; }
        .case-card-inner {
          display: flex;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--surface);
          transition: box-shadow 0.4s cubic-bezier(0.25,0.46,0.45,0.94),
                      transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .case-card-inner:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 52px rgba(0,0,0,0.09);
        }
        .case-card-inner:hover .case-cta { color: var(--ink) !important; }
        .case-card-img {
          width: 52%;
          flex-shrink: 0;
          overflow: hidden;
          min-height: 340px;
        }
        @media (max-width: 720px) {
          .case-card-inner { flex-direction: column !important; }
          .case-card-img { width: 100%; min-height: 240px; }
        }
      `}</style>
    </FadeUp>
  );
}
