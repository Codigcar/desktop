import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { act, cleanup, fireEvent, render } from '@testing-utils/library'
import MockAxios from 'jest-mock-axios'
import React from 'react'
import { Alert, Platform, Share } from 'react-native'

import Story from './Story'
import { useAuth } from '../../context/auth'
import { useFavorites } from '../../context/favorites'
import { NotificationProvider } from '../../context/notification'
import useOpenStory from '../../hooks/useOpenStory'

jest.mock('@react-navigation/native')
const mockUseFocusEffect = useFocusEffect as jest.Mock
const mockUseNavigation = useNavigation as jest.Mock
const mockUseRoute = useRoute as jest.Mock

jest.mock('../../context/auth')
const mockUseAuth = useAuth as jest.Mock

jest.mock('../../context/favorites')
const mockUseFavorites = useFavorites as jest.Mock

jest.mock('../../hooks/useOpenStory')
const mockUseOpenStory = useOpenStory as jest.Mock

/**
 * FIXME: Resolve the webview mock ref and remove this spy
 */
jest.spyOn(console, 'error').mockImplementation(() => jest.fn())
jest.useFakeTimers()

beforeEach(() => {
  mockUseAuth.mockImplementation(() => jest.fn())
  mockUseFavorites.mockImplementation(() => ({ favorites: [] }))
  mockUseFocusEffect.mockImplementation((fn) => fn())
  mockUseNavigation.mockImplementation(() => ({ push: jest.fn() }))
  mockUseNavigation.mockImplementation(() => ({
    push: jest.fn(),
    addListener: jest.fn(),
  }))
  mockUseRoute.mockImplementation(() => ({
    params: { id: 'id', pathname: '/notice/' },
  }))
})

afterEach(() => {
  MockAxios.reset()
  cleanup()
})

