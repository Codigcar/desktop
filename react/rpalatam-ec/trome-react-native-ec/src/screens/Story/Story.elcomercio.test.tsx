import { useNavigation, useRoute } from '@react-navigation/native'
import { cleanup, render } from '@testing-utils/library'
import MockAxios from 'jest-mock-axios'
import React from 'react'
import { Platform, Share } from 'react-native'
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes'
import { ReactTestInstance } from 'react-test-renderer'

import Story from './Story.elcomercio'
import { useAuth } from '../../context/auth'
import { useFavorites } from '../../context/favorites'
import { useTopics } from '../../context/topics'
import { webviewUrl } from '../../utils/config'
import * as inappbrowser from '../../utils/inappbrowser'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
const mockUseRoute = useRoute as jest.Mock

jest.mock('../../context/auth')
const mockUseAuth = useAuth as jest.Mock

jest.mock('../../context/favorites')
const mockUseFavorites = useFavorites as jest.Mock

jest.mock('../../context/topics')
const mockUseTopics = useTopics as jest.Mock

/**
 * FIXME: Resolve the webview mock ref and remove this spy
 */
jest.spyOn(console, 'error').mockImplementation(() => jest.fn())

type Props = {
  onShouldStartLoadWithRequest(event: Partial<ShouldStartLoadRequest>): void
}

type Ref = {
  injectJavaScript(): void
}

const getProps = (instance: ReactTestInstance | null): Props => {
  return instance?.instance._reactInternals._debugOwner.pendingProps
}

const getRef = (instance: ReactTestInstance | null): Ref => {
  return instance?.instance._reactInternals._debugOwner.ref.current
}

beforeEach(() => {
  mockUseAuth.mockReturnValue({ user: {} })
  mockUseFavorites.mockReturnValue({})
  mockUseNavigation.mockReturnValue({})
  mockUseRoute.mockReturnValue({ params: { pathname: '/path/' } })
  mockUseTopics.mockReturnValue({})
})

afterEach(() => {
  MockAxios.reset()
  cleanup()
})

