import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect, RouteComponentProps } from 'react-router-dom'
import ECard from '../../components/eCard'
import ERibbon from '../../components/eRibbon'
import { FormattedNews } from '../../services/types'
import { RootState } from '../../store/reducers'
import { fetchAuthors } from './utils'
import './index.css'
import { Author } from '../../store/preferences/types'
import { CardMagazinePlaceHolder } from '../../components/ePlaceHolder'
import InfiniteScroll from '../../components/eInfiniteScroll'

type SearchState = {
  isLoading: boolean
  results: FormattedNews[]
}

const fetchSize = 10

const MyAuthors: React.FC<RouteComponentProps> = props => {
  const { location, history, match } = props

  const searchedAuthor =
    new URLSearchParams(location.search).get('author') || ''
  const { authors, websiteName = '' } = useSelector((state: RootState) => {
    return {
      authors: state.preferences.authors,
      websiteName: state.configBrand.name,
    }
  })

  const [selectedAuthor, setSelectedAuthor] = useState('_default')
  const [hasMore, setHasMore] = useState(true)
  const [searchState, setState] = useState<SearchState>({
    isLoading: false,
    results: [],
  })

  const executeSearch = useCallback(
    (authors, size: number = 0, from: number = 0) => {
      fetchAuthors(authors, {
        website: websiteName,
        size,
        from: from,
      }).then(news => {
        setState(prevState => ({
          ...prevState,
          results: [...prevState.results, ...news],
          isLoading: false,
        }))
        if (news.length < fetchSize) {
          setHasMore(false)
        }
      })
    },
    [websiteName],
  )

  function loadMore(page: number) {
    const fromCalculated = page * fetchSize
    const filter =
      selectedAuthor === '_default'
        ? authors
        : { [selectedAuthor]: authors[selectedAuthor] }
    setHasMore(page < 4)
    executeSearch(filter, fetchSize, fromCalculated)
  }

  function handleChangeAuthor(author: Author) {
    if (selectedAuthor === author._id) {
      setSelectedAuthor('_default')
      history.replace({ search: `` })
    } else {
      setSelectedAuthor(author._id)
      history.replace({ search: `?author=${author.slug}` })
    }
  }

  useEffect(() => {
    const prevAuthor = authors[searchedAuthor]
    setState({ isLoading: true, results: [] })
    setHasMore(true)
    if (prevAuthor) {
      setSelectedAuthor(prevAuthor._id)
      executeSearch({ [prevAuthor._id]: prevAuthor }, fetchSize)
    } else {
      setSelectedAuthor('_default')
      executeSearch(authors, fetchSize)
    }
  }, [searchedAuthor, authors, executeSearch])

  const { isLoading, results } = searchState

  return (
    <section className="internal-page myauthors">
      <ERibbon content={{ seccion: { nombre: 'Mis autores' } }} />
      <Link className="preference__see-all" to="/authors">
        Ver todos
      </Link>
      <div className="safe-area-pb safe-area-pt-48 pt-48">
        <div className="preference__content">
          {Object.keys(authors).length > 0 ? (
            <div className="myauthors__authors-wrapper">
              {Object.entries(authors)
                .slice(0, 5)
                .map(([_id, author]) => (
                  <button
                    key={_id}
                    onClick={() => handleChangeAuthor(author)}
                    disabled={isLoading}
                    className={`author ${
                      author._id === selectedAuthor ? 'active' : ''
                    }`}
                  >
                    <figure className="author__avatar font-serif">
                      {author.image?.url ? (
                        <img src={author.image?.url} alt="author-pic" />
                      ) : (
                        <span>{author.name.substring(0, 1)}</span>
                      )}
                    </figure>
                    <p className="author__info">{author.name}</p>
                  </button>
                ))}
            </div>
          ) : null}
          <main className="myauthors__results-wrapper">
            {isLoading ? (
              <CardMagazinePlaceHolder repeat={4} />
            ) : (
              <InfiniteScroll
                useWindow
                loadMore={loadMore}
                hasMore={hasMore}
                threshold={500}
              >
                {results.length > 0 &&
                  results.map((item, key) => (
                    <div key={`${item.nid}-${key}`} className="e-card__wrapper">
                      <ECard
                        content={item}
                        type="magazine"
                        header
                        author
                        media
                        routePath={item.url}
                        timeRead
                      />
                    </div>
                  ))}
              </InfiniteScroll>
            )}
          </main>
          {Object.keys(authors).length === 0 && match.isExact ? (
            <Redirect to="/mynews" />
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default MyAuthors
