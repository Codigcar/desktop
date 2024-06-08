import { act, render } from '@testing-utils/library'
import React from 'react'

import Tag from './tag'

describe('Tag', () => {
  it('should match with her snapshot', async () => {
    const { toJSON } = render(<Tag />)

    await act(async () => {
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
