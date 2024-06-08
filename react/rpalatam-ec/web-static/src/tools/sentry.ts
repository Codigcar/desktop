import * as Sentry from '@sentry/browser'

interface Profile {
  uuid: string
  email?: string
  firstName: string
  lastName: string
}

export const setUserTracking = (profile: Profile): void => {
  const user = {
    id: profile.uuid,
  }
  if (profile.email) {
    user['email'] = profile.email
  }
  Sentry.configureScope(scope => {
    scope.setUser(user)
    scope.setExtra('character_name', `${profile.firstName} ${profile.lastName}`)
  })
}
