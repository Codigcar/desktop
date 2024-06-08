import React from 'react'
import { TextProps as RNTextProps } from 'react-native'

import Text, { autoLineHeight } from './Text'
import { openInBrowser } from '../../utils/inappbrowser'
import type { TextProps } from '../../theme'

type Props = Omit<TextProps, 'color' | 'fontFamily'> & {
  to?: string
}

const Link: React.FC<Props & RNTextProps> = (props) => {
  const {
    fontSize = 'base',
    fontWeight = 'bold',
    lineHeight,
    onPress,
    to,
    ...rest
  } = props

  return (
    <Text
      color="link"
      fontFamily="body"
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight || autoLineHeight(fontSize)}
      onPress={(event) => {
        if (to) openInBrowser(to)
        onPress?.(event)
      }}
      {...rest}
    />
  )
}

export default Link
