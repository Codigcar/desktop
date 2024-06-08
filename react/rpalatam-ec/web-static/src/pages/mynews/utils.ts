import { getQueryAuthor, getQueryTags } from '../../services/querys'
import NewsService from '../../services/news'

type Params = {
  website: string
  from?: number
  size?: number
}

export async function fetchAuthors(authors, params: Params) {
  try {
    const keys = Object.keys(authors || {})
    const slugs = keys.map(key => `"${authors[key].slug}"`)
    if (slugs.length === 0) throw new Error('Without authors')
    const _params = {
      query: getQueryAuthor(`(${slugs.join(',')})`),
      website: params.website,
      from: params.from || 0,
      size: params.size || 3,
      sort: 'last_updated_date:desc',
    }

    const service = new NewsService()
    const { content: data } = await service.content(_params)
    return data
  } catch (err) {
    return []
  }
}

export async function fetchTags(tags, params: Params) {
  try {
    const keys = Object.keys(tags || {})
    const slugs = keys.map(key => tags[key].slug)
    if (slugs.length === 0) throw new Error('Without tags')
    const _params = {
      query: getQueryTags(slugs.join('|')),
      website: params.website,
      from: params.from || 0,
      size: params.size || 3,
      sort: 'last_updated_date:desc',
    }
    const service = new NewsService()
    const { content: data } = await service.content(_params)
    return data
  } catch (err) {
    return []
  }
}
