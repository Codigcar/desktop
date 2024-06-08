import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useAuth } from '../../../context/auth'
import { formRef } from '../../../hooks/useAuthInformation'
import auth from '../../../services/auth'
import Information from '../Information.elcomercio'

jest.mock('@react-navigation/native')

jest.useFakeTimers()

jest.mock('../../../context/auth')
const MockUseAuth = useAuth as jest.Mock

const user = {
  email: 'whatever-email@test.dev',
  first_name: 'test',
  last_name: 'test',
  user_metadata: {
    documentNumber: '123456789',
    documentType: 'CDI',
  },
}

const updateUserProfile = jest.fn().mockResolvedValue(null)
MockUseAuth.mockReturnValue({ user, updateUserProfile })

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

  describe('doc type and doc number', () => {
    const fieldDocType = 'user_metadata.documentType'
    const fieldDocNumber = 'user_metadata.documentNumber'

    it('should validate doc number when doc type is DNI', async () => {
      const { getAllByTestId, getByTestId, getByText } = render(<Information />)

      const docType = formRef.current?.getFieldRef(fieldDocType)
      act(() => docType.props.onValueChange('DNI', 0))
      fireEvent.press(getAllByTestId('done-button')[0])
      act(() => undefined)
      fireEvent.press(getByText('Actualizar'))
      await act(async () => undefined)
      expect(formRef.current?.getFieldError(fieldDocNumber)).toBeDefined()

      fireEvent.changeText(getByTestId(fieldDocNumber), '12345678')
      fireEvent.press(getByText('Actualizar'))
      await act(async () => undefined)
      expect(formRef.current?.getFieldError(fieldDocNumber)).toBeFalsy()
    })

    it('should change validation for doc number when doc type change', async () => {
      const { getAllByTestId, getByTestId, getByText } = render(<Information />)

      fireEvent.changeText(getByTestId(fieldDocNumber), '')
      const docType = formRef.current?.getFieldRef(fieldDocType)
      act(() => docType.props.onValueChange('CEX', 1))
      fireEvent.press(getAllByTestId('done-button')[0])
      act(() => undefined)
      fireEvent.press(getByText('Actualizar'))
      await act(async () => undefined)
      expect(formRef.current?.getFieldError(fieldDocNumber)).toBeDefined()

      fireEvent.changeText(getByTestId(fieldDocNumber), '1A2B3C4C5D')
      fireEvent.press(getByText('Actualizar'))
      await act(async () => undefined)
      expect(formRef.current?.getFieldError(fieldDocNumber)).toBeFalsy()
    })
  })
})
