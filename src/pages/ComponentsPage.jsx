import { useState, useEffect, useRef } from 'react'
import { components, catLabels, catOrder } from '../data/components'
import { icons, ArrowIcon, CloseIcon, ExternalIcon, DocIcon, EmptyIcon } from '../icons'
import SiteHeader from '../components/SiteHeader'

const SOURCE_PDF = `${import.meta.env.BASE_URL}content-source/drupal-user-guide.pdf`

const catColors = {
  content: '#077A56',
  media: '#4A7800',
  layout: '#006B06',
  navigation: '#006E2A',
  all: '#18453B',
}

const allCategories = ['all', 'content', 'media', 'layout', 'navigation']
const catFilterLabels = {
  all: 'All',
  content: 'Content',
  media: 'Media',
  layout: 'Layout',
  navigation: 'Navigation',
}
const catSidebarLabels = {
  all: 'All components',
  content: 'Content',
  media: 'Media',
  layout: 'Layout',
  navigation: 'Navigation',
}

function ComponentDetailPanel({ comp, onClose }) {
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
      <div className="detail-panel detail-panel--wide" data-cat={comp.category}>
        <div className="panel-head">
          {comp.preview && (
            <div className="panel-preview">
              <img
                src={`${import.meta.env.BASE_URL}${comp.preview.replace(/^\//, '')}`}
                alt={`${comp.name} preview`}
              />
            </div>
          )}
          <div className="panel-head-top">
            <div className="panel-icon-bg" aria-hidden="true">
              {icons[comp.icon]}
            </div>
            <div className="panel-meta">
              <div className="panel-name" id="panel-name">
                {comp.name}
              </div>
              <span className="panel-cat-badge">{catLabels[comp.category]}</span>
            </div>
            <button ref={closeRef} className="panel-close" onClick={onClose} aria-label="Close detail panel">
              <CloseIcon />
            </button>
          </div>
          <p className="panel-desc">{comp.desc}</p>
        </div>

        <div className="panel-body">
          <p className="steps-label">Step-by-step instructions</p>
          <ol className="steps-list" aria-label="Instructions">
            {comp.steps.map((step, i) => (
              <li className="step-item" key={i}>
                <div className="step-num" aria-hidden="true">
                  {i + 1}
                </div>
                <div className="step-content">
                  <div className="step-title">
                    {step.title}
                    {step.opt && <span className="step-opt-tag">optional</span>}
                  </div>
                  <div className="step-text" dangerouslySetInnerHTML={{ __html: step.text }} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default function ComponentsPage() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [activeComp, setActiveComp] = useState(null)

  const counts = {}
  components.forEach((c) => {
    counts[c.category] = (counts[c.category] || 0) + 1
  })

  const filtered = components.filter((c) => {
    const matchesFilter = filter === 'all' || c.category === filter
    const q = search.toLowerCase().trim()
    const matchesSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q) ||
      c.steps.some(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.text.toLowerCase().replace(/<[^>]+>/g, '').includes(q)
      )
    return matchesFilter && matchesSearch
  })

  const groups = {}
  catOrder.forEach((cat) => {
    groups[cat] = []
  })
  filtered.forEach((c) => groups[c.category].push(c))

  const totalVisible = filtered.length

  return (
    <>
      <SiteHeader active="components" search={search} setSearch={setSearch} placeholder="Search components…" />

      <div className="layout">
        {/* ── Sidebar ── */}
        <aside className="sidebar" aria-label="Component navigation">
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
                  <span className="filter-btn-text">{catSidebarLabels[cat]}</span>
                  <span className="filter-count">
                    {cat === 'all' ? components.length : counts[cat] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-divider" />

          <div className="sidebar-group">
            <span className="sidebar-label">All components</span>
            <ul className="sidebar-nav" aria-label="Component list">
              {components.map((c) => (
                <li
                  key={c.id}
                  className={`sidebar-nav-item${activeComp?.id === c.id ? ' active' : ''}`}
                >
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveComp(c)
                    }}
                  >
                    <span className="nav-cat-dot" style={{ background: catColors[c.category] }} />
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="main">
          <div className="main-header">
            <div className="main-header-left">
              <h1 className="main-heading">Component Reference</h1>
              <p className="main-sub">
                {search
                  ? `${totalVisible} result${totalVisible !== 1 ? 's' : ''} for "${search}"`
                  : `${components.length} components across ${catOrder.length} categories`}
              </p>
            </div>
            <div className="main-header-right">
              <a
                className="source-link"
                href={SOURCE_PDF}
                target="_blank"
                rel="noopener noreferrer"
              >
                <DocIcon />
                <span>View source guide (PDF)</span>
                <span className="source-link-ext" aria-hidden="true">
                  <ExternalIcon />
                </span>
              </a>
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
                <p>No components match your search</p>
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
                    {groups[cat].map((c) => (
                      <div
                        key={c.id}
                        className="comp-card"
                        data-cat={c.category}
                        onClick={() => setActiveComp(c)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Open ${c.name} guide`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setActiveComp(c)
                          }
                        }}
                      >
                        <div className="card-top">
                          <div className="card-icon-wrap">{icons[c.icon]}</div>
                          <span className="card-arrow">
                            <ArrowIcon />
                          </span>
                        </div>
                        <div className="card-name">{c.name}</div>
                        <div className="card-desc">{c.desc}</div>
                        <div className="card-footer">
                          <span className="card-link-count">{c.steps.length} steps</span>
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
          <strong>EGR Component Reference</strong> · MSU College of Engineering
        </span>
        <span>
          Drupal CMS component build guide. Source:{' '}
          <a href={SOURCE_PDF} target="_blank" rel="noopener noreferrer">
            Drupal User Guide (PDF)
          </a>
          .
        </span>
      </footer>

      {activeComp && <ComponentDetailPanel comp={activeComp} onClose={() => setActiveComp(null)} />}
    </>
  )
}
