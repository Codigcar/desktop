import 'react-native-gesture-handler/jestSetup'
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

jest.mock('@react-native-firebase/crashlytics', () => {
  return () => ({
    log: jest.fn(),
    recordError: jest.fn(),
    setUserId: jest.fn(),
  })
})

jest.mock('@react-native-firebase/dynamic-links', () => () => ({
  getInitialLink: jest.fn(() => Promise.resolve({ url: 'link' })),
  onLink: jest.fn(() => jest.fn),
}))

jest.mock('@react-native-firebase/messaging', () => {
  function messaging() {
    return {
      getInitialNotification: jest.fn(() => Promise.resolve()),
      onNotificationOpenedApp: jest.fn(() => jest.fn),
      onMessage: jest.fn().mockImplementation(() => () => 'onMessageResponse'),
      requestPermission: jest.fn().mockImplementation(() => -1),
      setBackgroundMessageHandler: jest.fn(),
      subscribeToTopic: jest.fn((topic) => Promise.resolve(topic)),
      unsubscribeFromTopic: jest.fn((topic) => Promise.resolve(topic)),
    }
  }

  messaging.AuthorizationStatus = {
    AUTHORIZED: 1,
  }

  return messaging
})

jest.mock('@react-native-firebase/perf', () => () => ({
  startTrace: jest.fn(),
}))

jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Reanimated = require('react-native-reanimated/mock')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const fn = () => {}
  Reanimated.default.call = () => undefined
  Reanimated.interpolate = fn
  Reanimated.makeMutable = fn
  Reanimated.runOnUI = () => fn
  Reanimated.useWorkletCallback = fn
  return Reanimated
})

// mocking native modules
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native')

  RN.NativeModules.RNComScore = {
    initialize: jest.fn().mockResolvedValue(null),
  }

  return RN
})

jest.mock('react-native/Libraries/Components/Switch/Switch', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mockComponent = require('react-native/jest/mockComponent')
  return {
    default: mockComponent('react-native/Libraries/Components/Switch/Switch'),
  }
})

jest.mock('@react-native-picker/picker', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const _react = require('react')
  class Picker extends _react.Component {
    static Item = (props: { children: never }): unknown => {
      return _react.createElement('Item', props, props.children)
    }

    render(): unknown {
      return _react.createElement('Picker', this.props, this.props.children)
    }
  }
  return { Picker }
})

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon')

//@ts-expect-error mock worklets for reanimated-v2
global.__reanimatedWorkletInit = jest.fn()
