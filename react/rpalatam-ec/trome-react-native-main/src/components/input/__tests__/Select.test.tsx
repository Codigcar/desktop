import { act, cleanup, fireEvent, render } from '@testing-utils/library'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import React from 'react'
import { Platform } from 'react-native'

import Select from '../Select'
import type { PickerOption } from '../../picker'

const options: PickerOption[] = [
  { value: 'one', label: 'first' },
  { value: 'two', label: 'Second' },
  { value: 'three', label: 'Third' },
]

afterEach(cleanup)

describe('Select with unform', () => {
  it('render select with default value', () => {
    const formRef: React.RefObject<FormHandles> = { current: null }
    const name = 'select-with-default-value'
    const defaultValue = 'three'
    const testID = 'picker-test-id'
    const fnOnValueChange = jest.fn()

    const { getByTestId } = render(
      <Form ref={formRef} onSubmit={jest.fn}>
        <Select
          name={name}
          options={options}
          defaultValue={defaultValue}
          onValueChange={fnOnValueChange}
          testID={testID}
        />
      </Form>,
    )
    expect(formRef.current?.getFieldValue(name)).toBe(defaultValue)

    const nextOption = options[1]
    act(() => {
      getByTestId(testID).props.onValueChange(nextOption.value, 1)
    })

    const doneBtn = getByTestId('done-button')
    act(() => {
      if (Platform.OS === 'ios') fireEvent.press(doneBtn)
    })
    expect(formRef.current?.getFieldValue(name)).toBe(nextOption.value)
    expect(fnOnValueChange).toHaveBeenCalledWith(nextOption.value, 1)

    act(() => {
      formRef.current?.clearField(name)
    })
    expect(formRef.current?.getFieldValue(name)).toBe(defaultValue)
  })

  it('render select without default value', () => {
    const formRef: React.RefObject<FormHandles> = { current: null }
    const name = 'select-without-default-value'
    const selectedValue = 'two'
    render(
      <Form ref={formRef} onSubmit={jest.fn}>
        <Select name={name} options={options} selectedValue={selectedValue} />
      </Form>,
    )
    expect(formRef.current?.getFieldValue(name)).toBe(selectedValue)

    act(() => {
      formRef.current?.clearField(name)
    })
    expect(formRef.current?.getFieldValue(name)).toBeUndefined()
  })

  it('change style with error', () => {
    const formRef: React.RefObject<FormHandles> = { current: null }
    const name = 'select-with-error'

    const { getByTestId } = render(
      <Form ref={formRef} onSubmit={jest.fn}>
        <Select name={name} options={options} />
      </Form>,
    )

    const errorStyles = { borderColor: '#EF4444' }
    const labelTestID = 'label-container'

    act(() => {
      formRef.current?.setFieldError(name, 'error')
    })
    expect(getByTestId(labelTestID)).toHaveStyle(errorStyles)

    act(() => {
      formRef.current?.setFieldError(name, '')
    })
    expect(getByTestId(labelTestID)).not.toHaveStyle(errorStyles)
  })
})
