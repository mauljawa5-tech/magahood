import { FadeIn } from './Section'

export default function Vision() {
  return (
    <section id="vision" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
        <FadeIn>
          <p className="text-xs tracking-[0.25em] uppercase text-primary mb-8">MAGAHOOD Vision</p>
          <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-white">
            The future of the internet is not only about connecting people.
            <br />
            <span className="text-primary text-glow">
              It is about creating places where people can belong, build, and own.
            </span>
          </blockquote>
          <p className="mt-10 text-muted text-lg">
            $MAGAHOOD — The Digital Nation Economy Powered by Blockchain and AI.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
