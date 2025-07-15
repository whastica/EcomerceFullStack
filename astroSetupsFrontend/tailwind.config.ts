
import { type Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-background': '#010101',
        'dark-surface': '#1A1A1A',
        'dark-card': '#1E1E1E',
        'dark-text': '#FFFFFF',
        'dark-muted': '#AAAAAA',
        'dark-border': '#333333',
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)',
        'dark-tech-pattern': 'linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #0a0a0a 75%, #000000 100%)',
        'geometric-pattern': `
          radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
          linear-gradient(45deg, rgba(139, 92, 246, 0.03) 25%, transparent 25%, transparent 75%, rgba(139, 92, 246, 0.03) 75%),
          linear-gradient(-45deg, rgba(59, 130, 246, 0.03) 25%, transparent 25%, transparent 75%, rgba(59, 130, 246, 0.03) 75%)
        `,
        'tech-grid': `
          linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
        `,
        'circuit-pattern': `
          linear-gradient(90deg, transparent 24%, rgba(139, 92, 246, 0.05) 25%, rgba(139, 92, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.05) 75%, rgba(139, 92, 246, 0.05) 76%, transparent 77%, transparent),
          linear-gradient(transparent 24%, rgba(59, 130, 246, 0.05) 25%, rgba(59, 130, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.05) 75%, rgba(59, 130, 246, 0.05) 76%, transparent 77%, transparent)
        `,
      },
      backgroundSize: {
        'grid-pattern': '50px 50px',
        'circuit-pattern': '40px 40px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)' },
          '100%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};

export default config;