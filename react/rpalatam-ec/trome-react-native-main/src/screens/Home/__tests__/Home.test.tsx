import AsyncStorage from '@react-native-async-storage/async-storage'
import { act, render } from '@testing-utils/library'
import React from 'react'
import { Alert, Share } from 'react-native'
import { Interstitial } from 'react-native-ad-manager'

import { useAuth } from '../../../context/auth'
import { useFavorites } from '../../../context/favorites'
import { useMainNavigation } from '../../../context/navigation'
import { useTopics } from '../../../context/topics'
import { getRemoteValue, requestUserPermission } from '../../../utils/firebase'
import { checkNeedsUpdate } from '../../../utils/inAppUpdates'
import { sendFeedbackByEmail } from '../../../utils/mailer'
import {
  HomeWebviewRef,
  PaywallWebviewRef,
  sendPostMessageToWebview,
} from '../../../utils/refs'
import HomeScreen from '../Home'
import HOME_SCREEN_SHOWN from '../homeShown'

jest.mock('@react-native-firebase/crashlytics', () => () => ({
  log: jest.fn(),
  recordError: jest.fn(),
}))

const mockSetMessagesDisplaySuppressed = jest.fn()
const mockTriggerEvent = jest.fn()
jest.mock('@react-native-firebase/in-app-messaging', () => () => ({
  setMessagesDisplaySuppressed: mockSetMessagesDisplaySuppressed,
  triggerEvent: mockTriggerEvent,
}))

const mockNavigate = jest.fn()
const mockDispatch = jest.fn()
jest.mock('@react-navigation/native', () => ({
  DrawerActions: { openDrawer: jest.fn().mockReturnValue('open') },
  useNavigation: jest.fn(() => ({
    addListener: jest.fn(),
    dispatch: mockDispatch,
    removeListener: jest.fn(),
    navigate: mockNavigate,
  })),
}))

jest.mock('react-native-store-review', () => ({
  isAvailable: true,
  requestReview: jest.fn(),
}))
// eslint-disable-next-line @typescript-eslint/no-var-requires
const requestReview = require('react-native-store-review').requestReview

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock

jest.mock('../../../context/favorites')
const mockUseFavorites = useFavorites as jest.Mock

jest.mock('../../../context/navigation')
const mockUseMainNavigation = useMainNavigation as jest.Mock

jest.mock('../../../context/topics')
const mockUseTopics = useTopics as jest.Mock

jest.mock('../../../utils/auth')

jest.mock('../../../utils/firebase')
const mockGetRemoteValue = getRemoteValue as jest.Mock
const mockRequestUserPermission = requestUserPermission as jest.Mock

jest.mock('../../../utils/inAppUpdates')
const mockCheckNeedsUpdate = checkNeedsUpdate as jest.Mock

jest.mock('../../../utils/mailer')

jest.mock('../../../utils/refs', () => ({
  HomeWebviewRef: jest.fn(),
  PaywallWebviewRef: jest.fn(),
  sendPostMessageToWebview: jest.fn(),
}))

jest.useFakeTimers()

beforeAll(() => {
  Object.defineProperty(HomeWebviewRef, 'current', {
    value: { injectJavaScript: jest.fn() },
  })
})

beforeEach(() => {
  jest.spyOn(HOME_SCREEN_SHOWN, 'get').mockReturnValue(true)
  mockGetRemoteValue.mockImplementation(() => ({ asString: jest.fn() }))
  mockRequestUserPermission.mockResolvedValue(() => ({ finally: jest.fn() }))
  mockUseAuth.mockImplementation(() => jest.fn())
  mockUseFavorites.mockImplementation(() => jest.fn())
  mockUseMainNavigation.mockImplementation(() => ({ categories: [] }))
  mockUseTopics.mockReturnValue({ setDefaultTopics: jest.fn() })
})

