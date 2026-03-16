import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const initialMessages = [
  { role: 'ai', text: 'Good evening, Siddharth! I am EventMind AI. How can I assist you with planning and managing your upcoming events today?' }
];

/* ── COMPONENT ───────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg = { role: 'user', text: inputValue };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await axios.post('/api/chat', { messages: updatedMessages });
      setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }]);
    } catch (err: unknown) {
      let errorText = 'Sorry, I encountered an error. Please try again.';
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        errorText = err.response.data.error;
      }
      setMessages(prev => [...prev, { role: 'error', text: errorText }]);
    } finally {
      setIsLoading(false);
    }
  };

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
            <button className="dash-sidebar-toggle" onClick={() => setCollapsed(false)} title="Expand">
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
          <div className="dash-chat-container">
            <div className="dash-chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`dash-message ${msg.role}`}>
                  <div className="dash-message-avatar">
                    {msg.role === 'ai' ? '◈' : msg.role === 'error' ? '⚠' : 'SK'}
                  </div>
                  <div className="dash-message-content">
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="dash-message ai">
                  <div className="dash-message-avatar">◈</div>
                  <div className="dash-message-content dash-typing-indicator">
                    <span className="dash-typing-dot"></span>
                    <span className="dash-typing-dot"></span>
                    <span className="dash-typing-dot"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="dash-chat-input-area">
              <form className="dash-chat-input-box" onSubmit={handleSend}>
                <input 
                  type="text" 
                  className="dash-chat-input" 
                  placeholder="Message EventMind AI..." 
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  disabled={isLoading}
                />
                <button type="submit" className="dash-chat-submit" disabled={!inputValue.trim() || isLoading}>
                  ↑
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
