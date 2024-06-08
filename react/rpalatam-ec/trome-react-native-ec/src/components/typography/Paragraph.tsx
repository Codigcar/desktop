import React from 'react'
import { TextProps as RNTextProps } from 'react-native'

import Text, { autoLineHeight } from './Text'
import type { TextProps } from '../../theme'

type Props = Omit<TextProps, 'fontFamily'>

const Paragraph: React.FC<Props & RNTextProps> = (props) => {
  const { fontSize = 'base', lineHeight, ...rest } = props
  return (
    <Text
      fontFamily="body"
      fontSize={fontSize}
      lineHeight={lineHeight || autoLineHeight(fontSize)}
      {...rest}
    />
  )
}

export default Paragraph
