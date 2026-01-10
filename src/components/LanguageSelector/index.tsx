'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`rounded px-3 py-1 text-sm font-medium transition-colors duration-200 ${
          i18n.language === 'en'
            ? 'bg-primary text-white'
            : 'text-body-color hover:bg-gray-2 dark:text-white dark:hover:bg-white/5'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('es')}
        className={`rounded px-3 py-1 text-sm font-medium transition-colors duration-200 ${
          i18n.language === 'es'
            ? 'bg-primary text-white'
            : 'text-body-color hover:bg-gray-2 dark:text-white dark:hover:bg-white/5'
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSelector;
