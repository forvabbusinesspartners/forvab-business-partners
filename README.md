# Forvab Business Partners LLC — Website

The corporate website for **Forvab Business Partners LLC**, a Wyoming limited
liability company offering business consulting, management, and marketing
services. The site introduces the company, describes its services, and provides
a partnership inquiry form for businesses interested in exploring a potential
partnership.

## Tech stack

- [Vite](https://vitejs.dev/) — build tool and dev server
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [Three.js](https://threejs.org/) — 3D visuals
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Formspree](https://formspree.io/) — partnership form delivery (no backend of our own)

## Prerequisites

- Node.js 18 or newer
- npm (ships with Node.js)

## Install

```bash
npm install
```

## Develop

```bash
npm run dev
```

Starts the Vite dev server with hot reloading.

## Build

```bash
npm run build
```

Produces a static build in `dist/`.

## Preview

```bash
npm run preview
```

Serves the production build locally for a final check before deploying.

## Deployment

The site deploys to **GitHub Pages** via the included GitHub Actions workflow
(`.github/workflows/deploy.yml`). Push to the `main` branch and the workflow
builds the site and deploys it automatically.

## Configuration

- **Formspree endpoint** — the partnership form posts to the live "Forvab
  Partnership Application" form configured in `src/config.ts`
  (`https://formspree.io/f/xdegdqzd`); submissions are delivered to
  Forvabbusinesspartnersllc@protonmail.com. End-to-end delivery was verified
  2026-11-20 (a test submission arrived in the Proton inbox).
- **Live domain** — set to `forvabpartnershipsolutions.online`
  in `public/sitemap.xml` and `public/robots.txt` (the GitHub Pages URL).

## Project structure

```text
forvab-website/
├── index.html                  # Homepage entry
├── privacy.html                # Privacy Policy page entry
├── terms.html                  # Terms of Use page entry
├── public/
│   ├── favicon.svg             # Logo mark favicon
│   ├── favicon-192.png         # Raster favicon (192×192)
│   ├── favicon-512.png         # Raster favicon / OG image (512×512)
│   ├── apple-touch-icon.png    # Apple touch icon (180×180)
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── config.ts               # Company facts + Formspree endpoint
│   ├── index.css               # Tailwind + shared component classes
│   ├── components/             # Shared UI (incl. PartnershipForm)
│   └── pages/                  # Privacy and Terms pages
├── .github/workflows/
│   └── deploy.yml              # GitHub Pages deploy workflow
├── README.md
└── NOTES.md                    # Owner verification checklist
```

## Notes

- This is a **multi-page static build**: `index.html`, `privacy.html`, and
  `terms.html` are separate pages that share components and styles.
- There is **no backend of our own** — the partnership form posts to
  Formspree, which delivers submissions by email.
- See `NOTES.md` for items that need owner verification before publication.
