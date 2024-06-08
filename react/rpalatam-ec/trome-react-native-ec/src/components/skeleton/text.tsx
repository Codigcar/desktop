import React from 'react'
import { ViewProps } from 'react-native'
import theme from '../../theme'
import Box from '../box'

type Props = ViewProps & {
  size?: 'small' | 'medium'
  fullWidth?: boolean
  repeat?: number
  spaceBetweenItems?: keyof typeof theme.spacing
  mt?: keyof typeof theme.spacing
}

const heightSizes = {
  small: 12,
  medium: 22,
  large: 36,
}

function Text({
  size = 'small',
  fullWidth,
  spaceBetweenItems,
  repeat = 1,
  ...rest
}: Props): JSX.Element {
  return (
    <Box.View {...rest}>
      {Array.from({ length: repeat }).map((_, i) => (
        <Box.View
          key={i}
          width={fullWidth ? '100%' : '50%'}
          height={heightSizes[size]}
          bg="textTransparent"
          mb={repeat > 1 && i < repeat - 1 ? spaceBetweenItems : '0'}
        />
      ))}
    </Box.View>
  )
}

export default Text
