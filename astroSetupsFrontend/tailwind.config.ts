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
        // Colores personalizados para el tema oscuro
        'dark-background': '#010101',
        'dark-surface': '#1A1A1A',
        'dark-card': '#1E1E1E',
        'dark-text': '#FFFFFF',
        'dark-muted': '#AAAAAA',
        'dark-border': '#333333',
      },
    },
  },
  plugins: [],
};

export default config;