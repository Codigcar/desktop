import { fireEvent, render } from '@testing-utils/library'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import React from 'react'

import { useSearchContext } from '../../../context/search'
import * as flags from '../../../utils/flags'
import SearchHeader from '../SearchHeader'

const searchProvider = (props = {}) => ({
  clearFilters: jest.fn(),
  filters: new Map([['term', 'text']]),
  orderInverse: false,
  resetSearch: jest.fn(),
  results: [{}],
  status: 'done',
  toggleOrder: jest.fn(),
  termListHistory: [],
  ...props,
})

const Component: React.FC = () => {
  const ref = React.createRef<FormHandles>()
  return (
    <Form ref={ref} onSubmit={jest.fn}>
      <SearchHeader ref={ref} />
    </Form>
  )
}

jest.mock('../../../context/search')
const mockSearchContext = useSearchContext as jest.Mock

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    goBack: jest.fn(),
    addListener: jest.fn(),
  })),
}))

beforeEach(() => {
  mockSearchContext.mockImplementation(() => searchProvider())
})

describe('Search Header', () => {
  it('should clean input when X button is touched', () => {
    const ref = React.createRef<FormHandles>()
    const { getByTestId, queryByTestId } = render(
      <Form ref={ref} onSubmit={jest.fn}>
        <SearchHeader ref={ref} />
      </Form>,
    )

    fireEvent(getByTestId('search-input'), 'onFocus')
    fireEvent.press(getByTestId('button-clean'))
    expect(ref.current?.getFieldValue('term')).toBe('')
    expect(queryByTestId('button-clean')).toBeNull()
  })

  it('should show X button only when the input contains any character', () => {
    const { getByTestId, queryByTestId } = render(<Component />)

    fireEvent(getByTestId('search-input'), 'onFocus')
    fireEvent.changeText(getByTestId('search-input'), '')
    expect(queryByTestId('button-clean')).toBeNull()

    fireEvent.changeText(getByTestId('search-input'), 'a')
    expect(getByTestId('search-input')).toBeDefined()
  })

  it('should show X button only when the input is in focus', () => {
    const { getByTestId, queryByTestId } = render(<Component />)

    fireEvent(getByTestId('search-input'), 'onFocus')
    expect(getByTestId('button-clean')).toBeDefined()

    fireEvent(getByTestId('search-input'), 'onBlur')
    expect(queryByTestId('button-clean')).toBeNull()
  })

  it('should show filter options and reverse order only when results exist', () => {
    mockSearchContext
      .mockImplementationOnce(() => searchProvider({ results: [] }))
      .mockImplementationOnce(() => searchProvider({ results: [{}] }))

    const { getByTestId, queryByTestId, rerender } = render(<Component />)
    expect(queryByTestId('options')).toBeNull()

    rerender(<Component />)
    expect(getByTestId('options')).toBeDefined()
  })

  it('should change styles when options are active', () => {
    mockSearchContext
      .mockImplementation(() => searchProvider())
      .mockImplementationOnce(() => searchProvider({ orderInverse: true }))
      .mockImplementation(() =>
        searchProvider({ filters: new Map([['dateFrom', 'date']]) }),
      )
      .mockImplementationOnce(() =>
        searchProvider({ filters: new Map([['section', 'section']]) }),
      )

    const { getByTestId, rerender } = render(<Component />)

    const inactiveFilterStyle = getByTestId('icon-filter').props.color
    const inactiveOrderStyle = getByTestId('icon-order').props.color

    rerender(<Component />)
    const activeOrderStyle = getByTestId('icon-order').props.color
    expect(activeOrderStyle).not.toBe(inactiveOrderStyle)

    rerender(<Component />)
    const activeFilterByDateStyle = getByTestId('icon-filter').props.color
    expect(activeFilterByDateStyle).not.toBe(inactiveFilterStyle)

    rerender(<Component />)
    const activeFilterBySectionStyle = getByTestId('icon-filter').props.color
    expect(activeFilterBySectionStyle).not.toBe(inactiveFilterStyle)
  })

  it('should not show bg-seach-history and Últimas búsquedas if flags ENABLE_SEARCH_HISTORY IS false', () => {
    Object.defineProperty(flags, 'ENABLE_SEARCH_HISTORY', { value: false })
    const { queryByText, queryByTestId } = render(<Component />)

    expect(queryByTestId('bg-search-history')).toBeNull()
    expect(queryByText('Últimas búsquedas')).toBeNull()
  })

  it('should not show Últimas búsquedas if termList is blank', () => {
    Object.defineProperty(flags, 'ENABLE_SEARCH_HISTORY', { value: true })
    const { queryByText } = render(<Component />)

    expect(queryByText('Últimas búsquedas')).toBeNull()
  })

  it('should do the search by tapping on a term', () => {
    Object.defineProperty(flags, 'ENABLE_SEARCH_HISTORY', { value: true })
    const value = 'term-1'
    mockSearchContext.mockImplementation(() =>
      searchProvider({
        termListHistory: [value],
        filters: new Map([]),
      }),
    )
    const ref = React.createRef<FormHandles>()
    const { getByText, getByTestId, queryByText } = render(
      <Form ref={ref} onSubmit={jest.fn}>
        <SearchHeader ref={ref} />
      </Form>,
    )

    fireEvent(getByTestId('search-input'), 'onFocus')

    fireEvent.press(getByText(value))
    expect(ref.current?.getData()).toEqual({ term: value })

    expect(queryByText('Últimas búsquedas')).toBeNull()
  })
})
