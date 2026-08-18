import type { MetadataRoute } from 'next';
import esMessages from '@/messages/es.json';
import { SITE_URL, LOCALES, DEFAULT_LOCALE, ROUTES } from '@/lib/site';

/**
 * sitemap.xml con todas las páginas del sitio en ambos idiomas, incluidas
 * las de cada línea de producto. Es lo que le indica a Google qué existe y
 * qué revisar; sin él tiene que descubrirlo solo, enlace por enlace.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const categorias = esMessages.Catalog.categories.map((c) => `/catalogo/${c.slug}`);
  const rutas = [...ROUTES, ...categorias];
  const ahora = new Date();

  return rutas.flatMap((ruta) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}/${lang}${ruta}`,
      lastModified: ahora,
      changeFrequency: 'monthly' as const,
      // La portada en español es la página principal del sitio.
      priority: ruta === '' ? (lang === DEFAULT_LOCALE ? 1 : 0.9) : 0.7,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${ruta}`])),
      },
    }))
  );
}
