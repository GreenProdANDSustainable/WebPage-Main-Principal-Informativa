import 'server-only'

const dictionaries = {
    en: () => import('./messages/en.json').then((module) => module.default),
    es: () => import('./messages/es.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'es' | 'en') => dictionaries[locale]()
