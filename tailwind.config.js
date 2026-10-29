/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Lustre Studio inspired warm alabaster & sand palette
        background: {
          DEFAULT: '#F7F4EF',
          page: '#F7F4EF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#E8E1D6',
          band: '#E8E1D6',
          card: '#FFFFFF',
          elevated: '#FFFFFF',
          muted: '#E8E1D6',
        },
        // Deep warm espresso & charcoal for editorial contrast
        dark: {
          DEFAULT: '#171513',
          surface: '#1F1C18',
          elevated: '#28231E',
          border: 'rgba(185, 151, 98, 0.25)',
        },
        // Typography tokens
        text: {
          DEFAULT: '#171513',
          pure: '#171513',
          muted: '#6B6258',
          subtle: '#6B6258',
          inverse: '#F7F4EF',
          'inverse-muted': '#A89F91',
        },
        muted: {
          DEFAULT: '#6B6258',
        },
        // Lustre Studio warm antique bronze & gold accents
        gold: {
          DEFAULT: '#B99762', // Lustre antique gold
          soft: '#CBB184',    // Hover tint
          hover: '#CBB184',
          light: '#CBB184',
          dark: '#6B4F32',    // Lustre deep bronze
          text: '#6B4F32',    // High-contrast text on cream
          muted: 'rgba(185, 151, 98, 0.12)',
          glow: 'rgba(185, 151, 98, 0.25)',
          line: 'rgba(185, 151, 98, 0.35)',
        },
        'gold-light': '#CBB184',
        'gold-text': '#6B4F32',
        // Borders
        border: {
          DEFAULT: '#E8E1D6',
          subtle: 'rgba(23, 21, 19, 0.08)',
          line: 'rgba(185, 151, 98, 0.30)',
          gold: 'rgba(185, 151, 98, 0.35)',
          'gold-light': 'rgba(185, 151, 98, 0.45)',
          input: '#B99762',
          dark: 'rgba(185, 151, 98, 0.25)',
        },
        'gold-line': 'rgba(185, 151, 98, 0.35)',
        line: 'rgba(185, 151, 98, 0.25)',
        footer: {
          DEFAULT: '#171513',
          bar: '#100E0D',
        },
        'footer-bar': '#100E0D',
        raised: {
          DEFAULT: '#FFFFFF',
          hover: '#E8E1D6',
        },
        ink: {
          DEFAULT: '#F7F4EF',
          deep: '#E8E1D6',
          lighter: '#FFFFFF',
          dark: '#171513',
        },
        whatsapp: {
          DEFAULT: '#075E54',
          hover: '#0A7366',
          dark: '#054C44',
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'arch': '240px 240px 32px 32px',
        'arch-sm': '140px 140px 24px 24px',
        'arch-xs': '90px 90px 18px 18px',
      },
      boxShadow: {
        'lustre-sm': '0 2px 12px rgba(23, 21, 19, 0.04)',
        'lustre-md': '0 8px 30px rgba(23, 21, 19, 0.06)',
        'lustre-lg': '0 20px 50px rgba(23, 21, 19, 0.09)',
        'gold-sm': '0 2px 10px rgba(185, 151, 98, 0.15)',
        'gold-md': '0 4px 20px rgba(185, 151, 98, 0.25)',
        'gold-glow': '0 0 25px rgba(185, 151, 98, 0.25)',
        'card-light': '0 4px 24px -2px rgba(23, 21, 19, 0.05), 0 2px 8px -1px rgba(23, 21, 19, 0.03)',
        'card-hover': '0 16px 36px -4px rgba(23, 21, 19, 0.08), 0 4px 14px -2px rgba(185, 151, 98, 0.15)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      },
      letterSpacing: {
        'luxury': '0.12em',
        'luxury-wide': '0.22em',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
}
