import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import enTranslation from './locales/en/translation.json';
import viTranslation from './locales/vi/translation.json';

const resources = {
    en: {
        translation: enTranslation,
    },
    vi: {
        translation: viTranslation,
    },
};

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
