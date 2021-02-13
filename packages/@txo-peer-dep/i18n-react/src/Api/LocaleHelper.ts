/**
 * @Author: Erik Slovák <erik.slovak@technologystudio.sk>
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2019-04-10T10:04:00+02:00
 * @Copyright: Technology Studio
**/

// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
export const parseLanguage = (locale: string | null): string | null => locale?.substring(0, 2) || null
