import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import FadeUp from '../components/FadeUp.jsx';

/* ─── DATA ──────────────────────────────────────────────── */
const CLIENTS = ['Meta', 'NFL', 'JPMorgan Chase', 'CVS Health', 'Nestlé', 'Federal Reserve', 'Patagonia', 'MLS'];

const WORK = [
  {
    to: '/work/hub',
    title: 'Financial Wellness Hub',
    impact: 'Increased engagement 200% and supported $12M in revenue growth',
    tags: ['Platform Design', 'UX Strategy'],
    bg: '#EBE8F4',
    image: '/images/hub-home-hero.png',
  },
  {
    to: '/work/aimee',
    title: 'Aimee AI Coach',
    impact: 'Designed core AI conversation flows used by 500K+ active users',
    tags: ['AI Experience', 'Product Design'],
    bg: '#E2E7F0',
    image: '/images/aimee-ai.png',
  },
  {
    to: '/work/smart-benefits',
    title: 'Smart Benefits Platform',
    impact: 'Reduced benefits confusion 40%, improving employee retention scores',
    tags: ['Enterprise UX', 'Systems Design'],
    bg: '#E2EDE8',
    image: null,
  },
];

/* ─── PAGE ──────────────────────────────────────────────── */
export default function Home() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <FeaturedWork />
        <AboutPreview />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ─── HERO ──────────────────────────────────────────────── */
