import 'react-native-reanimated/lib/reanimated2/jestUtils'
import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { Animated } from 'react-native'

import Radio from '../index'
import { RadioGroupRef } from '../types'

const Colors: React.FC = () => {
  return (
    <React.Fragment>
      <Radio value="red" />
      <Radio value="green" />
      <Radio value="blue" />
    </React.Fragment>
  )
}

jest.useFakeTimers()

describe('RadioGroup', () => {
  it('should select default value', () => {
    const { getByA11yValue } = render(
      <Radio.Group defaultValue="green" children={<Colors />} />,
    )
    expect(getByA11yValue({ text: 'green' })).toHaveProp('accessibilityState', {
      checked: true,
    })
  })

  it('should select radio', () => {
    const { getByA11yValue } = render(<Radio.Group children={<Colors />} />)
    const blue = getByA11yValue({ text: 'blue' })
    fireEvent.press(blue)
    expect(blue).toHaveProp('accessibilityState', { checked: true })
  })

  it('should animate radio thumb scale', () => {
    const { getByA11yValue } = render(<Radio.Group children={<Colors />} />)
    const radio = getByA11yValue({ text: 'red' })
    // eslint-disable-next-line testing-library/await-async-query
    const thumb = radio.findByType(Animated.View)
    expect(thumb.props.style[2].transform[0].scale._value).toBe(0)
    fireEvent.press(radio)
    jest.runAllTimers()
    expect(thumb.props.style[2].transform[0].scale._value).toBe(1)
  })

  it('should changed state with reset method', async () => {
    const ref = React.createRef<RadioGroupRef>()
    const { getByA11yValue } = render(
      <Radio.Group children={<Colors />} ref={ref} defaultValue="red" />,
    )

    const red = getByA11yValue({ text: 'red' })
    fireEvent.press(getByA11yValue({ text: 'blue' }))
    expect(red).toHaveProp('accessibilityState', { checked: false })
    act(() => ref.current?.reset())
    expect(red).toHaveProp('accessibilityState', { checked: true })
  })

  it('should set state with setValue method', async () => {
    const ref = React.createRef<RadioGroupRef>()
    const { getByA11yValue } = render(
      <Radio.Group children={<Colors />} ref={ref} />,
    )

    const red = getByA11yValue({ text: 'red' })
    act(() => ref.current?.setValue('red'))
    expect(red).toHaveProp('accessibilityState', { checked: true })
  })

  it('should return radio value selected', async () => {
    const ref = React.createRef<RadioGroupRef>()
    const { getByA11yValue } = render(
      <Radio.Group children={<Colors />} ref={ref} />,
    )

    fireEvent.press(getByA11yValue({ text: 'blue' }))
    expect(ref.current?.value).toBe('blue')
  })
})
