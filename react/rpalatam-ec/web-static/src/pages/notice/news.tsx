import React, { useMemo } from 'react'
import Loadable from 'react-loadable'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import './index.css'

import ERibbon from '../../components/eRibbon'
import { getContentFormated } from '../../services/news'
import { RN_SCREENS_STORY_V2, WEB_PROJECT_EC_APP } from '../../tools/flags'
import { messageErrorLoad } from '../../tools/newversion'
import { getBrand, getDomain, queryString } from '../../tools/tools'
import useFetch from '../../tools/useFetch'
import type { RootState } from '../../store/reducers'

const EPlaceholder = () => (
  <div className="wrap-new-placeholder placeholder animate-inout">
    <div className="background-space" />
    <div className="animated-background line" />
    <div className="animated-background line" />
    <div className="animated-background line" />
    <div className="animated-background line mid-line" />
    <div className="background-space" />
    <div className="wrap-block">
      <div className="animated-background mini-line" />
      <div className="animated-background mini-line last-line" />
      <div className="background-space" />
    </div>
    <div className="animated-background media" />
    <div className="wrap-block">
      <div className="animated-background mini-line" />
      <div className="animated-background mini-line" />
      <div className="animated-background mini-line mid-line" />
    </div>
  </div>
)

const ENew = Loadable({
  loader: () => import(/* webpackChunkName: "ENew" */ '../../components/eNew'),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return <EPlaceholder />
  },
})

const EError = Loadable({
  loader: () =>
    import(/* webpackChunkName: "EError" */ '../../components/eError'),
  loading: ({ error }) => {
    if (error) messageErrorLoad()
    return null
  },
})

const website = getBrand()
const domain = getDomain()
function getURL(pathname) {
  let url = pathname
  if (url.startsWith('/category/') || url.startsWith('/news/')) {
    const cleanURL = url.split('/').slice(2).join('/')
    url = `/${cleanURL}`
  }
  const params = {
    url,
    website,
  }
  return `https://ans.${domain}/arcio/ans/${queryString(params)}`
}

const Notice: React.FC = () => {
  const location: any = useLocation()
  const URL = useMemo(() => getURL(location.pathname), [location.pathname])
  const { response, isResolved, isRejected } = useFetch(URL, {})
  console.log("🚀 -------------------------------------------🚀")
  console.log("🚀 ~ file: news.tsx:73 ~ response:", response)
  console.log("🚀 -------------------------------------------🚀")
  console.log("🚀 ---------------------------------🚀")
  console.log("🚀 ~ file: news.tsx:73 ~ URL:", URL)
  console.log("🚀 ---------------------------------🚀")
  const isSavingTopic = useSelector((state: RootState) => state.topics.saving)
  const [notice] = useMemo(() => {
    return response ? getContentFormated(response) : []
  }, [response])

  if (isResolved) {
    const section = WEB_PROJECT_EC_APP
      ? notice.seccion.nombre
      : location.state?.section || 'Portada'

    return (
      <div className="notice-view">
        <ERibbon
          content={notice}
          hideHamburger
          hideIconHome
          marker
          otherOptions
          section={section}
          suscription
          isLoading={isSavingTopic}
        />
        <ENew content={notice} category="portada" />
      </div>
    )
  }

  const section = WEB_PROJECT_EC_APP ? '' : location.state?.section || 'Portada'
  const error = RN_SCREENS_STORY_V2()
    ? 'No hemos encontrado la noticia que buscabas.'
    : 'No hemos encontrado la noticia que buscabas, pero te invitamos a visitar alguna de nuestras secciones:'

  return (
    <div className="notice-view">
      <ERibbon section={section} />
      {isRejected ? (
        <EError title="Nota perdida" content={error} />
      ) : (
        <EPlaceholder />
      )}
    </div>
  )
}

export default Notice
