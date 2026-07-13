import { Scale, Landmark, Users, MapPinned } from 'lucide-react'
import { SectionLabel, SectionTitle, SectionLead, FadeIn } from './Section'

const powers = [
  { icon: Scale, title: 'Ecosystem Development', desc: 'Vote on protocol upgrades and product priorities.' },
  { icon: Users, title: 'Community Rules', desc: 'Shape policies that govern digital cities and citizens.' },
  { icon: Landmark, title: 'Treasury Usage', desc: 'Direct how nation resources fund growth and builders.' },
  { icon: MapPinned, title: 'New Digital Cities', desc: 'Approve and fund new territories in the nation.' },
]

export default function Governance() {
  return (
    <section id="governance" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <FadeIn>
            <SectionLabel>Governance</SectionLabel>
            <SectionTitle>
              Holders become{' '}
              <span className="text-primary">citizens with power</span>
            </SectionTitle>
            <SectionLead>
              Token holders decide the future of the digital nation. Governance transforms users
              into citizens with real voting power over development, rules, treasury, and cities.
            </SectionLead>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4">
            {powers.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-card/70 p-6 h-full card-hover">
                  <p.icon size={20} className="text-primary mb-3" />
                  <h3 className="font-semibold text-white text-sm mb-2">{p.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
