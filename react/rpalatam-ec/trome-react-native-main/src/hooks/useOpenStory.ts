import { useNavigation, useRoute } from '@react-navigation/native'
import { useCallback, useEffect, useMemo } from 'react'

import { useMainNavigation } from '../context/navigation'
import { Story } from '../entities/Story'
import { ENABLE_SCREEN_STORY } from '../utils/flags'
import history from '../utils/history'
import type { MainStackScreenProps } from '../routes/types'

const ref: { id: string | null; pathname: string | null } = {
  id: null,
  pathname: null,
}

const useOpenStory = (currentScreen: string): ((story: Story) => void) => {
  const navigation = useNavigation<MainStackScreenProps<'Home'>['navigation']>()
  const route = useRoute()
  const { categories } = useMainNavigation()
  const categoriesPath = useMemo(() => {
    return categories.map(({ path }) => path.replace(/^\/category/, ''))
  }, [categories])

  useEffect(() => {
    return navigation.addListener('beforeRemove', () => {
      ref.id = null
      ref.pathname = null
    })
  }, [navigation])

  const main = useCallback(
    (story: Story) => {
      if (ENABLE_SCREEN_STORY) {
        if (ref.id === story.id || ref.pathname === story.url) return
        ref.id = story.id || null
        ref.pathname = story.url || null
        navigation.push('Story', { id: story.id, pathname: story.url })
        return
      }

      const category = categoriesPath.find((path) =>
        story.url?.startsWith(path),
      )
      const prefix = !!category ? '' : '/news'
      const path = `${prefix}${story.url}?ref=${route.name}Screen`
      history.push(path, {
        section: currentScreen,
        pageInfo: {
          screenName: route.name,
          params: route.params,
        },
      })
      navigation.navigate('Main', {
        screen: 'Home',
        params: { screen: 'Feed' },
      })
    },
    [categoriesPath, currentScreen, navigation, route],
  )

  return main
}

export default useOpenStory
