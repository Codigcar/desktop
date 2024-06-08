import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useAuth } from '../../../context/auth'
import { App } from '../../../utils/config'
import * as flags from '../../../utils/flags'
import { openInBrowser } from '../../../utils/inappbrowser'
import { sendFeedbackByEmail } from '../../../utils/mailer'
import Profile from '../Profile'

const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({ navigate: mockNavigate })),
}))

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock

jest.mock('../../../utils/inappbrowser')
jest.mock('../../../utils/mailer')

jest.useFakeTimers()

const key = App.key

beforeEach(() => {
  App.key = key
  mockUseAuth.mockImplementation(() => ({ isSubscribed: false, user: {} }))
})

describe('Profile screen page', () => {
  it('should show login button when user id does not exist', () => {
    const { getByText } = render(<Profile />)

    const loginBtn = getByText(/iniciar\ssesión/i)
    expect(loginBtn).toBeDefined()

    fireEvent.press(loginBtn)
    expect(mockNavigate).toHaveBeenLastCalledWith('Auth', {
      screen: 'InitialScreen',
    })
  })

  it('should show user name when valid', () => {
    mockUseAuth
      .mockImplementationOnce(() => ({ user: { first_name: '-' } }))
      .mockImplementationOnce(() => ({ user: { first_name: 'undefined' } }))
      .mockImplementationOnce(() => ({ user: { first_name: 'null' } }))
      .mockImplementationOnce(() => ({ user: { first_name: 'John' } }))

    const { getByText, rerender } = render(<Profile />)

    const welcome = getByText(/bienvenido/i)
    expect(welcome).toHaveTextContent(/^bienvenido\(a\)$/i)

    rerender(<Profile />)
    expect(welcome).toHaveTextContent(/^bienvenido\(a\)$/i)

    rerender(<Profile />)
    expect(welcome).toHaveTextContent(/^bienvenido\(a\)$/i)

    rerender(<Profile />)
    expect(welcome).toHaveTextContent(/^bienvenido\(a\)\sjohn$/i)
  })

  it('should render user email when it exists', () => {
    mockUseAuth.mockImplementationOnce(() => ({ user: { email: 'ec@ec.pe' } }))

    const { getByText, queryByTestId, rerender } = render(<Profile />)

    expect(getByText('ec@ec.pe')).toBeDefined()

    rerender(<Profile />)
    expect(queryByTestId('ec@ec.pe')).toBeNull()
  })

  it('should avoid navigating to account when user id does not exist', () => {
    mockUseAuth.mockImplementationOnce(() => ({ user: { id: 'id' } }))

    const { getByText, rerender } = render(<Profile />)

    const accountBtn = getByText(/mi\scuenta/i)
    fireEvent.press(accountBtn)
    expect(mockNavigate).toHaveBeenLastCalledWith('Account', {
      screen: 'AccountOptions',
    })

    rerender(<Profile />)
    fireEvent.press(accountBtn)
    expect(mockNavigate).toHaveBeenLastCalledWith('Auth', {
      screen: 'InitialScreen',
    })
  })

  it('should navigate to custom content screen', () => {
    const { getByText } = render(<Profile />)

    fireEvent.press(getByText(/mi\scontenido/i))
    expect(mockNavigate).toHaveBeenLastCalledWith('Main', {
      screen: 'CustomContent',
    })
  })

  it('should navigate to favorites screen', () => {
    const { getByText } = render(<Profile />)

    fireEvent.press(getByText(/Leer luego/i))
    expect(mockNavigate).toHaveBeenLastCalledWith('Main', {
      screen: 'Favorite',
    })
  })

  it('should open the policy url by active brand', () => {
    const { getByText } = render(<Profile />)

    fireEvent.press(getByText(/política\sde\scookies/i))
    expect(openInBrowser).toHaveBeenLastCalledWith(
      expect.stringContaining(App.key),
    )
  })

  it('should open modal theme', () => {
    const { getByText, getByTestId, queryByTestId } = render(<Profile />)

    expect(queryByTestId('backdrop-touchable')).toBeNull()
    fireEvent.press(getByText(/apariencia/i))
    act(jest.runAllTimers)
    expect(getByTestId('backdrop-touchable')).toBeDefined()
  })

  it('should navigate to subscription screen', () => {
    const { getByText } = render(<Profile />)

    fireEvent.press(getByText('Suscripción'))
    expect(mockNavigate).toHaveBeenLastCalledWith('Main', {
      screen: 'Subscription',
    })
  })

  it('should send feedback if the user is a subscriber', () => {
    const user = { id: 'id', email: 'ec@ec.pe' }
    mockUseAuth.mockImplementationOnce(() => ({ isSubscribed: true, user }))
    const { getByText, rerender, queryByText } = render(<Profile />)

    fireEvent.press(getByText(/enviar\scomentario/i))
    expect(sendFeedbackByEmail).toHaveBeenLastCalledWith(user)

    rerender(<Profile />)
    expect(queryByText(/enviar\scomentario/i)).toBeNull()
  })

  it('should navigating to notifications only when user is logged', () => {
    App.key = 'elcomercio'
    mockUseAuth.mockImplementationOnce(() => ({ user: { id: 'id' } }))
    const { getByText, rerender } = render(<Profile />)

    const accountBtn = getByText('Alertas')
    fireEvent.press(accountBtn)
    expect(mockNavigate).toHaveBeenLastCalledWith('Main', {
      screen: 'Notifications',
    })

    rerender(<Profile />)
    fireEvent.press(accountBtn)
    expect(mockNavigate).toHaveBeenLastCalledWith('Auth', { screen: 'SignIn' })
  })

  it('should navigate to notifications screen', () => {
    Object.defineProperty(flags, 'ENABLE_NOTIFICATIONS', { value: false })
    const { getByText, queryByText, rerender } = render(<Profile />)

    expect(queryByText('Notificaciones')).toBeNull()

    Object.defineProperty(flags, 'ENABLE_NOTIFICATIONS', { value: true })
    rerender(<Profile />)

    fireEvent.press(getByText('Notificaciones'))
    expect(mockNavigate).toHaveBeenLastCalledWith('Main', {
      screen: 'Notifications',
    })
  })
})