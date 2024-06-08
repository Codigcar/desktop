import { render } from '@testing-utils/library'
import React from 'react'

import FontSizeSelector, { getFontSize } from './FontSizeSelector'
import { storage } from '../../utils/storage'

describe('font size selector', () => {
  afterEach(() => storage.delete('testBoolean'))

  it('snapshot', () => {
    const { toJSON } = render(<FontSizeSelector onSizeChange={jest.fn} />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('get default font size', () => {
    expect(storage.getNumber('config.fontSize')).toBeUndefined()
    expect(getFontSize()).toBe('m')
  })

  it('get storage font size', () => {
    storage.set('config.fontSize', 1)
    expect(getFontSize()).toBe('xs')
  })
})
