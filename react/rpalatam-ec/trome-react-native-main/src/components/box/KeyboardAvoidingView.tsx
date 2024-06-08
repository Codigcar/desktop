import React from 'react'
import {
  KeyboardAvoidingViewProps,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
} from 'react-native'

import Base from './Base'
import type { BoxProps } from '../../theme'

const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps & BoxProps> = (
  props,
) => {
  return <Base as={RNKeyboardAvoidingView} {...props} />
}

export default KeyboardAvoidingView
