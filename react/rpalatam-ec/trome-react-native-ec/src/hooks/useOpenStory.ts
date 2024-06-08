import { useNavigation, useRoute } from '@react-navigation/native'
import { useCallback, useMemo } from 'react'

import { useMainNavigation } from '../context/navigation'
import { Story } from '../entities/Story'
import { ENABLE_SCREEN_STORY } from '../utils/flags'
import history from '../utils/history'
import type { RootStackScreenProps } from '../routes/types'

const useOpenStory = (currentScreen: string): ((story: Story) => void) => {
  const navigation = useNavigation<RootStackScreenProps<'Main'>['navigation']>()
  const route = useRoute()

  const { categories } = useMainNavigation()
  const categoriesPath = useMemo(() => {
    return categories.map(({ path }) => path.replace(/^\/category/, ''))
  }, [categories])

  const main = useCallback(
    (story: Story) => {
      if (ENABLE_SCREEN_STORY) {
        navigation.push('Main', {
          screen: 'Story',
          params: { id: story.id, pathname: story.url },
        })
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
