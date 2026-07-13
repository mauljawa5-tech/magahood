import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const links = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#token', label: 'Token' },
  { href: '#details', label: 'Details' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#cities', label: 'Cities' },
  { href: '#ai', label: 'AI' },
  { href: '#governance', label: 'Governance' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-void/90 backdrop-blur-xl border-b border-primary/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#hero" className="group">
          <Logo
            variant="full"
            markClassName="h-9 w-9 transition-transform group-hover:scale-105"
            className="group-hover:opacity-95"
          />
        </a>

        <ul className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#community"
            className="rounded-full border border-primary/40 px-5 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
          >
            Join Nation
          </a>
          <a
            href="#token"
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-void hover:bg-primary-glow transition-colors glow-primary"
          >
            $MAGAHOOD
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden text-primary p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-primary/10 bg-void/98 backdrop-blur-xl px-5 py-6">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-muted hover:text-primary transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#community"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-void"
              >
                Join Nation
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
