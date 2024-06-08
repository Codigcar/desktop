import Identity from '@arc-publishing/sdk-identity'
import { getBrand } from '../tools/tools'
import * as Sentry from '@sentry/browser'

const brand = getBrand()

export const getPreferences = async (resource: string) => {
  const { uuid } = Identity.userIdentity
  if (!uuid) return
  const req = await fetch(
    `${process.env.REACT_APP_NL_BASE_URL}/userprofile/public/v1/newsletter/?brand=${brand}&type=${resource}&uuid=${uuid}`,
  )
  if (!req.ok) {
    throw new Error('Ocurrió un error')
  }
  const resJSON = await req.json()
  return resJSON.data || {}
}

export const updatePreferences = async (
  resource: string,
  preferences,
  retry?: boolean,
) => {
  const { uuid, accessToken } = Identity.userIdentity
  if (!uuid) return
  const url = `${process.env.REACT_APP_NL_BASE_URL}/userprofile/public/v1/newsletter/events`
  const email = Identity.userProfile?.email || ''
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken} ${brand}`,
    },
    body: JSON.stringify({
      type: resource,
      eventName: 'build_preference',
      uuid,
      email,
      attributes: {
        preferences,
        first_name: Identity.userProfile?.firstName || '',
        last_name: Identity.userProfile?.lastName || '',
      },
      brand,
    }),
  })
  if (!req.ok) {
    if (!retry) {
      await Identity.extendSession()
      return await updatePreferences(resource, preferences, true)
    }
    const error = new Error('Error at updatePreferences')
    Sentry.captureException(error)
  }
  const resJSON = await req.json()
  return resJSON.data || {}
}
