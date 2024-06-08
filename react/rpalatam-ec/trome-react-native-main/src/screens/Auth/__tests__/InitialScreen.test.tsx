import { useNavigation } from '@react-navigation/native'
import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { Platform } from 'react-native'

import { useAuth } from '../../../context/auth'
import { useNotification } from '../../../context/notification'
import auth from '../../../services/auth'
import {
  appleSignIn,
  authorize,
  facebookSignIn,
  googleSignIn,
  tokenExchange,
} from '../../../utils/auth'
import { getRemoteValue } from '../../../utils/firebase'
import InitialScreen from '../InitialScreen'

const navigation = {
  canGoBack: jest.fn(() => true),
  goBack: jest.fn(),
  navigate: jest.fn(),
}
jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock
const signin = jest.fn()
mockUseAuth.mockReturnValue({ signin })

jest.mock('../../../context/notification')
const mockUseNotification = useNotification as jest.Mock

jest.mock('../../../utils/auth')
const mockAuthorize = authorize as jest.Mock
const mockFacebookSignIn = facebookSignIn as jest.Mock
const mockAppleSignIn = appleSignIn as jest.Mock
const mockGoogleSignIn = googleSignIn as jest.Mock
const mockTokenExchange = tokenExchange as jest.Mock

jest.mock('../../../utils/firebase')
const mockRemoteValue = getRemoteValue as jest.Mock

const OS = Platform.OS

beforeEach(() => {
  mockRemoteValue.mockImplementation(() => ({
    asString: jest.fn().mockReturnValue(''),
  }))
  mockUseNavigation.mockImplementation(() => navigation)
  mockUseNotification.mockImplementation(() => ({ show: jest.fn }))
})

afterEach(() => {
  Platform.OS = OS
})

