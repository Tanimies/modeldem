import Link from 'next/link'

const modelData: Record<string, any> = {
  '1': { name: 'Elena Rostova', location: 'Paris', height: '5\'11"', eyes: 'Blue-grey', hair: 'Dark Brown', measurements: '33-24-35', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=80', images: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80','https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=600&q=80','https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80','https://images.unsplash.com/photo-1496440737103-cd596325d314?w=600&q=80'], bio: 'Elena Rostova is a leading editorial model with campaigns for Chanel, Dior, and Saint Laurent. Known for her ethereal presence and versatility, she has graced the covers of Vogue Paris, W Magazine, and Harper\'s Bazaar.' },
  '2': { name: 'Julian Vance', location: 'Milan', height: '6\'1"', eyes: 'Green', hair: 'Dark Brown', measurements: '40-32-38', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=80', images: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80','https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80','https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600&q=80','https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=600&q=80'], bio: 'Julian Vance has established himself as one of the most sought-after male models in European fashion, with runway appearances at Prada, Gucci, and Armani. His architectural presence brings an unmatched gravitas to every editorial.' },
  '3': { name: 'Aria Chen', location: 'New York', height: '5\'10"', eyes: 'Brown', hair: 'Black', measurements: '34-25-35', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=80', images: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80','https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80','https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80','https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80'], bio: 'Aria Chen bridges Eastern and Western aesthetics, making her the face of global luxury campaigns. With a background in contemporary dance, her movement and grace translate into extraordinary photographic presence.' },
}

export default async function ModelProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const model = modelData[id]

  if (!model) {
    return (
      <div className="page-pt" style={{ textAlign: 'center', padding: '120px 24px' }}>
        <h1 className="text-headline-md" style={{ marginBottom: '16px' }}>Model not found</h1>
        <Link href="/models" className="btn btn-ghost">Back to Roster</Link>
      </div>
    )
  }

  return (
    <div className="page-enter">
      {/* Hero Split Layout */}
      <div className="model-detail-hero">
        <div className="model-detail-image">
          <img src={model.image} alt={model.name} />
        </div>
        <div className="model-detail-info">
          <div className="breadcrumb">
            <Link href="/models">Models</Link>
            <span>→</span>
            <span style={{ color: 'var(--color-primary)' }}>{model.name}</span>
          </div>

          <span className="text-label-caps" style={{ color: 'var(--color-gold)', marginBottom: '12px', display: 'block' }}>
            {model.location}
          </span>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(40px, 4vw, 64px)',
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: '24px',
            textTransform: 'uppercase',
          }}>
            {model.name}
          </h1>

          <div className="gold-line" style={{ margin: '0 0 32px 0' }} />

          <p className="text-body-lg" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '40px' }}>
            {model.bio}
          </p>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            borderTop: '1px solid var(--color-outline-variant)',
            borderBottom: '1px solid var(--color-outline-variant)',
            padding: '24px 0',
            marginBottom: '40px',
          }}>
            {[
              { label: 'Height', value: model.height },
              { label: 'Measurements', value: model.measurements },
              { label: 'Eyes', value: model.eyes },
              { label: 'Hair', value: model.hair },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-label-caps" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '4px', fontSize: '9px' }}>
                  {stat.label}
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 500 }}>{stat.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/join" className="btn btn-primary">Book {model.name.split(' ')[0]}</Link>
            <button className="btn btn-ghost">Download Comp Card</button>
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: `80px var(--spacing-margin-desktop)` }}>
        <h2 className="text-headline-md" style={{ textTransform: 'uppercase', marginBottom: '40px' }}>Portfolio</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {model.images.map((img: string, i: number) => (
        <div key={i} style={{ aspectRatio: '3/4', overflow: 'hidden', background: 'var(--color-surface-container)', cursor: 'pointer' }}
          className="portfolio-thumb"
        >
          <img
            src={img}
            alt={`${model.name} portfolio ${i + 1}`}
            className="portfolio-thumb-img"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
          />
        </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}
