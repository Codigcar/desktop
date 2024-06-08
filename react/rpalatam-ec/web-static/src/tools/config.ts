type AppKey = 'depor' | 'elcomercio' | 'gestion' | 'peru21' | 'trome'

const hostname = window.location.hostname.match(
  /(elcomercio|gestion|peru21|depor|trome).(pe|com)/,
)
const [key] = (hostname ? hostname[0] : 'elcomercio.pe').split('.')

interface AppStatic {
  key: AppKey
  select<T>(
    specifics:
      | ({ [key in AppKey]?: T } & { default: T })
      | { [key in AppKey]: T },
  ): T
  select<T>(specifics: { [key in AppKey]?: T }): T | undefined
}

export const App: AppStatic = {
  key: key.toLowerCase() as AppKey,
  select(spec) {
    if (App.key in spec) return spec[App.key]
    return 'default' in spec ? spec.default : undefined
  },
}
