import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useNotification } from '../../../context/notification'
import auth from '../../../services/auth'
import ForgotPassword from '../ForgotPassword'

jest.mock('../../../context/notification')
const mockUseNotification = useNotification as jest.Mock

describe('ForgotPassword', () => {
  it('Mount screen', async () => {
    const { getByA11yLabel, getByText, queryByText } = render(
      <ForgotPassword />,
    )

    expect(getByText(/olvidé\smi\scontraseña/i)).not.toBeNull()
    expect(getByText(/ingresa\stu\scorreo/i)).not.toBeNull()

    const buttonSend = getByText(/enviar/i)
    fireEvent.press(buttonSend)
    await act(async () => undefined)

    expect(getByText(/email\sinválido/i)).not.toBeNull()

    const inputEmail = getByA11yLabel('email')
    fireEvent.changeText(inputEmail, 'user@company.com')

    fireEvent.press(buttonSend)
    await act(async () => undefined)

    expect(queryByText(/email\sinválido/i)).toBeNull()
  })

  it('should show form errors', async () => {
    const { getByText, queryAllByText } = render(<ForgotPassword />)

    fireEvent.press(getByText(/enviar/i))
    await act(async () => undefined)

    expect(queryAllByText(/email\sinválido/i).length).toBe(1)
  })

  it('should notification error', async () => {
    const show = jest.fn()
    mockUseNotification.mockReturnValueOnce({ show })
    const message = 'error message'
    jest
      .spyOn(auth, 'requestResetPassword')
      .mockRejectedValueOnce(new Error(message))
    const { getByA11yLabel, getByText } = render(<ForgotPassword />)

    fireEvent.changeText(getByA11yLabel('email'), 'user@company.com')
    fireEvent.press(getByText(/enviar/i))
    await act(async () => undefined)
    expect(show).toBeCalledWith({ message, type: 'error' })
  })
})
