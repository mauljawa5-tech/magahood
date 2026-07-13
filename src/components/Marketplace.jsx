import { useMemo, useState } from 'react'
import { Image, Package, Bot, Map, GraduationCap, Layers, ShoppingCart } from 'lucide-react'
import { SectionLabel, SectionTitle, SectionLead, FadeIn } from './Section'
import { MARKET_LISTINGS } from '../data/config'
import { useApp } from '../context/AppContext'

const categories = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'nfts', label: 'NFTs', icon: Image },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'agents', label: 'AI Agents', icon: Bot },
  { id: 'land', label: 'Land', icon: Map },
  { id: 'assets', label: 'Assets', icon: Layers },
  { id: 'academy', label: 'Academy', icon: GraduationCap },
]

export default function Marketplace() {
  const [filter, setFilter] = useState('all')
  const { openModal, ownedListings, balance } = useApp()

  const listings = useMemo(() => {
    if (filter === 'all') return MARKET_LISTINGS
    return MARKET_LISTINGS.filter((l) => l.category === filter)
  }, [filter])

  return (
    <section id="marketplace" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <SectionLabel>Marketplace & Assets</SectionLabel>
              <SectionTitle>
                Own, trade, and{' '}
                <span className="text-primary">build value</span>
              </SectionTitle>
              <SectionLead>
                Browse demo listings — buy with $MAGAHOOD. Owned items are saved in your local inventory.
              </SectionLead>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
              <span className="text-muted">Balance: </span>
              <span className="text-primary font-bold">{balance.toLocaleString()} $MAGAHOOD</span>
              <button
                type="button"
                onClick={() => openModal('token')}
                className="ml-3 text-xs font-semibold text-primary underline-offset-2 hover:underline"
              >
                Top up
              </button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mt-10 flex flex-wrap gap-2">
            {categories.map((c) => {
              const Icon = c.icon
              const active = filter === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFilter(c.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-colors ${
                    active
                      ? 'bg-primary text-void border-primary'
                      : 'border-border text-muted hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  <Icon size={12} />
                  {c.label}
                </button>
              )
            })}
          </div>
        </FadeIn>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {listings.map((item, i) => {
            const owned = ownedListings.includes(item.id)
            return (
              <FadeIn key={item.id} delay={i * 0.04}>
                <article className="h-full rounded-2xl border border-border bg-card/60 p-5 card-hover flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                      {item.tag}
                    </span>
                    {owned && (
                      <span className="text-[10px] font-bold uppercase text-primary">Owned</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1 leading-snug">{item.title}</h3>
                  <p className="text-[11px] text-muted mb-4">Seller {item.seller}</p>
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <p className="font-bold text-primary">
                      {item.price}{' '}
                      <span className="text-[10px] font-medium text-muted">MH</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => openModal('listing', { listing: item })}
                      className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold text-void hover:bg-primary-glow"
                    >
                      <ShoppingCart size={12} />
                      {owned ? 'View' : 'Buy'}
                    </button>
                  </div>
                </article>
              </FadeIn>
            )
          })}
        </div>

        {listings.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted">No listings in this category.</p>
        )}
      </div>
    </section>
  )
}
