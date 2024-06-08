import { cleanup, render } from '@testing-utils/library'
import React from 'react'
import { Platform } from 'react-native'

import Label from '../Label'
import type { PickerOption } from '../Picker'

const options: PickerOption[] = [
  { value: 'one', label: 'first' },
  { value: 'two', label: 'Second' },
  { value: 'three', label: 'Third' },
]

afterEach(cleanup)

describe('Label', () => {
  it('should render selected option', () => {
    Platform.OS = 'android'
    const optionSelected = options[2]
    const { getByText } = render(
      <Label options={options} selectedValue={optionSelected.value} />,
    )
    expect(getByText(optionSelected.label)).toBeDefined()
  })

  it('should render placeholder', () => {
    Platform.OS = 'ios'
    const placeholder = 'number'
    const { getByText } = render(
      <Label options={options} placeholder={placeholder} />,
    )
    expect(getByText(placeholder)).toBeDefined()
  })

  it('should render with custom styles', () => {
    const props = {
      options,
      containerStyle: { backgroundColor: 'red' },
    }
    const { getByTestId } = render(<Label {...props} />)
    expect(getByTestId('label-container')).toHaveStyle(props.containerStyle)
  })

  it('should change opacity when disabled', () => {
    const { getByTestId } = render(<Label options={options} disabled />)
    expect(getByTestId('label-container')).toHaveStyle({ opacity: 0.5 })
  })
})
