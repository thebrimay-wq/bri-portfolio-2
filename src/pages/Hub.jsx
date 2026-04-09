import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import FadeUp from '../components/FadeUp.jsx';

/* ─── IMAGE PATHS ────────────────────────────────────────── */
const IMG = {
  hero:      '/images/Financial Finesse Case Study/Hero.png',
  aimee:     '/images/Financial Finesse Case Study/Aimee.png',
  onboard:   '/images/Financial Finesse Case Study/Onboarding.png',
  results:   '/images/Financial Finesse Case Study/Onboarding results.png',
  actions:   '/images/Financial Finesse Case Study/AI Actions.png',
  content:   '/images/Financial Finesse Case Study/Personalized Content.png',
  mobile:    '/images/Financial Finesse Case Study/Mobile transition.png',
};

/* ─── SHARED LAYOUT WRAPPER ──────────────────────────────── */
function CsWrap({ children, style }) {
  return (
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      paddingLeft: 'clamp(32px, 8vw, 120px)',
      paddingRight: 'clamp(32px, 8vw, 120px)',
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function Hub() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />
      <main>
        <HeroSection />
        <ProblemSection />
        <OpportunitySection />
        <SolutionSection />
        <AimeeSection />
        <OnboardingSection />
        <ResultsSection />
        <AIActionsSection />
        <ContentSection />
        <MobileSection />
        <ImpactSection />
        <WhatNextSection />
        <Takeaway />
      </main>
      <Footer />
    </div>
  );
}

/* ─── 1. HERO ────────────────────────────────────────────── */
function HeroSection() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);

  return (
    <section ref={ref} style={{ paddingTop: 'clamp(80px, 10vw, 130px)', paddingBottom: 0, overflow: 'hidden' }}>
      <CsWrap>

        <FadeUp>
          <p className="eyebrow" style={{ marginBottom: 24 }}>
            Creative Director &amp; Lead Product Designer · Financial Finesse
          </p>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h1 style={{
            fontSize: 'clamp(30px, 4vw, 58px)',
            fontWeight: 700,
            letterSpacing: '-0.038em',
            lineHeight: 1.06,
            maxWidth: 820,
            marginBottom: 28,
          }}>
            Designing a financial wellness experience that drives behavior —{' '}
            <span style={{ color: 'var(--ink-3)' }}>not just engagement</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p style={{
            fontSize: 'clamp(16px, 1.3vw, 19px)',
            color: 'var(--ink-2)',
            lineHeight: 1.72,
            maxWidth: 560,
            marginBottom: 52,
          }}>
            Redesigning the Financial Finesse Hub to deliver personalized,
            actionable experiences at scale — increasing engagement 200% and
            winning enterprise clients including Meta, the Federal Reserve, and the NFLPA.
          </p>
        </FadeUp>

        <FadeUp delay={0.14}>
          <div style={{ display: 'flex', gap: 52, flexWrap: 'wrap', marginBottom: 'clamp(52px, 7vw, 96px)' }}>
            {[
              ['+200%', 'Engagement'],
              ['$12M', 'Revenue growth'],
              ['Fortune 500', 'Clients won'],
            ].map(([val, label]) => (
              <div key={val}>
                <div style={{
                  fontSize: 'clamp(22px, 2.5vw, 34px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: 7,
                }}>{val}</div>
                <div style={{
                  fontSize: 11,
                  color: 'var(--ink-3)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>{label}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Hero image with parallax */}
        <FadeUp delay={0.18}>
          <motion.div style={{ y: imageY }}>
            <img
              src={IMG.hero}
              alt="Financial Finesse Hub redesigned interface"
              className="cs-image image-primary"
            />
          </motion.div>
        </FadeUp>

      </CsWrap>
    </section>
  );
}

/* ─── 2. THE PROBLEM ─────────────────────────────────────── */
function ProblemSection() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0' }}>
      <CsWrap>
        <div style={{ maxWidth: 720 }}>
          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 28 }}>The Problem</p>
            <h2 style={{
              fontSize: 'clamp(26px, 3vw, 40px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.14,
              marginBottom: 32,
            }}>
              A content library that put the burden on the user
            </h2>
            <p style={{
              fontSize: 'clamp(17px, 1.4vw, 20px)',
              color: 'var(--ink-2)',
              lineHeight: 1.78,
              marginBottom: 24,
            }}>
              The Financial Finesse Hub was a static resource library — content-heavy,
              generic, and difficult to navigate. Users had no clear starting point,
              no personalization, and no guidance on what to do next. The product was
              built around content, not around people.
            </p>
            <p style={{
              fontSize: 'clamp(17px, 1.4vw, 20px)',
              color: 'var(--ink-2)',
              lineHeight: 1.78,
              marginBottom: 36,
            }}>
              In a domain where engagement means real behavior change, a passive
              experience wasn't enough. The opportunity was to rethink the product
              from the ground up — making it adaptive, intelligent, and deeply personal.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <SkipLink href="#hub-solution" label="Jump to solution →" />
          </FadeUp>
        </div>
      </CsWrap>
    </section>
  );
}

