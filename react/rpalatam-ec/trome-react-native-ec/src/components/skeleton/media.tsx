import React from 'react'
import { ViewProps, ViewStyle } from 'react-native'

import theme from '../../theme'
import Box from '../box'

type Props = {
  type?: 'full' | 'magazine'
  mb?: keyof typeof theme.spacing
  mt?: keyof typeof theme.spacing
} & ViewProps

function Media({ type = 'full', ...rest }: Props): JSX.Element {
  const styles: ViewStyle = {
    alignSelf: 'stretch',
    paddingBottom: '56.25%',
    width: type === 'magazine' ? 120 : '100%',
  }

  return <Box.View style={styles} bg="textTransparent" {...rest} />
}

export default Media
