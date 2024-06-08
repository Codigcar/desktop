import { useRoute } from '@react-navigation/native'
import { fireEvent, render } from '@testing-utils/library'
import { FormHandles } from '@unform/core'
import React from 'react'

import { useAuth } from '../../../context/auth'
import { useAuthOptin } from '../../../hooks/useAuthOptin'
import SignUpOptIn from '../SignUpOptIn.elcomercio'

jest.mock('@react-navigation/native')
const mockUseRoute = useRoute as jest.Mock
mockUseRoute.mockReturnValue({ params: {} })

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock
const signin = jest.fn()
mockUseAuth.mockReturnValue({ signin })

jest.mock('../../../hooks/useAuthOptin')
const mockUseAuthOptin = useAuthOptin as jest.Mock
mockUseAuthOptin.mockReturnValue({ errors: {} })

describe('SignUpOptIn.elcomercio', () => {
  it('should successful call signUpOptin when you press the register button ', () => {
    const formRef = React.createRef<FormHandles>()
    const signUpOptin = jest.fn()
    mockUseAuthOptin.mockReturnValueOnce({ errors: {}, signUpOptin, formRef })

    const { getByText } = render(<SignUpOptIn />)
    const submitForm = jest.spyOn(formRef.current as FormHandles, 'submitForm')

    fireEvent.press(getByText('Registrarme'))
    expect(submitForm).toBeCalled()
    expect(signUpOptin).toBeCalled()
  })

  it('should show error', () => {
    mockUseAuthOptin.mockReturnValueOnce({
      errors: { mobile_phone: 'Mínimo 9 dígitos' },
    })
    const { getByText } = render(<SignUpOptIn />)
    expect(getByText(/mínimo\s9\sdígitos/i)).toBeDefined()
  })

  it('should show email input if need_email is true', () => {
    mockUseRoute
      .mockReturnValueOnce({ params: { need_email: false } })
      .mockReturnValueOnce({ params: { need_email: true } })
    const { getByText, rerender, queryByText } = render(<SignUpOptIn />)
    expect(queryByText(/correo\selectrónico/i)).toBeNull()
    rerender(<SignUpOptIn />)
    expect(getByText(/correo\selectrónico/i)).toBeDefined()
  })

  it('should set field error', () => {
    const setFieldError = jest.fn()
    mockUseAuthOptin.mockReturnValueOnce({ errors: {}, setFieldError })
    mockUseRoute.mockReturnValueOnce({ params: { need_email: true } })
    const { getByA11yLabel, getByTestId } = render(<SignUpOptIn />)
    fireEvent.changeText(getByA11yLabel('email'), 'user@provider.com')
    fireEvent.changeText(getByA11yLabel('celular'), '123456789')
    fireEvent.press(getByTestId('terms-checkbox'))
    expect(setFieldError).toBeCalledTimes(3)
  })

  it('should focus the next input', () => {
    const formRef = React.createRef<FormHandles>()
    mockUseAuthOptin.mockReturnValueOnce({ errors: {}, formRef })
    mockUseRoute.mockReturnValueOnce({ params: { need_email: true } })
    const { getByA11yLabel } = render(<SignUpOptIn />)
    const getField = jest.spyOn(formRef.current as FormHandles, 'getFieldRef')
    const submitForm = jest.spyOn(formRef.current as FormHandles, 'submitForm')
    getByA11yLabel('email').props.onSubmitEditing()
    expect(getField).toHaveBeenLastCalledWith('mobile_phone')
    getByA11yLabel('celular').props.onSubmitEditing()
    expect(submitForm).toBeCalled()
  })
})
