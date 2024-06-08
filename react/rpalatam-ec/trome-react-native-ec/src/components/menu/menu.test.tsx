import { render } from '@testing-utils/library'
import React from 'react'
import { View } from 'react-native'

import { useContextMenu } from './container'
import Menu from './menu'

describe('Test menu component', () => {
  const TestChildrenComponent: React.FC = () => {
    const { updateMenuState } = useContextMenu()
    return !!updateMenuState ? <View testID="check-context-function" /> : null
  }

  it('should render correctly', () => {
    const { getByTestId } = render(
      <Menu.Container>
        <Menu.Item testID="menu-element" />
      </Menu.Container>,
    )
    expect(getByTestId('menu-element')).toBeDefined()
  })

  it('menu hook', () => {
    const { getByTestId } = render(
      <Menu.Container>
        <TestChildrenComponent />
      </Menu.Container>,
    )
    expect(getByTestId('check-context-function')).toBeDefined()
  })
})
