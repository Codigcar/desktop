import { UserIdentity } from '@arc-publishing/sdk-identity/lib/sdk/userIdentity'
import * as Sentry from '@sentry/browser'
import Identity from '@arc-publishing/sdk-identity'

import { IS_MOBILE } from './checkMobile'
import { createCounter } from './counter'
import { logErrors } from './errors'
import { getDomain } from './tools'

export const getPromise = (url, method, headers, body?: {}) =>
  new Promise((resolve, reject) => {
    const options = {
      method,
      headers,
    }
    if (body) {
      options['body'] = JSON.stringify(body)
    }
    let error = false
    return fetch(url, options)
      .then(res => {
        if (!res.ok) {
          error = true
        }
        return res.json()
      })
      .then(data => {
        if (error) {
          return reject(data)
        }
        return resolve(data)
      })
      .catch(err => reject(err))
  })
/**
 * Solicitud a la api de Arc Identity para iniciar sesión con un Proveedor.
 * @param {string} token - token recibido por la empresa proveedora de iniciar sesión
 * @param {string} provider - nombre del proveedor
 * @return {promise} - promesa de la solicitud que completada será un objecto con el identity
 */
export const getToken = (token, provider) => {
  const domain = getDomain()
  if (!process.env.REACT_APP_API_ORIGIN) throw new Error('API ORIGIN missing')
  let apiOrigin = `${process.env.REACT_APP_API_ORIGIN}${domain}`
  if (
    domain === 'depor.com' &&
    process.env.REACT_APP_ENVIRONMENT !== 'production'
  ) {
    apiOrigin = 'https://api-elcomercio-depor-sandbox.cdn.arcpublishing.com'
  }
  return getPromise(
    `${apiOrigin}/identity/public/v1/auth/token`,
    'POST',
    { 'Content-Type': 'application/json' },
    {
      credentials: token,
      grantType: provider,
      userName: '',
    },
  ) as Promise<UserIdentity>
}

const methods = {
  email: '1',
  facebook: '2',
  google: '5',
}

export const getProfileUpdate = (profile, method, fromSWH?, dataTreatment?) => {
  // const domain = getDomain();
  const update = {
    displayName: profile.email,
    email: profile.email,
    attributes: [
      {
        name: 'originMethod',
        value: methods[method],
        type: 'String',
      },
      {
        name: 'originDevice',
        value: IS_MOBILE() ? 'movil' : 'desktop',
        type: 'String',
      },
      {
        name: 'originDomain',
        value: window.location.hostname,
        type: 'String',
      },
      {
        name: 'originReferer',
        value: window.location.href,
        type: 'String',
      },
      {
        name: 'originAction',
        value: fromSWH ? '1' : '0',
        type: 'String',
      },
      {
        name: 'termsCondPrivaPoli',
        value: '1',
        type: 'String',
      },
      {
        name: 'dataTreatment',
        value: dataTreatment ? '1' : '0',
        type: 'String',
      },
    ],
  }
  return update
}

export const counterNotice = ({ countRule }, callback) => {
  const today = new Date()
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  lastDayOfMonth.setHours(23, 59, 59, 0)
  // today.setMinutes(today.getMinutes() + 1);
  createCounter({
    name: 'signwall',
    initialValue: countRule * -1,
    expires: lastDayOfMonth.getTime(),
    fulfilled: () => ({ value: (countRule - 1) * -1 }),
    failed: ({ value }) => ({ value: value + 1 }),
  })
    .then(({ value }) => {
      if (value >= 1) {
        return callback({
          modal: 'popupSignwall',
        })
      }
      return callback({})
    })
    .catch(() => callback({}))
}

export const counterPaywall = ({ countRule, id }, callback) => {
  const today = new Date()
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  lastDayOfMonth.setHours(23, 59, 59, 0)
  createCounter({
    name: 'paywall',
    initialValue: countRule * -1,
    expires: lastDayOfMonth.getTime(),
    fulfilled: () => ({
      value: (countRule - 1) * -1,
      ids: [],
    }),
    failed: ({ value, ids = [] }) => {
      if (ids.some(i => i === id)) {
        return {
          value,
          ids,
        }
      }
      return {
        value: value + 1,
        ids: value < 0 ? [...ids, id] : ids,
      }
    },
  })
    .then(({ value, ids = [] }) => {
      if (value >= 1 && !ids.some(i => i === id)) {
        return callback({
          modal: 'popupPaywall',
        })
      }
      return callback({ count: value })
    })
    .catch(() => callback({}))
}

