import {
  UserPlus,
  Building2,
  Star,
  Bot,
  ArrowLeftRight,
  Coins,
  Vote,
  ChevronRight,
} from 'lucide-react'
import { SectionLabel, SectionTitle, SectionLead, FadeIn } from './Section'

const steps = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Create Digital Identity',
    desc: 'Mint your MAGAHOOD Passport — a blockchain profile with reputation, badges, and NFT ownership that becomes your citizen ID across the nation.',
    detail: 'Wallet connect · On-chain profile · Passport NFT',
  },
  {
    step: '02',
    icon: Building2,
    title: 'Join a Community City',
    desc: 'Enter Creator, Gaming, AI Research, Investor, or Builder City. Each city has its own territory, rules, economy, and reward system.',
    detail: 'Pick a city · Accept city rules · Unlock local markets',
  },
  {
    step: '03',
    icon: Star,
    title: 'Earn Reputation',
    desc: 'Build score through contributions, community activity, creative work, and ecosystem participation. Reputation unlocks access and status.',
    detail: 'Badges · Rank levels · Achievement proofs',
  },
  {
    step: '04',
    icon: Bot,
    title: 'Use AI Tools',
    desc: 'Deploy AI citizens for market analysis, content, community ops, automation, and personal Web3 assistance inside the ecosystem.',
    detail: 'Agent shop · Custom agents · AI services',
  },
  {
    step: '05',
    icon: ArrowLeftRight,
    title: 'Create & Trade Assets',
    desc: 'Launch NFTs, sell digital products, trade virtual assets, and build on MAGAHOOD Land — full ownership, no middleman platform tax.',
    detail: 'Marketplace · Land · Creator storefronts',
  },
  {
    step: '06',
    icon: Coins,
    title: 'Earn $MAGAHOOD',
    desc: 'Get rewarded for activity, staking, city contributions, academy progress, and value you create for the digital nation economy.',
    detail: 'Rewards · Staking · City incentives',
  },
  {
    step: '07',
    icon: Vote,
    title: 'Govern the Nation',
    desc: 'Stake and vote on ecosystem development, community rules, treasury usage, and the launch of new digital cities.',
    detail: 'Proposals · Voting power · Treasury voice',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 border-t border-border">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute inset-0 radial-glow opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <FadeIn>
          <SectionLabel>How It Works</SectionLabel>
          <SectionTitle>
            Your path into the{' '}
            <span className="text-primary">Digital Nation</span>
          </SectionTitle>
          <SectionLead>
            From identity to governance — one continuous flow that turns users into citizens,
            creators, and owners of the MAGAHOOD economy.
          </SectionLead>
        </FadeIn>

        {/* Flow strip (desktop) */}
        <FadeIn delay={0.1}>
          <div className="mt-12 hidden lg:flex items-center justify-between gap-1 rounded-2xl border border-primary/20 bg-card/50 px-4 py-4 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={s.step} className="flex items-center gap-1 min-w-0">
                <div className="flex flex-col items-center text-center px-2 py-1 min-w-[100px]">
                  <span className="text-[10px] font-bold text-primary mb-1">{s.step}</span>
                  <span className="text-[11px] text-white font-medium leading-tight line-clamp-2">
                    {s.title}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight size={14} className="text-primary/50 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Step cards */}
        <div className="mt-10 grid gap-4">
          {steps.map((s, i) => (
            <FadeIn key={s.step} delay={i * 0.05}>
              <article className="group relative grid md:grid-cols-[88px_1fr] gap-0 rounded-2xl border border-border bg-card/60 overflow-hidden card-hover">
                <div className="flex md:flex-col items-center justify-center gap-3 md:gap-2 bg-primary/5 border-b md:border-b-0 md:border-r border-border p-5 md:p-6">
                  <span className="font-display text-2xl font-bold text-primary/40 group-hover:text-primary transition-colors">
                    {s.step}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                    <s.icon size={20} className="text-primary" />
                  </div>
                </div>
                <div className="p-6 lg:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="max-w-2xl">
                    <h3 className="font-display text-lg font-bold text-white mb-2">{s.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="shrink-0 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 sm:max-w-[220px]">
                    <p className="text-[10px] uppercase tracking-wider text-primary mb-1">Includes</p>
                    <p className="text-xs text-muted leading-relaxed">{s.detail}</p>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
