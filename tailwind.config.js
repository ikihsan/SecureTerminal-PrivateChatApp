/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cowhide-cocoa': 'var(--cowhide-cocoa)',
        'cowhide-cream': 'var(--cowhide-cream)',
        'golden-butter': 'var(--golden-butter)',
        'tribal-bronze': 'var(--tribal-bronze)',
        'circuit-glow': 'var(--circuit-glow)',
        'organic-shadow': 'var(--organic-shadow)',
        'holo-overlay': 'var(--holo-overlay)',
        'muted-ink': 'var(--muted-ink)',
        'surface': 'var(--surface)',
      },
      borderRadius: {
        'bubble': 'var(--radius-bubble)',
        'pill': 'var(--radius-pill)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        tribal: 'var(--font-tribal)',
        organic: 'var(--font-organic)',
      },
      boxShadow: {
        'elevation-1': 'var(--elevation-1)',
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        ripple: 'ripple 0.6s ease-out',
        morph: 'morph 3s ease-in-out infinite',
        breathe: 'breathe 4s ease-in-out infinite',
        'particle-float': 'particle-float 6s ease-in-out infinite',
        'liquid-gold': 'liquid-gold 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        morph: {
          '0%': { 'border-radius': '50%' },
          '50%': { 'border-radius': '20% 80% 30% 70%' },
          '100%': { 'border-radius': '50%' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        'particle-float': {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '100%': { transform: 'translateY(-20px) rotate(360deg)' },
        },
        'liquid-gold': {
          '0%': { background: 'linear-gradient(45deg, var(--cowhide-cocoa), var(--golden-butter))' },
          '50%': { background: 'linear-gradient(45deg, var(--golden-butter), var(--circuit-glow))' },
          '100%': { background: 'linear-gradient(45deg, var(--cowhide-cocoa), var(--golden-butter))' },
        },
      },
    },
  },
  plugins: [],
}