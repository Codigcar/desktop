import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { Text } from 'react-native'

import PickerBase from '../Base'
import PickerAndroid from '../Picker.android'
import PickerIOS from '../Picker.ios'
import type { PickerOption, PickerRef } from '../Picker'

const optionsLength = 10

const options: PickerOption[] = Array.from({ length: optionsLength }).map(
  (_, i) => ({
    label: `label-${i}`,
    value: `value-${i}`,
  }),
)

const index = Math.round(Math.random() * (optionsLength - 1))

describe('Picker', () => {
  it('methods in picker base', () => {
    const ref = React.createRef<PickerRef>()
    const fnOnValueChange = jest.fn()
    const optionSelected = options[index]
    render(
      <PickerBase
        ref={ref}
        onValueChange={fnOnValueChange}
        selectedValue={optionSelected.value}
      />,
    )
    expect(ref.current?.props?.selectedValue).toBe(optionSelected.value)

    const [lastValue] = options.slice(-1)
    const lastIndex = optionsLength - 1
    act(() => {
      ref.current?.props?.onValueChange?.(lastValue.value, lastIndex)
    })
    expect(fnOnValueChange).toHaveBeenCalledWith(lastValue.value, lastIndex)
    expect(ref.current?.props?.selectedValue).toBe(lastValue.value)
  })

  it('render picker for android', async () => {
    const ref = React.createRef<PickerRef>()
    const optionSelected = options[index]
    const { getByTestId, getByText, rerender } = render(
      <PickerAndroid
        ref={ref}
        options={options}
        selectedValue={optionSelected.value}
      />,
    )
    expect(getByText(optionSelected.label)).toBeDefined()

    const fnFocus = jest.fn()
    if (ref.current) ref.current.focus = fnFocus
    const renderedPicker = getByTestId('open-button')
    fireEvent.press(renderedPicker)
    expect(fnFocus).toHaveBeenCalled()

    const pickerAndroidTestID = 'picker-android'
    const prompt = 'custom-prompt'
    rerender(
      <PickerAndroid
        options={options}
        prompt={prompt}
        testID={pickerAndroidTestID}>
        <Text>Custom children</Text>
      </PickerAndroid>,
    )
    const pickerAndroid = getByTestId(pickerAndroidTestID)
    expect(getByText(/custom\schildren/i)).toBeDefined()
    expect(pickerAndroid.findByProps({ label: prompt })).toBeDefined()
  })

  it('render picker for ios', async () => {
    const ref = React.createRef<PickerRef>()
    const fnOnValueChange = jest.fn()
    const optionSelected = options[index]
    const { getByTestId, getByText, rerender } = render(
      <PickerIOS
        ref={ref}
        options={options}
        onValueChange={fnOnValueChange}
        selectedValue={optionSelected.value}
      />,
    )
    expect(getByText(optionSelected.label)).toBeDefined()

    const modal = getByTestId('modal-container')
    expect(modal.props.accessibilityElementsHidden).toBeTruthy()
    const renderedPicker = getByTestId('open-button')
    fireEvent.press(renderedPicker)
    expect(modal.props.accessibilityElementsHidden).toBeFalsy()

    const [lastValue] = options.slice(-1)
    const lastIndex = optionsLength - 1
    act(() => {
      ref.current?.props?.onValueChange?.(lastValue.value, lastIndex)
    })
    expect(fnOnValueChange).not.toHaveBeenCalled()

    const doneBtn = getByTestId('done-button')
    fireEvent.press(doneBtn)
    expect(fnOnValueChange).toHaveBeenCalledWith(lastValue.value, lastIndex)

    rerender(
      <PickerIOS options={options}>
        <Text>Custom children</Text>
      </PickerIOS>,
    )
    expect(getByText(/custom\schildren/i)).toBeDefined()
  })

  it('should picker disabled by props', () => {
    const ref = React.createRef<PickerRef>()
    const props = { testID: 'picker', ref, options, disabled: true }
    const { queryByTestId, rerender } = render(<PickerAndroid {...props} />)

    const pickerAndroid = queryByTestId('picker')
    expect(pickerAndroid).toHaveProp('accessibilityState', { disabled: true })

    rerender(<PickerIOS {...props} />)
    const pickerIOS = queryByTestId('picker')
    expect(pickerIOS).toHaveProp('accessibilityState', { disabled: true })
  })
})
