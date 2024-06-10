import React, { Component } from "react";
import { View, Text, TouchableHighlight,TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import ShadowContainer from "../ShadowContainer";
import Icon from "../Icon";
import Style from "./Styles";
import Colors from "../../assets/colors";
import { ErrorStateService } from "../../services/errorState";

export default class ModalErrorComponentUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalError: ErrorStateService.getIsLogout() ? false : this.props.Visibility
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      modalError: ErrorStateService.getIsLogout() ? false : nextProps.Visibility,
    });
  }

  setModalVisible(visible) {
    this.setState({ modalError: visible });

  }

  render() {

    return (
      <View style={Style.container}{...this.props}>

        <Modal isVisible={this.state.modalError} style={Style.ModalStyle}>
          <ShadowContainer style={Style.ShadowContainerStyle}>
            <View style={Style.ViewStyle}>
              <Icon
                style={[Colors.lightBlue]}
                family={Icon.IONICONS}
                name='ios-close-circle'
                size={70}
                color={Colors.lightBlue}
              />
              <View
                style={Style.ViewText}
              >
                <Text style={Style.TextStyle} ellipsizeMode="tail" >
                  {this.props.TextError}
                </Text>
              </View>

              <View style={Style.ViewButtonStyle}>
              <TouchableOpacity
               style={Style.appButtonContainer}

                  onPress={() => {
                   
                    //this.setModalVisible(!this.state.modalError)
                    if (this.props.Callback) {
                      this.props.Callback();
                    }

                  }}
                >
                  {/* <ShadowContainer
                    style={[
                      Style.ShadowContainerButton,
                      {
                        backgroundColor: Colors.lightBlue,
                        width: 138,
                        height: 37
                      }
                    ]}
                  > */}
                    <Text style={Style.TextButton}>Aceptar</Text>
                {/* //  </ShadowContainer> */}
                </TouchableOpacity>
              </View>
            </View>
          </ShadowContainer>
        </Modal>
      </View>
    );
  }
}
