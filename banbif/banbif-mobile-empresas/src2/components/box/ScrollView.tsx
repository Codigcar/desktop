import React from 'react'
import { ScrollView as RNScrollView, ScrollViewProps } from 'react-native'

import Base from './Base'
import type { BoxProps } from '../../theme'

const ScrollView: React.FC<ScrollViewProps & BoxProps> = (props) => {
  return <Base as={RNScrollView} {...props} />
}

export default ScrollView
