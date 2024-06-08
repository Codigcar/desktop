export { default as HOME_SCREEN_SHOWN } from './homeShown'
import { App } from '../../utils/config'

/* eslint-disable @typescript-eslint/no-var-requires */
const Home = App.select({
  gestion: require('./Home.gestion').default,
  default: require('./Home').default,
})

export default Home
