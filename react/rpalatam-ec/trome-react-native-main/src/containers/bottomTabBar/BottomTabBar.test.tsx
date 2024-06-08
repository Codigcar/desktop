import { DrawerActions } from '@react-navigation/native'
import { fireEvent, render } from '@testing-utils/library'
import React from 'react'

import BottomTabBar from './BottomTabBar'
import { App } from '../../utils/config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props: any = {
  descriptors: {
    feed: { options: { tabBarAccessibilityLabel: 'Inicio' } },
    profile: { options: { tabBarAccessibilityLabel: 'Perfil' } },
  },
  state: {
    index: 0,
    routes: [
      { key: 'feed', name: 'Feed' },
      { key: 'profile', name: 'Profile' },
    ],
  },
  navigation: {
    emit: jest.fn().mockReturnValue({ defaultPrevented: false }),
    navigate: jest.fn(),
    dispatch: jest.fn(),
  },
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

  it('should open the drawer', () => {
    const dispatch = jest.spyOn(props.navigation, 'dispatch')
    const { getByA11yLabel, queryByA11yLabel, rerender } = render(
      <BottomTabBar {...props} />,
    )

    expect(queryByA11yLabel('secciones')).toBeNull()

    App.key = 'gestion'
    rerender(<BottomTabBar {...props} />)

    fireEvent.press(getByA11yLabel('secciones'))

    expect(dispatch).toBeCalledWith(DrawerActions.openDrawer())
  })
})
