import axios, { CancelTokenSource, CancelTokenStatic } from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache'
import NativeConfig from 'react-native-config'

export { queryInclude, getQueryBySection } from './querys'

const FIVE_MINUTES = 1000 * 60 * 5

const instance = axios.create({
  baseURL: NativeConfig.ARC_BASE_URL + '/tags/v2/slugs',
  adapter:
    axios.defaults.adapter &&
    cacheAdapterEnhancer(axios.defaults.adapter, {
      enabledByDefault: false,
      defaultCache: new LRUCache({ maxAge: FIVE_MINUTES, max: 5 }),
    }),
})

// eslint-disable-next-line dot-notation
instance.defaults.headers.common['Authorization'] = NativeConfig.ARC_TOKEN

interface TagResponse {
  description: string
  name: string
  path: string
  slug: string
  tag: string
}

class Tag {
  private cancelToken: CancelTokenStatic
  private source?: CancelTokenSource

  constructor() {
    this.cancelToken = axios.CancelToken
  }

  abort(): void {
    this.source?.cancel('Operation canceled by the user.')
  }

  async getBySlug(slug: string): Promise<TagResponse | null> {
    this.source = this.cancelToken.source()
    const response = await instance.get<{ Payload: (TagResponse | null)[] }>(
      '/',
      {
        cancelToken: this.source.token,
        params: { slugs: slug },
      },
    )
    return response.data.Payload[0]
  }
}

export default new Tag()
