import { useNavigation, useRoute } from '@react-navigation/native'
import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useSearchContext } from '../../../context/search'
import Search from '../Search.elcomercio'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
mockUseNavigation.mockReturnValue({ setParams: jest.fn() })
const mockUseRoute = useRoute as jest.Mock
mockUseRoute.mockReturnValue({})

jest.mock('../../../context/auth', () => ({
  useAuth: jest.fn(() => ({ isSubscribed: false })),
}))

jest.mock('../../../context/favorites', () => ({
  useFavorites: jest.fn(() => ({ favorites: [] })),
}))

jest.mock('../../../context/search')
const mockUseSearchContext = useSearchContext as jest.Mock

jest.mock('../../../hooks/useOpenStory')

jest.useFakeTimers()

const searchContext = {
  filters: new Map(),
  restoreSearch: jest.fn(),
  results: [],
  status: 'idle',
}

beforeEach(() => {
  mockUseSearchContext.mockReturnValue(searchContext)
})

describe('Search.elcomercio', () => {
  it('should set preserve param when component was mounted', () => {
    const setParams = jest.fn()
    mockUseNavigation.mockReturnValue({ setParams })
    render(<Search />)
    expect(setParams).toBeCalledWith({ preserve: true })
  })

  it('should restore results when status is done', () => {
    const restoreSearch = jest.fn()
    const context = { ...searchContext, restoreSearch, status: 'done' }
    mockUseSearchContext.mockReturnValue(context)
    render(<Search />)
    expect(restoreSearch).toBeCalledTimes(1)
  })

  it('should not restore results when status is done and preserve is true', () => {
    mockUseRoute.mockReturnValueOnce({ params: { preserve: true } })
    const restoreSearch = jest.fn()
    const context = { ...searchContext, restoreSearch, status: 'done' }
    mockUseSearchContext.mockReturnValueOnce(context)
    render(<Search />)
    expect(restoreSearch).not.toBeCalled()
  })

  it('should show the error pop up', () => {
    const context = { ...searchContext, hasError: true }
    mockUseSearchContext.mockReturnValueOnce(context)
    const { getByTestId, queryByTestId } = render(<Search />)
    expect(queryByTestId('backdrop-touchable')).toBeNull()
    act(() => jest.runAllTimers())
    expect(getByTestId('backdrop-touchable')).toBeDefined()
  })

  it('should render the search results when response is success', () => {
    const story = { id: 'id', headline: 'Search card' }
    const context = { ...searchContext, results: [story], status: 'done' }
    mockUseSearchContext.mockReturnValue(context)
    const { getByText } = render(<Search />)
    expect(getByText(story.headline)).toBeDefined()
  })

  it('should render message for empty results', () => {
    const context = { ...searchContext, status: 'done' }
    mockUseSearchContext.mockReturnValue(context)
    const { getByTestId, getByText, getByA11yLabel } = render(<Search />)

    fireEvent.changeText(getByA11yLabel('buscar'), 'ceviche')
    fireEvent.press(getByTestId('btn-buscar'))
    expect(
      getByText(
        'Lo sentimos, pero no hemos encontrado ningún resultado para “ceviche”',
      ),
    ).toBeDefined()
  })
})
