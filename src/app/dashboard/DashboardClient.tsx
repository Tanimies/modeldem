'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface PortfolioMedia {
  id: string
  type: 'IMAGE' | 'VIDEO'
  url: string
  caption: string | null
  isCover: boolean
  createdAt: string
}

interface Profile {
  id: string
  bio: string | null
  location: string | null
  height: string | null
  measurements: string | null
  eyeColor: string | null
  hairColor: string | null
  instagram: string | null
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  coverImage: string | null
  portfolioMedia: PortfolioMedia[]
}

interface DashboardClientProps {
  user: { name: string; email: string; role: string }
  profile: Profile | null
}

type Tab = 'overview' | 'portfolio' | 'profile' | 'settings'

export default function DashboardClient({ user, profile: initialProfile }: DashboardClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [profile, setProfile] = useState<Profile | null>(initialProfile)
  const [mediaItems, setMediaItems] = useState<PortfolioMedia[]>(initialProfile?.portfolioMedia || [])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Profile edit state
  const [profileForm, setProfileForm] = useState({
    bio: profile?.bio || '',
    location: profile?.location || '',
    height: profile?.height || '',
    measurements: profile?.measurements || '',
    eyeColor: profile?.eyeColor || '',
    hairColor: profile?.hairColor || '',
    instagram: profile?.instagram || '',
  })

  const handleSignOut = async () => {
    const { signOut } = await import('next-auth/react')
    signOut({ callbackUrl: '/' })
  }

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploading(true)
    const uploadedItems: PortfolioMedia[] = []

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('caption', '')
      formData.append('isCover', 'false')

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        if (res.ok) {
          const data = await res.json()
          uploadedItems.push(data)
        }
      } catch (err) {
        console.error('Upload failed:', err)
      }
    }

    setMediaItems(prev => [...uploadedItems, ...prev])
    setUploading(false)
    setUploadProgress(0)
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/portfolio?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      setMediaItems(prev => prev.filter(m => m.id !== id))
    }
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => setDragging(false), [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    handleUpload(e.dataTransfer.files)
  }, [])

  const handleSaveProfile = async () => {
    setSaving(true)
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileForm),
    })
    setSaving(false)
    if (res.ok) {
      setSaveMsg('Profile saved successfully.')
      setTimeout(() => setSaveMsg(''), 3000)
    }
  }

  const statusConfig = {
    PENDING: { label: 'Pending Review', className: 'badge-gold' },
    APPROVED: { label: 'Approved', className: 'badge-green' },
    REJECTED: { label: 'Not Approved', className: 'badge-red' },
  }

  const status = profile?.status || 'PENDING'
  const { label: statusLabel, className: statusClass } = statusConfig[status]

  const sidebarLinks: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '◎' },
    { id: 'portfolio', label: 'Portfolio', icon: '⊡' },
    { id: 'profile', label: 'My Profile', icon: '◈' },
    { id: 'settings', label: 'Settings', icon: '⊛' },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="dashboard-sidebar-logo">Elite Maison</div>

          <nav className="sidebar-nav">
            {sidebarLinks.map(link => (
              <button
                key={link.id}
                className={`sidebar-nav-link ${activeTab === link.id ? 'active' : ''}`}
                onClick={() => setActiveTab(link.id)}
                id={`sidebar-${link.id}`}
              >
                <span style={{ fontSize: '16px' }}>{link.icon}</span>
                {link.label}
              </button>
            ))}

            {user.role === 'ADMIN' && (
              <button
                className="sidebar-nav-link"
                onClick={() => router.push('/dashboard/admin')}
                id="sidebar-admin"
              >
                <span style={{ fontSize: '16px' }}>⊕</span>
                Admin Panel
              </button>
            )}
          </nav>

          <div className="sidebar-user">
            <div className="sidebar-user-name">{user.name}</div>
            <div className="sidebar-user-email">{user.email}</div>
            <button className="sidebar-nav-link" onClick={handleSignOut} id="signout-btn">
              <span style={{ fontSize: '16px' }}>→</span>
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="page-enter">
              <div style={{ marginBottom: '48px' }}>
                <span className="text-label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>Dashboard</span>
                <h1 className="text-headline-md">Welcome back, {user.name.split(' ')[0]}</h1>
                <div style={{ marginTop: '12px' }}>
                  <span className={`badge ${statusClass}`}>{statusLabel}</span>
                </div>
              </div>

              <div className="stats-grid">
                {[
                  { label: 'Portfolio Items', value: mediaItems.length, sub: 'Photos & Videos' },
                  { label: 'Profile Status', value: status === 'APPROVED' ? '✓' : '○', sub: status },
                  { label: 'Profile Views', value: '—', sub: 'Coming soon' },
                  { label: 'Bookings', value: '—', sub: 'Coming soon' },
                ].map(s => (
                  <div key={s.label} className="stat-card">
                    <div className="stat-card-label">{s.label}</div>
                    <div className="stat-card-value">{s.value}</div>
                    <div className="stat-card-sub">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Status banner */}
              {status === 'PENDING' && (
                <div style={{ border: '1px solid var(--color-outline-variant)', padding: '24px', marginBottom: '32px', background: 'var(--color-surface-container-low)' }}>
                  <div className="text-label-caps" style={{ marginBottom: '8px', color: 'var(--color-secondary)' }}>Profile Under Review</div>
                  <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
                    Your profile is currently being reviewed by our team. You can still upload portfolio content while you wait. We&apos;ll notify you once a decision is made.
                  </p>
                </div>
              )}

              {/* Recent Portfolio Preview */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 className="text-headline-md" style={{ fontSize: '20px' }}>Recent Portfolio</h2>
                  <button className="btn btn-ghost btn-sm" onClick={() => setActiveTab('portfolio')} id="view-all-portfolio">
                    View All
                  </button>
                </div>

                {mediaItems.length === 0 ? (
                  <div
                    className="upload-zone"
                    onClick={() => setActiveTab('portfolio')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="upload-zone-icon">📸</div>
                    <div className="upload-zone-text">No portfolio items yet</div>
                    <div className="upload-zone-sub">Go to Portfolio tab to upload your first photo or video</div>
                  </div>
                ) : (
                  <div className="portfolio-grid">
                    {mediaItems.slice(0, 4).map(item => (
                      <div key={item.id} className="portfolio-item">
                        {item.type === 'VIDEO' ? (
                          <video src={item.url} muted />
                        ) : (
                          <img src={item.url} alt={item.caption || 'Portfolio'} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div className="page-enter">
              <div style={{ marginBottom: '40px' }}>
                <span className="text-label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>My Work</span>
                <h1 className="text-headline-md">Portfolio</h1>
              </div>

              {/* Upload Zone */}
              <div
                className={`upload-zone ${dragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  multiple
                  accept="image/*,video/*"
                  onChange={e => handleUpload(e.target.files)}
                  id="portfolio-file-input"
                />
                {uploading ? (
                  <>
                    <div className="upload-zone-icon"><span className="spinner" /></div>
                    <div className="upload-zone-text">Uploading...</div>
                  </>
                ) : (
                  <>
                    <div className="upload-zone-icon">⊕</div>
                    <div className="upload-zone-text">Drop photos & videos here</div>
                    <div className="upload-zone-sub">Or click to browse — JPG, PNG, WEBP, MP4 · Max 50MB each</div>
                  </>
                )}
              </div>

              {/* Media Grid */}
              {mediaItems.length > 0 ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '40px 0 16px' }}>
                    <span className="text-label-caps" style={{ fontSize: '10px' }}>{mediaItems.length} items</span>
                  </div>
                  <div className="portfolio-grid">
                    {mediaItems.map(item => (
                      <div key={item.id} className="portfolio-item">
                        {item.type === 'VIDEO' ? (
                          <video src={item.url} muted controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <img src={item.url} alt={item.caption || 'Portfolio'} />
                        )}
                        <div className="portfolio-item-overlay">
                          <button
                            className="portfolio-item-delete"
                            onClick={(e) => { e.stopPropagation(); handleDelete(item.id) }}
                            id={`delete-media-${item.id}`}
                          >
                            Delete
                          </button>
                        </div>
                        {item.type === 'VIDEO' && (
                          <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', padding: '3px 8px', textTransform: 'uppercase' }}>
                            Video
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                !uploading && (
                  <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '13px', color: 'var(--color-outline)' }}>
                    No portfolio items yet. Upload your first photo above.
                  </p>
                )
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="page-enter">
              <div style={{ marginBottom: '40px' }}>
                <span className="text-label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>My Information</span>
                <h1 className="text-headline-md">Profile Details</h1>
              </div>

              {saveMsg && <div className="alert alert-success">{saveMsg}</div>}

              <div style={{ maxWidth: '640px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                  {[
                    { key: 'location', label: 'City / Location', placeholder: 'e.g. Paris, France' },
                    { key: 'height', label: 'Height', placeholder: `e.g. 5'10"` },
                    { key: 'measurements', label: 'Measurements', placeholder: 'e.g. 34-25-35' },
                    { key: 'eyeColor', label: 'Eye Color', placeholder: 'e.g. Hazel' },
                    { key: 'hairColor', label: 'Hair Color', placeholder: 'e.g. Dark Brown' },
                    { key: 'instagram', label: 'Instagram Handle', placeholder: '@yourhandle' },
                  ].map(field => (
                    <div key={field.key} className="form-group">
                      <label className="form-label" htmlFor={`profile-${field.key}`}>{field.label}</label>
                      <input
                        type="text"
                        id={`profile-${field.key}`}
                        className="form-input"
                        value={(profileForm as any)[field.key]}
                        onChange={e => setProfileForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="profile-bio">Bio</label>
                  <textarea
                    id="profile-bio"
                    className="form-textarea"
                    value={profileForm.bio}
                    onChange={e => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Write a short bio about yourself, your experience, and your modeling style..."
                    rows={5}
                  />
                </div>

                <button
                  className="btn btn-primary"
                  onClick={handleSaveProfile}
                  id="save-profile-btn"
                  disabled={saving}
                  style={{ minWidth: '200px' }}
                >
                  {saving ? <span className="spinner" /> : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="page-enter">
              <div style={{ marginBottom: '40px' }}>
                <span className="text-label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>Account</span>
                <h1 className="text-headline-md">Settings</h1>
              </div>

              <div style={{ maxWidth: '480px' }}>
                <div style={{ border: '1px solid var(--color-outline-variant)', padding: '32px', marginBottom: '24px' }}>
                  <div className="text-label-caps" style={{ marginBottom: '16px' }}>Account Information</div>
                  <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>Name:</strong> {user.name}</p>
                  <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>Email:</strong> {user.email}</p>
                  <p style={{ fontSize: '14px' }}><strong>Role:</strong> {user.role}</p>
                </div>

                <button
                  className="btn btn-ghost"
                  onClick={handleSignOut}
                  id="settings-signout-btn"
                  style={{ width: '100%', justifyContent: 'center', marginBottom: '12px' }}
                >
                  Sign Out
                </button>

                <p style={{ fontSize: '11px', color: 'var(--color-outline)', textAlign: 'center', letterSpacing: '0.05em' }}>
                  To delete your account or update your email, contact support@elitemaison.com
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
