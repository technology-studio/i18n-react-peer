/* eslint-disable import/no-named-as-default-member */
/**
 * @Author: Erik Slovák <erik.slovak@technologystudio.sk>
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2019-04-10T10:04:00+02:00
 * @Copyright: Technology Studio
**/

import i18next from 'i18next'
import { is } from '@txo/types'

import { parseLanguage } from './LocaleHelper'

type OnChange = (locale: string) => void

export class I18nManager {
  subscriberList: Set<OnChange>

  constructor () {
    this.subscriberList = new Set()
    i18next.on('languageChanged', this.emitLocaleChanged)
  }

  async setLocale (nextLocale: string): Promise<void> {
    await i18next.changeLanguage(nextLocale)
  }

  emitLocaleChanged = (nextLocale: string): void => {
    this.subscriberList.forEach(onChange => { onChange(nextLocale) })
  }

  getLocale (): string {
    return i18next.language
  }

  getLanguage (): string {
    return is(parseLanguage(this.getLocale()))
  }

  subscribe (onChange: OnChange): void {
    this.subscriberList.add(onChange)
  }

  unsubscribe (onChange: OnChange): void {
    this.subscriberList.delete(onChange)
  }
}

export const i18nManager = new I18nManager()
