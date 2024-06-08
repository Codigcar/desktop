import { render } from '@testing-utils/library'
import React from 'react'

import Skeleton from '../skeleton'

describe('skeleton components', () => {
  it('render correctly', () => {
    const { getByTestId } = render(
      <Skeleton.AnimatedGroup testID="skeleton-group">
        <Skeleton.Media testID="media-skeleton-testID" />
        <Skeleton.Text testID="text-skeleton-testID" />
      </Skeleton.AnimatedGroup>,
    )
    expect(getByTestId('media-skeleton-testID')).toBeDefined()
    expect(getByTestId('text-skeleton-testID')).toBeDefined()
    expect(getByTestId('skeleton-group')).toBeDefined()
  })
})
