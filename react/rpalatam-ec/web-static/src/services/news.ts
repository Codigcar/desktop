/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/camelcase */
import { getBrand, getDomain, queryString } from '../tools/tools'
import { FormattedNews, Notice, ServiceNews, Query } from './types'
import {
  getJwplayerAttributes,
  getPowaAttributes,
  getYoutubeAttributes,
} from '../components/eVideo/utils'

function getAttribute(attr: string, note: Notice): any {
  const content = note.content_elements || []
  const media = note.promo_items || {}
  const section = note.taxonomy?.primary_section
  const tags = note.taxonomy?.tags || []

  switch (attr) {
    case 'content':
      return content.map(item => {
        if (item.type === 'header') {
          return {
            id: item._id,
            data: `<h2>${item.content}</h2>`,
            type: 'html',
          }
        }

        if (
          item.type === 'raw_html' ||
          item.type === 'text' ||
          item.type === 'blockquote'
        ) {
          return {
            id: item._id,
            data: item.content,
            type: 'html',
          }
        }

        if (
          item.type === 'custom_embed' &&
          item.subtype === 'custom-ec-blocks' &&
          item.embed?.config?.block === 'highlighted-quotes'
        ) {
          return {
            id: item._id,
            data: item?.embed?.config?.data || {},
            type: 'custom-ec-blocks',
          }
        }

        if (
          item.type === 'custom_embed' &&
          item.subtype === 'custom-ec-blocks' &&
          item.embed?.config?.block === 'despiece'
        ) {
          return {
            id: item._id,
            data: item?.embed?.config?.data || {},
            type: 'despiece',
          }
        }

        if (item.type === 'image') {
          return {
            data: {
              description: item.caption,
              ruta: item.url,
              thumb: item.url,
              type: 'image',
            },
            type: 'imagen',
          }
        }

        if (item.type === 'custom_embed' && item.subtype === 'video_jwplayer') {
          return getJwplayerAttributes(item)
        }
        if (
          item.type === 'custom_embed' &&
          item.embed?.config?.block === 'recommended-video'
        ) {
          return getJwplayerAttributes({
            embed: { config: item.embed.config.data },
          })
        }
        if (item.type === 'video') {
          return getPowaAttributes(item)
        }

        if (item.type === 'list') {
          const regexContent = /(<([^>]+)>)/gi
          const regexContentWithLink = /(<((?!\/?a)[^>]+)>)/gi
          const regexPath = /(\w+\.+\w+)+(.*-noticia\/)/
          const related = item.items
            ?.filter(related => related.type === 'text')
            .map(related => {
              const [, , path] = related.content.match(regexPath) || []
              const content =
                item.list_type === 'unordered'
                  ? related.content
                  : related.content.replace(
                      path ? regexContent : regexContentWithLink,
                      '',
                    )
              return {
                id: related._id,
                path,
                content,
              }
            })
          return {
            related,
            type: 'related',
          }
        }

        if (item.type === 'table') {
          return {
            id: item._id,
            data: {
              header: item.header || [],
              rows: item.rows || [[]],
            },
            type: item.type,
          }
        }

        return {
          type: 'other',
          data: '',
        }
      })
    case 'media':
      if (media.basic_jwplayer) {
        return getJwplayerAttributes(media.basic_jwplayer)
      }
      if (media.youtube_id) {
        return getYoutubeAttributes({
          id: media.youtube_id.content,
          thumb: media.basic?.url,
        })
      }
      if (media.basic_video) return getPowaAttributes(media.basic_video)

      if (media.basic_gallery) {
        const promoItems = media.basic_gallery.promo_items?.basic
        const images =
          media.basic_gallery.content_elements ||
          (promoItems ? [promoItems] : [])
        const gallery = images.map(({ caption, subtitle, url, _id: id }) => ({
          description: caption,
          id,
          ruta: url,
          title: subtitle,
          thumb: url,
          type: 'image',
        }))
        return gallery
      }

      if (media.basic) {
        const urlResize = media.basic.additional_properties?.fullSizeResizeUrl?.replace(
          /^(\/?)\w*(\/?)resize(r)?\//g,
          `https://${domain}/resizer/`,
        )
        return [
          {
            description: media.basic.caption,
            ruta: media.basic.url,
            thumb: urlResize || media.basic.url,
            type: 'image',
          },
        ]
      }
      return null
    case 'type':
      if (media.basic_gallery) return 'galeria'
      if (media.basic_video || media.basic_jwplayer || media.youtube_id) {
        return 'video'
      }
      return 'image'
    case 'section':
      if (section?.type === 'reference') {
        return {
          code: section.referent?.id,
          nombre: 'Otros',
          url: section.referent?.id,
        }
      }
      const [, id] = section?.path?.split('/') || []
      return {
        adSection: id?.replace(/-/g, '') || 'default',
        code: section?.path,
        nombre: section?.name,
        url: section?.path,
      }
    case 'tags':
      const formatTags = tags.map(tag => ({
        code: tag.slug,
        slug: tag.slug,
        titulo: tag.text,
      }))
      return formatTags
    default:
      return undefined
  }
}

