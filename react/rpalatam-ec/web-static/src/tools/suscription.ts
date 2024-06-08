import { sha256 } from 'js-sha256'
import { setUserTracking } from './sentry'
import { getCounter, removeCounter } from './counter'

const eventGTM = props => {
  const keys = Object.keys(props)
  const event = {}
  keys.forEach(item => {
    event[item] = props[item]
  })
  window.dataLayer?.push(event)
}

const TrackGTM = {
  event: eventGTM,
}

const categories = {
  sw: 'PWA_Sign_Wall',
  swh: 'PWA_Sign_Wall_Hard',
  podcast: 'Podcast',
  favorites: 'PWA_Favorites',
  preference: 'PWA_Preference',
  newsletter: 'PWA_Newsletter',
  paywall: 'PWA_Paywall',
  onboarding: 'PWA_Onboarding',
}

const trackCounter = () => {
  const counterNotice = getCounter('signwall')
  if (counterNotice && counterNotice.value > 0) {
    window.dataLayer?.push({
      event: 'SuscriptionActivity',
      category: categories.swh,
      action: 'pwa_swh_modal_conversion',
      label: window.location.href.replace(window.location.origin, ''),
      value: counterNotice.value,
    })
  }
  removeCounter('relogin')
}

const tracking = ({ category, label }) => {
  const url = window.location.href.replace(window.location.origin, '')
  return {
    event: 'SuscriptionActivity',
    category: categories[category] || 'Other',
    label: label || url,
    value: 0,
  }
}

type Provider = 'facebook' | 'google'

export const newTrace = {
  auth: user => {
    // Track counter
    trackCounter()
    // Tracking user in Sentry
    setUserTracking(user)
    // Remove MPP Session
    localStorage.removeItem('mppSession')
    localStorage.removeItem('mppUser')
    // email hash
    if (user.email) {
      const hash = sha256(user.email)
      window.document.cookie = `arc_e_id=${hash};expires=Fri, 31 Dec 2038 23:59:59 GMT;path=/;`
    }
  },
  custom: (user, track) => {
    const { category, ...otherProps } = track
    TrackGTM.event({ ...tracking(track), ...otherProps })
    newTrace.auth(user)
  },
  loginWithEmail: (user, track) => {
    TrackGTM.event({ ...tracking(track), action: 'pwa_sw_login_btn_ingresar' })
    newTrace.auth(user)
  },
  loginWithProvider: (provider: Provider, user, track) => {
    TrackGTM.event({
      ...tracking(track),
      action: `pwa_sw_login_btn_${provider}`,
    })
    newTrace.auth(user)
  },
  registerWithEmail: (user, track) => {
    TrackGTM.event({
      ...tracking(track),
      action: 'pwa_sw_registro_btn_registrarme',
    })
    newTrace.auth(user)
  },
  registerWithProvider: (provider: Provider, user, track) => {
    TrackGTM.event({
      ...tracking(track),
      action: `pwa_sw_registro_btn_${provider}`,
    })
    newTrace.auth(user)
  },
}
