/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-case-declarations */
import * as Sentry from '@sentry/browser'
import React from 'react'
import { Helmet } from 'react-helmet'
import { InView } from 'react-intersection-observer'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import './index.css'

import styles from './eNew.module.css'
import EIconType from '../eIconType'
import EVideo, { IVideo } from '../eVideo'
import ETaboola from '../eTaboola'
import { AppContext } from '../../context/app'
import EAds from '../eAds'
import ERelated from '../eRelated'
import ETopic from '../eTopic'
import NewsService from '../../services/news'
import { getQueryRelatedStories } from '../../services/querys'
import IconPremium from '../../system/button/premium'
import Icon from '../../system/icon'
import Modal from '../../system/modal'
import Notification from '../../system/notification'
import { counterNotice, counterPaywall } from '../../tools/arc'
import { getCounter, createCounter } from '../../tools/counter'
import { IS_ANDROID } from '../../tools/checkMobile'
import * as flag from '../../tools/flags'
import { addScriptAsync } from '../../tools/loadScriptAsync'
import NativeAPI from '../../tools/nativeApi'
import { parseURL } from '../../tools/push_redirect'
import {
  authorScreenAvailable,
  clearFalsyProperties,
  dateFormat,
  isPaywallActive,
  getBrand,
  getDomain,
  loadStyle,
  myNewsAvailable,
  pianoIdAvailable,
  webviewNewVersionAvailable,
} from '../../tools/tools'
import EFollow from '../eFollow'
import EBannerPremium from '../eBannerPremium'
import type { FormattedNews } from '../../services/types'
import { App } from '../../tools/config'

const ETags = Loadable({
  loader: () => import(/* webpackChunkName: "ETags" */ '../eTags'),
  loading: () => null,
})

const ModalMPP = Loadable({
  loader: () => import(/* webpackChunkName: "ModalMPP" */ '../eModalMPP'),
  loading: () => null,
})

const ModalPaywall = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ModalPaywall" */ '../eModal/paywall'),
  loading: () => null,
})

declare global {
  interface Window {
    twttr: any
    instgrm: any
    Opta: any
    opta_settings: any
  }
}

interface Props {
  category: string
  config: any
  content: any
  history: any
  location: any
  match: any
  dispatch: any
  preferences?: any
  following: boolean
  notificationsActive: boolean
}

interface State {
  content: any
  mount: boolean
  related: FormattedNews[]
  authorSubscription: boolean
}

type Author = {
  name: string
  path: string
}

const brandsWithFreeContent = ['elcomercio', 'gestion']
const BRAND = getBrand()
const DOMAIN = getDomain()
const IS_DEV = process.env.REACT_APP_ENVIRONMENT === 'development'
const PIANO_ID_AVAILABLE = pianoIdAvailable()
const PAYWALL_ACTIVE = isPaywallActive()
const RN_SCREENS_STORY = flag.RN_SCREENS_STORY
const RN_SCREENS_STORY_V2 = flag.RN_SCREENS_STORY_V2
const SCREENS_TAG_ACTIVE = ['depor', 'peru21', 'trome'].includes(BRAND)

function counterOpenStories() {
  const today = new Date()
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  lastDayOfMonth.setHours(23, 59, 59, 0)
  const action = ({ value }) => ({ value: value + 1 })
  createCounter({
    name: 'open_stories',
    expires: lastDayOfMonth.getTime(),
    fulfilled: action,
    failed: action,
  })
}

function makePhotoGallery(media: FormattedNews['media']) {
  if (!media || media.length === 0) return null
  const album = {
    count: media.length,
    photos: media.map((item, index) => ({
      order: index + 1,
      src: item.thumb,
      description: item.title
        ? `${item.title} | ${item.description}`
        : item.description,
    })),
  }

  const photo = album.photos[0]
  const placeholder = `${process.env.PUBLIC_URL}/brands/${BRAND}/placeholder.svg`

  return (
    <InView triggerOnce>
      {({ inView, ref }) => (
        <figure ref={ref}>
          <div>
            <img
              src={inView ? photo.src : placeholder}
              alt="imagen"
              className={styles.image}
              onClick={() => NativeAPI.navigate('Gallery', { album })}
            />
            {album.count > 1 && <EIconType type="galeria" />}
          </div>
          <figcaption dangerouslySetInnerHTML={{ __html: photo.description }} />
        </figure>
      )}
    </InView>
  )
}

