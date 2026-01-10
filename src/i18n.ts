'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { commonEN } from './i18n/en';
import { commonES } from './i18n/es';


// Configuración de recursos de traducción
const resources = {
  en: {
    common: commonEN,
  },
  es: {
    common: commonES,
  },
};

// Inicializar i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Always start with 'en' to prevent hydration mismatch
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React ya hace el escape
    },
    react: {
      useSuspense: false,
    },
  });

// Guardar idioma en localStorage cuando cambie
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lng);
  }
});

// Restore language from localStorage after hydration (client-side only)
if (typeof window !== 'undefined') {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && savedLanguage !== i18n.language) {
    i18n.changeLanguage(savedLanguage);
  }
}

export default i18n;
