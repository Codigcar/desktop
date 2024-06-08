// eslint-disable react/no-multi-comp
import classNames from 'classnames'
import React from 'react'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ViewableMonitor from '../../components/eViewableMonitor'
import './tv.css'

import EProgramCarousel from './eProgramCarousel'
import EVideoPlayer from './eVideoPlayer'
import { LoadPage } from '../../components/ePlaceHolder'
import { AppContext } from '../../context/app'
import NewsService from '../../services/news'
import { getQueryTvProgram } from '../../services/querys'
import Header from '../../system/header'
import Icon from '../../system/icon'
import Modal from '../../system/modal'

const Notice = Loadable({
  loader: () => import(/* webpackChunkName: "Notice" */ '../notice'),
  loading: () => <LoadPage />,
})

const Program = Loadable({
  loader: () => import(/* webpackChunkName: "Program" */ './eProgram'),
  loading: () => <LoadPage />,
})

const getMediaSrc = episode => {
  const { tipo, media } = episode

  if (media === null || (Array.isArray(media) && media.length === 0)) {
    return ''
  }

  let src = ''
  switch (tipo) {
    case 'video':
      if (Array.isArray(media)) {
        src = media[0].data.thumb || ''
      } else {
        src = media.data.thumb || ''
      }
      break
    default:
      break
  }

  return src
}

const PortraitTv = ({ content, showVideo, brand }) => {
  return (
    <div className="perutv__portada">
      <div className="perutv__portada-video">
        <figure>
          <button
            type="button"
            onClick={() => {
              if (!content) {
                return
              }
              showVideo(content)
            }}
          >
            <img
              alt="Perú21 TV"
              src={
                content
                  ? getMediaSrc(content)
                  : `${process.env.PUBLIC_URL}/brands/${brand}/placeholder.svg`
              }
            />
          </button>
          <figcaption className="icon-type">
            <Icon type="md-play" style={{ fontSize: 15, color: '#FFF' }} />
          </figcaption>
        </figure>
      </div>
      <div className="perutv__portada-text">
        {content ? (
          <React.Fragment>
            <div className="perutv__description">
              <h5>{content.titulo}</h5>
              {/* <p>{content[0].episode[0].description}</p> */}
            </div>
          </React.Fragment>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Icon type="loading" style={{ fontSize: 24 }} />
          </div>
        )}
      </div>
    </div>
  )
}

interface Props {
  config: any
  location: any
  match: any
}

interface State {
  portrait: any
}
interface Episode {
  promo_items?: any
}

class TvPeru extends React.PureComponent<Props, State> {
  tvconfig: any
  constructor(props) {
    super(props)
    const [TVPAGE] = props.config.pages.filter(p => p.component === 'tv')
    this.tvconfig = TVPAGE
    this.state = {
      portrait: null,
    }
  }

  componentDidMount() {
    const { config } = this.props
    const path = this.tvconfig.path.substring(1)
    const params = {
      query: getQueryTvProgram(path),
      website: config.name,
      from: 0,
      size: 1,
      sort: 'last_updated_date:desc',
    }
    const newService = new NewsService()
    const fetchContent = newService.content(params)
    fetchContent
      .then(({ content }) => {
        const [notice] = content
        this.setState({
          portrait: notice,
        })
      })
      .catch(err => {
        console.error(err)
      })
    Program.preload()
  }

  showVideo = (episode: Episode = {}) => {
    const { config } = this.props
    const { paywallStatus } = this.context

    const basic_jwplayer = episode?.promo_items?.basic_jwplayer
    const has_ads = basic_jwplayer?.embed?.config?.has_ads

    if (has_ads && paywallStatus) {
      episode.promo_items.basic_jwplayer.embed.config.has_ads = 0
    }

    Modal.open({
      content: elm => <EVideoPlayer {...episode} config={config} myRef={elm} />,
      myClass: 'is-modal-center is-video-player',
      animation: 'modalBack',
      disableBack: true,
    })
  }

  getLogo = () => {
    const { nightMode } = this.context
    const { config } = this.props
    let src = `/brands/${config.name}/logo.svg`
    if (config.name === 'gestion' && nightMode) {
      src = `/brands/${config.name}/logo_night.svg`
    }
    return src
  }

  render() {
    const { portrait } = this.state
    const { config, location, match } = this.props
    const classes = classNames('tv-view page-view', {
      'night-mode': config.name === 'peru21',
    })
    return (
      <div className={classes}>
        <div className="tv-view-wrapper h-full overflow-y-auto overflow-scrolling-touch">
          <Header align="center" theme="primary">
            <div>
              <Link className="logotipo" to="/">
                <img src={this.getLogo()} alt="logotipo" />
              </Link>
            </div>
          </Header>
          <PortraitTv
            content={portrait}
            showVideo={this.showVideo}
            brand={config.name}
          />
          <div className="perutv__programs-wrapper">
            {this.tvconfig.programs.map(program => (
              <ViewableMonitor
                key={program.path}
                rootMargin="0px 0px 50px 0px"
                disabled
              >
                {isViewable =>
                  isViewable ? (
                    <EProgramCarousel
                      path={program.path}
                      pathParent={this.tvconfig.path}
                      title={program.title}
                      showVideo={this.showVideo}
                    />
                  ) : (
                    <div
                      style={{
                        textAlign: 'center',
                        height: '300px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                  )
                }
              </ViewableMonitor>
            ))}
          </div>
        </div>
        <TransitionGroup className="transition-group-portrait">
          <CSSTransition
            key={match.isExact}
            timeout={{ enter: 300, exit: 300 }}
            classNames="fade"
          >
            <section>
              <Switch location={location}>
                {this.tvconfig.programs.map(program => (
                  <Route
                    key={program.path}
                    exact
                    path={`${match.path}/${program.path}`}
                    component={Program}
                  />
                ))}
                <Route path={`${match.path}/:id`} component={Notice} />
              </Switch>
            </section>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

TvPeru.contextType = AppContext

const mapStateToProps = state => ({
  config: state.configBrand,
  tvState: state.tvState,
})

export default connect(mapStateToProps)(TvPeru)
