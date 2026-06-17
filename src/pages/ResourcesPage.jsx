import { useState, useEffect, useRef } from 'react'
import { resources, catLabels, catOrder, statusLabels } from '../data/resources'
import { icons, ArrowIcon, CloseIcon, ExternalIcon, DocIcon, EmptyIcon } from '../icons'
import SiteHeader from '../components/SiteHeader'

const SOURCE_PDF = `${import.meta.env.BASE_URL}content-source/master-documentation.pdf`

const catColors = {
  tools: '#077A56',
  migration: '#4A7800',
  reference: '#006B06',
  deprecated: '#6B7280',
  all: '#18453B',
}

const allCategories = ['all', ...catOrder]
const catFilterLabels = { all: 'All', ...catLabels }

function navigate(route) {
  window.location.hash = route
}

function ResourceDetailPanel({ res, onClose }) {
  const closeRef = useRef(null)
  useEffect(() => {
    closeRef.current?.focus()
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.paddingRight = scrollbarWidth + 'px'
    document.body.classList.add('panel-open')
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.paddingRight = ''
      document.body.classList.remove('panel-open')
    }
  }, [onClose])

  return (
    <div className="detail-overlay" role="dialog" aria-modal="true" aria-labelledby="panel-name">
      <div className="detail-backdrop" onClick={onClose} />
      <div className="detail-panel" data-cat={res.category}>
        <div className="panel-head">
          <div className="panel-head-top">
            <div className="panel-icon-bg" aria-hidden="true">
              {icons[res.icon]}
            </div>
            <div className="panel-meta">
              <div className="panel-name" id="panel-name">
                {res.name}
              </div>
              <div className="panel-badges">
                <span className="panel-cat-badge">{catLabels[res.category]}</span>
                <span className={`status-badge status-${res.status}`}>
                  {statusLabels[res.status]}
                </span>
              </div>
            </div>
            <button ref={closeRef} className="panel-close" onClick={onClose} aria-label="Close detail panel">
              <CloseIcon />
            </button>
          </div>
          <p className="panel-desc">{res.desc}</p>
        </div>

        <div className="panel-body">
          <div className="panel-section">
            <p className="panel-section-label">Key details</p>
            <ul className="facts-list">
              {res.facts.map((fact, i) => (
                <li className="fact-item" key={i}>
                  <span className="fact-bullet" aria-hidden="true" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {res.tech?.length > 0 && (
            <div className="panel-section">
              <p className="panel-section-label">Stack</p>
              <div className="tech-tags">
                {res.tech.map((t) => (
                  <span className="tech-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {res.links?.length > 0 && (
            <div className="panel-section">
              <p className="panel-section-label">Links</p>
              <div className="link-list">
                {res.links.map((link) => (
                  <a
                    key={link.url}
                    className={`link-btn${link.primary ? ' primary' : ''}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{link.label}</span>
                    <span className="link-btn-ext" aria-hidden="true">
                      <ExternalIcon />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ResourcesPage() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [activeRes, setActiveRes] = useState(null)

  const counts = {}
  resources.forEach((r) => {
    counts[r.category] = (counts[r.category] || 0) + 1
  })

  const filtered = resources.filter((r) => {
    const matchesFilter = filter === 'all' || r.category === filter
    const q = search.toLowerCase().trim()
    const matchesSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.desc.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q) ||
      (r.tech || []).some((t) => t.toLowerCase().includes(q)) ||
      r.facts.some((f) => f.toLowerCase().includes(q))
    return matchesFilter && matchesSearch
  })

  const groups = {}
  catOrder.forEach((cat) => {
    groups[cat] = []
  })
  filtered.forEach((r) => groups[r.category].push(r))

  const totalVisible = filtered.length
  const totalLinks = resources.reduce((n, r) => n + (r.links?.length || 0), 0)

  // Card / nav activation: internal-route cards navigate; the rest open a panel.
  const openResource = (r) => (r.route ? navigate(r.route) : setActiveRes(r))

  return (
    <>
      <SiteHeader active="resources" search={search} setSearch={setSearch} placeholder="Search resources…" />

      <div className="layout">
        {/* ── Sidebar ── */}
        <aside className="sidebar" aria-label="Resource navigation">
          <div className="sidebar-group">
            <span className="sidebar-label">Filter</span>
            <div className="sidebar-filters">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn${filter === cat ? ' active' : ''}`}
                  onClick={() => setFilter(cat)}
                  aria-pressed={filter === cat}
                >
                  <span className="cat-swatch" style={{ background: catColors[cat] }} />
                  <span className="filter-btn-text">{catFilterLabels[cat]}</span>
                  <span className="filter-count">
                    {cat === 'all' ? resources.length : counts[cat] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-divider" />

          <div className="sidebar-group">
            <span className="sidebar-label">All resources</span>
            <ul className="sidebar-nav" aria-label="Resource list">
              {resources.map((r) => (
                <li
                  key={r.id}
                  className={`sidebar-nav-item${activeRes?.id === r.id ? ' active' : ''}`}
                >
                  <a
                    href={r.route || '#'}
                    onClick={(e) => {
                      if (!r.route) e.preventDefault()
                      if (!r.route) openResource(r)
                    }}
                  >
                    <span className="nav-cat-dot" style={{ background: catColors[r.category] }} />
                    {r.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="main">
          <section className="hero" aria-label="About this resource hub">
            <span className="hero-eyebrow">MSU College of Engineering</span>
            <h1 className="hero-title">Student Front-End Web Assistant resources</h1>
            <p className="hero-desc">
              The tools, migration utilities, and standards used to design, publish, and maintain
              the MSU College of Engineering website. Every resource cited in the master
              documentation, gathered in one place.
            </p>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">{resources.length}</div>
                <div className="hero-stat-label">Resources</div>
              </div>
              <div>
                <div className="hero-stat-num">{catOrder.length}</div>
                <div className="hero-stat-label">Categories</div>
              </div>
              <div>
                <div className="hero-stat-num">{totalLinks}</div>
                <div className="hero-stat-label">Direct links</div>
              </div>
            </div>
            <div className="hero-actions">
              <a
                className="source-link source-link--on-dark"
                href={SOURCE_PDF}
                target="_blank"
                rel="noopener noreferrer"
              >
                <DocIcon />
                <span>View source documentation (PDF)</span>
                <span className="source-link-ext" aria-hidden="true">
                  <ExternalIcon />
                </span>
              </a>
            </div>
          </section>

          <div className="main-header">
            <div className="main-header-left">
              <h2 className="main-heading">
                {filter === 'all' ? 'All resources' : catFilterLabels[filter]}
              </h2>
              <p className="main-sub">
                {search
                  ? `${totalVisible} result${totalVisible !== 1 ? 's' : ''} for "${search}"`
                  : `${resources.length} resources across ${catOrder.length} categories`}
              </p>
            </div>
          </div>

          <div className="filter-pills" role="group" aria-label="Filter by category">
            {allCategories.map((cat) => (
              <button
                key={cat}
                className={`pill${filter === cat ? ' active' : ''}`}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
              >
                {catFilterLabels[cat]}
                {cat !== 'all' && (
                  <span style={{ opacity: 0.65, marginLeft: 4, fontSize: 12 }}>
                    {counts[cat] || 0}
                  </span>
                )}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="cards-grid">
              <div className="empty-state">
                <div className="empty-icon-wrap">
                  <EmptyIcon />
                </div>
                <p>No resources match your search</p>
                <span>Try a different keyword or clear the search</span>
              </div>
            </div>
          ) : (
            catOrder.map((cat) => {
              if (!groups[cat].length) return null
              return (
                <section className="comp-section" key={cat} aria-label={catLabels[cat]}>
                  <div className="section-header">
                    <span className="cat-stripe" style={{ background: catColors[cat] }} />
                    <span className="section-title">{catLabels[cat]}</span>
                    <span className="section-badge">{groups[cat].length}</span>
                  </div>
                  <div className="cards-grid">
                    {groups[cat].map((r) => (
                      <div
                        key={r.id}
                        className="comp-card"
                        data-cat={r.category}
                        onClick={() => openResource(r)}
                        tabIndex={0}
                        role="button"
                        aria-label={r.route ? `Open ${r.name} page` : `Open ${r.name} details`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            openResource(r)
                          }
                        }}
                      >
                        <div className="card-top">
                          <div className="card-icon-wrap">{icons[r.icon]}</div>
                          <span className="card-arrow">
                            <ArrowIcon />
                          </span>
                        </div>
                        <div className="card-name">{r.name}</div>
                        <div className="card-desc">{r.desc}</div>
                        <div className="card-footer">
                          <span className="card-type">{r.type}</span>
                          {r.route ? (
                            <span className="card-link-count">
                              Open page <ArrowIcon />
                            </span>
                          ) : (
                            <span className="card-link-count">
                              {r.links.length} {r.links.length === 1 ? 'link' : 'links'}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )
            })
          )}
        </main>
      </div>

      <footer className="site-footer">
        <span>
          <strong>EGR Web Resources</strong> · MSU College of Engineering
        </span>
        <span>
          Compiled from the{' '}
          <a href={SOURCE_PDF} target="_blank" rel="noopener noreferrer">
            Master Documentation
          </a>{' '}
          for the Student Front-End Web Assistant.
        </span>
      </footer>

      {activeRes && <ResourceDetailPanel res={activeRes} onClose={() => setActiveRes(null)} />}
    </>
  )
}
