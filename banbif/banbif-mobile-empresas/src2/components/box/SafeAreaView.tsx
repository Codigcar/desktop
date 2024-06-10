import React from 'react'
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context'

import Base from './Base'
import { BoxProps } from '../../theme'

const SafeAreaView: React.FC<
  React.ComponentProps<typeof RNSafeAreaView> & BoxProps
> = (props) => {
  return <Base as={RNSafeAreaView} {...props} />
}

export default SafeAreaView
