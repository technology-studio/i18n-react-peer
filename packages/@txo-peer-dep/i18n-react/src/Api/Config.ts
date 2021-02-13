/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-02-13T17:02:55+01:00
 * @Copyright: Technology Studio
**/

import { ConfigManager } from '@txo/config-manager'

export type Config = {
  fallbackLanguage: string,
  loadTranslation: (language: string) => Record<string, unknown> | undefined,
  placeholderTranslationMap: Record<string, string>,
  displayLocalizationIssues: boolean,
}

// @ts-expect-error TODO: we need to create proxy receives list of props that are mandatory and if the value has not been initialized before accessed it will throw an error.
export const configManager: ConfigManager<Config> = new ConfigManager<Config>({})
