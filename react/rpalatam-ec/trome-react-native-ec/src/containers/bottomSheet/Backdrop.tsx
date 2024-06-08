import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { useTheme } from '@shopify/restyle'
import React, { useMemo } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'

import type { Theme } from '../../theme'

type BackDropProps = BottomSheetBackdropProps & {
  onPress: () => void
}

const Backdrop: React.FC<BackDropProps> = ({
  animatedIndex,
  onPress,
  style,
}) => {
  const { colors } = useTheme<Theme>()

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP,
    ),
  }))

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: `${colors.black}b3`,
      },
      containerAnimatedStyle,
    ],
    [colors.black, style, containerAnimatedStyle],
  )

  const backgroundStyle = { height: '100%' }

  return (
    <Animated.View style={containerStyle}>
      <TouchableWithoutFeedback
        testID="backdrop-touchable"
        style={backgroundStyle}
        onPress={onPress}
      />
    </Animated.View>
  )
}

export default Backdrop
