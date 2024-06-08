import { act, fireEvent, render } from '@testing-utils/library'
import MockAxios from 'jest-mock-axios'
import React from 'react'

import Menu from './menu'
import { useAuth } from '../../context/auth'
import { SUBSCRIPTION_LANDING_URL } from '../../utils/constants'
import { openInBrowser } from '../../utils/inappbrowser'

jest.mock('../../context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockReturnValue({
  user: {},
  isAuthenticated: false,
  isSubscribed: false,
})

jest.mock('../../utils/inappbrowser')
jest.mock('../../utils/refs')

const MockNavigationResponse = {
  header: [
    {
      display_name: 'Leer Luego',
      screen: 'Favorite',
    },
  ],
  main: [
    {
      title: 'Secciones',
      data: [
        {
          display_name: 'Portada',
          screen: 'Home',
          params: { screen: 'Feed' },
        },
      ],
    },
  ],
  footer: [
    {
      display_name: 'Términos y condiciones de uso',
      url: 'https://elcomercio.pe/terminos-y-condiciones/',
    },
  ],
}

const navigation = { closeDrawer: jest.fn(), navigate: jest.fn() }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props: any = { navigation }

describe('Menu component', () => {
  beforeAll(() => {
    MockAxios.mockResponse({ data: MockNavigationResponse })
  })

  const { header, main, footer } = MockNavigationResponse

  it('should navigate to login when a quick access screen option and user is not registered', async () => {
    const { getByText } = render(<Menu {...props} />)
    await act(async () => undefined)
    fireEvent.press(getByText(header[0].display_name))
    expect(navigation.navigate).toHaveBeenLastCalledWith('Login')
  })

  it('should navigate to screen when tap internal screen option and user is registered', async () => {
    const mockUser = { first_name: 'test', last_name: 'test' }
    mockUseAuth.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isSubscribed: true,
    })
    const { getByText } = render(<Menu {...props} />)
    await act(async () => undefined)
    fireEvent.press(getByText(header[0].display_name))
    expect(navigation.navigate).toHaveBeenLastCalledWith(
      header[0].screen,
      undefined,
    )
  })

  it('should open navigate with params', async () => {
    const { getByText } = render(<Menu {...props} />)
    await act(async () => undefined)

    const { display_name, screen, params } = main[0].data[0]
    fireEvent.press(getByText(display_name))
    expect(navigation.navigate).toHaveBeenLastCalledWith(screen, params)
  })

  it('should open an external page when tap link button', async () => {
    const { display_name, url } = footer[0]
    const { getByText } = render(<Menu {...props} />)
    await act(async () => undefined)

    fireEvent.press(getByText(display_name))
    expect(openInBrowser).toHaveBeenLastCalledWith(url)
  })

  it('should go to sign up screen when you press button', async () => {
    mockUseAuth.mockReturnValue({ user: {}, isAuthenticated: false })
    const { getByText, toJSON } = render(<Menu {...props} />)
    await act(async () => undefined)

    expect(toJSON()).toMatchSnapshot()
    fireEvent.press(getByText('¡REGÍSTRATE!'))
    expect(navigation.navigate).toHaveBeenLastCalledWith('SignUp')
  })

  it('should open paywall modal when you are press subscription button', async () => {
    const mockUser = { first_name: 'jhon', last_name: 'doe' }
    mockUseAuth.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isSubscribed: false,
    })

    const { getByText, toJSON } = render(<Menu {...props} />)
    await act(async () => undefined)

    expect(toJSON()).toMatchSnapshot()
    fireEvent.press(getByText('¡SUSCRÍBETE!'))
    expect(openInBrowser).toBeCalledWith(SUBSCRIPTION_LANDING_URL)
  })

  it('should be a snapshot for subscriber', async () => {
    const mockUser = { first_name: 'jhon', last_name: 'doe' }
    mockUseAuth.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isSubscribed: true,
    })
    const { getByText, toJSON } = render(<Menu {...props} />)
    await act(async () => undefined)

    expect(getByText('Tienes una suscripción activa')).toBeDefined()
    expect(toJSON()).toMatchSnapshot()
  })

  it('should go to search screen when you press search button', async () => {
    const { getByText } = render(<Menu {...props} />)
    await act(async () => undefined)

    const length = navigation.closeDrawer.mock.calls.length
    fireEvent.press(getByText('Buscar'))
    expect(navigation.navigate).toHaveBeenLastCalledWith('Search')
    expect(navigation.closeDrawer).toHaveBeenCalledTimes(length + 1)
  })

  it('should go to profile screen when you press the account icon', async () => {
    const { getByTestId } = render(<Menu {...props} />)
    await act(async () => undefined)

    const length = navigation.closeDrawer.mock.calls.length
    fireEvent.press(getByTestId('icon-account'))
    expect(navigation.navigate).toHaveBeenLastCalledWith('Profile')
    expect(navigation.closeDrawer).toBeCalledTimes(length + 1)
  })
})
