import React, { Component } from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import styles from "./Styles";
import colors from "../../assets/colors";
import strings from "../../assets/strings";

export default class EnrolamientoErro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mensaje: this.props.route.params.mensaje
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Icon
          style={{ marginVertical: 10 }}
          family={Icon.IONICONS}
          name='md-close-circle'
          size={80}
          color={colors.lightBlue} />

        <Text style={[styles.text, { color: colors.lightBlue }]}>
          ¡Error!
        </Text>
        <Text style={[styles.text, styles.padding20]}>
          {this.state.mensaje}
        </Text>

        <View style={styles.paddingTop20}>
          <Button
            color={colors.lightBlue}
            width={150}
            height={40}
            textButton={this.state.mensaje.indexOf(strings.messages.enrolamientoCodigoActivacion["404"]) > -1
              ? 'Retornar' : 'Menú'}
            action={() => {
              if (this.state.mensaje.indexOf(strings.messages.enrolamientoCodigoActivacion["404"]) > -1) {
                this.props.navigation.navigate('EnrolamientoSoftToken')
              } else {
                this.props.navigation.navigate('MainMenu');
              }
            }}
          />
        </View>
      </View>
    );
  }
}
