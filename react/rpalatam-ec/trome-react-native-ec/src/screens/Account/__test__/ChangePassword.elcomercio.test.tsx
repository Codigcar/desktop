import { fireEvent, render } from '@testing-utils/library'
import { FormHandles } from '@unform/core'
import React from 'react'

import { useAuthChangePassword } from '../../../hooks/useAuthChangePassword'
import ChangePassword from '../ChangePassword.elcomercio'

const mockGoBackFn = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    goBack: mockGoBackFn,
  })),
}))

jest.mock('../../../hooks/useAuthChangePassword')
const mockUseAuthChangePassword = useAuthChangePassword as jest.Mock
mockUseAuthChangePassword.mockReturnValue({ errors: {} })

describe('ChangePassword.elcomercio', () => {
  it('should successful call changePassword', () => {
    const formRef = React.createRef<FormHandles>()
    const changePassword = jest.fn()
    mockUseAuthChangePassword.mockReturnValueOnce({
      errors: {},
      changePassword,
      formRef,
    })
    const { getByTestId } = render(<ChangePassword />)
    const submitForm = jest.spyOn(formRef.current as FormHandles, 'submitForm')
    fireEvent.press(getByTestId('change-password-button'))
    expect(submitForm).toBeCalled()
    expect(changePassword).toBeCalled()
  })

  it('should focus the next input', () => {
    const formRef = React.createRef<FormHandles>()
    mockUseAuthChangePassword.mockReturnValueOnce({ errors: {}, formRef })
    const { getByA11yLabel } = render(<ChangePassword />)
    const getField = jest.spyOn(formRef.current as FormHandles, 'getFieldRef')
    const submitForm = jest.spyOn(formRef.current as FormHandles, 'submitForm')
    getByA11yLabel(/actual\scontraseña/i).props.onSubmitEditing()
    expect(getField).toHaveBeenLastCalledWith('newPassword')
    getByA11yLabel(/nueva\scontraseña/i).props.onSubmitEditing()
    expect(submitForm).toBeCalled()
  })

  it('should show error', () => {
    mockUseAuthChangePassword.mockReturnValueOnce({
      errors: {
        newPassword: 'Campo requerido',
        oldPassword: 'Campo requerido',
      },
    })
    const { getAllByText } = render(<ChangePassword />)
    expect(getAllByText(/campo\srequerido/i).length).toBe(2)
  })

  it('should set field error', () => {
    const setFieldError = jest.fn()
    const formRef = React.createRef<FormHandles>()
    mockUseAuthChangePassword.mockReturnValueOnce({
      errors: {},
      setFieldError,
      formRef,
    })
    const { getByA11yLabel, getByTestId } = render(<ChangePassword />)
    fireEvent.changeText(getByA11yLabel(/actual\scontraseña/i), '')
    fireEvent.changeText(getByA11yLabel(/nueva\scontraseña/i), '')
    fireEvent.press(getByTestId('change-password-button'))
    expect(setFieldError).toBeCalledTimes(2)
  })
})
