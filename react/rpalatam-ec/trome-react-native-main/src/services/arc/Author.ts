import axios, { CancelTokenSource, CancelTokenStatic } from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache'
import NativeConfig from 'react-native-config'

const FIVE_MINUTES = 1000 * 60 * 5

const instance = axios.create({
  baseURL: NativeConfig.ARC_BASE_URL + '/author/v2/author-service',
  adapter:
    axios.defaults.adapter &&
    cacheAdapterEnhancer(axios.defaults.adapter, {
      enabledByDefault: false,
      defaultCache: new LRUCache({ maxAge: FIVE_MINUTES, max: 5 }),
    }),
})

// eslint-disable-next-line dot-notation
instance.defaults.headers.common['Authorization'] = NativeConfig.ARC_TOKEN

interface AuthorResponse {
  _id: string
  byline: string
  image: string
  firstName: string
  lastName: string
  role: string
  slug: string
}

class Author {
  private cancelToken: CancelTokenStatic
  private source?: CancelTokenSource

  constructor() {
    this.cancelToken = axios.CancelToken
  }

  abort(): void {
    this.source?.cancel('Operation canceled by the user.')
  }

  async getBySlug(slug: string): Promise<AuthorResponse | null> {
    this.source = this.cancelToken.source()
    const response = await instance.get<{ authors: AuthorResponse[] }>('/', {
      cancelToken: this.source.token,
      params: { slug },
    })
    return response.data.authors[0] || null
  }
}

export default new Author()
