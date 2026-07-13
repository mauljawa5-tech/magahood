import { ArrowRight, MessageCircle, Send } from 'lucide-react'
import { SectionLabel, SectionTitle, SectionLead, FadeIn } from './Section'

function XIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

export default function Community() {
  return (
    <section id="community" className="relative py-24 lg:py-32 border-t border-border">
      <div className="absolute inset-0 bg-primary/[0.03]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <FadeIn>
          <div className="rounded-3xl border border-primary/25 bg-card/90 p-10 lg:p-16 text-center overflow-hidden relative glow-primary">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/10 blur-[80px]" />

            <div className="relative">
              <SectionLabel>Community Portal</SectionLabel>
              <SectionTitle className="justify-center">
                Enter the{' '}
                <span className="text-primary">Digital Nation</span>
              </SectionTitle>
              <SectionLead>
                Create your identity. Join a city. Earn reputation. Build with AI. Govern the future.
              </SectionLead>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href="#hero"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-void hover:bg-primary-glow transition-colors"
                >
                  Claim Citizenship
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#token"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-8 py-3.5 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
                >
                  Get $MAGAHOOD
                </a>
              </div>

              <div className="mt-12 flex justify-center gap-4">
                {[
                  { icon: XIcon, label: 'X / Twitter' },
                  { icon: Send, label: 'Telegram' },
                  { icon: MessageCircle, label: 'Discord' },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-muted hover:text-primary hover:border-primary/40 transition-colors"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
