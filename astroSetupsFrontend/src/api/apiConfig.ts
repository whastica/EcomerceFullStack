export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:8090/whalensoft/api',

  APP_NAME:
    import.meta.env.VITE_APP_NAME ||
    'ASTROSETUPSFRONTEND',

  TIMEOUT: 10000,
};

if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn(
    'VITE_API_BASE_URL no está definida. Usando URL por defecto:',
    API_CONFIG.BASE_URL
  );
}

console.log('API CONFIG:', API_CONFIG);