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
        // Core Light Palette tokens
        background: {
          DEFAULT: '#FAF7F2',
          page: '#FAF7F2',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F3EEE6',
          band: '#F3EEE6',
          card: '#FFFFFF',
          elevated: '#FFFFFF',
          muted: '#F3EEE6',
        },
        // Dark sections (reserved for Hero, Final CTA, and Footer)
        dark: {
          DEFAULT: '#14110E',
          surface: '#1A1613',
          elevated: '#241E1A',
          border: 'rgba(201, 162, 39, 0.25)',
        },
        // Typography tokens
        text: {
          DEFAULT: '#1F1B16',
          pure: '#1F1B16',
          muted: '#6B6258',
          subtle: '#6B6258',
          inverse: '#FAF7F2',
          'inverse-muted': '#A89F91',
        },
        muted: {
          DEFAULT: '#6B6258',
        },
        // Luxury Gold accents
        gold: {
          DEFAULT: '#C9A227', // Fills, borders, icons
          soft: '#DEB843',    // Light hover tint
          hover: '#DEB843',
          dark: '#9E7E1B',    // Active / pressed
          text: '#8A6D12',    // Gold text on light backgrounds (WCAG AA >= 4.5:1)
          muted: 'rgba(201, 162, 39, 0.12)', // Subtle highlight pill
          glow: 'rgba(201, 162, 39, 0.25)',
          line: 'rgba(201, 162, 39, 0.35)',
        },
        // Borders
        border: {
          DEFAULT: 'rgba(201, 162, 39, 0.25)',
          subtle: 'rgba(31, 27, 22, 0.08)',
          line: 'rgba(201, 162, 39, 0.25)',
          gold: 'rgba(201, 162, 39, 0.35)',
          'gold-light': 'rgba(201, 162, 39, 0.45)',
          input: '#B59A57',   // Form inputs (contrast >= 3:1 against #FFFFFF/#FAF7F2)
          dark: 'rgba(201, 162, 39, 0.25)',
        },
        'gold-line': 'rgba(201, 162, 39, 0.35)',
        line: 'rgba(201, 162, 39, 0.25)',
        // Semantic Dark components
        footer: {
          DEFAULT: '#14110E',
          bar: '#0E0C0A',
        },
        'footer-bar': '#0E0C0A',
        raised: {
          DEFAULT: '#FFFFFF',
          hover: '#F3EEE6',
        },
        // Compatibility token aliases (mapping legacy 'ink' gracefully)
        ink: {
          DEFAULT: '#FAF7F2',
          deep: '#F3EEE6',
          lighter: '#FFFFFF',
          dark: '#14110E',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#20BA59',
          dark: '#128C7E',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(201, 162, 39, 0.12)',
        'gold-md': '0 4px 20px rgba(201, 162, 39, 0.22)',
        'gold-glow': '0 0 25px rgba(201, 162, 39, 0.25)',
        'card-light': '0 4px 20px -2px rgba(31, 27, 22, 0.05), 0 2px 6px -1px rgba(31, 27, 22, 0.03)',
        'card-hover': '0 12px 28px -4px rgba(31, 27, 22, 0.09), 0 4px 10px -2px rgba(201, 162, 39, 0.12)',
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
