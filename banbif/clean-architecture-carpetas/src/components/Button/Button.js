
import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import ShadowContainer from '../ShadowContainer';
import Style from './Style';


export default class Button extends Component {

    constructor(props) {
        super(props);

        this.buttonProps = {
            backgroundColor: props.color,
            height: props.height,
            width: props.width,
        }
    }


    render() {
        return (
            <TouchableHighlight onPress={this.props.action}>

                <ShadowContainer style={[Style.ShadowContainerButton, this.buttonProps]}
                >
                    <Text style={Style.TextButton}>
                        {this.props.textButton}
                    </Text>

                </ShadowContainer>
            </TouchableHighlight>
        )
    }


}


Button.propTypes = {
    backgroundColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    textButton: PropTypes.string,
    action: PropTypes.func,

}

Button.defaultProps = {
    backgroundColor: 'red',
    height: 100,
    width: 100,
    textButton: "",


}