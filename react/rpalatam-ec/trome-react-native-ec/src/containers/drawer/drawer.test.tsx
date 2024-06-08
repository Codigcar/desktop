import { fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { Platform } from 'react-native'

import DrawerContent, { subscreens } from './drawer'
import { useAuth } from '../../context/auth'
import { useMainNavigation } from '../../context/navigation'
import { NavCategory } from '../../utils/categories'
import { openInBrowser } from '../../utils/inappbrowser'
import { HomeWebviewRef } from '../../utils/refs'

jest.mock('../../context/auth')
const mockUseAuth = useAuth as jest.Mock

jest.mock('../../context/navigation')
jest.mock('../../utils/inappbrowser')

const mockOpenInBrowser = openInBrowser as jest.Mock
const mockUseMainNavigation = useMainNavigation as jest.Mock

const navigationProps = { closeDrawer: jest.fn(), navigate: jest.fn() }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const drawerContentProps: any = {
  navigation: navigationProps,
}

const mainNavigation: NavCategory[] = [
  {
    key: 'portada',
    label: 'Portada',
    path: '/category/portada',
    active: true,
    required: true,
    type: 'category',
  },
  {
    key: 'ultimo',
    label: 'Lo Último',
    path: '/category/ultimo',
    active: true,
    required: false,
    type: 'category',
  },
  {
    key: 'dt',
    label: 'DT',
    path: '/dt',
    active: false,
    required: false,
    type: 'category',
  },
  {
    key: 'tag',
    label: 'Tag',
    path: 'tag-slug',
    type: 'internal-page',
  },
  {
    key: 'external',
    label: 'saltar intro',
    path: 'https://domain-name.test/saltar-intro',
    type: 'external-page',
  },
]
const categories = mainNavigation.filter(
  (category) => category.type === 'category',
)

beforeAll(() => {
  mockUseAuth.mockReturnValue({ isAuthenticated: false, isSubscribed: false })
  mockUseMainNavigation.mockReturnValue({ categories, mainNavigation })
})

const injectJavaScript = jest.fn()
Object.defineProperty(HomeWebviewRef, 'current', {
  value: { injectJavaScript },
})

const Component: React.FC = () => <DrawerContent {...drawerContentProps} />

describe('Drawer component', () => {
  it('should navigate to page-path when tap internal-page button', () => {
    const [internalPage] = subscreens
    const { getByText } = render(<Component />)
    const internalButton = getByText(internalPage.name)
    fireEvent.press(internalButton)
    expect(navigationProps.navigate).toHaveBeenCalledWith(
      internalPage.path.screen,
      internalPage.path.params,
    )
  })

  it('should navigate in app when tap on non-internal category button', () => {
    const [nonInternalRoute] = mainNavigation.filter(
      ({ path }) => !path.includes('category'),
    )
    const { getByText } = render(<Component />)
    const categoryButton = getByText(nonInternalRoute.label)
    fireEvent.press(categoryButton)
    expect(navigationProps.closeDrawer).toHaveBeenCalled()
    expect(navigationProps.navigate).toHaveBeenLastCalledWith('News', {
      section: { name: nonInternalRoute.label, path: nonInternalRoute.path },
    })
  })

  it('should open category in browser when tap an internal category button', () => {
    const [internalRoute] = mainNavigation.filter(({ path }) =>
      path.includes('category'),
    )
    const { getByText } = render(<Component />)
    const categoryButton = getByText(internalRoute.label)
    fireEvent.press(categoryButton)
    const injectedJS = injectJavaScript.mock.calls.pop().pop()
    expect(injectedJS.includes(internalRoute.path)).toBe(true)
  })

  it('should open tag in browser when tap tag button', () => {
    const [internal] = mainNavigation.filter(
      ({ type }) => type === 'internal-page',
    )
    const { getByText } = render(<Component />)
    const tagButton = getByText(internal.label)
    fireEvent.press(tagButton)
    const injectedJS = injectJavaScript.mock.calls.pop().pop()
    expect(injectedJS.includes(`${internal.path}`)).toBe(true)
  })

  it('should open an external page when tap link button', () => {
    const [externalPage] = mainNavigation.filter(
      ({ type }) => type === 'external-page',
    )
    const { getByText } = render(<Component />)
    const externalPageLink = getByText(externalPage.label)
    fireEvent.press(externalPageLink)
    expect(mockOpenInBrowser).toHaveBeenCalledWith(externalPage.path)
  })

  it('should go to Auth when try to sign in', () => {
    const { getByText } = render(<Component />)
    const signIn = getByText(/iniciar\ssesión/i)

    fireEvent.press(signIn)
    expect(navigationProps.navigate).toHaveBeenLastCalledWith('Auth', {
      screen: 'InitialScreen',
    })
  })

  it('should subscription button on android', () => {
    Platform.OS = 'android'
    mockUseAuth.mockReturnValue({ isAuthenticated: true, isSubscribed: false })
    const { getByText, queryByText, rerender } = render(<Component />)
    fireEvent.press(getByText('Suscribirme'))

    Platform.OS = 'ios'
    rerender(<Component />)
    expect(queryByText('Suscribirme')).toBeNull()
  })
})
