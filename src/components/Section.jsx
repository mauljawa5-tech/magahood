import { motion } from 'framer-motion'

export function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span className="h-px w-8 bg-primary" />
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
        {children}
      </span>
    </div>
  )
}

export function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${className}`}>
      {children}
    </h2>
  )
}

export function SectionLead({ children }) {
  return (
    <p className="mt-4 text-muted text-lg max-w-2xl leading-relaxed">{children}</p>
  )
}

export function FadeIn({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
