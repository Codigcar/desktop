import React from 'react'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { virtualize } from 'react-swipeable-views-utils'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './index.css'

import EHead from '../../components/eHead'
import EListNews from '../../components/eListNews'
import { CardFullPlaceHolder, LoadPage } from '../../components/ePlaceHolder'
import ReloginNotification from '../../containers/ReloginNotification'
import { AppContext } from '../../context/app'
import { newFetchCategories } from '../../store/news/actions'

const VirtualizeSwipeableViews = virtualize(SwipeableViews)

const Notice = Loadable({
  loader: () => import(/* webpackChunkName: "Notice" */ '../notice'),
  loading: () => <LoadPage />,
})

const slideRenderer = ({ key, index }, categories, match) => {
  const category = categories[index]
  if (!category) {
    return (
      <CardFullPlaceHolder
        key={key}
        className="e-listnews-placeholder"
        repeat={3}
      />
    )
  }
  return (
    <EListNews
      key={key}
      adSection={category.ad || category.key.replace(/-/g, '')}
      active={category.key === match.params.category}
      category={category.key}
      infinite={category.key !== 'portada'}
    />
  )
}

interface Props {
  config: any
  dispatch: any
  history: any
  location: any
  match: any
  news: {}[]
}

interface State {
  categoryIndex: number
}

class Portrait extends React.Component<Props, State> {
  http: any
  constructor(props, context) {
    super(props)
    const initialIndex = context.categories
      .filter(c => c.active)
      .findIndex(({ key }) => key === props.match.params.category)
    this.state = {
      categoryIndex:
        initialIndex >= 0
          ? initialIndex
          : context.categories.findIndex(c => c.path === props.config.main),
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { categoryIndex } = this.state
    const categories = this.getActiveCategories()
    const fetchCategories = this.findCategories(categories[categoryIndex].key)
    if (fetchCategories.length) {
      this.http = dispatch(newFetchCategories(fetchCategories)) // fetch all notices with fetchCategories
    }
    Notice.preload()
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch, history, match, config } = this.props
    const { categoryIndex } = this.state
    const categories = this.getActiveCategories()
    if (prevState.categoryIndex !== categoryIndex) {
      if (this.http) {
        this.http.abort()
      }
      const category = categories[categoryIndex].key
      const fetchCategories = this.findCategories(category)
      if (fetchCategories.length) {
        this.http = dispatch(newFetchCategories(fetchCategories))
      }
    }
    const newCategory = match.params.category
    if (prevProps.match.params.category !== newCategory) {
      const newIndex = categories.findIndex(({ key }) => key === newCategory)
      this.updateCategoryIndex(newIndex)
    }
    const existCategory = categories.findIndex(
      ({ key }) => key === prevProps.match.params.category,
    )
    if (
      existCategory < 0 &&
      prevProps.location.pathname === this.props.location.pathname
    ) {
      history.replace(config.main)
    }
  }

  updateCategoryIndex = newIndex => {
    const { categoryIndex } = this.state
    if (categoryIndex !== newIndex) {
      const { history } = this.props
      const categories = this.getActiveCategories()
      const category = categories[newIndex]
      this.setState({
        categoryIndex: newIndex,
      })
      if (category.path !== history.location.pathname) {
        history.push(category.path)
      }
    }
  }

  findCategories = category => {
    const { news } = this.props
    const { categoryIndex: index } = this.state
    const categories = this.getActiveCategories()
    const fetchCategories: string[] = []
    let nextCategory
    let prevCategory

    if (index < categories.length - 1) {
      nextCategory = categories[index + 1].key
    }
    if (index > 0) {
      prevCategory = categories[index - 1].key
    }
    if (!news[category]) {
      fetchCategories.push(category)
    }
    if (nextCategory && !news[nextCategory]) {
      fetchCategories.push(nextCategory)
    }
    if (prevCategory && !news[prevCategory]) {
      fetchCategories.push(prevCategory)
    }
    if (fetchCategories.length === 0) {
      return []
    }
    return [...fetchCategories]
  }

  getActiveCategories = () => {
    const { categories } = this.context
    return categories.filter(c => c.active)
  }

  render() {
    const { config, location, match } = this.props
    const { categoryIndex } = this.state
    const categories = this.getActiveCategories()
    return (
      <div className="wrap-page">
        <EHead config={config} location={location} />
        <VirtualizeSwipeableViews
          index={categoryIndex}
          onChangeIndex={this.updateCategoryIndex}
          overscanSlideAfter={1}
          overscanSlideBefore={1}
          slideCount={categories.length}
          slideRenderer={props => slideRenderer(props, categories, match)}
          onSwitching={() => {
            document.querySelector('.e-head')?.classList.remove('e-head--hide')
          }}
        />
        <ReloginNotification />
        <TransitionGroup className="transition-group-portrait">
          <CSSTransition
            key={match.isExact}
            timeout={{ enter: 300, exit: 300 }}
            classNames="fade"
          >
            <section className="notice-view-portrait">
              <Switch location={location}>
                <Route path={`${match.path}/:id`} component={Notice} />
              </Switch>
            </section>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

Portrait.contextType = AppContext

const mapStateToProps = state => ({
  config: state.configBrand,
  news: state.aNewFetchSuccess,
})

export default connect(mapStateToProps)(Portrait)
