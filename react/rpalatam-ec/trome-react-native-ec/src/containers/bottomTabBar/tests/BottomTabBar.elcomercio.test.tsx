import { fireEvent, render } from '@testing-utils/library'
import React from 'react'

import { useAuth } from '../../../context/auth'
import { App } from '../../../utils/config'
import BottomTabBar from '../BottomTabBar.elcomercio'

App.key = 'elcomercio'

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockImplementation(() => ({
  isAuthenticated: false,
  user: {},
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props: any = {
  descriptors: {
    feed: { options: { tabBarAccessibilityLabel: 'Inicio' } },
    profile: { options: { tabBarAccessibilityLabel: 'Perfil' } },
    myNews: { options: { tabBarAccessibilityLabel: 'Mis noticias' } },
  },
  state: {
    index: 0,
    routes: [
      { key: 'feed', name: 'Feed' },
      { key: 'profile', name: 'Profile' },
      { key: 'myNews', name: 'MyNews' },
    ],
  },
  navigation: { navigate: jest.fn() },
}

describe('bottom tab bar', () => {
  it('render tab active', () => {
    const { getByA11yLabel } = render(<BottomTabBar {...props} />)
    expect(getByA11yLabel('Inicio')).toHaveProp('accessibilityState', {
      selected: true,
    })
  })

  it('render tab inactive', () => {
    const { getByA11yLabel } = render(<BottomTabBar {...props} />)
    expect(getByA11yLabel('Perfil')).toHaveProp('accessibilityState', {
      selected: false,
    })
  })

  it('should navigate when tab is selected', () => {
    jest.clearAllMocks()
    const navigate = jest.spyOn(props.navigation, 'navigate')
    const { getByA11yLabel } = render(<BottomTabBar {...props} />)

    fireEvent.press(getByA11yLabel('Perfil'))
    expect(navigate).toBeCalledWith('Profile')
  })

  it('should not navigate when tab is focused', () => {
    jest.clearAllMocks()
    const navigate = jest.spyOn(props.navigation, 'navigate')
    const { getByA11yLabel } = render(<BottomTabBar {...props} />)

    fireEvent.press(getByA11yLabel('Inicio'))
    expect(navigate).not.toBeCalled()
  })

  it('should open signwall when tab is MyNews and user is not authenticated', () => {
    const navigate = jest.spyOn(props.navigation, 'navigate')
    const { getByA11yLabel } = render(<BottomTabBar {...props} />)

    fireEvent.press(getByA11yLabel(/Mis\snoticias/))
    expect(navigate).toBeCalledWith('Login')
  })

  it('should navigate to MyNews when user is authenticated', () => {
    mockUseAuth.mockImplementation(() => ({
      isAuthenticated: true,
      user: { id: 'id' },
    }))
    const navigate = jest.spyOn(props.navigation, 'navigate')
    const { getByA11yLabel } = render(<BottomTabBar {...props} />)

    fireEvent.press(getByA11yLabel(/Mis\snoticias/))
    expect(navigate).toBeCalledWith('MyNews')
  })
})
