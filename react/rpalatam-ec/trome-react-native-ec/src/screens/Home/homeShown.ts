import { STORE_HOME_SCREEN_SHOWN } from '../../utils/constants'
import { storage } from '../../utils/storage'

const INITIAL_VALUE = storage.getBoolean(STORE_HOME_SCREEN_SHOWN) || false

const HOME_SCREEN_SHOWN = {
  /**
   * Indica si la pantalla Home fue mostrada en la sesión anterior
   */
  get: (): boolean => INITIAL_VALUE,
  set: (value: boolean): void => {
    storage.set(STORE_HOME_SCREEN_SHOWN, value)
  },
}

export default HOME_SCREEN_SHOWN
