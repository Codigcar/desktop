import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import EHead from '../../components/eHead'
import EListNews from '../../components/eListNews'
import { newFetchCategories } from '../../store/news/actions'
import useHomeTemplate from '../../tools/useHomeTemplate'
import type { RootState } from '../../store/reducers'

const Home: React.FC = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const template = useHomeTemplate()
  const { config } = useSelector((state: RootState) => ({
    config: state.configBrand,
  }))

  useEffect(() => {
    dispatch(newFetchCategories(['portada'], { page: 0 }, () => {}, template))
  }, [dispatch, template])

  return (
    <div>
      <EHead config={config} location={location} />
      <div
        className="react-swipeable-view-container"
        style={{ transform: 'translate(0%, 0px)' }}
      >
        <EListNews
          active
          adSection="principal"
          category="portada"
          infinite={false}
        />
      </div>
    </div>
  )
}

export default Home
