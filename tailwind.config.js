/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#ffffff',
          dark: '#0c0e12',
        },
        editorial: {
          bg: '#ffffff',
          surface: '#ffffff',
          card: '#ffffff',
          border: '#e5e5e5',
          ink: '#11161b',
          muted: '#626d7a',
          tint: {
            green: '#f0fdf4',
            blue: '#f0f9ff',
            lavender: '#f5f3ff',
            peach: '#fffbeb',
            sand: '#ffffff',
          }
        },
        dark: {
          bg: '#0c0e12',
          surface: '#13161c',
          card: '#181b24',
          border: '#232836',
          muted: '#8b96a5',
        },
        accent: {
          green: '#059669',
          emerald: '#10b981',
          mint: '#34d399',
          darkgreen: '#064e3b',
          amber: '#d97706',
          red: '#dc2626',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Newsreader"', '"Instrument Serif"', 'Georgia', 'serif'],
        display: ['"Instrument Serif"', '"Newsreader"', 'Georgia', 'serif'],
        hand: ['"Caveat"', 'cursive'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'Menlo', 'Monaco', 'monospace'],
      },
      boxShadow: {
        'editorial': '0 4px 20px -2px rgba(18, 22, 25, 0.05), 0 2px 6px -1px rgba(18, 22, 25, 0.03)',
        'editorial-hover': '0 12px 30px -4px rgba(18, 22, 25, 0.08), 0 4px 10px -2px rgba(18, 22, 25, 0.04)',
        'editorial-float': '0 20px 40px -8px rgba(18, 22, 25, 0.12), 0 8px 16px -4px rgba(18, 22, 25, 0.06)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.04), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
        'glass-hover': '0 16px 36px -6px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
        'glass-dark': '0 8px 30px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'glass-dark-hover': '0 18px 40px -4px rgba(0, 0, 0, 0.8), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'float-slow': 'float 6s ease-in-out infinite',
        'card-float-1': 'cardFloat1 6s ease-in-out infinite',
        'card-float-2': 'cardFloat2 7s ease-in-out infinite 0.8s',
        'card-float-3': 'cardFloat3 5.5s ease-in-out infinite 0.4s',
        'card-float-4': 'cardFloat4 6.5s ease-in-out infinite 1.2s',
        'badge-float': 'badgeFloat 4.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        cardFloat1: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2.5deg)' },
          '50%': { transform: 'translateY(-9px) rotate(-1.5deg)' },
        },
        cardFloat2: {
          '0%, 100%': { transform: 'translateY(0px) rotate(2deg)' },
          '50%': { transform: 'translateY(-11px) rotate(3deg)' },
        },
        cardFloat3: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1deg)' },
          '50%': { transform: 'translateY(-8px) rotate(-2deg)' },
        },
        cardFloat4: {
          '0%, 100%': { transform: 'translateY(0px) rotate(2.8deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1.8deg)' },
        },
        badgeFloat: {
          '0%, 100%': { transform: 'translate(-50%, -50%) rotate(-6deg) scale(1)' },
          '50%': { transform: 'translate(-50%, -54%) rotate(-4deg) scale(1.03)' },
        },
      },
      transitionDuration: {
        DEFAULT: '300ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '350': '350ms',
        '400': '400ms',
        '450': '450ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.25, 1, 0.5, 1)',
        'smooth': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'editorial': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'spring': 'cubic-bezier(0.34, 1.25, 0.64, 1)',
      }
    },
  },
  plugins: [],
}
