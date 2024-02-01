import i18next, { type TFunction } from 'i18next'
import numbro from 'numbro'

import { configManager } from './Config'

// eslint-disable-next-line import/no-named-as-default-member
const originalT = i18next.t

// eslint-disable-next-line import/no-named-as-default-member
i18next.t = function (...arg: Parameters<typeof originalT>) {
  const translation = originalT(...arg)
  return typeof translation === 'string'
    ? configManager.config.displayLocalizationIssues
      ? translation
      : translation?.startsWith('#')
        ? translation.substring(1)
        : translation
    : translation
} as TFunction

i18next.toNumber = (number: number, format: Record<string, unknown>) => (
  numbro(number).format(format)
)
