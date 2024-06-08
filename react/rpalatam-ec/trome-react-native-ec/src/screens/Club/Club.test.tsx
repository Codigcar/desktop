import { DrawerActions, useNavigation } from '@react-navigation/native'
import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { Platform } from 'react-native'
import { WebViewNavigation } from 'react-native-webview'
import { ReactTestInstance } from 'react-test-renderer'

import Club from './Club'
import { openInBrowser } from '../../utils/inappbrowser'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock

jest.mock('../../utils/inappbrowser')

type Props = {
  onLoadEnd(): void
  onLoadStart(): void
  onNavigationStateChange(event: Partial<WebViewNavigation>): void
}

const getProps = (instance: ReactTestInstance | null): Props => {
  return instance?.instance._reactInternals._debugOwner.pendingProps
}

describe('Club', () => {
  it('open drawer', () => {
    const openDrawer = jest.spyOn(DrawerActions, 'openDrawer')
    const dispatch = jest.fn()
    mockUseNavigation.mockReturnValueOnce({ dispatch })

    const { getByA11yLabel } = render(<Club />)
    fireEvent.press(getByA11yLabel('Menu'))
    expect(dispatch).toBeCalled()
    expect(openDrawer).toBeCalled()
  })

  it('ribbon loading', () => {
    const { getByTestId, queryByTestId } = render(<Club />)
    const { parent } = getByTestId('club-webview')
    const { onLoadStart, onLoadEnd } = getProps(parent)

    act(() => onLoadStart())
    expect(getByTestId('ribbon-loading')).toBeDefined()
    act(() => onLoadEnd())
    expect(queryByTestId('ribbon-loading')).toBeNull()
  })

  describe('load request', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      jest.spyOn(Platform, 'select').mockReturnValue(true)
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn())
    })

    it('open external links in browser', () => {
      const { getByTestId } = render(<Club />)
      const { parent } = getByTestId('club-webview')
      const { onNavigationStateChange: fn } = getProps(parent)

      const url = 'https://domain.com'
      act(() => fn({ url }))
      expect(openInBrowser).toBeCalledWith(url)
    })

    it('not open "information" pathname', () => {
      const { getByTestId } = render(<Club />)
      const { parent } = getByTestId('club-webview')
      const { onNavigationStateChange: fn } = getProps(parent)

      const url = 'https://clubelcomercio.pe/informacion/'
      act(() => fn({ url }))
      expect(openInBrowser).toBeCalledWith(url)
    })

    it('open clubelcomercio links', () => {
      const { getByTestId } = render(<Club />)
      const { parent } = getByTestId('club-webview')
      const { onNavigationStateChange: fn } = getProps(parent)

      act(() => fn({ url: 'https://clubelcomercio.pe/' }))
      expect(openInBrowser).not.toBeCalled()
      act(() => fn({ url: 'https://clubelcomercio.pe/p/1' }))
      expect(openInBrowser).not.toBeCalled()
    })
  })
})
