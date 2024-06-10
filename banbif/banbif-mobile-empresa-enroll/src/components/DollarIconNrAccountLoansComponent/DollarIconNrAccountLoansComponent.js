import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from "../Icon";
import styles from "../DollarIconTextCreditCardComponent/Style";
import { Toast } from 'native-base';
import PropTypes from "prop-types";
import CurrencyComponent from "../CurrencyComponent/CurrencyComponent";

export default class DollarIconNrAccountLoansComponent extends Component {
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
            <Text style={styles.titleFont}>Nro. de Préstamo</Text>
            <TouchableOpacity onPress={async () => {
              await Clipboard.setString(this.props.NrAccount);
              Toast.show({
                title: '¡Número de préstamo copiado!',
                buttonText: 'Ok'
              })
            }}>
              <Icon
                size={20}
                name="content-copy"
                family={Icon.MATERIAL_ICONS}
                style={[styles.blueDollar, { marginLeft: 5 }]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.accountFont}>
              {this.props.NrAccount}
            </Text>

          </View>
        </View>
      </View>
    );
  }
}

DollarIconNrAccountLoansComponent.proptype = {
  NrAccount: PropTypes.string
};