describe('Story screen', () => {
  it('snapshot', () => {
    const { toJSON } = render(<Story />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('share story', () => {
    Platform.OS = 'ios'
    const spyShare = jest.spyOn(Share, 'share')
    const { getByTestId } = render(<Story />)

    fireEvent.press(getByTestId('button-share'))
    expect(spyShare).toBeCalledWith(
      { url: expect.stringContaining('/notice/') },
      { dialogTitle: 'Compartir' },
    )
  })

  it('open font size modal', async () => {
    const { getByTestId } = render(<Story />)
    fireEvent.press(getByTestId('button-font_size'))
    act(jest.runAllTimers)
    expect(getByTestId('backdrop-touchable')).toBeDefined()
  })

  describe('story params without id or pathname', () => {
    it('story pathname is undefined', () => {
      mockUseRoute.mockImplementationOnce(() => ({ params: { id: 'id' } }))
      const { getByTestId, queryByTestId } = render(<Story />)
      expect(queryByTestId('options')).toBeNull()
      expect(getByTestId('story-webview')).toBeDefined()
    })

    it('story id is undefined', () => {
      mockUseRoute.mockImplementationOnce(() => ({ params: { pathname: '/' } }))
      const { queryByTestId } = render(<Story />)
      expect(queryByTestId('options')).toBeNull()
      expect(queryByTestId('story-webview')).toBeNull()
    })

    it('set navigation screen params', async () => {
      const setParams = jest.fn()
      mockUseNavigation.mockImplementationOnce(() => ({ setParams }))
      mockUseRoute.mockImplementationOnce(() => ({ params: { id: 'id' } }))
      render(<Story />)
      const response = { _id: 'id', canonical_url: '/url/' }
      await act(async () => MockAxios.mockResponse({ data: response }))
      expect(setParams).toBeCalledWith({ id: 'id', pathname: '/url/' })
    })
  })

  describe('handle postmessage', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onMessage<T>(data: T): Record<string, any> {
      const utils = render(<Story />)
      const webview = utils.getByTestId('story-webview')
      const elm = webview.parent?.instance._reactInternals._debugOwner
      const injectJavaScript = jest.spyOn(elm.ref.current, 'injectJavaScript')
      webview.props.onMessage({ nativeEvent: { data: JSON.stringify(data) } })
      return { injectJavaScript, props: elm.pendingProps }
    }

    it('should not inject javascript to webview', () => {
      const ref1 = onMessage({ type: 'unknown' })
      expect(ref1.injectJavaScript).not.toBeCalled()
      const ref2 = onMessage(undefined)
      expect(ref2.injectJavaScript).not.toBeCalled()
    })

    it('send user to loaded webview', async () => {
      mockUseAuth.mockImplementation(() => ({
        isAuthenticated: true,
        user: { id: '123' },
      }))
      const { injectJavaScript } = onMessage({ type: 'init.WEB_LOADED' })
      expect(injectJavaScript).toHaveBeenCalledWith(
        expect.stringContaining(JSON.stringify({ id: '123' })),
      )
    })

    it('send theme to loaded webview', () => {
      const { injectJavaScript } = onMessage({ type: 'init.WEB_LOADED' })
      expect(injectJavaScript).toHaveBeenCalledWith(
        expect.stringContaining('mode.setNightMode(false)'),
      )
    })

    it('navigate to previous screen', () => {
      const goBack = jest.fn()
      mockUseNavigation.mockImplementationOnce(() => ({ goBack }))
      onMessage({ type: 'navigation.GO_BACK' })
      expect(goBack).toBeCalled()
    })

    it('navigate to previous screen when not authenticated or signwallModal is active', async () => {
      const goBack = jest.fn()
      mockUseNavigation.mockImplementation(() => ({ goBack }))
      mockUseAuth.mockImplementation(() => ({ isAuthenticated: false }))
      onMessage({
        type: 'navigation.NAVIGATE_TO_SCREEN',
        payload: { name: 'SignwallModal' },
      })

      expect(goBack).toBeCalled()
    })

    it('navigate to screen', () => {
      const navigate = jest.fn()
      mockUseNavigation.mockImplementationOnce(() => ({ navigate }))
      const payload = { name: 'Stack', params: { screen: 'Screen' } }
      onMessage({ type: 'navigation.NAVIGATE_TO_SCREEN', payload })
      expect(navigate).toBeCalledWith(payload.name, payload.params)
    })

    it('navigate to Author screen', () => {
      const navigate = jest.fn()
      mockUseNavigation.mockReturnValueOnce({ navigate })
      const { getByTestId } = render(<Story />)
      const { parent } = getByTestId('story-webview')
      const { onShouldStartLoadWithRequest: fn } =
        parent?.instance._reactInternals._debugOwner.pendingProps
      jest.spyOn(Platform, 'select').mockReturnValueOnce(true)
      const url = 'https://gestion.pe/autor/redaccion-gestion/'
      expect(fn({ url })).toBeFalsy()
      expect(navigate).toBeCalledWith('Author', {
        path: 'redaccion-gestion',
      })
    })

    it('navigate to Tag screen', () => {
      const navigate = jest.fn()
      mockUseNavigation.mockReturnValueOnce({ navigate })
      const { getByTestId } = render(<Story />)
      const { parent } = getByTestId('story-webview')
      const { onShouldStartLoadWithRequest: fn } =
        parent?.instance._reactInternals._debugOwner.pendingProps
      jest.spyOn(Platform, 'select').mockReturnValueOnce(true)
      const url = 'https://gestion.pe/noticias/fitch-ratings/'
      expect(fn({ url })).toBeFalsy()
      expect(navigate).toBeCalledWith('Tag', {
        path: 'fitch-ratings',
      })
    })

    it('navigate to Story screen with useOpenStory', () => {
      const openStory = jest.fn()
      mockUseOpenStory.mockReturnValue(openStory)
      const { getByTestId } = render(<Story />)
      const { parent } = getByTestId('story-webview')
      const { onShouldStartLoadWithRequest: fn } =
        parent?.instance._reactInternals._debugOwner.pendingProps
      jest.spyOn(Platform, 'select').mockReturnValueOnce(true)
      const url = 'https://gestion.pe/economia/peru-noticia/'
      expect(fn({ url })).toBeFalsy()
      expect(openStory).toBeCalledWith({
        id: '',
        url: '/economia/peru-noticia/',
      })
    })

    describe('subscription', () => {
      it('check access for user who is anonymous', () => {
        const navigate = jest.fn()
        mockUseNavigation.mockImplementationOnce(() => ({ navigate }))
        const fnVerifySubscription = jest.fn().mockResolvedValue(null)
        mockUseAuth.mockImplementationOnce(() => ({
          isSubscribed: false,
          user: {},
          verifySubscription: fnVerifySubscription,
        }))

        onMessage({ type: 'subscription.CHECK_ACCESS' })
        expect(navigate).toHaveBeenLastCalledWith('Auth', {
          screen: 'InitialScreen',
        })
      })

      it('check access for user who is subscriber', () => {
        const fnVerifySubscription = jest.fn().mockResolvedValue(null)
        mockUseAuth.mockImplementationOnce(() => ({
          isSubscribed: true,
          user: { id: '123' },
          verifySubscription: fnVerifySubscription,
        }))

        onMessage({ type: 'subscription.CHECK_ACCESS' })
        expect(fnVerifySubscription).toBeCalled()
      })
    })
  })

  describe('read later', () => {
    it('save to read later', () => {
      const toggleFavorite = jest.fn()
      mockUseFavorites.mockImplementationOnce(() => ({
        favorites: [],
        toggleFavorite,
      }))

      const { getByTestId } = render(
        <NotificationProvider>
          <Story />
        </NotificationProvider>,
      )
      fireEvent.press(getByTestId('button-bookmark'))
      expect(toggleFavorite).toBeCalledWith('id')
    })

    it('remove from read later', () => {
      const toggleFavorite = jest.fn()
      mockUseFavorites.mockImplementationOnce(() => ({
        favorites: ['id'],
        toggleFavorite,
      }))

      const { getByTestId } = render(<Story />)
      fireEvent.press(getByTestId('button-bookmark'))
      expect(toggleFavorite).toBeCalledWith('id')
    })

    it('navigate to read later', () => {
      mockUseFavorites.mockReturnValueOnce({
        favorites: [],
        toggleFavorite: jest.fn(),
      })
      const navigate = jest.fn()
      mockUseNavigation.mockReturnValue({ navigate, addListener: jest.fn() })

      const { getByTestId, getByText } = render(
        <NotificationProvider>
          <Story />
        </NotificationProvider>,
      )
      fireEvent.press(getByTestId('button-bookmark'))
      fireEvent.press(getByText('Ir a leer luego'))
      expect(navigate).toBeCalledWith('Favorite')
    })
  })

  describe('show error message when there is no news', () => {
    it('show error message when service fail', async () => {
      mockUseNavigation.mockImplementationOnce(() => ({ setParams: jest.fn() }))
      mockUseRoute.mockImplementationOnce(() => ({
        params: { pathname: 'pathname' },
      }))
      const spy = jest.spyOn(Alert, 'alert')

      const { queryByTestId } = render(<Story />)
      await act(async () => MockAxios.mockError({ message: '404' }))

      const [title, , buttons] = spy.mock.calls[0]
      buttons?.[0].onPress?.()

      expect(title).toBe('Nota perdida')
      expect(queryByTestId('story-webview')).toBeNull()
    })
  })
})
