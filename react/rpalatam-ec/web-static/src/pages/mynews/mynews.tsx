import classNames from 'classnames'
import React, { useCallback, useContext, useEffect, useReducer } from 'react'
import { Link, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './index.css'

import Authors from './authors'
import { AuthorList, FavoritesList, TagsList } from './list'
import MyTags from './tags'
import { fetchAuthors, fetchTags } from './utils'
import EBadge from '../../components/eBadge'
import ERibbon from '../../components/eRibbon'
import { AppContext } from '../../context/app'
import { setFavoritesStories } from '../../store/favorites/actions'
import { RootState } from '../../store/reducers'
import { useSuggestions } from '../../services/suggestions'

function mynewsReducer(state, action) {
  switch (action.type) {
    case 'authors': {
      return {
        ...state,
        authors: {
          ...state.authors,
          data: action.payload,
        },
      }
    }
    case 'favorites': {
      return {
        ...state,
        favorites: {
          ...state.favorites,
          data: action.payload,
        },
      }
    }
    case 'tags': {
      return {
        ...state,
        tags: {
          ...state.tags,
          data: action.payload,
        },
      }
    }
  }
}

const INIT_DATA = {
  authors: {
    key: 'authors',
    title: 'Autores',
  },
  tags: {
    key: 'tags',
    title: 'Temas',
  },
  favorites: {
    key: 'favorites',
    title: 'Leer luego',
  },
}

const SECTIONS = Object.keys(INIT_DATA)

const MyNews: React.FC<RouteComponentProps> = ({ match, location }) => {
  const classes = classNames('favorites-view page-view', {
    'safe-area-nav-bottom': true,
  })
  const config = useSelector((state: RootState) => state.configBrand)
  const preferences = useSelector((state: RootState) => state.preferences)
  const favorites = useSelector((state: RootState) => state.favorites.stories)
  const refStories = useSelector(
    (state: RootState) => state.favorites.refStories,
  )
  const { authors, tags } = useSelector((state: RootState) => {
    return {
      authors: state.preferences.authors,
      tags: state.preferences.tags,
    }
  })
  const { paywallStatus } = useContext(AppContext)

  const reduxDispatch = useDispatch()
  const [state, dispatch] = useReducer(mynewsReducer, INIT_DATA)
  const { suggestions, isLoadingSuggestions, error } = useSuggestions()

  const getAuthors = useCallback(
    async authors => {
      const data = await fetchAuthors(authors, {
        website: config.name as string,
      })
      dispatch({ type: 'authors', payload: data })
    },
    [config.name],
  )

  const getTags = useCallback(
    async tags => {
      const data = await fetchTags(tags, {
        website: config.name as string,
      })
      dispatch({ type: 'tags', payload: data })
    },
    [config.name],
  )

  useEffect(() => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: 'favorites.GET_STORIES_BY_ID' }),
    )
  }, [])

  useEffect(() => {
    const stories = favorites.slice(0, 3)
    dispatch({ type: 'favorites', payload: stories })
  }, [favorites])

  useEffect(() => {
    if (match.isExact) {
      if (!preferences.isLoading) {
        getAuthors(preferences.authors)
        getTags(preferences.tags)
        reduxDispatch(setFavoritesStories(refStories.current || []))
      }
    }
  }, [
    getAuthors,
    getTags,
    preferences,
    match.isExact,
    reduxDispatch,
    refStories,
  ])

  const buildList = useCallback(
    (type: string) => {
      switch (type) {
        case 'authors': {
          return (
            <AuthorList
              data={state.authors.data}
              suggestions={{
                isLoading: isLoadingSuggestions,
                data: suggestions.authors,
                error,
              }}
            />
          )
        }
        case 'favorites': {
          return <FavoritesList data={state.favorites.data} />
        }
        case 'tags': {
          return (
            <TagsList
              data={state.tags.data}
              suggestions={{
                isLoading: isLoadingSuggestions,
                data: suggestions.tags,
                error,
              }}
            />
          )
        }
        default:
          return <div>Por ahora no tienes noticias</div>
      }
    },
    [
      state.authors.data,
      state.favorites.data,
      state.tags.data,
      suggestions.authors,
      suggestions.tags,
      isLoadingSuggestions,
      error,
    ],
  )

  return (
    <div className={classes}>
      <ERibbon
        content={{
          seccion: { nombre: 'Mis noticias' },
        }}
        hideHamburger
        hideIconHome
      />
      <div className="h-screen mynews-wrapper safe-area-py-48 py-48">
        <div className="mynews__sections">
          {SECTIONS.map(name => {
            const section = state[name]
            const followers =
              name === 'authors'
                ? Object.keys(authors).length
                : name === 'tags'
                ? Object.keys(tags).length
                : null

            return (
              <div className="mynews__section" key={section.key}>
                <div className="mynews__header">
                  <h3 className="mynews__section-title font-serif">
                    {section.title}
                  </h3>
                  {config.name === 'elcomercio' &&
                  paywallStatus &&
                  section.title !== 'Leer luego' ? (
                    <span className="mynews_section-indicator">
                      <EBadge size="tiny" type="filled" color="primary">
                        {followers && followers > 0 ? (
                          <Link
                            to={`/${section.key}?ref=mynews`}
                            className="mynews__indicator-text"
                          >
                            {followers}
                          </Link>
                        ) : (
                          <p className="mynews__indicator-text">{followers}</p>
                        )}
                      </EBadge>
                    </span>
                  ) : null}
                </div>
                <div className="mynews__section-content">
                  {buildList(section.key)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <TransitionGroup className="transition-group-portrait">
        <CSSTransition
          classNames="fade"
          timeout={{ enter: 300, exit: 300 }}
          key={match.isExact + ''}
        >
          <section>
            <Switch location={location}>
              <Route path={`${match.path}/authors`} component={Authors} />
              <Route path={`${match.path}/tags`} component={MyTags} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default MyNews
