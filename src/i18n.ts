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
    lng: 'es', // Default to Spanish (primary site language)
    fallbackLng: 'es',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React ya hace el escape
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
