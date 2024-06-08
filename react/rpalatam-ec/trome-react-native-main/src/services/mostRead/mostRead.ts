import axios from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache'
import NativeConfig from 'react-native-config'

import { App } from '../../utils/config'

const cacheTime =
  NativeConfig.APP_ENVIRONMENT === 'production'
    ? 1000 * 60 * 60 * 24 // 24 hours
    : 1000 * 60 * 5 //5 minutes

const instance = axios.create({
  baseURL: `${NativeConfig.APP_MOST_READ_BASE_URL}/${App.key}`,
  adapter:
    axios.defaults.adapter &&
    cacheAdapterEnhancer(axios.defaults.adapter, {
      enabledByDefault: false,
      defaultCache: new LRUCache({ max: 5, maxAge: cacheTime }),
    }),
})

type ResponseMostRead = {
  path: string
  pageViews: number
  dimension8: string
}[]

class MostReadService {
  async get(type: 'normal' | 'premium' = 'normal'): Promise<string[]> {
    const response = await instance.get<ResponseMostRead>(`/${type}/top.json`)
    return response.data.map((story) => story.dimension8)
  }
}

export default new MostReadService()
