import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { FavoritePreferences } from '../../services/preferences'
import { useAuth } from '../auth'
import { FavoritesProvider, useFavorites } from '../favorites'

jest.mock('../auth')
const mockUseAuth = useAuth as jest.Mock

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
)

beforeEach(() => {
  mockUseAuth.mockImplementation(() => ({ user: {} }))
})

describe('favorites context', () => {
  it('get/set favorites', async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    await act(() => result.current.setFavorites().ids(['a', 'b']))
    expect(result.current.favorites.length).toBe(2)
    expect(result.current.getFavorites().ids.length).toBe(2)
    act(() => result.current.setFavorites().stories([{ id: 'a' }]))
    expect(result.current.getFavorites().stories.length).toBe(1)
  })

  it('toogle favorites', async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    await act(() => result.current.toggleFavorite('id'))
    expect(result.current.favorites.includes('id')).toBeTruthy()
    await act(() => result.current.toggleFavorite('id'))
    expect(result.current.favorites.includes('id')).toBeFalsy()
  })

  describe('subscriber user', () => {
    it('save favorite', async () => {
      const user = { email: 'ec@ec.pe', id: 'id' }
      mockUseAuth.mockImplementation(() => ({ isSubscribed: true, user }))
      const fnAbort = jest.spyOn(FavoritePreferences, 'abort')
      const fnPost = jest.spyOn(FavoritePreferences, 'post')
      FavoritePreferences.get = jest.fn().mockResolvedValueOnce([])
      const { result } = renderHook(() => useFavorites(), { wrapper })
      await act(async () => undefined)
      expect(result.current.favorites.length).toBe(0)
      await act(() => result.current.toggleFavorite('_id'))
      expect(fnAbort).toBeCalled()
      expect(fnPost).toHaveBeenLastCalledWith(['_id'], user)
    })
  })
})
