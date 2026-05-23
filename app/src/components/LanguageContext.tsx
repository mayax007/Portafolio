import React, { createContext, useContext, useState } from 'react';
import { getTranslations, LangCode } from './i18n';

type LanguageContextType = {
  lang: LangCode;
  setLanguage: (lang: LangCode) => void;
  t: (path: string) => any;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, initialLang = 'es' }: {
  children: React.ReactNode;
  initialLang?: LangCode;
}) {
  const [lang, setLang] = useState<LangCode>(initialLang);

  const setLanguage = (newLang: LangCode) => setLang(newLang);

  // Soporta rutas anidadas: t('NavBar.links') o t('HeroSection.Welcome')
  const t = (path: string): any => {
    return path.split('.').reduce((obj: any, key) => obj?.[key], getTranslations(lang)) ?? path;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation debe usarse dentro de <LanguageProvider>');
  }
  return context;
}