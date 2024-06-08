import { Linking } from 'react-native'
import InAppBrowserClassMethods, {
  InAppBrowserOptions,
} from 'react-native-inappbrowser-reborn'

export async function openInBrowser(
  url: string,
  options?: InAppBrowserOptions,
): Promise<void> {
  try {
    const isAvailable = await InAppBrowserClassMethods.isAvailable()
    if (!isAvailable) throw new Error('No available')
    InAppBrowserClassMethods.open(url, options)
  } catch (err) {
    Linking.openURL(url)
  }
}