/* ─── 3. THE OPPORTUNITY ─────────────────────────────────── */
function OpportunitySection() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0', background: 'var(--surface)' }}>
      <CsWrap>

        <FadeUp>
          <p className="eyebrow" style={{ marginBottom: 48 }}>The Opportunity</p>
        </FadeUp>

        <FadeUp delay={0.06}>
          <p style={{
            fontSize: 'clamp(32px, 5vw, 72px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.06,
            maxWidth: 900,
            marginBottom: 32,
          }}>
            What if financial wellness felt less like a dashboard — and more like a partner?
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p style={{
            fontSize: 'clamp(17px, 1.4vw, 20px)',
            color: 'var(--ink-2)',
            lineHeight: 1.72,
            maxWidth: 620,
            marginBottom: 'clamp(52px, 7vw, 96px)',
          }}>
            What if the product could adapt to users in real time — guiding action
            instead of just surfacing content?
          </p>
        </FadeUp>

        <FadeUp delay={0.14}>
          <div style={{ maxWidth: 640 }}>
            {[
              ['Static content library', 'Adaptive, guided system'],
              ['Generic welcome screens', 'Personalized starting points'],
              ['Passive browsing', 'Action-oriented momentum'],
              ['One-size-fits-all', 'Context-aware coaching'],
            ].map(([from, to]) => (
              <div key={from} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: 'clamp(20px, 2.5vw, 32px) 0',
                borderTop: '1px solid var(--border)',
              }}>
                <span style={{
                  fontSize: 'clamp(15px, 1.2vw, 17px)',
                  color: 'var(--ink-3)',
                  textDecoration: 'line-through',
                  flex: 1,
                }}>{from}</span>
                <span style={{
                  fontSize: 12,
                  color: 'var(--ink-3)',
                  letterSpacing: '0.05em',
                  flexShrink: 0,
                }}>→</span>
                <span style={{
                  fontSize: 'clamp(15px, 1.2vw, 17px)',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  flex: 1,
                }}>{to}</span>
              </div>
            ))}
          </div>
        </FadeUp>

      </CsWrap>
    </section>
  );
}

/* ─── SHARED: SKIP LINK ──────────────────────────────────── */
function SkipLink({ href = '#solution', label = 'Skip to solution' }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 14,
        fontWeight: 500,
        color: 'var(--ink-2)',
        borderBottom: '1.5px solid var(--border)',
        paddingBottom: 2,
        transition: 'color 0.15s ease, border-color 0.15s ease',
        textDecoration: 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--ink)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-2)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
    >
      {label}
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

