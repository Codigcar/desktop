import AsyncStorage from '@react-native-async-storage/async-storage'
import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { FavoritePreferences } from '../../services/preferences'
import { App } from '../../utils/config'
import { STORE_FAVORITES } from '../../utils/constants'
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
afterEach(async () => {
  await AsyncStorage.clear()
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

  it('should return the same number of stories if the ids match according to the size of the list passed for EC ', async () => {
    App.key = 'elcomercio'
    const { result } = renderHook(() => useFavorites(), { wrapper })
    act(() => {
      result.current.setFavorites().ids(['0', '1', '2'])
    })
    await act(async () => undefined)
    act(() => {
      result.current
        .setFavorites()
        .stories([{ id: '1' }, { id: '2' }, { id: '3' }])
    })
    result.current.fetchFavoritesStories(2)
    expect(result.current.getFavorites().stories.length).toBe(3)
  })

  describe('subscriber user', () => {
    it('save favorite for EC', async () => {
      const user = { email: 'ec@ec.pe', id: 'id' }
      mockUseAuth.mockImplementation(() => ({ isSubscribed: true, user }))
      FavoritePreferences.get = jest.fn().mockResolvedValueOnce([])
      const { result } = renderHook(() => useFavorites(), { wrapper })
      await act(async () => undefined)
      expect(result.current.favorites.length).toBe(0)
      await act(() => result.current.toggleFavorite('_id'))
      const storage = await AsyncStorage.getItem(STORE_FAVORITES)
      expect(storage).toEqual(JSON.stringify(['_id']))
    })

    it('save favorite', async () => {
      App.key = 'gestion'
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
