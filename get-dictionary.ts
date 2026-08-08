import 'server-only';

const dictionaries = {
  en: () => import('./messages/en.json').then((module) => module.default),
  es: () => import('./messages/es.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const defaultLocale: Locale = 'es';

/**
 * Carga los textos del idioma pedido.
 *
 * Next puede llegar aquí con un segmento que no es un idioma (por ejemplo
 * al resolver rutas de archivos sueltos), así que se cae al idioma por
 * defecto en vez de reventar la petición con un error 500.
 */
export const getDictionary = async (locale: string) =>
  (dictionaries[locale as Locale] ?? dictionaries[defaultLocale])();