export const verifyCredential = (email, password, action = '0') => {
  const site = window.location.hostname.split('.')[1]
  const domain = getDomain()
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      action,
      device: IS_MOBILE() ? 'movil' : 'desktop',
      domain,
      referer: window.location.hostname,
      site,
    }),
  }
  if (!process.env.REACT_APP_ECOID) throw new Error('ECOID env missing')
  const url = `${process.env.REACT_APP_ECOID}/api/v2/verify_credentials`
  return fetch(url, options)
    .then(res => res.json())
    .then(data => data)
    .catch(err => {
      logErrors(err, 'arc.js')
      const error = new Error('[ECOID] Error en el servicio verify_credentials')
      Sentry.captureException(error)
      throw error
    })
}

async function getSuscription() {
  const domain = getDomain()
  await Identity.extendSession()
  return fetch(
    `${process.env.REACT_APP_API_ORIGIN}${domain}/sales/public/v1/entitlements`,
    {
      method: 'GET',
      headers: {
        Authorization: Identity.userIdentity.accessToken || '',
      },
    },
  )
}

export async function isSubscribed() {
  let err
  try {
    const res = await getSuscription()
    const { ok: status } = res
    const data = await res.json()
    if (!status) {
      err = data
      throw data
    }
    const { skus = [] } = data
    if (skus.length > 0) {
      return true
    }
    return false
  } catch (error) {
    if (err) {
      throw err
    }
    logErrors(error)
    throw new Error(`[ARC] ${error}`)
  }
}

const urls = {
  elcomercio: {
    loginMessage:
      'Inicia sesión y sigue informado con las noticias más relevantes',
    registerMessage:
      'Regístrate gratis y sigue informado con las noticias más relevantes',
    terminos: 'https://elcomercio.pe/terminos-y-condiciones/',
    politicas: 'https://elcomercio.pe/politicas-privacidad/',
    tratamientoDatos: 'https://elcomercio.pe/tratamiento-de-datos/',
  },
  gestion: {
    loginMessage:
      'Inicia sesión y sigue informado con lo más completo de economía, negocios y finanzas',
    registerMessage:
      'Regístrate gratis y sigue informado con lo más completo de economía, negocios y finanzas',
    terminos: 'https://gestion.pe/terminos-y-condiciones/',
    politicas: 'https://gestion.pe/politica-de-privacidad/',
    tratamientoDatos: 'https:/gestion.pe/tratamiento-de-datos/',
  },
  peru21: {
    loginMessage: '¡Accede a contenido exclusivo!',
    registerMessage:
      'Regístrate gratis y sigue informado con las noticias más relevantes',
    terminos:
      'https://ecoid.pe/terminos_y_condiciones/f7bd562ca9912019255511635185bf2b',
    politicas:
      'https://ecoid.pe/politica_privacidad/f7bd562ca9912019255511635185bf2b',
  },
  depor: {
    loginMessage:
      '¡Únete a la mejor hinchada y accede a beneficios exclusivos!',
    registerMessage:
      '¡Únete a la mejor hinchada y accede a beneficios exclusivos!',
    terminos:
      'https://ecoid.pe/terminos_y_condiciones/6d83b35ec628d33d0606bcd9083dc2a6',
    politicas:
      'https://ecoid.pe/politica_privacidad/6d83b35ec628d33d0606bcd9083dc2a6',
  },
  trome: {
    loginMessage:
      'Forma parte del <span class="icon-trome-premium-bg">Club T</span> y accede a:',
    registerMessage: 'Regístrate gratis',
    terminos:
      'https://ecoid.pe/terminos_y_condiciones/4895ff32853e4dd68b5bd63c6437d17c',
    politicas:
      'https://ecoid.pe/politica_privacidad/4895ff32853e4dd68b5bd63c6437d17c',
  },
}

export function signCustomize() {
  const domain = getDomain()
  const brand = domain.split('.')[0]
  return urls[brand] || urls.elcomercio
}
