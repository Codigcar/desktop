import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import Modal from "react-native-modal";
import ShadowContainer from "../ShadowContainer";
import Icon from "../Icon";
import Style from "./Styles";
import Colors from "../../assets/colors";

export default class ModalWarningComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalWarning: this.props.visible
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      modalWarning: nextProps.visible
    });
  }

  setModalVisible(visible) {
    this.setState({ modalWarning: visible });
  }

  render() {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.setModalSuccess(!this.state.modalWarning);
        }}
      >
        <View style={Style.container}>
          <Modal isVisible={this.state.modalWarning} style={Style.ModalStyle}>
            <ShadowContainer style={Style.ShadowContainerStyle}>
              <View style={Style.ViewStyle}>
                <Icon
                  style={[Colors.lightBlue]}
                  family={Icon.IONICONS}
                  name="ios-alert"
                  size={70}
                  color={Colors.lightBlue}
                />
                <View style={Style.viewText}>
                  <Text ellipsizeMode="tail" numberOfLines={3}>
                    {this.props.texto}
                  </Text>
                </View>

                <View style={Style.ViewButtonStyle}>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalWarning);
                    }}
                  >
                    <ShadowContainer style={Style.ShadowContainerButton}>
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
