import { useRoute } from '@react-navigation/native'
import { fireEvent, render } from '@testing-utils/library'
import { FormHandles } from '@unform/core'
import React from 'react'

import { useAuth } from '../../../context/auth'
import { useAuthOptin } from '../../../hooks/useAuthOptin'
import SignUpOptIn from '../SignUpOptIn'

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

describe('SignUpOptIn', () => {
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
      errors: {
        mobile_phone: 'Mínimo 9 dígitos',
      },
    })
    const { getByText } = render(<SignUpOptIn />)
    expect(getByText(/mínimo\s9\sdígitos/i)).toBeDefined()
  })

  it('should show email input if need_email is true', () => {
    mockUseRoute
      .mockReturnValueOnce({
        params: {
          need_email: false,
        },
      })
      .mockReturnValueOnce({
        params: {
          need_email: true,
        },
      })
    const { getByText, rerender, queryByText } = render(<SignUpOptIn />)
    expect(queryByText(/correo\selectrónico/i)).toBeNull()
    rerender(<SignUpOptIn />)
    expect(getByText(/correo\selectrónico/i)).toBeDefined()
  })

  it('should render loading when isSubmitted is true', () => {
    mockUseAuthOptin
      .mockReturnValueOnce({ errors: {}, isSubmitted: true })
      .mockReturnValueOnce({ errors: {}, isSubmitted: false })
    const { getByTestId, rerender, queryByTestId } = render(<SignUpOptIn />)
    expect(getByTestId('loading')).toBeDefined()
    rerender(<SignUpOptIn />)
    expect(queryByTestId('loading')).toBeNull()
  })

  it('should render set field error', () => {
    const setFieldError = jest.fn()
    mockUseAuthOptin.mockReturnValueOnce({ errors: {}, setFieldError })
    const { getByTestId } = render(<SignUpOptIn />)
    fireEvent.press(getByTestId('terms-checkbox'))
    expect(setFieldError).toBeCalledTimes(1)
  })
})
