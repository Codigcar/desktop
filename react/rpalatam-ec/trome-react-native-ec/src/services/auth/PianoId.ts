import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosError } from 'axios'
import NativeConfig from 'react-native-config'
import { getBundleId } from 'react-native-device-info'
import {
  getGenericPassword,
  resetGenericPassword,
  setGenericPassword,
} from 'react-native-keychain'

import { User } from '../../entities/User'
import { App } from '../../utils/config'
import type {
  Authentication,
  OAuth,
  SignUp,
  SocialLinking,
  SocialOptIn,
  Token,
} from './auth.types'

const IS_PRODUCTION = NativeConfig.APP_ENVIRONMENT === 'production'
const config = App.select({
  depor: {
    aid: IS_PRODUCTION ? 'MkdicA21pu' : '1p8zqZlWsu',
    api_token: NativeConfig.PIANO_API_TOKEN_DEPOR,
    redirect_url: `com.depor${NativeConfig.APP_SUFFIX}://oauth`,
  },
  elcomercio: {
    aid: IS_PRODUCTION ? 'Enoqbpnkpu' : 'PeVZORGJsu',
    api_token: NativeConfig.PIANO_API_TOKEN_ELCOMERCIO,
    redirect_url: `pe.elcomercio${NativeConfig.APP_SUFFIX}://oauth`,
  },
  gestion: {
    aid: IS_PRODUCTION ? 'UmAkgzZ4pu' : 'uqsWkaVNsu',
    api_token: NativeConfig.PIANO_API_TOKEN_GESTION,
    redirect_url: `pe.gestion${NativeConfig.APP_SUFFIX}://oauth`,
  },
  peru21: {
    aid: IS_PRODUCTION ? 'wofJpXCxpu' : 'HJmZV7i1su',
    api_token: NativeConfig.PIANO_API_TOKEN_PERU21,
    redirect_url: `pe.peru21${NativeConfig.APP_SUFFIX}://oauth`,
  },
  trome: {
    aid: IS_PRODUCTION ? 'TwXO2pHvpu' : '6UafT9Fjsu',
    api_token: NativeConfig.PIANO_API_TOKEN_TROME,
    redirect_url: `pe.trome${NativeConfig.APP_SUFFIX}://oauth`,
  },
})

const consent_fields = App.select({
  depor: {
    data_treatment: IS_PRODUCTION ? 'CBCLGBKQ7DFKY' : 'CBCTTY69ZNM1V',
    terms_and_privacy_policy: IS_PRODUCTION ? 'CBC733T45VF6L' : 'CBCHO1HJWQMF3',
  },
  elcomercio: {
    data_treatment: IS_PRODUCTION ? 'CBCV7DT67ZJP7' : 'CBC5JLWO1XW5Z',
    terms_and_privacy_policy: IS_PRODUCTION ? 'CBCGJ4ISSRD06' : 'CBCJGR6O1P49M',
  },
  gestion: {
    data_treatment: IS_PRODUCTION ? 'CBCLBG225CSXI' : 'CBC2OWUVPQTWM',
    terms_and_privacy_policy: IS_PRODUCTION ? 'CBC62C6M5SEAI' : 'CBC4HQTDWR7IL',
  },
  peru21: {
    data_treatment: IS_PRODUCTION ? 'CBC9OT5FNT7MR' : 'CBCCKB6TQW6QB',
    terms_and_privacy_policy: IS_PRODUCTION ? 'CBCIM7WGC3532' : 'CBCJL6E43Y6SS',
  },
  trome: {
    data_treatment: IS_PRODUCTION ? 'CBCINAC40Y682' : 'CBCU9R72JZ1XJ',
    terms_and_privacy_policy: IS_PRODUCTION ? 'CBC3F9ZWKUD7W' : 'CBCL5Q2IFJQRI',
  },
})

const instance = axios.create({
  baseURL: NativeConfig.PIANO_BASE_URL,
  params: { aid: config.aid, api_token: config.api_token, lang: 'es_PE' },
})

type PianoIdError = AxiosError<{
  error_code_list?: { code: number; message: string }[]
}>

