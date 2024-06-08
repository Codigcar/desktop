import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import './gdpr.css'

import { Collapse } from '../eAccordion/accordion'
import { getBrand } from '../../tools/tools'

interface Props {
  location: {
    key: string
    pathname: string
  }
}

interface State {
  active: boolean
}

const BRAND = getBrand()
const URL = {
  depor: 'https://depor.com/politicas-cookies/',
  elcomercio: 'https://elcomercio.pe/politica-de-cookies/',
  gestion: 'https://gestion.pe/politica-de-cookies/',
  peru21: 'https://peru21.pe/politicas-de-cookies/',
  trome: 'https://trome.pe/politica-de-cookies/',
}

class EGDPR extends React.PureComponent<Props, State> {
  state = {
    active: false,
  }

  closeGDPR = () => {
    this.setState({
      active: false,
    })
    window.localStorage.setItem('cookies_politics', 'accepted')
  }

  componentDidMount() {
    if (!window.localStorage.getItem('cookies_politics')) {
      this.setState({
        active: true,
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props
    if (
      prevProps.location.key !== location.key &&
      !this.state.active &&
      window.localStorage.getItem('cookies_politics') !== 'accepted'
    ) {
      this.setState({
        active: true,
      })
    }
  }

  render() {
    const { active } = this.state
    const classes = classNames('gdpr-content', {
      'gdpr-active': active,
    })

    return (
      <div className="gdpr">
        <div className={classes}>
          <div className="banner">
            <div className="gdpr-text">
              <h2 className="banner__title">Uso de cookies</h2>
              <p>
                Grupo El Comercio gestiona este sitio web y utiliza cookies y
                tecnologías similares (en adelante "Cookies") propias y de
                terceros. Acepte las condiciones para continuar navegando en
                nuestro sitio web sin restricción alguna; de lo contrario,
                algunas funciones podrían no estar disponibles.
              </p>
              <div className="accordion">
                <Collapse header="Información que puede ser usada">
                  <ul>
                    <li>Tipo de navegador y su configuración.</li>
                    <li>
                      Información sobre el sistema operativo del dispositivo.
                    </li>
                    <li>Información sobre las cookies.</li>
                    <li>
                      Información sobre otros identificadores asignados al
                      dispositivo.
                    </li>
                    <li>
                      Dirección IP desde la cual el dispositivo accede al sitio
                      web o aplicación móvil.
                    </li>
                    <li>
                      Información sobre la actividad del usuario en ese
                      dispositivo, incluidas las páginas web y las aplicaciones
                      móviles visitadas o utilizadas.
                    </li>
                    <li>
                      Información sobre la ubicación geográfica del dispositivo
                      cuando accede a un sitio web o aplicación móvil.
                    </li>
                  </ul>
                </Collapse>
                <Collapse header="Propósitos para almacenar información">
                  <ul>
                    <li>Almacenamiento y acceso a la información</li>
                    <li>Selección de anuncios y entrega</li>
                    <li>Selección de contenido y entrega</li>
                    <li>Personalización de funcionalidades</li>
                    <li>Análisis de métricas</li>
                  </ul>
                </Collapse>
              </div>
            </div>
            <div className="buttons">
              <Link
                to="/politics"
                onClick={event => {
                  event.preventDefault()
                  window.open(URL[BRAND], '_blank')
                }}
              >
                Leer más
              </Link>
              <button type="button" onClick={this.closeGDPR}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EGDPR
