import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

/* ── DATA ─────────────────────────────────────────────── */
const features = [
  { icon: '◈', title: 'Intelligent Scheduling',    desc: 'AI optimizes calendar management, seamlessly coordinating events and minimizing scheduling conflicts for all participants.' },
  { icon: '◎', title: 'Attendee Insights',         desc: 'Deep analytics provide understanding of attendee preferences, enhancing engagement and tailoring experiences to individual interests.' },
  { icon: '⬢', title: 'Automated Communication',   desc: 'Personalized notifications and AI chatbots facilitate real-time communication, ensuring attendees receive timely updates and support.' },
  { icon: '✦', title: 'Real-Time Analytics',       desc: 'Live tracking and feedback mechanisms allow for immediate adjustments, ensuring events meet evolving attendee needs effectively.' },
  { icon: '⬡', title: 'Task Automation',           desc: 'AI automates repetitive tasks — scheduling, reminders, and follow-ups — dramatically reducing manual workload for organizers.' },
  { icon: '◇', title: 'Personalization Engine',    desc: 'AI tailors every event experience to individual attendee needs, from session recommendations to personalized content delivery.' },
];

const challenges = [
  { icon: '⚠', title: 'Complexity', color: '#f59e0b', desc: 'Manual coordination often leads to overlapping tasks and confusion, making event management cumbersome and challenging.' },
  { icon: '⏱', title: 'Logistics',  color: '#f87171', desc: 'Time-consuming logistics and scheduling can delay processes, causing frustration for event planners and attendees alike.' },
  { icon: '🎯', title: 'Preferences', color: '#a78bfa', desc: 'Predicting attendee preferences remains difficult, leading to misalignment between offerings and actual participant interests.' },
];

const steps = [
  { num: '01', title: 'Assess Needs',    desc: 'Assess organizational needs to tailor the AI platform effectively for your specific event type and scale.' },
  { num: '02', title: 'Integrate',       desc: 'Integrate the AI platform with your current tools and workflows for seamless, uninterrupted operation.' },
  { num: '03', title: 'Train Staff',     desc: 'Train staff comprehensively with guided onboarding to ensure smooth platform adoption and usage.' },
  { num: '04', title: 'Deploy & Monitor', desc: 'Deploy fully and monitor performance metrics continuously for ongoing improvement and optimization.' },
];

