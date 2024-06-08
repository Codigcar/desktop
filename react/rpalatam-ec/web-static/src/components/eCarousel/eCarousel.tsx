import classNames from 'classnames'
import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import './index.css'

import ECard from '../eCard'
import { CardInBox } from '../ePlaceHolder'
import { newFetchCategories } from '../../store/news/actions'
import { RootState } from '../../store/reducers'

const styles = {
  root: {
    padding: '0 15px',
  },
  slideContainer: {
    padding: '15px 8px 20px',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
}

const WIDTH_DOT = 15
const multi = WIDTH_DOT / 2

interface Props {
  category: string
  title: string
  header: boolean
}

const ECarousel: React.FC<Props> = ({ category, title, header }) => {
  const [index, setIndex] = useState(0)
  const dotsRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()
  const notices = useSelector(
    (state: RootState) => state.aNewFetchSuccess[category],
  )
  const news = useMemo(
    () => notices?.filter(notice => notice.url).slice(0, 10),
    [notices],
  )

  function handleChangeIndex(index) {
    setIndex(index)
  }

  useEffect(() => {
    if (dotsRef.current && news) {
      let deltaX = 0
      if (index === 0) {
        deltaX = -2
      } else if (index + 1 === news.length) {
        deltaX = 2
      } else if (index === 1) {
        deltaX = -1
      } else if (index + 2 === news.length) {
        deltaX = 1
      }
      dotsRef.current.style.transform = `translateX(${multi * deltaX}px)`
    }
  }, [index, news])

  useEffect(() => {
    dispatch(newFetchCategories([category], { page: 0 }))
  }, [category, dispatch])

  return (
    <div className="e-carousel">
      <h3 className="e-carousel__title">{title}</h3>
      {news?.length > 0 ? (
        <>
          <SwipeableViews
            onChangeIndex={handleChangeIndex}
            style={styles.root}
            slideStyle={styles.slideContainer}
            resistance
          >
            {news.map((notice, position) => (
              <div className="e-carousel__wrapper" key={notice.nid}>
                <ECard
                  category="portada"
                  content={notice}
                  header={header}
                  marker
                  share
                  media
                  position={position}
                  routePath={`/news${notice.url}?from=titulares`}
                />
              </div>
            ))}
          </SwipeableViews>
          <div className="e-carousel__dots" ref={dotsRef}>
            <ul
              style={{
                transform: `translateX(${
                  index * -WIDTH_DOT + WIDTH_DOT * 2
                }px)`,
              }}
            >
              {news.map((notice, indice) => (
                <li
                  key={notice.nid}
                  className={classNames({
                    'e-carousel__dots-active': index === indice,
                    'e-carousel__dots-prev': index - 1 === indice,
                    'e-carousel__dots-next': index + 1 === indice,
                  })}
                >
                  {indice}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <CardInBox />
      )}
    </div>
  )
}

export default React.memo(ECarousel)
