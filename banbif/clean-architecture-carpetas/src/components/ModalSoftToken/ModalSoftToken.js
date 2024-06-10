import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from "react-native";
import Modal from "react-native-modal";
import ShadowContainer from "../ShadowContainer";

import Style from "./Styles";
import Colors from "../../assets/colors";
import Icon from "../../components/Icon/Icon";


const width = Dimensions.get("window").width;

export default class ModalSoftToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textEntidad: "",
      avisoObrigatorio: false
    };
  }

  render() {
    const content = (
      <ShadowContainer style={Style.ShadowContainerStyle}>
        <TouchableHighlight
          style={Style.Touchable}
          onPress={() => {
            this.setState({ avisoObrigatorio: false });
            this.props.closeModalSoftToken();
          }}
        >
          <View style={Style.ViewIcon}>
            <Icon
              family={Icon.IONICONS}
              name={"ios-close-circle-outline"}
              size={30}
              color={Colors.lightBlue}
            />
          </View>
        </TouchableHighlight>
        <View style={Style.ViewStyle}>
          <View style={Style.ViewText}>
            <Text>Ingresa el Token Físico</Text>
            <Text>para confirmar la operación</Text>
          </View>
          <TextInput
            style={Style.TextInputStyle}
            onChangeText={textEntidad => {
              this.setState({ avisoObrigatorio: false });
              this.props.setSoftToken(textEntidad);
              this.setState({ textEntidad });
            }}
            value={this.state.textEntidad}
            secureTextEntry
            keyboardType='numeric'
            contextMenuHidden={true}
          />
          {this.state.avisoObrigatorio && (
            <Text style={{ color: "#c30" }}>Este campo es obligatorio</Text>
          )}

          <View style={Style.ViewButtonStyle}>
            <TouchableHighlight
              onPress={() => {
                if (this.state.textEntidad) {
                  this.props.setModal(false);
                  this.props.closeModalSoftToken();
                  this.props.showSuccess();
                  this.state.textEntidad = "";
                } else {
                  this.setState({ avisoObrigatorio: true });
                }
              }}
            >
              <ShadowContainer style={Style.ShadowContainerButton}>
                <Text style={Style.TextButton}>Ok</Text>
              </ShadowContainer>
            </TouchableHighlight>
          </View>
        </View>
      </ShadowContainer>
    );
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.setModal(!this.props.modalSoftToken);
        }}
      >
        <View>
          <Modal
            isVisible={this.props.modalSoftToken}
            onBackButtonPress={() => this.props.setModal(false)}
            style={Style.ModalStyle}
          >
            {Platform.OS === "ios" && (
              <KeyboardAvoidingView behavior="position" enabled>
                {content}
              </KeyboardAvoidingView>
            )}
            {Platform.OS != "ios" && content}
          </Modal>
        </View>
      </TouchableHighlight>
    );
  }
}
