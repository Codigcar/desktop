import AsyncStorage from '@react-native-async-storage/async-storage'
import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { NavCategory } from '../../utils/categories'
import { getMainNavigation } from '../../utils/navigation'
import { HomeWebviewRef } from '../../utils/refs'
import { NavigationProvider, useMainNavigation } from '../navigation'

const mockLogEvent = jest.fn()
jest.mock('@react-native-firebase/analytics', () =>
  jest.fn(() => ({ logEvent: mockLogEvent })),
)

jest.mock('../../utils/navigation')
const mockMainNavigation = getMainNavigation as jest.Mock

const wrapper: React.FC = ({ children }) => (
  <NavigationProvider>{children}</NavigationProvider>
)

const mockLocalCategories: NavCategory[] = Array.from({ length: 5 }).map(
  (_, i) => ({
    key: `${i}`,
    label: `label ${i}`,
    type: 'category',
    path: `/category/${i}`,
    active: i % 2 === 0,
  }),
)

beforeEach(async () => {
  await AsyncStorage.clear()
  mockMainNavigation.mockImplementation(() => Promise.resolve([]))
})

describe('navigation context', () => {
  it('should set mainNavigation and categories by type', async () => {
    let key, label, path
    const portrait = { key: 'portada', label: '', type: 'category', path }
    const category = { key, label, type: 'category', path }
    const tag = { key, label, type: 'internal-page', path }
    const external = { key, label, type: 'external-page', path }
    mockMainNavigation.mockImplementationOnce(() =>
      Promise.resolve([portrait, category, tag, external]),
    )

    const { result } = renderHook(() => useMainNavigation(), { wrapper })
    await act(async () => undefined)

    const { categories, mainNavigation } = result.current
    expect(mainNavigation).toEqual(
      expect.arrayContaining([portrait, category, tag, external]),
    )
    expect(categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ ...portrait, active: true, required: true }),
        expect.objectContaining({ ...category, required: false }),
      ]),
    )
  })

  it('should update correctly the categories when call setCategories', async () => {
    const { result } = renderHook(() => useMainNavigation(), { wrapper })
    expect(result.current.categories.length).toBe(0)
    await act(async () => undefined)
    await act(async () => {
      await result.current.setListOfCategory(mockLocalCategories)
    })
    expect(result.current.categories.length).toBe(mockLocalCategories.length)
  })

  it('should send event to analytics when active value of category changes', async () => {
    const category: NavCategory = {
      key: 'key',
      label: `label`,
      path: `/path`,
      type: 'category',
    }
    const { result } = renderHook(() => useMainNavigation(), { wrapper })

    await act(async () => undefined)
    await act(() => result.current.setListOfCategory([category]))
    expect(mockLogEvent).not.toBeCalled()

    const params = { id: category.key, name: category.label, type: 'section' }

    const active = { ...category, active: true }
    await act(() => result.current.setListOfCategory([active]))
    expect(mockLogEvent).toHaveBeenLastCalledWith('add_to_home', params)

    const inactive = { ...category, active: false }
    await act(() => result.current.setListOfCategory([inactive]))
    expect(mockLogEvent).toHaveBeenLastCalledWith('remove_from_home', params)
  })

  it('should send categories to webview when new-state is setted', async () => {
    const { result } = renderHook(() => useMainNavigation(), { wrapper })
    const injectJavaScript = jest.fn()
    Object.defineProperty(HomeWebviewRef, 'current', {
      value: {
        injectJavaScript,
      },
    })
    const newStateOfCategories = mockLocalCategories
    newStateOfCategories[0].active = !newStateOfCategories[0].active

    await act(async () => {
      await result.current.setListOfCategory(newStateOfCategories)
    })
    expect(injectJavaScript).toHaveBeenCalledTimes(1)
  })
})
