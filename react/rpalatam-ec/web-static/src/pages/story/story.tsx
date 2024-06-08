import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import './index.css'

import ENew from '../../components/eNew'
import { getContentFormated } from '../../services/news'
import { getBrand, getDomain, queryString } from '../../tools/tools'
import useFetch from '../../tools/useFetch'

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

const website = getBrand()
const domain = getDomain()
function getURL(storyId: string) {
  const params = { _id: storyId, website }
  return `https://ans.${domain}/arcio/ans/${queryString(params)}`
}

const Story: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>()
  const URL = getURL(storyId)
  const { response, isResolved } = useFetch(URL)
  console.log("🚀 ----------------------------------🚀")
  console.log("🚀 ~ file: story.tsx:43 ~ URL:", URL)
  console.log("🚀 ----------------------------------🚀")
  console.log("🚀 --------------------------------------------🚀")
  console.log("🚀 ~ file: story.tsx:43 ~ response:", response)
  console.log("🚀 --------------------------------------------🚀")
  const notice = useMemo(() => {
    return isResolved ? getContentFormated(response)[0] : null
  }, [response, isResolved])

  return (
    <div className="story-view">
      {notice ? <ENew content={notice} category="portada" /> : <EPlaceholder />}
    </div>
  )
}

export default Story
