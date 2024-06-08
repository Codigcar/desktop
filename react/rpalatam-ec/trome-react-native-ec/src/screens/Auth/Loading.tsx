import { useTheme } from '@shopify/restyle'
import React from 'react'
import { ActivityIndicator } from 'react-native'

import Box from '../../components/box'
import { Theme } from '../../theme'

const { View } = Box

type Props = {
  height?: number
}

const Loading: React.FC<Props> = ({ height }) => {
  const { colors } = useTheme<Theme>()
  return (
    <View
      position="absolute"
      alignItems="center"
      justifyContent="center"
      height={height || '100%'}
      style={{ backgroundColor: `${colors.background}b3` }}
      width="100%"
      testID="loading">
      <ActivityIndicator color={colors.link} size="large" />
    </View>
  )
}

export default Loading
