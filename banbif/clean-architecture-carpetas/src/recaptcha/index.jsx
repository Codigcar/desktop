import * as React from 'react'
import ReCaptchaComponent from './ReCaptchaComponent'

class ReCaptchaV3 extends React.PureComponent {
    _captchaRef;

    refreshToken = () => {
        this._captchaRef?.refreshToken()
    }

    render() {
        return (
            <ReCaptchaComponent
                ref={ref => (this._captchaRef = ref)}
                action={this.props.action}
                captchaDomain={this.props.captchaDomain}
                siteKey={this.props.siteKey}
                onReceiveToken={(token) => {
                    this.props.onReceiveToken(token)
                }}
            />
        )
    }
}

export default ReCaptchaV3