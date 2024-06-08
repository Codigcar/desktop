import { App } from './config'

declare global {
  interface Window {
    __REACT_NATIVE_CONTEXT_TOPICS__?: boolean
    __REACT_NATIVE_SCREENS_AUTH_SIGNWALL__?: boolean
    __REACT_NATIVE_SCREENS_PAYWALL_MODAL__?: boolean
    __REACT_NATIVE_SCREENS_STORY__?: boolean
    __REACT_NATIVE_SCREENS_STORY_V2__?: boolean
  }
}

/**
 * Flags coming from the native side
 */
export const RN_CONTEXT_TOPICS = () => !!window.__REACT_NATIVE_CONTEXT_TOPICS__
export const RN_SCREENS_AUTH_SIGNWALL = () =>
  !!window.__REACT_NATIVE_SCREENS_AUTH_SIGNWALL__
export const RN_SCREENS_PAYWALL_MODAL = () =>
  !!window.__REACT_NATIVE_SCREENS_PAYWALL_MODAL__
export const RN_SCREENS_STORY = () => !!window.__REACT_NATIVE_SCREENS_STORY__
export const RN_SCREENS_STORY_V2 = () =>
  !!window.__REACT_NATIVE_SCREENS_STORY_V2__

/**
 * Flags to activate web side functionality
 */
export const WEB_PROJECT_EC_APP = App.select({
  elcomercio: process.env.REACT_APP_ENVIRONMENT === 'development',
  default: false,
})
