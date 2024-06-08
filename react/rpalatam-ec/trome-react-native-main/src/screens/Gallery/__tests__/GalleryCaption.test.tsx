import { fireEvent, render } from '@testing-utils/library'
import React from 'react'

import GalleryCaption from '../GalleryCaption'

describe('GalleryCaption component', () => {
  it('Render small text', () => {
    const { queryByText } = render(<GalleryCaption maxLength={10} />)
    expect(queryByText('Leer más...')).toBeNull()
  })

  it('Render large text', () => {
    const { getByText, queryByText } = render(
      <GalleryCaption
        maxLength={10}
        content="Text with more than 10 characters"
      />,
    )

    const readMoreButton = getByText('Leer más...')
    expect(readMoreButton).toBeTruthy()

    fireEvent.press(readMoreButton)
    expect(queryByText('Leer más...')).toBeNull()

    fireEvent.press(getByText('Text with more than 10 characters'))
    expect(getByText('Leer más...')).toBeTruthy()
  })
})
