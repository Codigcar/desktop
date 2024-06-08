import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useAuth } from '../../../context/auth'
import { useNotification } from '../../../context/notification'
import auth from '../../../services/auth'
import Information, { formRef } from '../Information'
import { OPTIONS } from '../utils'

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
}))

jest.mock('../../../context/auth')
jest.mock('../../../context/notification')
jest.useFakeTimers()

const MockUseAuth = useAuth as jest.Mock
const MockUseNotification = useNotification as jest.Mock

const user = {
  email: 'whatever-email@test.dev',
  first_name: 'test',
  last_name: 'test',
}
const updateUserProfile = jest.fn().mockResolvedValue(null)

beforeAll(() => {
  MockUseAuth.mockReturnValue({ user, updateUserProfile })
})

describe('Information screen page', () => {
  it('should call update function with default values', async () => {
    auth.updateProfile = jest.fn().mockResolvedValue(user)
    const { getByText } = render(<Information />)

    const submitButton = getByText(/actualizar/i)
    fireEvent.press(submitButton)
    await act(async () => undefined)
    expect(updateUserProfile).toHaveBeenLastCalledWith(
      expect.objectContaining(user),
    )
  })

  it('should or should not show notification when an error occurs', async () => {
    const fnShow = jest.fn()
    MockUseNotification.mockReturnValue({ show: fnShow })

    MockUseAuth.mockReturnValue({
      user,
      updateUserProfile: jest.fn().mockRejectedValue(new Error('test')),
    })

    const { getByTestId, getByText } = render(<Information />)

    const submitButton = getByText(/actualizar/i)

    const fieldFirsname = getByTestId('input-first_name')
    const fieldLastname = getByTestId('input-last_name')
    fireEvent.changeText(fieldFirsname, '')
    fireEvent.press(submitButton)
    await act(async () => undefined)
    expect(fnShow).not.toBeCalled()

    fireEvent.changeText(fieldFirsname, 'test')
    fireEvent.changeText(fieldLastname, 'test')
    fireEvent.press(submitButton)
    await act(async () => undefined)
    expect(fnShow).toBeCalledWith(expect.objectContaining({ type: 'error' }))
  })

  it('should valid errors for invalid inputs when their values changed', async () => {
    const { getByTestId } = render(<Information />)

    const fieldFirsname = getByTestId('input-first_name')
    fireEvent.changeText(fieldFirsname, '')
    await act(async () => undefined)
    expect(formRef.current?.getFieldError('first_name')).toBeDefined()

    const fieldLasname = getByTestId('input-last_name')
    fireEvent.changeText(fieldLasname, 'a')
    await act(async () => undefined)
    expect(formRef.current?.getFieldError('last_name')).toBeDefined()

    const fieldSecLastname = getByTestId('input-second_last_name')
    fireEvent.changeText(fieldSecLastname, '123')
    await act(async () => undefined)
    expect(formRef.current?.getFieldError('second_last_name')).toBeDefined()

    const fieldEmail = getByTestId('input-email')
    fireEvent.changeText(fieldEmail, 'abc')
    await act(async () => undefined)
    expect(formRef.current?.getFieldError('email')).toBeDefined()

    const fieldPhone = getByTestId('input-mobile_phone')
    fireEvent.changeText(fieldPhone, 'abc')
    await act(async () => undefined)
    expect(formRef.current?.getFieldError('mobile_phone')).toBeDefined()
  })

  it('should change rules for doc number when doc type change', async () => {
    const { getAllByTestId, getByTestId } = render(<Information />)

    const fieldDocType = 'user_metadata.documentType'
    const fieldDocNumber = 'user_metadata.documentNumber'
    const docType = formRef.current?.getFieldRef(fieldDocType)
    const { document } = OPTIONS

    act(() => docType.props.onValueChange(document[1].value, 1))
    const doneBtn = getAllByTestId('done-button')
    fireEvent.press(doneBtn[0])
    await act(async () => undefined)
    expect(formRef.current?.getFieldError(fieldDocNumber)).toBeDefined()

    const mobilePhone = getByTestId(fieldDocNumber)
    fireEvent.changeText(mobilePhone, '1A2B3C4C')
    await act(async () => undefined)
    expect(formRef.current?.getFieldError(fieldDocNumber)).toBeFalsy()

    act(() => docType.props.onValueChange(document[0].value, 0))
    fireEvent.press(doneBtn[0])
    await act(async () => undefined)
    expect(formRef.current?.getFieldError(fieldDocNumber)).toBeDefined()
  })
})
