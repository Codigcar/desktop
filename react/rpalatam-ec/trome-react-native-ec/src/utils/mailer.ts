import crashlytics from '@react-native-firebase/crashlytics'
import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import Mailer from 'react-native-mail'

import { App } from './config'
import { User } from '../entities/User'

type Params = Pick<User, 'id' | 'email'>

const message = App.select({
  gestion: '<b>NO BORRAR la siguiente información para poder ayudarte.</b>',
  default: '',
})

const subject = App.select({
  elcomercio: 'Enviar comentario',
  default: 'Comentario',
})

export const sendFeedbackByEmail = (params: Params): void => {
  Mailer.mail(
    {
      subject: `Aplicación ${DeviceInfo.getApplicationName()} | ${subject}`,
      recipients: ['mobilepub@comercio.com.pe'],
      body: `
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <div style="font-size: 12px;">
          ${message}
          <hr />
          <div>Sistema operativo: ${Platform.OS} - ${Platform.Version}</div>
          <div>Dispositivo: ${DeviceInfo.getBrand()}</div>
          <div>Versión de la app: ${DeviceInfo.getReadableVersion()}</div>
          <div>Id de la app: ${DeviceInfo.getBundleId()}</div>
          <div>Id: ${params.id || '-'}</div>
          <div>Email: ${params.email || '-'}</div>
        </div>
      `,
      isHTML: true,
    },
    (error) => {
      if (error) crashlytics().recordError(new Error(error))
    },
  )
}
