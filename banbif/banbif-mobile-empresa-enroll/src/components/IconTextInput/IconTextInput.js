import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../Icon'
import styles from './Styles';
import colors from '../../assets/colors';

export default class IconTextInput extends Component {
    render() {
        return (
            <View style={[styles.row]}>
                <View style={styles.centered}>
                    <Icon {...this.props.icon} />
                </View>
                <View style={styles.centered}>
                    <TextInput placeholderTextColor={colors.lightGrey} {...this.props.input} />
                </View>
            </View>
        );
    }
}

IconTextInput.propTypes = {
    icon: PropTypes.object,
    input: PropTypes.object,
}

IconTextInput.defaultProps = {
    icon: {},
    input: {}
}