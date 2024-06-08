import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, SectionList, Switch } from 'react-native'
import FastImage from 'react-native-fast-image'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  activeSwitchColor,
  backgroundColor,
  borderColor,
  fontStyleDisplayName,
  fontStyleSectionHeader,
  indicatorColor,
  renderItemStyle,
  sectionSeparatorStyle,
} from './styles'
import IconBell from '../../assets/icons/elcomercio/bell.svg'
import IconChevronLeft from '../../assets/icons/elcomercio/chevron-left.svg'
import Box from '../../components/box'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import { useThemeContext } from '../../context/theme'
import { useTopics } from '../../context/topics'
import config, { ResponseNotification } from '../../services/config'
import { App } from '../../utils/config'
import { HomeWebviewRef } from '../../utils/refs'
import type { Theme } from '../../theme'

const { SafeAreaView, View } = Box
const { Paragraph } = Typography

const HeaderElComercio = () => {
  const navigation = useNavigation()
  const { colors } = useTheme<Theme>()
  return (
    <View alignItems="center" flexDirection="row">
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.goBack()
        }}
        testID="goback-button">
        <IconChevronLeft fill={colors[borderColor]} height={16} width={12} />
      </TouchableWithoutFeedback>
      <View alignItems="center" flexDirection="row" ml="1.25">
        <View mr="0.5">
          <IconBell fill={colors[indicatorColor]} height={18} width={16} />
        </View>
        <Paragraph
          textAlign="center"
          color="text.1"
          fontSize="lg"
          fontWeight="black">
          Alertas
        </Paragraph>
      </View>
    </View>
  )
}

const RenderElement: React.FC<{
  data: {
    display_name: string
    id: string
    image?: string
    enabled: boolean
  }
  action: {
    setSaving: (data: boolean) => void
  }
}> = ({ data: item, action: { setSaving } }) => {
  const { currentTheme } = useThemeContext()
  const { colors } = useTheme<Theme>()
  const { subscribeToTopic, unsubscribeFromTopic } = useTopics()

  async function handleNotification(active: boolean, id: string) {
    try {
      setSaving(true)
      active ? await subscribeToTopic(id) : await unsubscribeFromTopic(id)
    } catch (_) {
    } finally {
      setSaving(false)
    }
  }

  const switchBgLight = App.select({
    gestion: '#78788029',
    default: '#E5E5E5',
  })

  const switchBg = currentTheme === 'light' ? switchBgLight : '#484848'
  return (
    <View
      {...renderItemStyle}
      height={56}
      borderTopWidth={1}
      borderTopColor={borderColor}
      alignItems="center"
      flexDirection="row">
      {item?.image ? (
        <View
          borderRadius="full"
          borderWidth={1}
          borderColor="primary"
          height={36}
          width={36}
          mr="1"
          overflow="hidden">
          <FastImage
            source={{ uri: item.image }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ flexGrow: 1 }}
          />
        </View>
      ) : null}
      <View flex={1}>
        <Paragraph {...fontStyleDisplayName}>{item.display_name}</Paragraph>
      </View>
      <Switch
        trackColor={{
          false: switchBg,
          true: colors[activeSwitchColor],
        }}
        thumbColor={
          item.enabled || currentTheme === 'light' ? '#FFFFFF' : '#D1D1D1'
        }
        ios_backgroundColor={switchBg}
        onValueChange={(value) => {
          handleNotification(value, item.id)
        }}
        value={item.enabled}
        testID={item.id}
      />
    </View>
  )
}

const service = config.notification()

const NotificationsScreen: React.FC = () => {
  const insets = useSafeAreaInsets()
  const { colors } = useTheme<Theme>()
  const { topics } = useTopics()

  const [data, setData] = useState<ResponseNotification>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    service.then(setData).catch(() => null)
  }, [])

  useEffect(() => {
    HomeWebviewRef.current?.injectJavaScript(`
      window.NATIVE_CONNECTION?.topics.setTopics(${JSON.stringify(topics)});
      true;
    `)
  }, [topics])

  const RibbonLeftComponent = App.select({
    elcomercio: HeaderElComercio,
    default: null,
  })

  const headerTitle = App.select({
    elcomercio: undefined,
    default: 'Notificaciones',
  })

  const firstSectionTitle = data?.[0]?.title || ''

  return (
    <SafeAreaView bg={backgroundColor} flex={1} edges={['left', 'right']}>
      <Ribbon title={headerTitle} LeftComponent={RibbonLeftComponent} />
      <SectionList
        renderItem={({ item }) => (
          <RenderElement
            data={{ ...item, enabled: topics.includes(item.id) }}
            action={{ setSaving }}
          />
        )}
        sections={data}
        initialNumToRender={15}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <>
            {firstSectionTitle !== title ? (
              <View py="0.25" {...sectionSeparatorStyle} />
            ) : null}
            <View px="1.5" py="1">
              <Paragraph {...fontStyleSectionHeader}>{title}</Paragraph>
            </View>
          </>
        )}
        stickySectionHeadersEnabled={false}
        ListFooterComponent={() => <View height={insets.bottom} />}
      />
      {data.length === 0 || saving ? (
        <View
          alignItems="center"
          justifyContent="center"
          position="absolute"
          height="100%"
          width="100%"
          style={{ backgroundColor: `${colors['background.2']}80` }}
          testID="loading">
          <ActivityIndicator color={colors[indicatorColor]} />
        </View>
      ) : null}
    </SafeAreaView>
  )
}

export default NotificationsScreen
