import Reveal from './Reveal'
import { COMPANY } from '../config'

function MailIcon({ className }: { className?: string }) {
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

function PhoneIcon({ className }: { className?: string }) {
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
      <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  )
}

function PinIcon({ className }: { className?: string }) {
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
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

export default function Contact() {
  const onHome = !/privacy|terms/.test(window.location.pathname)
  const partnershipHref = onHome ? '#partnership' : 'index.html#partnership'

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div aria-hidden="true" className="glow-blob -left-40 top-20 h-96 w-96" />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow">Contact Us</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Let&apos;s Talk
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            Reach out with a question or a business idea — we will get back to
            you.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <Reveal delay={0.1}>
            <article className="glass h-full rounded-2xl p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <MailIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">
                Email
              </h3>
              <a
                href={`mailto:${COMPANY.email}`}
                className="mt-3 block break-all text-[15px] leading-relaxed text-neutral-400 transition hover:text-emerald-300"
              >
                {COMPANY.email}
              </a>
            </article>
          </Reveal>

          <Reveal delay={0.2}>
            <article className="glass h-full rounded-2xl p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <PhoneIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">
                Phone
              </h3>
              <a
                href={COMPANY.phoneHref}
                className="mt-3 block text-[15px] leading-relaxed text-neutral-400 transition hover:text-emerald-300"
              >
                {COMPANY.phone}
              </a>
            </article>
          </Reveal>

          <Reveal delay={0.3}>
            <article className="glass h-full rounded-2xl p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <PinIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">
                Address
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">
                {COMPANY.address}
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="glass mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl px-7 py-8 text-center sm:flex-row sm:text-left">
            <p className="font-display text-xl font-semibold text-white sm:text-2xl">
              Have a partnership in mind? Tell us about it.
            </p>
            <a href={partnershipHref} className="btn-primary shrink-0">
              Apply for Partnership
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
