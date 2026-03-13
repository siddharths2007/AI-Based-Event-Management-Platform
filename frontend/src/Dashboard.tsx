import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

/* ── DEMO DATA ───────────────────────────────────────── */
const navItems = [
  { icon: '◈', label: 'Dashboard',  badge: ''  },
  { icon: '◎', label: 'My Events',  badge: '5' },
  { icon: '▦', label: 'Calendar',   badge: ''  },
  { icon: '⬡', label: 'Analytics',  badge: ''  },
  { icon: '✉', label: 'Messages',   badge: '3' },
  { icon: '⚙', label: 'Settings',   badge: ''  },
];

const stats = [
  { icon: '◎', label: 'Total Events',  value: '24',     change: '+12%', up: true,  iconBg: 'rgba(79,141,255,0.12)',  iconColor: '#4f8dff' },
  { icon: '⬢', label: 'Attendees',     value: '3,847',  change: '+8%',  up: true,  iconBg: 'rgba(167,139,250,0.12)', iconColor: '#a78bfa' },
  { icon: '✦', label: 'Revenue',       value: '$48.2K', change: '+23%', up: true,  iconBg: 'rgba(52,212,184,0.12)',  iconColor: '#34d4b8' },
  { icon: '⭐', label: 'Satisfaction',  value: '4.8/5',  change: '+2%',  up: true,  iconBg: 'rgba(245,158,11,0.12)',  iconColor: '#f59e0b' },
];

const events = [
  { name: 'AI Innovation Summit 2026',   type: 'Conference',   date: 'Mar 22, 2026', venue: 'Tech Center, SF',       attendees: 842,  status: 'live' },
  { name: 'ML Workshop — Transformers',  type: 'Workshop',     date: 'Mar 28, 2026', venue: 'Virtual',               attendees: 320,  status: 'upcoming' },
  { name: 'Design Systems Meetup',       type: 'Meetup',       date: 'Apr 3, 2026',  venue: 'Innovation Hub, NYC',    attendees: 175,  status: 'upcoming' },
  { name: 'Cloud Ops Bootcamp',          type: 'Bootcamp',     date: 'Apr 10, 2026', venue: 'AWS Campus, Seattle',    attendees: 560,  status: 'draft' },
  { name: 'Product Launch — Q1 Review',  type: 'Internal',     date: 'Mar 10, 2026', venue: 'HQ, Room 301',          attendees: 48,   status: 'completed' },
];

