import { useNavigation } from '@react-navigation/native'
import { act, renderHook } from '@testing-library/react-hooks'
import { Platform } from 'react-native'

import { useAuth } from '../../context/auth'
import { useNotification } from '../../context/notification'
import auth from '../../services/auth'
import { appleSignIn, facebookSignIn, googleSignIn } from '../../utils/auth'
import { App } from '../../utils/config'
import { useAuthWithSocialMedia } from '../useAuthWithSocialMedia'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock

jest.mock('../../context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockReturnValue({ signin: jest.fn() })

jest.mock('../../context/notification')
const mockUseNotification = useNotification as jest.Mock

jest.mock('../../utils/auth')
const mockFacebookSignIn = facebookSignIn as jest.Mock
mockFacebookSignIn.mockResolvedValue('fbtoken')
const mockGoogleSignIn = googleSignIn as jest.Mock
mockGoogleSignIn.mockResolvedValue('gtoken')
const mockAppleSignIn = appleSignIn as jest.Mock
mockAppleSignIn.mockResolvedValue('appletoken')

jest.spyOn(auth, 'passwordlessLoginToken').mockResolvedValue()
jest.spyOn(auth, 'setToken').mockResolvedValue()

describe('useAuthWithSocalMedia', () => {
  it('should login with apple', async () => {
    Platform.OS = 'ios'
    const token = { access_token: 'apple_at', refresh_token: 'apple_rt' }
    jest.spyOn(auth, 'socialSignIn').mockResolvedValueOnce(token)
    const signin = jest.fn()
    mockUseAuth.mockReturnValueOnce({ signin })
    const { result } = renderHook(useAuthWithSocialMedia)

    await act(() => result.current.signInSocialMedia('apple'))
    expect(signin).toBeCalledWith('apple')
  })

  it('should login with facebook', async () => {
    const token = { access_token: 'fb_at', refresh_token: 'fb_rt' }
    jest.spyOn(auth, 'socialSignIn').mockResolvedValueOnce(token)
    const signin = jest.fn()
    mockUseAuth.mockReturnValueOnce({ signin })
    const { result } = renderHook(useAuthWithSocialMedia)

    await act(() => result.current.signInSocialMedia('facebook'))
    expect(signin).toBeCalledWith('facebook')
  })

  it('should login with google', async () => {
    const token = { access_token: 'g_at', refresh_token: 'g_rt' }
    jest.spyOn(auth, 'socialSignIn').mockResolvedValueOnce(token)
    const signin = jest.fn()
    mockUseAuth.mockReturnValueOnce({ signin })
    const { result } = renderHook(useAuthWithSocialMedia)

    await act(() => result.current.signInSocialMedia('google'))
    expect(signin).toBeCalledWith('google')
  })

  it('should notification to linking', async () => {
    const signin = jest.fn()
    mockUseAuth.mockReturnValueOnce({ signin })
    jest.spyOn(auth, 'socialSignIn').mockResolvedValueOnce({
      email: 'ec@ec.pe',
      provider: 'facebook',
      state: 'linking',
    })
    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    const { result } = renderHook(useAuthWithSocialMedia)

    App.key = 'gestion'
    await act(() => result.current.signInSocialMedia('facebook'))
    expect(show).toBeCalled()
    expect(signin).not.toBeCalled()
  })

  it('should show error message for elcomercio to linking', async () => {
    const signin = jest.fn()
    mockUseAuth.mockReturnValueOnce({ signin })
    jest.spyOn(auth, 'socialSignIn').mockResolvedValueOnce({
      email: 'ec@ec.pe',
      provider: 'facebook',
      state: 'linking',
    })
    const { result } = renderHook(useAuthWithSocialMedia)

    App.key = 'elcomercio'
    await act(() => result.current.signInSocialMedia('facebook'))
    expect(result.current.errors).toEqual({
      common_error:
        'Ya tienes una cuenta con nosotros. Te hemos enviado un correo para poder vincular tus cuentas.',
    })
    expect(signin).not.toBeCalled()
  })

  it('should navigate to account linking screen', async () => {
    const signin = jest.fn()
    mockUseAuth.mockReturnValueOnce({ signin })
    jest.spyOn(auth, 'socialSignIn').mockResolvedValueOnce({
      email: 'ec@ec.pe',
      provider: 'google',
      state: 'linking',
      additional_parameters: { email_verified: true },
    })
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ navigate })
    const { result } = renderHook(useAuthWithSocialMedia)

    await act(() => result.current.signInSocialMedia('google'))
    expect(navigate).toBeCalledWith(
      'Auth',
      expect.objectContaining({ screen: 'AccountLinking' }),
    )
    expect(signin).not.toBeCalled()
  })

  it('should navigate to sign up opt in screen', async () => {
    const signin = jest.fn()
    mockUseAuth.mockReturnValueOnce({ signin })
    jest.spyOn(auth, 'socialSignIn').mockResolvedValueOnce({
      need_email: true,
      provider: 'facebook',
      state: 'opt-in',
      additional_parameters: { params: 'abc' },
    })
    const replace = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ replace })
    const { result } = renderHook(useAuthWithSocialMedia)

    await act(() => result.current.signInSocialMedia('facebook'))
    expect(replace).toBeCalledWith(
      'Auth',
      expect.objectContaining({ screen: 'SignUpOptIn' }),
    )
    expect(signin).not.toBeCalled()
  })

  it('should show a notification when an error occurs', async () => {
    mockFacebookSignIn.mockRejectedValueOnce(new Error('error notify'))
    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    const { result } = renderHook(useAuthWithSocialMedia)

    App.key = 'gestion'
    await act(async () => result.current.signInSocialMedia('facebook'))
    expect(show).toBeCalledWith({ message: 'error notify', type: 'error' })
  })

  it('should set error status when captcha fails', async () => {
    mockFacebookSignIn.mockRejectedValueOnce(
      new Error('Para restablecer su contraseña, complete el captcha'),
    )
    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    const { result } = renderHook(useAuthWithSocialMedia)

    await act(async () => result.current.signInSocialMedia('facebook'))
    expect(show).toBeCalledWith({
      message: 'En estos momentos no podemos realizar la operación',
      type: 'error',
    })
  })

  it('should set error state when an error occurs', async () => {
    mockFacebookSignIn.mockRejectedValueOnce(new Error('error field'))
    const { result } = renderHook(useAuthWithSocialMedia)

    App.key = 'elcomercio'
    await act(async () => result.current.signInSocialMedia('facebook'))
    expect(result.current.errors).toEqual({ common_error: 'error field' })
  })
})
