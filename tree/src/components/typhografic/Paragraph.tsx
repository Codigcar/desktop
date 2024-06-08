import React from 'react'
import { TextProps as RNTextProps } from 'react-native'

import Text, { TextProps2, autoLineHeight } from './Text'
import type { TextProps } from '../../theme'

const Paragraph: React.FC<TextProps2> = (props) => {
  return (
    <Text
    color="trueGray-900"
    {...props}
    />
  )
}

export default Paragraph
