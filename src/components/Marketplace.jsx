import { Image, Package, Bot, Map, GraduationCap, Layers } from 'lucide-react'
import { SectionLabel, SectionTitle, SectionLead, FadeIn } from './Section'

const items = [
  { icon: Image, title: 'NFTs', desc: 'Collections, identity, and cultural assets with true ownership.' },
  { icon: Package, title: 'Digital Products', desc: 'Tools, templates, and creator goods sold peer-to-peer.' },
  { icon: Bot, title: 'AI Agents', desc: 'Trade and license intelligent citizens for any workflow.' },
  { icon: Layers, title: 'Virtual Assets', desc: 'Items, experiences, and economy modules across cities.' },
  { icon: Map, title: 'MAGAHOOD Land', desc: 'Virtual spaces to build businesses, events, and worlds.' },
  { icon: GraduationCap, title: 'Academy', desc: 'Learn blockchain, AI, trading & creator skills — earn $MAGAHOOD.' },
]

export default function Marketplace() {
  return (
    <section id="marketplace" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <FadeIn>
          <SectionLabel>Marketplace & Assets</SectionLabel>
          <SectionTitle>
            Own, trade, and{' '}
            <span className="text-primary">build value</span>
          </SectionTitle>
          <SectionLead>
            A decentralized marketplace for NFTs, digital products, AI agents, virtual assets, and
            creator content — plus land and learning powered by $MAGAHOOD.
          </SectionLead>
        </FadeIn>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-border bg-card/60 p-7 card-hover">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-void group-hover:glow-primary transition-shadow">
                  <item.icon size={22} />
                </div>
                <h3 className="font-display font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