describe('Initial Screen', () => {
  it('should render google, facebook and apple buttons', () => {
    Platform.OS = 'android'
    const { getByA11yLabel, rerender, queryByA11yLabel } = render(
      <InitialScreen />,
    )
    expect(getByA11yLabel('email')).toBeDefined()
    expect(getByA11yLabel('facebook')).toBeDefined()
    expect(getByA11yLabel('google')).toBeDefined()
    expect(queryByA11yLabel('apple')).toBeNull()

    Platform.OS = 'ios'
    rerender(<InitialScreen />)
    expect(getByA11yLabel('email')).toBeDefined()
    expect(getByA11yLabel('facebook')).toBeDefined()
    expect(getByA11yLabel('google')).toBeDefined()
    expect(getByA11yLabel('apple')).toBeDefined()
  })

  describe('auth providers', () => {
    const socialSignIn = jest.spyOn(auth, 'socialSignIn')
    const setToken = jest.spyOn(auth, 'setToken')

    beforeEach(() => {
      Platform.OS = 'android'
    })

    it('should login with apple', async () => {
      Platform.OS = 'ios'
      mockAppleSignIn.mockResolvedValueOnce('appletoken')
      const token = { access_token: 'apple_at', refresh_token: 'apple_rt' }
      socialSignIn.mockResolvedValueOnce(token)
      setToken.mockResolvedValueOnce()

      const { getByA11yLabel } = render(<InitialScreen />)

      fireEvent.press(getByA11yLabel('apple'))
      await act(async () => undefined)
      expect(socialSignIn).toBeCalledWith('apple', 'appletoken')
      expect(setToken).toBeCalledWith(token)
      expect(signin).toHaveBeenLastCalledWith('apple')
    })

    it('should login with facebook', async () => {
      mockFacebookSignIn.mockResolvedValueOnce('fbtoken')
      const token = { access_token: 'fb_at', refresh_token: 'fb_rt' }
      socialSignIn.mockResolvedValueOnce(token)
      setToken.mockResolvedValueOnce()

      const { getByA11yLabel } = render(<InitialScreen />)

      fireEvent.press(getByA11yLabel('facebook'))
      await act(async () => undefined)
      expect(socialSignIn).toBeCalledWith('facebook', 'fbtoken')
      expect(setToken).toBeCalledWith(token)
      expect(signin).toHaveBeenLastCalledWith('facebook')
    })

    it('should login with google', async () => {
      mockGoogleSignIn.mockResolvedValueOnce('gtoken')
      const token = { access_token: 'g_at', refresh_token: 'g_rt' }
      socialSignIn.mockResolvedValueOnce(token)
      setToken.mockResolvedValueOnce()

      const { getByA11yLabel } = render(<InitialScreen />)

      fireEvent.press(getByA11yLabel('google'))
      await act(async () => undefined)
      expect(socialSignIn).toBeCalledWith('google', 'gtoken')
      expect(setToken).toBeCalledWith(token)
      expect(signin).toHaveBeenLastCalledWith('google')
    })

    it('should send email when it is not verified ', async () => {
      const sendEmail = jest
        .spyOn(auth, 'passwordlessLoginToken')
        .mockResolvedValueOnce()
      const show = jest.fn()
      mockUseNotification.mockReturnValueOnce({ show })
      const state = {
        email: 'ec@ec.pe',
        provider: 'facebook',
        additional_parameters: {
          email_verified: false,
          linking_state: 'abc123',
        },
      }
      socialSignIn.mockResolvedValueOnce({ ...state, state: 'linking' })
      const { getByA11yLabel } = render(<InitialScreen />)

      fireEvent.press(getByA11yLabel(state.provider))
      await act(async () => undefined)
      expect(sendEmail).toBeCalledWith(
        state.email,
        state.additional_parameters.linking_state,
      )
      expect(show).toBeCalledWith({
        message: expect.stringContaining('Te hemos enviado un correo'),
        type: 'success',
      })
    })

    it('should navigate to signup opt-in screen', async () => {
      const state = {
        state: 'opt-in',
        provider: 'facebook',
        need_email: false,
        additional_parameters: { other: 'other' },
      }
      socialSignIn.mockResolvedValueOnce({ ...state, state: 'opt-in' })

      const { getByA11yLabel } = render(<InitialScreen />)

      fireEvent.press(getByA11yLabel(state.provider))
      await act(async () => undefined)
      expect(navigation.navigate).toHaveBeenLastCalledWith('Auth', {
        screen: 'SignUpOptIn',
        params: {
          method: state.provider,
          need_email: state.need_email,
          additional_parameters: state.additional_parameters,
        },
      })
      expect(setToken).not.toBeCalledWith(state)
    })

    it('should show a notification when an error occurs', async () => {
      mockFacebookSignIn.mockRejectedValueOnce(new Error('error'))
      const showFn = jest.fn()
      mockUseNotification.mockReturnValueOnce({ show: showFn })

      const { getByA11yLabel } = render(<InitialScreen />)

      fireEvent.press(getByA11yLabel('facebook'))
      await act(async () => undefined)
      expect(showFn).toBeCalledWith(expect.objectContaining({ type: 'error' }))
    })

    it('should not show an error notification when the user cancels the login', () => {
      mockFacebookSignIn.mockRejectedValueOnce(new Error('User cancelled'))
      const showFn = jest.fn()
      mockUseNotification.mockReturnValueOnce({ show: showFn })

      const { getByA11yLabel } = render(<InitialScreen />)

      fireEvent.press(getByA11yLabel('facebook'))
      expect(showFn).not.toBeCalled()
    })

    it('should set error status when captcha fails', async () => {
      mockFacebookSignIn.mockRejectedValueOnce(
        new Error('Para restablecer su contraseña, complete el captcha'),
      )
      const showFn = jest.fn()
      mockUseNotification.mockReturnValueOnce({ show: showFn })

      const { getByA11yLabel } = render(<InitialScreen />)

      fireEvent.press(getByA11yLabel('facebook'))
      await act(async () => undefined)

      expect(showFn).toBeCalledWith({
        message: 'En estos momentos no podemos realizar la operación',
        type: 'error',
      })
    })
  })

  it('should navigate to home screen when screen is skipped', async () => {
    const canGoBack = jest.fn().mockReturnValue(false)
    const replace = jest.fn()
    mockUseNavigation.mockReturnValue({ canGoBack, replace })
    const { getByText, queryByA11yLabel } = render(<InitialScreen />)
    expect(queryByA11yLabel('cerrar')).toBeNull()

    fireEvent.press(getByText('OMITIR'))
    expect(replace).toBeCalledWith('Main', {
      screen: 'Home',
      params: { screen: 'Feed' },
    })
  })

  it('should go to back when screen closes', async () => {
    const { getByA11yLabel } = render(<InitialScreen />)

    expect(navigation.goBack).not.toHaveBeenCalled()
    fireEvent.press(getByA11yLabel('cerrar'))
    expect(navigation.goBack).toHaveBeenCalled()
  })

  it('should navigate to sign in screen', () => {
    Platform.OS = 'android'
    const { getByA11yLabel, rerender } = render(<InitialScreen />)

    const params = { screen: 'SignIn' }
    fireEvent.press(getByA11yLabel('email'))
    expect(navigation.navigate).toHaveBeenLastCalledWith('Auth', params)

    Platform.OS = 'ios'
    rerender(<InitialScreen />)
    fireEvent.press(getByA11yLabel('email'))
    expect(navigation.navigate).toHaveBeenLastCalledWith('Auth', params)
  })

  it('should navigate to sign up screen', () => {
    const { getByTestId } = render(<InitialScreen />)

    fireEvent.press(getByTestId('signup-link'))
    expect(navigation.navigate).toHaveBeenLastCalledWith('Auth', {
      screen: 'SignUp',
    })
  })

  describe('OAuth', () => {
    beforeEach(() => {
      auth.getOAuthConfig = jest.fn().mockReturnValue({
        client_id: 'id',
        redirect_url: 'scheme://oauth',
        issuer: 'https://oauth.com',
      })
      mockRemoteValue.mockImplementation((key: string) => {
        const value = key === 'auth_oauth' ? 'enabled' : ''
        return { asString: jest.fn().mockReturnValue(value) }
      })
    })

    it('should not exchange the token when the authorize is null', async () => {
      mockAuthorize.mockResolvedValueOnce(null)

      const { getByText } = render(<InitialScreen />)

      fireEvent.press(getByText(/ingresar/i))
      await act(async () => undefined)
      expect(tokenExchange).not.toBeCalled()
    })

    it('should open the login screen', async () => {
      const { getByText } = render(<InitialScreen />)

      fireEvent.press(getByText(/ingresar/i))
      await act(async () => undefined)
      expect(authorize).toHaveBeenLastCalledWith(
        expect.objectContaining({
          additional_parameters: { disable_sign_up: 'true' },
        }),
      )
    })

    it('should open the registration screen', async () => {
      const { getByTestId } = render(<InitialScreen />)

      fireEvent.press(getByTestId('signup-link'))
      await act(async () => undefined)
      expect(authorize).toHaveBeenLastCalledWith(
        expect.objectContaining({
          additional_parameters: { screen: 'register' },
        }),
      )
    })

    it('should login the user', async () => {
      const token = { access_token: 'token' }
      mockAuthorize.mockResolvedValueOnce('scheme://oauth?code=123')
      mockTokenExchange.mockResolvedValueOnce(token)
      const spySetToken = jest.spyOn(auth, 'setToken').mockResolvedValue()

      const { getByText } = render(<InitialScreen />)

      fireEvent.press(getByText(/ingresar/i))
      await act(async () => undefined)
      expect(spySetToken).toBeCalledWith(token)
      expect(signin).toHaveBeenLastCalledWith('oauth')
    })

    it('should show a notification when it is an unexpected error', async () => {
      mockAuthorize
        .mockRejectedValue(new Error('error'))
        .mockRejectedValueOnce('no error type')
      const showFn = jest.fn()
      mockUseNotification.mockImplementationOnce(() => ({ show: showFn }))

      const { getByText } = render(<InitialScreen />)
      const button = getByText(/ingresar/i)

      fireEvent.press(button)
      await act(async () => undefined)
      expect(showFn).not.toBeCalled()

      fireEvent.press(button)
      await act(async () => undefined)
      expect(showFn).toBeCalled()
    })
  })
})
