import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage } from '../types';
import { translations } from './translations';

interface LanguageContextProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: keyof typeof translations['en'], fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const STORAGE_KEY = 'rw_smart_farming_lang';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'rw' || saved === 'fr') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const t = (key: keyof typeof translations['en'], fallback?: string): string => {
    const langDict = translations[language] || translations.en;
    const value = (langDict as Record<string, string>)[key];
    if (value) return value;
    const enValue = (translations.en as Record<string, string>)[key];
    if (enValue) return enValue;
    return fallback || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
