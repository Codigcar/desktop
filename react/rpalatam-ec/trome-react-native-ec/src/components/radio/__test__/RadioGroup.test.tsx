import 'react-native-reanimated/lib/reanimated2/jestUtils'
import { fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { Animated } from 'react-native'

import Radio from '../index'

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
})
