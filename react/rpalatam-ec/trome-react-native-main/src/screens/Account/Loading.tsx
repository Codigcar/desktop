import { useTheme } from '@shopify/restyle'
import React from 'react'
import { ActivityIndicator } from 'react-native'

import Box from '../../components/box'
import { Theme } from '../../theme'

const { View } = Box

const Loading: React.FC = () => {
  const { colors } = useTheme<Theme>()
  return (
    <View
      position="absolute"
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
      zIndex={1}
      style={{
        backgroundColor: `${colors.background}b3`,
      }}>
      <ActivityIndicator size="large" color={colors.link} />
    </View>
  )
}

export default Loading
