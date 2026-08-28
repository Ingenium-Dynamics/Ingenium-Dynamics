/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        'fhd': '1920px'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif']
      },
      colors: {
        brand: {
          dark: '#09090b', // Zinc 950
          card: '#18181b', // Zinc 900
          border: 'rgba(255, 255, 255, 0.08)',
          primary: '#059669', // Emerald 600
          primaryGlow: 'rgba(5, 150, 105, 0.15)',
          accent: '#7c3aed', // Violet 600
          accentGlow: 'rgba(124, 58, 237, 0.15)',
          blue: '#2563eb', // Blue 600
          blueGlow: 'rgba(37, 99, 235, 0.15)'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\"%3E%3Cpath d=\"M0 0h40v40H0z\" fill=\"none\"/%3E%3Cpath d=\"M0 40h40M40 0v40\" stroke=\"rgba(255,255,255,0.03)\" stroke-width=\"1\"/%3E%3C/svg%3E')"
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow': 'glow 8s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 5px rgba(5, 150, 105, 0.2))' },
          '100%': { filter: 'drop-shadow(0 0 20px rgba(124, 58, 237, 0.4))' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  plugins: []
}