/* ─── 4. THE SOLUTION ────────────────────────────────────── */
function SolutionSection() {
  const bullets = [
    "AI-guided onboarding that surfaces each user's priorities in under two minutes",
    'A personalized action plan — not a generic dashboard — as the default starting point',
    'Contextual content recommendations that adapt with each visit',
    'A persistent AI coach (Aimee) available at every step of the financial journey',
  ];

  return (
    <section id="hub-solution" style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0' }}>
      <CsWrap>
        <div style={{ maxWidth: 720 }}>

          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 28 }}>The Solution</p>
            <h2 style={{
              fontSize: 'clamp(26px, 3vw, 40px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.14,
              marginBottom: 32,
            }}>
              From static resource library to guided financial system
            </h2>
            <p style={{
              fontSize: 'clamp(17px, 1.4vw, 20px)',
              color: 'var(--ink-2)',
              lineHeight: 1.78,
              marginBottom: 40,
            }}>
              We shifted the experience from static content to a dynamic, guided system
              — centered around personalization, action, and momentum. Instead of asking
              users to navigate complexity, the product now adapts to them:
            </p>
          </FadeUp>

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 48 }}>
            {bullets.map((text, i) => (
              <FadeUp key={i} delay={0.06 + i * 0.07}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr',
                  gap: 'clamp(16px, 2.5vw, 32px)',
                  padding: 'clamp(20px, 2.5vw, 28px) 0',
                  borderTop: '1px solid var(--border)',
                  alignItems: 'start',
                }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    color: 'var(--ink-3)',
                    paddingTop: 4,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{
                    fontSize: 'clamp(16px, 1.2vw, 18px)',
                    color: 'var(--ink-2)',
                    lineHeight: 1.72,
                    margin: 0,
                  }}>
                    {text}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.36}>
            <p style={{
              fontSize: 'clamp(17px, 1.4vw, 20px)',
              color: 'var(--ink)',
              lineHeight: 1.65,
              fontWeight: 500,
              fontStyle: 'italic',
              borderLeft: '2px solid var(--border)',
              paddingLeft: 24,
              margin: 0,
            }}>
              The result is an experience that feels less like a dashboard, and more
              like a partner.
            </p>
          </FadeUp>

        </div>
      </CsWrap>
    </section>
  );
}

/* ─── 5. EXPERIENCE · 01 — AIMEE AI ─────────────────────── */
function AimeeSection() {
  return (
    <section className="cs-section">
      <CsWrap>

        <FadeUp style={{ maxWidth: 640, marginBottom: 'clamp(44px, 6vw, 72px)' }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Experience · 01</p>
          <h2 className="cs-h2">
            An intelligent coach — not just a chatbot
          </h2>
          <p className="cs-body" style={{ marginTop: 20 }}>
            Aimee brings real-time, personalized financial guidance directly into
            the product — asking the right questions and surfacing the right answers
            based on each user's actual situation.
          </p>
        </FadeUp>

        {/* Two-layer dimensional composition */}
        <FadeUp delay={0.1}>
          <div style={{ position: 'relative' }}>
            {/* Background: blurred, offset duplicate for depth */}
            <img
              src={IMG.aimee}
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 24,
                left: 32,
                width: '100%',
                filter: 'blur(32px)',
                opacity: 0.2,
                borderRadius: 24,
                transform: 'scale(0.97)',
                pointerEvents: 'none',
              }}
            />
            {/* Foreground: main image */}
            <img
              src={IMG.aimee}
              alt="Aimee AI coaching interface"
              className="cs-image image-primary"
              style={{ position: 'relative', zIndex: 1 }}
            />
          </div>
        </FadeUp>

      </CsWrap>
    </section>
  );
}

