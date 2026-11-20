import { useId } from 'react';

type LogoProps = {
  className?: string;
};

/**
 * The Forvab mark: an original geometric monogram built from the letter F.
 *
 * Three bold rectangular bars form the F — a vertical stem, a long top bar,
 * and a shorter middle bar. Both horizontal bars end in a 45° diagonal cut
 * that rises to the right, an ascending step suggesting growth and forward
 * partnership. The mark is filled with a diagonal emerald gradient that runs
 * from luminous #34D399 at the top-left to deep #065F46 at the bottom-right.
 *
 * The bars are deliberately chunky (roughly 19% of the viewBox) so the F
 * stays legible at 32px in a header and at 16px as a favicon.
 */
export function LogoMark({ className }: LogoProps) {
  // useId can contain colons, which are awkward inside url(#...) references,
  // so strip them to keep the gradient id plain and unique per instance.
  const gradientId = useId().replace(/:/g, '');

  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="8"
          y1="8"
          x2="40"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="45%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#065F46" />
        </linearGradient>
      </defs>
      <path
        d="M8 8h9v32H8V8Z M8 8h32l-9 9H8V8Z M8 22h25l-8 8H8v-8Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

/**
 * Full lockup: the emerald mark beside the wordmark.
 *
 * The wordmark inherits its color (currentColor), so the header and footer
 * control it with their own Tailwind text color; the mark always keeps its
 * emerald gradient. Size the lockup with className, e.g. "h-9 w-auto" — the
 * mark fills the lockup height and the wordmark stacks beside it.
 */
export default function Logo({ className }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-3 ${className ?? ''}`}
      role="img"
      aria-label="Forvab Business Partners LLC"
    >
      <LogoMark className="h-full w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-wide">
          FORVAB
        </span>
        <span className="mt-1 text-[0.55rem] font-medium tracking-[0.32em]">
          BUSINESS PARTNERS LLC
        </span>
      </span>
    </span>
  );
}
