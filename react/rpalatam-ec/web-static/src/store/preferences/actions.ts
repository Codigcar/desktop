import { getPreferences, updatePreferences } from '../../services/preferences'
import * as types from './types'
import * as helpers from './helpers'
import nativeApi from '../../tools/nativeApi'
import { getBrand, preferencesContextAvailable } from '../../tools/tools'

const PREFERENCES_AUTHORS = 'storage_preferences_authors'
const PREFERENCES_TAGS = 'storage_preferences_tags'
const PREFERENCES_CONTEXT_AVAILABLE = preferencesContextAvailable()

const enabledActionConfirmation = getBrand() !== 'gestion'

export const setAuthors = authors => ({
  type: types.SET_AUTHORS,
  payload: authors,
})

export const setTags = tags => ({
  type: types.SET_TAGS,
  payload: tags,
})

export const getAuthors = () => async dispatch => {
  try {
    const authors = await getPreferences('authors')
    dispatch({
      type: types.SET_AUTHORS,
      payload: authors,
    })
  } catch (error) {
    dispatch({
      type: types.HAS_ERROR,
      payload: error.message || '',
    })
  }
}

export const getTags = () => async dispatch => {
  try {
    const tags = await getPreferences('tags')
    dispatch({
      type: types.SET_TAGS,
      payload: tags,
    })
  } catch (error) {
    dispatch({
      type: types.HAS_ERROR,
      payload: error.message || '',
    })
  }
}

export const getAllPreferences = (isSubscribed: boolean) => async dispatch => {
  if (PREFERENCES_CONTEXT_AVAILABLE && isSubscribed) {
    return
  }

  dispatch({ type: types.SET_LOADING, payload: true })
  if (isSubscribed) {
    await Promise.all([dispatch(getAuthors()), dispatch(getTags())])
  } else {
    const authors = localStorage.getItem(PREFERENCES_AUTHORS) || ''
    const tags = localStorage.getItem(PREFERENCES_TAGS) || ''
    try {
      dispatch({
        type: types.SET_AUTHORS,
        payload: JSON.parse(authors),
      })
      dispatch({
        type: types.SET_TAGS,
        payload: JSON.parse(tags),
      })
    } catch (error) {
      dispatch({
        type: types.HAS_ERROR,
        payload: error.message || '',
      })
    }
  }
  dispatch({ type: types.SET_LOADING, payload: false })
}

export const updateAuthors = (authors, isSubscribed) => async dispatch => {
  if (PREFERENCES_CONTEXT_AVAILABLE && isSubscribed) {
    nativeApi.setPreferences().authors(Object.values(authors))
    return
  }

  try {
    dispatch({ type: types.SET_LOADING, payload: true })
    let followAuthor
    if (isSubscribed) {
      const { preferences } = await updatePreferences('authors', authors)
      followAuthor = preferences
    } else {
      followAuthor = authors
      localStorage.setItem(PREFERENCES_AUTHORS, JSON.stringify(followAuthor))
    }
    dispatch({
      type: types.SET_AUTHORS,
      payload: followAuthor || {},
    })
    dispatch({ type: types.SET_LOADING, payload: false })
    dispatch({ type: types.HAS_ERROR, payload: null })
  } catch (error) {
    dispatch({
      type: types.HAS_ERROR,
      payload: error.message || '',
    })
  }
}

export const updateTags = (tags, isSubscribed) => async dispatch => {
  if (PREFERENCES_CONTEXT_AVAILABLE && isSubscribed) {
    nativeApi.setPreferences().tags(Object.values(tags))
    return
  }

  try {
    dispatch({ type: types.SET_LOADING, payload: true })
    let followTag
    if (isSubscribed) {
      const { preferences } = await updatePreferences('tags', tags)
      followTag = preferences
    } else {
      followTag = tags
      localStorage.setItem(PREFERENCES_TAGS, JSON.stringify(followTag))
    }
    dispatch({
      type: types.SET_TAGS,
      payload: followTag || [],
    })

    dispatch({ type: types.SET_LOADING, payload: false })
    dispatch({ type: types.HAS_ERROR, payload: null })
  } catch (error) {
    dispatch({
      type: types.HAS_ERROR,
      payload: error.message || '',
    })
  }
}

export const toggleAuthor = (
  author: types.Author,
  isSubscribed: boolean,
) => async (dispatch, getState) => {
  const {
    preferences: { authors },
  } = getState()

  if (!author._id) {
    author._id = author.name
    author.slug = author.name.toLowerCase().replace(/\s/g, '-')
  }

  if (authors[author._id]) {
    const result: types.ConfirmResult = enabledActionConfirmation
      ? await helpers.launchConfirmModal({
          heading: '¿Seguro(a) que quiere dejar de seguir a ',
          highlight: `${author.name}?`,
          textAccept: 'Dejar de seguir',
          textDecline: 'Cancelar',
          text:
            'Este autor dejará de aparecer en su sección personalizada de noticias.',
        })
      : 'accepted'

    if (result === 'declined') return
    const { [author._id]: deletedAuthor, ...restAuthors } = authors
    await dispatch(updateAuthors(restAuthors, isSubscribed))
    if (!getState().preferences.error) {
      nativeApi.toggleTopicSubscription({
        action: 'unsubscribe',
        topicSlug: author.slug,
        type: 'author',
      })
    }
    return
  }
  await dispatch(
    updateAuthors(
      {
        ...authors,
        [author._id]: { ...author, notifications: 'enabled' },
      },
      isSubscribed,
    ),
  )
  nativeApi.toggleTopicSubscription({
    action: 'subscribe',
    topicSlug: author.slug,
    type: 'author',
  })

  const { error } = getState().preferences
  if (error === null) {
    window.dataLayer?.push({
      event: 'SuscriptionActivity',
      category: 'PWA_Preference',
      action: 'pwa_preference_follow_author',
      label: author.slug,
    })
  }
}

