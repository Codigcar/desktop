import { fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { Platform } from 'react-native'
import useSearchHistory from '../../../hooks/useSearchHistory'
import SearchHistory from '../SearchHistory'

jest.mock('../../../hooks/useSearchHistory')
const mockUseSearchHistory = useSearchHistory as jest.Mock
mockUseSearchHistory.mockReturnValue({
  removeTermFromHistory: jest.fn(),
})

describe('Search History', () => {
  beforeEach(() => {
    Platform.OS = 'android'
  })

  it('should not show Últimas búsquedas if termList is blank', () => {
    const { queryByText } = render(
      <SearchHistory termList={[]} handleShippingOfSelectedTerm={jest.fn()} />,
    )

    expect(queryByText('Últimas búsquedas')).toBeNull()
  })

  it('you must delete a term by tapping on it', () => {
    const mockRemoveTerm = jest.fn()
    mockUseSearchHistory.mockReturnValueOnce({
      removeTermFromHistory: mockRemoveTerm,
    })
    const { getByA11yLabel } = render(
      <SearchHistory
        termList={['test-1']}
        handleShippingOfSelectedTerm={jest.fn()}
      />,
    )

    fireEvent.press(getByA11yLabel('remove'))
    expect(mockRemoveTerm).toBeCalled()
  })

  it('you must save a term by tapping on it', () => {
    const mockSaveTerm = jest.fn()
    const { getByText } = render(
      <SearchHistory
        termList={['test-1']}
        handleShippingOfSelectedTerm={mockSaveTerm}
      />,
    )

    fireEvent.press(getByText('test-1'))
    expect(mockSaveTerm).toBeCalled()
  })
})
