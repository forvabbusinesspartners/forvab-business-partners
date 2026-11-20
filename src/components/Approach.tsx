import Reveal from './Reveal'

const STEPS = [
  {
    number: '01',
    title: 'Understand',
    description: "Understand the client's business and objectives.",
  },
  {
    number: '02',
    title: 'Analyze',
    description: 'Evaluate challenges and opportunities.',
  },
  {
    number: '03',
    title: 'Strategize',
    description: 'Develop practical business strategies.',
  },
  {
    number: '04',
    title: 'Grow',
    description: 'Support implementation and sustainable progress.',
  },
]

export default function Approach() {
  return (
    <section
      id="approach"
      className="relative scroll-mt-24 border-t border-white/5 bg-coal py-24 sm:py-32"
    >
      <div aria-hidden="true" className="glow-blob -right-40 bottom-24 h-96 w-96" />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow">Our Business Approach</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            How We Work
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Connecting line — horizontal on desktop, behind the numbered nodes */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-8 hidden h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 lg:block"
          />
          {/* Connecting line — vertical on mobile, behind the numbered nodes */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-1/2 top-8 w-px -translate-x-1/2 bg-gradient-to-b from-emerald-500/40 via-emerald-500/25 to-emerald-500/0 lg:hidden"
          />

          {STEPS.map(({ number, title, description }, i) => (
            <Reveal key={number} delay={0.1 + i * 0.12} className="relative">
              <div className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/40 bg-ink shadow-[0_0_28px_rgba(16,185,129,0.25)]">
                  <span className="font-display text-lg font-semibold text-emerald-400">
                    {number}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-white sm:text-2xl">
                  {title}
                </h3>
                <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-neutral-400">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
