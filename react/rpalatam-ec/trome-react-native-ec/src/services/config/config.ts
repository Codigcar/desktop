import axios, { AxiosAdapter } from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache'
import NativeConfig from 'react-native-config'

import { App } from '../../utils/config'

const cacheTime =
  NativeConfig.APP_ENVIRONMENT === 'production'
    ? 1000 * 60 * 60 * 48 // 48 hours
    : 1000 * 60 * 5 //5 minutes

const instance = axios.create({
  baseURL: `${NativeConfig.APP_CONFIG_URL}/${App.key}`,
  adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter, {
    enabledByDefault: false,
    defaultCache: new LRUCache({ max: 5, maxAge: cacheTime }),
  }),
})

export type ResponseNotification = {
  title: string
  data: {
    display_name: string
    id: string
    image?: string
  }[]
}[]

export type ResponseCategoryItem =
  | { display_name: string; screen: string; params?: Record<string, unknown> }
  | { display_name: string; url: string }

export type ResponseCategoriesMenu = {
  header: ResponseCategoryItem[]
  main: {
    title: string
    data: ResponseCategoryItem[]
  }[]
  footer: ResponseCategoryItem[]
}

export type ResponseInterests = {
  text: string
  slug: string
}[]

class ConfigService {
  async navigation() {
    const response = await instance.get<ResponseCategoriesMenu>('/navigation')
    return response.data
  }

  async notification(): Promise<ResponseNotification> {
    const response = await instance.get<ResponseNotification>('/notification')
    return response.data
  }

  async interests(): Promise<ResponseInterests> {
    const response = await instance.get<ResponseInterests>('/interests')
    return response.data
  }
}

export default new ConfigService()
