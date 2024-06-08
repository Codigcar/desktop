import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

import IconClose from '../../../assets/icons/elcomercio/close.svg'
import Button from '../../../components/Button'
import Box from '../../../components/box'
import Typography from '../../../components/typography'
import type { RootStackScreenProps } from '../../../routes/types'

const { View } = Box
const { Paragraph } = Typography

type BannerProps = {
  onPress: () => void
  title: string
}

const Banner: React.FC<BannerProps> = ({ onPress, title }) => {
  const navigation = useNavigation<RootStackScreenProps<'Auth'>['navigation']>()

  return (
    <View px="1.5" py="1" height={234} width="100%" backgroundColor="primary">
      <View alignSelf="flex-end">
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss()
            navigation.goBack()
          }}>
          <View width={14} height={14}>
            <IconClose accessibilityLabel="cerrar" fill="#9E9E9E" />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View mb="1.5">
        <Paragraph color="black" fontSize="3xl" textAlign="center">
          {title}
        </Paragraph>
      </View>
      <Button title="¡REGÍSTRATE!" onPress={onPress} />
    </View>
  )
}

export default Banner