const authorsToSubscribe = async (): Promise<string[]> => {
  try {
    const topicsEnabled = flag.RN_CONTEXT_TOPICS() && flag.WEB_PROJECT_EC_APP
    if (!topicsEnabled) return []
    const response = await fetch(
      `${process.env.REACT_APP_SUGGESTIONS_URL}/${BRAND}/notification`,
    )
    const data = await response.json()
    const authors = data
      .reduce((prevValue, value) => [...prevValue, ...value.data], [])
      .filter(item => item.id.startsWith('author.'))
      .map(item => item.id.replace('author.', ''))
    return authors
  } catch (_) {
    return []
  }
}

const service = { notifications: authorsToSubscribe() }

class ENew extends React.Component<Props, State> {
  content: any
  el: any
  enabledRNScreenPaywall: boolean
  enabledRNScreenSignwall: boolean
  noticeWrapper: React.RefObject<HTMLDivElement>
  topicsEnabled: boolean
  showFollowAuthor: boolean

  constructor(props) {
    super(props)
    console.log("🚀 ~ file: index.tsx:214 ~ ENew ~ constructor ~ props:", props)
    this.state = {
      content: props.content,
      mount: false,
      authorSubscription: false,
      related: [],
    }
    this.noticeWrapper = React.createRef<HTMLDivElement>()
    this.topicsEnabled = flag.RN_CONTEXT_TOPICS() && flag.WEB_PROJECT_EC_APP
    this.showFollowAuthor = App.select({
      gestion: process.env.REACT_APP_ENVIRONMENT !== 'development',
      default: true,
    })
    this.enabledRNScreenSignwall = App.select({
      elcomercio: flag.RN_SCREENS_AUTH_SIGNWALL() && flag.WEB_PROJECT_EC_APP,
      default: flag.RN_SCREENS_AUTH_SIGNWALL(),
    })
    this.enabledRNScreenPaywall = App.select({
      elcomercio: flag.RN_SCREENS_PAYWALL_MODAL() && flag.WEB_PROJECT_EC_APP,
      default: flag.RN_SCREENS_PAYWALL_MODAL(),
    })
  }

  componentDidMount() {
    const { paywallStatus, profile } = this.context
    const {
      config: { components, suscription = {}, name },
      location,
    } = this.props
    const { content } = this.state
    this.track()
    if (!RN_SCREENS_STORY_V2()) this.enableLinks()
    this.renderSocialNetworks()
    this.updateIframes()
    this.bbc()
    counterOpenStories()

    service.notifications.then(authors => {
      const author = content.creditos?.slug
      if (!author) return
      if (!myNewsAvailable()) return
      if (this.topicsEnabled && !authors.includes(author)) return
      this.setState({ authorSubscription: true })
    })

    if (paywallStatus || name === 'depor' || name === 'peru21') {
      this.getRelatedStories()
    }

    const premiumSignwall =
      content.restrictions === 'premium' &&
      (name === 'trome' || (name === 'depor' && PIANO_ID_AVAILABLE))

    const premiumPaywall =
      content.restrictions === 'premium' && PAYWALL_ACTIVE && !paywallStatus

    if (premiumPaywall) {
      this.openPaywallModal('premium')
      return
    }

    if (premiumSignwall && !profile?.uuid) {
      this.openSignwallModal()
      return
    }

    /* MPP Emeter */
    if (!location.search.includes('ref=notification')) {
      if (
        content.restrictions === 'free' &&
        brandsWithFreeContent.includes(name)
      ) {
        if (IS_DEV) Notification.success({ content: 'Nota libre' })
        return
      }
      if (!profile?.uuid && components.signwall) {
        counterNotice({ countRule: suscription.signwallCount || 4 }, data => {
          if (data.modal) {
            switch (data.modal) {
              case 'popupSignwall':
                this.openSignwallModal()
                break
              default:
                break
            }
          }
        })
      } else if (!paywallStatus && PAYWALL_ACTIVE) {
        const counter = getCounter('paywall')
        if (counter?.ids?.includes(content.nid)) {
          if (IS_DEV) Notification.success({ content: 'Nota freemium' })
          return
        }
        if (counter?.value >= 0) return this.openPaywallModal('hard')
        const callback = data => {
          if (data.count <= 0 && IS_DEV) {
            Notification.success({
              content: `Te quedan ${Math.abs(data.count)} notas fremium`,
            })
          }
        }
        counterPaywall(
          { countRule: suscription.paywallCount || 9, id: content.nid },
          callback,
        )
      }
    }

    // Fixed android bug when open email, phone the first time
    if (
      window.ReactNativeWebView &&
      IS_ANDROID() &&
      !sessionStorage.getItem('fixed_link_android') &&
      !webviewNewVersionAvailable()
    ) {
      window.open('about:blank')
      sessionStorage.setItem('fixed_link_android', 'true')
    }
  }

