import { useTheme } from '@shopify/restyle'
import React, { useMemo } from 'react'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Theme } from '../../theme'
import Box from '../box'
import Typography from '../typography'
import type { PickerLabelProps } from './Picker'

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
      testID="label-container"
      bg="background"
      px="0.5"
      py={Platform.OS === 'ios' ? '0.75' : '0.5'}
      borderColor="coolGray-300"
      borderRadius="sm"
      borderWidth={2}
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
