import { fireEvent, render } from '@testing-utils/library'
import React from 'react'

import Image from './image'

const mockUri = 'https://via.placeholder.com/150'

describe('image component', () => {
  it('render correctly', () => {
    const { getByTestId } = render(
      <Image source={{ uri: mockUri }} testID="image-component" />,
    )
    expect(getByTestId('image-component')).toBeDefined()
  })

  it('render uri accord props', () => {
    const { getByTestId } = render(
      <Image source={{ uri: mockUri }} testID="image-component" />,
    )
    expect(getByTestId('image-component').props.source.uri).toBe(mockUri)
  })

  it('onload image', () => {
    const mockOnLoad = jest.fn()
    const { getByTestId, queryByTestId } = render(
      <Image
        source={{ uri: mockUri }}
        testID="image-component"
        onLoad={mockOnLoad}
      />,
    )
    expect(getByTestId('image-placeholder')).toBeDefined()
    fireEvent(getByTestId('image-component'), 'load')
    expect(mockOnLoad).toHaveBeenCalled()
    expect(queryByTestId('image-placeholder')).toBeNull()
  })
})
