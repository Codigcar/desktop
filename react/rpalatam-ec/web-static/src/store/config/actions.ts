import { isEmptyObject, getBrand } from '../../tools/tools'
import {
  getCategoriesWithDefaultStyles,
  getTopNavigatorFromCategories,
} from './utils'

const brands = ['elcomercio', 'gestion', 'depor', 'peru21', 'trome']
const defaultBrand = 'gestion'

export const initializeConfig = (hostname: string) => async dispatch => {
  const [, domain] = hostname.match(/(\w+)\.\w+$/) || []
  const brand = brands.indexOf(domain) >= 0 ? domain : defaultBrand

  const { default: config } = await require(`./../../config/brand/${brand}`)
  const categoriesWithStyles = getCategoriesWithDefaultStyles(
    config.categories,
    config.defaultProps,
  )
  const categoriesTopNavigator = getTopNavigatorFromCategories(
    config.categories,
  )
  config.categories = categoriesWithStyles
  config.navigation.topTabNavigator = categoriesTopNavigator
  return dispatch({
    type: 'LOADING_CONFIG',
    config,
  })
}

type Category = {
  key: string
  label: string
  path: string
}

export const updateCategoriesFromRN = (
  categories: Category[],
  onUpdateCategories,
) => async dispatch => {
  const brand = getBrand()
  const { default: localConfig } = await require(`../../config/brand/${brand}`)
  const stylesDictionary = localConfig.categories.reduce((styles, category) => {
    const categoryStyles = {}
    if (category.template?.length > 0) {
      categoryStyles['template'] = category.template
    }
    if (category.default?.card && !isEmptyObject(category.default.card)) {
      categoryStyles['default'] = category.default
    }
    return !isEmptyObject(categoryStyles)
      ? { ...styles, [category.key]: categoryStyles }
      : styles
  }, {})

  try {
    categories.forEach(category => {
      const categoryStyles = stylesDictionary[category.key]
      if (!!categoryStyles && categoryStyles.template) {
        category['template'] = categoryStyles.template
      }
      if (!!categoryStyles && categoryStyles.default) {
        category['default'] = categoryStyles.default
      }
    })
    localConfig.categories = categories
  } finally {
    localConfig.categories = getCategoriesWithDefaultStyles(
      categories,
      localConfig.defaultProps,
    )
    localConfig.navigation.topTabNavigator = categories
  }
  onUpdateCategories(localConfig.navigation.topTabNavigator)
  return dispatch({
    type: 'LOADING_CONFIG',
    config: localConfig,
  })
}
