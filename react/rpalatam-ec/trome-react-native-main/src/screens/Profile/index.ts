import { App } from '../../utils/config'

/* eslint-disable @typescript-eslint/no-var-requires */
const Profile = App.select({
  gestion: require('./Profile.v2').default,
  trome: require('./Profile.v2').default,
  default: require('./Profile').default,
})

export default Profile
