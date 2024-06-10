import React from "react";
import { View, Text, TextInput, ActivityIndicator, Platform, KeyboardAvoidingView, TouchableOpacity } from "react-native";

import Button from "../../components/Button";
import Icon from "../../components/Icon";
import styles from "./Styles";
import colors from "../../assets/colors";
import { SpinnerSize } from '../../utils/spinnerSize';
import DetectID from '../../modules/DetectID';
import ModalHandleError from "../../components/ModalHandleError";
import { SoftTokenService } from '../../services/softToken';
import { Toast } from 'native-base';
import { StorageService } from "../../services/storage";
import { enviroment } from "../../utils/enviroments";
import strings from "../../assets/strings";

export default class EnrolamientoCodigoActivacion extends ModalHandleError {
  constructor(props) {
    super(props);

    this.state = Object.assign(this.state, {
      codigo: '',
      size: 0,
      loading: false
    });
  }

  async validarCodigo() {
    if (this.state.codigo === "") return;
    const { navigation } = this.props;
    let response = null
    let throwErr = false

    await this.setState({ loading: true, size: SpinnerSize.get() })
    try {
      response = await DetectID.deviceRegistrationByCode(enviroment.detectIDUrl + this.state.codigo);
      if (throwErr) {
        return
      }

      await this.setState({ loading: false, size: 0 })

      const successCode = strings.messages.enrolamientoCodigoActivacion.codes.softokenEnrolledSuccessfully;

      if (response === successCode) {
        await StorageService.setItemStorage('hasSoftToken', 'true')
        navigation.navigate('EnrolamientoListo');
      } else {
        let mensaje = strings.messages.enrolamientoCodigoActivacion[response];
        if (typeof mensaje === 'undefined') {
          mensaje = strings.messages.error;
        }
        navigation.navigate('EnrolamientoErro', { mensaje: `${mensaje} (${response})` });
      }
    } catch (e) {
      if (throwErr) {
        return
      }
      await this.setState({ loading: false, size: 0 })
      navigation.navigate('EnrolamientoErro', { mensaje: `${strings.messages.error} (0)` });
    }
  }

  friendlyMessage(err) {
    err.response.data.meta.mensajes.forEach(item => {

      if (strings.messages.enrolamientoCodigoActivacion[item.codigo]) {
        item.mensaje = strings.messages.enrolamientoCodigoActivacion[item.codigo]
      }
    });

    return err
  }

  async reenviarCodigo() {
    await this.setState({ loading: true, size: SpinnerSize.get() })
    try {
      await SoftTokenService.enviarCodigoEmail();
      Toast.show({
        title: '¡Código reenviado!',
        buttonText: 'Ok'
      })
    } catch (err) {
      let erro = this.friendlyMessage(err)
      this.handleMessages(erro);
    }
    await this.setState({ loading: false, size: 0 })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <View style={styles.container}>
          {this.getModals()}
          <Icon
            style={{ marginVertical: 30 }}
            family={Icon.IONICONS}
            name='ios-paper-plane'
            size={80}
            color={colors.lightBlue} />

          <Text style={styles.text}>
            ¡Código enviado!
          </Text>
          <Text style={[styles.text, styles.marginTop2]}>
            Ingresa el código de activación
          </Text>
          <Text style={styles.text}>
            para finalizar el enrolamiento:
          </Text>

          <View style={styles.IconAndTextInputContainer}>
            <TextInput
              style={styles.TextInputStyle}
              onChangeText={codigo => this.setState({ codigo })}
              value={this.state.codigo}
              placeholderTextColor={colors.lightGrey}
            />
          </View>

          <TouchableOpacity style={styles.reenviarCodigo}
            onPress={() => this.reenviarCodigo()}>
            <Text style={[styles.text, styles.marginTop2, styles.blueColor]}>
              Reenviar código
            </Text>
            <Icon
              family={Icon.ENTYPO}
              name="chevron-small-right"
              size={22}
              style={styles.icon}
            />
          </TouchableOpacity>

          <View style={styles.padding20}>
            <Button
              color={colors.lightBlue}
              width={150}
              height={40}
              textButton='Procesar'
              action={() => {
                this.validarCodigo()
              }}
            />
          </View>

          <ActivityIndicator
            style={{ paddingTop: this.state.loading ? 20 : 0, paddingBottom: this.state.loading ? 40 : 0, }}
            animating={this.state.loading}
            size={Platform.OS === "ios" ? 'small' : this.state.size}
            color={colors.lightBlue}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
