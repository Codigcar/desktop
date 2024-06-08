import * as React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import './index.css'

import ECard from '../eCard'
import type { FormattedNews } from '../../services/types'

interface RelatedLink {
  id: string
  content: string
  path: string
}

type Props = React.HTMLAttributes<HTMLUListElement> & {
  related: (FormattedNews | RelatedLink)[]
}

const EList: React.FC<Props> = ({ related, className, ...restProps }) => {
  const classes = classNames('e-list', className)

  if (related.length === 0) return null

  return (
    <ul className={classes} {...restProps}>
      {related.map((item, index) => {
        const itemLink = item as RelatedLink
        const itemStory = item as FormattedNews

        if (itemStory.nid) {
          return (
            <li key={itemStory.nid} className="e-card__wrapper">
              <ECard
                content={itemStory}
                media
                routePath={`${itemStory.url}?source=post_related-story-${index}`}
                share
                timeRead
                type="magazine"
              />
            </li>
          )
        }
        if (!itemLink.content) return null
        if (!itemLink.path) {
          return (
            <li
              key={itemLink.id}
              className="e-list-text"
              dangerouslySetInnerHTML={{ __html: itemLink.content }}
            />
          )
        }
        if (/<a([^>]+)>(.+?)<\/a>/gi.test(itemLink.content)) {
          return (
            <React.Fragment key={index}>
              <div
                className="e-link-related"
                dangerouslySetInnerHTML={{
                  __html: itemLink.content,
                }}
              />
            </React.Fragment>
          )
        }
        return (
          <li className="e-list-related" key={itemLink.id}>
            <Link to={`${itemLink.path}?source=post_related-link-${index}`}>
              <h4 className="font-serif">{itemLink.content}</h4>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default React.memo(EList)
