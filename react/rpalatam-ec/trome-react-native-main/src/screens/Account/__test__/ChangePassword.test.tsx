import { act, cleanup, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useNotification } from '../../../context/notification'
import auth from '../../../services/auth'
import ChangePassword from '../ChangePassword'

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
}))

jest.mock('../../../context/notification')
const MockUseNotification = useNotification as jest.Mock

beforeEach(() => {
  auth.updatePassword = jest
    .fn()
    .mockImplementation(() => Promise.resolve(true))
  cleanup()
})

describe('Change Password screen', () => {
  it('should show error notification when an error occurs', async () => {
    const fnShow = jest.fn()
    MockUseNotification.mockReturnValue({ show: fnShow })

    auth.updatePassword = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(new Error('123')))

    const { getByA11yLabel, getByTestId } = render(<ChangePassword />)

    const fieldOldPassword = getByA11yLabel('actual contraseña')
    fireEvent.changeText(fieldOldPassword, '12345678')

    const submitButton = getByTestId('change-password-button')
    fireEvent.press(submitButton)
    await act(async () => undefined)
    expect(fnShow).not.toBeCalled()

    const fieldNewPassword = getByA11yLabel('nueva contraseña')
    fireEvent.changeText(fieldNewPassword, '123456789')
    await act(async () => fieldNewPassword.props.onSubmitEditing())
    expect(fnShow).toBeCalledWith(expect.objectContaining({ type: 'error' }))
  })

  it('should show success notification when password is updated', async () => {
    const fnShow = jest.fn()
    MockUseNotification.mockReturnValue({ show: fnShow })

    const { getByA11yLabel, getByTestId } = render(<ChangePassword />)

    const fieldOldPassword = getByA11yLabel('actual contraseña')
    const fieldNewPassword = getByA11yLabel('nueva contraseña')
    fireEvent.changeText(fieldOldPassword, '12345678')
    fireEvent.changeText(fieldNewPassword, '123456789')

    const submitButton = getByTestId('change-password-button')
    fireEvent.press(submitButton)
    await act(async () => undefined)
    expect(fnShow).toBeCalledWith(expect.objectContaining({ type: 'success' }))
  })
})
