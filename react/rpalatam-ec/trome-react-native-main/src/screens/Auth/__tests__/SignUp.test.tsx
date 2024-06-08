import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import auth from '../../../services/auth'
import * as flags from '../../../utils/flags'
import SignUp from '../SignUp'

const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: mockNavigate,
  })),
}))

jest.mock('react-native-device-info', () => ({
  getBundleId: jest.fn(() => 'com.eeec.Gestion'),
}))

const mockNotificationShow = jest.fn()
jest.mock('../../../context/notification', () => ({
  useNotification: jest.fn(() => ({
    show: mockNotificationShow,
  })),
}))

describe('SignUp', () => {
  it('should reject registration when there are incomplete required fields', async () => {
    const { getByTestId, getByText, queryAllByText } = render(<SignUp />)

    fireEvent.press(getByTestId('terms-checkbox'))
    fireEvent.press(getByText(/Registrarme/))
    await act(async () => undefined)
    expect(queryAllByText(/campo\srequerido/i).length).toBe(3)
    expect(getByText(/email\sinválido/i)).toBeDefined()
  })

  it('should show error notification when an error occurs', async () => {
    auth.signUp = jest.fn().mockRejectedValueOnce(new Error('300040'))
    const { getByA11yLabel, getByText } = render(<SignUp />)

    fireEvent.changeText(getByA11yLabel('nombre'), 'Name')
    fireEvent.changeText(getByA11yLabel('apellido'), 'Lastname')
    fireEvent.changeText(getByA11yLabel('email'), 'user@provider.com')
    fireEvent.changeText(getByA11yLabel('contraseña'), '12345678')

    expect(mockNotificationShow).not.toBeCalled()
    fireEvent.press(getByText(/Registrarme/))
    await act(async () => undefined)
    expect(mockNotificationShow).toBeCalled()
  })

  it('should navigate to the verify email screen when registration is successful', async () => {
    Object.defineProperty(flags, 'ENABLE_VERIFY_ACCOUNT', { value: true })
    auth.signUp = jest.fn().mockResolvedValueOnce({})
    const { getByA11yLabel, getByTestId } = render(<SignUp />)

    fireEvent.changeText(getByA11yLabel('nombre'), 'Name')
    fireEvent.changeText(getByA11yLabel('apellido'), 'Lastname')
    fireEvent.changeText(getByA11yLabel('email'), 'user@provider.com')
    fireEvent.changeText(getByA11yLabel('contraseña'), '12345678')
    fireEvent.press(getByTestId('data_treatment-checkbox'))
    await act(async () => getByA11yLabel('contraseña').props.onSubmitEditing())
    expect(mockNavigate).toHaveBeenLastCalledWith('Auth', {
      screen: 'VerifyAccount',
      params: { emailToResend: 'user@provider.com' },
    })
  })

  it('should navigate to the login screen when registration is successful', async () => {
    Object.defineProperty(flags, 'ENABLE_VERIFY_ACCOUNT', { value: false })
    auth.signUp = jest.fn().mockResolvedValueOnce({
      access_token: 'access_token',
      refresh_token: 'refresh_token',
    })
    const spySetToken = jest.spyOn(auth, 'setToken')
    const { getByA11yLabel, getByTestId } = render(<SignUp />)

    fireEvent.changeText(getByA11yLabel('nombre'), 'Name')
    fireEvent.changeText(getByA11yLabel('apellido'), 'Lastname')
    fireEvent.changeText(getByA11yLabel('email'), 'user@provider.com')
    fireEvent.changeText(getByA11yLabel('contraseña'), '12345678')
    fireEvent.press(getByTestId('data_treatment-checkbox'))
    await act(async () => getByA11yLabel('contraseña').props.onSubmitEditing())
    expect(spySetToken).toHaveBeenLastCalledWith({
      access_token: 'access_token',
      refresh_token: 'refresh_token',
    })
  })
})
