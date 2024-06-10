import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "../DollarIconTextCreditCardComponent/Style";

import PropTypes from "prop-types";
import CurrencyComponent from "../CurrencyComponent/CurrencyComponent";

export default class DollarIconTextCreditCardComponent extends Component {
  render() {
    return (
      <View {...this.props} style={styles.view}>
        <View>
          <CurrencyComponent
            moneda={this.props.moneda}
          />

        </View>
        <View style={styles.headerOuterContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleFont}>Nro. de Tarjeta</Text>
          </View>
          <View>
            <Text style={styles.accountFont}>
              {this.props.NrAccount.length > 4
                ? "*".repeat(this.props.NrAccount.length - 4) +
                this.props.NrAccount.slice(
                  this.props.NrAccount.length - 4,
                  this.props.NrAccount.length
                )
                : this.props.NrAccount}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

DollarIconTextCreditCardComponent.proptype = {
  NrAccount: PropTypes.string
};
