import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import Styles from "./Styles";

export default class InterleavedListMovementCreditCardComponent extends Component {
  render() {
    return (
      <View {...this.props}>
        <View style={[Styles.viewContainer, { backgroundColor: this.props.BackgroundColor }]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text ellipsizeMode="tail" numberOfLines={3}>
                {this.props.FechaConsumo}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
              <Text ellipsizeMode="tail" numberOfLines={3}>
                {this.props.FechaProceso}
              </Text>
            </View>
            <View style={{ flex: 4 }}>
              <Text ellipsizeMode="tail" numberOfLines={3}>
                {this.props.History}
              </Text>
            </View>
            <View style={{ flex: 2, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text ellipsizeMode="tail" numberOfLines={3}>
                {this.props.Soles}
              </Text>
            </View>
            <View style={{ flex: 2, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text ellipsizeMode="tail" numberOfLines={3}>
                {this.props.Dolares}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
InterleavedListMovementCreditCardComponent.proptype = {
  BackgroundColor: PropTypes.string,
  Day: PropTypes.string,
  Doa: PropTypes.string,
  Value: PropTypes.string,
  History: PropTypes.string
};