const calDays   = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const calDates  = [null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const eventDays = [7, 14, 21, 23];
const today     = 13;

const attendees = [
  { initials: 'AR', name: 'Aisha Rahman', role: 'Lead Trainer',  bg: '#4f8dff22', color: '#4f8dff', badge: 'Speaking',   badgeBg: 'rgba(79,141,255,0.15)',  badgeColor: '#4f8dff' },
  { initials: 'JM', name: 'Jake Müller',  role: 'Workshop Host', bg: '#a78bfa22', color: '#a78bfa', badge: 'Active',     badgeBg: 'rgba(167,139,250,0.15)', badgeColor: '#a78bfa' },
  { initials: 'SL', name: 'Sofia Lin',    role: 'Attendee',      bg: '#34d4b822', color: '#34d4b8', badge: 'Registered', badgeBg: 'rgba(52,212,184,0.12)',  badgeColor: '#34d4b8' },
];

const scores = [
  { label: 'Engagement',  val: 94, color: '#4f8dff' },
  { label: 'Satisfaction', val: 88, color: '#a78bfa' },
  { label: 'Completion',  val: 76, color: '#34d4b8' },
  { label: 'Network',     val: 91, color: '#f59e0b' },
];

const tickerItems = [
  'Intelligent Scheduling', 'Attendee Insights', 'Automated Communication', 'Real-Time Analytics',
  'Task Automation', 'Personalization Engine', 'Predictive Forecasting', 'AI Chatbots',
  'Intelligent Scheduling', 'Attendee Insights', 'Automated Communication', 'Real-Time Analytics',
  'Task Automation', 'Personalization Engine', 'Predictive Forecasting', 'AI Chatbots',
];

const futureTags = [
  'AI-Powered Virtual Events', 'Augmented Reality', 'Predictive Personalization',
  'Immersive Experiences', 'Smart Networking', 'Real-Time Sentiment Analysis',
  'Autonomous Scheduling', 'AR Engagement Tools',
];

/* ── COMPONENT ────────────────────────────────────────── */
export default function Landing() {
  const navigate = useNavigate();
  const [scrolled, setScrolled]       = useState(false);
  const [barsAnimated, setBarsAnimated] = useState(false);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setBarsAnimated(true); },
      { threshold: 0.3 }
    );
    if (barsRef.current) obs.observe(barsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* NAV */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-logo">
          <div className="nav-logo-dot" />
          EventMind AI
        </div>
        <ul className="nav-links">
          {[
            { label: 'Features', id: 'features' },
            { label: 'Platform', id: 'platform' },
            { label: 'Docs',     id: 'docs'     },
          ].map(l => (
            <li key={l.label}>
              <a href={`#${l.id}`} onClick={e => { e.preventDefault(); scrollTo(l.id); }}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-cta">
          <button className="btn-ghost" onClick={() => navigate('/login')}>Log in</button>
          <button className="btn-primary" onClick={() => navigate('/signup')}>Get started</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="grid-overlay" />
          <div className="orb1" />
          <div className="orb2" />
          <div className="orb3" />
        </div>

        <div className="badge">
          <div className="badge-dot" />
          Now in public beta
        </div>

        <h1 className="hero-title">
          Run smarter events<br />
          <span className="line2">powered by <span className="gradient-text">AI intelligence</span></span>
        </h1>

        <p className="hero-sub">
          Orchestrate conferences, workshops, and cohort programs with an AI that handles
          scheduling, matching, scoring, and logistics — so you focus on what matters.
        </p>

        <div className="hero-actions">
          <button className="btn-hero-primary">
            Start free trial <span>→</span>
          </button>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {tickerItems.map((item, i) => (
            <div className="ticker-item" key={i}>
              <span className="ticker-sep">✦</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="section" id="features">
        <div className="section-label">✦ Core capabilities</div>
        <h2 className="section-title">Everything your event<br />operations need</h2>
        <p className="section-sub">
          From a single workshop to a 10,000-person summit — one AI platform handles the complexity.
        </p>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feat-icon">{f.icon}</div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BENTO / PLATFORM */}
      <div className="bento" id="platform">
        <div className="bento-grid">

          {/* AI Chat */}
          <div className="bento-card large">
            <div className="bento-card-label">✦ AI assistant</div>
            <div className="bento-card-title">Plan entire events<br />in conversation</div>
            <div className="bento-card-desc">
              Just describe what you need — the AI drafts agendas, assigns rooms, and notifies speakers.
            </div>
            <div className="ai-chat">
              <div className="chat-msg user">Create a 3-day AI summit for 500 people in March</div>
              <div className="chat-msg ai">
                ✦ Done! I've drafted a 3-day schedule across 4 tracks, identified 12 speaker slots,
                and pre-booked 3 breakout rooms. Want me to send invitations?
              </div>
              <div className="chat-msg user">Yes — filter for ML researchers only</div>
              <div className="chat-msg ai">
                Filtered 847 contacts → 124 qualified ML researchers. Draft emails ready for review.
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="bento-card">
            <div className="bento-card-label">◈ Smart scheduling</div>
            <div className="bento-card-title">Zero conflicts, always</div>
            <div className="mini-calendar">
              <div className="cal-header">
                <span>March 2026</span>
                <span style={{ color: 'var(--muted)' }}>→</span>
              </div>
              <div className="cal-grid">
                {calDays.map((d, i) => (
                  <div key={i} style={{ fontSize: '10px', color: 'var(--muted)', textAlign: 'center', paddingBottom: 6 }}>{d}</div>
                ))}
                {calDates.map((d, i) =>
                  d ? (
                    <div
                      key={i}
                      className={`cal-day${d === today ? ' today' : ''}${eventDays.includes(d) ? ' event' : ''}${d === today ? ' active' : ''}`}
                      style={{ margin: '0 auto' }}
                    >
                      {d}
                    </div>
                  ) : <div key={i} />
                )}
              </div>
            </div>
          </div>

          {/* Attendees */}
          <div className="bento-card">
            <div className="bento-card-label">◎ Cohort management</div>
            <div className="bento-card-title">Know every attendee</div>
            <div className="bento-card-desc">AI enriches profiles and surfaces the right people.</div>
            <div className="attendee-list">
              {attendees.map((a, i) => (
                <div className="attendee" key={i}>
                  <div className="avatar" style={{ background: a.bg, color: a.color }}>{a.initials}</div>
                  <div>
                    <div className="att-name">{a.name}</div>
                    <div className="att-role">{a.role}</div>
                  </div>
                  <div className="att-badge" style={{ background: a.badgeBg, color: a.badgeColor }}>
                    {a.badge}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scoreboard */}
          <div className="bento-card" ref={barsRef}>
            <div className="bento-card-label">⬡ Live scoreboards</div>
            <div className="bento-card-title">Measure what<br />matters</div>
            <div className="score-bars">
              {scores.map((s, i) => (
                <div className="score-row" key={i}>
                  <div className="score-label">{s.label}</div>
                  <div className="score-bar-bg">
                    <div
                      className="score-bar-fill"
                      style={{
                        width: barsAnimated ? `${s.val}%` : '0%',
                        background: s.color,
                        boxShadow: `0 0 8px ${s.color}66`,
                        transitionDelay: `${i * 0.1}s`,
                      }}
                    />
                  </div>
                  <div className="score-val" style={{ color: s.color }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Insight */}
          <div className="bento-card" style={{ background: 'linear-gradient(135deg, rgba(79,141,255,0.08), rgba(167,139,250,0.08))' }}>
            <div className="bento-card-label">◇ Predictions</div>
            <div className="bento-card-title">AI that sees<br />around corners</div>
            <div className="bento-card-desc">
              Churn risk, low-engagement sessions, and upsell opportunities — surfaced before they become problems.
            </div>
            <div style={{ marginTop: 24, padding: '14px 16px', background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12, color: 'var(--accent)', marginBottom: 6 }}>⚡ Insight detected</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>
                Session "Cloud Ops 101" has 62% predicted drop-off. AI recommends shortening to 45 min and adding a quiz break.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CHALLENGES */}
      <div className="section" style={{ paddingTop: 60 }}>
        <div className="section-label">⚡ Why AI?</div>
        <h2 className="section-title">The challenges AI solves</h2>
        <p className="section-sub">
          Traditional event management is broken. Here's what planners struggle with — and how we fix it.
        </p>
        <div className="challenges-grid">
          {challenges.map((c, i) => (
            <div className="challenge-card" key={i}>
              <div className="challenge-stripe" style={{ background: c.color }} />
              <span className="challenge-icon">{c.icon}</span>
              <div className="challenge-title">{c.title}</div>
              <div className="challenge-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* STATS BAND */}
      <div className="stats-band" id="pricing">
        <div className="stats-grid">
          <div className="stat-block">
            <div className="stat-block-num" style={{ color: '#4f8dff' }}>40%</div>
            <div className="stat-block-label">Event planning time reduced with AI automation</div>
          </div>
          <div className="stat-block">
            <div className="stat-block-num" style={{ color: '#34d4b8' }}>25%</div>
            <div className="stat-block-label">Attendee satisfaction improved through personalization</div>
          </div>
          <div className="stat-block">
            <div className="stat-block-num" style={{ color: '#a78bfa' }}>30%</div>
            <div className="stat-block-label">Operational costs lowered via intelligent automation</div>
          </div>
        </div>
      </div>

      {/* IMPLEMENTATION STEPS */}
      <div className="section" style={{ paddingTop: 20 }} id="docs">
        <div className="section-label">◈ Implementation</div>
        <h2 className="section-title">Up and running in 4 steps</h2>
        <p className="section-sub">
          A straightforward path from evaluation to a fully deployed AI event platform.
        </p>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div className="step-card" key={i}>
              <div className="step-num">{s.num}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* THE FUTURE */}
      <div className="section" style={{ paddingTop: 20, paddingBottom: 60 }}>
        <div className="section-label">◇ What's next</div>
        <div className="future-card">
          <div className="future-glow" />
          <div style={{ maxWidth: 620 }}>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              The future of<br /><span className="gradient-text">AI-powered events</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.7 }}>
              Emerging AI trends are transforming the events landscape. Expect AI-powered virtual events
              with immersive experiences, predictive analytics customizing attendee interactions, and
              augmented reality features that drive deeper engagement — creating more meaningful
              connections at every event.
            </p>
            <div className="future-tags">
              {futureTags.map((t, i) => (
                <div className="future-tag" key={i}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-card">
          <div className="cta-glow" />
          <div className="badge" style={{ opacity: 1, animation: 'none', margin: '0 auto 28px' }}>
            <div className="badge-dot" />
            No credit card required
          </div>
          <div className="cta-title">
            Your next event,<br /><span className="gradient-text">reinvented by AI</span>
          </div>
          <p className="cta-sub">
            Join 2,400+ organizers who've replaced spreadsheets and stress with EventMind's intelligent platform.
          </p>
          <div className="cta-buttons">
            <button className="btn-hero-primary">Start free — no card needed →</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="nav-logo">
          <div className="nav-logo-dot" />
          EventMind AI
        </div>
        <div className="footer-links">
          {['Privacy', 'Terms', 'Status', 'Docs'].map(l => (
            <a href="#" key={l}>{l}</a>
          ))}
        </div>
        <div>© 2026 EventMind AI, Inc.</div>
      </footer>
    </>
  );
}