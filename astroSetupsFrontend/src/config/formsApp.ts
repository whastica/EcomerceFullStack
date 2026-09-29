// ============================================================
// FORMS.APP · Configuración del formulario de personalización
// Único lugar donde hay que pegar la URL/ID cuando se tenga
// el acceso definitivo. Ningún otro archivo debe cambiar.
// ============================================================

/**
 * URL completa del formulario de Forms.app.
 * Ejemplo: 'https://forms.app/form/65f1c2a9d0e7b30012345678'
 * Dejar vacío ('') mientras no se tenga el acceso definitivo.
 */
export const FORMS_APP_URL = '';

/**
 * ID corto del formulario (alternativa a la URL completa).
 * Si también se deja vacío, la modal muestra un placeholder.
 * Ejemplo: '65f1c2a9d0e7b30012345678'
 */
export const FORMS_APP_ID = '';

/** Dominio base usado solo cuando se configura el ID y no la URL. */
export const FORMS_APP_BASE_URL = 'https://forms.app/form';

/**
 * Resuelve la URL final que se incrusta en el iframe.
 * Prioridad: FORMS_APP_URL > FORMS_APP_ID > null (sin configurar).
 */
export function getFormsAppUrl(): string | null {
  const url = FORMS_APP_URL.trim();
  if (url) return url;

  const id = FORMS_APP_ID.trim();
  if (id) return `${FORMS_APP_BASE_URL}/${id}`;

  return null;
}
