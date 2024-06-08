import history, { State, To } from '../history'
import { HomeWebviewRef } from '../refs'

const injectJavaScript = jest.fn()
Object.defineProperty(HomeWebviewRef, 'current', {
  value: { injectJavaScript },
})

describe('history', () => {
  it('should inject js in webview when method push is called', () => {
    type Fn = (to: To, state?: State) => string
    const fn: Fn = (...args) => args.map((arg) => JSON.stringify(arg)).join(',')

    const path_one = '/one'
    history.push(path_one)
    expect(injectJavaScript).toHaveBeenLastCalledWith(
      expect.stringContaining(`push(${fn(path_one)})`),
    )

    const path_two = '/two'
    const state_two = { state: 'two' }
    history.push(path_two, state_two)
    expect(injectJavaScript).toHaveBeenLastCalledWith(
      expect.stringContaining(`push(${fn(path_two, state_two)})`),
    )

    const path_three = { pathname: '/path', search: '?ref=test' }
    const state_three = { state: 'three' }
    history.push(path_three, state_three)
    expect(injectJavaScript).toHaveBeenLastCalledWith(
      expect.stringContaining(`push(${fn(path_three, state_three)})`),
    )
  })

  it('should inject js in webview when method replace is called', () => {
    type Fn = (to: To, state?: State) => string
    const fn: Fn = (...args) => args.map((arg) => JSON.stringify(arg)).join(',')

    const path_one = '/one'
    history.replace(path_one)
    expect(injectJavaScript).toHaveBeenLastCalledWith(
      expect.stringContaining(`replace(${fn(path_one)})`),
    )

    const path_two = '/two'
    const state_two = { state: 'two' }
    history.replace(path_two, state_two)
    expect(injectJavaScript).toHaveBeenLastCalledWith(
      expect.stringContaining(`replace(${fn(path_two, state_two)})`),
    )

    const path_three = { pathname: '/path', search: '?ref=test' }
    const state_three = { state: 'three' }
    history.replace(path_three, state_three)
    expect(injectJavaScript).toHaveBeenLastCalledWith(
      expect.stringContaining(`replace(${fn(path_three, state_three)})`),
    )
  })

  it('should inject js in webview when method goBack is called', () => {
    history.back()
    expect(injectJavaScript).toHaveBeenLastCalledWith(
      expect.stringContaining(`window.appHistory?.goBack();`),
    )
  })
})
