import axios, { CancelTokenSource, CancelTokenStatic } from 'axios'
import NativeConfig from 'react-native-config'

import { App } from '../../utils/config'

const instance = axios.create({
  baseURL: `${NativeConfig.APP_PREFERENCES_URI}/userprofile/public/v2/newsletter`,
})

type User = {
  accessToken?: string
  email?: string
  id?: string
}

class Preferences<T> {
  private brand: string
  public cancelToken: CancelTokenStatic
  public sourceGet?: CancelTokenSource
  private sourcePost?: CancelTokenSource
  private type: string

  constructor(type: keyof Topics) {
    this.brand = App.key
    this.cancelToken = axios.CancelToken
    this.type = type
  }

  abort(): void {
    this.sourceGet?.cancel('Operation canceled by the user.')
    this.sourcePost?.cancel('Operation canceled by the user.')
  }

  async get(id: string): Promise<T> {
    this.sourceGet = this.cancelToken.source()
    const response = await instance.get<{ data: T }>('/', {
      cancelToken: this.sourceGet.token,
      params: { brand: this.brand, type: this.type, uuid: id },
    })

    return response.data.data
  }

  async post(preferences: T, user: User): Promise<T> {
    this.sourcePost = this.cancelToken.source()
    const response = await instance.post<{ data: T }>(
      '/events',
      {
        attributes: { preferences },
        brand: this.brand,
        email: user.email,
        eventName: 'build_preference',
        type: this.type,
        uuid: user.id,
      },
      {
        cancelToken: this.sourcePost.token,
        headers: {
          Authorization: `Bearer ${user.accessToken} ${this.brand}`,
        },
      },
    )
    return response.data.data
  }
}

export type Newsletter = {
  code: string
  name: string
  image: string
  frequency: string
  description: string
  order: number
}

type NewsletterResponse = Record<string, Newsletter[]>

class NewsletterPreference extends Preferences<Topics['newsletter']> {
  async list(): Promise<Newsletter[]> {
    this.sourceGet = this.cancelToken.source()
    const response = await instance.get<NewsletterResponse>('/list', {
      cancelToken: this.sourceGet.token,
    })
    return response.data[App.key]
  }
}

export const FavoritePreferences = new Preferences<Topics['favorites']>(
  'favorites',
)

export const NewsletterPreferences = new NewsletterPreference('newsletter')
