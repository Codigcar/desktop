import {
  getContentFormated,
  getPromoItems,
  getStoryFormated,
  getType,
} from '../utils'

const promo_items = {
  basic_jwplayer: {
    embed: {
      config: {
        thumbnail_url: '',
      },
    },
  },
  basic_gallery: {
    content_elements: [
      { _id: '', url: '' },
      { _id: '', url: '' },
    ],
  },
  basic: {
    _id: '',
    additional_properties: {
      fullSizeResizeUrl: '/resizer/abc.jpg',
    },
    url: '',
  },
}
const video_item = { basic_jwplayer: promo_items.basic_jwplayer }
const gallery_item = { basic_gallery: promo_items.basic_gallery }
const basic_item = { basic: promo_items.basic }

describe('news utils', () => {
  it('getPromoItems from story', () => {
    expect(JSON.stringify(getPromoItems({}))).toBe(JSON.stringify({}))
    expect(getPromoItems(video_item)?.video?.thumb).toBe('')
    expect(getPromoItems(gallery_item)?.gallery?.length).toBe(2)
    expect(getPromoItems(gallery_item, 1)?.gallery?.length).toBe(1)
    expect(getPromoItems(basic_item)?.basic?.url).toMatch(
      /\/resizer\/abc\.jpg$/,
    )
  })

  it('getType from story', () => {
    expect(getType(video_item)).toBe('video')
    expect(getType(gallery_item)).toBe('gallery')
    expect(getType(basic_item)).toBe('basic')
  })

  it('getStories', () => {
    const stories = getContentFormated({
      type: '',
      content_elements: [
        {
          _id: '',
          canonical_url: 'url',
          last_updated_date: '',
          headlines: {
            basic: 'headline',
          },
          planning: {
            story_length: {
              word_count_actual: 400,
            },
          },
          type: 'story',
        },
      ],
    })
    expect(stories.length).toBe(1)
    const [story] = stories
    expect(story.headline).toBe('headline')
    expect(story.reading_time).toBe(2)
  })

  it('get section from notice', () => {
    expect(getStoryFormated({ _id: 'id' }).section).toBeUndefined()
    const taxonomy = { primary_section: { name: 'Name', path: '/path' } }
    expect(getStoryFormated({ _id: 'id', taxonomy }).section).toEqual(
      taxonomy.primary_section,
    )
    expect(
      getStoryFormated({ _id: 'id', taxonomy: { primary_section: {} } })
        .section,
    ).toEqual({ name: '', path: '' })
  })
})
