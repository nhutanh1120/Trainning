import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';

import enTranslation from './locales/en/translation.json';
import viTranslation from './locales/vi/translation.json';

// config i18n
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
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

// config dayjs
dayjs.extend(relativeTime);
i18n.on('languageChanged', (lng) => {
    dayjs.locale(lng);
});

export default i18n;
