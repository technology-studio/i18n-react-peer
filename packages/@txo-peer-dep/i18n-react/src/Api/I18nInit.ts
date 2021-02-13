/**
 * @Author: Erik Slovák <erik.slovak@technologystudio.sk>
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2019-04-10T10:04:00+02:00
 * @Copyright: Technology Studio
**/

import i18next, { TFunction } from 'i18next'
// import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import numbro from 'numbro'
import { is } from '@txo/types'
// import { Log } from '@txo/log'

import { parseLanguage } from './LocaleHelper'
import { parseMissingKey } from './MissingKeyHelper'
import { i18nManager } from './I18nManager'
import { configManager } from './Config'

// const log = new Log('app.Modules.I18n.i18next') // eslint-disable-line no-unused-vars

declare module 'i18next' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface i18n {
    toNumber: (number: number, format: Record<string, unknown>) => string,
  }
}

const loadLanguageResource = (locale: string): void => {
  const language = is(parseLanguage(locale))
  i18next.addResourceBundle(
    language,
    'translation',
    configManager.config.loadTranslation(language),
  )
}

export const i18nInit = async (): Promise<TFunction> => {
  i18nManager.subscribe(loadLanguageResource)

  const originalT = i18next.t
  i18next.t = function (...arg: Parameters<typeof originalT>) {
    const translation: string | null = originalT.apply(this, arg) as string | null
    return configManager.config.displayLocalizationIssues
      ? translation
      : translation?.startsWith('#')
        ? translation.substr(1)
        : translation
  }

  i18next.toNumber = (number: number, format: Record<string, unknown>) => (
    numbro(number).format(format)
  )

  const promise = i18next
  // .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: configManager.config.fallbackLanguage,
      detection: {
        // order and from where user language should be detected
        order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],

        // keys or params to lookup language from
        lookupQuerystring: 'lang',
        lookupCookie: 'i18next',

        // cache user language on
        caches: ['cookie'],
        excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

        // optional expire and domain for set cookie
        cookieMinutes: 10,
      },
      interpolation: {
        escapeValue: false, // not needed for react!!
      },

      react: {
        wait: true,
      },
      parseMissingKeyHandler: (key: string) => parseMissingKey(
        key,
        configManager.config.placeholderTranslationMap,
        { displayLocalizationIssues: configManager.config.displayLocalizationIssues },
      ),
    })
  loadLanguageResource(configManager.config.fallbackLanguage)
  return promise
}