function readingTime(wordCount?: number): null | string {
  if (!wordCount) return null
  const wordsPerMinute = 200
  const minutes = wordCount / wordsPerMinute
  const readTime = Math.ceil(minutes)
  return `${readTime} min de lectura`
}

export function getContentFormated(
  data: Notice | ServiceNews | Notice[],
): FormattedNews[] {
  let typeContent: Notice[] = []
  const type = Array.isArray(data) ? 'list' : data?.type
  if (type === 'story') {
    typeContent = [data as Notice]
  } else if (type === 'results') {
    typeContent = (data as ServiceNews).content_elements.filter(
      story => story.canonical_url && story.type === 'story',
    )
  } else {
    typeContent = data as Notice[]
  }

  const formatContent = typeContent.map((note: Notice) => {
    const authorsList = note.credits?.by || []
    const author = authorsList.find(author => author.name)
    const content = getAttribute('content', note).filter(
      item => item.type !== 'other',
    )
    const contentstr = content.map(item => item.data).join('')
    const section = getAttribute('section', note)
    return {
      audio: note.promo_items?.path_mp3?.content,
      bajada: note.subheadlines?.basic,
      contenido: contentstr,
      contenido_json: content,
      creditos: author,
      fecha_publicacion: note.last_updated_date,
      media: getAttribute('media', note),
      nid: note._id,
      promo_items: note.promo_items,
      relacionados: note.related_content?.basic || [],
      restrictions: note.content_restrictions?.content_code,
      seccion: section,
      seccion_padre: section,
      tags: getAttribute('tags', note),
      tiempo_lectura: readingTime(
        note.planning?.story_length?.word_count_actual,
      ),
      tipo: getAttribute('type', note),
      titulo: note.headlines?.basic,
      url: note.canonical_url,
    }
  })
  return formatContent
}

function removeDuplicateNews(data: ServiceNews): ServiceNews {
  const ids: string[] = []
  const dataFilter = data.content_elements.reduce(
    (prevValue: Notice[], value) => {
      if (ids.indexOf(value._id) < 0) {
        ids.push(value._id)
        return [...prevValue, value]
      }
      return prevValue
    },
    [],
  )
  return { ...data, content_elements: dataFilter }
}

interface NewsElements {
  breaking?: { title: string; url: string }[]
  content: FormattedNews[]
}

const brand = getBrand()
const domain = getDomain()
export default class News {
  controller: any

  abort(): void {
    if (this.controller) {
      this.controller.abort()
    }
  }

  async content(query: Query, isHome?: boolean): Promise<NewsElements> {
    let URL = `https://ans.${domain}/arcio/ans/${queryString(query)}`
    if (isHome) {
      URL = `${process.env.REACT_APP_HOME_CLOUDFRONT}/${brand}/home.json`
    }

    const request = window.Request ? new Request(URL, {}) : URL
    this.controller = window.AbortController && new AbortController()
    if (!this.controller) {
      require('abortcontroller-polyfill/dist/polyfill-patch-fetch')
    }

    const res = await fetch(request, {
      signal: this.controller?.signal,
    })
    const data = await res.json()
    if (isHome) {
      const length = { gestion: 8 }
      const segmentedData = {
        ...data,
        content_elements: data.content_elements.slice(0, length[brand]),
      }
      const filteredData = removeDuplicateNews(segmentedData)
      return {
        breaking: data.breaking_elements,
        content: getContentFormated(filteredData),
      }
    }
    return {
      breaking: data.breaking_elements,
      content: getContentFormated(data),
    }
  }
}
