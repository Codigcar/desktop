import { act, renderHook } from '@testing-library/react-hooks'
import { fireEvent, render } from '@testing-utils/library'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import React from 'react'

import Input from '../../../components/input'
import * as Schema from '../../../utils/validation'
import { useFormErrors } from '../utils'

const SimpleSchema = Schema.object().shape({
  email: Schema.string().email(),
})

describe('Form utils', () => {
  it('Hook useFormErrors single schema', async () => {
    const formRef = React.createRef<FormHandles>()
    const onSubmit = jest.fn()
    const { getByA11yLabel } = render(
      <Form ref={formRef} onSubmit={onSubmit}>
        <Input name="email" accessibilityLabel="email" />
      </Form>,
    )

    const { result } = renderHook(() =>
      useFormErrors({
        ref: formRef,
        schema: SimpleSchema,
      }),
    )

    const inputEmail = getByA11yLabel('email')

    fireEvent.changeText(inputEmail, '')
    await act(() => result.current.setFieldError('email', ''))
    expect(result.current.errors.email).toBeTruthy()

    fireEvent.changeText(inputEmail, 'user@provider.com')
    await act(() => result.current.setFieldError('email', 'user@provider.com'))
    expect(result.current.errors.email).toBeFalsy()

    fireEvent.changeText(inputEmail, 'user')
    act(() => result.current.setErrors({ email: 'Email inválido' }))
    expect(result.current.errors.email).toBeTruthy()
  })
})
