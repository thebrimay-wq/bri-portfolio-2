import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import FadeUp from '../components/FadeUp.jsx';

/* ─── PAGE ──────────────────────────────────────────────── */
export default function SmartBenefits() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />
      <main>
        <HeroSection />
        <ProblemSection />
        <ShiftSection />
        <SystemSection />
        <MomentA />
        <MomentB />
        <MomentC />
        <DesignDecisions />
        <SystemThinking />
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
          <p className="eyebrow" style={{ marginBottom: 28 }}>Case Study · Enterprise UX · Systems Design</p>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h1 style={{
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            maxWidth: 840,
            marginBottom: 32,
          }}>
            What if benefits could{' '}
            <span style={{ color: 'var(--ink-3)' }}>answer themselves?</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p style={{
            fontSize: 'clamp(17px, 1.4vw, 20px)',
            color: 'var(--ink-2)',
            lineHeight: 1.72,
            maxWidth: 600,
            marginBottom: 52,
          }}>
            Designing an AI-powered system that transforms complex benefits documents
            into clear, trusted, actionable guidance for employees.
          </p>
        </FadeUp>

        <FadeUp delay={0.14}>
          <div style={{ display: 'flex', gap: 52, flexWrap: 'wrap', marginBottom: 'clamp(52px, 7vw, 88px)' }}>
            {[
              ['40%', 'Reduced benefits confusion'],
              ['HR', 'Support requests decreased'],
              ['Scale', 'Across thousands of employees'],
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
function SBSkipLink() {
  return (
    <a
      href="#smartbenefits-solution"
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

/* ─── 2. PROBLEM ─────────────────────────────────────────── */
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
              Benefits were never designed to be understood
            </h2>
            <p style={{
              fontSize: 'clamp(17px, 1.4vw, 20px)',
              color: 'var(--ink-2)',
              lineHeight: 1.78,
              marginBottom: 24,
            }}>
              Employees are given more options than ever — health plans, retirement,
              insurance — but the experience is fragmented, buried in PDFs, and filled
              with jargon. Instead of empowerment, most employees face confusion.
            </p>
            <p style={{
              fontSize: 'clamp(17px, 1.4vw, 20px)',
              color: 'var(--ink-2)',
              lineHeight: 1.78,
              marginBottom: 24,
            }}>
              At the same time, HR teams are overwhelmed with repetitive questions
              they can't scale to answer.
            </p>
            <p style={{
              fontSize: 'clamp(17px, 1.4vw, 20px)',
              fontWeight: 600,
              color: 'var(--ink)',
              lineHeight: 1.6,
              marginBottom: 36,
            }}>
              The result: critical benefits go unused, misunderstood, or misused.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <SBSkipLink />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. THE SHIFT ───────────────────────────────────────── */
function ShiftSection() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0', background: 'var(--surface)' }}>
      <div className="container">

        <FadeUp>
          <p className="eyebrow" style={{ marginBottom: 48 }}>The Shift</p>
        </FadeUp>

        <FadeUp delay={0.06}>
          <p style={{
            fontSize: 'clamp(28px, 4.5vw, 62px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.06,
            maxWidth: 860,
            marginBottom: 'clamp(48px, 7vw, 96px)',
          }}>
            What if documents became intelligent, searchable knowledge?
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p style={{
            fontSize: 'clamp(16px, 1.2vw, 18px)',
            color: 'var(--ink-2)',
            lineHeight: 1.75,
            maxWidth: 560,
            marginBottom: 40,
          }}>
            Instead of asking employees to navigate complexity, we bring clarity
            directly to them.
          </p>
        </FadeUp>

        <FadeUp delay={0.14}>
          <div style={{ maxWidth: 600 }}>
            {[
              ['Static PDFs', 'Dynamic knowledge'],
              ['Manual support', 'Real-time answers'],
              ['Fragmented information', 'A single source of truth'],
            ].map(([from, to]) => (
              <div key={from} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: 'clamp(18px, 2.5vw, 28px) 0',
                borderTop: '1px solid var(--border)',
              }}>
                <span style={{
                  fontSize: 'clamp(14px, 1.1vw, 16px)',
                  color: 'var(--ink-3)',
                  textDecoration: 'line-through',
                  flex: 1,
                }}>{from}</span>
                <span style={{ fontSize: 12, color: 'var(--ink-3)', letterSpacing: '0.05em', flexShrink: 0 }}>→</span>
                <span style={{
                  fontSize: 'clamp(14px, 1.1vw, 16px)',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  flex: 1,
                }}>{to}</span>
              </div>
            ))}
          </div>
        </FadeUp>

      </div>
    </section>
  );
}

