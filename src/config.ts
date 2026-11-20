// ─────────────────────────────────────────────────────────────────────────────
// Site configuration — single source of truth for the form endpoint and the
// verified company facts. Edit values here; components import from this file.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Formspree endpoint the partnership form POSTs to.
 *
 * Live form: "Forvab Partnership Application" — submissions are delivered to
 * Forvabbusinesspartnersllc@protonmail.com. The form handles both success and
 * error responses; it never fakes a submission.
 */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdegdqzd'

export const COMPANY = {
  name: 'Forvab Business Partners LLC',
  shortName: 'FORVAB Business Partners',
  tagline: 'Building Stronger Businesses. Creating Lasting Partnerships.',
  address: '506 Sweetwater Cir, Wright, WY 82732, USA',
  addressLines: ['506 Sweetwater Cir', 'Wright, WY 82732, USA'],
  email: 'Forvabbusinesspartnersllc@protonmail.com',
  phone: '+1 (307) 449-8877',
  phoneHref: 'tel:+13074498877',
  formed: 'November 16, 2026',
  state: 'Wyoming',
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
] as const
