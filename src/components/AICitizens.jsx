import { Bot, BarChart3, PenTool, Users, Zap, MessageSquare } from 'lucide-react'
import { SectionLabel, SectionTitle, SectionLead, FadeIn } from './Section'

const agents = [
  { icon: BarChart3, title: 'Market Analysis', desc: 'Real-time insights for tokens, NFTs, and city economies.' },
  { icon: PenTool, title: 'Content Creation', desc: 'AI co-pilots for posts, art briefs, and campaigns.' },
  { icon: Users, title: 'Community Management', desc: 'Moderation, onboarding, and engagement automation.' },
  { icon: Zap, title: 'Automated Tasks', desc: 'Routine Web3 workflows handled by digital citizens.' },
  { icon: MessageSquare, title: 'Personal Assistants', desc: 'Always-on helpers for your digital nation life.' },
  { icon: Bot, title: 'Custom Agents', desc: 'Create, train, and monetize your own AI citizens.' },
]

export default function AICitizens() {
  return (
    <section id="ai" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <FadeIn>
          <SectionLabel>AI Citizen Network</SectionLabel>
          <SectionTitle>
            AI as a{' '}
            <span className="text-primary">economic participant</span>
          </SectionTitle>
          <SectionLead>
            MAGAHOOD introduces AI-powered digital citizens. Create, customize, and interact with
            agents that help users — and earn inside the ecosystem.
          </SectionLead>
        </FadeIn>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.06}>
              <div className="relative h-full rounded-2xl border border-border bg-gradient-to-br from-card to-surface p-6 card-hover overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full border border-primary/10" />
                <div className="absolute -right-2 -top-2 w-16 h-16 rounded-full border border-primary/20" />
                <div className="relative flex items-start gap-4">
                  <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/25">
                    <a.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1.5">{a.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
