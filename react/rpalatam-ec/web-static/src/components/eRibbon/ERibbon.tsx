import classNames from 'classnames'
import * as React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import './ERibbon.css'

import EFollow from '../eFollow'
import { toogleFavorite } from '../../store/favorites/actions'
import { AppContext } from '../../context/app'
import Icon from '../../system/icon'
import IconGroup from '../../system/icon/icon-group'
import IconWrapper from '../../system/icon/icon-wrapper'
import Header from '../../system/header'
import { IS_HIBRID } from '../../tools/checkMobile'
import { RN_SCREENS_STORY_V2, WEB_PROJECT_EC_APP } from '../../tools/flags'
import nativeAPI from '../../tools/nativeApi'
import Share from '../../tools/share'
import { contentLight, myNewsAvailable } from '../../tools/tools'
import FontSizeModal from './FontSizeModal'

interface Props {
  backURL?: string
  config: any
  content?: any
  dispatch: any
  marker?: boolean
  hideIconHome?: boolean
  hideHamburger?: boolean
  history: any
  isLoading?: boolean
  otherOptions?: boolean
  favorites: {
    setIds: Set<string>
  }
  section?: string
  suscription?: boolean
  match?: any
  isFollowing?: boolean
  location?: any
  updatingPreferences?: boolean
  error?: any
}

interface State {
  moreOptions: boolean
}

class ERibbon extends React.PureComponent<Props, State> {
  static defaultProps = {
    content: {},
    marker: false,
    hideIconHome: false,
    hideHamburger: false,
    otherOptions: false,
  }

  state = {
    moreOptions: false,
  }

