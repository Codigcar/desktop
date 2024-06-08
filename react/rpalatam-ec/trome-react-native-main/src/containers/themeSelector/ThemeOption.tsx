import { useTheme } from '@shopify/restyle'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Box from '../../components/box'
import Typography from '../../components/typography'
import { Theme } from '../../theme'

const { View } = Box
const { Paragraph } = Typography

export type Option = {
  id: string
  label: string
  active: boolean
  onPress: (id: string) => void
}

const ThemeOption: React.FC<Option> = React.memo(
  ({ active, id, label, onPress, ...rest }) => {
    const { colors } = useTheme<Theme>()
    return (
      <TouchableWithoutFeedback
        hitSlop={{ bottom: 4, top: 4, left: 4, right: 4 }}
        onPress={() => onPress(id)}
        {...rest}>
        <View
          alignItems="center"
          borderRadius="sm"
          flexDirection="row"
          justifyContent="space-between"
          py="0.75">
          <Paragraph color="coolGray-700" fontSize="sm" fontWeight="bold">
            {label}
          </Paragraph>
          <View
            width={24}
            height={24}
            bg={active ? 'link' : 'background'}
            borderColor={active ? 'link' : 'coolGray-300'}
            borderRadius="full"
            borderWidth={1}
            alignItems="center"
            justifyContent="center">
            {active ? (
              <Icon name="check" color={colors.white} size={18} />
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  },
  (prevProps, nextProps) => prevProps.active === nextProps.active,
)

export default ThemeOption
