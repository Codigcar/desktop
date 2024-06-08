import MockAxios from 'jest-mock-axios'

import CategoriesService from './categories'

const mockResults = {
  children: [
    {
      _id: 'whatever-id',
      display_name: 'Test Display Name',
      url: '/sample-url',
    },
    {
      _id: 'id',
      display_name: 'Display-Name',
      url: '/another-url',
    },
  ],
}

describe('Categories Service', () => {
  it('get categories', async () => {
    const promise = CategoriesService.get()
    MockAxios.mockResponse({ data: mockResults })
    expect(await promise).toEqual(mockResults)
  })
})
