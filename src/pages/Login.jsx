import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    const userData = JSON.stringify({ email })
    localStorage.setItem('brightmind_user', userData)
    setUser(userData)
    navigate('/dashboard')
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>🦉</div>
        <h1 style={styles.title}>BrightMind</h1>
        <p style={styles.subtitle}>
          {isSignUp ? 'Create your parent account' : 'Welcome back!'}
        </p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Email address</label>
            <input
              type="email"
              placeholder="parent@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.button}>
            {isSignUp ? 'Create Account →' : 'Log In →'}
          </button>
        </form>
        <p style={styles.toggleText}>
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <span onClick={() => { setIsSignUp(!isSignUp); setError('') }} style={styles.toggleLink}>
            {isSignUp ? 'Log in' : 'Sign up free'}
          </span>
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f0a1e 0%, #1a0a3e 50%, #0a0a2e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: "'Nunito', sans-serif" },
  card: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '2.5rem 2rem', width: '100%', maxWidth: '420px', textAlign: 'center' },
  logo: { fontSize: '3.5rem', marginBottom: '0.5rem' },
  title: { fontFamily: "'Fredoka One', cursive", fontSize: '2rem', color: '#fff', margin: '0 0 0.25rem' },
  subtitle: { fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.75rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' },
  fieldWrap: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.5)' },
  input: { padding: '11px 14px', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: "'Nunito', sans-serif" },
  error: { background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#fca5a5' },
  button: { padding: '13px', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" },
  toggleText: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '1.25rem' },
  toggleLink: { color: '#a78bfa', cursor: 'pointer', fontWeight: '700' },
}