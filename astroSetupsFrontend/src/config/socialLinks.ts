// ============================================================
// REDES SOCIALES Y CONTACTO · Fuente única de verdad
// Todo enlace de redes/WhatsApp de la app se lee desde aquí.
// Si cambia una URL, se cambia acá una sola vez.
// ============================================================

/**
 * WhatsApp en formato internacional sin '+' ni espacios.
 * Colombia: 57 + número.
 */
export const WHATSAPP_NUMBER = '573237221518';

export const FACEBOOK_URL = 'https://www.facebook.com/astrosetupssolutions';
export const INSTAGRAM_URL =
  'https://www.instagram.com/astrosetupsolutions/?igsh=bW8zd2thdnNoMmZl';
export const TIKTOK_URL = 'https://www.tiktok.com/@astrosetups.solutions';

/** WhatsApp sin mensaje pre-cargado. */
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * Enlace de WhatsApp con mensaje pre-cargado.
 * buildWhatsAppUrl('Hola') → https://wa.me/573237221518?text=Hola
 */
export function buildWhatsAppUrl(message?: string): string {
  if (!message) return WHATSAPP_URL;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
