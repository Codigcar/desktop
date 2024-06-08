import AsyncStorage from '@react-native-async-storage/async-storage'
import MockAxios from 'jest-mock-axios'

import {
  NavCategory,
  composeCategoriesWithLocal,
  loadLocalCategories,
} from '../categories'
import { STORE_CATEGORIES } from '../constants'

const mockStorage: NavCategory[] = [
  {
    key: 'current-category',
    label: 'current',
    path: '/category/current',
    type: 'category',
    required: false,
    active: false,
  },
  {
    key: 'deprecated-category',
    label: 'deprecated',
    path: '/category/deprecated',
    type: 'category',
    required: false,
    active: true,
  },
]

afterEach(async () => {
  MockAxios.reset()
  await AsyncStorage.clear()
})

describe('App Categories', () => {
  it('should load local categories from storage', async () => {
    await AsyncStorage.setItem(STORE_CATEGORIES, JSON.stringify(mockStorage))
    const localCategories = await loadLocalCategories()
    expect(localCategories).toEqual(mockStorage)
  })

  it('should integrate the categories fetched with local preferences', () => {
    const categories: NavCategory[] = [
      {
        key: 'current-category',
        label: 'One',
        path: '/category/current',
        type: 'category',
      },
      {
        key: 'new-category',
        label: 'Two',
        path: '/category/new-category',
        type: 'category',
      },
    ]
    const withLocalCategories = composeCategoriesWithLocal(
      categories,
      mockStorage,
    )
    expect(withLocalCategories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'current-category', active: false }),
        expect.objectContaining({ key: 'new-category' }),
      ]),
    )
    expect(withLocalCategories).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'deprecated-category' }),
      ]),
    )
  })
})
