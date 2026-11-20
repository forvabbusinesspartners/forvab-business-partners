import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Delay in seconds before the reveal starts. */
  delay?: number
  /** Vertical travel distance in px (0 when reduced motion is preferred). */
  y?: number
  className?: string
}

/**
 * Scroll-triggered fade-up reveal. Fires once when the element enters the
 * viewport; respects the user's reduced-motion preference.
 */
export default function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
