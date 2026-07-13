import { CheckCircle2, Info, XCircle, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const styles = {
  success: 'border-primary/40 text-primary',
  error: 'border-red-500/40 text-red-400',
  info: 'border-white/15 text-white',
}

export default function ToastHost() {
  const { toasts, dismissToast } = useApp()

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-[calc(100%-2.5rem)]">
      {toasts.map((t) => {
        const Icon = icons[t.type] || Info
        return (
          <div
            key={t.id}
            className={`flex items-start gap-3 rounded-xl border bg-card/95 backdrop-blur-xl px-4 py-3 shadow-2xl ${styles[t.type] || styles.info}`}
            role="status"
          >
            <Icon size={18} className="shrink-0 mt-0.5" />
            <p className="text-sm text-white flex-1 leading-snug">{t.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(t.id)}
              className="text-muted hover:text-white"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
