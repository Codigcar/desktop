import { act, render } from '@testing-utils/library'
import React from 'react'

import Placeholder from '../Placeholder'

describe('Placeholder component', () => {
  test('should match with her snapshot', async () => {
    const { toJSON } = render(<Placeholder />)
    await act(async () => {
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
