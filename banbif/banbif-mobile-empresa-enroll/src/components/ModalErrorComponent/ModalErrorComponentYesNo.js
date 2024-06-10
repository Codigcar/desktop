import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import Modal from "react-native-modal";
import ShadowContainer from "../ShadowContainer";
import Icon from "../Icon";
import Style from "./Styles";
import Colors from "../../assets/colors";


export default class ModalConfirmationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalConfirmation: this.props.Visibility
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      modalConfirmation: nextProps.Visibility
    });
  }

  setModalVisible(visible) {
    this.setState({ modalConfirmation: visible });
  }

  render() {
    return (
      <View style={Style.container} {...this.props}>
        <Modal
          isVisible={this.state.modalConfirmation}
          style={Style.ModalStyle}
        >
          <ShadowContainer style={Style.ShadowContainerStyle}>
            <View style={Style.ViewStyle}>
              <Icon
                style={[Colors.lightBlue]}
                family={Icon.IONICONS}
                name="alert-circle"
                size={70}
                color={Colors.lightBlue}
              />
              <View
                style={Style.ViewText}
              >
                <Text
                  style={Style.TextStyle}
                  ellipsizeMode="tail"
                  numberOfLines={3}
                >
                  {this.props.TextError}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={Style.ViewButtonStyle}>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalConfirmation);
                      if (this.props.CallbackYes) {
                        this.props.CallbackYes(true);
                      }
                    }}
                  >
                    <ShadowContainer   style={[
                      Style.ShadowContainerButton,
                      {
                        backgroundColor: Colors.greys,
                        flexDirection: "row",
                        width: "50%",
                        alignItems: "center",
                       justifyContent: "space-evenly",

                      height: 37
                      }
                    ]}>
                      <Text style={Style.TextButton}>Sí</Text>
                    </ShadowContainer>
                  </TouchableHighlight>
                </View>
                <View style={Style.ViewButtonStyle}>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalConfirmation);
                      if (this.props.CallbackNo) {
                        this.props.CallbackNo(true);
                      }
                    }}
                  >
                    <ShadowContainer   style={[
                      Style.ShadowContainerButton,
                      {
                        backgroundColor: Colors.greys,
                        flexDirection: "row",
                        width: "50%",
                        alignItems: "center",
                       justifyContent: "space-evenly",

                      height: 37
                      }
                    ]}>
                      <Text style={Style.TextButton}>No</Text>
                    </ShadowContainer>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </ShadowContainer>
        </Modal>
      </View>
    );
  }
}
