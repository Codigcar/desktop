import * as React from 'react'
import {Platform} from 'react-native'
import { WebView } from 'react-native-webview'

const platform = {
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
    isWeb: false,
}

const patchPostMessageJsCode = `(${String(function () {
    const originalPostMessage = window.postMessage
    const patchedPostMessage = (message, targetOrigin, transfer) => {
        originalPostMessage(message, targetOrigin, transfer)
    }
    patchedPostMessage.toString = () => String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
    window.postMessage = patchedPostMessage
})})();`

const getExecutionFunction = (siteKey, action) => {
    return `window.grecaptcha.execute('${siteKey}', { action: '${action}' }).then(
    function(args) {
      window.ReactNativeWebView.postMessage(args);
    }
  )`
}

const getInvisibleRecaptchaContent = (siteKey, action) => {
    return `<!DOCTYPE html><html><head>
    <script src="https://www.google.com/recaptcha/api.js?render=${siteKey}"></script>
    <script>window.grecaptcha.ready(function() { ${getExecutionFunction(siteKey, action)} });</script>
    </head></html>`
}

class ReCaptchaComponent extends React.PureComponent {

    _webViewRef = null

    refreshToken() {
        if (platform.isIOS && this._webViewRef) {
            this._webViewRef.injectJavaScript(getExecutionFunction(this.props.siteKey, this.props.action))
        } else if (platform.isAndroid && this._webViewRef) {
            this._webViewRef.reload()
        }
    }

    render() {
        return (
            <WebView
                ref={ref => {
                    this._webViewRef = ref
                }}
                startInLoadingState={true}
                style={{marginTop: 20, width: 10, height: 10}}
                javaScriptEnabled
                originWhitelist={['*']}
                automaticallyAdjustContentInsets
                mixedContentMode={'always'}
                injectedJavaScript={patchPostMessageJsCode}
                source={{
                    html: getInvisibleRecaptchaContent(this.props.siteKey, this.props.action),
                    baseUrl: this.props.captchaDomain,
                }}
                onMessage={(e) => {
                    this.props.onReceiveToken(e.nativeEvent.data)
                }}
            />
        )
    }
}

export default ReCaptchaComponent