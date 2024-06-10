import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from "../Icon";
import { Toast } from 'native-base';

import styles from "../DollarIconAndTextComponent/Style";
import strings from "../../assets/strings";
import PropTypes from "prop-types";

export default class HeaderNroDepositsOfDepositComponent extends Component {
  render() {
    return (
      <View {...this.props} style={styles.view}>
        <View style={styles.headerOuterContainer1}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleFont}>Nro. De Carta Fianza</Text>
            <TouchableOpacity onPress={async () => {
              await Clipboard.setString(this.props.NrAccount);
              Toast.show({
                title: '¡Número de Carta Fianza copiado!',
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
            <Text style={styles.accountFont}>{this.props.NrAccount}</Text>
          </View>
        </View>

      </View>
    );
  }
}

HeaderNroDepositsOfDepositComponent.proptype = {
  NrAccount: PropTypes.string,

};