export const toggleNotificationAuthor = (
  author: types.Author,
  isSubscribed: boolean,
) => async (dispatch, getState) => {
  try {
    const {
      preferences: { authors },
    } = getState()
    if (
      authors[author._id]['notifications'] === 'enabled' ||
      authors[author._id].notifications === undefined
    ) {
      const result: types.ConfirmResult = enabledActionConfirmation
        ? await helpers.launchConfirmModal({
            heading: '¿Desea desactivar las notificaciones para ',
            highlight: `${author.name}?`,
            textAccept: 'Entendido, desactivar',
            text:
              'Ya no recibirá más notificaciones de este autor, puede desactivar esta opción de nuevo más tarde.',
          })
        : 'accepted'
      if (result === 'declined') return
      const { [author._id]: updatedAuthor } = authors
      await dispatch(
        updateAuthors(
          {
            ...authors,
            [author._id]: { ...updatedAuthor, notifications: 'disabled' },
          },
          isSubscribed,
        ),
      )
      if (!getState().preferences.error) {
        nativeApi.toggleTopicSubscription({
          action: 'unsubscribe',
          topicSlug: author.slug,
          type: 'author',
        })
      }
      return
    }
    await dispatch(
      updateAuthors(
        {
          ...authors,
          [author._id]: {
            ...authors[author._id],
            notifications: 'enabled',
          },
        },
        isSubscribed,
      ),
    )
    const { error } = getState().preferences
    if (!error) {
      nativeApi.toggleTopicSubscription({
        action: 'subscribe',
        topicSlug: author.slug,
        type: 'author',
      })
    }
  } catch (error) {}
}

export const toggleNotificationTag = (
  tag: types.Tag,
  isSubscribed: boolean,
) => async (dispatch, getState) => {
  try {
    const {
      preferences: { tags },
    } = getState()
    if (
      tags[tag._id]['notifications'] === 'enabled' ||
      tags[tag._id].notifications === undefined
    ) {
      const result: types.ConfirmResult = enabledActionConfirmation
        ? await helpers.launchConfirmModal({
            heading: '¿Desea desactivar las notificaciones para ',
            highlight: `${tag.name}?`,
            textAccept: 'Entendido, desactivar',
            text:
              'Ya no recibirá más notificaciones de este tema, puede desactivar esta opción de nuevo más tarde.',
          })
        : 'accepted'

      if (result === 'declined') return
      const { [tag._id]: updatedAuthor } = tags
      await dispatch(
        updateTags(
          {
            ...tags,
            [tag._id]: { ...updatedAuthor, notifications: 'disabled' },
          },
          isSubscribed,
        ),
      )
      if (!getState().preferences.error) {
        nativeApi.toggleTopicSubscription({
          action: 'unsubscribe',
          topicSlug: tag.slug,
          type: 'tag',
        })
      }
      return
    }
    await dispatch(
      updateTags(
        {
          ...tags,
          [tag._id]: {
            ...tags[tag._id],
            notifications: 'enabled',
          },
        },
        isSubscribed,
      ),
    )
    if (!getState().preferences.error) {
      nativeApi.toggleTopicSubscription({
        action: 'subscribe',
        topicSlug: tag.slug,
        type: 'tag',
      })
    }
  } catch (error) {}
}

export const toggleTag = (tag: types.Tag, isSubscribed: boolean) => async (
  dispatch,
  getState,
) => {
  const {
    preferences: { tags },
  } = getState()
  if (tags[tag._id]) {
    const result: types.ConfirmResult = enabledActionConfirmation
      ? await helpers.launchConfirmModal({
          heading: '¿Seguro que quiere dejar de seguir a ',
          highlight: `${tag.name}?`,
          text:
            'Este tag ya no formará parte en tu sección personalizada de noticias.',
          textAccept: 'Dejar de seguir',
        })
      : 'accepted'
    if (result === 'declined') return
    const { [tag._id]: deletedTag, ...restTags } = tags
    await dispatch(updateTags(restTags, isSubscribed))

    if (!getState().preferences.error) {
      nativeApi.toggleTopicSubscription({
        action: 'unsubscribe',
        topicSlug: tag.slug,
        type: 'tag',
      })
    }
    return
  }
  await dispatch(updateTags({ ...tags, [tag._id]: tag }, isSubscribed))
  const { error } = getState().preferences

  if (error === null) {
    nativeApi.toggleTopicSubscription({
      action: 'subscribe',
      topicSlug: tag.slug,
      type: 'tag',
    })

    window.dataLayer?.push({
      event: 'SuscriptionActivity',
      category: 'PWA_Preference',
      action: 'pwa_preference_follow_tag',
      label: tag.slug,
    })
  }
}

export const cleanPreference = () => dispatch => {
  dispatch({
    type: types.CLEAN_PREFERENCES,
  })
}
