import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">Elite Maison</div>

        <div className="gold-line" />

        <nav className="footer-nav">
          <Link href="/models" className="footer-link">Models</Link>
          <Link href="/stories" className="footer-link">Stories</Link>
          <Link href="/join" className="footer-link">Join Us</Link>
          <Link href="#paris" className="footer-link">Paris</Link>
          <Link href="#milan" className="footer-link">Milan</Link>
          <Link href="#newyork" className="footer-link">New York</Link>
          <Link href="/login" className="footer-link">Portal</Link>
          <Link href="#privacy" className="footer-link">Privacy</Link>
          <Link href="#terms" className="footer-link">Terms</Link>
        </nav>

        <p className="footer-copyright">© 2024 Elite Maison. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
