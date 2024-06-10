import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '../Icon';
import styles from './Style';

export default class ProductListItem extends Component {
	render() {
		return (
			<TouchableOpacity {...this.props}>
				<View style={[styles.row, styles.centered]}>
					<View style={styles.flex4}>
						<Text numberOfLines={3} style={styles.text}>{this.props.children}</Text>
					</View>
					<View style={styles.right}>
						<Icon
							style={styles.blue}
							family={Icon.ENTYPO}
							name='chevron-small-right'
							size={40} />
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}