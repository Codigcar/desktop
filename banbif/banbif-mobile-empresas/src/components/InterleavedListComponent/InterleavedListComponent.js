import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";


export default class InterleavedList extends Component {
  render() {
    return (
      <View {...this.props}>
        <View
          style={{ backgroundColor: this.props.BackgroundColor, padding: 10, elevation: 1 }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View >
              <Text>{this.props.Text}</Text>
            </View>
            <View >
              <Text>{this.props.Value}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
InterleavedList.proptype = {
  BackgroundColor: PropTypes.string,
  Text: PropTypes.string,
  Value: PropTypes.string
};