/* ─── 4. THE SOLUTION ────────────────────────────────────── */
function SystemSection() {
  const bullets = [
    'Turns unstructured documents into usable, queryable knowledge',
    'Delivers clear answers in plain language — no PDF required',
    'Gives admins full control over review, accuracy, and compliance',
    'Creates a scalable bridge between employee questions and employer-specific benefits information',
  ];
  return (
    <section id="smartbenefits-solution" style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0' }}>
      <div className="container">

        <FadeUp style={{ marginBottom: 'clamp(40px, 5vw, 60px)', maxWidth: 720 }}>
          <p className="eyebrow" style={{ marginBottom: 28 }}>The Solution</p>
          <h2 style={{
            fontSize: 'clamp(26px, 3vw, 40px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.14,
            marginBottom: 32,
          }}>
            A system that transforms complex documents into clear, trusted guidance
          </h2>
          <p style={{
            fontSize: 'clamp(17px, 1.4vw, 20px)',
            color: 'var(--ink-2)',
            lineHeight: 1.78,
            marginBottom: 40,
          }}>
            Instead of asking employees to navigate PDFs and fragmented portals,
            the product now adapts to them:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {bullets.map((text, i) => (
              <div key={i} style={{
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
            ))}
          </div>
          <p style={{
            fontSize: 'clamp(17px, 1.4vw, 20px)',
            color: 'var(--ink)',
            lineHeight: 1.65,
            fontWeight: 500,
            fontStyle: 'italic',
            borderLeft: '2px solid var(--border)',
            paddingLeft: 24,
            marginTop: 48,
          }}>
            The result is a benefits experience that feels less like document search
            — and more like intelligent support.
          </p>
        </FadeUp>

        <FadeUp style={{ marginBottom: 'clamp(32px, 4vw, 52px)' }}>
          <p className="eyebrow" style={{ marginBottom: 24 }}>Designed for both sides</p>
          <h3 style={{
            fontSize: 'clamp(20px, 2vw, 28px)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            maxWidth: 600,
          }}>
            A system built for employees and admins
          </h3>
        </FadeUp>

        <div className="hub-two-col" style={{ alignItems: 'start', marginBottom: 'clamp(48px, 6vw, 72px)' }}>

          <FadeUp>
            <div style={{
              padding: 'clamp(28px, 3.5vw, 44px)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
            }}>
              <p className="eyebrow" style={{ marginBottom: 18 }}>Employees</p>
              <p style={{
                fontSize: 'clamp(16px, 1.3vw, 19px)',
                color: 'var(--ink-2)',
                lineHeight: 1.75,
              }}>
                Ask a question. Receive a clear, contextual answer grounded in their
                actual benefits plan — no searching, no guessing, no PDF.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div style={{
              padding: 'clamp(28px, 3.5vw, 44px)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
            }}>
              <p className="eyebrow" style={{ marginBottom: 18 }}>Admins</p>
              <p style={{
                fontSize: 'clamp(16px, 1.3vw, 19px)',
                color: 'var(--ink-2)',
                lineHeight: 1.75,
              }}>
                Upload documents, review AI-generated answers, and maintain full control
                over accuracy and compliance — without touching code.
              </p>
            </div>
          </FadeUp>

        </div>

        <FadeUp delay={0.1}>
          <div style={{
            borderTop: '1px solid var(--border)',
            paddingTop: 'clamp(32px, 4vw, 48px)',
            maxWidth: 720,
          }}>
            <p style={{
              fontSize: 'clamp(18px, 1.8vw, 24px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.5,
              color: 'var(--ink)',
            }}>
              This wasn't a chatbot.{' '}
              <span style={{ color: 'var(--ink-2)', fontWeight: 400 }}>
                It was a system designed to turn unstructured data into trusted,
                usable knowledge.
              </span>
            </p>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}

/* ─── 5A. DOCUMENT → ANSWER ──────────────────────────────── */
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
              Turning complexity into clarity
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 1.2vw, 18px)',
              color: 'var(--ink-2)',
              lineHeight: 1.75,
              marginBottom: 20,
            }}>
              SmartBenefits ingests messy, unstructured data — PDFs, spreadsheets,
              intranet pages — and transforms it into a dynamic, queryable knowledge
              system.
            </p>
            <p style={{
              fontSize: 'clamp(16px, 1.2vw, 18px)',
              color: 'var(--ink)',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              lineHeight: 1.6,
            }}>
              Employees don't search.<br />They ask.
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

/* ─── 5B. AI WITH CONTROL ────────────────────────────────── */
function MomentB() {
  return (
    <section style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)',
      padding: 'clamp(80px, 10vw, 128px) 0',
    }}>
      <div className="container">
        <div className="hub-two-col">

          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 20 }}>Experience · 02</p>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 24,
            }}>
              Confidence, not hallucination
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 1.2vw, 18px)',
              color: 'var(--ink-2)',
              lineHeight: 1.75,
              marginBottom: 28,
            }}>
              Every answer is grounded in verified plan data and reviewed by financial
              experts. Admins have full visibility and control — nothing goes live
              without approval.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Approve answers', 'Edit for accuracy', 'Refine for compliance'].map(action => (
                <div key={action} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: 'clamp(14px, 1.1vw, 16px)',
                  color: 'var(--ink-2)',
                  fontWeight: 500,
                }}>
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--ink-3)',
                    flexShrink: 0,
                  }} />
                  {action}
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