export const errorInterceptor = (error: PianoIdError): AxiosError => {
  const list = error.response?.data?.error_code_list || []
  const message = list[0]?.message || list[0]?.code
  error.message = `${message}`
  return error
}

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(errorInterceptor(error)),
)

const USER_TOKEN = 'PianoId.USER_TOKEN'

interface Linking {
  apple_confirmation_available: boolean
  email: string
  facebook_confirmation_available: boolean
  first_name: string
  google_confirmation_available: boolean
  last_name: string
  password_confirmation_available: boolean
  social_type: string
}

interface SocialStateAdditionalInputResponse {
  additional_input_state: string
  need_email: boolean
  redirect_uri: ''
  response_type: ''
  social_type: string
  status: 'additional_input'
}

interface SocialLinkingResponse {
  social_linking_response: Linking & {
    identity_social_linking_state: string
  }
  email_confirmation_required: boolean
  extend_expired_access_enabled: boolean
}

interface SocialStateConfirmResponse extends Linking {
  linking_state: string
  status: 'confirm'
}

interface SocialStateResponse {
  aid: string
  services_id: ''
  social_app_id: number
  state: string
  url: null
}

interface UserPianoId {
  email: string
  first_name: string | null
  last_name: string | null
  uid: string
}

interface UserV1Response extends UserPianoId {
  password: 'has-password' | 'expired-non-usable'
  custom_fields: {
    name: string
    value: string | null
  }[]
}

interface UserV3Response extends UserPianoId {
  custom_fields: {
    fieldName: string
    value: string | null
  }[]
}

interface TokenResponse {
  access_token: string
  email_confirmation_required: boolean
  expires_in: number
  extend_expired_access_enabled: boolean
  refresh_token: string
  token_type: 'Bearer'
}

interface VerifyAccessTokenResponse
  extends Omit<TokenResponse, 'refresh_token'> {
  pub_id: string
}

const SINGLE_SELECT_LIST = ['civil_status', 'document_type', 'gender']

const removeEmpty = (obj: Record<string, unknown>) => {
  const formatted: Record<string, unknown> = {}
  const keys = Object.keys(obj)
  keys.forEach((key) => {
    const value = obj[key]
    if (value === undefined) return
    formatted[key] = value
  }, {})
  return formatted
}

let passwordStatus = ''

const parseUserFromPianoId = (user: UserV1Response | UserV3Response): User => {
  const isV1 = 'password' in user
  if (isV1) passwordStatus = user.password

  const custom_fields = isV1
    ? user.custom_fields
    : user.custom_fields.map((field) => ({
        name: field.fieldName,
        value: field.value,
      }))

  const customFields: Record<string, string> = {}
  custom_fields.forEach((field) => {
    if (!field.value) return
    let value = field.value
    if (SINGLE_SELECT_LIST.includes(field.name)) {
      value = JSON.parse(value)?.[0]
    }
    customFields[field.name] = value
  })

  const civilStatus: Record<string, string> = {
    'Soltero(a)': 'SO',
    'Casado(a)': 'CA',
    'Divorciado(a)': 'DI',
    'Viudo(a)': 'VI',
  }

  const gender: Record<string, string> = {
    Hombre: 'male',
    Mujer: 'female',
    Otro: 'other',
    'Prefiero no decirlo': 'unknown',
  }

  const metadata = removeEmpty({
    civilStatus: civilStatus[customFields.civil_status],
    documentType: customFields.document_type,
    documentNumber: customFields.document_number,
    passwordStatus,
  })

  return removeEmpty({
    id: user.uid,
    email: user.email,
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    second_last_name: customFields.second_last_name,
    date_of_birth: customFields.birthday,
    gender: gender[customFields.gender],
    mobile_phone: customFields.contact_phone,
    user_metadata: metadata,
  })
}

