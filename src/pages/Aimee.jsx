import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import FadeUp from '../components/FadeUp.jsx';

/* ─── PAGE ──────────────────────────────────────────────── */
export default function Aimee() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />
      <main>
        <HeroSection />
        <ProblemSection />
        <OpportunitySection />
        <ConstraintsSection />
        <AimeeSolutionSection />
        <MomentA />
        <MomentB />
        <MomentC />
        <DesignDecisions />
        <SystemSection />
        <ImpactSection />
        <WhatNext />
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
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -48]);

  return (
    <section ref={ref} style={{ padding: 'clamp(80px, 10vw, 130px) 0 0', overflow: 'hidden' }}>
      <div className="container">

        <FadeUp>
          <p className="eyebrow" style={{ marginBottom: 28 }}>Case Study · AI Product Design</p>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h1 style={{
            fontSize: 'clamp(32px, 4.5vw, 62px)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            maxWidth: 860,
            marginBottom: 32,
          }}>
            Designing a safe AI coach that guides action —{' '}
            <span style={{ color: 'var(--ink-3)' }}>not just conversation</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p style={{
            fontSize: 'clamp(17px, 1.4vw, 20px)',
            color: 'var(--ink-2)',
            lineHeight: 1.72,
            maxWidth: 620,
            marginBottom: 52,
          }}>
            Aimee transformed a static financial wellness experience into an intelligent,
            behavior-driven system — designed to guide users toward meaningful next steps,
            not just generate conversation.
          </p>
        </FadeUp>

        <FadeUp delay={0.14}>
          <div style={{ display: 'flex', gap: 52, flexWrap: 'wrap', marginBottom: 'clamp(52px, 7vw, 88px)' }}>
            {[
              ['500K+', 'Active users'],
              ['AI-driven', 'Personalization'],
              ['High-trust', 'Financial domain'],
            ].map(([val, label]) => (
              <div key={val}>
                <div style={{
                  fontSize: 'clamp(20px, 2.2vw, 30px)',
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

        <FadeUp delay={0.18}>
          <motion.div style={{ y: imageY }}>
            <div style={{
              width: '100%',
              aspectRatio: '16/7',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px 16px 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Image placeholder</p>
            </div>
          </motion.div>
        </FadeUp>

      </div>
    </section>
  );
}

/* ─── SHARED: SKIP LINK ──────────────────────────────────── */
function AimeeSkipLink() {
  return (
    <a
      href="#aimee-solution"
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
      Jump to solution →
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

/* ─── 2. THE PROBLEM ─────────────────────────────────────── */
function ProblemSection() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0' }}>
      <div className="container">
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
              Static flows couldn't deliver the kind of guidance users actually needed
            </h2>
            <p style={{
              fontSize: 'clamp(17px, 1.4vw, 20px)',
              color: 'var(--ink-2)',
              lineHeight: 1.78,
              marginBottom: 24,
            }}>
              Users were moving through fixed, generic content paths with no sense that
              the product understood them. There was no real-time guidance, no
              personalization, and no clear direction on what to do next.
            </p>
            <p style={{
              fontSize: 'clamp(17px, 1.4vw, 20px)',
              color: 'var(--ink-2)',
              lineHeight: 1.78,
              marginBottom: 36,
            }}>
              In a domain where people carry real financial anxiety, the experience felt
              transactional — when it needed to feel like a trusted advisor. The
              opportunity wasn't to add a chatbot. It was to rethink guidance entirely.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <AimeeSkipLink />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. THE OPPORTUNITY ─────────────────────────────────── */
function OpportunitySection() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0', background: 'var(--surface)' }}>
      <div className="container">

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
            marginBottom: 'clamp(52px, 7vw, 96px)',
          }}>
            What if the product could respond like a coach instead of a tool?
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="aimee-shift-grid">
            {[
              ['Static content', 'Adaptive guidance'],
              ['Passive browsing', 'Behavior-driven action'],
              ['Generic flows', 'Personalized support'],
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

      </div>

      <style>{`
        .aimee-shift-grid { max-width: 640px; }
      `}</style>
    </section>
  );
}

/* ─── 4. CONSTRAINTS ─────────────────────────────────────── */
function ConstraintsSection() {
  const items = [
    {
      n: '01',
      title: 'Safety first',
      body: 'Aimee had to stay grounded in trusted internal knowledge. Hallucinations or off-script responses in a financial context would erode user trust immediately.',
    },
    {
      n: '02',
      title: 'High-trust domain',
      body: 'Financial guidance requires clarity and predictability. Every interaction had to feel authoritative but approachable — never vague or unpredictable.',
    },
    {
      n: '03',
      title: 'Broad user range',
      body: 'The experience had to work across a wide spectrum of ages, incomes, and financial literacy levels — without assuming prior knowledge or overwhelming users.',
    },
    {
      n: '04',
      title: 'Useful, not gimmicky',
      body: "The AI had to move users toward meaningful action — not just generate conversation. Engagement for its own sake wasn't the goal. Behavior change was.",
    },
  ];

  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0' }}>
      <div className="container">
        <FadeUp style={{ marginBottom: 'clamp(48px, 6vw, 72px)' }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Constraints</p>
          <h2 style={{
            fontSize: 'clamp(26px, 3vw, 40px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.14,
            maxWidth: 600,
          }}>
            Real product complexity requires real design decisions
          </h2>
        </FadeUp>

        <div className="aimee-constraints-grid">
          {items.map((item, i) => (
            <FadeUp key={item.n} delay={i * 0.07}>
              <div style={{
                padding: 'clamp(28px, 3vw, 40px)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                height: '100%',
              }}>
                <p className="eyebrow" style={{ marginBottom: 16, color: 'var(--ink-3)' }}>{item.n}</p>
                <h3 style={{
                  fontSize: 'clamp(17px, 1.5vw, 20px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  marginBottom: 14,
                  lineHeight: 1.3,
                }}>{item.title}</h3>
                <p style={{
                  fontSize: 'clamp(14px, 1.1vw, 16px)',
                  color: 'var(--ink-2)',
                  lineHeight: 1.72,
                }}>{item.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      <style>{`
        .aimee-constraints-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 680px) {
          .aimee-constraints-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

/* ─── 4B. THE SOLUTION ───────────────────────────────────── */
function AimeeSolutionSection() {
  const bullets = [
    'Deliver value within the first 30 seconds of interaction',
    'Guide users toward clear next steps — not open-ended conversation',
    'Connect answers to action plans, content, and coaching',
    'Build trust through structure, boundaries, and clarity',
  ];
  return (
    <section id="aimee-solution" style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0' }}>
      <div className="container">
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
              Guidance embedded in the product — not bolted on as a feature
            </h2>
            <p style={{
              fontSize: 'clamp(17px, 1.4vw, 20px)',
              color: 'var(--ink-2)',
              lineHeight: 1.78,
              marginBottom: 40,
            }}>
              We reframed AI as guidance, not chat — embedding Aimee into the product
              as a trusted, action-oriented layer. Instead of offering open-ended
              conversation, the experience was designed to:
            </p>
          </FadeUp>

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 48 }}>
            {bullets.map((text, i) => (
              <FadeUp key={i} delay={0.06 + i * 0.07}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr',
                  gap: 'clamp(16px, 2.5vw, 32px)',
                  padding: 'clamp(18px, 2.5vw, 24px) 0',
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
              The result is an AI experience that feels useful, safe, and
              behavior-driven — not generic or performative.
            </p>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}

/* ─── 5A. FIRST 30 SECONDS ───────────────────────────────── */
function MomentA() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0' }}>
      <div className="container">

        <FadeUp>
          <div style={{ maxWidth: 640, marginBottom: 'clamp(44px, 6vw, 72px)' }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>Experience · 01</p>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 20,
            }}>
              Deliver value before attention drops
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 1.2vw, 18px)',
              color: 'var(--ink-2)',
              lineHeight: 1.75,
            }}>
              Aimee was designed to acknowledge what the user wants within the first
              interaction — reflecting it back clearly and moving them toward relevant
              next steps before attention drifts. The first 30 seconds set the entire
              tone of trust.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <p style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Image placeholder</p>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}

/* ─── 5B. GUIDANCE NOT CHAT ──────────────────────────────── */
function MomentB() {
  return (
    <section style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)',
      padding: 'clamp(80px, 10vw, 128px) 0',
    }}>
      <div className="container">
        <div className="hub-two-col">

          <FadeUp delay={0.08}>
            <div style={{
              width: '100%',
              aspectRatio: '4/3',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Image placeholder</p>
            </div>
          </FadeUp>

          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 20 }}>Experience · 02</p>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 24,
            }}>
              Designed to move people forward
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 1.2vw, 18px)',
              color: 'var(--ink-2)',
              lineHeight: 1.75,
            }}>
              Aimee wasn't designed as an open-ended chatbot. Every interaction was
              intentionally structured toward action. Responses were clear, bounded,
              and always connected to the next step — not the next message.
            </p>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}

/* ─── 5C. PERSONALIZED MOMENTUM ─────────────────────────── */
function MomentC() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0' }}>
      <div className="container">

        <FadeUp>
          <div style={{ maxWidth: 640, marginBottom: 'clamp(44px, 6vw, 72px)' }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>Experience · 03</p>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 20,
            }}>
              From conversation to action
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 1.2vw, 18px)',
              color: 'var(--ink-2)',
              lineHeight: 1.75,
            }}>
              Aimee's output connected directly to the product system — surfacing
              relevant content, action plans, and coaching in a way that felt tailored
              to the user's specific situation. Guidance didn't end with the conversation.
              It continued through the entire product experience.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <p style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Image placeholder</p>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}

/* ─── 6. DESIGN DECISIONS ────────────────────────────────── */
function DesignDecisions() {
  const decisions = [
    {
      n: '01',
      title: 'Guided interaction over open-ended AI',
      body: 'Rather than allowing freeform conversation, Aimee was structured around discrete guidance moments. This reduced hallucination risk, improved response quality, and kept users moving toward outcomes — not rabbit holes.',
    },
    {
      n: '02',
      title: 'Speed to value in the first 30 seconds',
      body: 'Financial anxiety is real. Users needed to feel heard immediately. The earliest interaction was designed to reflect the user\'s situation back to them and deliver a useful, concrete starting point within seconds — not after a long onboarding.',
    },
    {
      n: '03',
      title: 'Clear boundaries to build trust',
      body: 'Aimee was explicit about what she could and couldn\'t do. Designing in constraint — acknowledging limits rather than papering over them — actually increased user trust. Predictability is a feature in high-stakes domains.',
    },
    {
      n: '04',
      title: 'AI embedded in the system, not isolated as a feature',
      body: 'Aimee wasn\'t a modal or a sidebar. It was woven into the product flow — onboarding, dashboards, content, action plans. The design treated AI as a behavior layer across the experience, not a standalone capability.',
    },
  ];

  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0' }}>
      <div className="container">

        <FadeUp style={{ marginBottom: 'clamp(48px, 6vw, 72px)' }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Key Design Decisions</p>
          <h2 style={{
            fontSize: 'clamp(26px, 3vw, 40px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.14,
            maxWidth: 560,
          }}>
            The choices that shaped the product
          </h2>
        </FadeUp>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {decisions.map((d, i) => (
            <FadeUp key={d.n} delay={i * 0.06}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '56px 1fr',
                gap: 'clamp(20px, 3vw, 40px)',
                padding: 'clamp(28px, 3.5vw, 44px) 0',
                borderTop: '1px solid var(--border)',
                alignItems: 'start',
              }}>
                <span className="eyebrow" style={{ paddingTop: 4, color: 'var(--ink-3)' }}>{d.n}</span>
                <div>
                  <h3 style={{
                    fontSize: 'clamp(17px, 1.5vw, 20px)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3,
                    marginBottom: 14,
                  }}>{d.title}</h3>
                  <p style={{
                    fontSize: 'clamp(15px, 1.1vw, 17px)',
                    color: 'var(--ink-2)',
                    lineHeight: 1.75,
                    maxWidth: 680,
                  }}>{d.body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── 7. SYSTEM THINKING ─────────────────────────────────── */
function SystemSection() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0', background: 'var(--surface)' }}>
      <div className="container">

        <FadeUp style={{ marginBottom: 'clamp(48px, 6vw, 72px)' }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>System Thinking</p>
          <h2 style={{
            fontSize: 'clamp(26px, 3.5vw, 44px)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 1.1,
            maxWidth: 760,
          }}>
            Aimee wasn't designed as a chatbot. It was designed as a behavior layer
            across the product.
          </h2>
        </FadeUp>

        <div className="hub-two-col" style={{ alignItems: 'start' }}>

          <FadeUp>
            <p style={{
              fontSize: 'clamp(16px, 1.2vw, 18px)',
              color: 'var(--ink-2)',
              lineHeight: 1.78,
              marginBottom: 36,
            }}>
              Every touchpoint in the product was considered as a potential entry point for
              Aimee. The design wasn't about when to show the AI — it was about how AI
              could make every part of the experience smarter.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                ['Onboarding', 'Captures user context to personalize from the start'],
                ['Dashboard', 'Surfaces AI-prioritized next actions'],
                ['Content', 'Recommends based on goals and behavior signals'],
                ['Action Plans', 'Turns guidance into concrete, trackable steps'],
                ['Coaching', 'Connects users to human advisors when AI isn\'t enough'],
              ].map(([node, desc]) => (
                <div key={node} style={{
                  display: 'flex',
                  gap: 20,
                  padding: '18px 0',
                  borderTop: '1px solid var(--border)',
                  alignItems: 'flex-start',
                }}>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--ink)',
                    minWidth: 110,
                    letterSpacing: '-0.01em',
                    paddingTop: 1,
                  }}>{node}</span>
                  <span style={{
                    fontSize: 14,
                    color: 'var(--ink-2)',
                    lineHeight: 1.6,
                  }}>{desc}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{
              width: '100%',
              aspectRatio: '4/3',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Image placeholder</p>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}

/* ─── 8. IMPACT ──────────────────────────────────────────── */
function ImpactSection() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(88px, 12vw, 160px) 0', textAlign: 'center' }}>
      <div className="container">

        <FadeUp>
          <p className="eyebrow" style={{ marginBottom: 28 }}>Impact</p>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            maxWidth: 640,
            margin: '0 auto clamp(56px, 7vw, 88px)',
          }}>
            A product shift that users could feel
          </h2>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1px',
            background: 'var(--border)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            textAlign: 'left',
          }}>
            {[
              ['500K+', 'Active users on the AI coaching experience'],
              ['Adaptive', 'Replaced static flows with intelligent, personalized guidance'],
              ['Differentiated', 'Moved the product from dated to category-defining'],
              ['Faster', 'Users reached relevant actions in significantly less time'],
            ].map(([val, label]) => (
              <div key={val} style={{ background: 'var(--bg)', padding: 'clamp(28px, 3.5vw, 48px) clamp(20px, 2.5vw, 36px)' }}>
                <div style={{
                  fontSize: 'clamp(26px, 3vw, 42px)',
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

      </div>
    </section>
  );
}

/* ─── 9. WHAT I'D EXPLORE NEXT ───────────────────────────── */
function WhatNext() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0' }}>
      <div className="container">
        <div style={{ maxWidth: 720 }}>
          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 28 }}>What I'd explore next</p>
            <h2 style={{
              fontSize: 'clamp(26px, 3vw, 40px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.14,
              marginBottom: 40,
            }}>
              The foundation is built. Here's where it goes deeper.
            </h2>
          </FadeUp>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              ['Deeper personalization over time', 'Move from snapshot context to longitudinal understanding — where Aimee knows what\'s changed in the user\'s life and responds to it.'],
              ['Behavioral adaptation', 'Let Aimee learn from what users actually do, not just what they say — surfacing guidance at the moments when it\'s most likely to change behavior.'],
              ['Long-term planning support', 'Expand from point-in-time guidance to ongoing financial planning conversations that evolve alongside the user\'s goals.'],
              ['Measuring behavior change, not just interaction', 'Replace engagement metrics with outcome metrics — did users actually take action? Did their financial picture improve?'],
            ].map(([title, body], i) => (
              <FadeUp key={title} delay={i * 0.06}>
                <div style={{
                  padding: 'clamp(24px, 3vw, 36px) 0',
                  borderTop: '1px solid var(--border)',
                }}>
                  <h3 style={{
                    fontSize: 'clamp(16px, 1.3vw, 18px)',
                    fontWeight: 700,
                    letterSpacing: '-0.015em',
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}>{title}</h3>
                  <p style={{
                    fontSize: 'clamp(15px, 1.1vw, 16px)',
                    color: 'var(--ink-2)',
                    lineHeight: 1.72,
                    maxWidth: 620,
                  }}>{body}</p>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── 10. FINAL TAKEAWAY ─────────────────────────────────── */
function Takeaway() {
  return (
    <>
      <section style={{
        borderTop: '1px solid var(--border)',
        padding: 'clamp(88px, 12vw, 160px) 0',
        background: 'var(--surface)',
      }}>
        <div className="container">
          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 36 }}>Takeaway</p>
            <p style={{
              fontSize: 'clamp(24px, 3.5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.12,
              maxWidth: 820,
              marginBottom: 0,
            }}>
              Aimee shifted the product from a static experience into an intelligent
              guidance system — showing how AI can be designed to build trust, drive
              action, and create real user value.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Bottom nav */}
      <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(40px, 5vw, 64px) 0' }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/work" className="btn-secondary">← Back to Work</Link>
              <Link to="/work/hub" className="btn-secondary">Next: Financial Finesse Hub →</Link>
              <Link to="/contact" className="btn-secondary">Contact ↗</Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
