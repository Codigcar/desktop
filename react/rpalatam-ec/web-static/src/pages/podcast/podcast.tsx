/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import Loadable from 'react-loadable'
import { useSelector } from 'react-redux'
import {
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './podcast.css'

import { LoadPage } from '../../components/ePlaceHolder'
import ERibbon from '../../components/eRibbon'
import { AppContext } from '../../context/app'
import { RootState } from '../../store/reducers'

const Program = Loadable({
  loader: () => import(/* webpackChunkName: "Program" */ './eProgram'),
  loading: () => <LoadPage />,
})

const Podcast: React.FC = () => {
  // Store
  const { pages } = useSelector((state: RootState) => state.configBrand)
  // Router
  const match = useRouteMatch()
  const location = useLocation()
  // Context
  const context = useContext(AppContext)
  // Component
  const [podcastPrograms] = pages!.filter(p => p.component === 'podcast')

  useEffect(() => {
    if (context.activePlayer) {
      context.activePlayer(true)
    }
    Program.preload()
  }, [])

  return (
    <div className="podcast-view">
      <ERibbon
        content={{
          seccion: {
            nombre: 'Podcast',
          },
        }}
      />
      <div className="podcast-programs-list h-screen safe-area-py-48 py-48">
        <div className="podcast__programs-wrapper px-16">
          {podcastPrograms.programs.map(program => (
            <Link
              className="card__content"
              to={{
                pathname: `podcast/${program.path}`,
                state: { program: program.title },
              }}
              key={program.path}
            >
              <div className="card-program" key={program.path}>
                <div>
                  <div className="card__header">
                    <h3 className="font-serif">{program.title}</h3>
                  </div>
                  <div className="card__description">{program.description}</div>
                </div>
                <figure>
                  <img alt="programa" src={program.image} />
                </figure>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <TransitionGroup className="transition-group-portrait">
        <CSSTransition
          key={String(match.isExact)}
          timeout={{ enter: 300, exit: 300 }}
          classNames="fade"
        >
          <section>
            <Switch location={location}>
              <Route path={`${match.path}/:id`}>
                <Program />
              </Route>
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default React.memo(Podcast)
