import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import i18nextHttpBackend from 'i18next-http-backend'
import languageDetector from 'i18next-browser-languagedetector'
import { I18N_LANGUAGES } from '@/constants/i18n'

i18n
  .use(i18nextHttpBackend)
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: true,
    supportedLngs: Object.values(I18N_LANGUAGES),
    fallbackLng: I18N_LANGUAGES.ZH_CN,
    interpolation: { escapeValue: false },
    // i18next-http-backend translation file path
    // https://github.com/i18next/i18next-http-backend
    backend: {
      path: 'asset/locales/{{lng}}/{{ns}}.json'
    }
  })

export default i18n
