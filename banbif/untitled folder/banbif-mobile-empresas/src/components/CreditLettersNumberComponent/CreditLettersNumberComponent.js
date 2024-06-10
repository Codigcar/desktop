import React, { Component } from "react";
import { View, Text, TouchableOpacity} from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from "../Icon";
import styles from "../DollarIconAndTextComponent/Style";
import { Toast } from 'native-base';
import PropTypes from "prop-types";
export default class CreditLettersNumberComponent extends Component {
  render() {
    return (
      <View {...this.props} style={styles.view}>
        <View style={styles.headerOuterContainer1}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleFont}>Nro. de operación</Text>
            <TouchableOpacity onPress={async () => {
              await Clipboard.setString(this.props.NrDiscount);
              Toast.show({
                title: '¡Número copiado!',
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
            <Text style={styles.accountFont}>{this.props.NrDiscount}</Text>

          </View>
        </View>
      </View>
    );
  }
}

CreditLettersNumberComponent.proptype = {
  NrDiscount: PropTypes.string,

};
