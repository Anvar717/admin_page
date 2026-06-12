import { createI18n } from 'vue-i18n'
import uzLatn from './locales/uz-Latn'
import uzCyrl from './locales/uz-Cyrl'
import ru from './locales/ru'

export type AppLocale = 'uz-Latn' | 'uz-Cyrl' | 'ru'

const LOCALE_KEY = 'app_locale'

export function getSavedLocale(): AppLocale {
  const saved = localStorage.getItem(LOCALE_KEY)
  if (saved === 'uz-Latn' || saved === 'uz-Cyrl' || saved === 'ru') {
    return saved
  }
  return 'uz-Latn'
}

export function saveLocale(locale: AppLocale) {
  localStorage.setItem(LOCALE_KEY, locale)
}

const i18n = createI18n({
  legacy: false,
  locale: getSavedLocale(),
  fallbackLocale: 'uz-Latn',
  messages: {
    'uz-Latn': uzLatn,
    'uz-Cyrl': uzCyrl,
    ru,
  },
})

export default i18n
