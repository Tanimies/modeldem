'use client'

import { useState } from 'react'
import Link from 'next/link'

const allModels = [
  { id: '1', name: 'Elena Rostova', location: 'Paris', gender: 'women', height: '5\'11"', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80', tag: 'New Face' },
  { id: '2', name: 'Julian Vance', location: 'Milan', gender: 'men', height: '6\'1"', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80', tag: '' },
  { id: '3', name: 'Aria Chen', location: 'New York', gender: 'women', height: '5\'10"', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80', tag: '' },
  { id: '4', name: 'Sofia Laurent', location: 'Paris', gender: 'women', height: '5\'9"', image: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=600&q=80', tag: 'New Face' },
  { id: '5', name: 'Marco Bellini', location: 'Milan', gender: 'men', height: '6\'0"', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80', tag: '' },
  { id: '6', name: 'Naomi Adeyemi', location: 'London', gender: 'women', height: '5\'11"', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', tag: '' },
  { id: '7', name: 'Luca Moretti', location: 'Milan', gender: 'men', height: '6\'2"', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=600&q=80', tag: 'New Face' },
  { id: '8', name: 'Camille Dubois', location: 'Paris', gender: 'women', height: '5\'10"', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80', tag: '' },
  { id: '9', name: 'Kai Nakamura', location: 'Tokyo', gender: 'men', height: '5\'11"', image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&q=80', tag: '' },
  { id: '10', name: 'Isabela Ferreira', location: 'São Paulo', gender: 'women', height: '5\'9"', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80', tag: 'New Face' },
  { id: '11', name: 'Alexei Petrov', location: 'Moscow', gender: 'men', height: '6\'1"', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600&q=80', tag: '' },
  { id: '12', name: 'Zara Okonkwo', location: 'Lagos', gender: 'women', height: '5\'11"', image: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=600&q=80', tag: '' },
]

const filters = ['All', 'Women', 'Men', 'New Faces']

export default function ModelsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = allModels.filter(m => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Women') return m.gender === 'women'
    if (activeFilter === 'Men') return m.gender === 'men'
    if (activeFilter === 'New Faces') return m.tag === 'New Face'
    return true
  })

  return (
    <div className="page-enter page-pt" style={{ minHeight: '100vh' }}>
      {/* Page Header */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: `64px var(--spacing-margin-desktop) 48px`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderBottom: '1px solid var(--color-outline-variant)',
      }}>
        <div>
          <span className="text-label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '12px' }}>
            Our Talent
          </span>
          <h1 className="text-headline-lg" style={{ textTransform: 'uppercase' }}>The Roster</h1>
        </div>
        <p className="text-body-md" style={{ color: 'var(--color-on-surface-variant)', maxWidth: '320px', textAlign: 'right' }}>
          {filtered.length} models representing the pinnacle of editorial and commercial fashion.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: `48px var(--spacing-margin-desktop)` }}>
        {/* Filter Chips */}
        <div className="filter-chips">
          {filters.map(filter => (
            <button
              key={filter}
              className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
              id={`filter-${filter.toLowerCase().replace(' ', '-')}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Roster Grid */}
        <div className="roster-grid">
          {filtered.map(model => (
            <Link key={model.id} href={`/models/${model.id}`} className="talent-card">
              <div className="talent-card-image-wrap">
                <img src={model.image} alt={model.name} />
                {model.tag && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'var(--color-primary)',
                    color: 'var(--color-on-primary)',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                  }}>
                    {model.tag}
                  </div>
                )}
              </div>
              <div className="talent-card-meta">
                <span className="talent-card-name">{model.name}</span>
                <span className="talent-card-location">{model.location}</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p className="text-label-caps" style={{ color: 'var(--color-outline)' }}>No models found</p>
          </div>
        )}
      </div>

      {/* Join CTA */}
      <div style={{
        background: 'var(--color-surface-container-low)',
        borderTop: '1px solid var(--color-outline-variant)',
        padding: '80px var(--spacing-margin-desktop)',
        textAlign: 'center',
      }}>
        <span className="text-label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '16px' }}>
          Want to be on this roster?
        </span>
        <h3 className="text-headline-md" style={{ marginBottom: '24px' }}>Apply to Join Elite Maison</h3>
        <Link href="/join" className="btn btn-primary">
          Submit Application
        </Link>
      </div>
    </div>
  )
}
