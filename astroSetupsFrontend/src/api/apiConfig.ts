const rawBaseUrl = import.meta.env.VITE_API_BASE_URL;

// En produccion (Vercel) VITE_API_BASE_URL es obligatoria.
// Sin fallback a localhost: si falta, fallamos en visible en vez de
// apuntar silenciosamente a un entorno que no existe.
if (!rawBaseUrl) {
  const message =
    'VITE_API_BASE_URL no está definida. Configurala en las variables de entorno (Vercel > Settings > Environment Variables).';
  console.error(message);
  throw new Error(message);
}

export const API_CONFIG = {
  BASE_URL: rawBaseUrl,

  APP_NAME: import.meta.env.VITE_APP_NAME || 'ASTROSETUPSFRONTEND',

  TIMEOUT: 10000,
};
