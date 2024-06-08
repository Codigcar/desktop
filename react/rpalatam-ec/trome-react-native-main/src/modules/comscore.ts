import { NativeModules } from 'react-native'

type UpdateOptions = {
  publisherID: string
}

type InitOptions = UpdateOptions & {
  appName: string
}

interface ComScoreInterface {
  initialize: (options: InitOptions) => Promise<void>
}

export default NativeModules.RNComScore as ComScoreInterface
