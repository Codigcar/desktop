import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { DragEndParams } from 'react-native-draggable-flatlist'

import { useMainNavigation } from '../../../context/navigation'
import CustomContentScreen from '../CustomContent.gestion'
import type { NavCategory } from '../../../utils/categories'

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    goBack: jest.fn(),
    navigate: jest.fn(),
  })),
  useRoute: jest.fn(() => ({
    name: '',
  })),
}))

const mockData: NavCategory[] = [
  {
    key: 'portada',
    label: 'Portada',
    path: '/category/portada',
    active: true,
    required: true,
    type: 'category',
  },
  {
    key: 'ultimo',
    label: 'Lo Último',
    path: '/category/ultimo',
    active: true,
    required: false,
    type: 'category',
  },
  {
    key: 'dt',
    label: 'DT',
    path: '/category/dt',
    active: false,
    required: false,
    type: 'category',
  },
]

jest.mock('../../../context/navigation')
const mockUseMainNavigation = useMainNavigation as jest.Mock

beforeAll(() => {
  mockUseMainNavigation.mockReturnValue({
    categories: mockData,
    setListOfCategory: jest.fn(() => Promise.resolve()),
  })
})

describe('CustomContent Screen', () => {
  it('should render categories correctly', () => {
    const { getByText } = render(<CustomContentScreen />)
    mockData.forEach((category) => {
      expect(getByText(category.label)).toBeDefined()
    })
  })

  it('should render switch only for not-required categories', () => {
    const { getByTestId, queryByTestId } = render(<CustomContentScreen />)
    const notRequiredCategories = mockData.filter(({ required }) => !required)
    notRequiredCategories.forEach((category) => {
      const iconSwitch = getByTestId(`icon-switch-${category.key}`)
      expect(iconSwitch).toBeDefined()
    })

    const requiredCategories = mockData.filter(({ required }) => !!required)
    requiredCategories.forEach((category) => {
      const iconSwitch = queryByTestId(`icon-switch-${category.key}`)
      expect(iconSwitch).toBeNull()
    })
  })

  it('should render iconDrag only for not-required and active categories ', () => {
    const { getByTestId, queryByTestId } = render(<CustomContentScreen />)

    const notRequiredCategories = mockData.filter(
      ({ required, active }) => !required && active,
    )
    notRequiredCategories.forEach((category) => {
      const iconDrag = getByTestId(`icon-drag-${category.key}`)
      expect(iconDrag).toBeDefined()
    })

    const requiredCategories = mockData.filter(
      ({ required, active }) => required && !active,
    )
    requiredCategories.forEach((category) => {
      const iconDrag = queryByTestId(`icon-drag-${category.key}`)
      expect(iconDrag).toBeNull()
    })
  })

  it('should update categories when press toggle button of not-required categories', async () => {
    const setListOfCategory = jest.fn(() => Promise.resolve())
    mockUseMainNavigation.mockReturnValue({
      categories: mockData,
      setListOfCategory,
    })

    const { getByTestId } = render(<CustomContentScreen />)
    await act(async () => undefined)

    const category = mockData.find(({ required }) => !required)
    if (!category) {
      expect(category).not.toBeUndefined()
      return
    }
    fireEvent(
      getByTestId(`icon-switch-${category.key}`),
      'onValueChange',
      false,
    )
    await act(async () => undefined)
    expect(setListOfCategory).toBeCalledTimes(2)
    expect(setListOfCategory).toHaveBeenCalledWith(
      expect.arrayContaining([{ ...category, active: !category.active }]),
    )
  })

  it('should not update categories when dragging category over Portrait or to the same position', async () => {
    const setListOfCategory = jest.fn(() => Promise.resolve())
    mockUseMainNavigation.mockReturnValue({
      categories: mockData,
      setListOfCategory,
    })
    const { getByTestId } = render(<CustomContentScreen />)
    await act(async () => undefined)
    const flatlist = getByTestId('draggable-list')

    const [portrait, lastnews, dt] = mockData
    const data = [lastnews, portrait, dt]
    const params: DragEndParams<NavCategory> = { data, from: 1, to: 0 }
    act(() => flatlist.props.onDragEnd(params))
    await act(async () => undefined)
    expect(setListOfCategory).toBeCalledTimes(1)

    const paramsTwo: DragEndParams<NavCategory> = {
      data: mockData,
      from: 1,
      to: 1,
    }
    act(() => flatlist.props.onDragEnd(paramsTwo))
    await act(async () => undefined)
    expect(setListOfCategory).toBeCalledTimes(1)
  })

  it('should update categories when the drag ends', async () => {
    const setListOfCategory = jest.fn(() => Promise.resolve())
    mockUseMainNavigation.mockReturnValue({
      categories: mockData,
      setListOfCategory,
    })
    const { getByTestId } = render(<CustomContentScreen />)
    await act(async () => undefined)

    const flatlist = getByTestId('draggable-list')
    const [portrait, lastnews, dt] = mockData
    const data = [portrait, dt, lastnews]
    const params: DragEndParams<NavCategory> = { data, from: 2, to: 1 }
    act(() => flatlist.props.onDragEnd(params))
    await act(async () => undefined)
    expect(setListOfCategory).toBeCalledTimes(2)
  })

  it('should reset init selected categories when press "restablecer" button', async () => {
    const setListOfCategory = jest.fn(() => Promise.resolve())
    const economia = {
      active: true,
      key: 'economia',
      label: 'Economía',
      type: 'category',
      path: '/economia',
    }
    const tendencias = {
      active: true,
      key: 'tendencias',
      label: 'Tendencias',
      type: 'category',
      path: '/tendencias',
    }

    mockUseMainNavigation.mockReturnValue({
      categories: mockData,
      setListOfCategory,
      mainNavigation: [economia, tendencias],
    })

    const { getByText } = render(<CustomContentScreen />)
    await act(async () => undefined)

    fireEvent.press(getByText('Restablecer'))
    await act(async () => undefined)
    expect(setListOfCategory).toHaveBeenCalledWith(
      expect.arrayContaining([economia, tendencias]),
    )
  })
})
