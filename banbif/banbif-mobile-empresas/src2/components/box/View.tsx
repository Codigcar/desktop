import React from 'react'
import { View as RNView, ViewProps } from 'react-native'

import Base from './Base'
import { BoxProps } from '@shopify/restyle'
import { Theme } from '../../theme'

const View: React.FC<ViewProps & BoxProps<Theme>> = (props) => {
  return <Base as={RNView} {...props} />
}

export default View
