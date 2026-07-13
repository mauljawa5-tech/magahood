import {
  Vote,
  Wallet,
  Gift,
  Landmark,
  ShoppingBag,
  Cpu,
  Map,
  Bot,
  Users,
  Shield,
  Zap,
  CircleDollarSign,
} from 'lucide-react'
import { SectionLabel, SectionTitle, SectionLead, FadeIn } from './Section'

const utilities = [
  {
    icon: Wallet,
    title: 'Digital Citizenship',
    desc: 'Holding $MAGAHOOD grants access to the MAGAHOOD ecosystem as a recognized digital citizen.',
    items: [
      'Create digital identity & passport',
      'Join community cities',
      'Access exclusive areas',
      'Participate in nation events',
    ],
  },
  {
    icon: Vote,
    title: 'Governance Power',
    desc: 'Token holders decide the direction of the digital nation — true citizen voting power.',
    items: [
      'Ecosystem development votes',
      'Community rules & policies',
      'Treasury allocation',
      'Approve new digital cities',
    ],
  },
  {
    icon: ShoppingBag,
    title: 'Digital Economy',
    desc: '$MAGAHOOD is the base currency for commerce across the civilization layer.',
    items: [
      'Virtual goods & land payments',
      'NFT & asset transactions',
      'AI service fees',
      'Creator payments & tips',
    ],
  },
  {
    icon: Gift,
    title: 'Staking & Citizenship Rewards',
    desc: 'Stake $MAGAHOOD to receive ongoing citizen rewards and loyalty benefits.',
    items: [
      'Citizen reward emissions',
      'Loyalty & tier benefits',
      'Ecosystem incentives',
      'Exclusive stake-gated access',
    ],
  },
]

const useCases = [
  { icon: Map, label: 'Digital Land', text: 'Buy, develop, and trade virtual territories' },
  { icon: Bot, label: 'AI Services', text: 'Pay agents for analysis, content & automation' },
  { icon: Users, label: 'Community Rewards', text: 'Incentives for city growth & contribution' },
  { icon: Shield, label: 'Identity Gate', text: 'Unlock premium passport tiers & badges' },
  { icon: Zap, label: 'Marketplace Gas', text: 'Settle trades for NFTs, products & agents' },
  { icon: CircleDollarSign, label: 'Creator Economy', text: 'Subscriptions, drops & direct support' },
]

const allocation = [
  {
    label: 'Digital Nation Rewards',
    pct: 35,
    color: '#C6F700',
    note: 'Citizen rewards, staking, activity incentives',
  },
  {
    label: 'Ecosystem Development',
    pct: 25,
    color: '#a3cc00',
    note: 'Products, cities, partnerships, integrations',
  },
  {
    label: 'Liquidity',
    pct: 15,
    color: '#7a9900',
    note: 'DEX / CEX liquidity & market depth',
  },
  {
    label: 'Community Growth',
    pct: 15,
    color: '#5c7300',
    note: 'Campaigns, ambassadors, academy rewards',
  },
  {
    label: 'Core Development',
    pct: 10,
    color: '#3d4d00',
    note: 'Team, protocol, security & infrastructure',
  },
]

const tokenFacts = [
  { label: 'Token Name', value: 'MAGAHOOD' },
  { label: 'Ticker', value: '$MAGAHOOD' },
  { label: 'Network', value: 'Robinhood Chain' },
  { label: 'Total Supply', value: '1,000,000,000' },
  { label: 'Category', value: 'Digital Nation / SocialFi / AI' },
  { label: 'Type', value: 'Utility + Governance' },
]

export default function TokenUtility() {
  return (
    <section id="token" className="relative py-24 lg:py-32 border-t border-border">
      <div className="absolute inset-0 radial-glow opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <FadeIn>
          <SectionLabel>Token Utility</SectionLabel>
          <SectionTitle>
            $MAGAHOOD powers the{' '}
            <span className="text-primary">digital nation</span>
          </SectionTitle>
          <SectionLead>
            Payments, governance, digital land, NFT assets, marketplace trades, community rewards,
            and AI services — one economic currency for the entire civilization layer.
          </SectionLead>
        </FadeIn>

        {/* Token facts strip */}
        <FadeIn delay={0.08}>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {tokenFacts.map((f) => (
              <div
                key={f.label}
                className="rounded-xl border border-border bg-card/60 px-4 py-3 text-center"
              >
                <p className="text-[10px] uppercase tracking-wider text-muted mb-1">{f.label}</p>
                <p className="text-sm font-semibold text-primary break-words">{f.value}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* 4 utility pillars */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {utilities.map((u, i) => (
            <FadeIn key={u.title} delay={i * 0.07}>
              <div className="h-full rounded-2xl border border-border bg-card/70 p-6 card-hover flex flex-col">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  <u.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-semibold text-white mb-2">{u.title}</h3>
                <p className="text-xs text-muted leading-relaxed mb-4">{u.desc}</p>
                <ul className="space-y-2 mt-auto">
                  {u.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Where token is used */}
        <FadeIn delay={0.15}>
          <div className="mt-14">
            <h3 className="font-display text-lg font-bold text-white mb-6">
              Where <span className="text-primary">$MAGAHOOD</span> is used
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {useCases.map((c) => (
                <div
                  key={c.label}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-surface/80 p-5 card-hover"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-void">
                    <c.icon size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white mb-1">{c.label}</p>
                    <p className="text-xs text-muted leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Tokenomics */}
        <FadeIn delay={0.2}>
          <div className="mt-16 rounded-3xl border border-primary/20 bg-card/80 p-8 lg:p-10 border-glow">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <p className="text-xs tracking-widest uppercase text-primary mb-2">Tokenomics</p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold">
                  1,000,000,000 <span className="text-primary">$MAGAHOOD</span>
                </h3>
                <p className="text-sm text-muted mt-2">
                  Fixed total supply on Robinhood Chain · Utility & governance token
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                <span className="inline-flex items-center gap-2">
                  <Landmark size={16} className="text-primary" />
                  Total Supply Fixed
                </span>
                <span className="inline-flex items-center gap-2">
                  <Cpu size={16} className="text-primary" />
                  Utility Token
                </span>
              </div>
            </div>

            {/* Visual allocation bar */}
            <div className="mb-8 h-4 rounded-full overflow-hidden flex border border-border">
              {allocation.map((a) => (
                <div
                  key={a.label}
                  style={{ width: `${a.pct}%`, backgroundColor: a.color }}
                  title={`${a.label}: ${a.pct}%`}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                />
              ))}
            </div>

            <div className="space-y-5">
              {allocation.map((a) => (
                <div key={a.label}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: a.color }}
                      />
                      <span className="text-white text-sm font-medium">{a.label}</span>
                    </div>
                    <div className="flex items-center gap-3 sm:pl-0 pl-4">
                      <span className="text-xs text-muted hidden sm:inline">{a.note}</span>
                      <span className="font-semibold text-primary text-sm tabular-nums">{a.pct}%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted sm:hidden mb-2 pl-4">{a.note}</p>
                  <div className="h-2 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${a.pct}%`, backgroundColor: a.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs text-muted border-t border-border pt-6">
              Allocation prioritizes long-term nation rewards (35%) and ecosystem growth (25%),
              with balanced liquidity, community programs, and core development funding.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
