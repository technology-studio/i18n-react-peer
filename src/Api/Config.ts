/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-02-13T17:02:55+01:00
 * @Copyright: Technology Studio
**/

import { ConfigManager } from '@txo/config-manager'
import type { LanguageDetectorModule } from 'i18next'

export type Config = {
  fallbackLanguage: string,
  languageDetector: LanguageDetectorModule,
  loadTranslation: (language: string) => Record<string, unknown> | undefined,
  placeholderTranslationMap: Record<string, string>,
  displayLocalizationIssues: boolean,
}

export const configManager: ConfigManager<Config> = new ConfigManager<Config>({
  loadTranslation: undefined,
})
