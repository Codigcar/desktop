import classNames from 'classnames'
import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'

import EBadge from '../../components/eBadge'
import ECard from '../../components/eCard'
import { AppContext } from '../../context/app'
import { RootState } from '../../store/reducers'

import { SuggestionAuthor, SuggestionTag } from '../../services/suggestions'
import { updateAuthors, updateTags } from '../../store/preferences/actions'
import Icon from '../../system/icon'
import nativeApi from '../../tools/nativeApi'

const Loading = () => <p>Cargando ...</p>
const SuggestionsError = () => <p>No pudimos cargar tus sugerencias.</p>

const SUGGESTIONS_ROWS_NUMBER = 3

interface ListProps<SuggestionType> {
  data: any
  suggestions: {
    data: SuggestionType[]
    isLoading: boolean
    error: string | null
  }
}

export const AuthorList = ({
  data,
  suggestions,
}: ListProps<SuggestionAuthor>) => {
  const match = useRouteMatch()
  const context = useContext(AppContext)
  const [selectedAuthors, setSelectedAuthors] = useState<SuggestionAuthor[]>([])
  const { isLoading } = useSelector((state: RootState) => state.preferences)
  const {
    data: suggestionsData,
    error,
    isLoading: isLoadingSuggestions,
  } = suggestions

  const dispatch = useDispatch()

  function toggleAuthor(suggestedAuthor: SuggestionAuthor) {
    const isIncluded =
      selectedAuthors.findIndex(tag => tag.slug === suggestedAuthor.slug) !== -1
    if (isIncluded) {
      setSelectedAuthors(
        selectedAuthors.filter(tag => tag.slug !== suggestedAuthor.slug),
      )
    } else {
      setSelectedAuthors([...selectedAuthors, suggestedAuthor])
    }
  }

  async function handleSaveAuthors() {
    const parsedAuthors = selectedAuthors.reduce((acc, el) => {
      acc[el.slug] = {
        _id: el.slug,
        name: el.name,
        image: {
          url: el.image,
        },
        slug: el.slug,
      }
      return acc
    }, {})
    await dispatch(updateAuthors(parsedAuthors, context.paywallStatus))
    Object.keys(parsedAuthors).forEach(authorSlug => {
      window.dataLayer?.push({
        event: 'SuscriptionActivity',
        category: 'PWA_Preference',
        action: 'pwa_preference_follow_author',
        label: authorSlug,
      })
      nativeApi.toggleTopicSubscription({
        action: 'subscribe',
        topicSlug: authorSlug,
        type: 'author',
      })
    })
  }

  const saveButtonClasses = classNames('suggestions__button-save', {
    active: selectedAuthors.length > 0,
    loading: isLoading,
  })

  if (!data || data.length === 0) {
    return (
      <>
        {!data ? (
          <div className="mynews__section-content mynews__section-content-empty">
            <Loading />
          </div>
        ) : error ? (
          <div className="mynews__section-content mynews__section-content-empty">
            <SuggestionsError />
          </div>
        ) : (
          <>
            <button
              className={saveButtonClasses}
              onClick={handleSaveAuthors}
              disabled={isLoading}
            >
              GUARDAR
            </button>
            <p className="mynews__section-text">
              Comienza siguiendo algunos autores
            </p>
            <div className="mynews__suggestions">
              {isLoadingSuggestions ? (
                <div className="suggestions__fallback-wrapper">
                  <Icon type="loading" style={{ fontSize: 22 }} />
                </div>
              ) : (
                <div
                  className="suggestions__results"
                  style={{
                    columnCount: Math.ceil(
                      (suggestionsData?.length || 0) / SUGGESTIONS_ROWS_NUMBER,
                    ),
                  }}
                >
                  {suggestionsData?.map(suggestedAuthor => {
                    const isIncluded =
                      selectedAuthors.findIndex(
                        author => author.slug === suggestedAuthor.slug,
                      ) !== -1
                    return (
                      <EBadge
                        key={suggestedAuthor.slug}
                        type={isIncluded ? 'filled' : 'outlined'}
                        size="large"
                      >
                        <button onClick={() => toggleAuthor(suggestedAuthor)}>
                          <p className="suggestion__text">
                            {suggestedAuthor.name}
                          </p>
                        </button>
                      </EBadge>
                    )
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </>
    )
  }

  return (
    <div>
      <div>
        {data.map((item: any) => (
          <div key={item.nid} className="e-card__wrapper">
            <ECard
              content={item}
              header
              author
              media
              routePath={item.url}
              timeRead
              type="magazine"
            />
          </div>
        ))}
      </div>
      <div className="mynews__section-link">
        <Link
          to={{
            pathname: `${match.path}/authors`,
            state: { title: 'Autores' },
          }}
        >
          Ver más
        </Link>
      </div>
    </div>
  )
}

export const FavoritesList = ({ data }) => {
  const handleViewMore = (event: React.SyntheticEvent) => {
    event.preventDefault()
    nativeApi.navigate('Favorite')
  }

  if (!data || data.length === 0) {
    return (
      <div className="mynews__section-content mynews__section-content-empty">
        {!data ? (
          <Loading />
        ) : (
          <>
            <h2 className="mynews__header">Aún no tienes noticias guardadas</h2>
            <p className="mynews__section-no-favorite-description">
              Utiliza el ícono <Icon type="md-bookmark" /> en cualquier
              publicación y la podrás encontrar aquí para leer luego
            </p>
          </>
        )}
      </div>
    )
  }
  return (
    <div>
      <div>
        {data.map((item: any) => (
          <div key={item.nid} className="e-card__wrapper">
            <ECard
              content={item}
              header
              media
              routePath={item.url}
              type="magazine"
            />
          </div>
        ))}
      </div>
      <div className="mynews__section-link">
        <Link to="/favorites" onClick={handleViewMore}>
          Ver más
        </Link>
      </div>
    </div>
  )
}

export const TagsList = ({ data, suggestions }: ListProps<SuggestionTag>) => {
  const [selectedTags, setSelectedTags] = useState<SuggestionTag[]>([])
  const { isLoading } = useSelector((state: RootState) => state.preferences)
  const {
    data: suggestionsData,
    error,
    isLoading: isLoadingSuggestions,
  } = suggestions

  const context = useContext(AppContext)
  const dispatch = useDispatch()

  function toggleTag(suggestedTag: SuggestionTag) {
    const isIncluded =
      selectedTags.findIndex(tag => tag.slug === suggestedTag.slug) !== -1
    if (isIncluded) {
      setSelectedTags(
        selectedTags.filter(tag => tag.slug !== suggestedTag.slug),
      )
    } else {
      setSelectedTags([...selectedTags, suggestedTag])
    }
  }

  async function handleSaveTags() {
    const parsedTags = selectedTags.reduce((acc, el) => {
      acc[el.slug] = {
        _id: el.slug,
        name: el.text,
        slug: el.slug,
      }
      return acc
    }, {})

    await dispatch(updateTags(parsedTags, context.paywallStatus))
    Object.keys(parsedTags).forEach(tag => {
      window.dataLayer?.push({
        event: 'SuscriptionActivity',
        category: 'PWA_Preference',
        action: 'pwa_preference_follow_tag',
        label: tag,
      })
      nativeApi.toggleTopicSubscription({
        type: 'tag',
        topicSlug: tag,
        action: 'subscribe',
      })
    })
  }

  if (!data || data.length === 0) {
    const saveButtonClasses = classNames('suggestions__button-save', {
      active: selectedTags.length > 0,
      loading: isLoading,
    })

    return (
      <>
        {!data ? (
          <div className="mynews__section-content mynews__section-content-empty">
            <Loading />
          </div>
        ) : (
          <>
            <button
              className={saveButtonClasses}
              onClick={handleSaveTags}
              disabled={isLoading}
            >
              GUARDAR
            </button>
            {error ? (
              <div className="mynews__section-content mynews__section-content-empty">
                <SuggestionsError />
              </div>
            ) : (
              <>
                <p className="mynews__section-text">
                  Comienza siguiendo algunos temas
                </p>
                <div className="mynews__suggestions">
                  {isLoadingSuggestions ? (
                    <div className="suggestions__fallback-wrapper">
                      <Icon type="loading" style={{ fontSize: 22 }} />
                    </div>
                  ) : (
                    <div
                      className="suggestions__results"
                      style={{
                        columnCount: Math.ceil(
                          (suggestionsData?.length || 0) /
                            SUGGESTIONS_ROWS_NUMBER,
                        ),
                      }}
                    >
                      {suggestionsData?.map(suggestedTag => {
                        const isIncluded =
                          selectedTags.findIndex(
                            tag => tag.slug === suggestedTag.slug,
                          ) !== -1
                        return (
                          <EBadge
                            type={isIncluded ? 'filled' : 'outlined'}
                            size="large"
                            key={suggestedTag.slug}
                          >
                            <button
                              key={suggestedTag.slug}
                              onClick={() => toggleTag(suggestedTag)}
                            >
                              <p className="suggestion__text">
                                {suggestedTag.text}
                              </p>
                            </button>
                          </EBadge>
                        )
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </>
    )
  }
  return (
    <div>
      <div>
        {data.map((item: any) => (
          <div key={item.nid} className="e-card__wrapper">
            <ECard
              content={item}
              header
              media
              routePath={item.url}
              timeRead
              type="magazine"
            />
          </div>
        ))}
      </div>
      <div className="mynews__section-link">
        <Link
          to={{
            pathname: '/mynews/tags',
            state: {
              title: 'Temas',
            },
          }}
        >
          Ver más
        </Link>
      </div>
    </div>
  )
}
