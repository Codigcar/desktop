import AsyncStorage from '@react-native-async-storage/async-storage'
import MockAxios from 'jest-mock-axios'
import {
  getGenericPassword,
  resetGenericPassword,
  setGenericPassword,
} from 'react-native-keychain'
import { act } from 'react-test-renderer'

import PianoId, { errorInterceptor } from './PianoId'
import { User } from '../../entities/User'

const USER_TOKEN = 'PianoId.USER_TOKEN'

beforeEach(async () => await AsyncStorage.clear())

afterEach(MockAxios.reset)

describe('PianoId', () => {
  it('should set params to request when accountLinking is called', async () => {
    const auth = new PianoId()
    const params = {
      email: 'ec@ec.pe',
      linking_state: 'state',
      password: '12345678',
    }
    const promise = auth.accountLinking(
      params.email,
      params.password,
      params.linking_state,
    )
    expect(MockAxios.post).toHaveBeenCalledWith(
      '/id/api/v1/identity/login/token/socialConfirm',
      expect.objectContaining({
        login: params.email,
        password: params.password,
      }),
      { params: { api_token: undefined, linking_state: params.linking_state } },
    )
    const data = { access_token: 'at', refresh_token: 'rt' }
    MockAxios.mockResponse({ data })
    await expect(promise).resolves.toEqual(data)
  })

  it('should set the token to null if it is not stored', async () => {
    const auth = new PianoId()
    expect(await auth.getToken()).toBeNull()
  })

  it('should get token from AsyncStorage when if saved', async () => {
    const storage = { access_token: 'at', refresh_token: 'rt' }
    await AsyncStorage.setItem(USER_TOKEN, JSON.stringify(storage))
    const auth = new PianoId()
    expect(await auth.getToken()).toEqual(storage)
    expect(await AsyncStorage.getItem(USER_TOKEN)).toBeNull()
  })

  it('should get token from Keychain when if saved', async () => {
    const storage = { access_token: 'at', refresh_token: 'rt' }
    const mockGet = getGenericPassword as jest.Mock
    mockGet.mockReturnValueOnce({ password: JSON.stringify(storage) })
    const auth = new PianoId()
    expect(await auth.getToken()).toEqual(storage)
  })

  it('should set token to storage', async () => {
    const auth = new PianoId()
    const token = { access_token: 'at1', refresh_token: 'rt2' }
    await auth.setToken(token)
    await expect(auth.getToken()).resolves.toEqual(token)
  })

  it('should return the oauth config', () => {
    const auth = new PianoId()
    const keys = Object.keys(auth.getOAuthConfig())
    expect(keys).toEqual(['issuer', 'client_id', 'redirect_url'])
  })

  it('should return a boolean value when checkEmail is called', async () => {
    const auth = new PianoId()
    const promise1 = auth.checkEmail()
    MockAxios.mockResponse({ data: {} })
    expect(await promise1).toBeFalsy()

    const promise2 = auth.checkEmail()
    MockAxios.mockResponse({ data: { data: true } })
    expect(await promise2).toBeTruthy()
  })

  it('should return an user profile', async () => {
    const auth = new PianoId()
    const profile = auth.getUserProfile()

    await act(async () => MockAxios.mockResponse({ data: {} }))
    const data = {
      uid: 'id',
      email: 'ec@ec.pe',
      custom_fields: [],
      password: 'has-password',
    }
    await act(async () => MockAxios.mockResponse({ data }))

    expect(await profile).toEqual(
      expect.objectContaining({
        id: data.uid,
        email: data.email,
        user_metadata: {
          passwordStatus: data.password,
        },
      }),
    )
  })

  it('should parse custom fields when you get the Piano profile', async () => {
    const auth = new PianoId()
    const profile = auth.getUserProfile()

    await act(async () => MockAxios.mockResponse({ data: {} }))
    const birthday = new Date().toISOString().split('T')[0]
    const data = {
      custom_fields: [
        { fieldName: 'second_last_name', value: 'lastname' },
        { fieldName: 'birthday', value: birthday },
        { fieldName: 'gender', value: JSON.stringify(['Mujer']) },
        { fieldName: 'contact_phone', value: '987654321' },
        {
          fieldName: 'civil_status',
          value: JSON.stringify(['Divorciado(a)']),
        },
        { fieldName: 'document_type', value: JSON.stringify(['CDI']) },
        { fieldName: 'document_number', value: '12345678' },
      ],
    }
    await act(async () => MockAxios.mockResponse({ data }))
    const user: User = {
      first_name: '',
      last_name: '',
      second_last_name: 'lastname',
      date_of_birth: birthday,
      gender: 'female',
      mobile_phone: '987654321',
      user_metadata: expect.objectContaining({
        civilStatus: 'DI',
        documentType: 'CDI',
        documentNumber: '12345678',
      }),
    }
    expect(await profile).toEqual(user)
  })

  it('should set params to request when signup is called', async () => {
    const auth = new PianoId()
    const signUpData = {
      email: 'ec@ec.pe',
      password: 'pass',
      first_name: 'firstname',
      last_name: 'lastname',
    }
    const promise = auth.signUp({ ...signUpData, data_treatment: true })
    expect(MockAxios.post).toHaveBeenCalledWith(
      '/id/api/v1/publisher/register',
      undefined,
      {
        params: {
          consents: { data_treatment: true, terms_and_privacy_policy: true },
          ...signUpData,
        },
      },
    )

    const response = { access_token: 'at', refresh_token: 'rt' }
    MockAxios.mockResponse({ data: response })
    expect(await promise).toEqual(response)
  })

  it('should set params to request when requestResetPassword is called', async () => {
    const auth = new PianoId()
    const email = 'ec@ec.pe'
    auth.requestResetPassword(email)
    expect(MockAxios.post).toHaveBeenCalledWith(
      '/id/api/v1/publisher/reset/password',
      undefined,
      {
        params: { email },
      },
    )
  })

  it('should set params to request when requestVerifyEmail is called', async () => {
    const auth = new PianoId()
    const email = 'ec@ec.pe'
    auth.requestVerifyEmail(email)
    expect(MockAxios.post).toHaveBeenCalledWith(
      '/id/api/v1/publisher/reset/password',
      undefined,
      {
        params: { email },
      },
    )
  })

  it('should set the token on the instance when login is called', async () => {
    const { calls } = (setGenericPassword as jest.Mock).mock
    const length = calls.length
    const auth = new PianoId()
    const promise = auth.login('ec@ec.pe', 'pass')
    const response = { access_token: 'at', refresh_token: 'rt' }
    MockAxios.mockResponse({ data: response })
    await promise
    expect(setGenericPassword).toBeCalledTimes(length + 1)
    expect(await auth.getToken()).toEqual(response)
  })

  it('should set the token on the instance and remove it when logout is called', async () => {
    const auth = new PianoId()
    const promise = auth.login('ec@ec.pe', 'pass')
    MockAxios.mockResponse({ data: {} })
    await promise

    const logout = auth.logout()
    const request = MockAxios.getReqByRegex({ url: /logout/ })
    MockAxios.mockResponse({ data: {} }, request)
    await logout

    expect(await auth.getToken()).toBeNull()
    expect(resetGenericPassword).toBeCalledTimes(1)
  })

  it('should set params to request when updatePassword is called', async () => {
    const auth = new PianoId()
    auth.updatePassword('old', 'new')

    const verifyReq = MockAxios.getReqByRegex({ url: /verify/ })
    await act(async () =>
      MockAxios.mockResponse({ data: { pub_id: 'id' } }, verifyReq),
    )

    expect(MockAxios.post).toHaveBeenCalledWith(
      '/id/api/v1/publisher/password',
      undefined,
      {
        params: {
          current_password: 'old',
          password: 'new',
          uid: 'id',
        },
      },
    )
  })

  it('should update user profile when updateProfile is called', async () => {
    const auth = new PianoId()
    const params = { first_name: 'Name', last_name: 'Lastname' }
    const profile = auth.updateProfile(params)

    await act(async () => MockAxios.mockResponse({ data: { pub_id: 'id' } }))
    const data = {
      user: { uid: 'id', email: 'ec@ec.pe', custom_fields: [], ...params },
    }
    await act(async () => MockAxios.mockResponse({ data }))

    expect(await profile).toEqual({
      id: data.user.uid,
      email: data.user.email,
      user_metadata: expect.objectContaining({}),
      ...params,
    })
  })

  it('should parse custom fields when updateProfile is called', async () => {
    const auth = new PianoId()
    const params: User = {
      second_last_name: 'name',
      date_of_birth: new Date().toISOString(),
      gender: 'MALE',
      mobile_phone: '987654321',
      user_metadata: {
        civilStatus: 'SO',
        documentType: 'DNI',
        documentNumber: '12345678',
      },
    }
    auth.updateProfile(params)

    const verifyReq = MockAxios.getReqByRegex({ url: /verify/ })
    await act(async () =>
      MockAxios.mockResponse({ data: { pub_id: 'id' } }, verifyReq),
    )

    expect(MockAxios.post).toHaveBeenCalledWith(
      '/api/v3/publisher/user/update',
      {
        second_last_name: params.second_last_name,
        birthday: params.date_of_birth?.split('T')[0],
        gender: JSON.stringify(['Hombre']),
        contact_phone: params.mobile_phone,
        civil_status: JSON.stringify(['Soltero(a)']),
        document_type: JSON.stringify([params.user_metadata?.documentType]),
        document_number: params.user_metadata?.documentNumber,
      },
      { params: { uid: 'id' } },
    )
  })

  it('should return token when trying to login with a provider', async () => {
    const response = new PianoId().socialSignIn('google', 'token')

    const state = { aid: 'aid', state: 'state' }
    await act(async () => MockAxios.mockResponse({ data: state }))

    const token = { access_token: 'at', refresh_token: 'rt' }
    MockAxios.mockResponse({ data: token })
    await expect(response).resolves.toEqual({
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    })
  })

  it('should return social opt-in', async () => {
    const response = new PianoId().socialSignIn('facebook', 'token')

    const state = { aid: 'aid', state: 'state' }
    await act(async () => MockAxios.mockResponse({ data: state }))

    const social = {
      additional_input_state: 'state',
      need_email: false,
      social_type: 'FACEBOOK',
      status: 'additional_input',
    }
    MockAxios.mockResponse({ data: social })
    await expect(response).resolves.toEqual({
      need_email: social.need_email,
      provider: 'facebook',
      state: 'opt-in',
      additional_parameters: {
        input_state: social.additional_input_state,
      },
    })
  })

  it('should return social linking', async () => {
    const response = new PianoId().socialSignIn('facebook', 'token')

    const state = { aid: 'aid', state: 'state' }
    await act(async () => MockAxios.mockResponse({ data: state }))

    const social = {
      email: 'ec@ec.pe',
      linking_state: 'abc123',
      social_type: 'GOOGLE',
      status: 'confirm',
      password_confirmation_available: true,
    }
    MockAxios.mockResponse({ data: social })
    await expect(response).resolves.toEqual({
      email: social.email,
      provider: 'google',
      state: 'linking',
      additional_parameters: {
        email_verified: social.password_confirmation_available,
        linking_state: social.linking_state,
      },
    })
  })

  it('should fail social sign up when social status is unknown', async () => {
    const response = new PianoId().socialSignIn('facebook', 'token')
    const state = { aid: 'aid', state: 'state' }
    await act(async () => MockAxios.mockResponse({ data: state }))
    MockAxios.mockResponse({ data: { status: 'other' } })
    await expect(response).rejects.toThrow()
  })

  it('should return token when trying to sign up with opt-in', async () => {
    const auth = new PianoId()
    const params = {
      input_state: 'abc123',
      data_treatment: false,
      terms_and_privacy_policy: true,
      mobile_phone: '987654321',
    }
    const promise = auth.signUpOptIn(params)

    const token = { access_token: 'at', refresh_token: 'rt' }
    MockAxios.mockResponse({ data: token })

    expect(MockAxios.post).toHaveBeenCalledWith(
      '/id/api/v1/identity/register/token/socialAdditionalInput',
      {
        additional_input_state: params.input_state,
        consents: [
          {
            consent_pub_id: expect.stringContaining(''),
            checked: params.data_treatment,
            field_id: 'data_treatment',
          },
          {
            consent_pub_id: expect.stringContaining(''),
            checked: params.terms_and_privacy_policy,
            field_id: 'terms_and_privacy_policy',
          },
        ],
        custom_field_values: [
          { field_name: 'contact_phone', value: params.mobile_phone },
        ],
      },
      { params: { api_token: undefined } },
    )

    await expect(promise).resolves.toEqual(token)
  })

  it('should return social linking response when trying to sign up with opt-in', async () => {
    const auth = new PianoId()
    const params = {
      email: 'ec@ec.pe',
      input_state: 'abc123',
      data_treatment: false,
      terms_and_privacy_policy: true,
      mobile_phone: '987654321',
    }
    const promise = auth.signUpOptIn(params)

    const social_linking_response = {
      email: params.email,
      social_type: 'FACEBOOK',
      password_confirmation_available: true,
      identity_social_linking_state: '123abc',
    }

    const linking = {
      email: social_linking_response.email,
      provider: 'facebook',
      state: 'linking',
      additional_parameters: {
        email_verified: social_linking_response.password_confirmation_available,
        linking_state: social_linking_response.identity_social_linking_state,
      },
    }
    MockAxios.mockResponse({ data: { social_linking_response } })

    await expect(promise).resolves.toEqual(linking)
  })

  it('should fail social sign up opt-in when response is unknown', async () => {
    const response = new PianoId().signUpOptIn({})
    MockAxios.mockResponse({ data: { status: 'other' } })
    await expect(response).rejects.toThrow()
  })

  it('should return a custom message when an error occurs', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = {
      response: { data: { error_code_list: [{ message: 'default' }] } },
    }
    const error = errorInterceptor(response)
    expect(error.message).toBe('default')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response2: any = {
      response: { data: { error_code_list: [{ code: 123 }] } },
    }
    const error2 = errorInterceptor(response2)
    expect(error2.message).toBe('123')
  })

  it('should set params to request when deleteAccount is called', async () => {
    const auth = new PianoId()
    auth.deleteAccount()

    const verifyReq = MockAxios.getReqByRegex({ url: /verify/ })
    await act(async () =>
      MockAxios.mockResponse({ data: { pub_id: 'id' } }, verifyReq),
    )

    expect(MockAxios.post).toHaveBeenCalledWith(
      '/api/v3/publisher/gdpr/delete',
      undefined,
      { params: { uid: 'id', scope: 'ALL' } },
    )
  })

  it('should set params to request when passwordlessLoginToken is called', async () => {
    const auth = new PianoId()
    const params = { email: 'ec@ec.pe', linking_state: 'state' }
    auth.passwordlessLoginToken(params.email, params.linking_state)
    expect(MockAxios.post).toHaveBeenCalledWith(
      '/id/api/v1/identity/passwordless/login/token',
      expect.objectContaining({
        login: params.email,
        linking_state: params.linking_state,
      }),
      { params: { api_token: undefined } },
    )
  })
})
