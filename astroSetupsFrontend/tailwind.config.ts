import { type Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          100: '#E0F2FF',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
        },
        secondary: {
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          900: '#111827',
        },
        accent: {
          600: '#D946EF',
          700: '#C026D3',
        },
      },
      borderColor: {
        DEFAULT: colors.gray[200], // Puedes usar `border` sin sufijo
        border: colors.gray[200],
      },
      backgroundColor: {
        background: colors.white,
      },
      textColor: {
        foreground: colors.gray[900],
      },
    },
  },
  plugins: [],
}

export default config