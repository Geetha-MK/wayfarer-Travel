import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-stone/15 bg-paper/90 backdrop-blur">
      <a
        href="#main"
        className="absolute left-2 top-2 -translate-y-16 rounded bg-ink px-3 py-2 text-sm text-paper focus:translate-y-0"
      >
        Skip to content
      </a>
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Primary">
        <NavLink to="/" className="font-display text-xl font-semibold tracking-tight text-ink" onClick={() => setOpen(false)}>
          Wayfarer
        </NavLink>

        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-pine' : 'text-ink/70 hover:text-ink'}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/explore" className="btn-primary !py-2 !text-xs">
              Start planning
            </NavLink>
          </li>
        </ul>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-stone/30 sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {open ? (
              <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.6" />
            ) : (
              <path d="M1 4H17M1 9H17M1 14H17" stroke="currentColor" strokeWidth="1.6" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-stone/15 bg-paper sm:hidden">
          <ul className="container-page flex flex-col gap-1 py-3">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-sm px-2 py-2.5 text-sm font-medium ${
                      isActive ? 'bg-ink/5 text-pine' : 'text-ink/80'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
