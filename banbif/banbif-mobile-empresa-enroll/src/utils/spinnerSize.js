import { Platform } from 'react-native'

export class SpinnerSize {

	static androidSize = 40
	static iosSize = 1

	static get() {
		if (Platform.OS === 'ios') {
			return this.iosSize;
		}
		return this.androidSize;
	}

}