  getDate() {
    const { content } = this.state
    return dateFormat(content.fecha_publicacion, 'large')
  }

  getContentFromJSON(json = [], { section }) {
    const { config } = this.props

    return json.map((content: any, index) => {
      const { type, data } = content
      switch (type) {
        case 'html':
          if (data === '<br/>' || data === '<h2><br/></h2>') return null
          return (
            <React.Fragment key={index}>
              {index === 4 ? this.getAds(3, section.adSection) : null}
              {index === 7 ? this.getAds(4, section.adSection) : null}
              <div
                className="new-ajust type-html"
                dangerouslySetInnerHTML={{
                  __html: data.replace(/:icon:/g, ''),
                }}
              />
            </React.Fragment>
          )
        case 'custom-ec-blocks':
          return (
            <React.Fragment key={index}>
              <blockquote className="new-ajust type-html">
                <p className="pquote__title font-serif font-medium">
                  {data.title}
                </p>
                <p>
                  <span className="pquote__author font-black">{`${data.author}: `}</span>
                  <span className="pquote__author-text font-medium">
                    {data.text}
                  </span>
                </p>
                {!data.img ? null : (
                  <img
                    className="pquote__img"
                    src={data.img}
                    alt={data.author}
                  />
                )}
              </blockquote>
            </React.Fragment>
          )
        case 'despiece':
          return (
            <React.Fragment key={index}>
              <div className="despiece">
                <p className="despiece__list-title font-black">
                  {data.listTitle}
                </p>
                <p className="despiece__title font-black">{data.title}</p>
                <div
                  className="despiece__body"
                  dangerouslySetInnerHTML={{ __html: data.html }}
                />
                <InView triggerOnce>
                  {({ inView, ref }) => (
                    <img
                      ref={ref}
                      className="despiece__img"
                      src={
                        inView
                          ? data.img
                          : `${process.env.PUBLIC_URL}/brands/${config.name}/placeholder.svg`
                      }
                      alt={data.title}
                    />
                  )}
                </InView>
              </div>
            </React.Fragment>
          )
        case 'related_simple':
        case 'related':
          const related = content.related.filter(
            related => related.id !== this.state.content.nid,
          )
          if (related.length === 0) return null
          return (
            <div className="new-ajust" key={index}>
              <ERelated related={related} />
            </div>
          )
        case 'video':
          return (
            <div className="new-ajust" key={index}>
              {data.listTitle ? (
                <h2 className="link-list__title font-black">
                  {data.listTitle}
                </h2>
              ) : null}
              {this.getVideo(data)}
              {data.description && (
                <div
                  className="mediacaption"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              )}
            </div>
          )
        case 'imagen':
          return (
            <React.Fragment key={index}>
              {makePhotoGallery([data])}
              {index === 4 ? this.getAds(3, section.adSection) : null}
              {index === 7 ? this.getAds(4, section.adSection) : null}
            </React.Fragment>
          )
        case 'table':
          const { header, rows } = data
          return (
            <div className="new-ajust" key={index}>
              <table>
                <thead>
                  <tr>
                    {header.map(header => (
                      <th
                        key={header._id}
                        dangerouslySetInnerHTML={{ __html: header.content }}
                      ></th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((rowCol, index) => (
                    <tr key={index}>
                      {rowCol.map(row => (
                        <td
                          key={row._id}
                          dangerouslySetInnerHTML={{ __html: row.content }}
                        ></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        default:
          return ''
      }
    })
  }

  openSignwallModal = () => {
    const { history } = this.props
    if (this.enabledRNScreenSignwall) return NativeAPI.navigate('SignwallModal')
    if (this.noticeWrapper.current) {
      this.noticeWrapper.current.style.overflowY = 'hidden'
    }
    Modal.open({
      content: elm => (
        <ModalMPP myRef={elm} context={this.context} history={history} />
      ),
      myClass: 'is-modal-bottom is-modal-swh',
      animation: 'bottomFade',
      disableBack: true,
    })
  }

  openPaywallModal = (gaCategory: 'hard' | 'premium') => {
    const { history } = this.props
    const { content } = this.state
    if (this.enabledRNScreenPaywall) {
      const title = App.select({
        elcomercio:
          gaCategory === 'premium'
            ? 'Este es un contenido exclusivo para suscriptor.\n¡SUSCRÍBETE!'
            : 'Has llegado al límite de tus artículos gratis. Suscríbete para seguir leyendo',
        gestion:
          gaCategory === 'premium'
            ? 'Para acceder a este contenido exclusivo, necesitas tu'
            : 'Has alcanzado el límite de noticias, necesitas tu',
      })
      return NativeAPI.navigate('PaywallModal', { title })
    }
    if (this.noticeWrapper.current)
      this.noticeWrapper.current.style.overflowY = 'hidden'
    Modal.open({
      content: elm => (
        <ModalPaywall
          myRef={elm}
          context={this.context}
          history={history}
          gaCategory={gaCategory}
          noticePath={content.url}
        />
      ),
      myClass: 'is-modal-bottom is-modal-swh',
      animation: 'bottomFade',
      disableBack: true,
    })
  }

  getAds = (position, adSection) => {
    const { paywallStatus } = this.context

    if (paywallStatus) return null
    return (
      <EAds
        id={`ads_m_movil${position}`}
        sizes={[
          [300, 250],
          [320, 100],
          [300, 100],
        ]}
        position={`caja${position}`}
        section={adSection}
        template="post"
      />
    )
  }

  enableLinks() {
    const links: HTMLAnchorElement[] = this.el.querySelectorAll('a')
    links.forEach(element => {
      const { status, url } = parseURL(element.getAttribute('href'))
      if (!status) return element.setAttribute('target', '_blank')
      const listener = (event: MouseEvent) => {
        event.preventDefault()
        if (!url) return
        const isTag = url.startsWith('/noticias/')

        if (isTag) {
          const tag = url.replace(/^\/noticias\//, '').replace(/\//g, '')
          if (!SCREENS_TAG_ACTIVE) {
            this.props.history.push(`/tags/${tag}?source=post_content-link`)
            return
          }
          NativeAPI.navigate('Tag', {
            path: tag,
          })
          return
        }

        if (!RN_SCREENS_STORY()) {
          this.props.history.push(`/news${url}?source=post_content-link`)
          return
        }

        NativeAPI.navigate('Story', { pathname: url })
      }
      element.addEventListener('click', listener, false)
      element.removeAttribute('target')
    })
  }

  updateIframes() {
    const regExp = /https?:\/\/(www.)?youtube.com|facebook.com|ooyala-embed.html/i
    const iframes: any[] = Array.from(
      this.el.querySelectorAll('iframe'),
    ).filter((iframe: any) => regExp.test(iframe.src))
    iframes.forEach(iframe => {
      const ifr: HTMLIFrameElement = iframe
      const parent: HTMLElement | null = ifr.parentElement
      const width = Math.min(ifr.offsetWidth, Number(parent?.clientWidth))
      if (ifr.src.includes('www.facebook.com')) {
        ifr.style.maxWidth = `${ifr.width}px`
        parent!.style.textAlign = 'center'
        const widthFb = Math.min(width, Number(ifr.width))
        ifr.height = `${widthFb / (Number(ifr.width) / Number(ifr.height))}px`
        return
      }
      ifr.width = `${width}px`
      ifr.height = `${width / (16 / 9)}px`
    })
  }

  track() {
    const {
      content: { titulo, url, nid },
    } = this.state
    window.dataLayer?.push({ event: 'pageView', url, titulo, idnota: nid })
  }

  getVideo(data) {
    const { config } = this.props
    const { paywallStatus } = this.context
    const id = data.stream ? config.powa.prod.uuid : data.id
    type ParamsOmit = 'id' | 'provider' | 'thumb'
    const powaProps: Omit<IVideo.PoWa, ParamsOmit> = {
      brand: config.powa.brand,
      stream: data.stream?.url,
      preload: data.preload,
    }
    const jwplayerProps: Omit<IVideo.JWPlayer, ParamsOmit> = {
      playerId: config.jwplayers[data.account],
      hasAds: !paywallStatus ? data.has_ads : false,
    }

    return (
      <EVideo
        id={id}
        provider={data.provider}
        thumb={data.thumb}
        {...jwplayerProps}
        {...powaProps}
      />
    )
  }

  multimedia(content) {
    const { media, tipo } = content

    switch (tipo) {
      case 'video':
        return (
          <figure>
            {this.getVideo(media.data)}
            <figcaption>
              {media.data.description?.replace(/(<([^>]+)>)/gi, '')}
            </figcaption>
          </figure>
        )
      case 'infografia':
        return (
          <figure>
            <div
              className="widget infographics"
              dangerouslySetInnerHTML={{ __html: media.embed }}
            />
            <figcaption>{media.description}</figcaption>
          </figure>
        )
      default:
        return makePhotoGallery(content.media)
    }
  }

  bbc() {
    const {
      content: { tags },
      category,
    } = this.props
    tags.forEach(
      tag =>
        tag.code === 'bbc' &&
        (() => {
          window.category = category
          import('../../tools/bbc').then(module => module.enable())
        })(),
    )
  }

  renderSocialNetworks() {
    const { content } = this.props
    // Load Twitter
    if (
      content &&
      content.contenido.includes('platform.twitter.com/widgets.js')
    ) {
      if (window.twttr && window.twttr.widgets.load) {
        window.twttr.widgets.load()
      } else {
        addScriptAsync({
          name: 'Twitter',
          url: 'https://platform.twitter.com/widgets.js',
        })
      }
    }

    // Load Instagram
    if (content && content.contenido.includes('www.instagram.com/embed.js')) {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process()
      } else {
        addScriptAsync({
          name: 'Instagram',
          url: 'https://platform.instagram.com/en_US/embeds.js',
        })
      }
    }

    // Load Opta
    if (content && content.contenido.includes('opta-widget')) {
      if (window.Opta) {
        window.Opta.start()
      } else {
        loadStyle(
          'https://secure.widget.cloud.opta.net/v3/css/v3.football.opta-widgets.css',
        )
        window.opta_settings = {
          subscription_id: '782834e1fd5a215304e57cddad80b844',
          language: 'es_CO',
          timezone: 'America/Lima',
          load_when_visible: false,
        }
        addScriptAsync({
          name: 'Opta',
          url: 'https://secure.widget.cloud.opta.net/v3/v3.opta-widgets.js',
        })
      }
    }

    /* if (!window.mxmLoaded) {
      loadScript(
        'https://w.ecodigital.pe/components/elcomercio/mxm/mxm.bundle.js?v=1.7',
        () => {
          window.mxmLoaded = true;
        }
      );
    } */
  }

  navigateToAuthor(e: React.SyntheticEvent, author: Author) {
    const newsAvailable = myNewsAvailable()
    if (!newsAvailable || RN_SCREENS_STORY()) {
      e.preventDefault()
      const nativeSupport = authorScreenAvailable()
      if (nativeSupport) {
        NativeAPI.navigate('Author', {
          path: author.path,
          name: author.name,
        })
        return
      }
      return
    }
  }

  renderCredits(): JSX.Element | null {
    const { creditos } = this.props.content
    const author: Author = { name: creditos?.name, path: creditos?.slug }

    if (creditos?.slug) {
      const children = <strong className="author-name">{creditos?.name}</strong>
      return (
        <React.Fragment>
          {RN_SCREENS_STORY_V2() ? (
            <a
              href={`https://${DOMAIN}/autor/${creditos.slug}/`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {children}
            </a>
          ) : (
            <Link
              onClick={e => this.navigateToAuthor(e, author)}
              to={{
                pathname: `/authors/${creditos.slug}`,
                state: {
                  followState: {
                    keyType: 'authors',
                    body: {
                      _id: creditos.slug,
                      slug: creditos.slug,
                      image: creditos.image,
                      name: creditos.name,
                    },
                  },
                },
              }}
            >
              {children}
            </Link>
          )}
          <a
            href={`mailto:${creditos?.additional_properties?.original?.email}`}
          >
            <span className="author-email">
              {creditos?.additional_properties?.original?.email}
            </span>
          </a>
        </React.Fragment>
      )
    }
    return null
  }

  renderNotificationText(): JSX.Element | null {
    const { preferences, following: followingAuthor } = this.props
    const { creditos, tags: contentTags } = this.state.content
    const matchedTag = contentTags.filter(
      ({ slug }) => !!preferences.tags[slug],
    )[0]

    const matchedPreference = followingAuthor
      ? preferences.authors[creditos?.slug]
      : preferences.tags[matchedTag?.slug]

    if (!matchedPreference) return null

    return (
      <div className="eNew notification-text">
        <span>
          Nota de interés porque sigues
          {followingAuthor ? ' a ' : ' al tema '}
        </span>
        <Link
          to={{
            pathname: followingAuthor
              ? `/authors/${matchedPreference.slug}`
              : `/tags/${matchedPreference.slug}`,
            state: {
              title: matchedPreference.name,
              followState: {
                keyType: followingAuthor ? 'authors' : 'tags',
                body: clearFalsyProperties({
                  _id: matchedPreference.slug,
                  slug: matchedPreference.slug,
                  name: matchedPreference.name,
                  image: matchedPreference.image,
                }),
              },
            },
          }}
        >
          {matchedPreference.name}
        </Link>
      </div>
    )
  }

  async getRelatedStories() {
    try {
      const { config } = this.props
      const { nid, seccion, tags } = this.state.content
      const slugs = tags.slice(0, 4).map(tag => tag.slug)
      const params = {
        query: getQueryRelatedStories(slugs, seccion.url),
        website: config.name,
        from: 0,
        size: 6,
        sort: 'last_updated_date:desc',
      }
      const service = new NewsService()
      const { content: data } = await service.content(params)
      this.setState({ related: data.filter(story => story.nid !== nid) })
    } catch (err) {
      Sentry.captureException(err)
    }
  }

  render() {
    const {
      content,
      content: {
        audio,
        bajada,
        contenido,
        contenido_json,
        creditos,
        media,
        promo_items: { omnystudio_url },
        restrictions,
        seccion,
        seccion_padre,
        tags,
        tipo,
        titulo,
        url,
      },
      related,
      authorSubscription,
    } = this.state

    const { paywallStatus, profile } = this.context
    const fromNotification = !!this.props.location.search?.includes(
      'ref=notification',
    )
    const {
      config: { name, third, marketing },
      match,
    } = this.props

    return (
      <div
        ref={this.noticeWrapper}
        className="wrap-view-new safe-area-with-ribbon pt-48"
      >
        <Helmet>
          <meta property="article:section" content={seccion_padre.code} />
          <meta property="article:subsection" content={seccion.code} />
          <meta property="article:type" content={tipo} />
          <link id="link-canonical" rel="canonical" href={url} />
          {name === 'trome' && marketing.secondaryFont && (
            <link href={marketing.secondaryFont} rel="stylesheet" />
          )}
          <title>{titulo}</title>
        </Helmet>
        <article
          className="eNew safe-area-inset-bottom"
          ref={el => (this.el = el)}
        >
          <div className="bbc-tag new-ajust" />
          {fromNotification && profile?.uuid
            ? this.renderNotificationText()
            : null}
          <header className="new-ajust ">
            {name !== 'gestion' ? (
              <IconPremium restrictions={restrictions} />
            ) : null}
            <h1 className="font-serif font-black">{titulo}</h1>
          {/*   {paywallStatus ? null : (
              <EAds
                id="ads_m_movil1"
                sizes={[
                  [320, 100],
                  [300, 100],
                  [320, 50],
                  [300, 50],
                ]}
                position="caja1"
                section={seccion.adSection}
                template="post"
              />
            )} */}
            {bajada && (
              <p
                className="new-extract"
                dangerouslySetInnerHTML={{ __html: bajada }}
              />
            )}
          </header>
          {media && (
            <div className="wrap-multimedia">{this.multimedia(content)}</div>
          )}
          {audio ? (
            <div className="new-ajust">
              <audio controls src={audio} />
            </div>
          ) : null}
          {paywallStatus ? null : (
            <EAds
              id="ads_m_movil2"
              sizes={[
                [300, 250],
                [320, 100],
                [300, 100],
              ]}
              position="caja2"
              section={seccion.adSection}
              template="post"
            />
          )}
          {omnystudio_url ? (
            <iframe
              className="new-ajust"
              height="150"
              src={`${omnystudio_url.content}/embed`}
              width="100%"
            />
          ) : null}
          <div className="author new-ajust">
            <div className="author-box">
              <div className="author-info">{this.renderCredits()}</div>
              {this.showFollowAuthor &&
              authorSubscription &&
              !this.topicsEnabled ? (
                <EFollow
                  followButton
                  notificationButton
                  entity={{
                    ...creditos,
                    _id: creditos.slug,
                    keyType: 'authors',
                  }}
                />
              ) : null}
            </div>
            <span>{this.getDate()}</span>
          </div>
          {this.showFollowAuthor && authorSubscription && this.topicsEnabled ? (
            <div className="new-ajust subscription-topic__author">
              <ETopic topic={`author.${creditos.slug}`}>
                {isSubscribed => {
                  if (isSubscribed)
                    return (
                      <p>
                        <Icon type="bell_filled" /> Siguiendo a este autor
                      </p>
                    )
                  return (
                    <p>
                      <Icon type="bell_outline" /> Seguir este autor
                    </p>
                  )
                }}
              </ETopic>
            </div>
          ) : null}
          <div
            className={`content-news ${!contenido_json ? 'new-ajust' : ''}`}
            ref={ref => (this.content = ref)}
          >
            {contenido_json ? (
              this.getContentFromJSON(contenido_json, {
                section: seccion_padre,
              })
            ) : (
              <div dangerouslySetInnerHTML={{ __html: contenido }} />
            )}
          </div>
          <div className="bbc-tag new-ajust" />
          {paywallStatus ? null : (
            <EAds
              id="ads_m_movil5"
              sizes={[
                [300, 250],
                [320, 100],
                [300, 100],
              ]}
              position="caja5"
              section={seccion.adSection}
              template="post"
            />
          )}
          {PAYWALL_ACTIVE && !paywallStatus ? (
            <EBannerPremium position={5} />
          ) : null}
          {tags?.length > 0 ? (
            <div className="new-ajust">
              <h3>Tags relacionados</h3>
              <ETags tags={tags} />
            </div>
          ) : null}
          {!paywallStatus ? (
            <ETaboola {...third.taboola} brand={name} path={match.url} />
          ) : null}
          {related.length > 0 ? (
            <div className="new-ajust">
              <h3>Notas relacionadas</h3>
              <ERelated className="e-new__related-stories" related={related} />
            </div>
          ) : null}
          {paywallStatus ? null : (
            <EAds
              className="ad-sticky"
              id="ads_m_movil6"
              sizes={[
                [320, 50],
                [300, 50],
              ]}
              position="zocalo"
              section={seccion.adSection}
              template="post"
            />
          )}
        </article>
      </div>
    )
  }
}

ENew.contextType = AppContext

const mapStateToProps = (state, { content }) => {
  const config = state.configBrand
  const { preferences } = state

  const authorId = content.creditos?.slug || '_'

  const author = preferences.authors[authorId]
  const following = !!author

  const notificationsActive =
    author?.notifications === 'enabled' || author?.notifications === undefined

  return {
    config,
    preferences,
    following,
    notificationsActive,
  }
}

export default withRouter(connect(mapStateToProps)(ENew))
