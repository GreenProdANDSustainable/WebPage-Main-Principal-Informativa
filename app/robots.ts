import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * robots.txt real.
 *
 * Antes esta ruta no existía y la atrapaba el segmento dinámico [lang]: al
 * pedir /robots.txt se devolvía el HTML del sitio con lang="robots.txt", de
 * modo que los buscadores no recibían indicación alguna ni encontraban el
 * sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
