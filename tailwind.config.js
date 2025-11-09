/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF9933',
          dark: '#E68A2E',
          light: '#FFB366',
        },
        peach: {
          50: '#FFF9F5',
          100: '#FFF4E6',
          200: '#FFE4CC',
          300: '#FFD4B2',
          DEFAULT: '#FFE4CC',
        },
        cream: {
          DEFAULT: '#FFF5EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-peach': 'linear-gradient(135deg, #FFF9F5 0%, #FFE4CC 100%)',
      }
    },
  },
  plugins: [],
}
