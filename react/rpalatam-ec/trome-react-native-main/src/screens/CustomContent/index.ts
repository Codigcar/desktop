import { App } from '../../utils/config'

/* eslint-disable @typescript-eslint/no-var-requires */
const CustomContent = App.select({
  gestion: require('./CustomContent.gestion').default,
  default: require('./CustomContent').default,
})

export default CustomContent
