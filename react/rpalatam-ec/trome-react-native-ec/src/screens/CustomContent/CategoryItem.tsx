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
import { AllProps } from '../../theme/index'
import { App } from '../../utils/config'
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

  const bodyStyle = App.select<AllProps>({
    elcomercio: { pr: '0.25' },
    default: {
      pl: '1.5',
      pr: '1',
    },
  })

  const labelStyle = App.select<AllProps>({
    elcomercio: { color: 'text.3' },
    default: {
      color: 'coolGray-700',
      fontWeight: 'bold',
    },
  })

  const containerStyles = App.select<AllProps>({
    elcomercio: { paddingHorizontal: '1.5' },
    default: { paddingHorizontal: '0' },
  })

  const homeIconName = active ? 'home-remove' : 'home-plus'
  const homeIconColor = active ? colors.danger : colors.link

  return (
    <ShadowDecorator>
      <View bg="background" elevation={isActive ? 12 : 0} {...containerStyles}>
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
            py="1"
            {...bodyStyle}>
            <Paragraph fontSize="sm" {...labelStyle}>
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
                    name={homeIconName}
                    color={homeIconColor}
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
