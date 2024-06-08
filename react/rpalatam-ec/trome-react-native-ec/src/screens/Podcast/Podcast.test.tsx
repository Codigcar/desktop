import { useNavigation, useRoute } from '@react-navigation/native'
import { act, render } from '@testing-utils/library'
import React from 'react'
import { Platform } from 'react-native'
import { WebViewNavigation } from 'react-native-webview'
import { ReactTestInstance } from 'react-test-renderer'

import Podcast from './Podcast'
import { openInBrowser } from '../../utils/inappbrowser'

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
const mockUseRoute = useRoute as jest.Mock

jest.mock('../../utils/inappbrowser')

type Props = {
  onLoadEnd(): void
  onLoadStart(): void
  onNavigationStateChange(event: Partial<WebViewNavigation>): void
}

const getProps = (instance: ReactTestInstance | null): Props => {
  return instance?.instance._reactInternals._debugOwner.pendingProps
}

describe('Podcast', () => {
  beforeAll(() => {
    mockUseRoute.mockReturnValue({})
  })

  it('source uri without program', () => {
    const { getByTestId } = render(<Podcast />)
    const { props } = getByTestId('podcast-webview')
    expect(props.source.uri).toBe('https://elcomercio.pe/podcast/')
  })

  it('source uri with program', () => {
    mockUseRoute.mockReturnValueOnce({ params: { program: 'program-slug' } })
    const { getByTestId } = render(<Podcast />)
    const { props } = getByTestId('podcast-webview')
    expect(props.source.uri).toBe('https://elcomercio.pe/podcast/program-slug/')
  })

  it('ribbon loading', () => {
    const { getByTestId, queryByTestId } = render(<Podcast />)
    const { parent } = getByTestId('podcast-webview')
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
      const { getByTestId } = render(<Podcast />)
      const { parent } = getByTestId('podcast-webview')
      const { onNavigationStateChange: fn } = getProps(parent)

      const url = 'https://domain.com'
      act(() => fn({ url }))
      expect(openInBrowser).toBeCalledWith(url)
    })

    it('push screen in new screen', () => {
      const push = jest.fn()
      mockUseNavigation.mockReturnValueOnce({ push })
      const { getByTestId } = render(<Podcast />)
      const { parent } = getByTestId('podcast-webview')
      const { onNavigationStateChange: fn } = getProps(parent)

      const url = 'https://elcomercio.pe/podcast/deporte-total/'
      act(() => fn({ url }))
      expect(push).toBeCalledWith('Podcast', { program: 'deporte-total' })
    })

    it('not push screen for the same program', () => {
      const push = jest.fn()
      mockUseNavigation.mockReturnValue({ push })
      mockUseRoute.mockReturnValueOnce({ params: { program: 'deporte-total' } })
      const { getByTestId } = render(<Podcast />)
      const { parent } = getByTestId('podcast-webview')
      const { onNavigationStateChange: fn } = getProps(parent)

      const url = 'https://elcomercio.pe/podcast/deporte-total/'
      act(() => fn({ url }))
      expect(push).not.toBeCalled()
    })
  })
})
