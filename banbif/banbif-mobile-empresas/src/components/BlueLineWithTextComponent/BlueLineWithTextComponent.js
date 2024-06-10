import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import Style from "../BlueLineWithTextComponent/Styles";

export default class BlueLineWithTextComponent extends Component {
  render() {
    return (
      <View
        {...this.props}
        style={Style.ViewColor}
      >
        <Text style={Style.TextColor}>{this.props.Text}</Text>
      </View>
    );
  }
}
BlueLineWithTextComponent.proptype = {
  Text: PropTypes.string,
}
