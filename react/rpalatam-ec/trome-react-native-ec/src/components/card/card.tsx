import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import CardFooter from './CardFooter'
import CardHeader from './CardHeader'
import CardMedia, { getMediaIcon, getMediaUri } from './CardMedia'
import { Story } from '../../entities/Story'
import { App } from '../../utils/config'
import Box from '../box'
import Typography from '../typography'
import type { TextProps } from '../../theme'

const { View } = Box
const { Paragraph, Title } = Typography

type Props = {
  story: Story
  onPress: () => void
}

type Density = 'compact' | 'comfortable'
type Variant = 'magazine' | 'default'

type CardProps = Props & {
  density?: Density
  variant?: Variant
}

interface CardVariantProps extends Story {
  density?: Density
  onPress: () => void
}

const textStyle = App.select<TextProps>({
  elcomercio: { fontWeight: 'bold' },
  default: {},
})

const CardTitle: React.FC<{ title?: string }> = ({ title }) => {
  if (!title) return null
  return (
    <Title
      color="coolGray-700"
      fontSize="lg"
      lineHeight="relaxed"
      testID="card-title"
      {...textStyle}>
      {title}
    </Title>
  )
}

const CardDescription: React.FC<{ description?: string }> = ({
  description,
}) => {
  if (!description) return null
  return (
    <Paragraph color="text" fontSize="sm" numberOfLines={3}>
      {description}
    </Paragraph>
  )
}

const styles: StyleProp<ViewStyle> = { aspectRatio: 4 / 3, width: 120 }
const CardMagazine: React.FC<CardVariantProps> = React.memo((story) => {
  const mediaUri = getMediaUri(story.promo_items)
  const mediaIcon = getMediaIcon(story.type)

  return (
    <View flex={1} py="1">
      <CardHeader {...story} />
      <TouchableWithoutFeedback
        onPress={story.onPress}
        testID="card-action-area">
        <View flex={1} px="1">
          <View flexDirection="row">
            <View flex={1}>
              <CardTitle title={story.headline} />
            </View>
            {!mediaUri ? null : (
              <View pl="0.5">
                <CardMedia
                  icon={mediaIcon}
                  uri={mediaUri}
                  wrapperStyle={styles}
                />
              </View>
            )}
          </View>
          {story.density === 'comfortable' ? (
            <View pt="0.5">
              <CardDescription description={story.subheadline} />
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <CardFooter {...story} />
    </View>
  )
})

const CardDefault: React.FC<CardVariantProps> = React.memo((story) => {
  const mediaUri = getMediaUri(story.promo_items)
  const mediaIcon = getMediaIcon(story.type)

  return (
    <View flex={1} py="1">
      <CardHeader {...story} />
      <TouchableWithoutFeedback
        onPress={story.onPress}
        testID="card-action-area">
        <View flex={1} px="1">
          {!mediaUri ? null : (
            <View pb="0.5">
              <CardMedia icon={mediaIcon} uri={mediaUri} />
            </View>
          )}
          <CardTitle title={story.headline} />
          {story.density === 'comfortable' ? (
            <View pt="0.5">
              <CardDescription description={story.subheadline} />
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <CardFooter {...story} />
    </View>
  )
})

const Card: React.FC<CardProps> = ({ story, variant, ...rest }) => {
  if (variant === 'magazine') return <CardMagazine {...story} {...rest} />
  return <CardDefault {...story} {...rest} />
}

export default Card
