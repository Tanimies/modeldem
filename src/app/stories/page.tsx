import Link from 'next/link'

const stories = [
  { id: '1', category: 'Campaign', title: 'The Monochrome Issue', excerpt: 'Exploring texture and form without the distraction of color in our latest Paris exclusive.', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80', date: 'November 2024' },
  { id: '2', category: 'Editorial', title: 'Architectural Forms', excerpt: 'How structured garments are redefining silhouettes for the upcoming season.', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', date: 'October 2024' },
  { id: '3', category: 'Location', title: 'Nordic Solitude', excerpt: 'Shooting the Winter collection against the austere landscapes of Iceland.', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80', date: 'September 2024' },
  { id: '4', category: 'Campaign', title: 'Golden Hour', excerpt: 'Our Summer 2024 campaign captures the fleeting beauty of golden dusk on the Côte d\'Azur.', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80', date: 'August 2024' },
  { id: '5', category: 'Interview', title: 'Dialogue with Elena', excerpt: 'In conversation with our top model about identity, craft, and the future of fashion.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', date: 'July 2024' },
  { id: '6', category: 'Behind The Scenes', title: 'The Making Of', excerpt: 'A rare look behind the curtain at how our most ambitious editorial campaign came together.', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80', date: 'June 2024' },
]

export const metadata = {
  title: 'Stories — Elite Maison',
  description: 'Curated editorials and behind-the-scenes insights from Elite Maison\'s global campaigns.',
}

export default function StoriesPage() {
  const featured = stories[0]
  const rest = stories.slice(1)

  return (
    <div className="page-enter page-pt">
      {/* Page Header */}
      <div style={{
        maxWidth: '1440px', margin: '0 auto',
        padding: `64px var(--spacing-margin-desktop) 48px`,
        borderBottom: '1px solid var(--color-outline-variant)',
      }}>
        <span className="text-label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '12px' }}>Editorial</span>
        <h1 className="text-headline-lg" style={{ textTransform: 'uppercase' }}>Stories</h1>
        <p className="text-body-lg" style={{ color: 'var(--color-on-surface-variant)', maxWidth: '480px', marginTop: '12px' }}>
          Curated editorials and behind-the-scenes insights from our global campaigns.
        </p>
      </div>

      {/* Featured Story */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: `80px var(--spacing-margin-desktop)` }}>
        <Link href={`/stories/${featured.id}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', textDecoration: 'none', color: 'inherit' }} className="featured-story-link">
          <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: 'var(--color-surface-container)' }} className="featured-story-img-wrap">
            <img
              src={featured.image}
              alt={featured.title}
              className="featured-story-img"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <span className="badge badge-black" style={{ marginBottom: '16px', display: 'inline-block' }}>Featured</span>
            <span className="story-card-category" style={{ display: 'block', marginBottom: '12px' }}>{featured.category}</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 3vw, 48px)', fontWeight: 500, lineHeight: 1.2, marginBottom: '24px', textTransform: 'uppercase' }}>
              {featured.title}
            </h2>
            <div className="gold-line" style={{ margin: '0 0 24px 0' }} />
            <p className="text-body-lg" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '32px' }}>{featured.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="text-label-caps" style={{ color: 'var(--color-outline)' }}>{featured.date}</span>
              <span className="section-link">Read Story →</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Divider */}
      <div className="section-divider" />

      {/* More Stories Grid */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: `80px var(--spacing-margin-desktop)` }}>
        <h2 className="text-headline-md" style={{ textTransform: 'uppercase', marginBottom: '48px' }}>More Stories</h2>
        <div className="stories-grid">
          {rest.map((story, i) => (
            <div key={story.id} className="story-card" style={{ marginTop: i === 1 ? '-48px' : '0' }}>
              <div className="story-card-image-wrap">
                <img src={story.image} alt={story.title} />
              </div>
              <span className="story-card-category">{story.category}</span>
              <h3 className="story-card-title">{story.title}</h3>
              <p className="story-card-excerpt">{story.excerpt}</p>
              <span className="text-label-caps" style={{ color: 'var(--color-outline)', marginTop: '12px', display: 'block', fontSize: '9px' }}>{story.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
