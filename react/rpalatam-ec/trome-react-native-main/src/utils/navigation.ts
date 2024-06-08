import crashlytics from '@react-native-firebase/crashlytics'

import { getRemoteValue } from './firebase'
import { getDomain } from './tools'
import ServiceCategories, { ResponseCategory } from '../services/categories'

export type NavigationItem = {
  key: string
  label: string
  path: string
  type: 'category' | 'external-page' | 'internal-page'
}

function formatNavigationItem(item: ResponseCategory): NavigationItem {
  const { _id, name, display_name = name, url = _id } = item
  const key = _id.replace(/\//g, '')
  const label = display_name
  const path = /\/$/.test(url) ? url : `${url}/`

  const [, tag] = path.match(/noticias\/(.+?)\//) || []
  if (tag) {
    return { key, label, path: `/tags/${tag}`, type: 'internal-page' }
  }

  if (/^https?:\/\//.test(path)) {
    return { key, label, path, type: 'external-page' }
  }

  const [, category] = path.match(/^\/(\b[^/]*)\/$/) || []
  if (category) {
    return {
      key: category,
      label,
      path: `/category/${category}`,
      type: 'category',
    }
  }

  const domain = getDomain()
  return { key, label, path: `https://${domain}${path}`, type: 'external-page' }
}

async function fetchCategories(): Promise<ResponseCategory[]> {
  crashlytics().log('Fetch categories')
  try {
    const { children } = await ServiceCategories.get({ cache: true })
    return children
  } catch (error) {
    crashlytics().recordError(error)
    return []
  }
}

export async function getMainNavigation(): Promise<NavigationItem[]> {
  const categoriesFetched = await fetchCategories()
  const remoteFilter = getRemoteValue('category_filter').asString()

  const { blacklist = {}, whitelist = {} } = JSON.parse(remoteFilter || '{}')

  const items = categoriesFetched
    .filter((item) => !blacklist[item._id])
    .map((item) => ({ ...item, url: whitelist[item._id] || item.url }))
    .map((item) => formatNavigationItem(item))
    .filter((item): item is NavigationItem => item !== null)

  const remoteNavigation = getRemoteValue('default_categories').asString()
  const navigation: NavigationItem[] = JSON.parse(remoteNavigation || '[]')
  const defaultItems = navigation.filter(
    (remoteItem) => !items.find((item) => item.key === remoteItem.key),
  )

  return [...defaultItems, ...items]
}
