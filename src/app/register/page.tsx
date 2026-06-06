'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed.')
      } else {
        setSuccess(true)
        setTimeout(() => router.push('/login'), 2000)
      }
    } catch {
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
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=85"
          alt="Elite fashion editorial"
        />
        <div className="auth-visual-overlay">
          <p className="auth-visual-sub">Begin your journey</p>
          <div className="auth-visual-tagline">
            Join The<br />Elite
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="auth-panel">
        <Link href="/" className="auth-logo">Elite Maison</Link>

        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join our exclusive model roster and manage your portfolio.</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">Account created! Redirecting to login...</div>}

        <form onSubmit={handleSubmit} id="register-form">
          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">Full Name</label>
            <input
              type="text"
              id="reg-name"
              name="name"
              className="form-input"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">Email Address</label>
            <input
              type="email"
              id="reg-email"
              name="email"
              className="form-input"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">Password</label>
            <input
              type="password"
              id="reg-password"
              name="password"
              className="form-input"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Min. 8 characters"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
            <input
              type="password"
              id="reg-confirm"
              name="confirm"
              className="form-input"
              value={form.confirm}
              onChange={handleChange}
              required
              placeholder="Repeat password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            id="register-submit"
            disabled={loading || success}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {loading ? <span className="spinner" /> : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer-link">
          Already have an account? <Link href="/login">Sign in →</Link>
        </div>
      </div>
    </div>
  )
}
