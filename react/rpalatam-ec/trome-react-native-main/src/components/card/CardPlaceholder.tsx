import React from 'react'
import { ViewStyle } from 'react-native'

import Box from '../box'
import Skeleton from '../skeleton'

const { View } = Box

type Variant = 'magazine' | 'default'

type Props = {
  repeat?: number
  variant?: Variant
}

const CardMagazine: React.FC = () => {
  const style: ViewStyle = { paddingBottom: '75%' }
  return (
    <View flexDirection="row">
      <View flex={1}>
        <Skeleton.Text
          fullWidth
          repeat={2}
          size="medium"
          spaceBetweenItems="0.5"
        />
        <Skeleton.Text mt="0.5" />
      </View>
      <View pl="0.5" width={128}>
        <Skeleton.Media style={style} />
      </View>
    </View>
  )
}

const CardPlaceholder: React.FC<Props> = ({ repeat = 1, variant }) => {
  const CardContent = () => {
    if (variant === 'magazine') return <CardMagazine />
    return (
      <React.Fragment>
        <Skeleton.Media mb="0.75" />
        <Skeleton.Text
          fullWidth
          repeat={2}
          size="medium"
          spaceBetweenItems="0.5"
        />
        <Skeleton.Text mt="0.5" />
      </React.Fragment>
    )
  }

  return (
    <Skeleton.AnimatedGroup
      timing={800}
      pt={repeat > 1 ? '1' : '0'}
      testID="placeholder">
      {Array.from({ length: repeat }).map((_, i) => (
        <View key={i} mb="1.5" testID="card-placeholder">
          <CardContent />
        </View>
      ))}
    </Skeleton.AnimatedGroup>
  )
}

export default CardPlaceholder
