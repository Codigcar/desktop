import crashlytics from '@react-native-firebase/crashlytics'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Switch } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import IconChevronLeft from '../../assets/icons/elcomercio/chevron-left.svg'
import IconNewsletters from '../../assets/icons/elcomercio/newsletters.svg'
import Box from '../../components/box'
import Image from '../../components/image'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import { useThemeContext } from '../../context/theme'
import auth from '../../services/auth'
import { Newsletter, NewsletterPreferences } from '../../services/preferences'
import type { MainStackScreenProps } from '../../routes/types'
import type { Theme } from '../../theme'

const { SafeAreaView, View, ScrollView } = Box
const { Paragraph, Title } = Typography

const service = NewsletterPreferences.list()

const NewslettersScreen: React.FC = () => {
  const navigation =
    useNavigation<MainStackScreenProps<'Newsletters'>['navigation']>()
  const { currentTheme } = useThemeContext()
  const { colors } = useTheme<Theme>()
  const { user } = useAuth()

  const [newsletters, setNewsletters] = useState<Newsletter[]>()
  const refNewsletters = useRef<string[]>([])
  const [subscribed, setSubscribed] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    service.then(setNewsletters).catch((error) => {
      crashlytics().recordError(error)
    })
  }, [])

  const updateNewsletter = async (add: boolean, id: string) => {
    try {
      if (!user.id) return navigation.navigate('Login')
      setIsLoading(true)
      const token = await auth.getToken()
      const removeIds = subscribed.filter((_id) => _id !== id)
      const ids = add ? [...subscribed, id] : removeIds

      setSubscribed(ids)
      await NewsletterPreferences.post(ids, {
        ...user,
        accessToken: token?.access_token,
      })

      refNewsletters.current = ids
      setIsLoading(false)
    } catch (error) {
      setSubscribed(refNewsletters.current)
      if (error instanceof Error) crashlytics().recordError(error)
    }
  }

  const getUserNewsletter = useCallback(async () => {
    try {
      if (!user.id) return
      NewsletterPreferences.abort()
      const userSub = await NewsletterPreferences.get(user.id)

      refNewsletters.current = userSub
      setSubscribed(refNewsletters.current)
    } catch (error) {
      if (error instanceof Error) crashlytics().recordError(error)
    }
  }, [user.id])

  useEffect(() => {
    getUserNewsletter()
  }, [getUserNewsletter, user.id])

  const switchBg = currentTheme === 'light' ? '#E5E5E5' : '#484848'

  return (
    <View bg="background.2" flex={1}>
      <Ribbon
        loading={newsletters === undefined || isLoading}
        LeftComponent={() => {
          return (
            <View alignItems="center" flexDirection="row">
              <TouchableWithoutFeedback
                onPress={navigation.goBack}
                testID="goback-button">
                <IconChevronLeft
                  fill={colors['stroke.1']}
                  height={16}
                  width={12}
                />
              </TouchableWithoutFeedback>
              <View alignItems="center" flexDirection="row" ml="1.25">
                <View mr="0.5" width={16} height={18}>
                  <IconNewsletters fill={colors['text.1']} />
                </View>
                <Paragraph
                  textAlign="center"
                  color="text.1"
                  fontSize="lg"
                  fontWeight="black">
                  Newsletters
                </Paragraph>
              </View>
            </View>
          )
        }}
      />
      <ScrollView px="3">
        <View my="1.5">
          <Paragraph
            color="secondary"
            textAlign="center"
            fontSize="xl"
            fontWeight="bold">
            Selecciona las newsletters que más te interesan
          </Paragraph>
        </View>
        {newsletters?.map((item) => {
          const isEnabled = subscribed.includes(item.code)

          return (
            <View mb="1.5" key={item.code} testID={item.code}>
              <View height={156}>
                <Image
                  source={{
                    uri: item.image,
                  }}
                  resizeMode="cover"
                />
              </View>

              <View flexDirection="row" mt="0.75">
                <View flex={1} mr="1">
                  <Title color="text.5" fontSize="base" fontWeight="bold">
                    {item.name}
                  </Title>
                </View>

                <Switch
                  testID="change-value"
                  disabled={isLoading}
                  trackColor={{ false: switchBg, true: colors.primary }}
                  thumbColor={
                    isEnabled || currentTheme === 'light'
                      ? '#FFFFFF'
                      : '#D1D1D1'
                  }
                  ios_backgroundColor={switchBg}
                  onValueChange={(value) => {
                    updateNewsletter(value, item.code)
                  }}
                  value={isEnabled}
                />
              </View>
              <View mt="0.25">
                <Title color="text.5" fontSize="base">
                  {item.description}
                </Title>
              </View>
            </View>
          )
        })}
        <SafeAreaView edges={['bottom']} />
      </ScrollView>
    </View>
  )
}

export default NewslettersScreen
