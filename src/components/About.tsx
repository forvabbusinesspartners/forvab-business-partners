import Reveal from './Reveal'

function BuildingIcon({ className }: { className?: string }) {
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
      <path d="M3 21h18" />
      <path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
      <path d="M15 9h4a1 1 0 0 1 1 1v11" />
      <path d="M8 7h2M8 11h2M8 15h2M12 7h1M12 11h1M12 15h1" />
    </svg>
  )
}

function CompassIcon({ className }: { className?: string }) {
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
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
    </svg>
  )
}

function ShieldIcon({ className }: { className?: string }) {
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
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
      <path d="M9 11.5l2 2 4-4" />
    </svg>
  )
}

function HeartIcon({ className }: { className?: string }) {
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
      <path d="M12 20s-7-4.3-9.3-9A5.4 5.4 0 0 1 12 6.4 5.4 5.4 0 0 1 21.3 11C19 15.7 12 20 12 20z" />
      <path d="M8.5 11.5l2.2 2.2 4.3-4.2" />
    </svg>
  )
}

const CARDS = [
  {
    Icon: BuildingIcon,
    title: 'Our Company',
    body: 'Forvab Business Partners LLC is a Wyoming-based company focused on business management, consulting, and marketing. We work with organizations that want practical guidance and a steady partner as they build and grow.',
  },
  {
    Icon: CompassIcon,
    title: 'Our Approach',
    body: 'We start by listening — understanding each client\u2019s business, goals, and challenges before recommending anything. From there, we develop practical strategies and track progress so every step stays grounded in what matters to the business.',
  },
  {
    Icon: ShieldIcon,
    title: 'Our Values',
    body: 'Integrity, clarity, diligence, and partnership guide how we work. We believe honest advice, straightforward communication, and careful follow-through are the foundation of any lasting business relationship.',
  },
  {
    Icon: HeartIcon,
    title: 'Our Commitment to Clients',
    body: 'We aim to communicate clearly, tailor our support to each client\u2019s situation, and keep a long-term view. Our goal is to be a dependable partner clients can turn to as their business evolves.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div aria-hidden="true" className="glow-blob -left-40 top-24 h-96 w-96" />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow">About Us</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            A Partner in Building Better Businesses
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            At FORVAB Business Partners, we believe successful businesses are
            built through strategic thinking, effective management, and
            meaningful partnerships. Our approach combines business insight,
            practical solutions, and forward-thinking strategies to help
            organizations navigate challenges and pursue new opportunities.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {CARDS.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={0.1 + i * 0.08}>
              <article className="glass card-hover h-full rounded-2xl p-7 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white sm:text-2xl">
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
