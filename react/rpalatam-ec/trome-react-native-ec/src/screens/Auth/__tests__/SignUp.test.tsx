import { fireEvent, render } from '@testing-utils/library'
import { FormHandles } from '@unform/core'
import React from 'react'

import { useAuthWithEmail } from '../../../hooks/useAuthWithEmail'
import { App } from '../../../utils/config'
import SignUp from '../SignUp'

jest.mock('react-native-device-info', () => ({
  getBundleId: jest.fn(() => 'com.eeec.Gestion'),
}))

jest.mock('../../../hooks/useAuthWithEmail')
const mockUseAuthWithEmail = useAuthWithEmail as jest.Mock
mockUseAuthWithEmail.mockReturnValue({ errors: {} })

describe('SignUp', () => {
  it('should successful call signUp when you press the register button ', () => {
    const formRef = React.createRef<FormHandles>()
    const signUp = jest.fn()
    mockUseAuthWithEmail.mockReturnValueOnce({ errors: {}, signUp, formRef })

    const { getByText } = render(<SignUp />)
    const submitForm = jest.spyOn(formRef.current as FormHandles, 'submitForm')

    fireEvent.press(getByText('Registrarme'))
    expect(submitForm).toBeCalled()
    expect(signUp).toBeCalled()
  })

  it('should set field error', () => {
    const setFieldError = jest.fn()
    mockUseAuthWithEmail.mockReturnValueOnce({ errors: {}, setFieldError })
    const { getByA11yLabel, getByTestId } = render(<SignUp />)
    fireEvent.changeText(getByA11yLabel('nombre'), 'Name')
    fireEvent.changeText(getByA11yLabel('apellido'), 'Lastname')
    fireEvent.changeText(getByA11yLabel('email'), 'user@provider.com')
    fireEvent.changeText(getByA11yLabel('contraseña'), '12345678')
    fireEvent.press(getByTestId('terms-checkbox'))
    expect(setFieldError).toBeCalledTimes(5)
  })

  it('should focus the next input', () => {
    const formRef = React.createRef<FormHandles>()
    mockUseAuthWithEmail.mockReturnValueOnce({ errors: {}, formRef })
    const { getByA11yLabel } = render(<SignUp />)
    const getField = jest.spyOn(formRef.current as FormHandles, 'getFieldRef')
    const submitForm = jest.spyOn(formRef.current as FormHandles, 'submitForm')
    getByA11yLabel('nombre').props.onSubmitEditing()
    expect(getField).toHaveBeenLastCalledWith('last_name')
    getByA11yLabel('apellido').props.onSubmitEditing()
    expect(getField).toHaveBeenLastCalledWith('email')
    getByA11yLabel('email').props.onSubmitEditing()
    expect(getField).toHaveBeenLastCalledWith('password')
    getByA11yLabel('contraseña').props.onSubmitEditing()
    expect(submitForm).toBeCalled()
  })

  it('should render errors', () => {
    mockUseAuthWithEmail.mockReturnValueOnce({
      errors: {
        first_name: 'Campo requerido',
        last_name: 'Campo requerido',
        email: 'Campo requerido',
        password: 'Campo requerido',
      },
    })
    const { getAllByText } = render(<SignUp />)
    expect(getAllByText(/campo\srequerido/i).length).toBe(4)
  })

  it('should render loading', () => {
    mockUseAuthWithEmail
      .mockReturnValueOnce({ errors: {}, isSubmitted: true })
      .mockReturnValueOnce({ errors: {}, isSubmitted: false })
    const { getByTestId, rerender, queryByTestId } = render(<SignUp />)
    expect(getByTestId('loading')).toBeDefined()
    rerender(<SignUp />)
    expect(queryByTestId('loading')).toBeNull()
  })

  it('should not render firstname and lastname inputs for peru21', () => {
    App.key = 'peru21'
    const { queryByA11yLabel } = render(<SignUp />)
    expect(queryByA11yLabel('nombre')).toBeNull()
    expect(queryByA11yLabel('apellido')).toBeNull()
  })
})
