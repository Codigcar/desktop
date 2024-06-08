import analytics from '@react-native-firebase/analytics'
import crashlytics from '@react-native-firebase/crashlytics'
import {
  Link,
  useFocusEffect,
  useNavigation,
  useScrollToTop,
} from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import axios from 'axios'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Linking,
  Platform,
  RefreshControl,
  SectionList,
  TouchableOpacity,
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { URL } from 'react-native-url-polyfill'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Item, ItemAdvertising, ItemStory } from './Item'
import HOME_SCREEN_SHOWN from './homeShown'
import requestInterstitial from './requestInterstitial'
import Logotipo from '../../assets/brands/gestion/logo.svg'
import Box from '../../components/box'
import { CardPlaceholder } from '../../components/card'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import { useAuth } from '../../context/auth'
import { useMainNavigation } from '../../context/navigation'
import { useTopics } from '../../context/topics'
import { Advertising } from '../../entities/Advertising'
import Content, {
  getQueryBySection,
  queryInclude,
} from '../../services/arc/Content'
import { requestUserPermission } from '../../utils/firebase'
import { insertIntoArray } from '../../utils/tools'
import type { Story } from '../../entities/Story'
import type { MainStackScreenProps } from '../../routes/types'
import type { Theme } from '../../theme'

type Section = {
  data: Item[]
  key: string
  id: string
  adUnit?: string
  title?: string
}

type SectionItem = {
  id: string
  service: ReturnType<typeof Content['search']>
  title: string
}

const { SafeAreaView, View } = Box
const { Title } = Typography

const instanceHeadlines = Content.headlines()
const headlines = instanceHeadlines.get()

function headlinesToSection(stories: Story[]): Section {
  const data = insertIntoArray(stories.slice(0, 8), {
    2: new Advertising({ id: 'caja1' }),
    6: new Advertising({ id: 'caja2' }),
  })
  return { id: 'headlines', key: 'headlines', data }
}

async function fetchSection(params: SectionItem): Promise<Section> {
  const { id, service, title } = params
  const stories = await service.get({ page: 0 })
  return { id, key: id, title: title, data: stories }
}

type LinkType = { url: string } | string | null

export function useOnLink(): (link: LinkType) => void {
  const navigation = useNavigation<MainStackScreenProps<'Home'>['navigation']>()

  return useCallback(
    (link: LinkType) => {
      if (!link) return
      const url = typeof link === 'string' ? link : link.url
      const { pathname } = new URL(url)
      if (pathname.endsWith('-noticia/')) navigation.push('Story', { pathname })
      analytics().logEvent('link_app_open', { pathname })
    },
    [navigation],
  )
}

