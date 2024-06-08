import { fireEvent, render } from '@testing-utils/library'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import React from 'react'

import CheckboxInput from '../CheckboxInput'
import Input from '../index'

describe('Input', () => {
  it('Check types', () => {
    const formRef: React.RefObject<FormHandles> = { current: null }
    const onSubmit = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Field = ({ type }: { type?: any }) => (
      <Form ref={formRef} onSubmit={onSubmit}>
        <Input name="field" type={type} testID="field-input" />
      </Form>
    )
    const { getByTestId, rerender } = render(<Field type="text" />)
    expect(getByTestId('field-input').props.keyboardType).toBe('default')

    rerender(<Field type="email" />)
    expect(getByTestId('field-input').props.keyboardType).toBe('email-address')

    rerender(<Field type="phone" />)
    expect(getByTestId('field-input').props.keyboardType).toBe('phone-pad')
  })

  it('should have disabled state', () => {
    const formRef = React.createRef<FormHandles>()
    const { getByPlaceholderText } = render(
      <Form ref={formRef} onSubmit={jest.fn}>
        <Input name="field" type="text" placeholder="field" disabled />
      </Form>,
    )
    const inputField = getByPlaceholderText('field')
    expect(inputField).toHaveProp('editable', false)
    expect(inputField).toHaveProp('accessibilityState', { disabled: true })
  })

  it('Events', () => {
    const formRef: React.RefObject<FormHandles> = { current: null }
    const name = 'name-input'
    const onBlur = jest.fn()
    const onFocus = jest.fn()
    const onSubmit = jest.fn()
    const { getByTestId } = render(
      <Form ref={formRef} onSubmit={onSubmit}>
        <Input
          name={name}
          type="text"
          testID={name}
          onBlur={onBlur}
          onFocus={onFocus}
          autoFocus
        />
      </Form>,
    )
    const input = getByTestId(name)
    fireEvent.changeText(input, 'gec')
    const value = formRef.current?.getFieldValue(name)
    expect(value).toBe('gec')
  })

  it('Password', () => {
    const formRef: React.RefObject<FormHandles> = { current: null }
    const testID = 'password-input'
    const onSubmit = jest.fn()
    const { getByTestId } = render(
      <Form ref={formRef} onSubmit={onSubmit}>
        <Input.Password name="password" testID={testID} />
      </Form>,
    )

    const input = getByTestId(testID)
    const initValue = input.props.secureTextEntry

    fireEvent.press(getByTestId('password-icon'))
    expect(input.props.secureTextEntry).not.toBe(initValue)

    fireEvent.press(getByTestId('password-icon'))
    expect(input.props.secureTextEntry).toBe(initValue)
  })

  it('Checkbox', () => {
    const formRef: React.RefObject<FormHandles> = { current: null }
    const name = 'checkbox-input'
    const onSubmit = jest.fn()
    const onChange = jest.fn()
    const { getByTestId } = render(
      <Form ref={formRef} onSubmit={onSubmit}>
        <CheckboxInput
          name={name}
          value={false}
          onValueChange={onChange}
          testID={name}
        />
      </Form>,
    )

    const checkbox = getByTestId(name)
    expect(formRef.current?.getFieldValue(name)).toBeFalsy()
    fireEvent.press(checkbox)
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
