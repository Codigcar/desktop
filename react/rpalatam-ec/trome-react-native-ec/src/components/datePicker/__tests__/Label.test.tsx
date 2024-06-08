import { cleanup, render } from '@testing-utils/library'
import React from 'react'
import { Platform } from 'react-native'

import DatePickerLabel from '../Label'

const value = new Date()

afterEach(cleanup)

describe('Label date picker', () => {
  it('should render default label', () => {
    Platform.OS = 'android'
    const text = value.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    const { getByText } = render(<DatePickerLabel value={value} />)
    expect(getByText(text)).toBeDefined()
  })

  it('should render with custom date format', () => {
    Platform.OS = 'ios'
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }
    const text = value.toLocaleDateString('es-ES', options)
    const { getByText } = render(
      <DatePickerLabel value={value} dateFormat={options} />,
    )
    expect(getByText(text)).toBeDefined()
  })

  it('should render with custom styles', () => {
    const props = {
      value,
      containerStyle: { backgroundColor: 'red' },
    }
    const { getByTestId } = render(<DatePickerLabel {...props} />)
    expect(getByTestId('label-container')).toHaveStyle(props.containerStyle)
  })

  it('should not render a date when is not defined', () => {
    const { getByText } = render(<DatePickerLabel />)
    expect(getByText('--/--/--')).toBeDefined()
  })
})
