import { render } from '@testing-library/react-native'
import React from 'react'

import SvgIcon from '.'

describe('SvgIcon component', () => {
  const testColor = '#454545'

  it('render correctly', () => {
    const { toJSON } = render(<SvgIcon type="plusg" color={testColor} />)
    expect(toJSON()?.props.fill).toBe(testColor)
  })
})
