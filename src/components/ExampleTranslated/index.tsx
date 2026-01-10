'use client';

import { useTranslation } from 'react-i18next';

/**
 * Ejemplo de componente que utiliza traducciones de i18next
 * 
 * Este componente demuestra cómo usar las traducciones en tus componentes.
 * Puedes copiar este patrón en cualquier componente que necesite textos traducidos.
 */
const ExampleTranslatedComponent = () => {
  const { t } = useTranslation('common');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {t('hero.title')}
      </h1>
      <p className="text-lg mb-4">
        {t('hero.description')}
      </p>
      <div className="flex gap-4">
        <button className="bg-primary text-white px-6 py-3 rounded-lg">
          {t('hero.downloadNow')}
        </button>
        <button className="bg-gray-200 text-dark px-6 py-3 rounded-lg">
          {t('hero.starOnGithub')}
        </button>
      </div>
      
      {/* Ejemplo de navegación traducida */}
      <nav className="mt-8">
        <ul className="flex gap-4">
          <li>{t('menu.home')}</li>
          <li>{t('menu.about')}</li>
          <li>{t('menu.pricing')}</li>
          <li>{t('menu.contact')}</li>
          <li>{t('menu.blog')}</li>
        </ul>
      </nav>
    </div>
  );
};

export default ExampleTranslatedComponent;
