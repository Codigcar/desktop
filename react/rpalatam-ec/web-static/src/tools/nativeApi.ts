import { pianoIdAvailable } from './tools'

type InitialData = {
  categories?: { key: string; path: string; label: string; active: boolean }[]
  pages?: { id: string; path: string; name: string; iconName: string }[]
  paywallActive?: boolean
  isSubscriptor?: boolean
}

type SubscriptionParams = {
  type: 'author' | 'tag'
  action: 'subscribe' | 'unsubscribe'
  topicSlug: string
}

type RegularPostMessage = {
  type: string
  content?: {
    [prop: string]: unknown
  }
  payload?: {
    [prop: string]: unknown
  }
}

type AlerParams = {
  title: string
  message?: string
  buttons?: Array<object>
  options?: Object
}

const version = window.PACKAGE?.version || 0
const PIANO_ID_AVAILABLE = pianoIdAvailable()

class NativeAPI {
  private sendPostMessage(data: RegularPostMessage = { type: '' }) {
    if (process.env.NODE_ENV === 'development') console.log(data)
    window.ReactNativeWebView?.postMessage(JSON.stringify(data))
  }

  checkAccessSubscription() {
    this.sendPostMessage({ type: 'subscription.CHECK_ACCESS' })
  }

  openDrawer() {
    this.sendPostMessage({ type: 'navigation.OPEN_DRAWER' })
  }

  loadInitialData(initialData: InitialData) {
    const { categories = [], paywallActive, isSubscriptor, pages } = initialData

    this.sendPostMessage({
      type: 'app.LOAD_CONFIG',
      payload: {
        categories: categories.map(category => ({
          id: category.key,
          path: category.active ? category.path : `/${category.key}`,
          name: category.label,
        })),
        pages,
        isSubscriptor,
        paywallActive,
      },
    })
  }

  updateSubscriptionStatus(isSubscriptor: boolean) {
    if (PIANO_ID_AVAILABLE) return
    this.sendPostMessage({
      type: 'app.LOAD_CONFIG',
      payload: {
        isSubscriptor,
      },
    })
  }

  loadSession(userInfo) {
    this.sendPostMessage({
      type: 'auth.SIGN_IN',
      payload: {
        userInfo: version > 408 ? JSON.parse(userInfo) : userInfo,
      },
    })
  }

  toggleTopicSubscription(options: SubscriptionParams) {
    this.sendPostMessage({
      type: 'messaging.TOGGLE_TOPIC_SUBSCRIPTION',
      payload: options,
    })
  }

  triggerInAppEvent(eventId: string) {
    this.sendPostMessage({
      type: 'inAppMessaging.TRIGGER_EVENT',
      payload: {
        eventId,
      },
    })
  }

  navigate(screenName: string, screenParams?: Record<string, any>) {
    this.sendPostMessage({
      type: 'navigation.NAVIGATE_TO_SCREEN',
      payload: { name: screenName, params: screenParams },
    })
  }

  navigateGoBack() {
    this.sendPostMessage({ type: 'navigation.GO_BACK' })
  }

  openModeSheet() {
    this.sendPostMessage({ type: 'app.OPEN_MODE_SHEET' })
  }

  sendAlert(payload: AlerParams) {
    this.sendPostMessage({
      type: 'app.SEND_ALERT',
      payload,
    })
  }

  setPreferences() {
    const postmessage = this.sendPostMessage
    return {
      authors(authors: Record<string, unknown>[]) {
        postmessage({
          payload: { authors },
          type: 'preferences.SET_FOLLOWED_AUTHORS',
        })
      },
      tags(tags: Record<string, unknown>[]) {
        postmessage({
          payload: { tags },
          type: 'preferences.SET_FOLLOWED_TAGS',
        })
      },
    }
  }

  subscribeToTopic(topic: string) {
    this.sendPostMessage({
      type: 'topics.SUBSCRIBE_TO_TOPIC',
      payload: { topic },
    })
  }

  unsubscribeFromTopic(topic: string) {
    this.sendPostMessage({
      type: 'topics.UNSUBSCRIBE_FROM_TOPIC',
      payload: { topic },
    })
  }
}

export default new NativeAPI()
