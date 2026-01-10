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
    lng: typeof window !== 'undefined' ? localStorage.getItem('language') || 'en' : 'en',
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

export default i18n;
