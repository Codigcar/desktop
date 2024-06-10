
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, LayoutAnimation, Platform, UIManager } from "react-native";
import Icon from '../Icon';
import styles from "./Styles";

export default class Accordian extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    }

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {

    return (
      <View>
        <TouchableOpacity ref={this.accordian} style={styles.row} onPress={() => this.toggleExpand()}>
          <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
          <Icon
            style={styles.blue}
            family={Icon.ENTYPO}
            name={this.state.expanded ? "chevron-small-up" : "chevron-small-down"}
            size={30}
          />
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {
          this.state.expanded &&
          <View style={styles.child}>
            <Text style={styles.text} >{this.props.data}</Text>
          </View>
        }

      </View>
    )
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded })
  }

}