import MockAxios from 'jest-mock-axios'

import { getRemoteValue } from '../firebase'
import { getMainNavigation } from '../navigation'

jest.mock('../firebase')
const mockRemoteValue = getRemoteValue as jest.Mock

const filterList = {
  blacklist: { block: 'block' },
  whitelist: { allow: '/allow' },
}
const defaultList = [
  { key: 'main', label: 'main', path: '/category/main', type: 'category' },
]

beforeEach(() => {
  mockRemoteValue.mockImplementation((key: string) => ({
    asString: jest.fn(() => {
      if (key === 'category_filter') return JSON.stringify(filterList)
      if (key === 'default_categories') return JSON.stringify(defaultList)
      return null
    }),
  }))
})

describe('navigation utils', () => {
  it('should navigation contain default categories', async () => {
    const promise = getMainNavigation()
    MockAxios.mockResponse({ data: { children: [] } })
    const categories = await promise
    expect(categories).toEqual(
      expect.arrayContaining([expect.objectContaining({ key: 'main' })]),
    )
  })

  it('should return format tag item', async () => {
    const url = 'https://elcomercio.pe/noticias/coronavirus/'
    const response = [{ _id: 'id', name: 'coronavirus', url }]

    const promise = getMainNavigation()
    MockAxios.mockResponse({ data: { children: response } })

    const categories = await promise
    const item = { path: '/tags/coronavirus', type: 'internal-page' }
    expect(categories).toEqual(
      expect.arrayContaining([expect.objectContaining(item)]),
    )
  })

  it('should return format external item', async () => {
    const url = 'https://elcomercio.pe/saltar-intro/'
    const response = [{ _id: 'id', name: 'intro', url }]

    const promise = getMainNavigation()
    MockAxios.mockResponse({ data: { children: response } })

    const categories = await promise
    const item = { path: url, type: 'external-page' }
    expect(categories).toEqual(
      expect.arrayContaining([expect.objectContaining(item)]),
    )
  })

  it('should return format category item', async () => {
    const response = [{ _id: 'id', name: 'opinion', url: '/opinion/' }]

    const promise = getMainNavigation()
    MockAxios.mockResponse({ data: { children: response } })

    const categories = await promise
    const item = { path: '/category/opinion', type: 'category' }
    expect(categories).toEqual(
      expect.arrayContaining([expect.objectContaining(item)]),
    )
  })

  it('should remove item from blacklist', async () => {
    const category = { _id: 'id', name: 'test', url: '/test/' }
    const block = { _id: 'block', name: 'block', url: '/block/' }
    const response = [category, block]
    const promise = getMainNavigation()
    MockAxios.mockResponse({ data: { children: response } })

    const categories = await promise
    expect(categories).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ key: 'block' })]),
    )
  })

  it('should rewrite url from whitelist', async () => {
    const response = [{ _id: 'allow', name: 'allow', url: '/test-allow/' }]
    const promise = getMainNavigation()
    MockAxios.mockResponse({ data: { children: response } })

    const categories = await promise
    expect(categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: '/category/allow' }),
      ]),
    )
  })
})
