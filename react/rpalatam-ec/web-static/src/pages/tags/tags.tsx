import React from 'react'
import { useSelector } from 'react-redux'
import {
  Link,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { RootState } from '../../store/reducers'
import SingleTag from './singleTag'
import './index.css'
import ERibbon from '../../components/eRibbon'
import EFollow from '../../components/eFollow'

function Tags(props: RouteComponentProps) {
  const { match, location } = props
  const { tags } = useSelector((state: RootState) => state.preferences)
  const parsedTags = Object.values(tags)

  return (
    <section className="tags-view h-screen">
      <ERibbon content={{ seccion: { nombre: 'Mis Temas' } }} />
      <main className="tags-wrapper safe-area-py-48 py-48">
        {parsedTags.length > 0 ? (
          parsedTags.map(tag => {
            return (
              <div className="tag" key={tag._id}>
                <Link
                  to={{
                    pathname: `${match.path}/${tag.slug}`,
                    state: {
                      isTag: true,
                      title: tag.name,
                      followState: {
                        keyType: 'tags',
                        body: tag,
                      },
                    },
                  }}
                >
                  {tag.name}
                </Link>
                <EFollow
                  notificationButton
                  entity={{
                    keyType: 'tags',
                    _id: tag.slug,
                    slug: tag.slug,
                    description: tag.description,
                    name: tag.name,
                  }}
                />
              </div>
            )
          })
        ) : match.isExact ? (
          <Redirect to="/mynews" />
        ) : null}
      </main>
      <TransitionGroup className="transition-group-portrait">
        <CSSTransition
          classNames="fade"
          timeout={{ enter: 300, exit: 300 }}
          key={match.isExact + ''}
        >
          <section>
            <Switch location={location}>
              <Route path={`${match.path}/:id`} component={SingleTag} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </section>
  )
}

export default Tags
