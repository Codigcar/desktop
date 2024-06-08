import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { Text } from 'react-native'

import DatePickerAndroid from '../DatePicker.android'
import DatePickerIOS from '../DatePicker.ios'

describe('DatePicker', () => {
  it('render date picker for android', async () => {
    const value = new Date()
    const pickerTestID = 'picker-android'
    const fnOnChangeDate = jest.fn()
    const { getByTestId, getByText, queryByTestId, rerender } = render(
      <DatePickerAndroid
        testID={pickerTestID}
        value={value}
        onChangeDate={fnOnChangeDate}
      />,
    )
    expect(getByTestId('label-container')).toBeDefined()
    expect(queryByTestId(pickerTestID)).toBeNull()

    const controller = getByTestId('open-controller')
    fireEvent.press(controller)
    const picker = getByTestId(pickerTestID)
    expect(picker).toBeDefined()

    const nextDate = new Date()
    act(() => {
      picker.props.onChange('', nextDate)
    })
    expect(fnOnChangeDate).toBeCalledWith(nextDate)
    expect(queryByTestId(pickerTestID)).toBeNull()

    fireEvent.press(controller)
    act(() => {
      getByTestId(pickerTestID).props.onChange('')
    })
    expect(fnOnChangeDate).toBeCalledTimes(1)

    rerender(
      <DatePickerAndroid value={value}>
        <Text>Custom children</Text>
      </DatePickerAndroid>,
    )
    expect(getByText(/custom\schildren/i)).toBeDefined()
  })

  it('render date picker for ios', () => {
    const value = new Date()
    const pickerTestID = 'picker-ios'
    const fnOnChangeDate = jest.fn()
    const { getByTestId, getByText, rerender } = render(
      <DatePickerIOS
        testID={pickerTestID}
        value={value}
        onChangeDate={fnOnChangeDate}
      />,
    )
    expect(getByTestId('label-container')).toBeDefined()

    const modal = getByTestId('modal-container')
    expect(modal.props.accessibilityElementsHidden).toBeTruthy()
    const controller = getByTestId('open-controller')
    fireEvent.press(controller)
    expect(modal.props.accessibilityElementsHidden).toBeFalsy()

    const nextDate = new Date()
    const picker = getByTestId(pickerTestID)
    act(() => {
      picker.props.onChange('', nextDate)
    })
    expect(fnOnChangeDate).not.toHaveBeenCalled()

    const doneBtn = getByTestId('done-button')
    fireEvent.press(doneBtn)
    expect(fnOnChangeDate).toHaveBeenCalledWith(nextDate)
    expect(modal.props.accessibilityElementsHidden).toBeTruthy()

    act(() => {
      picker.props.onChange('')
    })
    fireEvent.press(doneBtn)
    expect(fnOnChangeDate).toHaveBeenCalledWith(value)

    rerender(
      <DatePickerIOS value={value}>
        <Text>Custom children</Text>
      </DatePickerIOS>,
    )
    expect(getByText(/custom\schildren/i)).toBeDefined()
  })
})
