import Reveal from './Reveal'

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

function LightbulbIcon({ className }: { className?: string }) {
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
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.8.6 1.5 1.3 1.5 2.1h4c0-.8.7-1.5 1.5-2.1A6 6 0 0 0 12 3z" />
      <path d="M12 8.5v.5M10 10.5h4" />
    </svg>
  )
}

function MegaphoneIcon({ className }: { className?: string }) {
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
      <path d="M3 11v3l4 1 2 5h2l-1.5-4.6L20 18a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1L9.5 8.6 7 10H3z" />
      <path d="M17 9.5a3 3 0 0 1 0 5" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}

const SERVICES = [
  {
    number: '01',
    Icon: BriefcaseIcon,
    title: 'Business Management',
    description:
      'Comprehensive business management solutions designed to improve organizational efficiency, streamline operations, strengthen internal processes, and support sustainable business performance.',
    bullets: [
      'Business Operations Management',
      'Organizational Development',
      'Strategic Planning',
      'Business Process Improvement',
      'Operational Efficiency',
      'Management Support',
    ],
  },
  {
    number: '02',
    Icon: LightbulbIcon,
    title: 'Business Consulting',
    description:
      'Strategic consulting services that help businesses identify opportunities, overcome operational challenges, make informed decisions, and establish effective growth strategies.',
    bullets: [
      'Business Strategy Consulting',
      'Business Development',
      'Market Research and Analysis',
      'Strategic Business Planning',
      'Operational Consulting',
      'Growth Advisory',
    ],
  },
  {
    number: '03',
    Icon: MegaphoneIcon,
    title: 'Business Marketing',
    description:
      'Modern marketing strategies designed to strengthen brand positioning, improve market visibility, attract potential customers, and support business expansion.',
    bullets: [
      'Digital Marketing Strategy',
      'Brand Development',
      'Marketing Consulting',
      'Market Positioning',
      'Customer Acquisition Strategies',
      'Business Promotion',
    ],
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 border-t border-white/5 bg-coal py-24 sm:py-32"
    >
      <div aria-hidden="true" className="glow-blob -right-40 top-16 h-96 w-96" />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow">Our Services</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            What We Do
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {SERVICES.map(({ number, Icon, title, description, bullets }, i) => (
            <Reveal key={title} delay={0.1 + i * 0.1}>
              <article className="glass card-hover flex h-full flex-col rounded-2xl p-8">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                    <Icon className="h-7 w-7" />
                  </div>
                  <span
                    aria-hidden="true"
                    className="font-display text-5xl font-semibold text-white/[0.07]"
                  >
                    {number}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">
                  {description}
                </p>
                <ul className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-7">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm leading-relaxed text-neutral-300">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
