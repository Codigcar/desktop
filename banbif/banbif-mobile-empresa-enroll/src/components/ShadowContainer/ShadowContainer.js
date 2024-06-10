import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './Styles';

export default class ShadowContainer extends Component {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                {this.props.children}
            </View>
        );
    }
}
