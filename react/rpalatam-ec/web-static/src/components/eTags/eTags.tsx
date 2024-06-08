import * as React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

import { RN_SCREENS_STORY_V2 } from '../../tools/flags'
import NativeAPI from '../../tools/nativeApi'
import { getBrand, getDomain, tagScreenAvailable } from '../../tools/tools'

type Tag = {
  code: string
  titulo?: string
  slug?: string
}

interface Props {
  tags: Tag[]
}

const BRAND = getBrand()
const DOMAIN = getDomain()
const TAG_SCREEN_AVAILABLE = tagScreenAvailable()
const openOnNativeSide =
  TAG_SCREEN_AVAILABLE && ['depor', 'peru21', 'trome'].includes(BRAND)

const ETags: React.FC<Props> = props => {
  const { tags } = props

  function handleClick(event: React.SyntheticEvent, tag: Tag) {
    if (!openOnNativeSide) return
    event.preventDefault()
    NativeAPI.navigate('Tag', {
      name: tag.titulo || '',
      path: tag.slug || tag.code,
    })
  }

  if (RN_SCREENS_STORY_V2()) {
    return (
      <div className="eTags">
        {tags.map(tag => (
          <a
            className="tag"
            href={`https://${DOMAIN}/noticias/${tag.code}/`}
            key={tag.code}
            rel="noopener noreferrer"
            target="_blank"
          >
            {tag.titulo}
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className="eTags">
      {tags.map((tag, index) => (
        <Link
          className="tag"
          key={index}
          onClick={event => {
            handleClick(event, tag)
          }}
          to={{
            pathname: `/tags/${tag.code}`,
            state: {
              title: tag.titulo,
              followState: {
                keyType: 'tags',
                body: {
                  _id: tag.code,
                  name: tag.titulo,
                  slug: tag.slug || tag.code,
                },
              },
            },
          }}
        >
          {tag.titulo}
        </Link>
      ))}
    </div>
  )
}

export default React.memo(ETags)
