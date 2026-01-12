// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import plików JSON z folderu locales w src
import translationEN from './locales/en/translation.json';
import translationDE from './locales/de/translation.json';
import translationES from './locales/es/translation.json';
import translationPL from './locales/pl/translation.json';
import translationRU from './locales/ru/translation.json';
import translationUA from './locales/ua/translation.json';

// Konfiguracja i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      de: { translation: translationDE },
      es: { translation: translationES },
      pl: { translation: translationPL },
      ru: { translation: translationRU },
      ua: { translation: translationUA },
    },
    lng: 'pl',               // język domyślny
    fallbackLng: 'pl',       // język zapasowy
    interpolation: {
      escapeValue: false,    // React już escapuje wartości
    },
  });

export default i18n;
