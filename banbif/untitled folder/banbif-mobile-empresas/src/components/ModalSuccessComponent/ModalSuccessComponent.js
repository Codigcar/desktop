import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import Modal from "react-native-modal";
import ShadowContainer from "../ShadowContainer";

import Icon from "../Icon";
import Style from "./Styles";
import Colors from "../../assets/colors";

export default class ModalSuccessComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSuccess: this.props.visible
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      modalSuccess: nextProps.visible,
    });
  }

  setModalVisible(visible) {
    this.setState({ modalSuccess: visible });
  }

  render() {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.setModalSuccess(!this.state.modalSuccess);
        }}
      >
        <View style={Style.container}>
          <Modal isVisible={this.state.modalSuccess} style={Style.ModalStyle}>
            <ShadowContainer style={Style.ShadowContainerStyle}>
              <View style={Style.ViewStyle}>
                <Icon
                  style={[Colors.lightBlue]}
                  family={Icon.IONICONS}
                  name='ios-paper-plane'
                  size={70}
                  color={Colors.lightBlue} />
                <View
                  style={Style.viewText}
                >
                  <Text ellipsizeMode="tail" numberOfLines={3} style={{ paddingHorizontal: 45, textAlign: "center" }}>
                    {this.props.texto}
                  </Text>
                </View>

                <View style={Style.ViewButtonStyle}>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalSuccess);
                      if (this.props.Callback) {
                        this.props.Callback(true);
                      }
                    }}
                  >
                    <ShadowContainer
                      style={Style.ShadowContainerButton}
                    >
                      <Text style={Style.TextButton}>Ok</Text>
                    </ShadowContainer>
                  </TouchableHighlight>
                </View>
              </View>
            </ShadowContainer>
          </Modal>
        </View>
      </TouchableHighlight>
    );
  }
}
