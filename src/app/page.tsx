import Link from 'next/link'

// Featured models data (static seed data for homepage)
const featuredModels = [
  {
    id: '1',
    name: 'Elena Rostova',
    location: 'Paris',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80',
    aspect: '4/5',
  },
  {
    id: '2',
    name: 'Julian Vance',
    location: 'Milan',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
    aspect: '3/4',
  },
  {
    id: '3',
    name: 'Aria Chen',
    location: 'New York',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
    aspect: '3/4',
  },
]

const stories = [
  {
    id: '1',
    category: 'Campaign',
    title: 'The Monochrome Issue',
    excerpt: 'Exploring texture and form without the distraction of color in our latest Paris exclusive.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
  },
  {
    id: '2',
    category: 'Editorial',
    title: 'Architectural Forms',
    excerpt: 'How structured garments are redefining silhouettes for the upcoming season.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
  },
  {
    id: '3',
    category: 'Location',
    title: 'Nordic Solitude',
    excerpt: 'Shooting the Winter collection against the austere landscapes of Iceland.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
  },
]

const marqueeItems = ['Paris', '✦', 'Milan', '✦', 'New York', '✦', 'London', '✦', 'Tokyo', '✦', 'Dubai', '✦', 'Los Angeles', '✦']

export default function HomePage() {
  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=90"
            alt="Elite Maison — High Fashion Editorial"
            className="hero-image"
          />
        </div>
        <div className="hero-overlay">
          <p className="hero-subtitle">Since 1998 · Paris · Milan · New York</p>
          <h2 className="hero-title">
            DEFINING<br />THE NEW STANDARD
          </h2>
          <Link href="/models" className="btn btn-primary btn-lg">
            Explore Talent
          </Link>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="marquee-wrap">
        <div className="marquee-inner">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-text">
              {item === '✦' ? <span className="marquee-dot">✦</span> : item}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Faces Section */}
      <section
        id="featured"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: `120px var(--spacing-margin-desktop)`,
        }}
      >
        <div className="section-header">
          <h3 className="section-title">Featured Faces</h3>
          <Link href="/models" className="section-link">View Roster →</Link>
        </div>

        {/* Asymmetric Grid */}
        <div className="models-grid">
          {/* Large card left */}
          <div className="models-grid-main">
            <Link href={`/models/${featuredModels[0].id}`} className="talent-card">
              <div className="talent-card-image-wrap" style={{ aspectRatio: '4/5' }}>
                <img
                  src={featuredModels[0].image}
                  alt={featuredModels[0].name}
                />
              </div>
              <div className="talent-card-meta">
                <span className="talent-card-name">{featuredModels[0].name}</span>
                <span className="talent-card-location">{featuredModels[0].location}</span>
              </div>
            </Link>
          </div>

          {/* Stacked smaller cards right */}
          <div className="models-grid-side">
            {featuredModels.slice(1).map((model, index) => (
              <Link key={model.id} href={`/models/${model.id}`} className="talent-card" style={{ marginTop: index === 0 ? 0 : 0 }}>
                <div className="talent-card-image-wrap" style={{ aspectRatio: '3/4' }}>
                  <img src={model.image} alt={model.name} />
                </div>
                <div className="talent-card-meta">
                  <span className="talent-card-name">{model.name}</span>
                  <span className="talent-card-location">{model.location}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Agency Statement */}
      <section style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: `80px var(--spacing-margin-desktop)`,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
      }}
        className="agency-statement"
      >
        <div>
          <span className="text-label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '16px' }}>
            Established 1998
          </span>
          <h3 className="text-headline-lg" style={{ marginBottom: '24px', textTransform: 'uppercase' }}>
            The Standard<br />of Excellence
          </h3>
          <div className="gold-line" style={{ margin: '0 0 24px 0' }} />
          <p className="text-body-lg" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '16px' }}>
            Elite Maison is a premier modeling agency representing the world&apos;s most extraordinary talent.
            From editorial to haute couture, our curated roster defines the visual language of luxury.
          </p>
          <p className="text-body-lg" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '40px' }}>
            With offices in Paris, Milan, and New York, we connect extraordinary talent with the world&apos;s
            most prestigious fashion houses and luxury brands.
          </p>
          <Link href="/join" className="btn btn-ghost">
            Apply to Join
          </Link>
        </div>
        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=85"
            alt="Elite fashion model"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            right: '24px',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', fontWeight: 600, color: '#fff' }}>200+</div>
              <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Models Worldwide</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', fontWeight: 600, color: '#fff' }}>40+</div>
              <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Luxury Clients</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', fontWeight: 600, color: '#fff' }}>3</div>
              <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Global Offices</div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .agency-statement {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
              padding: 60px var(--spacing-margin-mobile) !important;
            }
          }
        `}</style>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Latest Stories Section */}
      <section style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: `120px var(--spacing-margin-desktop)`,
      }}>
        <div className="section-header-centered">
          <h3 className="section-title">Latest Stories</h3>
          <div className="gold-line" />
          <p className="text-body-lg" style={{ color: 'var(--color-on-surface-variant)', maxWidth: '640px', margin: '0 auto' }}>
            Curated editorials and behind-the-scenes insights from our global campaigns.
          </p>
        </div>

        <div className="stories-grid">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="story-card"
              style={{ marginTop: index === 1 ? '-48px' : '0' }}
            >
              <div className="story-card-image-wrap">
                <img src={story.image} alt={story.title} />
              </div>
              <span className="story-card-category">{story.category}</span>
              <h4 className="story-card-title">{story.title}</h4>
              <p className="story-card-excerpt">{story.excerpt}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
          <Link href="/stories" className="btn btn-ghost">
            Read All Stories
          </Link>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        background: 'var(--color-primary)',
        padding: '120px var(--spacing-margin-desktop)',
        textAlign: 'center',
      }}>
        <span style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          display: 'block',
          marginBottom: '24px',
        }}>
          Begin Your Journey
        </span>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(40px, 5vw, 72px)',
          fontWeight: 600,
          color: '#ffffff',
          lineHeight: 1.1,
          marginBottom: '32px',
        }}>
          Join The Elite
        </h3>
        <p style={{
          fontSize: '16px',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.6)',
          marginBottom: '48px',
          maxWidth: '500px',
          margin: '0 auto 48px',
          lineHeight: 1.8,
        }}>
          We are always looking for extraordinary faces. Submit your application and let our team discover you.
        </p>
        <Link href="/join" className="btn btn-gold btn-lg">
          Apply Now
        </Link>
      </section>
    </div>
  )
}