  historyBack = () => {
    if (RN_SCREENS_STORY_V2()) return nativeAPI.navigateGoBack()

    const { backURL, history, location } = this.props
    const { state } = location
    if (state?.pageInfo) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'navigation.NAVIGATE_TO_SCREEN',
          payload: {
            name: state.pageInfo.screenName,
            params: {
              ...state.pageInfo.params,
            },
          },
        }),
      )
      history.goBack()
      return
    }

    if (backURL) {
      history.replace(backURL)
      return
    }
    // const UA = window.navigator.userAgent;
    let home = false
    if (history.length === 1) home = true
    // if (history.length === 2 && !/hybrid/.test(UA)) home = true;
    if (history.length === 2 && !IS_HIBRID()) home = true
    if (/(ref=notification)|(ref=openapp)/gi.test(window.location.href)) {
      home = true
    }
    if (home) {
      history.replace('/')
    } else {
      history.goBack()
    }
  }

  clickFavorite = () => {
    const { content, dispatch } = this.props
    const { profile } = this.context
    if (WEB_PROJECT_EC_APP && !profile?.uuid) {
      nativeAPI.navigate('Login')
      return
    }
    dispatch(toogleFavorite(contentLight(content)))
  }

  handleShare = () => {
    const { config, content } = this.props
    const url = `https://${config.marketing.domain}${content.url}`
    Share.share(url)
  }

  showMoreOptions = () => {
    this.setState(prevState => ({
      moreOptions: !prevState.moreOptions,
    }))
  }

  renderFollowButton = () => {
    const {
      location: { state },
    } = this.props
    if (!myNewsAvailable()) {
      return
    }
    const { keyType, body } = state?.followState || {}
    return (
      <div className="e-ribbon__follow-wrapper">
        <EFollow
          entity={{
            keyType,
            ...body,
          }}
          followButton
          notificationButton
        />
      </div>
    )
  }

  render() {
    const { moreOptions } = this.state
    const {
      content: { seccion, nid, url },
      hideIconHome,
      marker,
      isLoading,
      otherOptions,
      favorites: { setIds },
      location: { state },
      config,
      section,
    } = this.props

    const classes = classNames('e-ribbon', {
      'ec-app': WEB_PROJECT_EC_APP,
    })

    const classesOptions = classNames('more-options', {
      'more-options-active': moreOptions,
    })

    const isFavorite = classNames({
      marked: setIds.has(nid),
    })

    return (
      <div className={classes}>
        <Header align="justify">
          <button type="button" onClick={this.historyBack}>
            <div className="e-ribbon__section">
              <Icon
                type="ios-arrow-forward"
                style={{ fontSize: 20, transform: 'rotate(180deg)' }}
              />
              <div>{section}</div>
            </div>
          </button>
          {!section ? (
            <>
              <div
                className={`news__header-title ${
                  state?.followState ? 'cutted' : ''
                }`}
              >
                {seccion ? seccion.nombre : ''}
              </div>
              {state?.followState ? this.renderFollowButton() : null}
              <IconWrapper size="medium" />
            </>
          ) : WEB_PROJECT_EC_APP ? (
            <IconGroup>
              {url ? <FontSizeModal /> : null}
              {marker && (
                <button type="button" onClick={this.clickFavorite}>
                  <IconWrapper size="medium">
                    <Icon
                      type={isFavorite ? 'ec-bookmark' : 'ec-bookmark_outline'}
                      view="-200 0 1200 896"
                    />
                  </IconWrapper>
                </button>
              )}
              {url && (
                <button type="button" onClick={this.handleShare}>
                  <IconWrapper size="medium">
                    <Icon type="ec-format-size" view="-190 50 1200 896" />
                  </IconWrapper>
                </button>
              )}
            </IconGroup>
          ) : (
            <IconGroup>
              {!hideIconHome ? (
                <Link to={config.main}>
                  <IconWrapper size="large">
                    <Icon type="md-home" style={{ fontSize: 20 }} />
                  </IconWrapper>
                </Link>
              ) : null}
              {marker && (
                <button type="button" onClick={this.clickFavorite}>
                  <IconWrapper size="medium">
                    <Icon
                      type="md-bookmark"
                      className={isFavorite}
                      style={{ fontSize: 20 }}
                    />
                  </IconWrapper>
                </button>
              )}
              {url && (
                <button type="button" onClick={this.handleShare}>
                  <IconWrapper size="medium">
                    <Icon type="md-share" style={{ fontSize: 20 }} />
                  </IconWrapper>
                </button>
              )}
              {url ? <FontSizeModal /> : null}
              {otherOptions && (
                <button type="button" onClick={this.showMoreOptions}>
                  <IconWrapper size="medium">
                    <Icon
                      type="md-more"
                      style={{
                        fontSize: 20,
                      }}
                    />
                  </IconWrapper>
                </button>
              )}
            </IconGroup>
          )}
        </Header>
        {isLoading ? <div className="progress-bar"></div> : null}
        <div
          className={classesOptions}
          onClick={() => this.setState({ moreOptions: false })}
        >
          <div className="more-options-content">
            <Link to={config.main}>
              <Icon type="md-home" style={{ fontSize: 20 }} />
              <span>Ir a la Portada</span>
            </Link>
            {process.env.REACT_APP_ENVIRONMENT !== 'production' && (
              <>
                <a href="tel:+51987411216">
                  <span>Teléfono</span>
                </a>
                <a href="mailto:franz.moreno@comercio.com.pe">
                  <span>Email</span>
                </a>
                <a href="./local" target="_self">
                  <span>Same URL</span>
                </a>
                <a
                  href={`https://elcomerciopwa.page.link/?link=https://elcomercio.pe?appData=news/${nid}&apn=com.gec.elcomercio&amv=36&ibi=com.elcomercio.ElComercioiPhone&ipbi=com.elcomercio.ElComercioiPhone&isi=793178800&imv=34&ofl=https://elcomercio.pe&efr=1`}
                >
                  <Icon type="md-arrow-forward" style={{ fontSize: 20 }} />
                  <span>Ir a EC app</span>
                </a>
                <a
                  href={`https://pwaelcomerciodev.page.link/?link=https://elcomercio.pe?appData=news/${nid}&apn=com.gec.elcomercio&amv=36&ibi=com.elcomercio.ElComercioiPhone&ipbi=com.elcomercio.ElComercioiPhone&isi=793178800&imv=34&ofl=https://elcomercio.pe&efr=1`}
                >
                  <Icon type="md-arrow-forward" style={{ fontSize: 20 }} />
                  <span>Ir a EC DEV</span>
                </a>
                <a
                  href={`https://pwadevgestion.page.link/?link=https://gestion.pe?appData=news${url}&apn=com.eeec.gestion&&amv=33&ibi=com.eeec.Gestion&ipfl=https://gestion.pe&ipbi=com.eeec.Gestion&isi=991224096&imv=35&ofl=https://gestion.pe&efr=1`}
                >
                  <Icon type="md-arrow-forward" style={{ fontSize: 20 }} />
                  <span>Ir a G app</span>
                </a>
                <a
                  href={`https://pwagestion.page.link/?link=https://gestion.pe?appData=news${url}&apn=com.eeec.gestion&amv=33&ibi=com.eeec.Gestion&ipfl=https://gestion.pe&ipbi=com.eeec.Depor&isi=991224096&imv=35&ofl=https://gestion.pe&efr=1`}
                >
                  <Icon type="md-arrow-forward" style={{ fontSize: 20 }} />
                  <span>Ir a G app DEV</span>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
}

ERibbon.contextType = AppContext

const mapStateToProps = (state, { location }) => {
  const { followState } = location?.state || {}
  let isFollowing = false
  if (followState) {
    const { keyType, body } = followState
    isFollowing = !!state.preferences[keyType][body.slug]
  }

  return {
    config: state.configBrand,
    favorites: state.favorites,
    error: state.preferences.error,
    updatingPreferences: state.preferences.isLoading,
    isFollowing,
  }
}

export default withRouter<any, any>(connect(mapStateToProps)(ERibbon))
