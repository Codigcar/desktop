import MockAxios from 'jest-mock-axios'

import mostRead from './mostRead'

afterEach(() => {
  MockAxios.reset()
})

describe('most read service', () => {
  it('should return array string', async () => {
    const data = [
      {
        path: 'path-1',
        pageViews: 123,
        dimension8: 'QWE',
      },
      {
        path: 'path-2',
        pageViews: 234,
        dimension8: 'ASD',
      },
      {
        path: 'path-3',
        pageViews: 345,
        dimension8: 'ZXC',
      },
    ]
    const responseObj = {
      data,
    }
    const promise = mostRead.get()
    MockAxios.mockResponse(responseObj)
    expect(await promise).toEqual(['QWE', 'ASD', 'ZXC'])
  })
})
