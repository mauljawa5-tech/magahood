import { CheckCircle2, Circle, Rocket } from 'lucide-react'
import { SectionLabel, SectionTitle, SectionLead, FadeIn } from './Section'

const phases = [
  {
    phase: '01',
    title: 'Foundation',
    status: 'current',
    statusLabel: 'In Progress',
    summary: 'Launch the base layer: identity, token, community, and wallet access.',
    items: [
      'MAGAHOOD identity system',
      'Token launch on Robinhood Chain',
      'Community formation & channels',
      'Wallet integration',
    ],
    outcome: 'Citizens can hold $MAGAHOOD and begin onboarding.',
  },
  {
    phase: '02',
    title: 'Digital Nation',
    status: 'upcoming',
    statusLabel: 'Next',
    summary: 'Open cities, NFT passports, marketplace, and live governance.',
    items: [
      'Community cities launch',
      'NFT identity system',
      'Marketplace release',
      'Governance activation',
    ],
    outcome: 'Mini-economies and on-chain voting go live.',
  },
  {
    phase: '03',
    title: 'AI Society',
    status: 'planned',
    statusLabel: 'Planned',
    summary: 'AI citizens join the economy as assistants and marketplace products.',
    items: [
      'AI citizen network',
      'AI marketplace',
      'Personal AI agents',
      'Automation tools',
    ],
    outcome: 'Agents become first-class economic participants.',
  },
  {
    phase: '04',
    title: 'Virtual Economy',
    status: 'planned',
    statusLabel: 'Planned',
    summary: 'Land, gaming, creators, and multi-chain expansion.',
    items: [
      'Digital land',
      'Gaming ecosystem',
      'Creator economy expansion',
      'Cross-chain integration',
    ],
    outcome: 'Full virtual commerce and spatial experiences.',
  },
  {
    phase: '05',
    title: 'Global Digital Nation',
    status: 'planned',
    statusLabel: 'Vision',
    summary: 'Scale to a worldwide decentralized society.',
    items: [
      'Millions of users',
      'Enterprise partnerships',
      'Global Web3 adoption',
      'Decentralized digital society',
    ],
    outcome: 'MAGAHOOD as a civilization layer of the internet.',
  },
]

const statusStyles = {
  current: {
    badge: 'bg-primary text-void',
    border: 'border-primary/40',
    glow: true,
    dot: 'bg-primary',
  },
  upcoming: {
    badge: 'bg-primary/15 text-primary border border-primary/30',
    border: 'border-primary/20',
    glow: false,
    dot: 'bg-primary/70',
  },
  planned: {
    badge: 'bg-border text-muted',
    border: 'border-border',
    glow: false,
    dot: 'bg-muted',
  },
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-24 lg:py-32 border-t border-border">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <FadeIn>
          <SectionLabel>Roadmap</SectionLabel>
          <SectionTitle>
            From foundation to{' '}
            <span className="text-primary">global nation</span>
          </SectionTitle>
          <SectionLead>
            Five phases to build the civilization layer of the next internet — identity first,
            then cities, AI, virtual economy, and global scale.
          </SectionLead>
        </FadeIn>

        {/* Phase progress pills */}
        <FadeIn delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2">
            {phases.map((p) => (
              <span
                key={p.phase}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${statusStyles[p.status].badge}`}
              >
                {p.status === 'current' ? (
                  <Rocket size={12} />
                ) : p.status === 'upcoming' ? (
                  <Circle size={12} />
                ) : (
                  <CheckCircle2 size={12} className="opacity-50" />
                )}
                Phase {p.phase} · {p.title}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="mt-14 relative">
          {/* Vertical line mobile / left rail desktop */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" />

          <div className="space-y-6">
            {phases.map((p, i) => {
              const style = statusStyles[p.status]
              return (
                <FadeIn key={p.phase} delay={i * 0.06}>
                  <div className="relative pl-12 md:pl-16">
                    <div
                      className={`absolute left-[0.7rem] top-8 h-3.5 w-3.5 rounded-full ring-4 ring-void ${style.dot} ${
                        style.glow ? 'glow-primary' : ''
                      }`}
                    />

                    <article
                      className={`rounded-2xl border bg-card/70 p-6 lg:p-8 card-hover ${style.border} ${
                        style.glow ? 'border-glow' : ''
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-5">
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="font-display text-sm font-bold text-primary">
                              PHASE {p.phase}
                            </span>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style.badge}`}
                            >
                              {p.statusLabel}
                            </span>
                          </div>
                          <h3 className="font-display text-xl lg:text-2xl font-bold text-white">
                            {p.title}
                          </h3>
                          <p className="mt-2 text-sm text-muted max-w-xl leading-relaxed">
                            {p.summary}
                          </p>
                        </div>
                        <div className="shrink-0 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 lg:max-w-[260px]">
                          <p className="text-[10px] uppercase tracking-wider text-primary mb-1">
                            Outcome
                          </p>
                          <p className="text-xs text-muted leading-relaxed">{p.outcome}</p>
                        </div>
                      </div>

                      <ul className="grid sm:grid-cols-2 gap-2.5">
                        {p.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2.5 rounded-lg border border-border bg-surface/60 px-3 py-2.5 text-sm text-white/90"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
