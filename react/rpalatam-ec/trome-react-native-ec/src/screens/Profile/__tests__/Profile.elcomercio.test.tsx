import { useNavigation } from '@react-navigation/native'
import { fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { Alert } from 'react-native'

import { useAuth } from '../../../context/auth'
import { openInBrowser } from '../../../utils/inappbrowser'
import ProfileScreen from '../Profile.elcomercio'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
mockUseNavigation.mockReturnValue({ navigate: jest.fn() })

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock

jest.mock('../../../utils/inappbrowser')

describe('Profile.elcomercio', () => {
  describe('user not logged in', () => {
    beforeAll(() => {
      mockUseAuth.mockReturnValue({ isAuthenticated: false, user: {} })
    })

    it('should show banner for create account', () => {
      const { toJSON } = render(<ProfileScreen />)
      expect(toJSON()).toMatchSnapshot()
    })

    it('should navigate to register', () => {
      const navigate = jest.fn()
      mockUseNavigation.mockReturnValueOnce({ navigate })
      const { getByText } = render(<ProfileScreen />)

      fireEvent.press(getByText('¡REGÍSTRATE!'))
      expect(navigate).toBeCalledWith('SignUp')
    })

    it('should navigate to sign in screen for protected screens', () => {
      const navigate = jest.fn()
      mockUseNavigation.mockReturnValue({ navigate })
      const { getByText } = render(<ProfileScreen />)
      fireEvent.press(getByText('Alertas'))
      expect(navigate).toBeCalledWith('Login')
    })
  })

  describe('user connected and without subscription', () => {
    beforeAll(() => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isSubscribed: false,
        user: {
          id: 'id',
          first_name: 'Jose',
          last_name: 'Perez',
          email: 'jose@perez.pe',
        },
      })
    })

    it('should show banner, you are not a subscriber yet', () => {
      const { toJSON } = render(<ProfileScreen />)
      expect(toJSON()).toMatchSnapshot()
    })

    it('should open subscription landing', () => {
      const { getByText } = render(<ProfileScreen />)
      fireEvent.press(getByText('¡SUSCRÍBETE!'))
      expect(openInBrowser).toBeCalledTimes(1)
    })

    it('should navigate to my account screen', () => {
      const navigate = jest.fn()
      mockUseNavigation.mockReturnValue({ navigate })
      const { getByText } = render(<ProfileScreen />)
      fireEvent.press(getByText('Mi cuenta'))
      expect(navigate).toBeCalledWith('Account', { screen: 'AccountOptions' })
    })

    it('should navigate to notifications screen', () => {
      const navigate = jest.fn()
      mockUseNavigation.mockReturnValue({ navigate })
      const { getByText } = render(<ProfileScreen />)
      fireEvent.press(getByText('Alertas'))
      expect(navigate).toBeCalledWith('Notifications')
    })

    it('should navigate to favorite screen', () => {
      const navigate = jest.fn()
      mockUseNavigation.mockReturnValue({ navigate })
      const { getByText } = render(<ProfileScreen />)
      fireEvent.press(getByText(/Leer\sLuego/s))
      expect(navigate).toBeCalledWith('Favorite')
    })

    it('should logout', () => {
      const fnSignout = jest.fn()
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        signout: fnSignout,
        user: { first_name: 'Jose' },
      })
      const spy = jest.spyOn(Alert, 'alert')
      const { getByText } = render(<ProfileScreen />)

      fireEvent.press(getByText('Cerrar sesión'))
      const [title, , buttons] = spy.mock.calls[0]
      buttons?.[1].onPress?.()
      expect(title).toBe('Jose')
      expect(fnSignout).toBeCalled()
    })
  })

  describe('user connected and with active subscription', () => {
    beforeAll(() => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isSubscribed: true,
        user: {
          first_name: 'Jose',
          last_name: 'Perez',
          email: 'jose@perez.pe',
        },
      })
    })

    it('should show banner, you are not a subscriber yet', () => {
      const { toJSON } = render(<ProfileScreen />)
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
