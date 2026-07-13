import { useState, useEffect } from 'react'
import { Menu, X, Wallet, ChevronDown } from 'lucide-react'
import Logo from './Logo'
import { useApp } from '../context/AppContext'

const links = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#token', label: 'Token' },
  { href: '#details', label: 'Details' },
  { href: '#marketplace', label: 'Market' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#cities', label: 'Cities' },
  { href: '#governance', label: 'Gov' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const {
    isConnected,
    shortWallet,
    balance,
    citizen,
    openModal,
    connecting,
    networkOk,
  } = useApp()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [menuOpen])

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

        <ul className="hidden lg:flex items-center gap-6">
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

        <div className="hidden lg:flex items-center gap-2">
          <button
            type="button"
            onClick={() => openModal('citizenship')}
            className="rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
          >
            {citizen ? `Citizen #${citizen.id}` : 'Join Nation'}
          </button>

          {isConnected ? (
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-void hover:bg-primary-glow glow-primary"
              >
                <Wallet size={14} />
                <span className={!networkOk ? 'opacity-80' : ''}>{shortWallet}</span>
                {!networkOk && (
                  <span className="text-[10px] font-bold text-void/80">!</span>
                )}
                <span className="text-[10px] opacity-80">{Math.floor(balance)} MH</span>
                <ChevronDown size={14} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-border bg-card shadow-xl py-2 z-50">
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left text-sm text-muted hover:text-primary hover:bg-primary/5"
                    onClick={() => {
                      setMenuOpen(false)
                      openModal('wallet')
                    }}
                  >
                    Wallet details
                  </button>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left text-sm text-muted hover:text-primary hover:bg-primary/5"
                    onClick={() => {
                      setMenuOpen(false)
                      openModal('token')
                    }}
                  >
                    Get $MAGAHOOD
                  </button>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left text-sm text-muted hover:text-primary hover:bg-primary/5"
                    onClick={() => {
                      setMenuOpen(false)
                      openModal('stake')
                    }}
                  >
                    Stake tokens
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              disabled={connecting}
              onClick={() => openModal('wallet')}
              className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-void hover:bg-primary-glow transition-colors glow-primary disabled:opacity-60"
            >
              {connecting ? 'Connecting…' : 'Connect Wallet'}
            </button>
          )}
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
            <li className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  openModal('citizenship')
                }}
                className="rounded-full border border-primary/40 px-6 py-2.5 text-sm font-semibold text-primary"
              >
                {citizen ? `Citizen #${citizen.id}` : 'Join Nation'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  openModal(isConnected ? 'wallet' : 'wallet')
                }}
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-void"
              >
                {isConnected ? shortWallet : 'Connect Wallet'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
