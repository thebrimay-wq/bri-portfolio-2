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
const CLIENTS = ['Meta', 'NFL', 'JPMorgan Chase', 'CVS Health', 'Nestlé', 'Federal Reserve', 'Patagonia', 'MLS', 'McKinsey & Associates', 'Sephora', 'LVMH', 'EPIC'];

const WORK = [
  {
    to: '/work/hub',
    title: 'Financial Wellness Hub',
    impact: 'Increased engagement 200% and supported $12M in revenue growth',
    tags: ['Platform Design', 'UX Strategy'],
    bg: '#EBE8F4',
    image: '/images/hub-thumbnail.png',
  },
  {
    to: '/work/aimee',
    title: 'Aimee AI Coach',
    impact: 'Designed core AI conversation flows used by 500K+ active users',
    tags: ['AI Experience', 'Product Design'],
    bg: '#E2E7F0',
    image: '/images/aimee-thumbnail.png',
  },
  {
    to: '/work/smart-benefits',
    title: 'Smart Benefits Platform',
    impact: 'Reduced benefits confusion 40%, improving employee retention scores',
    tags: ['Enterprise UX', 'Systems Design'],
    bg: '#E2EDE8',
    image: '/images/smart-benefits-thumbnail.png',
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -32]);

  return (
    <section
      ref={sectionRef}
      className="hero section section--lg"
      style={{ overflow: 'hidden', position: 'relative', zIndex: 1, paddingLeft: 0, paddingRight: 0 }}
    >
      <div className="hero__outer">

        {/* ── LEFT: TEXT ─────────────────────────────── */}
        <div className="hero__copy">
          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 28 }}>
              Senior Product Designer &amp; Creative Director
            </p>
          </FadeUp>

          <FadeUp delay={0.06}>
            <h1 style={{
              fontSize: 'clamp(30px, 4vw, 52px)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.08,
              maxWidth: 620,
              marginBottom: 28,
            }}>
              Designing products<br />
              that drive behavior,<br />
              <span style={{ color: 'var(--ink-3)', display: 'block' }}>not just engagement</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.12}>
            <p className="text-muted" style={{ maxWidth: 480, marginBottom: 14 }}>
              I'm Bri May, a Senior Product Designer focused on turning
              complex systems into simple, high-impact experiences.
            </p>
            <p className="text-muted" style={{ maxWidth: 460 }}>
              10 years in product design, designing since 2011 — working with
              companies like Meta to drive engagement, clarity, and measurable outcomes.
            </p>
          </FadeUp>

          <FadeUp delay={0.18}>
            <div className="button-row">
              <Link to="/work" className="btn-primary">View Work</Link>
              <Link to="/about" className="btn-secondary">About Me →</Link>
            </div>
          </FadeUp>
        </div>

        {/* ── RIGHT: PORTRAIT ────────────────────────── */}
        <div className="hero__media">
          <motion.img
            src="/images/bri-half-circle.png"
            alt="Bri May — Senior Product Designer"
            className="hero__portrait"
            style={{ y: imageY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
        </div>

      </div>

      <div className="hero__divider"></div>

      <style>{`
        .hero__outer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          /* full viewport width — no max-width, no centering */
          width: 100%;
        }
        .hero__copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          /* left inset matches site container; right gap gives breathing room before image */
          padding-left: var(--px);
          padding-right: clamp(32px, 4vw, 64px);
        }
        .hero__media {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          align-self: stretch;
          overflow: hidden;
        }
        /* override global .hero .hero__media transform that offsets the column */
        .hero .hero__media {
          transform: none !important;
        }
        .hero__portrait {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: right center;
          max-height: 720px;
        }
        .hero__divider {
          border-top: 1px solid var(--border);
          margin-top: clamp(48px, 5vw, 72px);
          margin-left: var(--px);
          margin-right: var(--px);
        }
        @media (max-width: 860px) {
          .hero__outer {
            grid-template-columns: 1fr;
            padding-right: var(--px);
          }
          .hero__copy {
            padding-right: 0;
          }
          .hero__media {
            justify-content: center;
            align-self: auto;
            margin-top: 40px;
          }
          .hero__portrait {
            width: 75%;
            height: auto;
            max-height: none;
            object-position: center center;
          }
        }
        @media (max-width: 560px) {
          .hero__portrait { width: 100%; }
        }
      `}</style>
    </section>
  );
}

/* ─── TRUST STRIP ────────────────────────────────────────── */
function TrustStrip() {
  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      paddingBlock: 'clamp(14px, 2vw, 22px)',
      overflow: 'hidden',
    }}>
      <div className="marquee-track">
        {[...CLIENTS, ...CLIENTS].map((c, i) => (
          <span key={i} className="marquee-item">
            {c}
          </span>
        ))}
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .marquee-item {
          flex-shrink: 0;
          font-size: 14px;
          font-weight: 500;
          color: var(--ink-3);
          letter-spacing: -0.01em;
          padding: 0 clamp(28px, 4vw, 56px);
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
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
          align-items: stretch;
        }
        .work-grid > div { height: 100%; }
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
        <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'nowrap', marginBottom: 12, overflow: 'hidden' }}>
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
            marginTop: 'auto',
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
          height: 100%;
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
              marginBottom: 24,
            }}>
              I've spent the last decade leading design across product, marketing, and
              AI-powered experiences — partnering closely with product and engineering
              to bring ideas to life.
            </p>
            <p style={{
              fontSize: 'clamp(16px, 1.2vw, 18px)',
              color: 'var(--ink-2)',
              lineHeight: 1.7,
              marginBottom: 36,
            }}>
              I move fast from idea to reality. I use AI-assisted tools to prototype real,
              interactive product experiences — not just static screens. This allows me to
              test ideas earlier, align teams faster, and ship better solutions. Design isn't
              just how it looks — it's how quickly we can learn and improve.
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
