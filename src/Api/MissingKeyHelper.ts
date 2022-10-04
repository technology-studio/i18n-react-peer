/**
 * @Author: Erik Slovák <erik.slovak@technologystudio.sk>
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2019-04-10T10:04:00+02:00
 * @Copyright: Technology Studio
**/

import { Log } from '@txo/log'

const log = new Log('app.Modules.I18n.Api.MissingKeyHelper')

const MISSING_KEY_PREFIX = '@'

export const addMissingKeyPrefix = (key: string): string =>
  MISSING_KEY_PREFIX + key

const replacePunctuation = (
  key: string,
  placeholderTranslationMap: Record<string, string>,
): string =>
  Object.keys(placeholderTranslationMap).reduce(
    (replacedString, punctuationPlaceholder) => {
      const punctuationReplacment =
        placeholderTranslationMap[punctuationPlaceholder]
      const punctuationPlaceholderRegex = new RegExp(
        `${punctuationPlaceholder}`,
        'g',
      )
      return replacedString.replace(
        punctuationPlaceholderRegex,
        punctuationReplacment,
      )
    },
    key,
  )

const replaceUnderscoresAndPunctuation = (
  key: string,
  placeholderTranslationMap: Record<string, string>,
): string => {
  let translation = key.split('.').slice(-1)[0]
  translation = replacePunctuation(translation, placeholderTranslationMap)
  return translation
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, (_match, p1: string, p2: string) => `${p1} ${p2.toLowerCase()}`)
}

export const parseMissingKey = (
  key: string,
  placeholderTranslationMap: Record<string, string>,
  { displayLocalizationIssues }: { displayLocalizationIssues: boolean },
): string => {
  let handledKey = key
  log.debug('parseMissingKey', { key })
  handledKey = replaceUnderscoresAndPunctuation(
    handledKey,
    placeholderTranslationMap,
  )
  handledKey = displayLocalizationIssues
    ? addMissingKeyPrefix(handledKey)
    : handledKey

  return handledKey
}
