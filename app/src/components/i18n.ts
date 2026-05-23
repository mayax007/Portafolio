import es from '../../../assets/languages/es.json';
import en from '../../../assets/languages/en.json';

export const translations = { es, en} as const;

export type LangCode = keyof typeof translations;
export type TranslationKeys = keyof typeof translations.es;

export function getTranslations(lang: LangCode) {
  return translations[lang];
}