import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import auth from '../../../services/auth'
import { App } from '../../../utils/config'
import DeleteAccount from '../DeleteAccount'

const mockLogEvent = jest.fn()
jest.mock('@react-native-firebase/analytics', () =>
  jest.fn(() => ({ logEvent: mockLogEvent })),
)

const mockSignout = jest.fn()
jest.mock('../../../context/auth', () => ({
  useAuth: jest.fn(() => ({ signout: mockSignout })),
}))

describe('Delete Account', () => {
  it('should dismiss the modal', () => {
    const fnOnDismiss = jest.fn()
    const { getByText } = render(
      <DeleteAccount onDismiss={fnOnDismiss} setIsLoading={jest.fn} />,
    )

    fireEvent.press(getByText(/cancelar/i))
    expect(fnOnDismiss).toBeCalled()
  })

  it('should delete account', async () => {
    App.key = 'gestion'
    const fnDeleteAccount = jest.fn()
    auth.deleteAccount = fnDeleteAccount
    const fnSetIsLoading = jest.fn()

    const { getByText } = render(
      <DeleteAccount onDismiss={jest.fn} setIsLoading={fnSetIsLoading} />,
    )

    fireEvent.press(getByText(/Eliminar\scuenta/))
    expect(fnSetIsLoading).toBeCalledWith(true)
    await act(async () => undefined)
    expect(fnDeleteAccount).toBeCalled()
    expect(mockLogEvent).toBeCalledWith('delete_account')
    expect(mockSignout).toBeCalled()
  })
})
