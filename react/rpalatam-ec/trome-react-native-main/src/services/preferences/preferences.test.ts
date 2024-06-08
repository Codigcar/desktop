import MockAxios from 'jest-mock-axios'

import { FavoritePreferences } from './preferences'

afterEach(() => {
  MockAxios.reset()
})

describe('preferences service', () => {
  it('get favorites', async () => {
    const data = ['id']
    const responseObj = {
      data: { data },
    }
    const promise = FavoritePreferences.get('id')
    MockAxios.mockResponse(responseObj)
    expect(await promise).toEqual(data)
  })

  it('post favorites', async () => {
    const data = ['id']
    const responseObj = {
      data: { data },
    }
    const promise = FavoritePreferences.post(data, {
      accessToken: '',
      email: '',
      id: '',
    })
    MockAxios.mockResponse(responseObj)
    expect(await promise).toEqual(data)
  })

  it('abort request', (done) => {
    const thenFn = jest.fn()
    const catchFn = jest.fn()
    const promise = FavoritePreferences.get('id').then(thenFn).catch(catchFn)
    FavoritePreferences.abort()
    setTimeout(async () => {
      MockAxios.mockResponse({ data: 'response' }, undefined, true)
      await promise
      expect(thenFn).not.toHaveBeenCalled()
      expect(catchFn).toHaveBeenCalledWith(expect.any(MockAxios.Cancel))
      done()
    })
  })
})
