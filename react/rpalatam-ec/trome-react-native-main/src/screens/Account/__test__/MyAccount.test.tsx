import { act, fireEvent, render } from '@testing-utils/library'

import React from 'react'
import { Alert, Platform } from 'react-native'

import { useAuth } from '../../../context/auth'
import { App } from '../../../utils/config'
import MyAccount from '../MyAccount'

jest.useFakeTimers()

const mockNavigateFn = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: mockNavigateFn,
  })),
}))

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock

beforeEach(() => {
  mockUseAuth.mockImplementation(() => ({ user: {}, isSubscribed: false }))
})

describe('My Account screen page', () => {
  it('should navigate to page-path when tap internal-page button', () => {
    const { getByText, queryByText } = render(<MyAccount />)

    fireEvent.press(getByText(/cambiar\sinformación/i))
    expect(mockNavigateFn).toHaveBeenLastCalledWith('Information')
    expect(queryByText(/cambiar\scontraseña/i)).toBeNull()
  })

  it('should navigate to change password when user has a password', () => {
    mockUseAuth.mockImplementationOnce(() => ({
      user: {
        first_name: 'John',
        user_metadata: { passwordStatus: 'has-password' },
      },
    }))
    const { getByText } = render(<MyAccount />)

    fireEvent.press(getByText(/cambiar\scontraseña/i))
    expect(mockNavigateFn).toHaveBeenLastCalledWith('ChangePassword')
  })

  it('should show an alert when trying to log out', () => {
    const fnSignout = jest.fn()
    mockUseAuth.mockImplementationOnce(() => ({
      signout: fnSignout,
      user: { first_name: 'John' },
    }))

    const spy = jest.spyOn(Alert, 'alert')
    const { getByText, rerender } = render(<MyAccount />)

    const signoutBtn = getByText(/cerrar\ssesión/i)
    fireEvent.press(signoutBtn)

    const [title, , buttons] = spy.mock.calls[0]
    buttons?.[1].onPress?.()
    expect(title).toBe('John')
    expect(fnSignout).toBeCalled()

    rerender(<MyAccount />)
    fireEvent.press(signoutBtn)
    expect(spy.mock.calls[1][0]).toBe('Confirmación')
  })

  it('should hide delete account button when user is subscriber', async () => {
    mockUseAuth.mockImplementationOnce(() => ({ user: {}, isSubscribed: true }))
    const { queryByText } = render(<MyAccount />)
    expect(queryByText(/eliminar\scuenta/i)).toBeNull()
  })

  it('should hide delete account button when platform is not iOS', async () => {
    Platform.OS = 'android'
    const { queryByText } = render(<MyAccount />)
    expect(queryByText(/eliminar\scuenta/i)).toBeNull()
  })

  it('should open modal when press delete account button', async () => {
    App.key = 'elcomercio'
    Platform.OS = 'ios'
    const { getByTestId, getByText } = render(<MyAccount />)

    fireEvent.press(getByText(/eliminar\scuenta/i))
    act(jest.runAllTimers)
    expect(getByTestId('backdrop-touchable')).toBeDefined()
  })
})
