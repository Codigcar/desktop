/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swipeable from 'react-swipeable'
import './eListNews.css'

import EAds from '../eAds'
import EBannerPremium from '../eBannerPremium'
import ECard from '../eCard'
import ECarousel from '../eCarousel'
import CategoryList from '../eCategoryList'
import InfiniteScroll from '../eInfiniteScroll'
import { CardFullPlaceHolder } from '../ePlaceHolder'
import ViewableMonitor from '../eViewableMonitor'
import { AppContext } from '../../context/app'
import scrollCategories from '../../pages/portrait/scroll'
import {
  newFetchCategories,
  refreshCategoryNews,
} from '../../store/news/actions'
import { RootState } from '../../store/reducers'
import Icon from '../../system/icon'
import { RN_SCREENS_STORY, WEB_PROJECT_EC_APP } from '../../tools/flags'
import NativeAPI from '../../tools/nativeApi'
import { isPaywallActive } from '../../tools/tools'
import { transform } from '../../tools/transform'
import useHomeTemplate from '../../tools/useHomeTemplate'

const PAYWALL_ACTIVE = isPaywallActive()

interface Props {
  adSection: string
  active: boolean
  category: string
  infinite: boolean
}

function handleBreakingOpen(event: React.SyntheticEvent, url: string) {
  if (RN_SCREENS_STORY()) {
    event.preventDefault()
    NativeAPI.navigate('Story', { pathname: url })
    return
  }
}

