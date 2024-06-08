import { useTheme } from '@shopify/restyle'
import React from 'react'
import { Platform, Switch, TouchableNativeFeedback } from 'react-native'
import {
  RenderItemParams,
  ShadowDecorator,
} from 'react-native-draggable-flatlist'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Box from '../../components/box'
import Typography from '../../components/typography'
import { useThemeContext } from '../../context/theme'
import type { Theme } from '../../theme'
import type { NavCategory } from '../../utils/categories'

const { View } = Box
const { Paragraph } = Typography
const iconDragName = Platform.OS === 'ios' ? 'drag-horizontal-variant' : 'drag'

type Props = RenderItemParams<NavCategory> & {
  toggle: (item: NavCategory) => void
}

export const CategoryItem: React.FC<{
  item: NavCategory
  toggle: (item: NavCategory) => void
}> = ({ item, toggle }) => {
  const { colors } = useTheme<Theme>()
  const { currentTheme } = useThemeContext()
  const { label, required } = item

  const switchBg = currentTheme === 'light' ? '#78788029' : '#484848'
  const thumbColor = currentTheme === 'light' ? '#FFFFFF' : '#D1D1D1'

  if (required) {
    return (
      <View p="1">
        <Paragraph color="coolGray-700" fontWeight="bold" fontSize="sm">
          {label}
        </Paragraph>
      </View>
    )
  }

  return (
    <View
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      p="1">
      <View flexDirection="row" alignItems="center">
        {item.active ? (
          <View
            alignItems="center"
            height={24}
            justifyContent="center"
            mr="0.75"
            width={24}>
            <Icon
              color={colors.text}
              name={iconDragName}
              size={20}
              testID={`icon-drag-${item.key}`}
            />
          </View>
        ) : null}
        <Paragraph color="coolGray-700" fontWeight="bold" fontSize="sm">
          {label}
        </Paragraph>
      </View>

      <Switch
        trackColor={{
          false: switchBg,
          true: colors.link,
        }}
        ios_backgroundColor={switchBg}
        onValueChange={() => toggle(item)}
        testID={`icon-switch-${item.key}`}
        thumbColor={thumbColor}
        value={item.active}
      />
    </View>
  )
}

const DragCategoryItem: React.FC<Props> = ({
  drag,
  isActive,
  item,
  toggle,
}) => {
  const { colors } = useTheme<Theme>()

  return (
    <ShadowDecorator>
      <View bg="background" elevation={isActive ? 12 : 0}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(
            colors['coolGray-200'],
            true,
          )}
          onLongPress={drag}
          disabled={isActive}>
          <View>
            <CategoryItem item={item} toggle={toggle} />
          </View>
        </TouchableNativeFeedback>
      </View>
    </ShadowDecorator>
  )
}

export default DragCategoryItem
