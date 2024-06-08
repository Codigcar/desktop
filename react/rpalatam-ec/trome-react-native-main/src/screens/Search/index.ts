import { App } from '../../utils/config'

/* eslint-disable @typescript-eslint/no-var-requires */
const SearchScreen = App.select({
  gestion: require('./Search.gestion').default,
  default: require('./Search').default,
})
export default SearchScreen
