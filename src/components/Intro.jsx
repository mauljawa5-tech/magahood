import { Fingerprint, Users, Bot, Palette, Coins } from 'lucide-react'
import { SectionLabel, SectionTitle, SectionLead, FadeIn } from './Section'

const pillars = [
  {
    icon: Fingerprint,
    title: 'Digital Identity',
    desc: 'Blockchain profiles, reputation scores, badges, and NFT passports you truly own.',
  },
  {
    icon: Users,
    title: 'Community Cities',
    desc: 'Decentralized digital territories with their own rules, economies, and rewards.',
  },
  {
    icon: Bot,
    title: 'AI Citizens',
    desc: 'AI agents that analyze markets, create content, and assist your Web3 life.',
  },
  {
    icon: Palette,
    title: 'Creator Economy',
    desc: 'Launch NFTs, sell products, run subscriptions — no platform takes your audience.',
  },
  {
    icon: Coins,
    title: 'Economic Layer',
    desc: '$MAGAHOOD powers payments, governance, land, marketplace, and AI services.',
  },
]

export default function Intro() {
  return (
    <section id="intro" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <FadeIn>
          <SectionLabel>Digital Nation</SectionLabel>
          <SectionTitle>
            A blockchain-powered{' '}
            <span className="text-primary">civilization layer</span>
          </SectionTitle>
          <SectionLead>
            The internet connects people, but ownership stays centralized. MAGAHOOD builds a
            decentralized society where users own identity, communities run economies, and AI
            participates in value creation.
          </SectionLead>
        </FadeIn>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {pillars.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-card/60 p-6 card-hover">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                  <p.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
