import { render } from '@testing-utils/library'
import React from 'react'

import Progress from './index'

describe('Progress', () => {
  describe('Bar', () => {
    it('default props', () => {
      const { getByTestId } = render(<Progress.Bar />)
      expect(getByTestId('progress-bar')).toHaveStyle({ height: 6, width: 150 })
    })

    it('custom height', () => {
      const height = 20
      const { getByTestId } = render(<Progress.Bar height={height} />)
      expect(getByTestId('progress-bar')).toHaveStyle({ height })
    })

    it('custom width', () => {
      const width = 200
      const { getByTestId } = render(<Progress.Bar width={width} />)
      expect(getByTestId('progress-bar')).toHaveStyle({ width })
    })
  })
})
