import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useNotification } from '../../../context/notification'
import auth from '../../../services/auth'
import VerifyAccount from '../VerifyAccount'

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
  useRoute: jest.fn(() => ({
    params: {
      emailToResend: 'user@provider.com',
    },
  })),
}))

jest.mock('../../../context/notification')
const mockUseNotification = useNotification as jest.Mock

jest.useFakeTimers()

describe('Verify Account', () => {
  it('Mount screen', async () => {
    const { getByTestId, getByText, queryByText } = render(<VerifyAccount />)

    expect(getByText(/reenviar\scorreo\sen\s30/i)).toBeTruthy()
    await act(async () => {
      jest.runAllTimers()
    })

    expect(queryByText(/reenviar\scorreo\sen\s30/i)).toBeNull()

    const buttonForward = getByText(/reenviar\scorreo/i)
    fireEvent.press(buttonForward)
    await act(async () => undefined)

    const linkSignIn = getByTestId('signin-link')
    fireEvent.press(linkSignIn)
  })

  it('should show notification error', async () => {
    const show = jest.fn()
    mockUseNotification.mockReturnValue({ show })
    const message = 'error message'
    jest.spyOn(auth, 'requestVerifyEmail').mockRejectedValue(new Error(message))
    const { getByText } = render(<VerifyAccount />)

    await act(async () => {
      jest.runAllTimers()
    })
    fireEvent.press(getByText('Reenviar correo'))
    await act(async () => undefined)
    expect(show).toBeCalledWith({ message, type: 'error' })
  })
})
