import { useTheme } from '@shopify/restyle'
import React, { useMemo } from 'react'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Theme } from '../../theme'
import { App } from '../../utils/config'
import Box from '../box'
import Typography from '../typography'
import type { AllProps } from '../../theme'
import type { PickerLabelProps } from './Picker'

const stylesPicker = App.select<AllProps>({
  elcomercio: {
    bg: 'background.3',
    borderWidth: 1,
    py: '0.5',
  },
  default: {
    bg: 'background',
    borderWidth: 2,
    py: Platform.OS === 'ios' ? '0.75' : '0.5',
  },
})

const { View } = Box
const PickerLabel: React.FC<PickerLabelProps> = ({
  options,
  disabled,
  placeholder,
  selectedValue,
  containerStyle,
}) => {
  const { colors } = useTheme<Theme>()

  const label = useMemo(() => {
    return options.find((option) => option.value === selectedValue)?.label
  }, [options, selectedValue])

  return (
    <View
      {...stylesPicker}
      testID="label-container"
      px="0.5"
      borderColor="coolGray-300"
      borderRadius="sm"
      flexDirection="row"
      alignContent="center"
      alignItems="center"
      justifyContent="space-between"
      opacity={disabled ? 0.5 : 1}
      style={containerStyle}>
      <Typography.Paragraph color="coolGray-800" fontWeight="semibold">
        {label || placeholder}
      </Typography.Paragraph>
      <Icon name="chevron-down" size={22} color={colors['coolGray-500']} />
    </View>
  )
}

export default PickerLabel
