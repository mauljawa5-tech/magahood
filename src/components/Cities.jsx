import { Gamepad2, LineChart, Palette, Cpu, Hammer, Check } from 'lucide-react'
import { SectionLabel, SectionTitle, SectionLead, FadeIn } from './Section'
import { CITIES } from '../data/config'
import { useApp } from '../context/AppContext'

const iconMap = {
  Palette,
  Gamepad2,
  Cpu,
  LineChart,
  Hammer,
}

export default function Cities() {
  const { openModal, joinedCities, joinCity } = useApp()

  return (
    <section id="cities" className="relative py-24 lg:py-32 border-t border-border">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <FadeIn>
          <SectionLabel>Community Cities</SectionLabel>
          <SectionTitle>
            Decentralized{' '}
            <span className="text-primary">digital territories</span>
          </SectionTitle>
          <SectionLead>
            Each community creates its own virtual territory, rules, economy, rewards, and
            marketplace — mini digital economies connected through $MAGAHOOD.
          </SectionLead>
        </FadeIn>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CITIES.map((city, i) => {
            const Icon = iconMap[city.icon] || Palette
            const joined = joinedCities.includes(city.id)
            return (
              <FadeIn key={city.id} delay={i * 0.07}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/70 p-7 card-hover flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
                      <Icon size={22} className="text-primary" />
                    </div>
                    {joined && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 border border-primary/30 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        <Check size={10} /> Joined
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{city.name}</h3>
                  <p className="text-sm text-muted leading-relaxed flex-1">{city.desc}</p>
                  <p className="mt-3 text-[11px] text-primary/80">
                    {city.members.toLocaleString()} members · {city.focus}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {['Territory', 'Governance', 'Economy'].map((tag) => (
                      <li
                        key={tag}
                        className="text-[10px] uppercase tracking-wider text-primary/70 border border-primary/15 rounded px-2 py-0.5"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex gap-2">
                    <button
                      type="button"
                      onClick={() => openModal('city', { city, joined })}
                      className="flex-1 rounded-full border border-border py-2 text-xs font-semibold text-muted hover:text-primary hover:border-primary/30"
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (joined) openModal('city', { city, joined })
                        else joinCity(city.id)
                      }}
                      className="flex-1 rounded-full bg-primary py-2 text-xs font-bold text-void hover:bg-primary-glow"
                    >
                      {joined ? 'Open' : 'Join City'}
                    </button>
                  </div>
                </article>
              </FadeIn>
            )
          })}

          <FadeIn delay={0.35}>
            <article className="h-full rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-7 flex flex-col items-center justify-center text-center card-hover">
              <p className="font-display text-lg font-bold text-primary mb-2">Your City Next</p>
              <p className="text-sm text-muted max-w-xs mb-5">
                Launch a community city, set the rules, and grow a sovereign digital economy.
              </p>
              <button
                type="button"
                onClick={() => openModal('create-city')}
                className="rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-void"
              >
                Propose City
              </button>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
