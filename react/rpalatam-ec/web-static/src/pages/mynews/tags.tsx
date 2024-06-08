import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect, RouteComponentProps } from 'react-router-dom'
import ECard from '../../components/eCard'
import InfiniteScroll from '../../components/eInfiniteScroll'
import ERibbon from '../../components/eRibbon'
import { FormattedNews } from '../../services/types'
import { Tag } from '../../store/preferences/types'
import { RootState } from '../../store/reducers'
import { fetchTags } from './utils'
import './index.css'
import { CardMagazinePlaceHolder } from '../../components/ePlaceHolder'

const fetchSize = 10

function MyTags({ location, history }: RouteComponentProps) {
  const [results, setResults] = useState<FormattedNews[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const { tags, name } = useSelector(
    ({ preferences: { tags }, configBrand: { name = '' } }: RootState) => ({
      tags,
      name,
    }),
  )

  const selectedTag = new URLSearchParams(location.search).get('tag') || ''

  const searchTags = useCallback(
    (tags, from = 0) => {
      fetchTags(tags, { website: name, size: fetchSize, from }).then(news => {
        if (news.length > 0) {
          setResults(prevResults => [...prevResults, ...news])
          if (news.length < fetchSize) {
            setHasMore(false)
          }
        } else {
          setHasMore(false)
        }
        setIsLoading(false)
      })
    },
    [name],
  )

  useEffect(() => {
    setHasMore(true)
    setResults([])
    setIsLoading(true)
    if (tags[selectedTag]) {
      searchTags({ [selectedTag]: tags[selectedTag] })
    } else {
      searchTags(tags)
    }
  }, [tags, selectedTag, searchTags])

  function loadMore(page: number) {
    const calculatedFrom = page * fetchSize
    const filteredTags = tags[selectedTag]
      ? { [selectedTag]: tags[selectedTag] }
      : tags
    searchTags(filteredTags, calculatedFrom)
    setHasMore(page < 4)
  }

  function handleSelectTag(tag: Tag) {
    history.replace({
      search: tag.slug !== selectedTag ? `?tag=${tag.slug}` : '',
    })
  }

  const parsedTags = Object.values(tags)

  if (parsedTags.length === 0) {
    return <Redirect to="/mynews" />
  }

  return (
    <section className="internal-page mytags">
      <ERibbon content={{ seccion: { nombre: 'Mis Temas' } }} />
      <Link className="preference__see-all" to="/tags">
        Ver todos
      </Link>
      <main className="mytags__results-wrapper safe-area-pt-48 safe-area-pb pt-48">
        <div className="mytags__tags-wrapper">
          {parsedTags.slice(0, 5).map(tag => (
            <button
              key={tag._id}
              className={`mytags__tag ${
                selectedTag === tag._id ? 'active' : ''
              }`}
              disabled={isLoading}
              onClick={() => handleSelectTag(tag)}
            >
              {tag.name}
            </button>
          ))}
        </div>
        {!isLoading ? (
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} useWindow>
            {results.map((item, i) => (
              <div className="e-card__wrapper" key={`${item.nid}-${i}`}>
                <ECard
                  content={item}
                  header
                  routePath={item.url}
                  type="magazine"
                  footer
                  media
                  timeRead
                />
              </div>
            ))}
          </InfiniteScroll>
        ) : (
          <CardMagazinePlaceHolder repeat={4} />
        )}
      </main>
    </section>
  )
}

export default MyTags
