import { Award, BadgeCheck, IdCard, Star } from 'lucide-react'
import { SectionLabel, SectionTitle, SectionLead, FadeIn } from './Section'
import { LogoMark } from './Logo'
import { useApp } from '../context/AppContext'

const features = [
  { icon: IdCard, title: 'Blockchain Profile', desc: 'Unique Web3 identity anchored on-chain' },
  { icon: Star, title: 'Reputation Score', desc: 'Earn status through real ecosystem activity' },
  { icon: Award, title: 'Achievement Badges', desc: 'On-chain proof of contributions & milestones' },
  { icon: BadgeCheck, title: 'NFT Identity', desc: 'Your passport is a digital asset you own' },
]

export default function Identity() {
  const { citizen, openModal, joinedCities } = useApp()
  const rep = citizen?.reputation ?? 0
  const contrib = Math.min(100, rep * 2)
  const rank = Math.min(100, rep * 3 + (joinedCities.length * 10))

  return (
    <section id="identity" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <SectionLabel>Identity System</SectionLabel>
            <SectionTitle>
              Your identity is your{' '}
              <span className="text-primary">reputation asset</span>
            </SectionTitle>
            <SectionLead>
              Every user creates a unique Web3 identity inside MAGAHOOD. Build reputation through
              contributions, community activity, creative work, and ecosystem participation.
            </SectionLead>

            <button
              type="button"
              onClick={() => openModal('citizenship')}
              className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-void hover:bg-primary-glow"
            >
              {citizen ? 'View My Passport' : 'Create Digital Identity'}
            </button>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-border bg-card/50 p-5 card-hover"
                >
                  <f.icon size={18} className="text-primary mb-3" />
                  <h4 className="font-semibold text-sm text-white mb-1">{f.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl" />
              <div className="relative rounded-3xl border border-primary/30 bg-card p-8 glow-primary overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-xs tracking-widest text-primary uppercase mb-1">
                      MAGAHOOD Passport
                    </p>
                    <p className="font-display text-xl font-bold">
                      {citizen
                        ? `${citizen.displayName} #${citizen.id}`
                        : 'Digital Citizen #·····'}
                    </p>
                  </div>
                  <LogoMark className="h-12 w-12" />
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    { label: 'Reputation', value: citizen ? rep : 12 },
                    { label: 'Contributions', value: citizen ? contrib : 8 },
                    { label: 'Community Rank', value: citizen ? rank : 5 },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-muted">{stat.label}</span>
                        <span className="text-primary font-medium">{stat.value}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${Math.min(100, stat.value)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {(citizen
                    ? [
                        'Citizen',
                        ...(joinedCities.length ? ['City Member'] : []),
                        ...(rep >= 20 ? ['Active'] : ['Newcomer']),
                        ...(rep >= 50 ? ['Governor'] : []),
                      ]
                    : ['Unclaimed']
                  ).map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
