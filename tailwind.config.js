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
          light: '#faf8f5',
          dark: '#0c0e12',
        },
        editorial: {
          bg: '#faf8f5',
          surface: '#ffffff',
          card: '#f5f2eb',
          border: '#e8e4dc',
          ink: '#11161b',
          muted: '#626d7a',
          tint: {
            green: '#f0fdf4',
            blue: '#f0f9ff',
            lavender: '#f5f3ff',
            peach: '#fffbeb',
            sand: '#f7f4ee',
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
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'float-slow': 'float 6s ease-in-out infinite',
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
        }
      }
    },
  },
  plugins: [],
}
