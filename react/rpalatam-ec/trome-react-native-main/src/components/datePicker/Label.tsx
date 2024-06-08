import { useTheme } from '@shopify/restyle'
import React from 'react'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Theme } from '../../theme'
import Box from '../box'
import Typography from '../typography'
import type { DatePickerLabelProps } from './DatePicker'

const defaultFormat: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
}

const DatePickerLabel: React.FC<DatePickerLabelProps> = ({
  value,
  containerStyle,
  dateFormat,
}) => {
  const { colors } = useTheme<Theme>()
  const options = dateFormat || defaultFormat

  return (
    <Box.View
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
      style={containerStyle}>
      <Typography.Paragraph color="coolGray-800" fontWeight="semibold">
        {value?.toLocaleDateString('es-ES', options) || '--/--/--'}
      </Typography.Paragraph>
      <Box.View width={4} />
      <Icon name="calendar" size={22} color={colors['coolGray-500']} />
    </Box.View>
  )
}

export default DatePickerLabel
