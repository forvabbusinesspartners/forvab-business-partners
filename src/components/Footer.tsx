import Logo from './Logo'
import { COMPANY } from '../config'

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Apply for Partnership', href: '#partnership' },
  { label: 'Contact Us', href: '#contact' },
]

export default function Footer() {
  const onHome = !/privacy|terms/.test(window.location.pathname)
  const sectionHref = (hash: string) => (onHome ? hash : `index.html${hash}`)
  const year = new Date().getFullYear()

  const linkClass = 'text-sm text-neutral-400 transition hover:text-emerald-300'

  return (
    <footer className="border-t border-white/10 bg-coal">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.7fr_1.4fr]">
        {/* Brand */}
        <div>
          <a
            href={sectionHref('#home')}
            aria-label="Forvab Business Partners — home"
            className="inline-block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-coal"
          >
            <Logo className="h-9 w-auto sm:h-10" />
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-neutral-400">
            Strategic business management, consulting, and marketing solutions.
          </p>
        </div>

        {/* Quick links */}
        <nav aria-label="Quick links">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
            Quick Links
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={sectionHref(link.href)} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <nav aria-label="Legal">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
            Legal
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            <li>
              <a href="privacy.html" className={linkClass}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="terms.html" className={linkClass}>
                Terms and Conditions
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
            Contact
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            <li>
              <a href={`mailto:${COMPANY.email}`} className={linkClass}>
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a href={COMPANY.phoneHref} className={linkClass}>
                {COMPANY.phone}
              </a>
            </li>
            <li className="text-sm leading-relaxed text-neutral-400">
              {COMPANY.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-neutral-500">
            © {year} Forvab Business Partners LLC. All rights reserved.
          </p>
          <p className="text-sm text-neutral-500">Wright, Wyoming, USA</p>
        </div>
      </div>
    </footer>
  )
}