describe('Home', () => {
  function onMessage<T>(data: T): () => void {
    const utils = render(<HomeScreen />)
    const webview = utils.getByTestId('home-screen')
    const nativeEvent = { data: JSON.stringify(data) }
    return () => webview.props.onMessage({ nativeEvent })
  }

  it('Mount screen', async () => {
    const set = jest.spyOn(HOME_SCREEN_SHOWN, 'set')
    const { getByTestId, toJSON } = render(<HomeScreen />)

    await act(async () => {
      expect(toJSON()).toMatchSnapshot()
    })

    const webview = getByTestId('home-screen')
    expect(webview.props.source.uri).toBe(
      'https://pwa.dev.elcomercio.pe/#?version=50',
    )
    expect(set).toBeCalledWith(true)
  })

  describe('ad interstitial', () => {
    beforeEach(async () => {
      await AsyncStorage.clear()
      mockUseFavorites.mockImplementation(() => ({
        sendFavoritesToWebview: jest.fn(() => ({ ids: jest.fn() })),
      }))
      mockGetRemoteValue.mockImplementation((key) => ({
        asString: jest.fn(() =>
          key === 'interstitial_home' ? 'enabled' : 'disabled',
        ),
      }))
      mockCheckNeedsUpdate.mockResolvedValue(false)
      mockUseAuth.mockImplementation(() => ({
        isSubscribed: false,
      }))
      jest.spyOn(Interstitial, 'requestAd').mockClear()
    })

    it('do request interstitial', async () => {
      const sendMessage = onMessage({ type: 'init.WEB_LOADED' })
      await act(async () => sendMessage())
      expect(Interstitial.requestAd).toBeCalled()
    })

    it('do not request when there is an update', async () => {
      mockCheckNeedsUpdate.mockResolvedValueOnce(true)
      const sendMessage = onMessage({ type: 'init.WEB_LOADED' })
      await act(async () => sendMessage())
      expect(Interstitial.requestAd).not.toBeCalled()
    })

    it('do not request when user is a subscriber', async () => {
      mockUseAuth.mockImplementation(() => ({
        isSubscribed: true,
      }))
      const sendMessage = onMessage({ type: 'init.WEB_LOADED' })
      await act(async () => sendMessage())
      expect(Interstitial.requestAd).not.toBeCalled()
    })

    it('do not request when HOME_SCREEN_SHOWN return false', async () => {
      jest.spyOn(HOME_SCREEN_SHOWN, 'get').mockReturnValue(false)
      const sendMessage = onMessage({ type: 'init.WEB_LOADED' })
      await act(async () => sendMessage())
      expect(Interstitial.requestAd).not.toBeCalled()
    })

    it('do not request when disabled', async () => {
      mockGetRemoteValue.mockImplementation(() => ({
        asString: jest.fn(() => 'disabled'),
      }))
      const sendMessage = onMessage({ type: 'init.WEB_LOADED' })
      await act(async () => sendMessage())
      expect(Interstitial.requestAd).not.toBeCalled()
    })
  })

  describe('handle postmessage', () => {
    describe('app init', () => {
      beforeEach(() => {
        mockUseFavorites.mockImplementation(() => ({
          sendFavoritesToWebview: jest.fn(() => ({ ids: jest.fn() })),
        }))
      })

      it('send categories to webview', async () => {
        const fnSendCategoriesToWebview = jest.fn()
        mockUseMainNavigation.mockImplementationOnce(() => ({
          categories: [{ id: 'id' }],
          sendCategoriesToWebview: fnSendCategoriesToWebview,
        }))
        const sendMessage = onMessage({ type: 'init.WEB_LOADED' })
        await act(async () => sendMessage())
        expect(fnSendCategoriesToWebview).toBeCalled()
      })

      it('send favorites to webview', async () => {
        const fnIds = jest.fn()
        mockUseFavorites.mockImplementationOnce(() => ({
          sendFavoritesToWebview: jest.fn(() => ({ ids: fnIds })),
        }))
        const sendMessage = onMessage({ type: 'init.WEB_LOADED' })
        await act(async () => sendMessage())
        expect(fnIds).toBeCalled()
      })

      it('set user to webview', async () => {
        const user = { id: 'abc' }
        mockUseAuth.mockImplementationOnce(() => ({
          isAuthenticated: true,
          user,
        }))
        const sendMessage = onMessage({ type: 'init.WEB_LOADED' })
        await act(async () => sendMessage())
        expect(HomeWebviewRef.current?.injectJavaScript).toHaveBeenCalledWith(
          expect.stringContaining(
            JSON.stringify({ type: 'auth.PROFILE', payload: user }),
          ),
        )
      })

      it('send topics to webview', async () => {
        const topics = ['id']
        mockUseTopics.mockReturnValue({ topics, setDefaultTopics: jest.fn() })
        const sendMessage = onMessage({ type: 'init.WEB_LOADED' })
        await act(async () => sendMessage())
        expect(HomeWebviewRef.current?.injectJavaScript).toHaveBeenCalledWith(
          expect.stringContaining(`setTopics(${JSON.stringify(topics)})`),
        )
      })
    })

    describe('app addons', () => {
      it('open alert', async () => {
        const spy = jest.spyOn(Alert, 'alert')
        const payload = {
          title: 'Test',
          message: 'message',
          buttons: [{ text: 'Cancel' }, { text: 'Remove' }],
          options: { cancelable: true },
        }
        const sendMessage = onMessage({ type: 'app.SEND_ALERT', payload })
        await act(async () => sendMessage())
        const [title, message, buttons, options] = spy.mock.calls[0]
        expect(title).toBe(payload.title)
        expect(message).toBe(payload.message)

        buttons?.forEach((button) => {
          button.onPress?.()
          expect(sendPostMessageToWebview).toHaveBeenLastCalledWith('Home', {
            payload: { text: button.text },
            type: 'app.ON_PRESS_ALERT',
          })
        })

        expect(options).toEqual(expect.objectContaining(payload.options))
        options?.onDismiss?.()
        expect(sendPostMessageToWebview).toHaveBeenLastCalledWith('Home', {
          payload: payload.options,
          type: 'app.ON_DISMISS_ALERT',
        })
      })

      it('open sheet', async () => {
        const { getByTestId, queryByTestId } = render(<HomeScreen />)
        const webview = getByTestId('home-screen')
        const nativeEvent = {
          data: JSON.stringify({ type: 'app.OPEN_MODE_SHEET' }),
        }
        expect(queryByTestId('backdrop-touchable')).toBeNull()
        await act(async () => webview.props.onMessage({ nativeEvent }))
        act(() => jest.runAllTimers())
        expect(getByTestId('backdrop-touchable')).toBeDefined()
      })

      it('send feedback by email', async () => {
        const user = { id: 'id', email: 'ec@ec.pe' }
        mockUseAuth.mockImplementationOnce(() => ({ user }))
        const sendMessage = onMessage({ type: 'app.SEND_FEEDBACK_BY_EMAIL' })
        await act(async () => sendMessage())
        expect(sendFeedbackByEmail).toBeCalledWith(user)
      })

      it('store review', async () => {
        const sendMessage = onMessage({ type: 'app.STORE_REVIEW' })
        await act(async () => sendMessage())
        expect(requestReview).toBeCalled()
      })
    })

    it('categories', async () => {
      const fnSetListOfCategory = jest.fn()
      mockUseMainNavigation.mockImplementationOnce(() => ({
        setListOfCategory: fnSetListOfCategory,
      }))
      const payload = { categories: [{ id: 'id' }] }
      const sendMessage = onMessage({
        type: 'categories.SET_LIST_OF_CATEGORY',
        payload,
      })
      await act(async () => sendMessage())
      expect(fnSetListOfCategory).toBeCalledWith(payload.categories)
    })

    describe('favorites', () => {
      it('get story', async () => {
        const fnStories = jest.fn()
        const stories = [{ id: 'id' }]
        mockUseFavorites.mockImplementationOnce(() => ({
          setFavorites: jest.fn(() => ({ stories: fnStories })),
          fetchFavoritesStories: jest.fn().mockResolvedValueOnce(stories),
        }))
        const sendMessage = onMessage({ type: 'favorites.GET_STORIES_BY_ID' })
        await act(async () => sendMessage())
        expect(fnStories).toBeCalledWith(stories)
      })

      it('set list of favorites', async () => {
        const fnIds = jest.fn()
        mockUseFavorites.mockImplementationOnce(() => ({
          setFavorites: jest.fn(() => ({ ids: fnIds })),
        }))
        const payload = { ids: ['1', '2'] }
        const sendMessage = onMessage({
          type: 'favorites.SET_LIST_OF_FAVORITES',
          payload,
        })
        await act(async () => sendMessage())
        expect(fnIds).toBeCalledWith(payload.ids)
      })
    })

    describe('in app messaging', () => {
      it('hide messages', async () => {
        const payload = { enabled: true }
        const sendMessage = onMessage({
          type: 'inAppMessaging.HIDE_MESSAGES',
          payload,
        })
        await act(async () => sendMessage())
        expect(mockSetMessagesDisplaySuppressed).toHaveBeenLastCalledWith(
          payload.enabled,
        )
      })

      it('trigger event', async () => {
        const payload = { eventId: 'id' }
        const sendMessage = onMessage({
          type: 'inAppMessaging.TRIGGER_EVENT',
          payload,
        })
        await act(async () => sendMessage())
        expect(mockTriggerEvent).toHaveBeenLastCalledWith(payload.eventId)
      })
    })

    describe('navigation', () => {
      it('navigate to screen', async () => {
        const payload = { name: 'Stack', params: { screen: 'Screen' } }
        const sendMessage = onMessage({
          type: 'navigation.NAVIGATE_TO_SCREEN',
          payload,
        })
        await act(async () => sendMessage())
        expect(mockNavigate).toHaveBeenLastCalledWith(
          payload.name,
          payload.params,
        )
      })

      it('open drawer', async () => {
        const sendMessage = onMessage({ type: 'navigation.OPEN_DRAWER' })
        await act(async () => sendMessage())
        expect(mockDispatch).toHaveBeenLastCalledWith('open')
      })
    })

    it('paywall screen', async () => {
      const fnInjectJavacript = jest.fn()
      Object.defineProperty(PaywallWebviewRef, 'current', {
        value: { injectJavaScript: fnInjectJavacript },
      })
      const payload = { message: 'message' }
      const sendMessage = onMessage({
        type: 'paywall.SEND_POSTMESSAGE_TO_PAYWALL_SCREEN',
        payload,
      })
      await act(async () => sendMessage())
      expect(fnInjectJavacript).toHaveBeenLastCalledWith(
        expect.stringContaining(JSON.stringify(payload)),
      )
    })

    it('share', async () => {
      const spy = jest.spyOn(Share, 'share')
      const content = { title: 'title', url: 'https://ec.pe/' }
      const sendMessage = onMessage({ type: 'onShare', content })
      await act(async () => sendMessage())
      expect(spy).toBeCalledWith({ message: `${content.title} ${content.url}` })
    })

    describe('subscription', () => {
      it('check access for user who is anonymous', async () => {
        mockUseAuth.mockImplementationOnce(() => ({
          isSubscribed: false,
          user: {},
        }))
        const sendMessage = onMessage({ type: 'subscription.CHECK_ACCESS' })
        await act(async () => sendMessage())
        expect(mockNavigate).toHaveBeenLastCalledWith('Auth', {
          screen: 'InitialScreen',
        })
        expect(
          HomeWebviewRef.current?.injectJavaScript,
        ).toHaveBeenLastCalledWith(
          expect.stringContaining(
            JSON.stringify({
              type: 'subscription.CHECK_ACCESS_CALLBACK',
              payload: { status: false },
            }),
          ),
        )
      })

      it('check access for user who is subscriber', async () => {
        const fnVerifySubscription = jest.fn().mockResolvedValue(null)
        mockUseAuth.mockImplementationOnce(() => ({
          isSubscribed: true,
          user: { id: '123' },
          verifySubscription: fnVerifySubscription,
        }))

        const sendMessage = onMessage({ type: 'subscription.CHECK_ACCESS' })
        await act(async () => sendMessage())
        expect(fnVerifySubscription).toBeCalled()
        expect(
          HomeWebviewRef.current?.injectJavaScript,
        ).toHaveBeenLastCalledWith(
          expect.stringContaining(
            JSON.stringify({
              type: 'subscription.CHECK_ACCESS_CALLBACK',
              payload: { status: true },
            }),
          ),
        )
      })
    })

    describe('topics', () => {
      it('set default topics', async () => {
        mockUseFavorites.mockReturnValueOnce({
          sendFavoritesToWebview: jest.fn(() => ({ ids: jest.fn() })),
        })
        mockRequestUserPermission.mockResolvedValue(true)
        const setDefaultTopics = jest.fn()
        mockUseTopics.mockReturnValue({
          setDefaultTopics,
          setTopics: jest.fn(),
        })
        const sendMessage = onMessage({ type: 'init.WEB_LOADED' })
        await act(async () => sendMessage())
        expect(setDefaultTopics).toBeCalled()
      })

      it('subscribe to topic', () => {
        const subscribeToTopic = jest.fn()
        mockUseTopics.mockReturnValueOnce({ subscribeToTopic })
        onMessage({
          type: 'topics.SUBSCRIBE_TO_TOPIC',
          payload: { topic: 'topic' },
        })()
        expect(subscribeToTopic).toBeCalledWith('topic')
      })

      it('unsubscribe from topic', () => {
        const unsubscribeFromTopic = jest.fn()
        mockUseTopics.mockReturnValueOnce({ unsubscribeFromTopic })
        onMessage({
          type: 'topics.UNSUBSCRIBE_FROM_TOPIC',
          payload: { topic: 'topic' },
        })()
        expect(unsubscribeFromTopic).toBeCalledWith('topic')
      })
    })
  })
})
