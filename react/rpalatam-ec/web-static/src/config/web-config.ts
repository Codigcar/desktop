import { WEB_PROJECT_EC_APP } from '../tools/flags'

type Config = {
  fontSize: string
  mode: boolean
}

const defaultConfig: Config = {
  fontSize: WEB_PROJECT_EC_APP ? 'l' : 'm',
  mode: false,
}

class UserConfig {
  config: Config

  constructor() {
    const storage = JSON.parse(
      window.sessionStorage.config || window.localStorage.config || '{}',
    )
    const newConfig = { ...defaultConfig, ...storage }
    this.config = newConfig
    this.renderFontSize(this.config.fontSize, null)
  }

  renderFontSize(size: string, prevSize: string | null) {
    if (prevSize) document.body.classList.remove(`zoom-${prevSize}`)
    document.body.classList.add(`zoom-${size}`)
  }

  set<T extends keyof Config, K extends Config[T]>(key: T, value: K) {
    const prevConfig = Object.assign({}, { ...this.config })
    this.config[key] = value
    this.renderFontSize(this.config.fontSize, prevConfig.fontSize)
    window.localStorage.config = JSON.stringify(this.config)
  }

  get<T extends keyof Config>(key: T) {
    return this.config[key]
  }
}

export default new UserConfig()
