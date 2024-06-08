import React, { useEffect, useState } from 'react'
import Loadable from 'react-loadable'
import { useLocation, useRouteMatch } from 'react-router-dom'
import './index.css'

import ECard from '../../components/eCard'
import InfiniteScroll from '../../components/eInfiniteScroll'
import { CardMagazinePlaceHolder } from '../../components/ePlaceHolder'
import ERibbon from '../../components/eRibbon'
import { getContentFormated } from '../../services/news'
import { getQueryTags } from '../../services/querys'
import { getBrand, getDomain, queryString } from '../../tools/tools'
import useFetch from '../../tools/useFetch'

const EError = Loadable({
  loader: () =>
    import(/* webpackChunkName: "EError" */ '../../components/eError'),
  loading: () => null,
})

const brand = getBrand()
const domain = getDomain()
function getURL(page, tag) {
  const params = {
    query: getQueryTags(tag),
    website: brand,
    sort: 'last_updated_date:desc',
    from: page * 10,
    size: 10,
  }
  return `https://ans.${domain}/arcio/ans/${queryString(params)}`
}

const Tags: React.FC = () => {
  const location: any = useLocation()
  const match: any = useRouteMatch()

  const [URL, setURL] = useState(() => getURL(0, match.params?.id))
  const { error, response, isLoading, isRejected } = useFetch(URL, {})
  const [data, setData] = useState<any>(null)
  const [hasMore, setHasMore] = useState<boolean>(true)

  function loadTags(page) {
    const tag = match.params?.id
    setURL(() => getURL(page, tag))
    if (page >= 5) {
      setHasMore(false)
    }
  }

  useEffect(() => {
    if (response) {
      const DATA = getContentFormated(response)
      if (DATA.length < 10) {
        setHasMore(false)
      }
      setData(prevData => [...(prevData || []), ...DATA])
    }
  }, [response])

  useEffect(() => {
    if (error) {
      setHasMore(false)
    }
  }, [error])

  return (
    <div className="internal-page">
      <ERibbon
        content={{
          seccion: { nombre: location.state?.title || 'Tags' },
        }}
        hideHamburger
        withFollow={!!location.state?.isTag}
      />
      {(isLoading && !data ? true : null) && (
        <CardMagazinePlaceHolder repeat={4} />
      )}
      {(data ? true : null) && (
        <div className="safe-area-pt-48 pt-48">
          {data.length > 0 ? (
            <InfiniteScroll
              isChanged={data.length}
              loadMore={loadTags}
              hasMore={hasMore}
              useWindow
            >
              {data.map((item: { nid: string; url: string }) => (
                <div className="e-card__wrapper" key={item.nid}>
                  <ECard
                    category="tags"
                    content={item}
                    footer
                    header
                    media
                    share
                    routePath={item.url}
                    timeRead
                    type="magazine"
                  />
                </div>
              ))}
            </InfiniteScroll>
          ) : (
            <div className="e-tags__empty-message">
              No encontramos noticias relacionadas
            </div>
          )}
        </div>
      )}
      {(isRejected && !data ? true : null) && (
        <EError
          title="Tag perdido"
          content="No hemos encontrado el tag que buscabas, pero te invitamos a
            visitar alguna de nuestras secciones:"
        />
      )}
    </div>
  )
}

export default Tags
