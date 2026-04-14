import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { appLanguages, defaultLanguage, resolveAppLanguage } from './languages'
import { resources } from './resources'

const LANGUAGE_STORAGE_KEY = 'i18nextLng'

function syncDocumentLanguage(language: string) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.lang = resolveAppLanguage(language)
}

if (!i18n.isInitialized) {
  void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      supportedLngs: appLanguages,
      fallbackLng: defaultLanguage,
      defaultNS: 'translation',
      ns: ['translation'],
      load: 'languageOnly',
      initAsync: false,
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
        lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    })

  syncDocumentLanguage(i18n.resolvedLanguage ?? i18n.language)
  i18n.on('languageChanged', syncDocumentLanguage)
}

export { LANGUAGE_STORAGE_KEY }

export default i18n
