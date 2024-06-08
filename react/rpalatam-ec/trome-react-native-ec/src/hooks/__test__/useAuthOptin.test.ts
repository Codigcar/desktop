import { useNavigation, useRoute } from '@react-navigation/native'
import { act, renderHook } from '@testing-library/react-hooks'
import { useAuth } from '../../context/auth'
import { useNotification } from '../../context/notification'
import auth from '../../services/auth'
import { useAuthOptin } from '../useAuthOptin'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
const mockUseRoute = useRoute as jest.Mock
mockUseRoute.mockReturnValue({ params: {} })

jest.mock('../../context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockReturnValue({ signin: jest.fn() })

jest.mock('../../context/notification')
const mockUseNotification = useNotification as jest.Mock

describe('useAuthOptin', () => {
  const params = {
    additional_parameters: { input_state: 'state' },
    method: 'google',
    need_email: false,
  }
  const response = {
    additional_parameters: {
      linking_state: 'abc123',
    },
    email: 'test@test.pecom',
    provider: params.method,
  }
  const data = {
    data_treatment: true,
    email: 'test@example.com',
    mobile_phone: '123456789',
    terms_and_privacy_policy: true,
  }

  it('should show error notification when auth.signUpOptIn fails', async () => {
    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    jest.spyOn(auth, 'signUpOptIn').mockRejectedValue(new Error('error'))
    const { result } = renderHook(() => useAuthOptin(params))
    const reset = jest.fn()
    await act(() => result.current.signUpOptin(data, { reset }))
    jest.spyOn(auth, 'signUpOptIn').mockResolvedValueOnce({
      ...response,
      state: 'linking',
    })
    expect(show).toBeCalled()
  })

  it('should show error validation when terms_and_privacy_policy are not checked', async () => {
    const dataMock = {
      ...data,
      terms_and_privacy_policy: false,
    }
    jest.spyOn(auth, 'signUpOptIn').mockRejectedValue(new Error())
    const { result } = renderHook(() => useAuthOptin(params))
    const reset = jest.fn()
    await act(() => result.current.signUpOptin(dataMock, { reset }))
    expect(result.current.errors).toEqual({
      terms_and_privacy_policy: 'Campo requerido',
    })
  })

  it('should navigate to account linking screen', async () => {
    const replace = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ replace })

    const reset = jest.fn()
    const { result } = renderHook(() => useAuthOptin(params))
    await act(() => result.current.signUpOptin(data, { reset }))

    expect(replace).toBeCalledWith('Auth', {
      screen: 'AccountLinking',
      params: {
        email: response.email,
        method: response.provider,
        additional_parameters: response.additional_parameters,
      },
    })
  })

  it('should sign up with a provider', async () => {
    const signin = jest.fn()
    mockUseAuth.mockReturnValue({ signin })
    mockUseRoute.mockReturnValueOnce({ params })
    const token = {
      access_token: 'g_at',
      refresh_token: 'g_rt',
      input_state: 'state',
    }
    const signUpOptIn = jest.spyOn(auth, 'signUpOptIn').mockResolvedValue(token)
    const setToken = jest.spyOn(auth, 'setToken').mockResolvedValueOnce()

    const reset = jest.fn()
    const { result } = renderHook(() => useAuthOptin(params))
    await act(() => result.current.signUpOptin(data, { reset }))

    expect(signUpOptIn).toBeCalledWith({
      ...data,
      input_state: 'state',
    })
    expect(setToken).toBeCalledWith(token)
    expect(signin).toBeCalledWith(params.method)
  })
})
