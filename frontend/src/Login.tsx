import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors]     = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading]   = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!email)                              e.email    = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email))   e.email    = 'Enter a valid email address.';
    if (!password)                           e.password = 'Password is required.';
    else if (password.length < 6)            e.password = 'Password must be at least 6 characters.';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    // On success navigate to home (swap for your dashboard route)
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      {/* Background */}
      <div className="auth-bg">
        <div className="auth-grid" />
        <div className="auth-orb1" />
        <div className="auth-orb2" />
        <div className="auth-orb3" />
      </div>

      {/* Card */}
      <div className="auth-card">
        {/* Logo — clicks back to landing */}
        <div className="auth-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="auth-logo-dot" />
          EventMind AI
        </div>

        <h1 className="auth-title">
          Welcome <span className="gradient-text">back</span>
        </h1>
        <p className="auth-subtitle">
          Sign in to your workspace and pick up where you left off.
        </p>

        {/* Social */}
        <div className="social-buttons" style={{ marginBottom: 20 }}>
          <button className="social-btn">
            <span className="social-icon">G</span> Google
          </button>
          <button className="social-btn">
            <span className="social-icon">⌘</span> SSO
          </button>
        </div>

        <div className="auth-divider">
          <div className="auth-divider-line" />
          <span className="auth-divider-text">or continue with email</span>
          <div className="auth-divider-line" />
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              className={`form-input${errors.email ? ' error' : ''}`}
              placeholder="you@company.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
              autoComplete="email"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <div className="password-row">
              <label className="form-label" htmlFor="password">Password</label>
              <a href="#" className="forgot-link" onClick={e => e.preventDefault()}>Forgot password?</a>
            </div>
            <div className="input-wrapper">
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                className={`form-input${errors.password ? ' error' : ''}`}
                placeholder="••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })); }}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="input-toggle"
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>

        <p className="auth-footer-text">
          Don't have an account?{' '}
          <a
            href="/signup"
            onClick={e => { e.preventDefault(); navigate('/signup'); }}
          >
            Create one free
          </a>
        </p>
      </div>
    </div>
  );
}