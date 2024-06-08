import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'

import { App } from '../../utils/config'

/* eslint-disable @typescript-eslint/no-var-requires */
const BottomTabBar = App.select<React.FC<BottomTabBarProps>>({
  elcomercio: require('./BottomTabBar.elcomercio').default,
  gestion: require('./BottomTabBar').default,
  default: () => null,
})

export default BottomTabBar
