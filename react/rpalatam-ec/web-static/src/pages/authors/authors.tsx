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
import EFollow from '../../components/eFollow'
import ERibbon from '../../components/eRibbon'
import { RootState } from '../../store/reducers'
import './authors.css'
import AuthorIndividualPage from './individual'

function AuthorsPage({ location, match }: RouteComponentProps) {
  const { authors } = useSelector((state: RootState) => state.preferences)
  const isEmpty = Object.keys(authors).length === 0

  if (isEmpty && match.isExact) {
    return <Redirect to="/mynews" />
  }

  return (
    <section className="authors-view">
      <ERibbon
        content={{
          seccion: { nombre: 'Autores' },
        }}
        hideHamburger
        hideIconHome
      />
      {!isEmpty ? (
        <div className="safe-area-py-48 py-48">
          <main className="authors__wrapper">
            {Object.entries(authors).map(([key, author]) => {
              return (
                <div key={key} className="authors-view__author">
                  <button>
                    <Link
                      className="author__info"
                      to={{
                        pathname: `/authors/${author.slug}`,
                        state: {
                          followState: {
                            keyType: 'authors',
                            body: author,
                          },
                        },
                      }}
                    >
                      <figure className="author__avatar font-serif">
                        {author.image?.url ? (
                          <img
                            src={author.image.url}
                            alt={`${author.name} avatar`}
                          />
                        ) : (
                          <span>
                            {author.name?.substring(0, 1).toUpperCase()}
                          </span>
                        )}
                      </figure>
                      <span>{author.name}</span>
                    </Link>
                  </button>
                  <EFollow
                    notificationButton
                    entity={{
                      keyType: 'authors',
                      _id: author._id,
                      description: author?.description || '',
                      slug: author.slug,
                      name: author.name,
                      image: author.image,
                    }}
                  />
                </div>
              )
            })}
          </main>
        </div>
      ) : null}
      <TransitionGroup className="transition-group-portrait">
        <CSSTransition
          classNames="fade"
          timeout={{ enter: 300, exit: 300 }}
          key={match.isExact + ''}
        >
          <section>
            <Switch location={location}>
              <Route
                path={`${match.path}/:author`}
                component={AuthorIndividualPage}
              />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </section>
  )
}

export default AuthorsPage
