/**
 * Dirección pública del sitio, en un solo lugar.
 *
 * Es greenprod.pe, el dominio de la empresa, que ya sirve este mismo sitio a
 * través de Cloudflare. El subdominio pag-web.gerencia-9cb.workers.dev
 * muestra el mismo contenido, así que las URLs canónicas, el sitemap y los
 * datos estructurados tienen que apuntar acá: es lo que le indica a Google
 * cuál de las dos direcciones es la oficial y evita que compitan entre sí
 * como contenido duplicado.
 *
 * Se puede sobrescribir con NEXT_PUBLIC_SITE_URL sin tocar código.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://greenprod.pe').replace(
  /\/$/,
  ''
);

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
  '/productos-y-servicios/proyectos',
  '/contacto',
  '/asistente-ia',
  '/privacidad',
];
