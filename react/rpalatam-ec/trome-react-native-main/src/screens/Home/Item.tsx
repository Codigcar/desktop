import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { Banner } from '../../components/ad'
import Card from '../../components/card'
import { useAuth } from '../../context/auth'
import { Advertising } from '../../entities/Advertising'
import { Story } from '../../entities/Story'
import type { HomeStackScreenProps } from '../../routes/types'

export type Item = Advertising | Story

type ItemAdvertisingProps = { adUnit: string }
const adLoadedStyle: StyleProp<ViewStyle> = { paddingVertical: 16 }
const bannerStyle: StyleProp<ViewStyle> = {
  alignItems: 'center',
  justifyContent: 'center',
}
const validAdSizes = ['mediumRectangle']
export const ItemAdvertising: React.FC<ItemAdvertisingProps> = ({ adUnit }) => {
  return (
    <Banner
      adUnitID={`/28253241/gestion/pwa/home/principal/${adUnit}`}
      adLoadedStyle={adLoadedStyle}
      adSize="mediumRectangle"
      style={bannerStyle}
      validAdSizes={validAdSizes}
      testID={`ad_unit_${adUnit}`}
    />
  )
}

type ItemStoryProps = { index: number; item: Item }

export const ItemStory: React.FC<ItemStoryProps> = ({ index, item }) => {
  const navigation = useNavigation<HomeStackScreenProps<'Feed'>['navigation']>()
  const { isSubscribed } = useAuth()

  const onPressCard = useCallback(() => {
    if (item instanceof Story) {
      navigation.navigate('Story', { id: item.id, pathname: item.url })
    }
  }, [item, navigation])

  if (item instanceof Advertising) {
    if (isSubscribed) return null
    return <ItemAdvertising adUnit={item.id} />
  }

  return (
    <Card
      onPress={onPressCard}
      story={item}
      density={index === 0 ? 'comfortable' : 'compact'}
      variant={index < 1 ? 'default' : 'magazine'}
    />
  )
}
