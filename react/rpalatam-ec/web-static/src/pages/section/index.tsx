import React, { useContext } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import { AppContext } from '../../context/app'
import NativeAPI from '../../tools/nativeApi'

const Section: React.FC = () => {
  const context = useContext(AppContext)
  const { category } = useParams<{ category?: string }>()
  const detail = context.categories.find(({ key }) => key === category)

  if (!category || !detail || category === 'portada') return <Redirect to="/" />

  NativeAPI.navigate('News', {
    section: { name: detail.label, path: category },
  })
  return <Redirect to="/" />
}

export default Section
