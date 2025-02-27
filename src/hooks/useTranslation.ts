import { useState, useCallback, useEffect } from 'react';
import { en } from '@/locales/en';
import { fr } from '@/locales/fr';

type Language = 'en' | 'fr';

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'fr') ? saved : 'fr';
  });

  const translations = {
    en,
    fr
  };

  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const t = useCallback((key: string) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      if (value?.[k]) {
        value = value[k];
      } else {
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }
    }
    
    return value as string;
  }, [currentLanguage]);

  const toggleLanguage = useCallback(() => {
    setCurrentLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  }, []);

  return { t, toggleLanguage, currentLanguage };
};