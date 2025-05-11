/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Poppins', 'sans-serif']
      },
      colors: {
        primary: {
          50: '#E6EEF9',
          100: '#CCDDF3',
          200: '#99BBE7',
          300: '#6699DB',
          400: '#3377CF',
          500: '#3366CC', // Primary
          600: '#2952A3',
          700: '#1F3D7A',
          800: '#142952',
          900: '#0A1429'
        },
        accent: {
          50: '#FFFBE6',
          100: '#FFF7CC',
          200: '#FFEF99',
          300: '#FFE766',
          400: '#FFDF33',
          500: '#FFD100', // Accent
          600: '#CCA700',
          700: '#997D00',
          800: '#665300',
          900: '#332A00'
        },
        success: {
          500: '#4CAF50'
        },
        warning: {
          500: '#FF9800'
        },
        error: {
          500: '#F44336'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      }
    },
  },
  plugins: [],
};