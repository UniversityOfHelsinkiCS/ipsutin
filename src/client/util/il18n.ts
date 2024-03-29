import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import en from '../locales/en.json'
import fi from '../locales/fi.json'
import sv from '../locales/sv.json'

declare global {
  interface Window {
    __i18n__: typeof i18n
  }
}

const defaultLanguage = 'en'

const initializeI18n = () =>
  i18n.use(initReactI18next).init({
    resources: {
      en,
      fi,
      sv,
    },
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    defaultNS: 'common',
  })

// eslint-disable-next-line
window.__i18n__ = i18n

export default initializeI18n
