import { fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { Keyboard } from 'react-native'

import { useMainNavigation } from '../../../../context/navigation'
import { useSearchContext } from '../../../../context/search'
import CommonTemplate from '../../common/CommonTemplate'

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

const mockedNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    addListener: jest.fn(),
    navigate: mockedNavigate,
  })),
  useRoute: jest.fn(() => ({ name: '', params: {} })),
}))

jest.mock('../../../../context/search')
const mockSearchContext = useSearchContext as jest.Mock

jest.mock('../../../../context/navigation')
const mockUseMainNavigation = useMainNavigation as jest.Mock

jest.mock('../../../../context/favorites', () => ({
  useFavorites: jest
    .fn()
    .mockReturnValue({ favorites: [], toggleFavorite: jest.fn() }),
}))

beforeEach(() => {
  mockSearchContext.mockImplementation(() => searchProvider())
})

beforeAll(() => {
  mockUseMainNavigation.mockReturnValue({ categories: [], mainNavigation: [] })
})

const arrayOfResults = Array.from({ length: 5 }).map((_, i) => ({
  id: `${i}`,
  url: `/url${i}`,
  last_updated_date: 'date',
  headline: `title_${i}`,
}))

describe('CommonTemplate', () => {
  it('should hide keyboard', () => {
    mockSearchContext.mockImplementation(() =>
      searchProvider({ status: 'idle' }),
    )
    const mockKeyboardDismiss = jest.spyOn(Keyboard, 'dismiss')
    const { getByTestId } = render(<CommonTemplate />)
    fireEvent.press(getByTestId('status-idle'))

    expect(mockKeyboardDismiss).toBeCalled()
  })

  it('should show card placeholder', () => {
    mockSearchContext.mockImplementation(() =>
      searchProvider({ status: 'started' }),
    )
    const { getByTestId } = render(<CommonTemplate />)

    expect(getByTestId('status-started')).toBeDefined()
  })

  it('should navigate on load result-cards', async () => {
    mockSearchContext.mockImplementation(() =>
      searchProvider({ status: 'done', results: arrayOfResults }),
    )
    const { getByText } = render(<CommonTemplate />)
    const notice = getByText('title_1')

    fireEvent.press(notice)
    expect(mockedNavigate).toHaveBeenCalledWith('Main', {
      screen: 'Home',
      params: { screen: 'Feed' },
    })
  })

  it('should show an error', async () => {
    mockSearchContext.mockImplementation(() =>
      searchProvider({ status: 'done', hasError: false, results: [] }),
    )
    const { getByText } = render(<CommonTemplate />)
    const messageError = getByText('No se encontraron resultados')

    expect(messageError).toBeDefined()
  })
})
