import AsyncStorage from '@react-native-async-storage/async-storage'

import { STORE_CATEGORIES } from './constants'
import type { NavigationItem } from './navigation'

export type NavCategory = NavigationItem & {
  active?: boolean
  required?: boolean
}

/* utils */
const _required = ({ required }: NavCategory) => !!required
const _notRequired = ({ required }: NavCategory) => !required

export const loadLocalCategories = async (): Promise<
  NavCategory[] | undefined
> => {
  const localStr = await AsyncStorage.getItem(STORE_CATEGORIES)
  return localStr ? JSON.parse(localStr) : undefined
}

export const composeCategoriesWithLocal = (
  navigationCategories: NavCategory[],
  localCategories: NavCategory[],
): NavCategory[] => {
  const requiredCategories = navigationCategories.filter(_required)
  const notRequiredCategories = navigationCategories.filter(_notRequired)

  const userCategories = localCategories
    .filter(_notRequired)
    .map(({ path, ...rest }) => ({
      ...rest,
      path: path.includes('/category') ? path : `/category${path}`,
    }))

  const notRequiredCategoriesKeys = notRequiredCategories.map(({ key }) => key)

  const nextSavedCategories: NavCategory[] = []

  userCategories.forEach((userCategory) => {
    if (notRequiredCategoriesKeys.includes(userCategory.key)) {
      const index = notRequiredCategories.findIndex(
        ({ key }) => key === userCategory.key,
      )
      notRequiredCategories.splice(index, 1)
      nextSavedCategories.push(userCategory)
    }
  })

  return [
    ...requiredCategories,
    ...nextSavedCategories,
    ...notRequiredCategories,
  ]
}
