import React from 'react'
import { Link } from 'react-router-dom'
import './EHead.css'

import ECategoryMenu from '../eCategoryMenu'
import { AppContext } from '../../context/app'
import Header from '../../system/header'
import Icon from '../../system/icon'
import IconWrapper from '../../system/icon/icon-wrapper'
import nativeApi from '../../tools/nativeApi'

type NavigationItem = {
  type: string
  key: string
  image: string
  image_night: string
  url: string
  icon: {
    type: string
  }
}

interface Props {
  config: {
    name: string
    main: string
    navigationTop: NavigationItem[]
  }
  location: {
    pathname: string
  }
}

class EHead extends React.PureComponent<Props> {
  header = React.createRef<HTMLElement>()

  componentDidUpdate(prevProps) {
    const { location } = this.props
    const { current } = this.header
    // Change route
    if (prevProps.location.pathname !== location.pathname) {
      current?.classList.remove('e-head--hide')
    }
  }

  getActiveCategories = () => {
    const { categories } = this.context
    return categories.filter(c => c.active)
  }

  handleOpenLink = (event: React.SyntheticEvent, item: NavigationItem) => {
    if (item.key === 'search') {
      event.preventDefault()
      nativeApi.navigate('Search')
    }
  }

  render() {
    const {
      config: { name, main, navigationTop },
      location,
    } = this.props

    const categories = this.getActiveCategories()
    const { nightMode } = this.context
    const index = categories.findIndex(({ path }) => path === location.pathname)

    return (
      <header ref={this.header} className="e-head bg-brand">
        <div className="e-head-inner">
          <Header align="justify" theme="primary">
            {navigationTop.map(item => {
              if (item.type === 'menu') {
                return (
                  <div key={item.key}>
                    <button
                      type="button"
                      onClick={() => nativeApi.openDrawer()}
                    >
                      <IconWrapper size="large">
                        <Icon
                          type="md-menu"
                          style={{
                            fontSize: name !== 'trome' ? 20 : 30,
                            marginLeft: name !== 'trome' ? 'inherit' : 13,
                          }}
                        />
                      </IconWrapper>
                    </button>
                  </div>
                )
              }

              if (item.type === 'logotipo') {
                return (
                  <div style={{ flex: '1 1' }} key={item.key}>
                    <Link className="logotipo" to={main}>
                      <img
                        src={
                          nightMode && item.image_night
                            ? item.image_night
                            : item.image
                        }
                        alt="logotipo"
                      />
                    </Link>
                  </div>
                )
              }

              if (item.type === 'link') {
                return (
                  <div key={item.key}>
                    <Link
                      to={item.url}
                      onClick={event => this.handleOpenLink(event, item)}
                    >
                      <IconWrapper size="large">
                        <Icon {...item.icon} style={{ fontSize: 20 }} />
                      </IconWrapper>
                    </Link>
                  </div>
                )
              }

              return <IconWrapper key={item.key} size="large" />
            })}
          </Header>
          {main === '/' ? null : (
            <ECategoryMenu
              name={name}
              categories={categories}
              index={index < 0 ? 0 : index}
            />
          )}
        </div>
      </header>
    )
  }
}

EHead.contextType = AppContext

export default EHead
