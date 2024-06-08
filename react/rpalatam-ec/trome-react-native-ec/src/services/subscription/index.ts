import Piano from './Piano'
import { App } from '../../utils/config'
import type { Subscription } from './subscription.types'

const subscription = App.select<Subscription>({
  gestion: new Piano(),
  elcomercio: new Piano(),
})

export default subscription
