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

import * as styles from './styles'
import IconChevronLeft from '../../assets/icons/elcomercio/chevron-left.svg'
import { App } from '../../utils/config'
import Box from '../box'
import Bar from '../progress/Bar'
import Typography from '../typography'
import type { Theme } from '../../theme'

type RibbonProps = {
  style?: StyleProp<ViewStyle>
  loading?: boolean
  title?: string
  titleStyle?: StyleProp<ViewStyle & TextStyle>
  LeftComponent?: React.ComponentType | null
  RigthComponent?: React.ComponentType | null
}
const { View } = Box

const GoBackComponent: React.FC = () => {
  const navigation = useNavigation()
  const { colors } = useTheme<Theme>()

  const childrenBtn = App.select({
    elcomercio: (
      <View height={16} width={16}>
        <IconChevronLeft fill={colors['stroke.1']} height={16} width={16} />
      </View>
    ),
    default: (
      <Icon size={32} name="chevron-left" color={colors['coolGray-700']} />
    ),
  })

  return (
    <TouchableWithoutFeedback
      hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
      onPress={() => {
        Keyboard.dismiss()
        navigation.goBack()
      }}
      testID="goback-button">
      {childrenBtn}
    </TouchableWithoutFeedback>
  )
}

const TitleComponent: React.FC<{
  title?: string
  titleStyle?: StyleProp<ViewStyle & TextStyle>
}> = ({ title, titleStyle: customTitleStyle }) => {
  const window = useWindowDimensions()
  const titleStyle = [{ maxWidth: window.width - 16 * 6 }, customTitleStyle]
  const style = App.select({
    elcomercio: customTitleStyle,
    default: titleStyle,
  })

  return (
    <Typography.Paragraph
      numberOfLines={1}
      {...styles.titleStyle}
      style={style}>
      {title}
    </Typography.Paragraph>
  )
}

const Ribbon: React.FC<RibbonProps> = ({
  children,
  style,
  loading,
  title,
  titleStyle,
  LeftComponent,
  RigthComponent,
}) => {
  const insets = useSafeAreaInsets()
  const window = useWindowDimensions()

  return (
    <Box.View
      elevation={3}
      shadowOffset={{ width: 0, height: 1 }}
      shadowOpacity={0.16}
      shadowRadius={2.22}
      shadowColor="black"
      style={[{ paddingTop: Math.max(insets.top, 0) }, style]}
      zIndex={1}
      {...styles.container}>
      <Box.View
        alignItems="center"
        flexDirection="row"
        px="0.5"
        {...styles.innerContainer}>
        <Box.View position="absolute" left={8} zIndex={1}>
          {!LeftComponent ? <GoBackComponent /> : <LeftComponent />}
        </Box.View>
        <Box.View
          flex={1}
          pl={!LeftComponent ? '0.25' : '0'}
          ml={!LeftComponent ? '2' : '0'}>
          {!children ? (
            <TitleComponent title={title} titleStyle={titleStyle} />
          ) : (
            children
          )}
        </Box.View>
        <Box.View position="absolute" right={8} zIndex={1}>
          {!RigthComponent ? null : <RigthComponent />}
        </Box.View>
      </Box.View>
      {loading ? (
        <View position="absolute" bottom={-3.8} testID="ribbon-loading">
          <Bar width={window.width} />
        </View>
      ) : null}
    </Box.View>
  )
}

export default Ribbon
