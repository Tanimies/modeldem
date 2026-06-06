'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { signIn } = await import('next-auth/react')
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password. Please try again.')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page" style={{ minHeight: '100vh' }}>
      {/* Visual Panel */}
      <div className="auth-visual">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=85"
          alt="Elite fashion"
        />
        <div className="auth-visual-overlay">
          <p className="auth-visual-sub">Welcome back</p>
          <div className="auth-visual-tagline">
            Your Stage<br />Awaits
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="auth-panel">
        <Link href="/" className="auth-logo">Elite Maison</Link>

        <h1 className="auth-title">Sign In</h1>
        <p className="auth-subtitle">Access your model portal and dashboard.</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} id="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            id="login-submit"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
          >
            {loading ? <span className="spinner" /> : 'Enter Portal'}
          </button>
        </form>

        <div className="auth-footer-link">
          Not a member yet? <Link href="/register">Apply to join →</Link>
        </div>

        <div style={{ marginTop: '48px', padding: '24px', background: 'var(--color-surface-container-low)', border: '1px solid var(--color-outline-variant)' }}>
          <p className="text-label-caps" style={{ marginBottom: '8px', fontSize: '9px' }}>Admin Demo Access</p>
          <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>Email: <strong>admin@elitemaison.com</strong></p>
          <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>Password: <strong>admin123456</strong></p>
        </div>
      </div>
    </div>
  )
}
