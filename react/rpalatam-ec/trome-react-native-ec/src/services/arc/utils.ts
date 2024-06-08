import * as T from './types'
import { Story } from '../../entities/Story'
import { getDomain } from '../../utils/tools'

export const getPromoItems = (
  items: T.PromoItems = {},
  limit?: number,
): Story['promo_items'] => {
  const domain = getDomain()
  const promo_items: Story['promo_items'] = {}

  if (items.basic_jwplayer) {
    promo_items.video = {
      id: '1',
      thumb: items.basic_jwplayer.embed?.config.thumbnail_url || '',
      provider: 'jwplayer',
    }
  }

  if (items.basic_gallery) {
    const images = items.basic_gallery.content_elements || []
    const gallery = images.slice(0, limit).map((image, i) => ({
      id: `${i}`,
      url: image.url,
    }))
    promo_items.gallery = gallery
  }

  if (items.basic) {
    const urlResize =
      items.basic.additional_properties?.fullSizeResizeUrl?.replace(
        /^(\/?)\w*(\/?)resize(r)?\//g,
        `https://${domain}/resizer/`,
      )
    promo_items.basic = { id: '1', url: urlResize || items.basic.url }
  }

  return promo_items
}

export const getType = (items: T.PromoItems = {}): Story['type'] => {
  if (items.basic_gallery) return 'gallery'
  if (items.basic_video || items.basic_jwplayer) return 'video'
  return 'basic'
}

function getReadingTime(wordCount?: number): number | undefined {
  if (!wordCount) return
  const wordsPerMinute = 200
  const minutes = wordCount / wordsPerMinute
  return Math.ceil(minutes)
}

export function getStoryFormated(notice: T.Notice): Story {
  return new Story({
    id: notice._id,
    headline: notice.headlines?.basic,
    last_updated_date: notice.last_updated_date,
    promo_items: getPromoItems(notice.promo_items, 1),
    reading_time: getReadingTime(
      notice.planning?.story_length?.word_count_actual,
    ),
    restrictions: notice.content_restrictions?.content_code,
    section: notice.taxonomy?.primary_section && {
      name: notice.taxonomy.primary_section.name || '',
      path: notice.taxonomy.primary_section.path || '',
    },
    subheadline: notice.subheadlines?.basic,
    type: getType(notice.promo_items),
    url: notice.canonical_url,
  })
}

export function getContentFormated(data: T.ServiceNews): Story[] {
  const stories = data.content_elements.filter(
    (story) => story.canonical_url && story.type === 'story',
  )
  return stories.map(getStoryFormated)
}
