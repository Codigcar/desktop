import { useTheme } from '@shopify/restyle'
import React from 'react'
import { Platform, StyleProp, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { PromoItems } from '../../entities/Story'
import { Theme } from '../../theme'
import Box from '../box'
import Image, { ImageProps } from '../image'
import Typography from '../typography'

const { View } = Box
const { Paragraph } = Typography

type MediaIcon = {
  name: string
  title: string
}

type Media = Omit<ImageProps, 'source'> & {
  icon?: MediaIcon
  uri?: string
  wrapperStyle?: StyleProp<ViewStyle>
}

export function getMediaIcon(type?: keyof PromoItems): MediaIcon | undefined {
  if (type === 'gallery') {
    return { name: 'checkbox-multiple-blank', title: 'FOTOS' }
  }
  if (type === 'video') return { name: 'play', title: 'VIDEO' }
  return undefined
}

export function getMediaUri(promoItems?: PromoItems): string | undefined {
  return (
    promoItems?.basic?.url ||
    promoItems?.gallery?.[0]?.url ||
    promoItems?.video?.thumb
  )
}

const MediaIcon: React.FC<MediaIcon> = React.memo(({ name, title }) => {
  const { colors } = useTheme<Theme>()

  return (
    <View
      alignItems="center"
      borderColor="white"
      borderRadius="full"
      borderWidth={2}
      flexDirection="row"
      height={32}
      bottom={12}
      left={4}
      position="absolute"
      pointerEvents="none"
      px="0.5"
      style={{ backgroundColor: `${colors.black}b3` }}
      testID="card-media-icon">
      <View mr="0.25">
        <Icon name={name} color="#fff" size={18} />
      </View>
      <Paragraph
        color="white"
        fontSize="sm"
        fontWeight="bold"
        lineHeight={Platform.OS === 'ios' ? 'normal' : 'none'}>
        {title}
      </Paragraph>
    </View>
  )
})

const CardMedia: React.FC<Media> = (props) => {
  const { icon, uri, wrapperStyle, ...rest } = props
  if (!uri) return null

  return (
    <View
      aspectRatio={16 / 9}
      borderRadius="sm"
      overflow="hidden"
      position="relative"
      style={wrapperStyle}
      testID="card-media">
      <Image source={{ uri }} resizeMode="cover" {...rest} />
      {icon ? <MediaIcon {...icon} /> : null}
    </View>
  )
}

export default CardMedia
