import { useEffect, useState } from 'react'
import Logo from './Logo'
import { NAV_LINKS } from '../config'

/**
 * Fixed site header. Transparent over the hero; gains a blurred dark
 * background once the page scrolls. Section anchors resolve to
 * `index.html#...` when rendered on privacy.html / terms.html, where the
 * home-page sections do not exist.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onHome = !/privacy|terms/.test(window.location.pathname)
  const sectionHref = (hash: string) => (onHome ? hash : `index.html${hash}`)

  const linkClass =
    'text-sm text-neutral-300 transition hover:text-emerald-300'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-ink/90 shadow-lg backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between sm:h-20">
        <a
          href={sectionHref('#home')}
          aria-label="Forvab Business Partners — home"
          className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-lg"
        >
          <Logo className="h-9 w-auto sm:h-10" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={sectionHref(link.href)} className={linkClass}>
              {link.label}
            </a>
          ))}
          <a
            href={sectionHref('#partnership')}
            className="btn-primary px-5 py-2.5"
          >
            Apply for Partnership
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-200 transition hover:bg-white/10 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <nav
          className="border-t border-white/10 bg-ink/95 backdrop-blur-md md:hidden"
          aria-label="Mobile"
        >
          <div className="container-x flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={sectionHref(link.href)}
                className="rounded-lg px-3 py-2.5 text-sm text-neutral-300 transition hover:bg-white/5 hover:text-emerald-300"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={sectionHref('#partnership')}
              className="btn-primary mt-3 px-5 py-2.5"
              onClick={() => setOpen(false)}
            >
              Apply for Partnership
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