function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  // Parallax: portrait moves slightly slower than scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -48]);

  return (
    <section
      ref={sectionRef}
      style={{ padding: 'clamp(88px, 10vw, 140px) 0 clamp(72px, 8vw, 112px)', overflow: 'hidden' }}
    >
      <div className="container">
        <div className="hero-grid">

          {/* ── LEFT: TEXT ─────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <FadeUp>
              <p className="eyebrow" style={{ marginBottom: 28 }}>
                Staff Product Designer &amp; Creative Director
              </p>
            </FadeUp>

            <FadeUp delay={0.06}>
              <h1 style={{
                fontSize: 'clamp(38px, 4.8vw, 62px)',
                fontWeight: 700,
                letterSpacing: '-0.035em',
                lineHeight: 1.07,
                marginBottom: 28,
              }}>
                Designing products that drive behavior,{' '}
                <span style={{ color: 'var(--ink-3)' }}>not just engagement</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.12}>
              <p style={{
                fontSize: 'clamp(16px, 1.3vw, 19px)',
                color: 'var(--ink-2)',
                maxWidth: 480,
                lineHeight: 1.7,
                marginBottom: 14,
              }}>
                I'm Bri May, a Senior Product Designer focused on turning
                complex systems into simple, high-impact experiences.
              </p>
              <p style={{
                fontSize: 14,
                color: 'var(--ink-3)',
                maxWidth: 460,
                lineHeight: 1.65,
              }}>
                10+ years designing products used by companies like Meta —
                driving engagement, clarity, and measurable business outcomes.
              </p>
            </FadeUp>

            <FadeUp delay={0.18}>
              <div style={{
                marginTop: 44,
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                flexWrap: 'wrap',
              }}>
                <Link to="/work" className="btn-primary">View Work</Link>
                <Link to="/about" className="btn-secondary">About Me →</Link>
              </div>
            </FadeUp>
          </div>

          {/* ── RIGHT: PORTRAIT ────────────────────────── */}
          <FadeUp delay={0.1} style={{ position: 'relative' }}>
            {/* Atmospheric glow */}
            <div aria-hidden="true" style={{
              position: 'absolute',
              inset: '-30% -20%',
              background: 'radial-gradient(ellipse at 55% 45%, rgba(120,100,200,0.10) 0%, rgba(80,140,220,0.07) 45%, transparent 70%)',
              filter: 'blur(48px)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />

            {/* Image wrapper with parallax */}
            <motion.div style={{ position: 'relative', zIndex: 1, y: imageY }}>
              <motion.div
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                  maxHeight: 580,
                  cursor: 'default',
                }}
                whileHover={reduce ? {} : { scale: 1.02 }}
                transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <img
                  src="/images/bri-hero-crop.jpg"
                  alt="Bri May — Senior Product Designer"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </motion.div>

              {/* Floating microcopy */}
              <div style={{
                position: 'absolute',
                bottom: -14,
                left: -10,
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid var(--border)',
                borderRadius: 100,
                padding: '9px 18px',
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--ink-2)',
                letterSpacing: '0.01em',
                boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                whiteSpace: 'nowrap',
              }}>
                This is where strategy meets taste.
              </div>
            </motion.div>
          </FadeUp>

        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(48px, 8vw, 96px);
          align-items: center;
        }
        @media (max-width: 800px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-grid > *:last-child {
            max-width: 440px;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── TRUST STRIP ────────────────────────────────────────── */
function TrustStrip() {
  return (
    <FadeUp>
      <div style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(16px, 4vw, 52px)',
            padding: '20px 0',
            flexWrap: 'wrap',
          }}>
            <span className="eyebrow" style={{ whiteSpace: 'nowrap' }}>
              Trusted by teams at
            </span>
            <div style={{
              display: 'flex',
              gap: 'clamp(16px, 3vw, 40px)',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
              {CLIENTS.map(c => (
                <span key={c} style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--ink-3)',
                  letterSpacing: '-0.01em',
                }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

/* ─── FEATURED WORK ──────────────────────────────────────── */
function FeaturedWork() {
  return (
    <section style={{ padding: 'clamp(72px, 9vw, 120px) 0' }}>
      <div className="container">

        {/* Header */}
        <FadeUp style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>Selected Work</p>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <h2 style={{
              fontSize: 'clamp(26px, 3vw, 38px)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
            }}>
              A few examples of products I've designed<br className="hide-mobile" /> that drove measurable impact.
            </h2>
            <Link to="/work" className="btn-secondary">
              View all work →
            </Link>
          </div>
        </FadeUp>

        {/* Cards grid */}
        <div className="work-grid">
          {WORK.map((card, i) => (
            <WorkCard key={card.to} card={card} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .work-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .work-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 580px) {
          .work-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

function WorkCard({ card, index }) {
  const reduce = useReducedMotion();

  return (
    <FadeUp delay={index * 0.08}>
      <Link to={card.to} className="wcard">
        {/* Image */}
        <div className="wcard-img" style={{ background: card.bg }}>
          {card.image && (
            <motion.img
              src={card.image}
              alt={card.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              whileHover={reduce ? {} : { scale: 1.04 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px 28px' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
            {card.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
          <h3 style={{
            fontSize: 'clamp(18px, 1.6vw, 22px)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            marginBottom: 8,
          }}>
            {card.title}
          </h3>
          {/* Impact — the key differentiator */}
          <p style={{
            fontSize: 14,
            color: 'var(--ink-2)',
            lineHeight: 1.55,
            marginBottom: 18,
          }}>
            {card.impact}
          </p>
          <span style={{
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--ink-3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            transition: 'color 0.2s',
          }} className="wcard-cta">
            View Case Study
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </Link>

      <style>{`
        .wcard {
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--surface);
          color: inherit;
          transition: box-shadow 0.4s cubic-bezier(0.25,0.46,0.45,0.94),
                      transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .wcard:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 56px rgba(0,0,0,0.09);
        }
        .wcard:hover .wcard-cta { color: var(--ink) !important; }
        .wcard-img {
          aspect-ratio: 4/3;
          overflow: hidden;
        }
      `}</style>
    </FadeUp>
  );
}

/* ─── ABOUT PREVIEW ──────────────────────────────────────── */
function AboutPreview() {
  return (
    <section style={{
      borderTop: '1px solid var(--border)',
      padding: 'clamp(72px, 9vw, 120px) 0',
    }}>
      <div className="container">
        <div className="about-preview-grid">

          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 16 }}>About</p>
            <h2 style={{
              fontSize: 'clamp(26px, 3vw, 38px)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
            }}>
              Senior, strategic,<br />and obsessed with craft.
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p style={{
              fontSize: 'clamp(16px, 1.2vw, 18px)',
              color: 'var(--ink-2)',
              lineHeight: 1.7,
              marginBottom: 16,
            }}>
              I'm a Senior Product Designer with a background in both product and brand,
              focused on designing experiences that simplify complexity and drive real user behavior.
            </p>
            <p style={{
              fontSize: 'clamp(16px, 1.2vw, 18px)',
              color: 'var(--ink-2)',
              lineHeight: 1.7,
              marginBottom: 36,
            }}>
              I've spent the last decade leading design across product, marketing, and
              AI-powered experiences — partnering closely with product and engineering
              to bring ideas to life.
            </p>
            <Link to="/about" className="btn-secondary">More about me →</Link>
          </FadeUp>

        </div>
      </div>

      <style>{`
        .about-preview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 8vw, 112px);
          align-items: start;
        }
        @media (max-width: 700px) {
          .about-preview-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

/* ─── CONTACT CTA ────────────────────────────────────────── */
function ContactCTA() {
  return (
    <section style={{
      borderTop: '1px solid var(--border)',
      padding: 'clamp(72px, 9vw, 120px) 0',
    }}>
      <div className="container">
        <FadeUp>
          <div style={{ maxWidth: 640 }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>Let's talk</p>
            <h2 style={{
              fontSize: 'clamp(30px, 3.5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              marginBottom: 18,
            }}>
              Let's build something impactful
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 1.2vw, 18px)',
              color: 'var(--ink-2)',
              lineHeight: 1.65,
              marginBottom: 40,
            }}>
              I'm currently exploring senior product design opportunities.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/contact" className="btn-primary">Contact Me</Link>
              <Link to="/resume"  className="btn-ghost">View Résumé</Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
