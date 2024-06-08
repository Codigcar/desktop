import { useRestyle } from '@shopify/restyle'
import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'

import { text } from '../../theme/customRestyleFunctions'
import type { TextProps } from '../../theme'

export function autoLineHeight(
  fontSize?: TextProps['fontSize'],
): TextProps['lineHeight'] {
  if (!fontSize) return undefined
  switch (fontSize) {
    case 'xxs':
      return '3'
    case 'xs':
      return '4'
    case 'sm':
      return '5'
    case 'base':
      return '6'
    case 'lg':
    case 'xl':
      return '7'
    case '2xl':
      return '8'
    case '3xl':
      return '9'
    case '4xl':
      return '10'
    default:
      return undefined
  }
}

const Text: React.FC<RNTextProps & TextProps> = (props) => {
  const restyle = useRestyle(text, props)
  return <RNText {...restyle} />
}

export default Text
