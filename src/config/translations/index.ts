import 'intl-pluralrules';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import id from '@/config/translations/resources/id.json'
import en from '@/config/translations/resources/en.json'

export const internationalization = i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            id,
            en,
        },
        lng: 'en',
        defaultNS: "general",
        debug: false,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default internationalization
