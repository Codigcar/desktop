import { LayoutProps } from '@shopify/restyle'
import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

import Media from './media'
import Text from './text'
import { Theme } from '../../theme'
import Box from '../box'
import { ViewProps } from '../box/types'

type Props = LayoutProps<Theme> &
  ViewProps & {
    timing?: number
  }

const Group: React.FC<Props> = ({ children, timing = 800, ...rest }) => {
  const animatedValue = useRef(new Animated.Value(0.5)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: timing,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.5,
          duration: timing,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [animatedValue, timing])

  const animatedStyles = {
    opacity: animatedValue.interpolate({
      inputRange: [0.5, 1],
      outputRange: [0.2, 0.8],
    }),
  }

  return (
    <Animated.View style={animatedStyles}>
      <Box.View {...rest} />
      {children}
    </Animated.View>
  )
}

const Skeleton = {
  AnimatedGroup: Group,
  Text,
  Media,
}

export default Skeleton
