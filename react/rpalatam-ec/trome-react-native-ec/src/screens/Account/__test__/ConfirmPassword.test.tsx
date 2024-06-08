import { act, cleanup, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useAuth } from '../../../context/auth'
import { useNotification } from '../../../context/notification'
import auth from '../../../services/auth'
import ConfirmPassword from '../ConfirmPassword'

jest.mock('../../../context/auth')
jest.mock('../../../context/notification')

const MockUseAuth = useAuth as jest.Mock
const MockUseNotification = useNotification as jest.Mock

const user = { email: 'ec@ec.pe' }

beforeAll(() => {
  MockUseAuth.mockReturnValue({ user })
})

beforeEach(cleanup)

describe('ConfirmPassword screen page', () => {
  it('should render error message on pass an invalid password', async () => {
    const { getByTestId, queryByText } = render(
      <ConfirmPassword onSubmit={jest.fn} setIsSubmitted={jest.fn} />,
    )

    const confirmButton = getByTestId('btn-confirm-password')
    fireEvent.press(confirmButton)
    await act(async () => undefined)
    const errorMessage = queryByText(/requerido/i)
    expect(errorMessage).toBeDefined()
  })

  it('should send the password in form to api', async () => {
    const login = jest.spyOn(auth, 'login')
    const { getByTestId } = render(
      <ConfirmPassword onSubmit={jest.fn} setIsSubmitted={jest.fn} />,
    )

    const password = 'sample-password'
    const confirmButton = getByTestId('btn-confirm-password')
    const inputPassword = getByTestId('input-password')
    fireEvent.changeText(inputPassword, password)
    fireEvent.press(confirmButton)
    await act(async () => undefined)
    expect(login).toHaveBeenLastCalledWith(user.email, password)
  })

  it('should call setIsSubmitted prop when request fails or is successful', async () => {
    jest.spyOn(auth, 'login').mockResolvedValueOnce()
    const callback = jest.fn()
    const { getByTestId } = render(
      <ConfirmPassword onSubmit={jest.fn} setIsSubmitted={callback} />,
    )

    const confirmButton = getByTestId('btn-confirm-password')
    fireEvent.press(confirmButton)
    await act(async () => undefined)
    expect(callback).toHaveBeenCalledTimes(2)

    const inputPassword = getByTestId('input-password')
    fireEvent.changeText(inputPassword, 'test-password')
    fireEvent.press(confirmButton)
    await act(async () => undefined)
    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('should call onSubmit prop when the request has been successfully', async () => {
    jest.spyOn(auth, 'login').mockResolvedValueOnce()
    const callback = jest.fn()
    const { getByTestId } = render(
      <ConfirmPassword onSubmit={callback} setIsSubmitted={jest.fn} />,
    )

    const confirmButton = getByTestId('btn-confirm-password')
    const inputPassword = getByTestId('input-password')
    fireEvent.changeText(inputPassword, 'test-password')
    fireEvent.press(confirmButton)
    await act(async () => undefined)
    expect(callback).toHaveBeenCalled()
  })

  it('should show an error notification when request fails', async () => {
    jest.spyOn(auth, 'login').mockRejectedValueOnce(new Error('test'))
    const sendErrorNotification = jest.fn()
    MockUseNotification.mockReturnValueOnce({ show: sendErrorNotification })
    const { getByTestId } = render(
      <ConfirmPassword onSubmit={jest.fn} setIsSubmitted={jest.fn} />,
    )

    const password = 'sample-password'
    const confirmButton = getByTestId('btn-confirm-password')
    const inputPassword = getByTestId('input-password')
    fireEvent.changeText(inputPassword, password)
    fireEvent.press(confirmButton)
    await act(async () => undefined)
    expect(sendErrorNotification).toHaveBeenCalled()
  })
})
