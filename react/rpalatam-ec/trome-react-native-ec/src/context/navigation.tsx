import AsyncStorage from '@react-native-async-storage/async-storage'
import analytics from '@react-native-firebase/analytics'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import * as utils from '../utils/categories'
import { STORE_CATEGORIES } from '../utils/constants'
import { NavigationItem, getMainNavigation } from '../utils/navigation'
import { HomeWebviewRef } from '../utils/refs'
import type { NavCategory } from '../utils/categories'

type SetListOfCategory =
  | NavCategory[]
  | ((prevState: NavCategory[]) => NavCategory[])

type Context = {
  categories: NavCategory[]
  mainNavigation: NavigationItem[]
  sendCategoriesToWebview: () => void
  setListOfCategory: (categories: SetListOfCategory) => Promise<void>
}

const NavigationContext = createContext<Context>({} as Context)

export const NavigationProvider: React.FC = ({ children }) => {
  const [mainNavigation, setMainNavigation] = useState<NavigationItem[]>([])
  const [categories, setCategories] = useState<NavCategory[]>([])
  const refCategories = useRef<NavCategory[]>([])

  const sendCategoriesToWebview = useCallback(() => {
    HomeWebviewRef.current?.injectJavaScript(`(function() {
      if (window.NATIVE_CONNECTION && window.NATIVE_CONNECTION.categories) {
        window.NATIVE_CONNECTION.categories.setCategoriesConfig(${JSON.stringify(
          categories,
        )});
      }
    })();`)
  }, [categories])

  const setListOfCategory = useCallback(
    async (listOfCategory: SetListOfCategory) => {
      const { current } = refCategories
      const isFn = typeof listOfCategory === 'function'
      const list = isFn ? listOfCategory(current) : listOfCategory

      const changed = list.find((category) => {
        const item = current.find(({ key }) => key === category.key)
        if (!item) return false
        return !item.active !== !category.active
      })
      if (changed) {
        const name = changed.active ? 'add_to_home' : 'remove_from_home'
        await analytics().logEvent(name, {
          id: changed.key,
          name: changed.label,
          type: 'section',
        })
      }

      await AsyncStorage.setItem(STORE_CATEGORIES, JSON.stringify(list))
      setCategories(list)
    },
    [],
  )

  const initNavigation = useCallback(async () => {
    const [navigation, localCategories] = await Promise.all([
      getMainNavigation(),
      utils.loadLocalCategories(),
    ])
    setMainNavigation(navigation)

    const categoryList = navigation
      .filter((item) => item.type === 'category')
      .map((item, index) => ({
        active: index < 7,
        required: item.key === 'portada',
        ...item,
      }))

    if (refCategories.current.length === 0 && !localCategories) {
      setCategories(categoryList)
      return
    }

    const composedCategories = utils.composeCategoriesWithLocal(
      categoryList,
      localCategories || refCategories.current,
    )
    setCategories(composedCategories)
  }, [])

  useEffect(() => {
    initNavigation()
  }, [initNavigation])

  useEffect(() => {
    if (categories.length > 0) sendCategoriesToWebview()
    refCategories.current = categories
  }, [categories, sendCategoriesToWebview])

  return (
    <NavigationContext.Provider
      value={{
        categories,
        mainNavigation,
        sendCategoriesToWebview,
        setListOfCategory,
      }}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useMainNavigation = (): Context => useContext(NavigationContext)
