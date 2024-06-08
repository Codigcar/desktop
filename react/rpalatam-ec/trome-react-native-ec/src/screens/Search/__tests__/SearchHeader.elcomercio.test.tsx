import { fireEvent, render } from '@testing-utils/library'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import React from 'react'

import { SearchProvider } from '../../../context/search'
import SearchHeader from '../SearchHeader.elcomercio'

const SearchHeaderComponent: React.FC = () => {
  const ref = React.createRef<FormHandles>()
  const radioGroupRef = React.useRef<string | undefined>('data_recent')
  return (
    <SearchProvider>
      <Form ref={ref} onSubmit={jest.fn}>
        <SearchHeader ref={ref} radioRef={radioGroupRef} />
      </Form>
    </SearchProvider>
  )
}

describe('Search.elcomercio', () => {
  it('the search button must be enabled when the input contains at least one character', () => {
    const { getByA11yLabel, getByTestId } = render(<SearchHeaderComponent />)

    fireEvent.changeText(getByA11yLabel('buscar'), '')
    expect(getByTestId('btn-buscar')).toBeDisabled()

    fireEvent.changeText(getByA11yLabel('buscar'), 'ceviche')
    expect(getByTestId('btn-buscar')).not.toBeDisabled()
  })

  it('should be able to clear input when x is pressed', () => {
    const { getByA11yLabel, getByTestId, queryByTestId } = render(
      <SearchHeaderComponent />,
    )

    expect(queryByTestId('icon-close')).toBeNull()

    fireEvent.changeText(getByA11yLabel('buscar'), 'ceviche')

    fireEvent.press(getByTestId('icon-close'))

    expect(queryByTestId('icon-close')).toBeNull()
  })
})
