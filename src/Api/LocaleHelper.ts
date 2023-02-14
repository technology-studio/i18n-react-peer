/**
 * @Author: Erik Slovák <erik.slovak@technologystudio.sk>
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2019-04-10T10:04:00+02:00
 * @Copyright: Technology Studio
**/

export const parseLanguage = (locale: string | null): string | null => (locale != null)
  ? locale?.substring(0, 2)
  : null
