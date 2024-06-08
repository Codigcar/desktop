import { useNavigation } from '@react-navigation/native'
import { fireEvent, render } from '@testing-utils/library'
import { FormHandles } from '@unform/core'
import React from 'react'

import { useAuthWithEmail } from '../../../hooks/useAuthWithEmail'
import { useAuthWithSocialMedia } from '../../../hooks/useAuthWithSocialMedia'
import { openInBrowser } from '../../../utils/inappbrowser'
import Login from '../Login.elcomercio'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
mockUseNavigation.mockReturnValue({
  getState: jest.fn().mockReturnValue({ routes: [] }),
  goBack: jest.fn,
})

jest.mock('../../../hooks/useAuthWithEmail')
const mockUseAuthWithEmail = useAuthWithEmail as jest.Mock
mockUseAuthWithEmail.mockReturnValue({ errors: {} })

jest.mock('../../../hooks/useAuthWithSocialMedia')
const mockUseAuthWithSocialMedia = useAuthWithSocialMedia as jest.Mock
mockUseAuthWithSocialMedia.mockReturnValue({ errors: {} })

jest.mock('../../../utils/inappbrowser')

describe('Signwall', () => {
  it('should submit form', () => {
    const formRef = React.createRef<FormHandles>()
    const signInEmail = jest.fn()
    mockUseAuthWithEmail.mockReturnValue({ errors: {}, formRef, signInEmail })
    const { getByText } = render(<Login />)
    const submitForm = jest.spyOn(formRef.current as FormHandles, 'submitForm')
    fireEvent.press(getByText('Ingresar'))
    expect(submitForm).toBeCalled()
    expect(signInEmail).toBeCalled()
  })

  it('should set field error', () => {
    const setFieldError = jest.fn()
    mockUseAuthWithEmail.mockReturnValueOnce({ errors: {}, setFieldError })
    const { getByA11yLabel } = render(<Login />)
    fireEvent.changeText(getByA11yLabel('email'), 'user@provider.com')
    fireEvent.changeText(getByA11yLabel('contraseña'), '12345678')
    expect(setFieldError).toBeCalledTimes(2)
  })

  it('should focus the next input', () => {
    const formRef = React.createRef<FormHandles>()
    mockUseAuthWithEmail.mockReturnValueOnce({ errors: {}, formRef })
    const { getByA11yLabel } = render(<Login />)
    const getField = jest.spyOn(formRef.current as FormHandles, 'getFieldRef')
    const submitForm = jest.spyOn(formRef.current as FormHandles, 'submitForm')
    getByA11yLabel('email').props.onSubmitEditing()
    expect(getField).toHaveBeenLastCalledWith('password')
    getByA11yLabel('contraseña').props.onSubmitEditing()
    expect(submitForm).toBeCalled()
  })

  it('should navigate to forgot password screen', () => {
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValueOnce({
      getState: jest.fn().mockReturnValue({ routes: [] }),
      navigate,
    })
    const { getByText } = render(<Login />)
    fireEvent.press(getByText('Olvidé mi contraseña'))
    expect(navigate).toBeCalledWith('RecoveryPassword')
  })

  it('should render email error', () => {
    const common_error = 'email_error'
    mockUseAuthWithEmail.mockReturnValueOnce({ errors: { common_error } })
    const { getByText, queryByText, rerender } = render(<Login />)
    expect(getByText('email_error')).toBeDefined()
    rerender(<Login />)
    expect(queryByText('email_error')).toBeNull()
  })

  it('should render social provider error', () => {
    const common_error = 'social_error'
    mockUseAuthWithSocialMedia.mockReturnValueOnce({ errors: { common_error } })
    const { getByText, queryByText, rerender } = render(<Login />)
    expect(getByText('social_error')).toBeDefined()
    rerender(<Login />)
    expect(queryByText('social_error')).toBeNull()
  })

  it('should navigate to sign up screen', () => {
    const replace = jest.fn()
    mockUseNavigation.mockReturnValueOnce({
      getState: jest.fn().mockReturnValue({ routes: [] }),
      replace,
    })
    const { getByText } = render(<Login />)
    fireEvent.press(getByText('Crea una cuenta gratis'))
    expect(replace).toBeCalledWith('SignUp')
  })

  it('should open subscription landing', () => {
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValueOnce({
      getState: jest.fn().mockReturnValue({
        routes: [{}, { name: 'PaywallModal' }, { name: 'Login' }],
      }),
      navigate,
    })
    const { getByText } = render(<Login />)
    fireEvent.press(getByText('Elige el plan que más te convenga'))
    expect(openInBrowser).toHaveBeenLastCalledWith(
      expect.stringContaining('/suscripciones'),
    )
  })
})
