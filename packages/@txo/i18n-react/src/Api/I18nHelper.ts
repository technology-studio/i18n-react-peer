/**
 * @Author: Erik Slovák <erik.slovak@technologystudio.sk>
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2019-04-10T10:04:00+02:00
 * @Copyright: Technology Studio
**/

import i18next from 'i18next'

const NOT_LOCALIZED = '@NOT_LOCALIZED'

export const getLocalization = ({ text, textLocalizationKey }: { text?: string, textLocalizationKey?: string }): string => (
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  text || (textLocalizationKey && i18next.t(textLocalizationKey)) || NOT_LOCALIZED
)
