import { Scale, Landmark, Users, MapPinned, ThumbsUp, ThumbsDown, Minus } from 'lucide-react'
import { SectionLabel, SectionTitle, SectionLead, FadeIn } from './Section'
import { PROPOSALS } from '../data/config'
import { useApp } from '../context/AppContext'

const powers = [
  { icon: Scale, title: 'Ecosystem Development', desc: 'Vote on protocol upgrades and product priorities.' },
  { icon: Users, title: 'Community Rules', desc: 'Shape policies that govern digital cities and citizens.' },
  { icon: Landmark, title: 'Treasury Usage', desc: 'Direct how nation resources fund growth and builders.' },
  { icon: MapPinned, title: 'New Digital Cities', desc: 'Approve and fund new territories in the nation.' },
]

export default function Governance() {
  const { voteOnProposal, votes, openModal, staked, isCitizen, citizen } = useApp()
  const votePower = Math.max(1, Math.floor(staked / 10) + 1)

  return (
    <section id="governance" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-start mb-16">
          <FadeIn>
            <SectionLabel>Governance</SectionLabel>
            <SectionTitle>
              Holders become{' '}
              <span className="text-primary">citizens with power</span>
            </SectionTitle>
            <SectionLead>
              Token holders decide the future of the digital nation. Stake $MAGAHOOD to increase
              vote power. Citizenship required to cast ballots.
            </SectionLead>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm">
                <span className="text-muted">Your vote power: </span>
                <span className="text-primary font-bold">{isCitizen ? votePower : 0}</span>
              </div>
              <button
                type="button"
                onClick={() => openModal('stake')}
                className="rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/10"
              >
                Boost via Stake
              </button>
              {!citizen && (
                <button
                  type="button"
                  onClick={() => openModal('citizenship')}
                  className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-void"
                >
                  Become Citizen
                </button>
              )}
            </div>
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

        <FadeIn>
          <h3 className="font-display text-lg font-bold text-white mb-6">
            Active <span className="text-primary">proposals</span>
          </h3>
        </FadeIn>

        <div className="grid gap-4">
          {PROPOSALS.map((prop, i) => {
            const myVote = votes[prop.id]
            const total = prop.forVotes + prop.againstVotes + prop.abstainVotes
            return (
              <FadeIn key={prop.id} delay={i * 0.06}>
                <article className="rounded-2xl border border-border bg-card/70 p-6 lg:p-7">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] uppercase tracking-wider text-primary border border-primary/25 rounded-full px-2 py-0.5">
                          {prop.category}
                        </span>
                        <span className="text-[10px] text-muted">Ends in {prop.endsIn}</span>
                        {myVote && (
                          <span className="text-[10px] font-bold text-primary">
                            You voted {myVote.choice.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-white text-base mb-2">{prop.title}</h4>
                      <p className="text-sm text-muted leading-relaxed max-w-2xl">{prop.description}</p>
                    </div>
                  </div>

                  <div className="mb-4 space-y-2">
                    <VoteBar label="For" pct={prop.forVotes} color="#C6F700" />
                    <VoteBar label="Against" pct={prop.againstVotes} color="#666" />
                    <VoteBar label="Abstain" pct={prop.abstainVotes} color="#333" />
                    <p className="text-[10px] text-muted">{total}% community weight shown (demo snapshot)</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={Boolean(myVote)}
                      onClick={() => voteOnProposal(prop.id, 'for')}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-void disabled:opacity-40 hover:bg-primary-glow"
                    >
                      <ThumbsUp size={12} /> For
                    </button>
                    <button
                      type="button"
                      disabled={Boolean(myVote)}
                      onClick={() => voteOnProposal(prop.id, 'against')}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted hover:text-white disabled:opacity-40"
                    >
                      <ThumbsDown size={12} /> Against
                    </button>
                    <button
                      type="button"
                      disabled={Boolean(myVote)}
                      onClick={() => voteOnProposal(prop.id, 'abstain')}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted hover:text-white disabled:opacity-40"
                    >
                      <Minus size={12} /> Abstain
                    </button>
                  </div>
                </article>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function VoteBar({ label, pct, color }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-1">
        <span className="text-muted">{label}</span>
        <span className="text-white">{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-border overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}
