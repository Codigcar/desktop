import { App } from '../../utils/config'

/* eslint-disable @typescript-eslint/no-var-requires */
const Profile = App.select({
  elcomercio: require('./Profile.elcomercio').default,
  gestion: require('./Profile.gestion').default,
  default: require('./Profile').default,
})

export default Profile
