import { act, fireEvent, render } from '@testing-utils/library'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import React from 'react'
import { Keyboard, Platform } from 'react-native'

import { useMainNavigation } from '../../../context/navigation'
import SearchAdvanced from '../SearchAdvanced'

jest.mock('../../../context/navigation')
const mockUseMainNavigation = useMainNavigation as jest.Mock

function resolveCategories<T = unknown>(categories: T[]) {
  mockUseMainNavigation.mockReturnValue({ categories })
}

beforeAll(() => resolveCategories([]))

describe('Search advance', () => {
  it('advanced options should collapse when the button is touched', () => {
    const ref = React.createRef<FormHandles>()
    const { getByTestId, queryByTestId } = render(
      <Form ref={ref} onSubmit={jest.fn}>
        <SearchAdvanced ref={ref} />
      </Form>,
    )
    const button = getByTestId('collapse-button')

    fireEvent.press(button)
    expect(getByTestId('search-advanced-options')).toBeDefined()

    fireEvent.press(button)
    expect(queryByTestId('search-advanced-options')).toBeNull()
  })

  it('categories should not contains portada and ultimo', () => {
    const ref = React.createRef<FormHandles>()
    const categories = [
      { id: 'portada', name: 'portada', path: '/' },
      { id: 'ultimo', name: 'ultimo', path: '/' },
      { id: 'economia', name: 'economia', path: '/' },
      { id: 'politica', name: 'politica', path: '/' },
    ]
    resolveCategories(categories)
    const { getByTestId, queryByTestId } = render(
      <Form ref={ref} onSubmit={jest.fn}>
        <SearchAdvanced ref={ref} />
      </Form>,
    )

    fireEvent.press(getByTestId('collapse-button'))
    expect(queryByTestId('portada-option')).toBeNull()
    expect(queryByTestId('ultimo-option')).toBeNull()
  })

  it('should show date picker when custom date is selected', () => {
    const ref = React.createRef<FormHandles>()
    const { getByTestId, getAllByTestId, queryByTestId } = render(
      <Form ref={ref} onSubmit={jest.fn}>
        <SearchAdvanced ref={ref} />
      </Form>,
    )

    fireEvent.press(getByTestId('collapse-button'))

    const dateSelect = getByTestId('select-search-date')
    act(() => dateSelect.props.onValueChange('custom', 3))
    const [, doneButton] = getAllByTestId('done-button')
    if (Platform.OS === 'ios') fireEvent.press(doneButton)
    expect(getByTestId('search-advanced-dates')).toBeDefined()

    act(() => dateSelect.props.onValueChange('other', 2))
    if (Platform.OS === 'ios') fireEvent.press(doneButton)
    expect(queryByTestId('search-advanced-dates')).toBeNull()
  })

  it('should change date when it is inconsistent', () => {
    const ref = React.createRef<FormHandles>()
    const { getByTestId, getAllByTestId } = render(
      <Form ref={ref} onSubmit={jest.fn}>
        <SearchAdvanced ref={ref} />
      </Form>,
    )

    fireEvent.press(getByTestId('collapse-button'))
    const dateSelect = getByTestId('select-search-date')
    act(() => dateSelect.props.onValueChange('custom', 3))

    if (Platform.OS === 'ios') {
      const [, buttonSelectDate] = getAllByTestId('done-button')
      fireEvent.press(buttonSelectDate)
    }

    const [, , doneDateFrom, doneDateTo] = getAllByTestId('done-button')

    const january = new Date('2021-01-01')
    const february = new Date('2021-02-01')
    const april = new Date('2021-04-01')
    const june = new Date('2021-06-01')

    act(() => {
      getByTestId('date-input-from').props.onChange('', february)
      getByTestId('date-input-to').props.onChange('', april)
    })
    if (Platform.OS === 'ios') fireEvent.press(doneDateFrom)
    if (Platform.OS === 'ios') fireEvent.press(doneDateTo)
    expect(ref.current?.getFieldValue('dateFrom')).toBe(february)
    expect(ref.current?.getFieldValue('dateTo')).toBe(april)

    act(() => getByTestId('date-input-from').props.onChange('', june))
    if (Platform.OS === 'ios') fireEvent.press(doneDateFrom)
    expect(ref.current?.getFieldValue('dateFrom')).toBe(june)
    expect(ref.current?.getFieldValue('dateTo')).toBe(june)

    act(() => getByTestId('date-input-to').props.onChange('', january))
    if (Platform.OS === 'ios') fireEvent.press(doneDateTo)
    expect(ref.current?.getFieldValue('dateFrom')).toBe(january)
    expect(ref.current?.getFieldValue('dateTo')).toBe(january)
  })

  it('should call the keyboardDismiss event after pressing the search button', () => {
    const mockKeyboardDismiss = jest.spyOn(Keyboard, 'dismiss')

    const ref = React.createRef<FormHandles>()
    const { getByTestId } = render(
      <Form ref={ref} onSubmit={jest.fn}>
        <SearchAdvanced ref={ref} />
      </Form>,
    )

    const searchButton = getByTestId('submit-search-button')
    fireEvent.press(searchButton)
    expect(mockKeyboardDismiss).toHaveBeenCalled()
  })
})
