import classNames from 'classnames'
import dateformat from 'dateformat'
import React, { useContext } from 'react'
import { InView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './eCard.css'

import { Props } from './types'
import { AppContext } from '../../context/app'
import EtimeAgo from '../eTimeago'
import EIconType from '../eIconType'
import { toogleFavorite } from '../../store/favorites/actions'
import { RootState } from '../../store/reducers'
import IconPremium from '../../system/button/premium'
import Icon from '../../system/icon'
import IconGroup from '../../system/icon/icon-group'
import IconWrapper from '../../system/icon/icon-wrapper'
import { RN_SCREENS_STORY, RN_SCREENS_STORY_V2 } from '../../tools/flags'
import NativeAPI from '../../tools/nativeApi'
import Share from '../../tools/share'
import { contentLight, getDomain } from '../../tools/tools'

const DOMAIN = getDomain()
const ONE_DAY = 1000 * 60 * 60 * 24

function getMediaSrc(tipo, media) {
  if (media === null || (Array.isArray(media) && media.length === 0)) {
    return ''
  }
  const validTypes = ['image', 'imagen_completa', 'foto_galeria', 'galeria']
  if (validTypes.includes(tipo)) {
    const { thumb = '' } = Array.isArray(media) ? media[0] : media.data
    return thumb
  } else if (['infografia', 'video'].includes(tipo)) {
    const { thumb = '' } = Array.isArray(media) ? media[0].data : media.data
    return thumb
  }
  return ''
}

const ECard: React.FC<Props> = React.memo(
  ({
    category,
    content,
    content: {
      bajada,
      creditos,
      fecha_publicacion,
      nid,
      restrictions,
      seccion,
      tiempo_lectura,
      media: cMedia,
      tipo,
      titulo,
    },
    author,
    description,
    header,
    routePath,
    share,
    footer,
    media,
    timeRead,
    type,
    config,
    isFavorite,
  }) => {
    const context = useContext(AppContext)

    const dispatch = useDispatch()

    function clickFavorite() {
      dispatch(toogleFavorite(contentLight(content)))
    }

    function handleShare() {
      const url = `https://${config.marketing?.domain}${content.url}`
      Share.share(url)
    }

    function handleCardOpening(event: React.SyntheticEvent) {
      if (RN_SCREENS_STORY_V2()) {
        event.preventDefault()
        const pathname = routePath?.split('?')[0]
        window.open(`https://${DOMAIN}${pathname}`, '_blank')
        return
      }

      if (RN_SCREENS_STORY()) {
        event.preventDefault()
        const pathname = routePath?.split('?')[0]
        NativeAPI.navigate('Story', { id: nid, pathname })
        return
      }
    }

    function handleSectionOpening() {
      const path = seccion.url.replace(/^\//, '').replace(/\//g, '?')
      NativeAPI.navigate('News', { section: { name: seccion.nombre, path } })
    }

    const hasMedia = !(
      cMedia === null ||
      (Array.isArray(cMedia) && cMedia.length === 0)
    )
    const mediaSrc = getMediaSrc(tipo, cMedia)
    const date = Date.now() - new Date(fecha_publicacion).getTime()

    const classes = classNames('e-card', {
      [`e-card--${type}`]: type,
    })

    const cat = routePath?.split('/')[1]
    const findCategory =
      cat === 'news' || context.categories.find(c => c.key === cat)

    return (
      <article className={classes}>
        <div className="e-card__flag-premium">
          {header !== false && !!seccion?.nombre ? (
            <header className="e-card__header font-semibold">
              <button onClick={handleSectionOpening}>{seccion.nombre}</button>
            </header>
          ) : null}
          {config.name === 'trome' ? (
            <IconPremium restrictions={restrictions} />
          ) : null}
        </div>
        <Link
          to={{
            pathname: findCategory ? routePath : `/news${routePath}`,
            state: { section: category, fromPage: true, url: content.url },
          }}
          onClick={handleCardOpening}
        >
          <div className="e-card__body">
            {media && hasMedia && mediaSrc && (
              <div className="e-card__image__wrapper">
                <figure className="e-card__image">
                  <InView triggerOnce>
                    {({ inView, ref }) => (
                      <img
                        ref={ref}
                        decoding="async"
                        src={
                          inView
                            ? mediaSrc
                            : `${process.env.PUBLIC_URL}/brands/${
                                config.name
                              }/${
                                config.name !== 'trome'
                                  ? 'placeholder.svg'
                                  : 'placeholder.png'
                              }`
                        }
                        alt={titulo}
                      />
                    )}
                  </InView>
                  {(tipo === 'video' ||
                    tipo === 'foto_galeria' ||
                    tipo === 'galeria') && <EIconType type={tipo} />}
                </figure>
              </div>
            )}
            <h2 className="e-card__title font-serif text-base font-black">
              {titulo}
            </h2>
          </div>
          {description && bajada && (
            <div
              className="e-card__subtitle font-serif text-sm font-medium"
              dangerouslySetInnerHTML={{
                __html: bajada,
              }}
            />
          )}
        </Link>
        <div className="e-card__author">
          {author && creditos?.name ? (
            <div className="mt-2">
              <h4 className="text-sm font-medium">{creditos.name}</h4>
            </div>
          ) : null}
          {config.name !== 'elcomercio' ? null : (
            <IconPremium restrictions={restrictions} />
          )}
        </div>
        {footer || author || timeRead || share ? (
          <footer className="e-card__footer mt-2">
            <div className="text-xs">
              {date < ONE_DAY ? (
                <EtimeAgo date={fecha_publicacion} />
              ) : (
                dateformat(fecha_publicacion, 'dd.mm.yyyy')
              )}
              {timeRead && tiempo_lectura ? ` ∙ ${tiempo_lectura}` : null}
              {config.name === 'gestion' && restrictions === 'premium' ? (
                <>
                  {' ∙ '}
                  <IconPremium restrictions={restrictions} />
                </>
              ) : null}
            </div>
            <IconGroup>
              <button type="button" onClick={clickFavorite}>
                <IconWrapper size="medium">
                  <Icon
                    type="md-bookmark"
                    style={{ fontSize: 20 }}
                    className={isFavorite ? 'marked' : ''}
                  />
                </IconWrapper>
              </button>
              {share && (
                <button type="button" onClick={handleShare}>
                  <IconWrapper size="medium">
                    <Icon type="md-share" style={{ fontSize: 20 }} />
                  </IconWrapper>
                </button>
              )}
            </IconGroup>
          </footer>
        ) : null}
        {config.name === 'depor' ? (
          <IconPremium restrictions={restrictions} />
        ) : null}
      </article>
    )
  },
  isEqual,
)

function isEqual(prevProps: Props, nextProps: Props) {
  return prevProps.isFavorite === nextProps.isFavorite
}

const ECardWrapper = props => {
  const { config, favorites } = useSelector((state: RootState) => ({
    config: state.configBrand,
    favorites: state.favorites,
  }))

  const isFavorite = favorites.setIds.has(props.content.nid)
  return <ECard {...props} config={config} isFavorite={isFavorite} />
}

export default ECardWrapper
