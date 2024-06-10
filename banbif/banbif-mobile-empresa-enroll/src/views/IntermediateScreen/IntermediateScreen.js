import React from "react";
import { View, Text, BackHandler } from "react-native";
import Icon from '../../components/Icon';
import colors from "../../assets/colors";
import ModalHandleError from "../../components/ModalHandleError";
import Button from "../../components/Button";
import strings from "../../assets/strings";
import Modal from "react-native-modal";
import ShadowContainer from "../../components/ShadowContainer";
import Style from "./Styles";

export default class IntermediateScrenn extends ModalHandleError {
    constructor(props) {
        super(props);
        this.state = {
            modalIntermediate: true
        };
    }

    moveToLogin() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <View>
                <Modal isVisible={this.state.modalIntermediate} style={{ alignItems: "center" }}>
                    <ShadowContainer style={Style.shadowContainerStyle}>
                        <View style={Style.mainViewStyle}>
                            <View style={Style.viewStyle}>
                                <Icon
                                    style={[colors.lightBlue]}
                                    family={Icon.IONICONS}
                                    name="alert-circle"
                                    size={70}
                                    color={colors.lightBlue}
                                />
                                <View style={Style.viewTextStyle}>
                                    <Text style={{ fontSize: 15 }}>{strings.redirectToLogin.textScreen}</Text>
                                </View>
                                <View>
                                    <Button
                                        color={colors.lightBlue}
                                        width={150}
                                        height={40}
                                        textButton={strings.redirectToLogin.textButton}
                                        action={() => {
                                            this.setState({ modalIntermediate: false });
                                            this.moveToLogin();
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </ShadowContainer>
                </Modal>
            </View>
        );
    }
}