const parseUserForPianoId = (user: User) => {
  const birthday = user.date_of_birth ? new Date(user.date_of_birth) : undefined
  const civilStatus: Record<string, string> = {
    SO: 'Soltero(a)',
    CA: 'Casado(a)',
    DI: 'Divorciado(a)',
    VI: 'Viudo(a)',
  }
  const gender: Record<string, string> = {
    FEMALE: 'Mujer',
    MALE: 'Hombre',
    OTHER: 'Otro',
    UNKNOWN: 'Prefiero no decirlo',
  }

  const customFields: Record<string, string | undefined> = {
    second_last_name: user.second_last_name,
    birthday: birthday?.toISOString().split('T')[0],
    gender: gender[user.gender || 'another'],
    contact_phone: user.mobile_phone,
    civil_status: civilStatus[user.user_metadata?.civilStatus || 'other'],
    document_type: user.user_metadata?.documentType,
    document_number: user.user_metadata?.documentNumber,
  }

  const keys = Object.keys(removeEmpty(customFields))
  const fields = keys.reduce((prevValue, name) => {
    let value = customFields[name]
    if (SINGLE_SELECT_LIST.includes(name)) {
      value = JSON.stringify([value])
    }
    return { ...prevValue, [name]: value }
  }, {})

  return removeEmpty({
    custom_fields: fields,
    first_name: user.first_name,
    last_name: user.last_name,
  })
}

class PianoId implements Authentication {
  private token?: Token | null

  async accountLinking(
    email: string,
    password: string,
    linking_state: string,
  ): Promise<Token> {
    const response = await instance.post<TokenResponse>(
      '/id/api/v1/identity/login/token/socialConfirm',
      { login: email, password },
      { params: { api_token: undefined, linking_state } },
    )
    return {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
    }
  }

  async checkEmail(): Promise<boolean> {
    const response = await instance.get<{ data?: boolean }>(
      '/api/v3/email/confirmation/check',
      { params: { user_token: this.token?.access_token } },
    )
    return !!response.data.data
  }

  async deleteAccount(): Promise<void> {
    const token = await this.verifyAccessToken()
    await instance.post('/api/v3/publisher/gdpr/delete', undefined, {
      params: { uid: token.pub_id, scope: 'ALL' },
    })
  }

  getOAuthConfig(): OAuth {
    return {
      issuer: `${NativeConfig.PIANO_ID_BASE_URL}/id/api/v1/identity/vxauth`,
      client_id: config?.aid || '',
      redirect_url: config?.redirect_url || '',
    }
  }

  async getToken(): Promise<Token | null> {
    if (this.token === undefined) {
      const [credentials, token] = await Promise.all([
        getGenericPassword(),
        AsyncStorage.getItem(USER_TOKEN),
      ])
      if (token !== null) {
        const storage = JSON.parse(token) as Token
        await this.setToken(storage)
        await AsyncStorage.removeItem(USER_TOKEN)
        return storage
      }
      if (!credentials || +credentials.password) {
        this.token = null
        return this.token
      }
      this.token = JSON.parse(credentials.password) as Token
      return this.token
    }
    return this.token
  }

  async getUserProfile(): Promise<User> {
    const token = await this.verifyAccessToken()
    const response = await instance.post<UserV1Response>(
      '/id/api/v1/publisher/users/get',
      undefined,
      { params: { uid: token.pub_id } },
    )
    return parseUserFromPianoId(response.data)
  }

  async login(email: string, password: string): Promise<void> {
    const response = await instance.post<TokenResponse>(
      '/id/api/v1/publisher/login',
      undefined,
      { params: { email, password } },
    )
    await this.setToken({
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
    })
  }

  async logout(): Promise<void> {
    const deleteToken = async () => {
      try {
        await instance.post('/id/api/v1/publisher/logout', undefined, {
          params: { token: this.token?.access_token },
        })
      } catch (_) {}
    }
    await Promise.all([resetGenericPassword(), deleteToken()])
    this.token = null
  }

  async passwordlessLoginToken(
    email: string,
    linking_state: string,
  ): Promise<void> {
    await instance.post(
      '/id/api/v1/identity/passwordless/login/token',
      {
        createPasswordlessUser: false,
        login: email,
        linking_state,
        remember: false,
      },
      {
        params: { api_token: undefined },
      },
    )
  }

  async requestResetPassword(email: string): Promise<void> {
    await instance.post<TokenResponse>(
      '/id/api/v1/publisher/reset/password',
      undefined,
      { params: { email } },
    )
  }

  async requestVerifyEmail(email: string): Promise<void> {
    await instance.post<TokenResponse>(
      '/id/api/v1/publisher/reset/password',
      undefined,
      { params: { email } },
    )
  }

