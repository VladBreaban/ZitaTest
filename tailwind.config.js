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
          hover: '#FF7A00',
        },
        orange: {
          DEFAULT: '#FF9B19',
          light: '#FFF5E8',
        },
        navy: {
          DEFAULT: '#043B6C',
          light: '#4A6A85',
          lighter: '#6B7D92',
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
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        border: {
          DEFAULT: '#EEF1F6',
          light: '#EBEBEB',
        },
        status: {
          achieved: {
            bg: '#D1FAE5',
            text: '#065F46',
          },
          'in-progress': {
            bg: '#E5E7EB',
            text: '#4B5563',
          },
          new: {
            bg: '#DBEAFE',
            text: '#1E40AF',
          },
          visualized: {
            bg: '#E0E7FF',
            text: '#3730A3',
          },
          draft: {
            bg: '#FEF3C7',
            text: '#92400E',
          },
          pending: {
            bg: '#FEF3C7',
            text: '#92400E',
          },
          completed: {
            bg: '#D1FAE5',
            text: '#065F46',
          },
          active: {
            bg: '#D1FAE5',
            text: '#065F46',
          },
          inactive: {
            bg: '#FEE2E2',
            text: '#991B1B',
          },
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Tiempos Headline', 'Georgia', 'serif'],
        satoshi: ['Satoshi', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'heading-1': ['32px', { lineHeight: '120%', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-2': ['24px', { lineHeight: '120%', letterSpacing: '-0.02em', fontWeight: '600' }],
        'heading-3': ['20px', { lineHeight: '120%', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body': ['14px', { lineHeight: '19px', fontWeight: '400' }],
        'body-sm': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'label': ['10px', { lineHeight: '13px', fontWeight: '500', letterSpacing: '0.05em' }],
      },
      borderRadius: {
        'sm': '0.5rem',   // 8px
        'DEFAULT': '0.75rem',  // 12px
        'lg': '1rem',     // 16px
        'xl': '1.5rem',   // 24px
        '2xl': '2rem',    // 32px
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'primary': '0 2px 8px rgba(255, 153, 51, 0.25)',
        'card': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-peach': 'linear-gradient(135deg, #FFF9F5 0%, #FFE4CC 100%)',
        'gradient-orange': 'linear-gradient(135deg, #FF9B19 0%, #FF7A00 100%)',
        'gradient-radial-peach': 'radial-gradient(circle at top right, #FFE2B8 0%, #FFF7EC 40%, rgba(255,247,236,0) 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
}
