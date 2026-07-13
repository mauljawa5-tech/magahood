import { useState } from 'react'
import { Bot, BarChart3, PenTool, Users, Zap, MessageSquare, Loader2, Sparkles } from 'lucide-react'
import { SectionLabel, SectionTitle, SectionLead, FadeIn } from './Section'
import { useApp } from '../context/AppContext'

const agents = [
  {
    icon: BarChart3,
    title: 'Market Analysis',
    desc: 'Real-time insights for tokens, NFTs, and city economies.',
    cost: 15,
    sample:
      'Market Scout: $MAGAHOOD demo volume is stable. Creator City listings lead volume. Stake ratio suggests strong governance participation this week.',
  },
  {
    icon: PenTool,
    title: 'Content Creation',
    desc: 'AI co-pilots for posts, art briefs, and campaigns.',
    cost: 10,
    sample:
      'Content Agent draft: “Build where you belong. Own what you create. $MAGAHOOD — the Digital Nation Economy.” Ready for X + Telegram.',
  },
  {
    icon: Users,
    title: 'Community Management',
    desc: 'Moderation, onboarding, and engagement automation.',
    cost: 12,
    sample:
      'Community Ops: 3 onboarding tasks queued. Suggested AMA for Builder City. Flagged 0 spam events in the last hour (demo).',
  },
  {
    icon: Zap,
    title: 'Automated Tasks',
    desc: 'Routine Web3 workflows handled by digital citizens.',
    cost: 8,
    sample:
      'Automation Bot: Reward drip scheduled, city digest compiled, passport badge sync complete for demo citizens.',
  },
  {
    icon: MessageSquare,
    title: 'Personal Assistants',
    desc: 'Always-on helpers for your digital nation life.',
    cost: 10,
    sample:
      'Assistant: Next steps — claim citizenship, join a city, stake 100 MH for vote power, browse AI agents in marketplace.',
  },
  {
    icon: Bot,
    title: 'Custom Agents',
    desc: 'Create, train, and monetize your own AI citizens.',
    cost: 25,
    sample:
      'Factory: Custom agent template “City Economist” created. Publish to marketplace for 180 $MAGAHOOD (demo).',
  },
]

export default function AICitizens() {
  const { wallet, openModal, toast, spendTokens } = useApp()
  const [running, setRunning] = useState(null)
  const [logs, setLogs] = useState([])

  const runAgent = async (agent) => {
    if (!wallet) {
      openModal('wallet')
      toast('Connect wallet to use AI citizens', 'info')
      return
    }

    setRunning(agent.title)
    await new Promise((r) => setTimeout(r, 900))
    const paid = spendTokens(agent.cost, agent.title)
    if (!paid) {
      setRunning(null)
      return
    }
    setLogs((prev) =>
      [
        {
          id: Date.now(),
          title: agent.title,
          cost: agent.cost,
          message: agent.sample,
        },
        ...prev,
      ].slice(0, 5),
    )
    setRunning(null)
  }

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
            Launch demo AI citizens. Each run spends a small $MAGAHOOD fee from your demo balance.
          </SectionLead>
        </FadeIn>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.06}>
              <div className="relative h-full rounded-2xl border border-border bg-gradient-to-br from-card to-surface p-6 card-hover overflow-hidden flex flex-col">
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full border border-primary/10" />
                <div className="relative flex items-start gap-4 flex-1">
                  <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/25">
                    <a.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1.5">{a.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{a.desc}</p>
                    <p className="text-[11px] text-primary mt-2 font-medium">Fee: {a.cost} MH</p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={running === a.title}
                  onClick={() => runAgent(a)}
                  className="relative mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-void transition-colors disabled:opacity-50"
                >
                  {running === a.title ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Running…
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} /> Run agent
                    </>
                  )}
                </button>
              </div>
            </FadeIn>
          ))}
        </div>

        {logs.length > 0 && (
          <div className="mt-10 space-y-3">
            <h3 className="font-display text-sm font-bold text-white">Agent activity log</h3>
            {logs.map((log) => (
              <div
                key={log.id}
                className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3"
              >
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-primary font-semibold">{log.title}</span>
                  <span className="text-muted">−{log.cost} MH</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{log.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
