import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import faTranslation from "./locales/fa.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      fr: {
        translation: faTranslation
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });


  initReactI18next({
    i18n: i18n
  });