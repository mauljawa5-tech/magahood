/**
 * MAGAHOOD brand logo
 * mark = icon only | full = icon + wordmark
 */
export default function Logo({
  variant = 'full',
  className = '',
  markClassName = '',
  showTagline = false,
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName || 'h-9 w-9'} />
      {variant === 'full' && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-bold tracking-wide text-white">
            MAGA<span className="text-primary">HOOD</span>
          </span>
          {showTagline && (
            <span className="mt-1 text-[9px] font-medium tracking-[0.28em] uppercase text-primary/80">
              Digital Nation
            </span>
          )}
        </span>
      )}
    </span>
  )
}

export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-m-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8FF66" />
          <stop offset="50%" stopColor="#C6F700" />
          <stop offset="100%" stopColor="#9BC400" />
        </linearGradient>
      </defs>

      {/* Outer hex */}
      <path
        d="M64 8 L110 34 L110 94 L64 120 L18 94 L18 34 Z"
        stroke="url(#logo-m-glow)"
        strokeWidth="3"
        fill="#0A0A0A"
      />
      <path
        d="M64 18 L100 39 L100 89 L64 110 L28 89 L28 39 Z"
        stroke="#C6F700"
        strokeWidth="1"
        strokeOpacity="0.35"
        fill="none"
      />

      {/* Inner core */}
      <path
        d="M64 28 L90 44 L90 84 L64 100 L38 84 L38 44 Z"
        fill="#111111"
        stroke="#C6F700"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />

      {/* M mark */}
      <path
        d="M46 82 V48 L64 66 L82 48 V82"
        stroke="url(#logo-m-glow)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Center node */}
      <circle cx="64" cy="62" r="5" fill="#C6F700" />
      <circle
        cx="64"
        cy="62"
        r="9"
        stroke="#C6F700"
        strokeWidth="1"
        strokeOpacity="0.4"
        fill="none"
      />

      {/* Network nodes */}
      <circle cx="46" cy="48" r="2.5" fill="#C6F700" />
      <circle cx="82" cy="48" r="2.5" fill="#C6F700" />
      <circle cx="46" cy="82" r="2.5" fill="#C6F700" />
      <circle cx="82" cy="82" r="2.5" fill="#C6F700" />
    </svg>
  )
}

/** Large decorative logo for hero / brand moments */
export function LogoHero({ className = 'w-48 h-48' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
      <LogoMark className="relative h-full w-full drop-shadow-[0_0_24px_rgba(198,247,0,0.35)]" />
    </div>
  )
}