const SectionHeader: React.FC<{ section: Section }> = ({ section }) => {
  if (!section.title) return null
  return (
    <View
      pb="0.5"
      px="1"
      borderTopColor="backgroundSecondary"
      borderTopWidth={6}>
      <View
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        pb="0.5"
        pt="0.75">
        <Link
          to={{
            screen: 'News',
            params: {
              name: section.title,
              path: section.key,
            },
          }}>
          <Title color="coolGray-800" fontSize="2xl">
            {section.title}
          </Title>
        </Link>
      </View>
      <View bg="badgeFont" height={4} width={40} />
    </View>
  )
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<MainStackScreenProps<'Home'>['navigation']>()
  const { colors } = useTheme<Theme>()

  const { isSubscribed } = useAuth()
  const { categories } = useMainNavigation()
  const [headlineSection, setHeadlineSection] = useState<Section>()
  const [userSections, setUserSections] = useState<Section[]>([])
  const sections = useMemo<Section[]>(() => {
    if (!headlineSection) return []
    return [headlineSection, ...userSections]
  }, [headlineSection, userSections])
  const instances = useRef<SectionItem['service'][]>([])
  const { setDefaultTopics } = useTopics()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const ref = useRef<SectionList<Item, Section>>(null)

  useEffect(() => {
    SplashScreen.hide()
    headlines.then(headlinesToSection).then(setHeadlineSection)
    HOME_SCREEN_SHOWN.set(true)
  }, [])

  useEffect(() => {
    requestUserPermission().then(() => {
      setDefaultTopics()
    })
  }, [setDefaultTopics])

  const onLink = useOnLink()

  useEffect(() => {
    if (Platform.OS !== 'ios') Linking.getInitialURL().then(onLink)
    const listener = Linking.addEventListener('url', onLink)
    return () => listener.remove()
  }, [onLink])

  useFocusEffect(
    useCallback(() => {
      if (!HOME_SCREEN_SHOWN.get()) return
      if (isSubscribed || isSubscribed === undefined) return
      requestInterstitial()
    }, [isSubscribed]),
  )

  const userSelectedSections = useMemo(() => {
    instances.current = []
    const actives = categories.filter(({ active }) => active)
    return actives.map(({ label, path }) => {
      const id: string = path.replace(/^\/category\//, '')
      const instance = Content.search({
        cache: true,
        params: {
          query: getQueryBySection(id),
          size: 5,
          sourceExclude: 'taxonomy.primary_section',
          sourceInclude: queryInclude('cards').join(),
        },
      })
      instances.current.push(instance)
      return { id, service: instance, title: label }
    })
  }, [categories])

  const fetchStoriesFromSections = useCallback(async (items: SectionItem[]) => {
    instances.current.forEach((instance) => instance.abort())
    const response = await axios.all(items.map(fetchSection))
    setUserSections(response)
  }, [])

  useEffect(() => {
    fetchStoriesFromSections(userSelectedSections)
  }, [fetchStoriesFromSections, userSelectedSections])

  const sectionIds = useMemo(() => {
    return sections.map((section) => section.id)
  }, [sections])

  const renderSectionFooter = useCallback(
    ({ section }: { section: Section }) => {
      if (isSubscribed) return null
      const index = sectionIds.findIndex((id) => id === section.id)
      /**
       * No mostrar una publicidad en el footer de la última sección
       */
      if (index + 1 === sectionIds.length) return null
      /**
       * La cantidad de espacios publicitarios es de 8, de las cuales 2 son
       * mostradas en headlines y quedan disponible 6 espacios publicitarios
       */
      const adIndex = index + 3
      if (adIndex > 8) return null
      return <ItemAdvertising adUnit={`caja${adIndex}`} />
    },
    [isSubscribed, sectionIds],
  )

  const onRefresh = async () => {
    setIsRefreshing(true)
    try {
      const [notices] = await Promise.all([
        instanceHeadlines.get(),
        fetchStoriesFromSections(userSelectedSections),
      ])
      setHeadlineSection(headlinesToSection(notices))
    } catch (error) {
      if (error instanceof Error) crashlytics().recordError(error)
    }
    setIsRefreshing(false)
  }

  useScrollToTop(ref)

  return (
    <View bg="background" flex={1}>
      <Ribbon
        LeftComponent={() => <React.Fragment />}
        RigthComponent={() => {
          return (
            <TouchableOpacity
              accessibilityLabel="Mi Contenido"
              hitSlop={{ top: 4, left: 4, right: 4, bottom: 4 }}
              onPress={() => navigation.navigate('CustomContent')}>
              <View mr="0.25">
                <Icon name="view-list" color={colors.badgeFont} size={26} />
              </View>
            </TouchableOpacity>
          )
        }}>
        <View alignItems="center">
          <TouchableOpacity
            onPress={() => {
              ref.current?.scrollToLocation({ itemIndex: 1, sectionIndex: 0 })
            }}>
            <View flex={1} justifyContent="center">
              <Logotipo color={colors.badgeFont} width={120} height={24} />
            </View>
          </TouchableOpacity>
        </View>
      </Ribbon>
      <SectionList
        sections={sections}
        renderItem={ItemStory}
        keyExtractor={(item) => item.id}
        ref={ref}
        renderSectionFooter={renderSectionFooter}
        renderSectionHeader={SectionHeader}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            colors={[colors.link]}
            onRefresh={onRefresh}
            progressBackgroundColor={colors.background}
          />
        }
        scrollIndicatorInsets={{ right: 1 }}
        stickySectionHeadersEnabled={false}
        testID="home-list"
        ItemSeparatorComponent={() => <View bg="separator" height={1} mx="1" />}
        ListEmptyComponent={
          <View flex={1} pt="0.75" px="0.75">
            <CardPlaceholder repeat={1} variant="default" />
            <CardPlaceholder repeat={5} variant="magazine" />
          </View>
        }
        ListFooterComponent={<SafeAreaView edges={['bottom']} />}
      />
    </View>
  )
}

export default HomeScreen