const activities = [
  { icon: '🎟', text: '<strong>42 new registrations</strong> for AI Innovation Summit', time: '2 min ago',   bg: 'rgba(79,141,255,0.1)',  color: '#4f8dff' },
  { icon: '💬', text: '<strong>Speaker confirmed:</strong> Dr. Sarah Chen accepted the keynote slot', time: '18 min ago',  bg: 'rgba(167,139,250,0.1)', color: '#a78bfa' },
  { icon: '📊', text: '<strong>Analytics report</strong> for ML Workshop is ready to view', time: '1 hr ago',   bg: 'rgba(52,212,184,0.1)',  color: '#34d4b8' },
  { icon: '⚡', text: '<strong>AI recommendation:</strong> Move Panel B to 2PM — conflict detected', time: '2 hr ago',   bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
  { icon: '✅', text: '<strong>Cloud Ops Bootcamp</strong> draft saved with 4 sessions', time: '3 hr ago',   bg: 'rgba(79,141,255,0.1)',  color: '#4f8dff' },
];

const quickActions = [
  { icon: '✦', title: 'Create Event',    desc: 'Launch a new event from scratch or template', iconBg: 'rgba(79,141,255,0.12)',  iconColor: '#4f8dff' },
  { icon: '🎤', title: 'Invite Speakers', desc: 'Send AI-personalized speaker invitations',    iconBg: 'rgba(167,139,250,0.12)', iconColor: '#a78bfa' },
  { icon: '📈', title: 'View Reports',    desc: 'Engagement, satisfaction & revenue analytics', iconBg: 'rgba(52,212,184,0.12)',  iconColor: '#34d4b8' },
  { icon: '◈', title: 'AI Assistant',     desc: 'Chat with AI to plan your next event',        iconBg: 'rgba(245,158,11,0.12)',  iconColor: '#f59e0b' },
];

/* ── COMPONENT ───────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');

  return (
    <div className={`dash${collapsed ? ' sidebar-collapsed' : ''}`}>

      {/* ── SIDEBAR ─────────────────────────────────── */}
      <aside className={`dash-sidebar${collapsed ? ' collapsed' : ''}`}>
        <div className="dash-sidebar-header">
          <div className="dash-sidebar-logo" onClick={() => navigate('/')}>
            <div className="dash-sidebar-logo-dot" />
            <span>EventMind AI</span>
          </div>
          {!collapsed && (
            <button className="dash-sidebar-toggle" onClick={() => setCollapsed(true)} title="Collapse">
              ◁
            </button>
          )}
          {collapsed && (
            <button className="dash-sidebar-toggle" onClick={() => setCollapsed(false)} title="Expand" style={{ marginLeft: -4 }}>
              ▷
            </button>
          )}
        </div>

        <nav className="dash-nav">
          {navItems.map(item => (
            <button
              key={item.label}
              className={`dash-nav-item${activeNav === item.label ? ' active' : ''}`}
              onClick={() => setActiveNav(item.label)}
            >
              <span className="dash-nav-icon">{item.icon}</span>
              <span className="dash-nav-label">{item.label}</span>
              {item.badge && <span className="dash-nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="dash-sidebar-footer">
          <div className="dash-sidebar-user">
            <div className="dash-user-avatar">SK</div>
            <div className="dash-user-info">
              <div className="dash-user-name">Siddharth K.</div>
              <div className="dash-user-email">siddharth@eventmind.ai</div>
            </div>
          </div>
          <button className="dash-logout-btn" onClick={() => navigate('/')}>
            <span className="dash-nav-icon">⏻</span>
            <span className="dash-logout-label">Log out</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN ────────────────────────────────────── */}
      <main className="dash-main">

        {/* TOP BAR */}
        <div className="dash-topbar">
          <div className="dash-topbar-left">
            <div className="dash-topbar-greeting">
              Good evening, <span className="gradient-text">Siddharth</span> 👋
            </div>
            <div className="dash-topbar-sub">Here's what's happening with your events today.</div>
          </div>
          <div className="dash-topbar-right">
            <div className="dash-search">
              <span className="dash-search-icon">🔍</span>
              <input placeholder="Search events, attendees…" />
            </div>
            <div className="dash-topbar-icon">
              🔔
              <div className="dash-notif-dot" />
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="dash-content">

          {/* STATS */}
          <div className="dash-stats">
            {stats.map((s, i) => (
              <div className="dash-stat-card" key={i}>
                <div className="dash-stat-header">
                  <div className="dash-stat-icon" style={{ background: s.iconBg, color: s.iconColor }}>
                    {s.icon}
                  </div>
                  <span className={`dash-stat-change ${s.up ? 'up' : 'down'}`}>
                    {s.up ? '↑' : '↓'} {s.change}
                  </span>
                </div>
                <div className="dash-stat-value">{s.value}</div>
                <div className="dash-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* EVENTS TABLE */}
          <div className="dash-section">
            <div className="dash-section-header">
              <div className="dash-section-title">Upcoming Events</div>
              <button className="dash-section-action">View all →</button>
            </div>
            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>Attendees</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((ev, i) => (
                    <tr key={i}>
                      <td>
                        <div className="dash-event-name">{ev.name}</div>
                        <div className="dash-event-sub">{ev.type}</div>
                      </td>
                      <td>{ev.date}</td>
                      <td style={{ color: 'var(--muted)' }}>{ev.venue}</td>
                      <td>{ev.attendees.toLocaleString()}</td>
                      <td>
                        <span className={`dash-status ${ev.status}`}>
                          {ev.status === 'live' && '● '}
                          {ev.status.charAt(0).toUpperCase() + ev.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* BOTTOM GRID */}
          <div className="dash-bottom-grid">

            {/* ACTIVITY FEED */}
            <div className="dash-activity">
              <div className="dash-section-header">
                <div className="dash-section-title">Recent Activity</div>
                <button className="dash-section-action">See all →</button>
              </div>
              <div className="dash-activity-list">
                {activities.map((a, i) => (
                  <div className="dash-activity-item" key={i}>
                    <div className="dash-activity-dot" style={{ background: a.bg, color: a.color }}>
                      {a.icon}
                    </div>
                    <div className="dash-activity-text">
                      <div className="dash-activity-title" dangerouslySetInnerHTML={{ __html: a.text }} />
                      <div className="dash-activity-time">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="dash-actions">
              <div className="dash-section-header">
                <div className="dash-section-title">Quick Actions</div>
              </div>
              <div className="dash-actions-grid">
                {quickActions.map((q, i) => (
                  <div className="dash-action-card" key={i}>
                    <div className="dash-action-icon" style={{ background: q.iconBg, color: q.iconColor }}>
                      {q.icon}
                    </div>
                    <div className="dash-action-title">{q.title}</div>
                    <div className="dash-action-desc">{q.desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
