import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import ECard from '../../components/eCard'
import InfiniteScroll from '../../components/eInfiniteScroll'
import { CardMagazinePlaceHolder } from '../../components/ePlaceHolder'
import ERibbon from '../../components/eRibbon'
import { FormattedNews } from '../../services/types'
import { RootState } from '../../store/reducers'
import { fetchAuthors } from '../mynews/utils'

type RouteState = {
  followState?: {
    keyType: string
    body: any
  }
}

const FETCH_SIZE = 10

function AuthorIndividualPage({
  location,
}: RouteComponentProps<{}, {}, RouteState>) {
  const { followState } = location.state || {}
  const [data, setData] = useState<FormattedNews[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const config = useSelector((state: RootState) => state.configBrand)

  function loadMore(page: number) {
    const author = followState?.body || {}
    fetchAuthors(
      { [author._id]: author },
      { website: config.name + '', from: page * FETCH_SIZE, size: FETCH_SIZE },
    ).then(news => {
      setHasMore(page < 4)
      setData(prevData => [...prevData, ...news])
    })
  }

  useEffect(() => {
    if (followState) {
      const { body: author } = followState
      fetchAuthors(
        { [author._id]: author },
        {
          website: config.name!,
          size: FETCH_SIZE,
        },
      ).then(news => {
        setIsLoading(false)
        setData(news)
        if (news.length < FETCH_SIZE) {
          setHasMore(false)
        }
      })
    }
  }, [followState, config.name])

  return (
    <section className="internal-page author-page">
      <ERibbon
        content={{
          seccion: {
            nombre: followState?.body?.name || 'Autor',
            followState: {
              keyType: 'authors',
              body: followState?.body || {},
            },
          },
        }}
      />
      {isLoading ? (
        <CardMagazinePlaceHolder repeat={4} />
      ) : (
        <div className="news-wrapper safe-area-pt-48 pt-48">
          <InfiniteScroll hasMore={hasMore} useWindow loadMore={loadMore}>
            {data.map((item, i) => (
              <div key={`${item.nid}-${i}`} className="e-card__wrapper">
                <ECard
                  content={item}
                  header
                  footer
                  media
                  author
                  routePath={item.url}
                  timeRead
                  type="magazine"
                />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      )}
    </section>
  )
}

export default AuthorIndividualPage
