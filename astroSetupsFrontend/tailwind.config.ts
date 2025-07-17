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
        'light-background': '#FFFFFF',
        'light-surface': '#F8F9FA',
        'light-card': '#FFFFFF',
        'light-text': '#1A1A1A',
        'light-muted': '#6B7280',
        'light-border': '#E5E7EB',
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)',
        'dark-tech-pattern': 'linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #0a0a0a 75%, #000000 100%)',
        // Nuevo degradado diagonal principal
        'diagonal-gradient': 'linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #404040 50%, #808080 75%, #ffffff 100%)',
        'diagonal-gradient-subtle': 'linear-gradient(135deg, #000000 0%, #0f0f0f 20%, #2a2a2a 40%, #4a4a4a 60%, #6a6a6a 80%, #f0f0f0 100%)',
        // Versión más suave para áreas específicas
        'diagonal-soft': 'linear-gradient(135deg, #000000 0%, #1a1a1a 30%, #333333 60%, #999999 90%, #ffffff 100%)',
        // Patrones geométricos adaptados
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
        // Overlay para mejorar legibilidad en áreas claras
        'text-overlay': 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.1) 100%)',
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
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
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
        gradientShift: {
          '0%, 100%': { 
            backgroundPosition: '0% 0%' 
          },
          '50%': { 
            backgroundPosition: '100% 100%' 
          },
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