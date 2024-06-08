import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleProp, TextStyle, TouchableOpacity } from 'react-native'

import { Story } from '../../entities/Story'
import { App } from '../../utils/config'
import Box, { ViewProps } from '../box'
import Typography from '../typography'
import type { RootStackScreenProps } from '../../routes/types'

const { View } = Box
const { Paragraph } = Typography

const sectionNameStyles: StyleProp<TextStyle> = App.select({
  elcomercio: { color: '#AD9130', textTransform: 'uppercase' },
  gestion: {},
  default: { textTransform: 'uppercase' },
})

const sectionContainerProps: ViewProps = App.select({
  gestion: {
    alignItems: 'center',
    bg: 'backgroundSecondary',
    borderRadius: 'full',
    flexDirection: 'row',
    height: 20,
    px: '0.5',
  },
  default: {},
})

const CardHeader: React.FC<Story> = ({ section }) => {
  const navigation = useNavigation<RootStackScreenProps<'Main'>['navigation']>()

  if (!section) return null

  const onPress = () => {
    navigation.navigate('Main', { screen: 'News', params: section })
  }

  return (
    <View flexDirection="row" pb="0.5" px="1">
      <TouchableOpacity
        activeOpacity={0.6}
        hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
        onPress={onPress}>
        <View {...sectionContainerProps}>
          <Paragraph
            color="text"
            fontSize="xs"
            fontWeight="bold"
            textAlign="left"
            style={sectionNameStyles}>
            {section.name}
          </Paragraph>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CardHeader
