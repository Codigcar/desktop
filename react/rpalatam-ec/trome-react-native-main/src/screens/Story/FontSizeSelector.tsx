import Slider from '@react-native-community/slider'
import { useTheme } from '@shopify/restyle'
import React, { useRef } from 'react'
import { Platform } from 'react-native'

import Box from '../../components/box'
import Typography from '../../components/typography'
import { storage } from '../../utils/storage'
import type { Theme } from '../../theme'

const { View } = Box
const { Paragraph } = Typography

type Props = {
  onSizeChange(size: string, prevSize: string): void
}

export enum FontSize {
  xs = 1,
  s = 2,
  m = 3,
  l = 4,
  xl = 5,
}

// Storage key for font size
const key = 'config.fontSize'

export function getFontSize(): keyof typeof FontSize {
  const value = storage.getNumber(key) || FontSize.m
  return FontSize[value] as keyof typeof FontSize
}

const FontSizeSelector: React.FC<Props> = ({ onSizeChange }) => {
  const { colors } = useTheme<Theme>()
  const fontSizeName = useRef(getFontSize())
  const fontSize = FontSize[fontSizeName.current]

  const handleValueChange = (value: number) => {
    onSizeChange(FontSize[value], fontSizeName.current)
    storage.set(key, value)
    fontSizeName.current = FontSize[value] as keyof typeof FontSize
  }

  return (
    <View
      pb={Platform.OS === 'android' ? '2' : '0.75'}
      pt="0.75"
      px="1.5"
      width="100%">
      <View mb="1">
        <Paragraph color="coolGray-700" fontWeight="bold">
          Seleccione el tamaño de letra
        </Paragraph>
      </View>
      <View alignItems="center" flexDirection="row">
        <Paragraph color="coolGray-700" fontSize="xs" fontWeight="bold">
          Aa
        </Paragraph>
        <View flex={1} px="0.5">
          <Slider
            minimumValue={1}
            maximumValue={5}
            minimumTrackTintColor={colors.link}
            step={1}
            value={fontSize}
            onValueChange={handleValueChange}
            thumbTintColor={Platform.OS === 'android' ? colors.link : 'white'}
            onResponderGrant={() => true}
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          />
        </View>
        <Paragraph color="coolGray-700" fontSize="xl" fontWeight="bold">
          Aa
        </Paragraph>
      </View>
    </View>
  )
}

export default FontSizeSelector
