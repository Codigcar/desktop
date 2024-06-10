import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from "../Icon";
import styles from "../DollarIconAndTextComponent/Style";
import { Toast } from 'native-base';
import PropTypes from "prop-types";

export default class DollarIconAndSingleTextComponent extends Component {
  render() {
    console.log('wwew')
    return (
      <View {...this.props} style={styles.view}>
        <View >
          <Icon
            size={25}
            name="dollar"
            family={Icon.FONT_AWESOME}
            style={styles.blueDollar}
          />
        </View>
        <View style={styles.headerOuterContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleFont}>Nro. de Cuenta</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.accountFont}>
              {this.props.NrAccount}
            </Text>
            <TouchableOpacity onPress={async () => {
              await Clipboard.setString(this.props.NrAccount);
              Toast.show({
                title: '¡Número de cuenta copiado!',
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
        </View>
      </View>
    );
  }
}

DollarIconAndSingleTextComponent.proptype = {
  NrAccount: PropTypes.string,

};
