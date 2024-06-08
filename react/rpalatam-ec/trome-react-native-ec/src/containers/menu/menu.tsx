import crashlytics from '@react-native-firebase/crashlytics'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { useTheme } from '@shopify/restyle'
import React, { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { getReadableVersion } from 'react-native-device-info'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import LogoComercio from '../../assets/brands/elcomercio/logo.svg'
import IconAccountCircle from '../../assets/icons/elcomercio/account-circle-outline.svg'
import IconBell from '../../assets/icons/elcomercio/bell.svg'
import IconBookMark from '../../assets/icons/elcomercio/bookmark.svg'
import IconChevronRight from '../../assets/icons/elcomercio/chevron-right.svg'
import IconClose from '../../assets/icons/elcomercio/close.svg'
import IconNewLetter from '../../assets/icons/elcomercio/email-newsletter.svg'
import IconPodCast from '../../assets/icons/elcomercio/podcast.svg'
import IconPrintEdition from '../../assets/icons/elcomercio/print-edition.svg'
import Button from '../../components/Button'
import Box from '../../components/box'
import Bar from '../../components/progress/Bar'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import config, {
  ResponseCategoriesMenu,
  ResponseCategoryItem,
} from '../../services/config'
import { SUBSCRIPTION_LANDING_URL } from '../../utils/constants'
import { openInBrowser } from '../../utils/inappbrowser'
import { cleanText } from '../../utils/tools'
import type { Theme } from '../../theme'

const { SafeAreaView, ScrollView, View } = Box
const { Paragraph, Title } = Typography
const VERSION = getReadableVersion()

const service = config.navigation()

const SubHeader: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { isAuthenticated, isSubscribed, user } = useAuth()

  const fullname = `${cleanText(user.first_name)} ${cleanText(user.last_name)}`

  if (isSubscribed) {
    return (
      <React.Fragment>
        <Paragraph color="black" fontSize="base">
          Hola
        </Paragraph>
        <Paragraph
          color="black"
          fontSize="base"
          fontWeight="bold"
          textTransform="uppercase">
          {fullname}
        </Paragraph>
        <Paragraph color="black" fontSize="base">
          Tienes una suscripción activa
        </Paragraph>
      </React.Fragment>
    )
  }

  if (isAuthenticated) {
    return (
      <React.Fragment>
        <View paddingBottom="1.25">
          <Paragraph color="black" fontSize="base">
            Hola
          </Paragraph>
          <Paragraph
            color="black"
            fontSize="base"
            fontWeight="bold"
            lineHeight="tight"
            textTransform="uppercase">
            {fullname}
          </Paragraph>
          <Paragraph color="black" fontSize="base">
            Suscríbete y disfruta del acceso ilimitado a los contenidos y de los
            beneficios del Club El Comercio
          </Paragraph>
        </View>
        <Button
          size="default"
          title="¡SUSCRÍBETE!"
          onPress={() => {
            openInBrowser(SUBSCRIPTION_LANDING_URL)
            navigation.closeDrawer()
          }}
        />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <View py="1.25">
        <Paragraph color="black" fontSize="3xl" fontWeight="light">
          ¡Hola!{'\n'}
          Crea una {''}
          <Paragraph color="black" fontSize="3xl" fontWeight="bold">
            cuenta gratis {''}
          </Paragraph>
          para navegar por la app
        </Paragraph>
      </View>
      <Button
        size="default"
        title="¡REGÍSTRATE!"
        onPress={() => {
          navigation.navigate('SignUp')
          navigation.closeDrawer()
        }}
      />
    </React.Fragment>
  )
}

const MenuDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const { navigation } = props
  const { colors } = useTheme<Theme>()
  const { isAuthenticated } = useAuth()
  const window = useWindowDimensions()

  const scrollViewStyle = { flexGrow: 1 }
  const [{ header, main, footer }, setCategoriesMenu] =
    useState<ResponseCategoriesMenu>({
      header: [],
      main: [],
      footer: [],
    })

  const handleMainNavigation = (item: ResponseCategoryItem) => {
    if ('url' in item) openInBrowser(item.url)
    if ('screen' in item) {
      const params = item.params && Object.assign({}, item.params)
      navigation.navigate(item.screen, params)
    }
    navigation.closeDrawer()
  }

  const headerIcons = [
    <IconBell fill={colors['text.5']} />,
    <IconBookMark fill={colors['text.5']} />,
    <IconNewLetter fill={colors['text.5']} />,
    <IconPrintEdition fill={colors['text.5']} />,
    <IconPodCast fill={colors['text.5']} />,
  ]

  useEffect(() => {
    service
      .then(setCategoriesMenu)
      .catch((error) => crashlytics().recordError(error))
  }, [])

  return (
    <ScrollView
      alwaysBounceVertical={false}
      backgroundColor="background"
      bounces={false}
      contentContainerStyle={scrollViewStyle}
      showsVerticalScrollIndicator={false}>
      {/* header */}
      <SafeAreaView edges={['top']} bg="primary">
        <View p="1">
          <View
            flex={1}
            flexDirection="row"
            alignItems="center"
            height={40}
            justifyContent="space-between">
            <View flexDirection="row" alignItems="center">
              <View mr="1.5" width={16} height={16}>
                <TouchableWithoutFeedback onPress={navigation.goBack}>
                  <IconClose fill="#4D4D4D" />
                </TouchableWithoutFeedback>
              </View>
              <LogoComercio height={27} width={169} viewBox="0 2 270 40" />
            </View>
            <View width={24} height={24}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('Profile')
                  navigation.closeDrawer()
                }}>
                <IconAccountCircle testID="icon-account" fill="#4D4D4D" />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View py="1.25" paddingBottom="1">
            <SubHeader {...props} />
          </View>
        </View>
      </SafeAreaView>

      {main.length === 0 ? <Bar width={window.width} /> : null}

      {/* search */}
      <View borderBottomWidth={1} borderBottomColor="primary" py="2" px="1.5">
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Search')
            navigation.closeDrawer()
          }}>
          <View
            alignItems="center"
            borderWidth={1}
            borderRadius="sm"
            borderColor="secondary"
            flexDirection="row-reverse"
            height={52}
            px="1.5">
            <View mr="0.5">
              <Icon name="magnify" size={22} color={colors['coolGray-700']} />
            </View>
            <View flex={1}>
              <Paragraph color="secondary" fontSize="base" numberOfLines={1}>
                Buscar
              </Paragraph>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* first custom list */}
      <View
        flex={1}
        borderBottomColor="primary"
        borderBottomWidth={1}
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
        py="1"
        px="1.5">
        {header.map((item, i) => (
          <TouchableWithoutFeedback
            key={i}
            onPress={() => {
              if (!isAuthenticated) return navigation.navigate('Login')
              handleMainNavigation(item)
            }}>
            <View
              borderBottomColor="stroke.1"
              borderBottomWidth={i === header.length - 1 ? 0 : 1}
              flexDirection="row"
              marginBottom={i === header.length - 1 ? '0' : '1'}
              paddingBottom="1"
              width={window.width / 2 - 35}>
              <View flexDirection="row" alignItems="center">
                <View width={16} height={16} mr="0.5">
                  {headerIcons[i]}
                </View>
                <Paragraph fontSize="sm" color="text.3">
                  {item.display_name}
                </Paragraph>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>

      {main.map((section, index) => (
        <View
          borderBottomColor="primary"
          borderBottomWidth={1}
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          key={index}
          py="1"
          px="1.5">
          <View width={'100%'} paddingBottom="1">
            <Paragraph color="coolGray-700" fontWeight="bold">
              {section.title.toUpperCase()}
            </Paragraph>
          </View>
          {section.data.map((item, i) => (
            <TouchableWithoutFeedback
              key={i}
              onPress={() => handleMainNavigation(item)}>
              <View
                borderTopColor="stroke.1"
                borderTopWidth={1}
                flexDirection="row"
                alignItems="center"
                height={56}
                width={window.width / 2 - 35}>
                <View mr="0.5" width={16} height={16} p="0.25">
                  <IconChevronRight fill={colors.text} />
                </View>
                <View flex={1}>
                  <Paragraph fontSize="sm" color="text.3">
                    {item.display_name}
                  </Paragraph>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      ))}

      {/* footer custom list */}
      <View bg="background.3" py="1" px="1.5">
        {footer.map((item, i) => (
          <TouchableWithoutFeedback
            key={i}
            onPress={() => handleMainNavigation(item)}>
            <View marginBottom="1">
              <Paragraph fontSize="sm" color="text.4">
                {item.display_name}
              </Paragraph>
            </View>
          </TouchableWithoutFeedback>
        ))}
        <Paragraph color="text" fontSize="sm">
          Versión {VERSION}
        </Paragraph>
      </View>
    </ScrollView>
  )
}

export default MenuDrawer