/* ─── 6. EXPERIENCE · 02 — ONBOARDING ───────────────────── */
function OnboardingSection() {
  return (
    <section className="cs-section">
      <CsWrap>

        <FadeUp style={{ maxWidth: 580, marginBottom: 'clamp(44px, 6vw, 72px)' }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Experience · 02</p>
          <h2 className="cs-h2">
            Personalizing from the very first moment
          </h2>
          <p className="cs-body" style={{ marginTop: 20 }}>
            A smart onboarding flow identifies each user's financial situation in
            under two minutes — replacing a generic welcome screen with a personalized
            starting point that feels immediately relevant.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <img
            src={IMG.onboard}
            alt="Financial Finesse onboarding experience"
            className="cs-image image-secondary"
          />
        </FadeUp>

      </CsWrap>
    </section>
  );
}

/* ─── 7. EXPERIENCE · 03 — PERSONALIZED RESULTS ─────────── */
function ResultsSection() {
  return (
    <section className="cs-section">
      <CsWrap>

        <FadeUp style={{ maxWidth: 580, marginBottom: 'clamp(44px, 6vw, 72px)' }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Experience · 03</p>
          <h2 className="cs-h2">
            From zero context to fully personalized guidance
          </h2>
          <p className="cs-body" style={{ marginTop: 20 }}>
            The onboarding flow feeds directly into a personalized dashboard — surfacing
            prioritized actions, curated content, and relevant tools based on what
            each user told us about themselves.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <img
            src={IMG.results}
            alt="Personalized onboarding results and dashboard"
            className="cs-image image-secondary"
          />
        </FadeUp>

      </CsWrap>
    </section>
  );
}

/* ─── 8. EXPERIENCE · 04 — AI ACTIONS ───────────────────── */
function AIActionsSection() {
  return (
    <section className="cs-section">
      <CsWrap>

        <div className="hub-two-col" style={{ alignItems: 'center', gap: 'clamp(48px, 7vw, 96px)' }}>

          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 20 }}>Experience · 04</p>
            <h2 className="cs-h2">
              Guidance that moves users forward
            </h2>
            <p className="cs-body" style={{ marginTop: 20 }}>
              Aimee doesn't just answer questions — she connects users to concrete next
              steps. Every interaction is designed to end in action, not just
              conversation.
            </p>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'Prioritized action plans based on user context',
                'Smart prompts that anticipate the next question',
                'Direct links to tools, resources, and coaching',
              ].map(point => (
                <div key={point} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: 'var(--ink-3)',
                    flexShrink: 0,
                    marginTop: 9,
                  }} />
                  <span style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', color: 'var(--ink-2)', lineHeight: 1.6 }}>{point}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <img
              src={IMG.actions}
              alt="AI-powered action recommendations"
              className="cs-image image-primary"
            />
          </FadeUp>

        </div>
      </CsWrap>
    </section>
  );
}

/* ─── 9. EXPERIENCE · 05 — PERSONALIZED CONTENT ─────────── */
function ContentSection() {
  return (
    <section className="cs-section">
      <CsWrap>

        <FadeUp style={{ maxWidth: 580, marginBottom: 'clamp(44px, 6vw, 72px)' }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Experience · 05</p>
          <h2 className="cs-h2">
            A Netflix-style content experience
          </h2>
          <p className="cs-body" style={{ marginTop: 20 }}>
            A recommendation engine surfaces content based on behavior, financial profile,
            and engagement signals — so every return visit feels more relevant than the
            last.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <img
            src={IMG.content}
            alt="Personalized content discovery and recommendation system"
            className="cs-image image-secondary cs-image--zoom"
          />
        </FadeUp>

      </CsWrap>
    </section>
  );
}

/* ─── 10. EXPERIENCE · 06 — MOBILE ──────────────────────── */
function MobileSection() {
  return (
    <section className="cs-section" style={{ textAlign: 'center' }}>
      <CsWrap>

        <FadeUp style={{ marginBottom: 'clamp(44px, 6vw, 72px)' }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Experience · 06</p>
          <h2 className="cs-h2" style={{ maxWidth: 560, margin: '0 auto' }}>
            Designed for real life, not just desktop
          </h2>
          <p className="cs-body" style={{ marginTop: 20, maxWidth: 480, margin: '20px auto 0' }}>
            Financial wellness happens on the go. The mobile experience was designed
            with the same depth as desktop — optimized for quick access, clear
            hierarchy, and one-thumb navigation.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <img
            src={IMG.mobile}
            alt="Financial Finesse mobile experience"
            className="cs-image image-mobile cs-image--float"
            style={{ maxWidth: 520, margin: '0 auto', display: 'block' }}
          />
        </FadeUp>

      </CsWrap>
    </section>
  );
}

/* ─── 11. IMPACT ─────────────────────────────────────────── */
function ImpactSection() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0', textAlign: 'center' }}>
      <CsWrap>

        <FadeUp>
          <p className="eyebrow" style={{ marginBottom: 28 }}>Impact</p>
          <h2 style={{
            fontSize: 'clamp(26px, 3.5vw, 46px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            maxWidth: 560,
            margin: '0 auto clamp(52px, 6vw, 80px)',
          }}>
            A redesign that moved the business
          </h2>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'var(--border)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            textAlign: 'left',
            marginBottom: 'clamp(48px, 6vw, 72px)',
          }}>
            {[
              ['+200%', 'Increase in platform engagement after launch'],
              ['$12M', 'Revenue contribution from enterprise clients'],
              ['Fortune 500', 'Trusted by Meta, NFL, JPMorgan, Federal Reserve'],
            ].map(([val, label]) => (
              <div key={val} style={{ background: 'var(--bg)', padding: 'clamp(28px, 3.5vw, 48px) clamp(20px, 2.5vw, 36px)' }}>
                <div style={{
                  fontSize: 'clamp(28px, 3.5vw, 52px)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: 12,
                }}>{val}</div>
                <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6 }}>{label}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
            {['Meta', 'NFL', 'JPMorgan Chase', 'CVS Health', 'Federal Reserve', 'Patagonia', 'McKinsey', 'Nestlé', 'Comcast', 'General Mills'].map(c => (
              <span key={c} style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--ink-2)',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 100,
                padding: '6px 16px',
              }}>{c}</span>
            ))}
          </div>
        </FadeUp>

      </CsWrap>
    </section>
  );
}