const EListNews: React.FC<Props> = ({
  active,
  adSection,
  category,
  infinite,
}) => {
  const scrollComponent = useRef<HTMLDivElement>(null)
  const pullRefresh = useRef<HTMLDivElement>(null)
  const fetching = useRef(false)
  const activeScroll = useRef(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const lastScrollTop = useRef(0) // Used for header animation
  const template = useHomeTemplate()
  const { breaking, config, loadedCategories, news, pagination } = useSelector(
    (state: RootState) => ({
      breaking: state.breakingNews,
      config: state.configBrand,
      loadedCategories: Object.keys(state.aNewFetchSuccess),
      news: state.aNewFetchSuccess[category],
      pagination: state.aNewCategoryPage[category],
    }),
  )
  const newsExist = !!news
  const dispatch = useDispatch()
  const [hasMore, setHasMore] = useState(infinite)
  const { paywallStatus } = useContext(AppContext)

  function loadMore() {
    dispatch(
      newFetchCategories([category], { page: pagination.page + 1 }, data => {
        if (!data[category]) return
        if (data[category].length < 10) {
          setHasMore(false)
        }
      }),
    )
  }

  function scrollListener(event) {
    const scrollTop = event.target.scrollTop
    scrollCategories[category] = scrollTop // Save scrollTop
    if (!headerRef.current) return
    if (Math.abs(lastScrollTop.current - scrollTop) <= 5) return
    if (scrollTop > lastScrollTop.current) {
      // Scroll Down
      if (scrollTop > 48 && active) {
        headerRef.current.classList.add('e-head--hide')
      }
    } else {
      // Scroll Up
      headerRef.current.classList.remove('e-head--hide')
    }
    lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop
  }

  useEffect(() => {
    const elm = scrollComponent.current
    headerRef.current = document.querySelector('.e-head')
    if (newsExist && elm) {
      lastScrollTop.current = scrollCategories[category]
      setTimeout(() => elm.scroll({ top: scrollCategories[category] }), 100)
    }
    elm?.addEventListener('scroll', scrollListener)
    return () => {
      elm?.removeEventListener('scroll', scrollListener)
    }
  }, [active, category, newsExist])

  function swiped(event, deltaX, deltaY: number) {
    if (!activeScroll.current) return
    const eList = scrollComponent.current
    const itemRefresh = pullRefresh.current
    const icon = itemRefresh?.querySelector('.is-icon')
    if (
      (eList?.scrollTop || 0) < 5 &&
      Math.abs(deltaY) > 200 &&
      activeScroll.current
    ) {
      activeScroll.current = false
      fetching.current = true
      eList?.classList.add('list-refresh')
      itemRefresh?.classList.remove('noTransition')
      itemRefresh?.classList.add('pull-refresh-animated')
      dispatch(
        refreshCategoryNews(
          category,
          () => {
            window.ga?.(
              'gtm1.send',
              'pageview',
              `${window.location.pathname}?ref=refresh`,
            )
            fetching.current = false
            itemRefresh?.classList.remove('pull-refresh-animated')
            transform(itemRefresh, 'translate3d(0, 0, 0)', () => {
              itemRefresh?.removeAttribute('style')
              icon?.removeAttribute('style')
              eList?.classList.remove('list-refresh')
            })
          },
          category === 'portada' ? template : undefined,
        ),
      )
    } else {
      activeScroll.current = false
      itemRefresh?.classList.remove('noTransition')
      transform(itemRefresh, 'translate3d(0, 0, 0)', () => {
        itemRefresh?.removeAttribute('style')
        icon?.removeAttribute('style')
      })
    }
  }

  function swipingDown(event, deltaY: number) {
    const eList = scrollComponent.current
    const itemRefresh = pullRefresh.current
    const icon: HTMLElement | null | undefined = itemRefresh?.querySelector(
      '.is-icon',
    )
    const wrapperSlide: HTMLElement | null = document.querySelector(
      '.react-swipeable-view-container',
    )
    if (!wrapperSlide) return
    const isScroll =
      wrapperSlide.style.transform !== 'translate(-100%, 0px)' &&
      wrapperSlide.style.transform !== 'translate(0%, 0px)'
    if ((eList?.scrollTop || 0) > 5 || fetching.current || isScroll) return
    activeScroll.current = true
    if (icon) {
      icon.style.opacity = String(deltaY / 200)
    }
    const movY = deltaY / 4
    itemRefresh?.classList.add('noTransition')
    transform(itemRefresh, `translate3d(0, ${movY < 70 ? movY : '70'}px, 0)`)
    transform(icon, `rotate(${deltaY / 1.15}deg)`)
  }

  const classes = classNames('wrapper-newlist safe-area-inset-bottom', {
    'newlist-navbottom': config.components?.menuBottom,
    'wrapper-newlist-active': active,
    portada: category === 'portada',
  })

  function openInBrowser(url: string) {
    if (!url) return
    if (!!window.ReactNativeWebView) {
      window.open(url, '_blank')
    } else {
      window.nativeConnection?.requestJsExternalWebView(url, '')
    }
  }

  const randomPosition = useMemo(() => Math.floor(Math.random() * 4 + 2), [
    category,
  ])

  const showBannerPremium = (
    adsPosition: string,
    bannerPosition: number | null,
  ) => {
    if (!PAYWALL_ACTIVE) return false
    if (WEB_PROJECT_EC_APP) return false
    return adsPosition === `caja${bannerPosition}`
  }

  if (news) {
    return (
      <Swipeable onSwiped={swiped} onSwipingDown={swipingDown}>
        <div ref={pullRefresh} className="item-pull-refresh">
          <Icon type="md-refresh" />
        </div>
        <div ref={scrollComponent} className={classes}>
          <InfiniteScroll
            isChanged={news.length}
            pageStart={pagination.page}
            loadMore={loadMore}
            hasMore={pagination.page < 5 && hasMore}
          >
            {category === 'portada' && breaking.length > 0 ? (
              <div className="e-breaking__wrapper">
                {breaking.map((item, i) => (
                  <React.Fragment key={i}>
                    <Link
                      to={`/news${item.url}?source=home_breaking-story-${i}`}
                      onClick={event => handleBreakingOpen(event, item.url)}
                    >
                      <h2 className="e-card__title font-serif text-sm font-black">
                        {item.tag ? (
                          <span className="e-breaking__tag font-sans">
                            {item.tag}{' '}
                          </span>
                        ) : null}
                        {item.prefix ? (
                          <span className="e-breaking__prefix font-sans">
                            {item.prefix}{' '}
                          </span>
                        ) : null}
                        {item.title}
                      </h2>
                    </Link>
                    <hr />
                  </React.Fragment>
                ))}
              </div>
            ) : null}
            {news.map((item, index) => {
              if (item.type === 'ads') {
                if (paywallStatus) return null
                return (
                  <React.Fragment key={item.nid}>
                    {active ? (
                      <>
                        <EAds
                          id={item.id}
                          position={item.position || ''}
                          root=".wrapper-newlist-active"
                          section={adSection}
                          sizes={[
                            [300, 250],
                            [320, 100],
                            [300, 100],
                            [320, 50],
                            [300, 50],
                          ]}
                          template={category === 'portada' ? 'home' : 'sect'}
                        />
                        {showBannerPremium(item.position, 1) ? (
                          <EBannerPremium position={1} />
                        ) : null}
                        {showBannerPremium(item.position, randomPosition) ? (
                          <EBannerPremium position={randomPosition} />
                        ) : null}
                      </>
                    ) : null}
                  </React.Fragment>
                )
              }
              if (item.type === 'section') {
                return (
                  <ViewableMonitor
                    key={item.category}
                    root=".wrapper-newlist"
                    rootMargin={
                      loadedCategories.includes(item.category)
                        ? '0px 0px 10000px 0px'
                        : '0px 0px 200px 0px'
                    }
                    disabled
                  >
                    {isViewable =>
                      isViewable ? <CategoryList {...item} /> : null
                    }
                  </ViewableMonitor>
                )
              }
              if (item.type === 'carousel') {
                return (
                  <React.Fragment key={index}>
                    <ECarousel {...item} />
                    <h3 className="e-carousel__title font-serif">
                      Las últimas noticias
                    </h3>
                  </React.Fragment>
                )
              }

              if (item.type === 'iframe') {
                return (
                  <ViewableMonitor
                    key={index}
                    root=".wrapper-newlist"
                    rootMargin="0px 0px 200px 0px"
                    disabled
                  >
                    {isViewable =>
                      isViewable ? (
                        <div className="e-iframe__wrapper">
                          <iframe
                            title={item.title}
                            height={item.height}
                            src={item.src}
                          />
                        </div>
                      ) : null
                    }
                  </ViewableMonitor>
                )
              }

              if (item.type === 'video') {
                return (
                  <div key={index} className="wrapper-video">
                    <iframe
                      title={item.title}
                      width="560"
                      height="315"
                      src={item.src}
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                )
              }

              if (item.type === 'image') {
                return (
                  <Link
                    key={index}
                    to={item.path}
                    className="wrapper-image"
                    onClick={event => {
                      if (item.external) {
                        event.preventDefault()
                        openInBrowser(item.path)
                      }
                    }}
                  >
                    <figure key={index}>
                      <img alt={item.alt} src={item.src} />
                    </figure>
                  </Link>
                )
              }

              return (
                <div key={item.nid} className="e-card__wrapper">
                  <ECard
                    author={item.author}
                    category={category}
                    content={item}
                    description={Boolean(item.description) && index < 4}
                    header={item.header}
                    media
                    routePath={item.url}
                    share
                    timeRead
                    type={item.layout}
                  />
                </div>
              )
            })}
          </InfiniteScroll>
        </div>
      </Swipeable>
    )
  }

  return <CardFullPlaceHolder className="e-listnews-placeholder" repeat={3} />
}

export default React.memo(EListNews)
