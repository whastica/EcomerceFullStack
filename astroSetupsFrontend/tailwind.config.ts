
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
        // Theme colors optimizados
        dark: {
          background: '#010101',
          surface: '#1A1A1A',
          card: '#1E1E1E',
          text: '#FFFFFF',
          muted: '#AAAAAA',
          border: '#333333',
        },
        light: {
          background: '#FFFFFF',
          surface: '#F8F9FA',
          card: '#FFFFFF',
          text: '#1A1A1A',
          muted: '#6B7280',
          border: '#E5E7EB',
        },
        // Brand colors
        brand: {
          primary: '#8B5CF6',
          secondary: '#3B82F6',
          accent: '#06B6D4',
        }
      },
      backgroundImage: {
        // Gradientes principales optimizados
        'diagonal-gradient': 'linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #404040 50%, #808080 75%, #ffffff 100%)',
        'diagonal-gradient-subtle': 'linear-gradient(135deg, #000000 0%, #0f0f0f 20%, #2a2a2a 40%, #4a4a4a 60%, #6a6a6a 80%, #f0f0f0 100%)',
        'diagonal-soft': 'linear-gradient(135deg, #000000 0%, #1a1a1a 30%, #333333 60%, #999999 90%, #ffffff 100%)',
        
        // Patrones de fondo mejorados
        'geometric-pattern': `
          radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
          linear-gradient(45deg, rgba(139, 92, 246, 0.02) 25%, transparent 25%, transparent 75%, rgba(139, 92, 246, 0.02) 75%),
          linear-gradient(-45deg, rgba(59, 130, 246, 0.02) 25%, transparent 25%, transparent 75%, rgba(59, 130, 246, 0.02) 75%)
        `,
        'tech-grid': `
          linear-gradient(rgba(139, 92, 246, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 92, 246, 0.08) 1px, transparent 1px)
        `,
        'circuit-pattern': `
          linear-gradient(90deg, transparent 24%, rgba(139, 92, 246, 0.03) 25%, rgba(139, 92, 246, 0.03) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.03) 75%, rgba(139, 92, 246, 0.03) 76%, transparent 77%, transparent),
          linear-gradient(transparent 24%, rgba(59, 130, 246, 0.03) 25%, rgba(59, 130, 246, 0.03) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.03) 75%, rgba(59, 130, 246, 0.03) 76%, transparent 77%, transparent)
        `,
        
        // Overlay para legibilidad
        'text-overlay': 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.05) 100%)',
        
        // Glassmorphism backgrounds
        'glass-dark': 'linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(30, 30, 30, 0.6) 100%)',
        'glass-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      },
      backgroundSize: {
        'pattern-sm': '30px 30px',
        'pattern-md': '50px 50px',
        'pattern-lg': '80px 80px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 12s ease-in-out infinite',
        'geometric-shift': 'geometricShift 25s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)' },
        },
        glowPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
            transform: 'scale(1.02)',
          },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
        },
        geometricShift: {
          '0%, 100%': { 
            backgroundPosition: '0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%',
          },
          '33%': { 
            backgroundPosition: '33% 33%, 66% 66%, 99% 99%, 33% 33%, 66% 66%',
          },
          '66%': { 
            backgroundPosition: '66% 66%, 33% 33%, 0% 0%, 66% 66%, 33% 33%',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
            opacity: '0.1',
          },
          '50%': {
            transform: 'translateY(-30px) rotate(180deg)',
            opacity: '0.3',
          },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-hover': '0 8px 32px 0 rgba(139, 92, 246, 0.2)',
        'glow-sm': '0 0 20px rgba(139, 92, 246, 0.15)',
        'glow-md': '0 0 30px rgba(139, 92, 246, 0.25)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 0.35)',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
};

export default config;