  async setToken(token: Token): Promise<void> {
    this.token = token
    await setGenericPassword(getBundleId(), JSON.stringify(this.token))
  }

  async signUp({ data_treatment, ...data }: SignUp): Promise<Token> {
    const response = await instance.post<TokenResponse>(
      '/id/api/v1/publisher/register',
      undefined,
      {
        params: {
          consents: {
            data_treatment: data_treatment,
            terms_and_privacy_policy: true,
          },
          ...data,
        },
      },
    )
    return {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
    }
  }

  async signUpOptIn(
    data: Record<string, boolean | string>,
  ): Promise<SocialLinking | Token> {
    const response = await instance.post<SocialLinkingResponse | TokenResponse>(
      '/id/api/v1/identity/register/token/socialAdditionalInput',
      {
        additional_input_state: data.input_state,
        email: data.email,
        consents: [
          {
            consent_pub_id: consent_fields.data_treatment,
            checked: data.data_treatment,
            field_id: 'data_treatment',
          },
          {
            consent_pub_id: consent_fields.terms_and_privacy_policy,
            checked: data.terms_and_privacy_policy,
            field_id: 'terms_and_privacy_policy',
          },
        ],
        custom_field_values: [
          {
            field_name: 'contact_phone',
            value: data.mobile_phone,
          },
        ],
      },
      { params: { api_token: undefined } },
    )

    if ('access_token' in response.data) {
      return {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      }
    }

    if ('social_linking_response' in response.data) {
      const linking = response.data.social_linking_response
      return {
        email: linking.email,
        provider: linking.social_type.toLowerCase(),
        state: 'linking',
        additional_parameters: {
          email_verified: linking.password_confirmation_available,
          linking_state: linking.identity_social_linking_state,
        },
      }
    }

    throw new Error(`Social state desconocido`)
  }

  async socialSignIn(
    provider: string,
    token: string,
  ): Promise<SocialLinking | SocialOptIn | Token> {
    const { data } = await instance.get<SocialStateResponse>(
      '/id/api/v1/identity/login/social/state',
      {
        params: {
          client_id: config.aid,
          social_type: provider.toUpperCase(),
          response_type: 'token',
          aid: undefined,
          api_token: undefined,
        },
      },
    )
    const response = await instance.post<
      | SocialStateAdditionalInputResponse
      | SocialStateConfirmResponse
      | TokenResponse
    >('/id/api/v1/identity/auth/social/state', {
      client_id: config.aid,
      provider_access_token: token,
      state: data.state,
    })

    if ('access_token' in response.data) {
      return {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      }
    }

    if (response.data.status === 'additional_input') {
      return {
        need_email: response.data.need_email,
        provider: response.data.social_type.toLowerCase(),
        state: 'opt-in',
        additional_parameters: {
          input_state: response.data.additional_input_state,
        },
      }
    }

    if (response.data.status === 'confirm') {
      return {
        email: response.data.email,
        provider: response.data.social_type.toLowerCase(),
        state: 'linking',
        additional_parameters: {
          email_verified: response.data.password_confirmation_available,
          linking_state: response.data.linking_state,
        },
      }
    }

    throw new Error(`Social state desconocido`)
  }

  async updatePassword(current: string, next: string): Promise<void> {
    const token = await this.verifyAccessToken()
    await instance.post('/id/api/v1/publisher/password', undefined, {
      params: {
        current_password: current,
        password: next,
        uid: token.pub_id,
      },
    })
  }

  async updateProfile(profile: User): Promise<User> {
    const token = await this.verifyAccessToken()
    const { custom_fields, ...restParams } = parseUserForPianoId(profile)
    const response = await instance.post<{ user?: UserV3Response }>(
      '/api/v3/publisher/user/update',
      custom_fields,
      { params: { ...restParams, uid: token.pub_id } },
    )
    if (!response.data.user) throw new Error('Invalid uid')
    return parseUserFromPianoId(response.data.user)
  }

  async verifyAccessToken(): Promise<VerifyAccessTokenResponse> {
    const response = await instance.post<VerifyAccessTokenResponse>(
      '/id/api/v1/publisher/token/verify',
      undefined,
      { params: { token: this.token?.access_token } },
    )
    return response.data
  }
}

export default PianoId
