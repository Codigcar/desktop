import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./Styles";

export default class DynamicTextComponent extends Component {
  render() {
    return (
      <View>
        <Text style={styles.text} >
          {this.props.dynamicText}
        </Text>
      </View>
    )
  }
}
