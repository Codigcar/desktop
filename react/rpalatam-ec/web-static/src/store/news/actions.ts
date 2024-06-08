/* eslint-disable no-underscore-dangle */
import * as types from './types'
import NewsService from '../../services/news'
import { getQueryPortrait } from '../../services/querys'

const newsHasErrored = (bool, message, errorType): types.ErrorActionType => ({
  type: types.NEWS_HAS_ERRORED,
  payload: {
    hasErrored: bool,
    message,
    errorType,
  },
})

const aNewCategoryPage = (category, page = 0): types.CategoryPageActionType => {
  return {
    type: types.A_NEW_CATEGORY_PAGE,
    payload: {
      category,
      page,
    },
  }
}

const breakingNews = news => ({
  type: types.NEWS_BREAKING,
  payload: news,
})

const testAds = false
const addTemplate = ({ news, template, defaultProps }): object[] => {
  const result: object[] = []
  const dataLength = news.length
  const ads = template.filter(t => t.active && t.data.type === 'ads')
  let indexAds = 0
  news.forEach((elm, i) => {
    // Push elements follow template
    const tmpIndex = template.findIndex(d => d.index === i + 1)
    if (tmpIndex > -1) {
      const tmp = template[tmpIndex]
      if (tmp.type === 'notice') {
        result.push({ ...elm, ...tmp.data })
      } else {
        if (
          (!testAds && tmp.active) ||
          (testAds && tmp.active && tmp.data.type !== 'ads')
        ) {
          result.push(tmp.data)
        }
        result.push({ ...elm, ...defaultProps.card })
      }
    } else {
      // Push notice
      result.push({ ...elm, ...defaultProps.card })
    }

    // Push ads
    if (testAds && (i + 1) % 4 === 0) {
      result.push({
        ...ads[indexAds].data,
        nid: `${ads[indexAds].data.id}${i}`,
      })
      if (indexAds + 1 < ads.length) {
        indexAds += 1
      } else {
        indexAds = 0
      }
    }

    // Push last elements template
    if (dataLength === i + 1) {
      const lastElements = template
        .filter(tmp => tmp.index > dataLength && tmp.active && tmp.includeToEnd)
        .map(tmp => tmp.data)
      result.push(...lastElements)
    }
  })
  return result
}

const onSuccess = (
  prevNews,
  category,
  aNews,
  { defaultProps, template },
): types.FetchNewsActionTypes => {
  const data = {}
  if (prevNews) {
    const prevOnlyData = prevNews.filter(
      d => d.type !== 'ads' && d.type !== 'section' && d.type !== 'carousel',
    )
    const pageLastIds = prevOnlyData.slice(-15).map(n => n.nid)
    const lastNews = aNews[category].filter(
      item => pageLastIds.indexOf(item.nid) === -1,
    )
    data[category] = addTemplate({
      news: [...prevOnlyData, ...lastNews],
      template,
      defaultProps,
    })
  } else {
    data[category] = addTemplate({
      news: aNews[category],
      template,
      defaultProps,
    })
  }
  return {
    type: types.A_NEW_FETCH_SUCCESS,
    payload: {
      data,
    },
  }
}

export const newFetchCategories = (
  categories: string[] = [],
  params = { page: 0 },
  callback?: (any) => void,
  template?: unknown[],
) => (dispatch, getState): void => {
  try {
    const { aNewFetchSuccess, configBrand } = getState()
    const category: string = categories.shift() || ''
    // if (aNewFetchSuccess[category] && params.page === 0) return
    const newService = new NewsService()
    const isHome = category === 'portada'
    const fetchContent = newService.content(
      {
        query: getQueryPortrait(category),
        website: configBrand.name,
        sort: 'last_updated_date:desc',
        from: (params.page || 0) * 10,
        size: 10,
      },
      isHome,
    )
    fetchContent
      .then(({ breaking = [], content: news }) => {
        let tmp = configBrand.categories.find(elm => elm.key === category)
        if (!tmp && !!configBrand.templates) {
          tmp = configBrand.templates.find(elm => elm._id === category)
        }
        if (!tmp) tmp = { default: {}, template: [] }
        const aNew = {}
        aNew[category] = news
        if (isHome) dispatch(breakingNews(breaking))
        dispatch(aNewCategoryPage(category, params.page))
        dispatch(
          onSuccess(
            params.page === 0 ? null : aNewFetchSuccess[category],
            category,
            aNew,
            {
              defaultProps: tmp.default,
              template: [
                ...tmp.template,
                ...(template || []),
                ...configBrand.ads.home,
              ],
            },
          ),
        )
        return aNew
      })
      .then(response => {
        callback?.(response)
      })
      .then(() => categories[0] && dispatch(newFetchCategories(categories)))
      .catch(error => {
        callback?.({ status: 'error' })
        dispatch(newsHasErrored(true, error, 'FETCH'))
      })
  } catch (err) {
    callback?.({ status: 'error' })
    dispatch(newsHasErrored(true, err, 'FETCH'))
  }
}

export const refreshCategoryNews = (
  category = '',
  callback?: () => void,
  template?: unknown[],
) => (dispatch): void => {
  const promise = Promise.resolve(category)
  promise.then(() => {
    dispatch(newFetchCategories([category], { page: 0 }, callback, template))
  })
}
