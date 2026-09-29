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
        ink: {
          DEFAULT: '#0A0A0A',
          deep: '#050505',
          lighter: '#121212',
        },
        surface: {
          DEFAULT: '#141414',
          elevated: '#1C1C1C',
          muted: '#181818',
          card: '#161616',
        },
        border: {
          DEFAULT: '#262626',
          subtle: '#1F1F1F',
          gold: 'rgba(201, 162, 39, 0.25)',
          'gold-light': 'rgba(201, 162, 39, 0.45)',
        },
        gold: {
          DEFAULT: '#C9A227', // Sampled directly from the Angels Salon logo
          soft: '#DEB843',    // Light hover tint (WCAG AA compliant contrast)
          dark: '#9E7E1B',    // Active / pressed
          muted: 'rgba(201, 162, 39, 0.12)', // Subtle highlight pill
          glow: 'rgba(201, 162, 39, 0.28)',
        },
        text: {
          DEFAULT: '#FFFFFF',
          pure: '#FFFFFF',
          muted: '#A3A3A3',
          subtle: '#737373',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#20BA59',
          dark: '#128C7E',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(201, 162, 39, 0.12)',
        'gold-md': '0 4px 20px rgba(201, 162, 39, 0.22)',
        'gold-glow': '0 0 25px rgba(201, 162, 39, 0.35)',
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
