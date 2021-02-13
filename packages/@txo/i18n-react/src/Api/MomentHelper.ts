/**
 * @Author: Erik Slovák <erik.slovak@technologystudio.sk>
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2019-04-10T10:04:00+02:00
 * @Copyright: Technology Studio
**/

const supportedLocaleList = [
  'sk',
  'hu',
  'en-gb',
  'en-au',
  'en-ca',
  'en-gb',
  'en-ie',
  'en-il',
  'en-nz',
]

export const getSupportedLocale = (locale: string): string => {
  const isLocaleSupported = (locale: string): boolean => (
    supportedLocaleList.includes(locale)
  )

  const compareArrays = (array1: string[], array2: string[]): number => {
    const len = Math.min(array1.length, array2.length)
    const lengthDiff = Math.abs(array1.length - array2.length)
    let diffs = 0
    for (let index = 0; index < len; index++) {
      if (array1[index] !== array2[index]) {
        diffs++
      }
    }
    return diffs + lengthDiff
  }

  const normalizeLocale = (key: string): string => key.toLowerCase().replace('_', '-')

  const normalizedLocale = normalizeLocale(locale)

  const split = normalizedLocale.split('-')
  let index = split.length
  const next = normalizedLocale ? normalizedLocale.split('-') : null
  while (index > 0) {
    const localeCandidate = split.slice(0, index).join('-')
    if (isLocaleSupported(localeCandidate)) {
      return localeCandidate
    }
    if (next && next.length >= index && compareArrays(split, next) >= index - 1) {
      // the next array item is better than a shallower substring of this one
      break
    }
    index--
  }
  return 'en'
}
