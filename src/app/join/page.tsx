'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function JoinPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', age: '', height: '', location: '', message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Submission failed. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <div className="join-hero">
        <span className="join-hero-label">Applications Open</span>
        <h1 className="join-hero-title">
          Become Part<br />of Elite Maison
        </h1>
        <div className="gold-line" />
        <p className="join-hero-desc">
          We are always searching for extraordinary faces. Submit your details and our scouting team
          will review your application within 5–7 business days.
        </p>
      </div>

      {/* Requirements */}
      <div style={{
        background: 'var(--color-surface-container-low)',
        borderBottom: '1px solid var(--color-outline-variant)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '64px var(--spacing-margin-mobile)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px', textAlign: 'center' }}>
          {[
            { icon: '📏', title: 'Minimum Height', desc: 'Women: 5\'8" and above\nMen: 6\'0" and above' },
            { icon: '🎂', title: 'Age Range', desc: 'Must be 16 years or older\nAll minors need guardian consent' },
            { icon: '📸', title: 'What to Submit', desc: 'Clear, natural photos\nNo heavy filters or makeup' },
          ].map(req => (
            <div key={req.title}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{req.icon}</div>
              <div className="text-label-caps" style={{ marginBottom: '8px' }}>{req.title}</div>
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{req.desc}</p>
            </div>
          ))}
          <style>{`
            @media (max-width: 768px) {
              .req-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </div>

      {/* Application Form */}
      <div className="join-form-section">
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>✦</div>
            <h2 className="text-headline-md" style={{ marginBottom: '16px' }}>Application Received</h2>
            <div className="gold-line" />
            <p className="text-body-lg" style={{ color: 'var(--color-on-surface-variant)', margin: '24px 0 40px' }}>
              Thank you for your interest in Elite Maison. Our scouting team will review your
              application and reach out within 5–7 business days.
            </p>
            <Link href="/" className="btn btn-ghost">Return Home</Link>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '48px' }}>
              <span className="text-label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '12px' }}>
                Application Form
              </span>
              <h2 className="text-headline-md" style={{ marginBottom: '8px' }}>Tell Us About Yourself</h2>
              <div className="gold-line" style={{ margin: '16px 0 0' }} />
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <form onSubmit={handleSubmit} id="join-form">
              <div className="join-form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="join-name">Full Name *</label>
                  <input type="text" id="join-name" name="name" className="form-input" value={form.name} onChange={handleChange} required placeholder="Your full name" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="join-email">Email Address *</label>
                  <input type="email" id="join-email" name="email" className="form-input" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="join-phone">Phone Number</label>
                  <input type="tel" id="join-phone" name="phone" className="form-input" value={form.phone} onChange={handleChange} placeholder="+1 234 567 8900" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="join-age">Age</label>
                  <input type="number" id="join-age" name="age" className="form-input" value={form.age} onChange={handleChange} placeholder="e.g. 22" min="16" max="60" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="join-height">Height</label>
                  <input type="text" id="join-height" name="height" className="form-input" value={form.height} onChange={handleChange} placeholder={`e.g. 5'10" or 178cm`} />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="join-location">City / Country</label>
                  <input type="text" id="join-location" name="location" className="form-input" value={form.location} onChange={handleChange} placeholder="e.g. Paris, France" />
                </div>

                <div className="form-group full">
                  <label className="form-label" htmlFor="join-message">Tell us about yourself</label>
                  <textarea
                    id="join-message"
                    name="message"
                    className="form-textarea"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your modeling experience, goals, and what makes you unique..."
                    rows={4}
                  />
                </div>
              </div>

              <div style={{ marginTop: '8px' }}>
                <button type="submit" className="btn btn-primary btn-lg" id="join-submit" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                  {loading ? <span className="spinner" /> : 'Submit Application'}
                </button>
                <p style={{ fontSize: '11px', color: 'var(--color-outline)', textAlign: 'center', marginTop: '16px', letterSpacing: '0.05em' }}>
                  By submitting, you agree to our Privacy Policy and Terms of Service.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
