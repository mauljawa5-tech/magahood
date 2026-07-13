import { Gamepad2, LineChart, Palette, Cpu, Hammer } from 'lucide-react'
import { SectionLabel, SectionTitle, SectionLead, FadeIn } from './Section'

const cities = [
  {
    icon: Palette,
    name: 'Creator City',
    desc: 'NFT launches, content studios, and independent creator businesses.',
  },
  {
    icon: Gamepad2,
    name: 'Gaming City',
    desc: 'Play-to-own worlds, tournaments, and player-driven economies.',
  },
  {
    icon: Cpu,
    name: 'AI Research City',
    desc: 'Agent labs, automation markets, and open AI experiments.',
  },
  {
    icon: LineChart,
    name: 'Investor City',
    desc: 'Deal flow, DAO funds, and on-chain treasury coordination.',
  },
  {
    icon: Hammer,
    name: 'Builder City',
    desc: 'Dev hubs, hackathons, and infrastructure for the digital nation.',
  },
]

export default function Cities() {
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
          {cities.map((city, i) => (
            <FadeIn key={city.name} delay={i * 0.07}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/70 p-7 card-hover">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
                  <city.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{city.name}</h3>
                <p className="text-sm text-muted leading-relaxed">{city.desc}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {['Territory', 'Governance', 'Economy'].map((tag) => (
                    <li
                      key={tag}
                      className="text-[10px] uppercase tracking-wider text-primary/70 border border-primary/15 rounded px-2 py-0.5"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}

          <FadeIn delay={0.35}>
            <article className="h-full rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-7 flex flex-col items-center justify-center text-center card-hover">
              <p className="font-display text-lg font-bold text-primary mb-2">Your City Next</p>
              <p className="text-sm text-muted max-w-xs">
                Launch a community city, set the rules, and grow a sovereign digital economy.
              </p>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
