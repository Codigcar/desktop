import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import './categoryList.css'

import ECard from '../eCard'
import { AppContext } from '../../context/app'
import { newFetchCategories } from '../../store/news/actions'
import Icon from '../../system/icon/index'
import IconWrapper from '../../system/icon/icon-wrapper'
import Notification from '../../system/notification'
import nativeApi from '../../tools/nativeApi'
import { openAlertAvailable } from '../../tools/tools'

interface Props {
  category: string
  dispatch: any
  news: any[]
  author?: boolean
  description?: boolean
  marker?: boolean
  size?: number
  share?: boolean
  media?: boolean
  title: string
  layout: string
  header: boolean
  config: { name: string }
}

const OPEN_ALERT_AVAILABLE = openAlertAvailable()

class CategoryList extends React.PureComponent<Props> {
  static defaultProps = {
    size: 5,
  }
  http: any

  componentDidMount() {
    const { category, dispatch, news } = this.props

    if (!news[category]) {
      this.http = dispatch(newFetchCategories([category]))
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.removeCategoryList)
  }

  removeCategory = () => {
    const { categories } = this.context
    const { category } = this.props

    const container = document.querySelector<HTMLElement>(
      `.category-list-${category}`,
    )

    const items = categories.map(item => {
      if (item.key !== category) return item
      return { ...item, active: !item.active }
    })

    const type = 'categories.SET_LIST_OF_CATEGORY'
    const payload = { categories: items }

    container?.classList.add('hide')
    window.ReactNativeWebView?.postMessage(JSON.stringify({ type, payload }))
    Notification.info({
      content: (
        <div className="notification-active-category">
          <span>Se removió la sección del Inicio</span>{' '}
          <button onClick={() => nativeApi.navigate('CustomContent')}>
            Personalizar
          </button>
        </div>
      ),
      duration: 6,
    })
  }

  removeCategoryList = event => {
    const nativeEvent = event?.data.payload
    if (nativeEvent?.text !== 'Remover') return
    this.removeCategory()
  }

  activeCategory = () => {
    window.removeEventListener('message', this.removeCategoryList)
    if (!OPEN_ALERT_AVAILABLE) return this.removeCategory()
    window.addEventListener('message', this.removeCategoryList)
    nativeApi.sendAlert({
      title: `¿Remover "${this.props.title}"?`,
      message: 'La sección dejará de mostrarse en el Inicio',
      buttons: [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          style: 'destructive',
        },
      ],
    })
  }

  handleOpenSection = () => {
    const { category, config, title } = this.props
    if (config.name !== 'gestion') return
    nativeApi.navigate('News', { section: { name: title, path: category } })
  }

  render() {
    const {
      author,
      category,
      description,
      marker,
      news,
      size,
      share,
      media,
      title,
      layout,
      header,
      config: { name },
    } = this.props
    const data = news[category]

    if (!data) {
      return (
        <div className="category-list-loading">
          <Icon type="loading" />
        </div>
      )
    }

    const dataFilter = data.filter(d => !d.id).splice(0, size)
    const classes = classNames('category-list', `category-list-${category}`)

    let firsItemType: undefined | string = 'full'
    let firsItemDescription: undefined | boolean = true
    if (name === 'trome') {
      firsItemType = undefined
      firsItemDescription = description
    }
    return (
      <div className={classes}>
        <div className="category-list__header">
          <div className="list-title">
            <button className="font-serif" onClick={this.handleOpenSection}>
              {title}
            </button>
          </div>
          {name === 'gestion' ? (
            <button onClick={this.activeCategory} type="button">
              <IconWrapper size="medium">
                <Icon
                  type="md-remove_circle_outline"
                  style={{ fontSize: 22 }}
                />
              </IconWrapper>
            </button>
          ) : null}
        </div>
        {dataFilter.map((item, index) => {
          const type = index === 0 ? firsItemType : layout
          const newdescription = index === 0 ? firsItemDescription : description

          return (
            <div key={item.nid} className="e-card__wrapper">
              <ECard
                author={author}
                description={newdescription}
                category="portada"
                content={item}
                header={header ? header : false}
                type={type}
                marker={marker}
                share={share}
                media={media}
                routePath={`/news${item.url}`}
                timeRead
              />
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  news: state.aNewFetchSuccess,
  config: state.configBrand,
})

CategoryList.contextType = AppContext

export default connect(mapStateToProps)(CategoryList)
