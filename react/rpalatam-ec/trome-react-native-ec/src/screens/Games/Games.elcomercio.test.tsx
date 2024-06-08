import { DrawerActions, useNavigation } from '@react-navigation/native'
import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes'
import { ReactTestInstance } from 'react-test-renderer'

import GamesScreen from './Games.elcomercio'
import { openInBrowser } from '../../utils/inappbrowser'
jest.mock('../../utils/inappbrowser')

const mockDispatch = jest.fn()

jest.mock('@react-navigation/native')
const mockUseNavigation = useNavigation as jest.Mock
mockUseNavigation.mockReturnValue({
  dispatch: mockDispatch,
})

const mockOpenDrawer = DrawerActions.openDrawer as jest.Mock
mockOpenDrawer.mockReturnValue('open')

type Props = {
  onLoad(): void
  onShouldStartLoadWithRequest(event: Partial<ShouldStartLoadRequest>): boolean
}

const getProps = (instance: ReactTestInstance | null): Props => {
  return instance?.instance._reactInternals._debugOwner.pendingProps
}

describe('Games Screen', () => {
  it('should render webview games', () => {
    const { getByTestId } = render(<GamesScreen />)
    const webview = getByTestId('games-screen')
    expect(webview.props.source.uri).toBe('https://comercio.qualitygames.media')
  })

  it('should open menu', async () => {
    const { getByTestId } = render(<GamesScreen />)
    const drawerBtn = getByTestId('menu-button')
    fireEvent.press(drawerBtn)
    expect(mockDispatch).toHaveBeenLastCalledWith('open')
  })

  it('ribbon loading', () => {
    const { getByTestId, queryByTestId } = render(<GamesScreen />)
    const { parent } = getByTestId('games-screen')
    const { onLoad } = getProps(parent)

    expect(getByTestId('ribbon-loading')).toBeDefined()
    act(() => onLoad())
    expect(queryByTestId('ribbon-loading')).toBeNull()
  })

  it('open internal links', () => {
    const { getByTestId } = render(<GamesScreen />)
    const { parent } = getByTestId('games-screen')
    const { onShouldStartLoadWithRequest } = getProps(parent)

    const url = 'https://comercio.qualitygames.media/juegos'

    expect(onShouldStartLoadWithRequest({ url })).toBeTruthy()
    expect(openInBrowser).not.toBeCalled()
  })

  it('open external links', () => {
    const { getByTestId } = render(<GamesScreen />)
    const { parent } = getByTestId('games-screen')
    const { onShouldStartLoadWithRequest } = getProps(parent)

    const url = 'https://www.facebook.com/'

    expect(onShouldStartLoadWithRequest({ url })).toBeFalsy()
    expect(openInBrowser).toHaveBeenLastCalledWith(url)
  })
})
