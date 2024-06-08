import { App } from '../../utils/config'

/* eslint-disable @typescript-eslint/no-var-requires */
export const Favorite = App.select({
  elcomercio: require('./Favorite.elcomercio').default,
  default: require('./Favorite').default,
})

export default Favorite
