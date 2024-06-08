import axios, {
  AxiosAdapter,
  AxiosRequestConfig,
  CancelTokenSource,
  CancelTokenStatic,
} from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache'
import NativeConfig from 'react-native-config'

import * as T from './types'
import { getContentFormated, getStoryFormated } from './utils'
import { Story } from '../../entities/Story'
import { App } from '../../utils/config'

export { queryInclude, getQueryBySection } from './querys'

const FIVE_MINUTES = 1000 * 60 * 5

const instance = axios.create({
  baseURL: NativeConfig.ARC_BASE_URL + '/content/v4',
  adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter, {
    enabledByDefault: false,
    defaultCache: new LRUCache({ maxAge: FIVE_MINUTES, max: 100 }),
  }),
})

// eslint-disable-next-line dot-notation
instance.defaults.headers.common['Authorization'] = NativeConfig.ARC_TOKEN

type Options<R = unknown, P = unknown, D = R> = {
  url: string
  config: AxiosRequestConfig
  transformParams: (params: P) => { [key: string]: string | boolean | number }
  transformResponse?: (response: R) => D
}

class Service<R, P, D = R> {
  private cancelToken: CancelTokenStatic
  private abortController?: CancelTokenSource
  private options: Options<R, P, D>

  constructor(options: Options<R, P, D>) {
    this.cancelToken = axios.CancelToken
    this.options = {
      ...options,
      config: {
        ...options.config,
        params: this.staticParams(options.config.params),
      },
    }
  }

  private staticParams(params: AxiosRequestConfig['params']) {
    const staticParams: AxiosRequestConfig['params'] = {
      website: App.key,
      published: true,
    }
    const keys = Object.keys(params)
    keys.forEach((key) => {
      if (!params[key]) return
      staticParams[key] = params[key]
    })
    return staticParams
  }

  abort() {
    this.abortController?.cancel('Operation canceled')
  }

  async get(params: P): Promise<D> {
    this.abortController = this.cancelToken.source()
    const paramsFormated = this.options.transformParams(params)
    const response = await instance.get(this.options.url, {
      ...this.options.config,
      cancelToken: this.abortController.token,
      params: {
        ...this.options.config.params,
        ...paramsFormated,
      },
    })
    const data = this.options.transformResponse?.(response.data)
    return data || response.data
  }
}

interface IdsConfig extends AxiosRequestConfig {
  params: { sourceInclude?: string }
}

type IdsParams = string[]

interface SearchConfig extends AxiosRequestConfig {
  params: {
    query: string
    size?: number
    sort?: 'last_updated_date:asc' | 'last_updated_date:desc'
    sourceExclude?: string
    sourceInclude?: string
  }
}

type SearchParams = Partial<SearchConfig['params']> & {
  page: number
}

interface StoriesConfig extends AxiosRequestConfig {
  params: { sourceInclude?: string }
}

type StoriesParams = { id: string } | { pathname: string }
type StoriesParamsTransform = { _id: string } | { website_url: string }

class Content {
  headlines() {
    let abortController: CancelTokenSource | undefined
    const get = async (): Promise<Story[]> => {
      abortController = axios.CancelToken.source()
      const response = await axios.get<T.ServiceNews>(
        `${NativeConfig.ARC_HOME_CONTENT_URI}/${App.key}/home.json`,
        {
          adapter:
            axios.defaults.adapter &&
            cacheAdapterEnhancer(axios.defaults.adapter, {
              enabledByDefault: false,
              defaultCache: new LRUCache({ maxAge: FIVE_MINUTES, max: 1 }),
            }),
          cancelToken: abortController.token,
        },
      )
      return getContentFormated(response.data)
    }

    return {
      abort: () => abortController?.cancel('Operation canceled'),
      get,
    }
  }

  ids(config: IdsConfig): Service<T.ServiceNews, IdsParams> {
    const transformParams = (ids: IdsParams) => ({ ids: ids.join(',') })
    return new Service({
      url: '/ids',
      config: {
        ...config,
        params: { _sourceInclude: config.params.sourceInclude },
      },
      transformParams,
    })
  }

  search(config: SearchConfig): Service<T.ServiceNews, SearchParams, Story[]> {
    const size = config.params.size || 10
    const transformParams = ({
      page,
      query,
      sort = 'last_updated_date:desc',
    }: SearchParams) => {
      return {
        sort,
        from: page * size,
        ...(query && { q: query }),
      }
    }
    return new Service({
      url: '/search',
      config: {
        ...config,
        params: {
          q: config.params.query,
          size,
          sort: config.params.sort || 'last_updated_date:desc',
          _sourceExclude: config.params.sourceExclude,
          _sourceInclude: config.params.sourceInclude,
        },
      },
      transformParams,
      transformResponse: getContentFormated,
    })
  }

  stories(config: StoriesConfig): Service<T.Notice, StoriesParams, Story> {
    const transformParams = (params: StoriesParams): StoriesParamsTransform => {
      if ('id' in params) return { _id: params.id }
      return { website_url: params.pathname }
    }
    return new Service({
      url: '/stories',
      config: {
        ...config,
        params: { included_fields: config.params.sourceInclude },
      },
      transformParams,
      transformResponse: getStoryFormated,
    })
  }
}

export default new Content()
