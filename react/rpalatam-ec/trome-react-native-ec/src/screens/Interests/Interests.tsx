import crashlytics from '@react-native-firebase/crashlytics'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useEffect, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'

import IconChevronRight from '../../assets/icons/elcomercio/chevron-right.svg'
import Box from '../../components/box'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import config from '../../services/config'
import { STORE_INTERESTS } from '../../utils/constants'
import { storage } from '../../utils/storage'
import type { MainStackScreenProps } from '../../routes/types'
import type { Theme } from '../../theme'

type Interest = {
  active: boolean
  slug: string
  text: string
}

type Props = Interest & {
  action: (item: Interest) => void
  disabled?: boolean
}

const { View, ScrollView } = Box
const { Paragraph } = Typography

const service = config.interests()

const TouchableInterest = ({
  action: toggleInterest,
  active,
  disabled,
  slug,
  text,
}: Props) => {
  return (
    <TouchableWithoutFeedback
      disabled={disabled}
      accessibilityLabel={slug}
      accessibilityState={{ selected: active }}
      onPress={() => toggleInterest({ active, slug, text })}>
      <View
        alignItems="center"
        backgroundColor={active ? 'secondary' : 'transparent'}
        borderColor="secondary"
        borderRadius="full"
        borderWidth={1}
        height={45}
        my="0.75"
        width="47%">
        <View flex={1} alignItems="center" justifyContent="center">
          <Paragraph
            textAlign="center"
            lineHeight="tight"
            color={active ? 'white' : 'secondary'}>
            {text}
          </Paragraph>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const InterestsScreen: React.FC = () => {
  const [interests, setInterests] = useState<Interest[]>([])
  const { colors } = useTheme<Theme>()
  const navigation =
    useNavigation<MainStackScreenProps<'Interests'>['navigation']>()

  useEffect(() => {
    service
      .then((dataService) => {
        const stored = storage.getString(STORE_INTERESTS)
        const storedInfo = stored ? JSON.parse(stored) : []

        const list = dataService.map((item) => {
          return { ...item, active: storedInfo.includes(item.slug) }
        })
        setInterests(list)
      })
      .catch((error) => crashlytics().recordError(error))
  }, [])

  const toggleInterest = (selected: Interest) => {
    const index = interests.findIndex(({ slug }) => slug === selected.slug)
    interests[index].active = !selected.active
    setInterests([...interests])

    const slugsToSave = interests
      .filter(({ active }) => active)
      .map(({ slug }) => slug)
    storage.set(STORE_INTERESTS, JSON.stringify(slugsToSave))
  }

  return (
    <View bg="background.2" flex={1}>
      <Ribbon loading={interests.length === 0} title="Mis intereses" />
      <ScrollView flex={1}>
        <View alignItems="center" pt="1.5" pb="2">
          <Paragraph
            color="text.5"
            fontSize="lg"
            fontWeight="bold"
            letterSpacing="tight">
            Selecciona los temas de tu interés
          </Paragraph>
          <View height={14} />
          <Paragraph color="text.3">Ver los contenidos en</Paragraph>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Home', { screen: 'MyNews' })}>
            <View flexDirection="row" alignItems="center">
              <Paragraph color="link">Mis Noticias </Paragraph>
              <View height={10} width={10}>
                <IconChevronRight fill={colors.link} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          px="1.25">
          <TouchableInterest
            disabled={true}
            active={true}
            text="Recomendados"
            slug="recomendados"
            action={toggleInterest}
          />
          {interests.map((item, index) => (
            <TouchableInterest {...item} key={index} action={toggleInterest} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default InterestsScreen
