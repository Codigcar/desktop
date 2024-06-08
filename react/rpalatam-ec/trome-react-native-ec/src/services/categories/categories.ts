import axios, { AxiosAdapter, AxiosInstance, AxiosRequestConfig } from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache'
import NativeConfig from 'react-native-config'

import { getDomain, queryString } from '../../utils/tools'
import { getQueryCategories } from '../arc/querys'

export type ResponseCategory = {
  _id: string
  name: string
  display_name?: string
  url?: string
}

type ResponseCategories = {
  children: ResponseCategory[]
}

const cacheTime =
  NativeConfig.APP_ENVIRONMENT === 'production'
    ? 1000 * 60 * 60 * 12 //12 hours
    : 1000 * 60 * 5 //5 minutes

class CategoriesService {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: `https://${getDomain()}/pf/api/v3/content/fetch/navigation-by-hierarchy${queryString(
        {
          query: getQueryCategories(),
          filter: '{children{_id,display_name,name,url}}',
        },
      )}`,
      adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter, {
        enabledByDefault: false,
        defaultCache: new LRUCache({ max: 100, maxAge: cacheTime }),
      }),
    })
  }

  async get(config?: AxiosRequestConfig) {
    const response = await this.instance.get<ResponseCategories>('/', config)
    return response.data
  }
}

export default new CategoriesService()
