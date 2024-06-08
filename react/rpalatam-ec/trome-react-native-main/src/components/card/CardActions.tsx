import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useCallback } from 'react'
import { Platform, Share, TouchableOpacity } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { useFavorites } from '../../context/favorites'
import { useNotification } from '../../context/notification'
import { Story } from '../../entities/Story'
import { Theme } from '../../theme'
import { getDomain } from '../../utils/tools'
import Box from '../box'
import Typography from '../typography'
import type { MainStackScreenProps } from '../../routes/types'

const { View } = Box
const { Paragraph } = Typography

async function shareStory(path: string): Promise<void> {
  const url = `https://${getDomain()}${path}`
  await Share.share(
    Platform.select({
      ios: { url },
      default: { message: url },
    }),
    { dialogTitle: 'Compartir' },
  )
}

const CardActions: React.FC<Story> = (story) => {
  const navigation = useNavigation<MainStackScreenProps<'Home'>['navigation']>()
  const { colors } = useTheme<Theme>()

  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.includes(story.id)
  const notification = useNotification()

  const toogle = useCallback(async () => {
    await toggleFavorite(story.id)
    if (!isFavorite) {
      notification.show({
        message: 'Agregado a leer luego',
        type: 'success',
        duration: 3000,
        action: () => (
          <TouchableOpacity
            activeOpacity={0.6}
            hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
            onPress={() => {
              notification.hide()
              navigation.navigate('Favorite')
            }}>
            <Paragraph color="white" fontSize="sm" fontWeight="bold">
              Ir a leer luego
            </Paragraph>
          </TouchableOpacity>
        ),
      })
    }
  }, [isFavorite, navigation, notification, story, toggleFavorite])

  return (
    <View flexDirection="row">
      <TouchableWithoutFeedback onPress={toogle} testID="card-save-button">
        <View p="0.25">
          <Icon
            name="bookmark"
            size={22}
            color={isFavorite ? colors.link : colors.text}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          const path = story.url as string
          shareStory(path)
        }}
        testID="card-share-button">
        <View p="0.25">
          <Icon name="share-variant" size={22} color={colors.text} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default CardActions
