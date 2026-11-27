// Compact "Secure Document Submission" pill shown just above the first
// section of the Business Partnership Application form — a small branding
// element in the site's emerald palette. It makes no certification claims.

export default function SecureBadge() {
  return (
    <div className="flex justify-center">
      <span className="inline-flex items-center gap-3 rounded-full border border-emerald-400/50 bg-emerald-500/10 px-6 py-3 shadow-[0_0_28px_rgba(16,185,129,0.18)] backdrop-blur">
        <svg
          className="h-6 w-6 shrink-0 text-emerald-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
        <span className="text-base font-bold tracking-wide text-emerald-50 sm:text-lg">
          Secure Document Submission
        </span>
      </span>
    </div>
  )
}
