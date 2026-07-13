import {
  IdCard,
  Map,
  Store,
  GraduationCap,
  Fingerprint,
  Award,
  Building,
  Calendar,
  Image,
  Bot,
  Package,
  Layers,
  BookOpen,
  Brain,
  TrendingUp,
  Palette,
} from 'lucide-react'
import { SectionLabel, SectionTitle, SectionLead, FadeIn } from './Section'

const modules = [
  {
    id: 'passport',
    icon: IdCard,
    tag: 'Identity Layer',
    title: 'MAGAHOOD Passport',
    desc: 'A blockchain identity that represents who you are in the digital nation — not just a login, but a portable reputation asset.',
    features: [
      { icon: Fingerprint, label: 'User reputation score' },
      { icon: Award, label: 'On-chain achievements' },
      { icon: Building, label: 'City memberships' },
      { icon: Layers, label: 'Digital ownership proof' },
    ],
    highlight: 'Your passport travels with you across cities, markets, and governance.',
  },
  {
    id: 'land',
    icon: Map,
    tag: 'Spatial Layer',
    title: 'MAGAHOOD Land',
    desc: 'Virtual spaces where users and communities build experiences, host events, and grow digital businesses on owned territory.',
    features: [
      { icon: Building, label: 'Build experiences' },
      { icon: Store, label: 'Create businesses' },
      { icon: Calendar, label: 'Host events' },
      { icon: Map, label: 'Develop environments' },
    ],
    highlight: 'Land is scarce digital real estate tied to $MAGAHOOD utility.',
  },
  {
    id: 'market',
    icon: Store,
    tag: 'Commerce Layer',
    title: 'MAGAHOOD Marketplace',
    desc: 'A decentralized marketplace for culture, tools, intelligence, and creator value — peer-to-peer with no platform gatekeeper.',
    features: [
      { icon: Image, label: 'NFTs & collections' },
      { icon: Package, label: 'Digital products' },
      { icon: Bot, label: 'AI agents' },
      { icon: Layers, label: 'Virtual assets & content' },
    ],
    highlight: 'Trade freely. Creators keep ownership of audience and assets.',
  },
  {
    id: 'academy',
    icon: GraduationCap,
    tag: 'Learning Layer',
    title: 'MAGAHOOD Academy',
    desc: 'A Web3 learning ecosystem that turns education into participation. Complete paths, skill up, and earn $MAGAHOOD rewards.',
    features: [
      { icon: BookOpen, label: 'Blockchain fundamentals' },
      { icon: Brain, label: 'AI literacy' },
      { icon: TrendingUp, label: 'Digital economy & trading' },
      { icon: Palette, label: 'Creator skills' },
    ],
    highlight: 'Learn → apply in cities → earn rewards and reputation.',
  },
]

export default function AdditionalDetails() {
  return (
    <section id="details" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <FadeIn>
          <SectionLabel>Additional Details</SectionLabel>
          <SectionTitle>
            Core modules of the{' '}
            <span className="text-primary">civilization stack</span>
          </SectionTitle>
          <SectionLead>
            Beyond the token — Passport, Land, Marketplace, and Academy form the unique infrastructure
            of the MAGAHOOD Digital Nation.
          </SectionLead>
        </FadeIn>

        <div className="mt-14 grid lg:grid-cols-2 gap-6">
          {modules.map((m, i) => (
            <FadeIn key={m.id} delay={i * 0.08}>
              <article
                id={m.id}
                className="h-full rounded-3xl border border-border bg-card/70 p-7 lg:p-8 card-hover relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full pointer-events-none" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-void glow-primary">
                      <m.icon size={22} />
                    </div>
                    <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {m.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-3">{m.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-6">{m.desc}</p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {m.features.map((f) => (
                      <div
                        key={f.label}
                        className="flex items-center gap-2.5 rounded-xl border border-border bg-surface/80 px-3 py-2.5"
                      >
                        <f.icon size={14} className="text-primary shrink-0" />
                        <span className="text-xs text-white/90">{f.label}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs leading-relaxed text-primary/90 border-l-2 border-primary pl-3">
                    {m.highlight}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {/* Ecosystem flow reminder */}
        <FadeIn delay={0.25}>
          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-muted">
              <span className="text-primary font-semibold">Unique stack:</span>{' '}
              Passport → Land → Marketplace → Academy — all settled in $MAGAHOOD.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#token"
                className="shrink-0 text-sm font-semibold text-primary hover:text-primary-glow transition-colors"
              >
                See token utility →
              </a>
              <a
                href="#marketplace"
                className="shrink-0 text-sm font-semibold text-muted hover:text-primary transition-colors"
              >
                Open marketplace →
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
