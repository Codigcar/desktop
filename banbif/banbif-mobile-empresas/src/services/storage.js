// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SInfo from "react-native-sensitive-info";
import base64 from 'react-native-base64'

class Storage {

    prefix = '@BB-'
    prefixStorage = '@CC-'
    pref = 'Pref'
    keyChain = '12345KEYANDROIDIOS6789'

    async getItem(item) {
        try {

            const value = await SInfo.getItem(item, {
                sharedPreferencesName: this.pref,
                keychainService: this.keyChain,
            });

            const dataDecode = base64.decode(value);

            if (dataDecode !== null) {
                try {
                    const jsonValue = JSON.parse(dataDecode)

                    return jsonValue
                } catch (e) {
                    return dataDecode
                }
            }
            return null

        } catch (e) {
            return null
        }
    }

    async setItem(key, value) {

        if (typeof value == 'object') {
            value = JSON.stringify(value)
        }

        var dataEncode = base64.encode(value);

        await SInfo.setItem(key, dataEncode, {
            sharedPreferencesName: this.pref,
            keychainService: this.keyChain,
        });

    }

    async getItemNotBase64(item) {
        try {

            const value = await SInfo.getItem(item, {
                sharedPreferencesName: this.pref,
                keychainService: this.keyChain,
            });


            if (value !== null) {
                try {
                    const jsonValue = JSON.parse(value)

                    return jsonValue
                } catch (e) {
                    return value
                }
            }
            return null

        } catch (e) {
            return null
        }
    }

    async setItemNotBase64(key, value) {

        if (typeof value == 'object') {
            value = JSON.stringify(value)
        }

        await SInfo.setItem(key, value, {
            sharedPreferencesName: this.pref,
            keychainService: this.keyChain,
        });

    }

    async removeItem(key) {
        let removeAttr = 'removeItem'

        if (typeof key == 'object' && key.length > 0) {
            removeAttr = 'multiRemove'
        }


        await SInfo.deleteItem(key, {
            sharedPreferencesName: this.pref,
            keychainService: this.keyChain
        });
    }

    async clearAllData() {
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys));
    }

    async getItemStorage(item) {
        try {
            const value = await AsyncStorage.getItem(`${this.prefixStorage}${item}`)

            if (value !== null) {
                try {
                    const jsonValue = JSON.parse(value)

                    return jsonValue
                } catch (e) {
                    return value
                }
            }
            return null
        } catch (e) {
            return null
        }
    }

    async setItemStorage(key, value) {
        if (typeof value == 'object') {
            value = JSON.stringify(value)
        }

        await AsyncStorage.setItem(`${this.prefixStorage}${key}`, value)
    }

    async removeItemStorage(key) {
        let removeAttr = 'removeItem'

        if (typeof key == 'object' && key.length > 0) {
            removeAttr = 'multiRemove'
            key = key.map(k => `${this.prefixStorage}${k}`)
        }

        await AsyncStorage[removeAttr](key)
    }

}

export const StorageService = new Storage()