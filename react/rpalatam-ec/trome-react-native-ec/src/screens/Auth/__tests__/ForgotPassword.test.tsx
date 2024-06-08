import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import ForgotPassword from '../ForgotPassword'

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

    expect(getByText(/campo\srequerido/i)).not.toBeNull()

    const inputEmail = getByA11yLabel('email')
    fireEvent.changeText(inputEmail, 'user@company.com')

    fireEvent.press(buttonSend)
    await act(async () => undefined)

    expect(queryByText(/email\sinválido/i)).toBeNull()
  })

  it('should show form errors', async () => {
    const { getByText, queryAllByText, getByA11yLabel } = render(
      <ForgotPassword />,
    )

    fireEvent.press(getByText(/enviar/i))
    await act(async () => undefined)

    expect(queryAllByText(/campo\srequerido/i).length).toBe(1)

    const inputEmail = getByA11yLabel('email')
    fireEvent.changeText(inputEmail, 'user@companycom')

    fireEvent.press(getByText(/enviar/i))
    await act(async () => undefined)

    expect(getByText(/email\sinválido/i)).toBeDefined()
  })
})
