import { HomeWebviewRef } from './refs'
import type { Hash, Path, Pathname, Search } from 'history'

/**
 * The pieces of a URL path.
 */
export interface PathPieces {
  pathname?: Pathname
  search?: Search
  hash?: Hash
}

/**
 * A URL path or an object that contains the pieces of a URL path.
 */
export type To = Path | PathPieces

/**
 * An object that is used to associate some arbitrary data with a location, but
 * that does not appear in the URL path.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/History/state
 */
export type State = Record<string, unknown> | null

/**
 * Methods of a history object exposed by react-router
 *
 * @see https://v5.reactrouter.com/web/api/history
 */
interface History {
  /**
   * Pushes a new location onto the history stack, increasing its length by one.
   * If there were any entries in the stack after the current one, they are
   * lost.
   *
   * @param to - The new URL
   * @param state - Data to associate with the new location
   */
  push(to: To, state?: State): void

  /**
   * Replaces the current location in the history stack with a new one.  The
   * location that was replaced will no longer be available.
   *
   * @param to - The new URL
   * @param state - Data to associate with the new location
   */
  replace(to: To, state?: State): void

  /**
   * Navigates to the previous entry in the stack. Identical to go(-1).
   *
   * Warning: if the current location is the first location in the stack, this
   * will unload the current document.
   */
  back(): void
}

/**
 * Methods of a history object exposed in home webview to modify
 * web location from native side
 */
const history: History = {
  push(...args) {
    const str = args.map((arg) => JSON.stringify(arg)).join(',')
    const js = `
      if (window.appHistory) window.appHistory.push(${str});
    `
    HomeWebviewRef.current?.injectJavaScript(`(function(){${js}})();`)
  },
  replace(...args) {
    const str = args.map((arg) => JSON.stringify(arg)).join(',')
    const js = `
      if (window.appHistory) window.appHistory.replace(${str});
    `
    HomeWebviewRef.current?.injectJavaScript(`(function(){${js}})();`)
  },
  back() {
    const js = `
     window.appHistory?.goBack();
    `
    HomeWebviewRef.current?.injectJavaScript(`(function(){${js}})();`)
  },
}

export default history