/* ─── 12. WHAT I'D DO NEXT ───────────────────────────────── */
function WhatNextSection() {
  const items = [
    {
      n: '01',
      title: 'Deeper behavioral intelligence',
      body: 'Move beyond initial onboarding inputs and adapt continuously based on user behavior — what users actually do, not just what they say about themselves.',
    },
    {
      n: '02',
      title: 'Proactive AI, not reactive',
      body: 'Shift Aimee from answering questions to anticipating needs — surfacing actions, reminders, and insights before the user asks.',
    },
    {
      n: '03',
      title: 'Progress as a core motivator',
      body: "Make momentum more visible and rewarding through clearer progress systems, milestones, and habit loops — so behavior change feels achievable, not abstract.",
    },
    {
      n: '04',
      title: 'Cross-platform continuity',
      body: 'Ensure a seamless experience across mobile, desktop, and real-life moments — meeting users where financial decisions actually happen.',
    },
  ];

  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0' }}>
      <CsWrap>

        <FadeUp style={{ maxWidth: 640, marginBottom: 'clamp(52px, 7vw, 80px)' }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>What I'd do next</p>
          <h2 style={{
            fontSize: 'clamp(26px, 3vw, 40px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.14,
          }}>
            This work established a strong foundation. Here's where it goes further.
          </h2>
        </FadeUp>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((item, i) => (
            <FadeUp key={item.n} delay={i * 0.08}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '56px 1fr',
                gap: 'clamp(20px, 3vw, 40px)',
                paddingTop: 'clamp(28px, 3.5vw, 44px)',
                paddingBottom: 'clamp(28px, 3.5vw, 44px)',
                borderTop: '1px solid var(--border)',
                alignItems: 'start',
              }}>
                <span className="eyebrow" style={{ paddingTop: 4, color: 'var(--ink-3)' }}>
                  {item.n}
                </span>
                <div>
                  <h3 style={{
                    fontSize: 'clamp(17px, 1.5vw, 20px)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3,
                    marginBottom: 14,
                  }}>{item.title}</h3>
                  <p style={{
                    fontSize: 'clamp(15px, 1.1vw, 17px)',
                    color: 'var(--ink-2)',
                    lineHeight: 1.75,
                    maxWidth: 680,
                    margin: 0,
                  }}>{item.body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

      </CsWrap>
    </section>
  );
}

/* ─── 13. FINAL TAKEAWAY ─────────────────────────────────── */
function Takeaway() {
  return (
    <>
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(88px, 12vw, 160px) 0',
        background: 'var(--surface)',
      }}>
        <CsWrap>
          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 36 }}>Final Takeaway</p>
            <p style={{
              fontSize: 'clamp(24px, 3.5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.12,
              maxWidth: 820,
              marginBottom: 0,
            }}>
              The Financial Finesse Hub transformed financial wellness from a static
              content experience into a personalized, action-oriented system — helping
              users move from intention to meaningful progress.
            </p>
          </FadeUp>
        </CsWrap>
      </section>

      {/* Bottom nav */}
      <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(40px, 5vw, 64px) 0' }}>
        <CsWrap>
          <FadeUp>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/work" className="btn-secondary">← Back to Work</Link>
              <Link to="/work/aimee" className="btn-secondary">Next: Aimee AI →</Link>
              <Link to="/contact" className="btn-secondary">Contact ↗</Link>
            </div>
          </FadeUp>
        </CsWrap>
      </section>
    </>
  );
}
