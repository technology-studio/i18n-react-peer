import * as i18next from 'i18next'
import numbro from 'numbro'

import { configManager } from './Config'

const originalT = i18next.t
// @ts-expect-error - we are injecting t function
// eslint-disable-next-line no-import-assign, import/namespace
i18next.t = function (...arg: Parameters<typeof originalT>) {
  const translation = originalT(...arg)
  return typeof translation === 'string'
    ? configManager.config.displayLocalizationIssues
      ? translation
      : translation?.startsWith('#')
        ? translation.substring(1)
        : translation
    : translation
} as i18next.TFunction

// @ts-expect-error - we are injecting toNumber function
// eslint-disable-next-line no-import-assign, import/namespace
i18next.toNumber = (number: number, format: Record<string, unknown>) => (
  numbro(number).format(format)
)
