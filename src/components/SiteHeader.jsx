import { SearchIcon } from '../icons'

const navItems = [
  { key: 'resources', route: '#/', label: 'Resources' },
  { key: 'components', route: '#/components', label: 'Components' },
]

export default function SiteHeader({ active, search, setSearch, placeholder }) {
  return (
    <header className="site-header">
      <a className="header-brand" href="#/" aria-label="EGR Web Assistant home">
        <div className="header-brand-mark">EGR</div>
        <div className="header-brand-text">
          <span className="header-brand-title">Web Assistant</span>
          <span className="header-brand-sub">MSU College of Engineering</span>
        </div>
      </a>

      <nav className="header-nav" aria-label="Primary">
        {navItems.map((item) => (
          <a
            key={item.key}
            href={item.route}
            className={active === item.key ? 'active' : ''}
            aria-current={active === item.key ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-search">
        <span className="header-search-icon" aria-hidden="true">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder={placeholder}
          aria-label={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </header>
  )
}
