import React, { useEffect, useMemo } from 'react'
import Loadable from 'react-loadable'
import { useSelector, useDispatch } from 'react-redux'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './index.css'

import ECard from '../../components/eCard'
import {
  LoadPage,
  CardMagazinePlaceHolder,
} from '../../components/ePlaceHolder'
import ERibbon from '../../components/eRibbon'
import { RootState } from '../../store/reducers'
import { setFavoritesStories } from '../../store/favorites/actions'

const Notice = Loadable({
  loader: () => import(/* webpackChunkName: "Notice" */ '../notice'),
  loading: () => <LoadPage />,
})

const Favorites: React.FC<RouteComponentProps> = ({ match, location }) => {
  const dispatch = useDispatch()
  const config = useSelector((state: RootState) => state.configBrand)
  const refIds = useSelector((state: RootState) => state.favorites.refIds)
  const ids = refIds.current || []
  const refStories = useSelector(
    (state: RootState) => state.favorites.refStories,
  )
  const stories = useSelector((state: RootState) => state.favorites.stories)

  const isPending = useMemo(() => {
    const idsFetched = stories.map(story => story.nid)
    const storiesForFetch = ids.filter(id => !idsFetched.includes(id))
    return storiesForFetch.length > 0
  }, [ids, stories])

  useEffect(() => {
    dispatch(setFavoritesStories(refStories.current || []))
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: 'favorites.GET_STORIES_BY_ID' }),
    )
  }, [dispatch, refStories])

  return (
    <div className="favorites-view">
      <ERibbon
        content={{
          seccion: {
            nombre: 'Leer luego',
          },
        }}
        hideHamburger
        hideIconHome={config.components?.menuBottom}
      />
      <div className="favorites-view-wrapper h-screen safe-area-py-48 py-48">
        <div className="favorites__list">
          {isPending ? <CardMagazinePlaceHolder repeat={3} /> : null}
          {!isPending && stories.length === 0 ? (
            <p className="message">Por ahora no tienes noticias guardadas</p>
          ) : null}
          {!isPending
            ? stories.map(item => (
                <div key={item.nid} className="e-card__wrapper">
                  <ECard
                    category="Favoritos"
                    content={item}
                    footer
                    header
                    media
                    routePath={
                      !Number(item.nid) ? item.url : `/favorites/${item.nid}`
                    }
                    timeRead
                    type="magazine"
                  />
                </div>
              ))
            : null}
        </div>
      </div>
      <TransitionGroup className="transition-group-portrait">
        <CSSTransition
          key="/favorites"
          timeout={{ enter: 300, exit: 300 }}
          classNames="fade"
        >
          <section>
            <Switch location={location}>
              <Route path={`${match.path}/:id`} component={Notice} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default Favorites
