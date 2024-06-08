import { render } from '@testing-utils/library'
import React from 'react'
import { Animated, Text } from 'react-native'

import Radio from '../Radio'

describe('Radio', () => {
  it('should be checked', () => {
    const { getByA11yRole } = render(<Radio value="test-radio" checked />)
    expect(getByA11yRole('radio')).toHaveProp('accessibilityState', {
      checked: true,
    })
  })

  it('should not be checked', () => {
    const { getByA11yRole, rerender } = render(<Radio value="test-radio" />)
    const radio = getByA11yRole('radio')
    expect(radio).toHaveProp('accessibilityState', { checked: undefined })
    rerender(<Radio value="test-radio" checked={false} />)
    expect(radio).toHaveProp('accessibilityState', { checked: false })
  })

  it('should render children', () => {
    const { getByText } = render(
      <Radio value="test-radio" children={<Text children="Option" />} />,
    )
    expect(getByText('Option')).toBeDefined()
  })

  it('should be disabled', () => {
    const { getByA11yRole } = render(<Radio value="test-radio" disabled />)
    const { props } = getByA11yRole('radio')
    expect(props).toHaveProperty('accessibilityState.disabled', true)
  })

  it('should change background color of thumb', () => {
    const { getByA11yRole } = render(<Radio value="test-radio" color="red" />)
    // eslint-disable-next-line testing-library/await-async-query
    const thumb = getByA11yRole('radio').findByType(Animated.View)
    expect(thumb).toHaveStyle({ backgroundColor: 'red' })
  })
})
