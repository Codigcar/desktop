import { useTheme } from '@shopify/restyle'
import React from 'react'
import { TouchableNativeFeedback } from 'react-native'
import {
  RenderItemParams,
  ShadowDecorator,
} from 'react-native-draggable-flatlist'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Box from '../../components/box'
import Typography from '../../components/typography'
import type { Theme } from '../../theme'
import type { NavCategory } from '../../utils/categories'

const { View } = Box
const { Paragraph } = Typography

type Props = RenderItemParams<NavCategory> & {
  toggle: (key: string) => void
}

const CategoryItem: React.FC<Props> = ({ drag, isActive, item, toggle }) => {
  const { colors } = useTheme<Theme>()
  const { label, required, active } = item

  return (
    <ShadowDecorator>
      <View bg="background" elevation={isActive ? 12 : 0}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(
            colors['coolGray-200'],
            true,
          )}
          onLongPress={drag}
          onPress={() => {
            if (!required) toggle(item.key)
          }}
          disabled={isActive}>
          <View
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
            pl="1.5"
            pr="1"
            py="1">
            <Paragraph color="coolGray-700" fontWeight="bold" fontSize="sm">
              {label}
            </Paragraph>
            {!required ? (
              <View
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
                width={60}>
                <View
                  testID="checkbox-category"
                  width={24}
                  height={24}
                  alignItems="center"
                  justifyContent="center">
                  <Icon
                    name={active ? 'home-remove' : 'home-plus'}
                    color={active ? colors.danger : colors.link}
                    size={24}
                    testID={`icon-check-${item.key}`}
                  />
                </View>
                <View
                  width={24}
                  height={24}
                  alignItems="center"
                  justifyContent="center">
                  <Icon
                    name="reorder-horizontal"
                    color={colors.text}
                    size={20}
                    testID={`icon-reorder-${item.key}`}
                  />
                </View>
              </View>
            ) : null}
          </View>
        </TouchableNativeFeedback>
      </View>
    </ShadowDecorator>
  )
}

export default CategoryItem
