import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import IconCheck from '../../assets/icons/elcomercio/check.svg'
import Box from '../../components/box'
import Typography from '../../components/typography'
import { App } from '../../utils/config'
import type { BoxProps, TextProps } from '../../theme'

const { View } = Box
const { Paragraph } = Typography

export type Option = {
  id: string
  label: string
  active: boolean
  onPress: (id: string) => void
}

const propStyles = {
  view: App.select<BoxProps>({
    elcomercio: { px: '1.5', py: '1' },
    default: { py: '0.75' },
  }),
  label: App.select<TextProps>({
    elcomercio: { color: 'text.3', fontWeight: 'semibold' },
    default: { color: 'coolGray-700', fontSize: 'sm', fontWeight: 'bold' },
  }),
}

const iconCheck = App.select({
  elcomercio: (
    <View height={13} width={13}>
      <IconCheck testID="icon-check" fill="#388dcc" />
    </View>
  ),
  default: <Icon name="check" color="#FFFFFF" size={18} />,
})

const ThemeOption: React.FC<Option> = React.memo(
  ({ active, id, label, onPress, ...rest }) => {
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
          {...propStyles.view}>
          <Paragraph {...propStyles.label}>{label}</Paragraph>
          <View
            width={24}
            height={24}
            bg={active && App.key !== 'elcomercio' ? 'link' : 'background'}
            borderColor={
              active && App.key !== 'elcomercio' ? 'link' : 'trueGray-200'
            }
            borderRadius="full"
            borderWidth={1}
            alignItems="center"
            justifyContent="center">
            {active ? iconCheck : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  },
  (prevProps, nextProps) => prevProps.active === nextProps.active,
)

export default ThemeOption
