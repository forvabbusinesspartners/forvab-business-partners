// Premium "Secure Documentation" branding badge for the Business
// Partnership Application page. Hand-built SVG: a metallic-gold shield
// with a deep-green core and a gold padlock, giving a polished 3D emblem.
// It is a branding element only — it makes no certification claims.

export default function SecureBadge() {
  return (
    <div className="flex flex-col items-center" role="img" aria-label="Secure Documentation">
      <svg
        viewBox="0 0 120 134"
        className="h-24 w-auto drop-shadow-[0_14px_28px_rgba(212,175,55,0.28)] sm:h-28"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sb-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f9ec9e" />
            <stop offset="28%" stopColor="#e6c860" />
            <stop offset="52%" stopColor="#a67c2e" />
            <stop offset="76%" stopColor="#f3d97b" />
            <stop offset="100%" stopColor="#7a5c1e" />
          </linearGradient>
          <linearGradient id="sb-gold-soft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fdf3b8" />
            <stop offset="55%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#8a6d2f" />
          </linearGradient>
          <linearGradient id="sb-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d7a57" />
            <stop offset="45%" stopColor="#064e3b" />
            <stop offset="100%" stopColor="#022e24" />
          </linearGradient>
          <linearGradient id="sb-sheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer shield — metallic gold frame */}
        <path
          d="M60 3 L109 19 V61 C109 96 88 117 60 130 C32 117 11 96 11 61 V19 Z"
          fill="url(#sb-gold)"
          stroke="#5e4a17"
          strokeWidth="1.5"
        />
        {/* Inner shield — deep green core */}
        <path
          d="M60 13.5 L99.5 26.5 V61 C99.5 90.5 81.5 108.5 60 119.5 C38.5 108.5 20.5 90.5 20.5 61 V26.5 Z"
          fill="url(#sb-green)"
          stroke="#d4af37"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        {/* Top sheen for the polished 3D look */}
        <path
          d="M60 13.5 L99.5 26.5 V61 C99.5 66 99 71.5 97.4 77 L22.6 77 C21 71.5 20.5 66 20.5 61 V26.5 Z"
          fill="url(#sb-sheen)"
        />

        {/* Padlock — shackle */}
        <path
          d="M47 57 V45 a13 13 0 0 1 26 0 V57"
          fill="none"
          stroke="url(#sb-gold-soft)"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        {/* Padlock — body */}
        <rect x="39" y="55" width="42" height="35" rx="6" fill="url(#sb-gold)" stroke="#5e4a17" strokeWidth="1" />
        <rect x="39" y="55" width="42" height="13" rx="6" fill="#ffffff" opacity="0.18" />
        {/* Keyhole */}
        <circle cx="60" cy="69" r="4.6" fill="#04382a" />
        <rect x="57.8" y="71" width="4.4" height="9" rx="2.2" fill="#04382a" />
      </svg>

      <div className="mt-5 flex w-full max-w-md items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/70" aria-hidden="true" />
        <span className="bg-gradient-to-b from-[#f6e27a] via-[#d4af37] to-[#9a7b2d] bg-clip-text text-center font-display text-base font-semibold uppercase leading-snug tracking-[0.32em] text-transparent sm:text-xl">
          Secure Documentation
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/70" aria-hidden="true" />
      </div>
    </div>
  )
}
