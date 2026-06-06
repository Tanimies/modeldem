'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AdminModel {
  id: string
  status: string
  location: string | null
  createdAt: string
  user: { name: string; email: string }
  portfolioMedia: { id: string }[]
}

interface Application {
  id: string
  name: string
  email: string
  phone: string | null
  age: string | null
  height: string | null
  location: string | null
  message: string | null
  status: string
  createdAt: string
}

type AdminTab = 'models' | 'applications'

interface AdminClientProps {
  user: { name: string; email: string; role: string }
}

export default function AdminClient({ user }: AdminClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<AdminTab>('models')
  const [models, setModels] = useState<AdminModel[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const [modelsRes, appsRes] = await Promise.all([
      fetch('/api/models'),
      fetch('/api/applications'),
    ])
    if (modelsRes.ok) setModels(await modelsRes.json())
    if (appsRes.ok) setApplications(await appsRes.json())
    setLoading(false)
  }

  const updateModelStatus = async (profileId: string, status: string) => {
    const res = await fetch('/api/admin/models', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileId, status }),
    })
    if (res.ok) {
      setModels(prev => prev.map(m => m.id === profileId ? { ...m, status } : m))
    }
  }

  const updateApplicationStatus = async (id: string, status: string) => {
    const res = await fetch('/api/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    if (res.ok) {
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    }
  }

  const handleSignOut = async () => {
    const { signOut } = await import('next-auth/react')
    signOut({ callbackUrl: '/' })
  }

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      PENDING: 'badge-gold',
      APPROVED: 'badge-green',
      REJECTED: 'badge-red',
      REVIEWED: 'badge-black',
      ACCEPTED: 'badge-green',
    }
    return <span className={`badge ${map[status] || 'badge-gold'}`}>{status}</span>
  }

  const pendingModels = models.filter(m => m.status === 'PENDING').length
  const pendingApps = applications.filter(a => a.status === 'PENDING').length

  return (
    <div className="dashboard">
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="dashboard-sidebar-logo">Admin Panel</div>

          <nav className="sidebar-nav">
            <button
              className={`sidebar-nav-link ${activeTab === 'models' ? 'active' : ''}`}
              onClick={() => setActiveTab('models')}
              id="admin-tab-models"
            >
              <span>◎</span> Models
              {pendingModels > 0 && <span style={{ marginLeft: 'auto', background: 'var(--color-primary)', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '2px 6px' }}>{pendingModels}</span>}
            </button>
            <button
              className={`sidebar-nav-link ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveTab('applications')}
              id="admin-tab-applications"
            >
              <span>⊡</span> Applications
              {pendingApps > 0 && <span style={{ marginLeft: 'auto', background: 'var(--color-primary)', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '2px 6px' }}>{pendingApps}</span>}
            </button>
            <Link href="/dashboard" className="sidebar-nav-link">
              <span>←</span> My Dashboard
            </Link>
          </nav>

          <div className="sidebar-user">
            <div className="sidebar-user-name">{user.name}</div>
            <div className="sidebar-user-email">{user.email}</div>
            <button className="sidebar-nav-link" onClick={handleSignOut} id="admin-signout">
              <span>→</span> Sign Out
            </button>
          </div>
        </aside>

        <div className="dashboard-content">
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
              <span className="spinner" style={{ width: '32px', height: '32px' }} />
            </div>
          ) : (
            <>
              {/* Models Tab */}
              {activeTab === 'models' && (
                <div className="page-enter">
                  <div style={{ marginBottom: '40px' }}>
                    <span className="text-label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>Management</span>
                    <h1 className="text-headline-md">All Models</h1>
                    <p style={{ marginTop: '8px', fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>{models.length} total · {pendingModels} pending review</p>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Location</th>
                          <th>Portfolio</th>
                          <th>Status</th>
                          <th>Joined</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {models.map(model => (
                          <tr key={model.id}>
                            <td style={{ fontWeight: 600 }}>{model.user.name}</td>
                            <td style={{ color: 'var(--color-on-surface-variant)', fontSize: '12px' }}>{model.user.email}</td>
                            <td>{model.location || '—'}</td>
                            <td>{model.portfolioMedia.length} items</td>
                            <td>{statusBadge(model.status)}</td>
                            <td style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
                              {new Date(model.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                {model.status !== 'APPROVED' && (
                                  <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => updateModelStatus(model.id, 'APPROVED')}
                                    id={`approve-${model.id}`}
                                    style={{ fontSize: '9px', padding: '6px 10px' }}
                                  >
                                    Approve
                                  </button>
                                )}
                                {model.status !== 'REJECTED' && (
                                  <button
                                    className="btn btn-sm btn-ghost"
                                    onClick={() => updateModelStatus(model.id, 'REJECTED')}
                                    id={`reject-${model.id}`}
                                    style={{ fontSize: '9px', padding: '6px 10px', color: 'var(--color-error)', borderColor: 'var(--color-error)' }}
                                  >
                                    Reject
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {models.length === 0 && (
                      <p style={{ textAlign: 'center', padding: '48px', color: 'var(--color-outline)' }}>
                        No models registered yet.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Applications Tab */}
              {activeTab === 'applications' && (
                <div className="page-enter">
                  <div style={{ marginBottom: '40px' }}>
                    <span className="text-label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>Incoming</span>
                    <h1 className="text-headline-md">Applications</h1>
                    <p style={{ marginTop: '8px', fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>{applications.length} total · {pendingApps} pending</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {applications.map(app => (
                      <div key={app.id} style={{ border: '1px solid var(--color-outline-variant)', padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                          <div>
                            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 500, marginBottom: '4px' }}>{app.name}</div>
                            <div style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>{app.email} · {app.phone || '—'}</div>
                          </div>
                          {statusBadge(app.status)}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                          {[
                            { label: 'Age', value: app.age },
                            { label: 'Height', value: app.height },
                            { label: 'Location', value: app.location },
                          ].map(f => (
                            <div key={f.label}>
                              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-on-surface-variant)', marginBottom: '2px' }}>{f.label}</div>
                              <div style={{ fontSize: '14px' }}>{f.value || '—'}</div>
                            </div>
                          ))}
                        </div>

                        {app.message && (
                          <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', borderTop: '1px solid var(--color-outline-variant)', paddingTop: '12px', marginBottom: '16px', lineHeight: 1.6 }}>
                            &ldquo;{app.message}&rdquo;
                          </p>
                        )}

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => updateApplicationStatus(app.id, 'ACCEPTED')}
                            id={`accept-app-${app.id}`}
                            disabled={app.status === 'ACCEPTED'}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-sm btn-ghost"
                            onClick={() => updateApplicationStatus(app.id, 'REJECTED')}
                            id={`reject-app-${app.id}`}
                            disabled={app.status === 'REJECTED'}
                            style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)' }}
                          >
                            Reject
                          </button>
                          <button
                            className="btn btn-sm btn-ghost"
                            onClick={() => updateApplicationStatus(app.id, 'REVIEWED')}
                            id={`review-app-${app.id}`}
                            disabled={app.status === 'REVIEWED'}
                          >
                            Mark Reviewed
                          </button>
                        </div>
                      </div>
                    ))}

                    {applications.length === 0 && (
                      <p style={{ textAlign: 'center', padding: '48px', color: 'var(--color-outline)' }}>
                        No applications yet.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
