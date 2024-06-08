import React from 'react'
import { View as RNView, ViewProps } from 'react-native'

import Base from './Base'
import type { BoxProps } from '../../theme'

const View: React.FC<ViewProps & BoxProps> = (props) => {
  return <Base as={RNView} {...props} />
}

export default View
