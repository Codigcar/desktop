import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from "../Icon";
import styles from "../DollarIconAndTextComponent/Style";
import { Toast } from 'native-base';
import PropTypes from "prop-types";

export default class DocumentNumberAndType extends Component {
  render() {
    return (
      <View {...this.props} style={styles.view}>

        <View style={styles.headerOuterContainer1}>
          <View style={styles.titleContainer}>
            <View style={{ paddingHorizontal: 2, flex: 10 }}>
              <Text style={styles.titleFont}>Nro. de Documento</Text>

            </View>
            <View style={{ paddingHorizontal: 3, flex: 2 }}>
              <TouchableOpacity onPress={async () => {
                await Clipboard.setString(this.props.NrDocument);
                Toast.show({
                  title: '¡Número de documento copiado!',
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
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.accountFont}>{this.props.NrDocument}</Text>

          </View>
        </View>

        <View style={styles.headerOuterContainer1}>
          <View style={styles.titleContainer}>
            <View style={{ paddingHorizontal: 2, flex: 10 }}>
              <Text style={styles.titleFont}>Tipo de Documento</Text>

            </View>
            <View style={{ paddingHorizontal: 3, flex: 2 }}>
              <TouchableOpacity onPress={async () => {
                await Clipboard.setString(this.props.DocumentType);
                Toast.show({
                  title: '¡Tipo de documento copiado!',
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
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.accountFont}>{this.props.DocumentType}</Text>

          </View>
        </View>
      </View>
    );
  }
}

DocumentNumberAndType.proptype = {
  NrDocument: PropTypes.string,
  DocumentType: PropTypes.string,
};