describe('Story screen', () => {
  describe('on should start load with request', () => {
    it('open webview url', () => {
      const pathname = '/pathname-story/'
      mockUseRoute.mockReturnValueOnce({ params: { pathname } })
      const { getByTestId } = render(<Story />)
      const { parent } = getByTestId('story-webview')
      const { onShouldStartLoadWithRequest: fn } = getProps(parent)
      const url = `${webviewUrl}/news${pathname}#?version=50`
      expect(fn({ url })).toBeTruthy()
    })

    it('not open url without https', () => {
      const { getByTestId } = render(<Story />)
      const { parent } = getByTestId('story-webview')
      const { onShouldStartLoadWithRequest: fn } = getProps(parent)
      expect(fn({ url: 'http://domain.com' })).toBeFalsy()
    })

    it('return true if request is not tapped', () => {
      const { getByTestId } = render(<Story />)
      const { parent } = getByTestId('story-webview')
      const { onShouldStartLoadWithRequest: fn } = getProps(parent)
      jest.spyOn(Platform, 'select').mockReturnValueOnce(false)
      expect(fn({ url: 'https://domain.com' })).toBeTruthy()
    })

    it('open url with in app browser', () => {
      const openInBrowser = jest.spyOn(inappbrowser, 'openInBrowser')
      const { getByTestId } = render(<Story />)
      const { parent } = getByTestId('story-webview')
      const { onShouldStartLoadWithRequest: fn } = getProps(parent)
      jest.spyOn(Platform, 'select').mockReturnValueOnce(true)
      const url = 'https://elcomercio.pe/section/'
      expect(fn({ url })).toBeFalsy()
      expect(openInBrowser).toBeCalledWith(url)
    })

    it('navigate to story screen', () => {
      const push = jest.fn()
      mockUseNavigation.mockReturnValueOnce({ push })
      const { getByTestId } = render(<Story />)
      const { parent } = getByTestId('story-webview')
      const { onShouldStartLoadWithRequest: fn } = getProps(parent)
      jest.spyOn(Platform, 'select').mockReturnValueOnce(true)
      const url = 'https://elcomercio.pe/pathname-noticia/'
      expect(fn({ url })).toBeFalsy()
      expect(push).toBeCalledWith('Story', { pathname: '/pathname-noticia/' })
    })

    it('navigate to author screen', () => {
      const navigate = jest.fn()
      mockUseNavigation.mockReturnValueOnce({ navigate })
      const { getByTestId } = render(<Story />)
      const { parent } = getByTestId('story-webview')
      const { onShouldStartLoadWithRequest: fn } = getProps(parent)
      jest.spyOn(Platform, 'select').mockReturnValueOnce(true)
      const url = 'https://elcomercio.pe/autor/name-slug/'
      expect(fn({ url })).toBeFalsy()
      expect(navigate).toBeCalledWith('Author', {
        path: 'name-slug',
      })
    })
  })

  describe('on message', () => {
    it('send user, subscription, favorites and topics to loaded webview', () => {
      mockUseAuth.mockReturnValueOnce({
        isAuthenticated: true,
        isSubscribed: false,
        user: { id: '123' },
      })
      mockUseFavorites.mockReturnValueOnce({ favorites: ['story-id'] })
      mockUseTopics.mockReturnValueOnce({ topics: ['topic-id'] })
      const { getByTestId } = render(<Story />)
      const webview = getByTestId('story-webview')
      const ref = getRef(webview.parent)
      const injectJavaScript = jest.spyOn(ref, 'injectJavaScript')
      webview.props.onMessage({
        nativeEvent: { data: JSON.stringify({ type: 'init.WEB_LOADED' }) },
      })
      expect(injectJavaScript).toBeCalledWith(
        expect.stringContaining(JSON.stringify({ id: '123' })),
      )
      expect(injectJavaScript).toBeCalledWith(
        expect.stringContaining(JSON.stringify({ status: false })),
      )
      expect(injectJavaScript).toBeCalledWith(
        expect.stringContaining(JSON.stringify(['story-id'])),
      )
      expect(injectJavaScript).toBeCalledWith(
        expect.stringContaining(JSON.stringify(['topic-id'])),
      )
    })

    it('navigate to previous screen', () => {
      const goBack = jest.fn()
      mockUseNavigation.mockReturnValueOnce({ goBack })
      const { getByTestId } = render(<Story />)
      const webview = getByTestId('story-webview')
      webview.props.onMessage({
        nativeEvent: { data: JSON.stringify({ type: 'navigation.GO_BACK' }) },
      })
      expect(goBack).toBeCalled()
    })

    it('navigate to custom screen', () => {
      const navigate = jest.fn()
      mockUseNavigation.mockReturnValueOnce({ navigate })
      const { getByTestId } = render(<Story />)
      const webview = getByTestId('story-webview')
      const data = {
        type: 'navigation.NAVIGATE_TO_SCREEN',
        payload: { name: 'Stack', params: { screen: 'Screen' } },
      }
      webview.props.onMessage({ nativeEvent: { data: JSON.stringify(data) } })
      expect(navigate).toBeCalledWith(data.payload.name, data.payload.params)
    })

    it('set list of favorites stories', () => {
      const ids = jest.fn()
      mockUseFavorites.mockReturnValueOnce({
        setFavorites: jest.fn().mockReturnValue({ ids }),
      })
      const { getByTestId } = render(<Story />)
      const webview = getByTestId('story-webview')
      const data = {
        type: 'favorites.SET_LIST_OF_FAVORITES',
        payload: { ids: ['id1', 'id2'] },
      }
      webview.props.onMessage({ nativeEvent: { data: JSON.stringify(data) } })
      expect(ids).toBeCalledWith(data.payload.ids)
    })

    it('share story', () => {
      Platform.OS = 'ios'
      const spyShare = jest.spyOn(Share, 'share')
      const { getByTestId } = render(<Story />)
      const webview = getByTestId('story-webview')
      const data = {
        type: 'share.SHARE',
        payload: { url: 'https://domain.com/pathname/' },
      }
      webview.props.onMessage({ nativeEvent: { data: JSON.stringify(data) } })
      expect(spyShare).toBeCalledWith(
        { url: expect.stringContaining('https://domain.com/pathname/') },
        { dialogTitle: 'Compartir' },
      )
    })

    it('subscribe to topic', async () => {
      const subscribeToTopic = jest.fn().mockResolvedValue('')
      mockUseTopics.mockReturnValueOnce({ subscribeToTopic, topics: ['old'] })
      const { getByTestId } = render(<Story />)
      const webview = getByTestId('story-webview')
      const ref = getRef(webview.parent)
      const injectJavaScript = jest.spyOn(ref, 'injectJavaScript')
      const data = {
        type: 'topics.SUBSCRIBE_TO_TOPIC',
        payload: { topic: 'new' },
      }
      await webview.props.onMessage({
        nativeEvent: { data: JSON.stringify(data) },
      })
      expect(subscribeToTopic).toBeCalledWith('new')
      expect(injectJavaScript).toBeCalledWith(
        expect.stringContaining(JSON.stringify(['old', 'new'])),
      )
    })

    it('unsubscribe to topic', async () => {
      const unsubscribeFromTopic = jest.fn().mockResolvedValue('')
      mockUseTopics.mockReturnValueOnce({ unsubscribeFromTopic, topics: ['a'] })
      const { getByTestId } = render(<Story />)
      const webview = getByTestId('story-webview')
      const ref = getRef(webview.parent)
      const injectJavaScript = jest.spyOn(ref, 'injectJavaScript')
      const data = {
        type: 'topics.UNSUBSCRIBE_FROM_TOPIC',
        payload: { topic: 'a' },
      }
      await webview.props.onMessage({
        nativeEvent: { data: JSON.stringify(data) },
      })
      expect(unsubscribeFromTopic).toBeCalledWith('a')
      expect(injectJavaScript).toBeCalledWith(
        expect.stringContaining(JSON.stringify([])),
      )
    })
  })
})
