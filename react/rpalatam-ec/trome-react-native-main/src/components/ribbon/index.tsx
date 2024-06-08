import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React from 'react'
import {
  Keyboard,
  StyleProp,
  TextStyle,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Theme } from '../../theme'
import { App } from '../../utils/config'
import Box from '../box'
import Typography from '../typography'

type RibbonProps = {
  title?: string
  titleStyle?: StyleProp<ViewStyle & TextStyle>
  LeftComponent?: React.ComponentType | null
  RigthComponent?: React.ComponentType | null
}

const Ribbon: React.FC<RibbonProps> = ({
  children,
  title,
  titleStyle: customTitleStyle,
  LeftComponent,
  RigthComponent,
}) => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const { colors } = useTheme<Theme>()
  const window = useWindowDimensions()

  const titleStyle = [
    { flex: 1, maxWidth: window.width - 16 * 6 },
    customTitleStyle,
  ]

  return (
    <Box.View
      bg="background"
      borderBottomWidth={App.key === 'elcomercio' ? 1 : 0}
      borderBottomColor="primary"
      elevation={3}
      shadowOffset={{ width: 0, height: 1 }}
      shadowOpacity={0.16}
      shadowRadius={2.22}
      shadowColor="black"
      style={{ paddingTop: Math.max(insets.top, 0) }}
      zIndex={1}>
      <Box.View
        height={48}
        alignItems="center"
        flexDirection="row"
        justifyContent="center"
        px="0.5">
        <Box.View position="absolute" left={8} zIndex={1}>
          {!LeftComponent ? (
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss()
                navigation.goBack()
              }}
              testID="goback-button">
              <Icon
                size={32}
                name="chevron-left"
                color={colors['coolGray-700']}
              />
            </TouchableWithoutFeedback>
          ) : (
            <LeftComponent />
          )}
        </Box.View>
        {!children ? (
          <Typography.Paragraph
            textAlign="center"
            color="coolGray-700"
            fontWeight="bold"
            numberOfLines={1}
            style={titleStyle}>
            {title}
          </Typography.Paragraph>
        ) : (
          <Box.View flex={1} ml={!LeftComponent ? '2.5' : '0'}>
            {children}
          </Box.View>
        )}
        <Box.View position="absolute" right={8} zIndex={1}>
          {!RigthComponent ? null : <RigthComponent />}
        </Box.View>
      </Box.View>
    </Box.View>
  )
}

export default Ribbon
