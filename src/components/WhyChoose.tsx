import Reveal from './Reveal'

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
      <path d="M12 12v3" />
    </svg>
  )
}

function SlidersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2.2" />
      <circle cx="10" cy="17" r="2.2" />
      <path d="M4 12h16" />
      <circle cx="8" cy="12" r="2.2" />
    </svg>
  )
}

function TrendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
      <path d="M3 21h18" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.7-3.4 3.4-5 6.5-5s5.8 1.6 6.5 5" />
      <circle cx="17" cy="9" r="2.6" />
      <path d="M16 15.2c2.4.3 4.2 1.7 4.8 4.3" />
    </svg>
  )
}

function AwardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="9" r="6" />
      <path d="M12 6.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3.9-1.8z" />
      <path d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5" />
    </svg>
  )
}

const REASONS = [
  {
    Icon: TargetIcon,
    title: 'Strategic Business Thinking',
    body: 'We look at the whole picture — goals, challenges, and opportunities — before recommending a course of action.',
  },
  {
    Icon: BriefcaseIcon,
    title: 'Professional Approach',
    body: 'Every engagement is handled with care, clear communication, and respect for your time and business.',
  },
  {
    Icon: SlidersIcon,
    title: 'Customized Business Solutions',
    body: 'No two businesses are alike, so our support is shaped around your specific situation and objectives.',
  },
  {
    Icon: TrendIcon,
    title: 'Growth-Oriented Strategies',
    body: 'Our work is focused on practical steps that support steady, sustainable progress.',
  },
  {
    Icon: UsersIcon,
    title: 'Long-Term Partnership Focus',
    body: 'We aim to build relationships that last, supporting clients well beyond a single project.',
  },
  {
    Icon: AwardIcon,
    title: 'Commitment to Excellence',
    body: 'We take pride in doing careful, thorough work and holding ourselves to a high standard.',
  },
]

export default function WhyChoose() {
  return (
    <section id="why-us" className="relative scroll-mt-24 py-24 sm:py-32">
      <div aria-hidden="true" className="glow-blob -left-40 bottom-16 h-96 w-96" />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow">Why Choose Forvab</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Why Businesses Choose FORVAB
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={0.1 + (i % 3) * 0.1}>
              <article className="glass card-hover h-full rounded-2xl p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">
                  {body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
