import { act, cleanup, fireEvent, render } from '@testing-utils/library'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import React from 'react'
import { Platform } from 'react-native'

import DateInput from '../Date'

afterEach(cleanup)

describe('Date picker with unform', () => {
  it('render picker with default value', () => {
    const formRef: React.RefObject<FormHandles> = { current: null }
    const name = 'date-input'
    const pickerTestID = 'picker-test-id'
    const defaultDate = new Date()
    const fnOnChangeDate = jest.fn()

    const { getByTestId } = render(
      <Form ref={formRef} onSubmit={jest.fn}>
        <DateInput
          name={name}
          testID={pickerTestID}
          defaultDate={defaultDate}
          onChangeDate={fnOnChangeDate}
        />
      </Form>,
    )
    expect(formRef.current?.getFieldValue(name)).toBe(defaultDate)

    const nextDate = new Date()
    act(() => {
      getByTestId(pickerTestID).props.onChange('', nextDate)
    })

    const doneBtn = getByTestId('done-button')
    act(() => {
      if (Platform.OS === 'ios') fireEvent.press(doneBtn)
    })
    expect(formRef.current?.getFieldValue(name)).toBe(nextDate)
    expect(fnOnChangeDate).toHaveBeenCalledWith(nextDate)

    act(() => {
      formRef.current?.clearField(name)
    })
    expect(formRef.current?.getFieldValue(name)).toBe(defaultDate)
  })

  it('render picker without default value', () => {
    const formRef: React.RefObject<FormHandles> = { current: null }
    const name = 'date-input'
    const pickerTestID = 'picker-test-id'
    const fnOnChangeDate = jest.fn()

    render(
      <Form ref={formRef} onSubmit={jest.fn}>
        <DateInput
          name={name}
          testID={pickerTestID}
          onChangeDate={fnOnChangeDate}
        />
      </Form>,
    )

    expect(formRef.current?.getFieldValue(name)).toBeUndefined()

    const nextDate = new Date()
    act(() => {
      formRef.current?.setFieldValue(name, nextDate)
    })
    expect(formRef.current?.getFieldValue(name)).toBe(nextDate)

    act(() => {
      formRef.current?.clearField(name)
    })
    expect(formRef.current?.getFieldValue(name)).toBeUndefined()
  })
})
