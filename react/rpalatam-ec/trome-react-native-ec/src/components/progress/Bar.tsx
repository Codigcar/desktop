import { useTheme } from '@shopify/restyle'
import React, { useRef } from 'react'
import { Animated, ViewStyle } from 'react-native'

import type { Theme } from '../../theme'

type Props = {
  duration?: number
  height?: number
  width?: number
}

const Bar: React.FC<Props> = ({
  duration: durationValue = 1000,
  height: heightValue = 6,
  width: widthValue = 150,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current
  const { colors } = useTheme<Theme>()

  Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: durationValue,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: durationValue,
        useNativeDriver: true,
      }),
    ]),
  ).start()

  const styles: ViewStyle = {
    backgroundColor: colors.primary,
    elevation: 3,
    height: heightValue,
    width: widthValue,
    borderRadius: heightValue / 2,
  }

  const animatedStyles = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-widthValue, widthValue],
        }),
      },
    ],
  }

  return (
    <Animated.View style={[styles, animatedStyles]} testID="progress-bar" />
  )
}

export default Bar
