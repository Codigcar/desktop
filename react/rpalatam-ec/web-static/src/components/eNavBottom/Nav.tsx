import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import { NavLink, matchPath, withRouter } from 'react-router-dom'
import './nav.css'

import Icon from '../../system/icon'
import IconWrapper from '../../system/icon/icon-wrapper'
import { App } from '../../tools/config'
import { WEB_PROJECT_EC_APP } from '../../tools/flags'
import nativeApi from '../../tools/nativeApi'

interface Props {
  config: any
  location: any
}

const selectorsToScroll = {
  '/': '.wrapper-newlist-active',
  '/category/:category': '.wrapper-newlist-active',
  '/favorites': '.favorites-view-wrapper',
  '/mynews': '.mynews-wrapper',
  '/peru21tv': '.tv-view-wrapper',
  '/podcast': '.podcast-programs-list',
  '/profile': '.profile__submenu-wrapper',
}

const ITEMS = [
  { icon: { type: 'ec-star_outline' }, label: 'Mis noticias', url: '' },
  {
    icon: { type: 'ec-game' },
    label: 'Juegos',
    url: 'https://elcomercio.pe/juegos/',
  },
  {
    icon: { type: 'ec-newspaper', view: '0 0 1380 1024' },
    label: 'Ed. Impresa',
    url: 'https://beta.peruquiosco.pe/',
  },
  {
    icon: { type: 'ec-clubec' },
    label: 'Club',
    url: 'https://clubelcomercio.pe/',
  },
]

function openBrowser(event: React.SyntheticEvent, url: string) {
  event.preventDefault()
  if (!url) return
  window.open(url, '_blank')
}

class BottomTabNavigator extends React.PureComponent<Props> {
  handleNavLink(event: React.MouseEvent, item) {
    const { location } = this.props
    const isPortrait = item.path === '/category/portada'
    const match = matchPath(location.pathname, {
      path: isPortrait ? '/category/:category' : item.path,
      exact: true,
    })
    if (!match) return
    const selector = selectorsToScroll[match.path]
    if (!selector) return
    const container = document.querySelector<HTMLElement>(selector)
    if (container && container.scrollTop > 0) {
      event.preventDefault()
      container.scroll({ top: 0, behavior: 'smooth' })
    }
  }

  render() {
    const { config, location } = this.props
    const classes = classNames('nav-bottom', {
      'nav-bottom-night':
        (App.key === 'peru21' && location.pathname.includes('/peru21tv')) ||
        (App.key === 'elcomercio' && location.pathname.includes('/podcastx')),
      'ec-v2': WEB_PROJECT_EC_APP,
    })

    if (WEB_PROJECT_EC_APP) {
      return (
        <div className={classes}>
          <div className="nav-bottom-group">
            <NavLink
              onClick={event =>
                this.handleNavLink(event, { path: '/category/portada' })
              }
              to="/category/portada"
            >
              <IconWrapper size="medium">
                <Icon type="ec-home_outline" view="0 0 1024 1024" />
              </IconWrapper>
              <span>Portada</span>
            </NavLink>
            {ITEMS.map((item, index) => (
              <NavLink
                key={index}
                onClick={event => openBrowser(event, item.url)}
                to="/unknown"
              >
                <IconWrapper size="medium">
                  <Icon
                    type={item.icon.type}
                    view={item.icon.view || '0 0 1024 1024'}
                  />
                </IconWrapper>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className={classes}>
        <div className="nav-bottom-group">
          {config.bottomTabNavigator.map(item => {
            if (item.id === 'menu') {
              return (
                <div key={item.id}>
                  <button type="button" onClick={() => nativeApi.openDrawer()}>
                    <IconWrapper size="large">
                      <Icon type="md-menu" />
                      <span className="icon-title">{item.label}</span>
                    </IconWrapper>
                  </button>
                </div>
              )
            }
            return (
              <NavLink
                isActive={() => {
                  const [rooPath] = item.path.substring(1).split('/', 1)
                  if (item.path === '/') return location.pathname === '/'
                  return location.pathname.includes(rooPath)
                }}
                to={item.path}
                key={item.id}
                onClick={event => this.handleNavLink(event, item)}
              >
                <IconWrapper size="large">
                  <Icon {...item.icon} />
                  <span className="icon-title">{item.label}</span>
                </IconWrapper>
              </NavLink>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  config: state.configBrand,
})

export default withRouter(connect(mapStateToProps)(BottomTabNavigator))
