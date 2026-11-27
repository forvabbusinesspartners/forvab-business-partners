import { lazy, Suspense } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

// Three.js is heavy — load the canvas in its own chunk so the main bundle
// stays lean. Hero content renders immediately; the canvas fades in behind it.
const HeroCanvas = lazy(() => import('./HeroCanvas'))

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
}

export default function Hero() {
  const reduce = useReducedMotion()

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* 3D background + readability overlays */}
      <div className="absolute inset-0" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
        <div className="glow-blob -right-32 top-1/4 h-[420px] w-[420px]" />
      </div>

      {/* Content */}
      <motion.div
        className="container-x relative z-10 pb-28 pt-32"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={itemVariants} className="eyebrow">
          BUSINESS CONSULTING &amp; MANAGEMENT
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="mt-6 max-w-4xl font-display text-4xl leading-tight text-white sm:text-5xl lg:text-7xl"
        >
          <span>BUILDING STRONGER BUSINESSES.</span>{' '}
          <span className="text-gradient-emerald">CREATING LASTING PARTNERSHIPS.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300"
        >
          FORVAB Business Partners empowers organizations with strategic business
          management, professional consulting, and innovative marketing solutions
          designed to accelerate growth and create sustainable success.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a href="business-partnership.html" className="btn-primary">
            Partnership for Business
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a href="#services" className="btn-ghost">
            Explore Our Services
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a href="#partnership" className="btn-primary">
            Apply for Partnership
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2">
        <motion.a
          href="#about"
          aria-label="Scroll to About"
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5 text-emerald-300/80 backdrop-blur transition hover:border-emerald-400/50 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <svg
            className="h-4 w-4 animate-scroll-cue"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.a>
      </div>
    </section>
  )
}
