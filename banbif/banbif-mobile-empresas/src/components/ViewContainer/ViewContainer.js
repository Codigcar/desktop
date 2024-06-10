import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './Styles';

export default class ViewContainer extends Component {

    render() {
        return (
            <View style={[this.props.style, styles.mainContainer]}>
                <View style={styles.innerContainer}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}