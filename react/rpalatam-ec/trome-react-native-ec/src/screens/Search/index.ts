import { App } from '../../utils/config'

/* eslint-disable @typescript-eslint/no-var-requires */
const SearchScreen = App.select({
  elcomercio: require('./Search.elcomercio').default,
  default: require('./Search').default,
})
export default SearchScreen
