import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from "../Icon";
import styles from "../DollarIconAndTextComponent/Style";
import { Toast } from 'native-base';
import PropTypes from "prop-types";
import CurrencyComponent from "../CurrencyComponent/CurrencyComponent";

export default class DollarIconAndTextComponent extends Component {
  render() {
    console.log('1112121')
    return (
      <View {...this.props} style={styles.view}>
        <View style={{ flex: 1 }}>
          <CurrencyComponent
            moneda={this.props.moneda}
          />
        </View>
        <View style={{marginLeft: 10, flex: 4, alignContent: "flex-start", alignSelf: "flex-start",}}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleFont}>Nro. de Cuenta</Text>
            {this.props.isDetail == true &&
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
            }
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.accountFont}>
              {this.props.NrAccount}
            </Text>

          </View>
        </View>

        <View style={styles.headerOuterContainer2}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleFont}>Nro. CCI</Text>
            {this.props.isDetail == true &&
              <TouchableOpacity onPress={async () => {
                await Clipboard.setString(this.props.NrCCI);
                Toast.show({
                  title: '¡Número CCI copiado!',
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
            }
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.accountFont}>{this.props.NrCCI}</Text>

          </View>
        </View>
        {
          Boolean(this.props?.entidad) &&
          <View >
            <Text>Entidad: {this.props.entidad}</Text>
          </View >
        }
        {(this.props.ArrowColor != null && this.props.ArrowColor != undefined && this.props.ArrowColor != '#fff') &&
          <View style={styles.right} >
            <Icon
              style={{ color: this.props.ArrowColor }}
              family={Icon.ENTYPO}
              name="chevron-small-right"
              size={40}
            />
          </View>
        }
      </View>
    );
  }
}

DollarIconAndTextComponent.proptype = {
  NrAccount: PropTypes.string,
  NrCCI: PropTypes.string,
  ArrowColor: PropTypes.style
};
