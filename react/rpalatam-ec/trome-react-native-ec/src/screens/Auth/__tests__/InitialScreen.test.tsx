import { useNavigation } from '@react-navigation/native'
import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { Platform } from 'react-native'

import { useAuth } from '../../../context/auth'
import { useNotification } from '../../../context/notification'
import auth from '../../../services/auth'
import { authorize, facebookSignIn, tokenExchange } from '../../../utils/auth'
import { getRemoteValue } from '../../../utils/firebase'
import InitialScreen from '../InitialScreen'

const navigation = {
  canGoBack: jest.fn(() => true),
  goBack: jest.fn(),
  navigate: jest.fn(),
  replace: jest.fn(),
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
      expect(navigation.replace).toHaveBeenLastCalledWith('Auth', {
        screen: 'SignUpOptIn',
        params: {
          method: state.provider,
          need_email: state.need_email,
          additional_parameters: state.additional_parameters,
        },
      })
      expect(setToken).not.toBeCalledWith(state)
    })

    it('should not show an error notification when the user cancels the login', () => {
      mockFacebookSignIn.mockRejectedValueOnce(new Error('User cancelled'))
      const showFn = jest.fn()
      mockUseNotification.mockReturnValueOnce({ show: showFn })

      const { getByA11yLabel } = render(<InitialScreen />)

      fireEvent.press(getByA11yLabel('facebook'))
      expect(showFn).not.toBeCalled()
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
