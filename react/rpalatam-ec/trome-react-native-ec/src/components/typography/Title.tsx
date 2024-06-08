import React from 'react'
import { TextProps as RNTextProps } from 'react-native'

import Text, { autoLineHeight } from './Text'
import type { TextProps } from '../../theme'

type Props = Omit<TextProps, 'fontFamily'>

const Title: React.FC<Props & RNTextProps> = ({ lineHeight, ...props }) => {
  return (
    <Text
      fontFamily="display"
      lineHeight={lineHeight || autoLineHeight(props.fontSize)}
      {...props}
    />
  )
}

export default Title
