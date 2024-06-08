import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { DragEndParams } from 'react-native-draggable-flatlist'

import { useMainNavigation } from '../../../context/navigation'
import CustomContentScreen from '../CustomContent'
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

  it('should render active/inactive color style', () => {
    const { getByTestId } = render(<CustomContentScreen />)
    const notRequiredData = mockData.filter(({ required }) => !required)
    const activeCategory = notRequiredData.find(({ active }) => active)
    const inactiveCategory = notRequiredData.find(({ active }) => !active)

    const iconActive = getByTestId(`icon-check-${activeCategory?.key}`)
    const iconInactive = getByTestId(`icon-check-${inactiveCategory?.key}`)
    expect(iconActive.props).not.toEqual(iconInactive.props)
  })

  it('should render icons only for not-required categories', () => {
    const { getByTestId, queryByTestId } = render(<CustomContentScreen />)
    const requiredCategories = mockData.filter(({ required }) => !!required)
    const notRequiredCategories = mockData.filter(({ required }) => !required)

    requiredCategories.forEach((category) => {
      const iconCheck = queryByTestId(`icon-check-${category.key}`)
      const iconReorder = queryByTestId(`icon-reorder-${category.key}`)
      expect(iconCheck).toBeNull()
      expect(iconReorder).toBeNull()
    })

    notRequiredCategories.forEach((category) => {
      const iconCheck = getByTestId(`icon-check-${category.key}`)
      const iconReorder = getByTestId(`icon-reorder-${category.key}`)
      expect(iconCheck).toBeDefined()
      expect(iconReorder).toBeDefined()
    })
  })

  it('should update categories when press toggle button of not-required categories', async () => {
    const setListOfCategory = jest.fn(() => Promise.resolve())
    mockUseMainNavigation.mockReturnValue({
      categories: mockData,
      setListOfCategory,
    })
    const { getByText } = render(<CustomContentScreen />)
    await act(async () => undefined)

    const requiredCategory = mockData.find(({ required }) => required)
    if (!requiredCategory) {
      expect(requiredCategory).not.toBeUndefined()
      return
    }
    fireEvent.press(getByText(requiredCategory.label))
    await act(async () => undefined)
    expect(setListOfCategory).toBeCalledTimes(1)

    const category = mockData.find(({ required }) => !required)
    if (!category) {
      expect(category).not.toBeUndefined()
      return
    }

    fireEvent.press(getByText(category.label))
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
})
