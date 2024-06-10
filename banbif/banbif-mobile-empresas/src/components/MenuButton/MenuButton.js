import React, { Component } from 'react';
import { View, Text, TouchableOpacity  } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import ShadowContainer from '../ShadowContainer';
import styles from './Styles'


export default class MenuButton extends Component {
    render() {
        return (
            <ShadowContainer style={styles.shadowContainer}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={styles.innerContainer}>
                        <View>
                            <Icon family={this.props.family} name={this.props.icon} size={80} style={styles.blue} />
                        </View>
                        <View>
                            <Text style={[styles.text, styles.blue]}>{this.props.text}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </ShadowContainer>
        );
    }
}

MenuButton.propTypes = {
    family: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string,
    onPress: PropTypes.func
}