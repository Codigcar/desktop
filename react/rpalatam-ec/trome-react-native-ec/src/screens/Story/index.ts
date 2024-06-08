import { App } from '../../utils/config'

/* eslint-disable @typescript-eslint/no-var-requires */
const Story = App.select({
  elcomercio: require('./Story.elcomercio').default,
  default: require('./Story').default,
})

export default Story
