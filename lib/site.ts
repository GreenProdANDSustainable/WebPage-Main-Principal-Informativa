/**
 * Dirección pública del sitio, en un solo lugar.
 *
 * Hoy apunta al dominio de Cloudflare Workers. Cuando se conecte el dominio
 * propio (greenprod.pe) basta con definir NEXT_PUBLIC_SITE_URL en las
 * variables del proyecto: el sitemap, las URLs canónicas y los datos
 * estructurados pasan a usarlo sin tocar código.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pag-web.gerencia-9cb.workers.dev'
).replace(/\/$/, '');

export const LOCALES = ['es', 'en'] as const;
export const DEFAULT_LOCALE = 'es';

/** Rutas del sitio, sin el prefijo de idioma. */
export const ROUTES = [
  '',
  '/nosotros',
  '/nosotros/quienes-somos',
  '/nosotros/nuestra-trayectoria',
  '/catalogo',
  '/productos-y-servicios/balik',
  '/productos-y-servicios/ceprobio',
  '/productos-y-servicios/planta-tratamiento',
  '/productos-y-servicios/proveeduria',
  '/productos-y-servicios/proyectos',
  '/sostenibilidad',
  '/contacto',
  '/asistente-ia',
];
