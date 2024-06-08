/* eslint-disable react-hooks/exhaustive-deps */
import Identity from '@arc-publishing/sdk-identity'
import * as Sentry from '@sentry/browser'
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useReducer,
} from 'react'
import Loadable from 'react-loadable'
import './newsletter.css'

import { AppContext } from '../../context/app'
import ERibbon from '../../components/eRibbon/index'
import Icon from '../../system/icon'
import Modal from '../../system/modal'
import Notification from '../../system/notification'
import { logErrors } from '../../tools/errors'
import { getBrand } from '../../tools/tools'
import reducer from './topicsReducer'
import inLocalStorage from '../../tools/inLocalStorage'
import NewsletterItem from '../../components/eNewsletterItem/eNewsletterItem'

const ModalRegister = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ModalRegister" */ '../../components/eModalMPP/modalRegister'
    ),
  loading: () => null,
})

type News = {
  code: string
  name: string
  image: string
  description: string
}

const Newsletter: React.FC = () => {
  const context = useContext(AppContext)
  const [newsletters, setNewsletters] = useState<News[]>([])
  const brand = useMemo(() => getBrand(), [])

  const INITIAL_STATE = {
    isLoading: true,
    didMount: false,
    topics: [],
    saving: false,
    isChanged: false,
    error: null,
  }
  const [topicsState, dispatchTopics] = useReducer(reducer, INITIAL_STATE)
  const [pTopics, initPTopics, setPTopics, removePTopics] = inLocalStorage(
    'topicsState',
    {
      topics: [],
      newsletters: [],
      isChanged: false,
    },
  )

  async function getAsyncNewsletters() {
    try {
      const baseUrl = `${process.env.REACT_APP_NL_BASE_URL}/userprofile/public/v1/newsletter/list`
      const request = await fetch(baseUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await request.json()
      return data[brand] || []
    } catch (err) {
      logErrors(err, 'Newsletter.js')
      const error = new Error('[NEWSLETTER] Error al ingresar a newsletter')
      Sentry.captureException(error)
      dispatchTopics({
        type: 'SET_ERROR',
        payload: 'No pudimos cargar el listado de newsletters',
      })
    }
  }

  const getContentMedia = async () => {
    // Before to load content, verify if the user has an unsaved changes
    if (context.profile?.uuid) {
      if (!pTopics) {
        initPTopics()
      } else {
        if (pTopics.newsletters && pTopics.newsletters.length > 0) {
          dispatchTopics({ type: 'RESTORE_TOPICS', payload: pTopics.topics })
          updateIsChanged(pTopics.topics)
          setNewsletters(pTopics.newsletters)
          dispatchTopics({ type: 'SET_LOADING', payload: false })
          return
        }
      }
    }

    const [newsletters, preferences] = await Promise.all([
      getAsyncNewsletters(),
      getUserPreferences(),
    ])
    setNewsletters(newsletters)
    const userPreferences = new Set(preferences)
    const parsedNewsletters = newsletters.map(newsletter => ({
      code: newsletter.code,
      local: true,
      value: userPreferences.has(newsletter.code),
    }))
    dispatchTopics({
      type: 'ADD_TOPICS',
      payload: parsedNewsletters,
    })
    if (context.profile?.uuid) {
      setPTopics({
        ...pTopics,
        newsletters,
        topics: parsedNewsletters,
      })
    }
    dispatchTopics({
      type: 'SET_LOADING',
      payload: false,
    })
  }

  function cleanTopics(topics: string[]): string[] {
    const cleanedTopics = topics.filter(topic => topic !== null)
    return cleanedTopics
  }

  async function getUserPreferences(retry?: boolean) {
    if (!context.profile?.uuid) {
      ModalRegister.preload()
      return
    }
    try {
      const baseUrl = `${
        process.env.REACT_APP_NL_BASE_URL
      }/userprofile/public/v1/newsletter/?brand=${brand}&type=newsletter&uuid=${
        context.profile!.uuid
      }`
      const request = await fetch(baseUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const resJSON = await request.json()
      if (request.status) {
        return cleanTopics(resJSON.data)
      } else if (retry) {
        await Identity.extendSession()
        getUserPreferences()
      }
    } catch (err) {
      if (retry) {
        await Identity.extendSession()
        getUserPreferences()
      }
    }
  }

  function selectNewsletter(event) {
    if (!context.profile?.uuid) {
      event.preventDefault()
      Modal.open({
        content: elm => (
          <ModalRegister
            myRef={elm}
            context={context}
            gaCategory="newsletter"
          />
        ),
        myClass: 'is-modal-bottom is-modal-register is-modal-swh',
        animation: 'bottomFade',
      })
      return
    }

    const {
      target: { value },
    } = event

    const { topics } = topicsState
    const topicIndex = topics.indexOf(
      topics.find(topic => topic.code === value),
    )
    topics[topicIndex].local = !topics[topicIndex].local
    dispatchTopics({
      type: 'UPDATE_TOPICS',
      payload: topics,
    })
    setPTopics({
      ...pTopics,
      topics,
    })
    updateIsChanged()
  }

  function updateIsChanged(topics = topicsState.topics): boolean {
    const unSavedTopics = topics.filter(topic => topic.value === false)
    const savedTopics = topics.filter(topic => topic.value === true)

    const isChanged =
      unSavedTopics.filter(topic => topic.local === topic.value).length > 0 ||
      savedTopics.filter(topic => topic.local === false).length > 0

    dispatchTopics({
      type: 'SET_CHANGED',
      payload: isChanged,
    })
    return isChanged
  }

  async function saveUserPreferences(retry?: boolean) {
    const { profile } = context
    const { accessToken } = Identity.userIdentity
    const currentTopics = topicsState.topics
      .filter(topic => topic.local === topic.value)
      .map(topic => topic.code)
    try {
      dispatchTopics({
        type: 'TOPICS_SAVING',
        payload: true,
      })
      const baseUrl = `${process.env.REACT_APP_NL_BASE_URL}/userprofile/public/v1/newsletter/events`
      const request = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken} ${brand}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'newsletter',
          eventName: 'build_preference',
          uuid: profile!.uuid,
          email: profile!.email,
          attributes: {
            preferences: currentTopics,
            first_name: profile!.firstName || '',
            last_name: profile!.lastName || '',
          },
          brand,
        }),
      })
      const resJSON = await request.json()
      if (resJSON.status) {
        Notification.success({ content: 'Tu newsletter fue actualizado' })
        const newTopics = topicsState.topics.map(topic => ({
          ...topic,
          value: topic.local === topic.value,
          local: true,
        }))
        dispatchTopics({
          type: 'UPDATE_TOPICS',
          payload: newTopics,
        })
        dispatchTopics({
          type: 'TOPICS_SAVING',
          payload: false,
        })
      } else {
        if (retry) {
          await Identity.extendSession()
          saveUserPreferences()
          return
        }
        Notification.error({ content: 'No pudimos guardar tus cambios' })
      }
    } catch (err) {
      if (retry) {
        await Identity.extendSession()
        saveUserPreferences()
        return
      }
      logErrors(err, 'Newsletter.js')
      const error = new Error('[NEWSLETTER] Error al ingresar a newsletter')
      Sentry.captureException(error)
      Notification.error({ content: 'No pudimos guardar tus cambios' })
    } finally {
      if (!retry) {
        dispatchTopics({
          type: 'TOPICS_SAVING',
          payload: false,
        })
      }
    }
  }

  function handleClickSaveButton() {
    saveUserPreferences(true)
    dispatchTopics({ type: 'SET_CHANGED', payload: false })
  }

  useEffect(() => {
    getContentMedia()
    dispatchTopics({ type: 'SET_DIDMOUNT', payload: true })
    return () => {
      dispatchTopics({ type: 'SET_CHANGED', payload: false })
    }
  }, [])

  useEffect(() => {
    if (topicsState.isChanged) {
      setPTopics({
        ...pTopics,
        isChanged: true,
      })
    } else {
      setPTopics({
        ...pTopics,
        isChanged: false,
      })
    }
    return () => {
      if (!topicsState.isChanged) {
        removePTopics()
      }
    }
  }, [topicsState.isChanged])

  useEffect(() => {
    if (topicsState.didMount && context.profile?.uuid) {
      getContentMedia()
    } else if (!context.profile?.uuid) {
      removePTopics()
    }
  }, [context.profile?.uuid])

  if (topicsState.error) {
    return (
      <div className="internal-page">
        <ERibbon
          content={{ seccion: { nombre: 'Newsletter' } }}
          hideHamburger
          hideIconHome
        />
        <div className="safe-area-with-ribbon pt-48">
          <div className="subscription__empty">
            <p>No se pudo acceder al listado de newsletters</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <ERibbon
        content={{ seccion: { nombre: 'Newsletters' } }}
        hideHamburger
        hideIconHome
      />
      <button
        className={
          topicsState.isChanged
            ? 'newsletter__save-button safe-area-inset-top enabled'
            : 'newsletter__save-button safe-area-inset-top disabled'
        }
        onClick={handleClickSaveButton}
      >
        GUARDAR
      </button>
      <div className="newsletter__wrapper safe-area-with-ribbon pt-48 safe-area-pb px-16 internal-page">
        {!topicsState.isLoading ? (
          <>
            <h2>Seleccione los newsletters que desea recibir</h2>
            <div className="newsletter__list">
              {newsletters.map(category => {
                let isActive = false
                const topic = topicsState.topics.filter(
                  topic => topic.code === category.code,
                )[0]
                if (topic && topic.local === topic.value) {
                  isActive = true
                }
                return (
                  <NewsletterItem
                    brand={brand}
                    category={category}
                    handleClick={selectNewsletter}
                    isActive={isActive}
                    saving={topicsState.saving}
                    key={category.code}
                  />
                )
              })}
              <div
                className={
                  topicsState.saving
                    ? 'notification__newsletter notification__newsletter-saving'
                    : 'notification__newsletter'
                }
              >
                Guardando ...
              </div>
            </div>
          </>
        ) : (
          <div className="loading__wrapper">
            <Icon type="loading" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Newsletter
