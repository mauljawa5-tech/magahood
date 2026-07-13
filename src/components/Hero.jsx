import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Shield, Globe } from 'lucide-react'
import { LogoMark } from './Logo'
import { useApp } from '../context/AppContext'

export default function Hero() {
  const { openModal, citizen, isConnected } = useApp()

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 radial-glow" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />

      <div className="absolute top-28 right-[12%] w-3 h-3 rounded-full bg-primary animate-float opacity-80" />
      <div className="absolute bottom-40 left-[15%] w-2 h-2 rounded-full bg-primary/70 animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 right-[25%] w-1.5 h-1.5 rounded-full bg-primary/50 animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 mb-8">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs font-medium tracking-wider uppercase text-primary">
                Robinhood Chain · Digital Nation
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
              Build Your{' '}
              <span className="text-primary text-glow">Digital Nation</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted max-w-xl mb-10 leading-relaxed">
              $MAGAHOOD is the blockchain economy powering the next generation of online societies.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button
                type="button"
                onClick={() => openModal(citizen ? 'wallet' : 'citizenship')}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-void hover:bg-primary-glow transition-all glow-primary"
              >
                {citizen ? 'Open Passport' : 'Enter the Nation'}
                <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => openModal(isConnected ? 'token' : 'wallet')}
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3.5 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
              >
                {isConnected ? 'Get $MAGAHOOD' : 'Connect Wallet'}
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-muted hover:text-white hover:border-primary/30 transition-colors"
              >
                Explore Ecosystem
              </a>
            </div>

            <div className="flex flex-wrap gap-8">
              {[
                { icon: Shield, label: 'Digital Identity' },
                { icon: Globe, label: 'Community Cities' },
                { icon: Sparkles, label: 'AI Citizens' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-muted">
                  <Icon size={16} className="text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[420px] h-[420px]">
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse-glow" />
              <div className="absolute inset-8 rounded-full border border-primary/30" />
              <div className="absolute inset-16 rounded-full border border-dashed border-primary/40 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-24 rounded-full border border-primary/20" />

              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => openModal(citizen ? 'wallet' : 'citizenship')}
                  className="relative w-48 h-56 rounded-2xl border border-primary/50 bg-card/80 backdrop-blur-sm glow-primary p-6 flex flex-col items-center justify-center animate-float text-left cursor-pointer hover:border-primary transition-colors"
                >
                  <div className="mb-4">
                    <LogoMark className="w-16 h-16 drop-shadow-[0_0_12px_rgba(198,247,0,0.45)]" />
                  </div>
                  <p className="font-display text-sm font-bold text-white tracking-wider">PASSPORT</p>
                  <p className="text-xs text-primary mt-1">
                    {citizen ? `${citizen.displayName}` : 'Digital Citizen'}
                  </p>
                  <div className="mt-4 w-full space-y-1.5">
                    <div className="h-1 rounded-full bg-primary/20 overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${citizen?.reputation ?? 25}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted">
                      <span>Reputation</span>
                      <span className="text-primary">
                        {citizen ? `Lvl ${Math.ceil(citizen.reputation / 10)}` : 'Claim yours'}
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 animate-[scan_3s_ease-in-out_infinite]" />
                  </div>
                </button>
              </div>

              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary glow-primary" />
              <div className="absolute bottom-8 right-12 w-2 h-2 rounded-full bg-primary/70" />
              <div className="absolute top-1/3 left-6 w-2 h-2 rounded-full bg-primary/50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
