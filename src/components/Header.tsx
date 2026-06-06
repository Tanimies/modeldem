'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  // Don't show header on dashboard or auth pages
  const isDashboard = pathname?.startsWith('/dashboard')
  if (isDashboard) return null

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          {/* Left Nav */}
          <nav className="header-nav-left">
            <Link href="/models" className={`nav-link ${pathname === '/models' ? 'active' : ''}`}>
              Models
            </Link>
            <Link href="/stories" className={`nav-link ${pathname === '/stories' ? 'active' : ''}`}>
              Stories
            </Link>
          </nav>

          {/* Center Logo */}
          <Link href="/" className="header-logo">
            Elite Maison
          </Link>

          {/* Right Nav */}
          <nav className="header-nav-right">
            <Link href="/join" className={`nav-link ${pathname === '/join' ? 'active' : ''}`}>
              Join Us
            </Link>
            <Link href="/login" className="nav-cta">
              Portal
            </Link>
            <button
              className="nav-btn-icon"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              id="menu-btn"
            >
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="8" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button
          className="mobile-menu-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          id="menu-close-btn"
        >
          ✕
        </button>

        <div className="mobile-menu-logo">Elite Maison</div>

        <nav className="mobile-menu-links">
          <Link href="/models" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            Models
          </Link>
          <Link href="/stories" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            Stories
          </Link>
          <Link href="/join" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            Join Us
          </Link>
          <Link href="/login" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            Model Portal
          </Link>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '32px', borderTop: '1px solid var(--color-outline-variant)' }}>
          <p className="text-label-caps text-muted" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>Paris · Milan · New York</p>
        </div>
      </div>
    </>
  )
}
