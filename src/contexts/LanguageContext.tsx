import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '@/i18n';

type Language = 'en' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: { defaultValue?: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('kai-language');
    const lang = (saved as Language) || 'en';
    // Sync i18n with saved language
    i18n.changeLanguage(lang);
    return lang;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('kai-language', lang);
    i18n.changeLanguage(lang);
  };

  const t = (key: string, options?: { defaultValue?: string }): string => {
    // Return translation from i18next, with optional default value
    return i18n.t(key, options?.defaultValue || key);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};