import notifee, {Event, EventType} from '@notifee/react-native';
import * as Auth0Guardian from 'react-native-auth0-guardian';

class NotifeeRN {
  static  instance: NotifeeRN;
  private bodyNotification: any;

  constructor() {
    notifee.onForegroundEvent(async (payload: Event) => {
      const {type, detail} = payload;
      const action = detail?.pressAction?.id;
      if (action === 'allow') {
        try {
            await Auth0Guardian.allow(this.bodyNotification);
        } catch (error) {
            console.log("🚀 -------------------------------------------------------------------------------🚀")
            console.log("🚀 ~ file: notifee.ts:55 ~ NotifeeRN ~ notifee.onBackgroundEvent ~ error:", error)
            console.log("🚀 -------------------------------------------------------------------------------🚀")
        }
        return
      }
      if (action === 'reject') {
        try {
            await Auth0Guardian.reject(this.bodyNotification);
        } catch (error) {
            console.log("🚀 -------------------------------------------------------------------------------🚀")
            console.log("🚀 ~ file: notifee.ts:57 ~ NotifeeRN ~ notifee.onBackgroundEvent ~ error:", error)
            console.log("🚀 -------------------------------------------------------------------------------🚀")
        }
      }
    });

    notifee.onBackgroundEvent(async (payload: Event) => {
      const {type, detail} = payload;
      const action = detail?.pressAction?.id;
      if (action === 'allow') {
        try {
            await Auth0Guardian.allow(this.bodyNotification);
        } catch (error) {
            console.log("🚀 -------------------------------------------------------------------------------🚀")
            console.log("🚀 ~ file: notifee.ts:55 ~ NotifeeRN ~ notifee.onBackgroundEvent ~ error:", error)
            console.log("🚀 -------------------------------------------------------------------------------🚀")
        }
        return
      }
      if (action === 'reject') {
        try {
            await Auth0Guardian.reject(this.bodyNotification);
        } catch (error) {
            console.log("🚀 -------------------------------------------------------------------------------🚀")
            console.log("🚀 ~ file: notifee.ts:57 ~ NotifeeRN ~ notifee.onBackgroundEvent ~ error:", error)
            console.log("🚀 -------------------------------------------------------------------------------🚀")
        }
      }
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new NotifeeRN();
    }
    return this.instance;
  }

  public async displayNotification(bodyNotification: any) {
    this.bodyNotification = bodyNotification;
    notifee.displayNotification({
      title: 'Solicitud de Login',
      body: 'Un nuevo usuario quiere iniciar sesión',
      android: {
        channelId: 'default',
        actions: [
          {
            title: 'Aceptar',
            pressAction: {id: 'allow'},
          },
          {
            title: 'Rechazar',
            pressAction: {id: 'reject'},
          },
          // {
          //   title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
          //   pressAction: {id: 'cry'},
          // },
        ],
      },
    });
  }
}

export default NotifeeRN;
