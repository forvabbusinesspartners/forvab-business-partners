/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './privacy.html',
    './terms.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        coal: '#101010',
        charcoal: '#161616',
        smoke: '#1F1F1F',
        mist: '#A8B0AC',
        glow: '#34D399',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'pulse-ring': 'pulseRing 3.2s ease-out infinite',
        'gradient-pan': 'gradientPan 14s ease infinite',
        'scroll-cue': 'scrollCue 2.2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(2.1)', opacity: '0' },
        },
        gradientPan: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scrollCue: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
