import DeviceInfo from 'react-native-device-info';

class DeviceInfoApp {
  getAppVersion() {
    return DeviceInfo.getVersion();
  }
}

export default DeviceInfoApp