/* ─── 5C. ANSWERS → ACTION ───────────────────────────────── */
function MomentC() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(80px, 10vw, 128px) 0' }}>
      <div className="container">
        <div style={{ maxWidth: 720 }}>
          <FadeUp>
            <p className="eyebrow" style={{ marginBottom: 20 }}>Experience · 03</p>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 24,
            }}>
              From understanding to better decisions
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 1.2vw, 18px)',
              color: 'var(--ink-2)',
              lineHeight: 1.75,
            }}>
              SmartBenefits connects benefits information to real financial decisions —
              helping users take meaningful next steps based on their goals, life stage,
              and actual plan options. Understanding isn't the endpoint. Action is.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── 6. DESIGN DECISIONS ────────────────────────────────── */
function DesignDecisions() {
  const decisions = [
    {
      n: '01',
      title: 'Human-in-the-loop AI',
      body: "Accuracy and trust mattered more than automation speed. Every AI-generated answer passed through expert review before reaching employees — because in high-stakes decisions, confidence is a feature.",
    },
    {
      n: '02',
      title: 'Confidence-based answers',
      body: 'Users needed to know what they could trust. The system was designed to surface certainty signals — not hide ambiguity. When an answer was approximate, it said so.',
    },
    {
      n: '03',
      title: 'Admin-first control model',
      body: "Organizations needed to own their data and their answers. The admin experience was designed to give HR teams meaningful control — not just visibility — over what employees see.",
    },
    {
      n: '04',
      title: 'Simple interaction model',
      body: 'One input: a question. One output: a clear answer. Complexity was absorbed by the system so it never touched the employee. The interface was designed to disappear.',
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
            maxWidth: 540,
          }}>
            The choices that shaped the system
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
function SystemThinking() {
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
            maxWidth: 720,
          }}>
            Designed as a system, not a feature
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
              SmartBenefits isn't a Q&A widget. Every layer was designed to connect
              with the next — from raw documents to structured knowledge to trusted
              answers — creating a system that improves over time.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                ['Document ingestion', 'PDFs, spreadsheets, and intranet data become structured inputs'],
                ['AI processing', 'Language models extract meaning, structure, and intent'],
                ['Knowledge structuring', 'Raw answers are organized into a queryable knowledge base'],
                ['Admin validation', 'Experts review, edit, and approve before deployment'],
                ['Employee interaction', 'One clear question. One trusted answer.'],
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
                    minWidth: 140,
                    letterSpacing: '-0.01em',
                    paddingTop: 1,
                  }}>{node}</span>
                  <span style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6 }}>{desc}</span>
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
            maxWidth: 580,
            margin: '0 auto clamp(56px, 7vw, 88px)',
          }}>
            Clarity at scale
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
              ['Reduced', 'Repetitive HR support requests — freeing teams to focus on higher-value work'],
              ['Improved', 'Benefits understanding and utilization across the employee base'],
              ['Increased', 'Employee confidence in financial decisions connected to their benefits'],
              ['Scaled', 'Personalized guidance across thousands of users without adding headcount'],
            ].map(([val, label]) => (
              <div key={val} style={{ background: 'var(--bg)', padding: 'clamp(28px, 3.5vw, 48px) clamp(20px, 2.5vw, 36px)' }}>
                <div style={{
                  fontSize: 'clamp(22px, 2.5vw, 36px)',
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

/* ─── 9. WHAT I'D DO NEXT ────────────────────────────────── */
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
              A living system has room to grow.
            </h2>
          </FadeUp>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              ['Personalize responses by life stage', 'A 28-year-old navigating their first job has different needs than someone approaching retirement. The system should adapt to where someone is in life, not just what they ask.'],
              ['Connect to long-term financial planning', "Benefits decisions don't exist in isolation. Tying them to retirement goals, savings rates, and financial health creates a much more valuable guidance layer."],
              ['Improve accuracy through usage signals', 'Every answer is a data point. What users click, ask again, or escalate tells us where the knowledge base has gaps — and where to focus accuracy improvements.'],
              ['Expand into flexible benefits ecosystems', 'As benefits become more flexible and personalized, the system needs to handle greater complexity without passing that complexity to the employee.'],
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

/* ─── 10. TAKEAWAY ───────────────────────────────────────── */
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
              fontSize: 'clamp(22px, 3.2vw, 46px)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.12,
              maxWidth: 840,
            }}>
              SmartBenefits transformed static documents into a living system — combining
              AI, human expertise, and system design to turn complexity into clarity, and
              help employees make better decisions.
            </p>
          </FadeUp>
        </div>
      </section>

      <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(40px, 5vw, 64px) 0' }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/work" className="btn-secondary">← Back to Work</Link>
              <Link to="/work/aimee" className="btn-secondary">Next: Aimee AI →</Link>
              <Link to="/contact" className="btn-secondary">Contact ↗</Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
